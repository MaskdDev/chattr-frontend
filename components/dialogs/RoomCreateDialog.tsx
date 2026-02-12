"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, ReactNode } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { createRoom } from "@/lib/api";

// Create room create form schema
const roomCreateFormSchema = z.object({
  name: z
    .string()
    .min(3, "Room name must be at least 3 characters long.")
    .max(20, "Room name must be at most 20 characters long."),
  description: z
    .string()
    .max(150, "Room description must be at most 150 characters long."),
});

export default function RoomCreateDialog({
  children,
}: {
  children: ReactNode;
}) {
  // Create form lock state
  const [formLock, setFormLock] = useState(false);

  // Create TanStack form
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    validators: {
      onSubmit: roomCreateFormSchema,
    },
    onSubmit: async ({ value }) => {
      if (!formLock) {
        // Set form lock
        setFormLock(true);
        // Send room creation request
        try {
          await createRoom(value);

          // Unlock form
          setFormLock(false);
        } catch (e) {
          alert("Error creating room. Please try again later.");
        }
      }
    },
  });

  return (
    <Dialog>
      <form
        id="create-room-form"
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
      >
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Room</DialogTitle>
            <DialogDescription>
              Enter the details for your new room here.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="gap-3">
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      required
                      id={field.name}
                      type="text"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="General"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
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
            <Button type="submit" form="create-room-form">
              Create Room
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
