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
import { Textarea } from "@/components/ui/textarea";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { editMessage } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { Message, MessagePatch } from "@/lib/types";
import { editExistingMessage } from "@/lib/query";
import { generateNonce } from "@/lib/utils";

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
  message: Message | null;
}) {
  // Create form lock state and error
  const [formLock, setFormLock] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

        // Set form lock and remove error
        setFormLock(true);
        setError(null);

        try {
          // Verify that message being edited is not null
          if (message !== null) {
            // Create edit request
            const messagePatch: MessagePatch = {
              content: newContent,
              nonce: generateNonce(),
            };

            // Send message edit request and refetch rooms
            await editMessage(message.roomId, message.id, messagePatch);

            // Edit message in query cache
            editExistingMessage(
              queryClient,
              message.roomId,
              message.id,
              newContent,
            );

            // Close modal
            setOpen(false);
          } else {
            setError("Please select a message to edit and try again.");
          }
        } catch {
          setError("Error editing message. Please try again later.");
        }

        // Unlock form
        setFormLock(false);
      }
    },
  });

  // Reset form whenever a new message is provided
  useEffect(() => {
    form.reset({ content: message?.content ?? "" });
  }, [message, form]);

  // Return dialog
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
            <DialogDescription>
              Change the content of your message here.
            </DialogDescription>
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
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                    {(isInvalid || error) && (
                      <FieldError
                        errors={[
                          ...field.state.meta.errors,
                          { message: error ?? undefined },
                        ]}
                      />
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
