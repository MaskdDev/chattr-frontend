import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState, Dispatch, SetStateAction } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { acceptInvite } from "@/lib/api";
import { AxiosError } from "axios";
import { Spinner } from "@/components/ui/spinner";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// Create invite accept form schema
const inviteAcceptFormSchema = z.object({
  inviteCode: z
    .string()
    .max(20, "Invite codes can't be more than 20 characters long."),
});

export default function InviteAcceptDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  // Create form lock state and error
  const [formLock, setFormLock] = useState(false);

  // Use query client and router
  const queryClient = useQueryClient();
  const router = useRouter();

  // Create TanStack form
  const form = useForm({
    defaultValues: {
      inviteCode: "",
    },
    validators: {
      onSubmit: inviteAcceptFormSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      if (!formLock) {
        // Set form lock
        setFormLock(true);

        try {
          // Try accepting invite and refetch rooms
          const invite = await acceptInvite(value.inviteCode);
          await queryClient.refetchQueries({ queryKey: ["rooms"] });

          // Close modal
          setOpen(false);

          // Open newly created room
          router.push(`/rooms/${invite.room.id}`);
        } catch (e) {
          if (e instanceof AxiosError) {
            switch (e.status) {
              case 404: {
                formApi.setFieldMeta("inviteCode", (prev) => ({
                  ...prev,
                  errors: ["Invalid invite code."],
                }));
                break;
              }
              case 409: {
                formApi.setFieldMeta("inviteCode", (prev) => ({
                  ...prev,
                  errors: ["Invite code has been used or expired."],
                }));
                break;
              }
            }
          } else {
            formApi.setFieldMeta("inviteCode", (prev) => ({
              ...prev,
              errors: ["Error accepting invite. Please try again later."],
            }));
          }
        }

        // Unlock form
        setFormLock(false);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form
        id="invite-accept-form"
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Accept Invite</DialogTitle>
            <DialogDescription>
              Enter an invite code to join the room!
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="gap-3">
            <form.Field name="inviteCode">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Invite Code</FieldLabel>
                    <Input
                      required
                      id={field.name}
                      type="text"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="abd3ka"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="invite-accept-form" disabled={formLock}>
              {formLock ? <Spinner /> : <></>}
              Accept Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
