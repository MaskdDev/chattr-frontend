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
import { Textarea } from "@/components/ui/textarea";
import React, { useState, Dispatch, SetStateAction } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { createRoom, editMessage } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { Message } from "@/lib/types";
import { editExistingMessage } from "@/lib/query";

// Create edit message form schema
const editMessageSchema = z.object({
  content: z
    .string()
    .min(1, "You can't have an empty message!")
    .max(1000, "Message content must be at most 40 characters long."),
});

export default function EditMessageDialog({
  open,
  setOpen,
  message,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  message: Message;
}) {
  // Create form lock state
  const [formLock, setFormLock] = useState(false);

  // Use query client and router
  const queryClient = useQueryClient();

  // Create TanStack form
  const form = useForm({
    defaultValues: {
      content: "",
    },
    validators: {
      onChange: editMessageSchema,
    },
    onSubmit: async ({ value }) => {
      if (!formLock) {
        // Get new message content
        const newContent = value.content;

        // Set form lock
        setFormLock(true);

        try {
          // Send message edit request and refetch rooms
          await editMessage(message.roomId, message.id, newContent);

          // Edit message in query cache
          editExistingMessage(
            queryClient,
            message.roomId,
            message.id,
            newContent,
          );

          // Close modal
          setOpen(false);

          // Reset form
          setTimeout(() => form.reset(), 250);
        } catch {
          alert("Error editing message. Please try again later.");
        }

        // Unlock form
        setFormLock(false);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form
        id="edit-message-form"
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
      >
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Message</DialogTitle>
          </DialogHeader>
          <FieldGroup className="gap-3">
            <form.Field name="content">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Message Content
                    </FieldLabel>
                    <Textarea
                      required
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      defaultValue={message.content}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
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
            <Button type="submit" form="edit-message-form" disabled={formLock}>
              {formLock ? <Spinner /> : <></>}
              Edit Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
