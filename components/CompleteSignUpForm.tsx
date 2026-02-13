"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";

// Create complete signup form schema
const completeSignupFormSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long.")
      .max(20, "Username must be at most 20 characters long.")
      .regex(/^[a-z]+$/, "Username must only contain lowercase letters."),
    displayName: z
      .string()
      .min(1, "Display name must be at least 1 character long.")
      .max(20, "Display name must be at most 20 characters long.")
      .regex(
        /^[a-zA-Z ]+$/,
        "Display name must contain only letters and spaces.",
      ),
  })
  .refine(
    async (data) => {
      // Check if username is available
      const { data: response } = await authClient.isUsernameAvailable({
        username: data.username,
      });

      // Return whether username is available.
      return !!response?.available;
    },
    {
      error: "Username already taken.",
      path: ["username"],
    },
  );

export default function CompleteSignUpForm({
  className,
  callbackUrl,
  ...props
}: {
  className?: string;
  callbackUrl: string;
}) {
  // Use auth and router
  const auth = useAuth();
  const router = useRouter();

  // Create form lock state
  const [formLock, setFormLock] = useState(false);

  // Create TanStack form
  const form = useForm({
    defaultValues: {
      username: "",
      displayName: "",
    },
    validators: {
      onSubmitAsync: completeSignupFormSchema,
    },
    onSubmit: async ({ value }) => {
      if (!formLock) {
        authClient.updateUser(
          {
            username: value.username,
            displayUsername: value.displayName,
          },
          {
            onRequest: () => {
              // Disable form
              setFormLock(true);
            },
            onSuccess: async () => {
              // Refetch auth state
              await auth.refetch();

              // Redirect to callback URL
              router.push(callbackUrl);
            },
            onError: (ctx) => {
              // Re-enable form and send alert
              setFormLock(false);
              alert(ctx.error.message);
            },
          },
        );
      }
    },
  });

  // Return complete sign up form component
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
      {...props}
    >
      <FieldGroup className="gap-3">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Complete Sign Up</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to complete creating your Chattr account
          </p>
        </div>

        <form.Field name="username">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                <Input
                  required
                  id={field.name}
                  type="text"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="johndoe"
                  autoComplete="off"
                />
                <FieldDescription>Please select a username.</FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="displayName">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>Display Name</FieldLabel>
                <Input
                  required
                  id={field.name}
                  type="text"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="John Doe"
                  autoComplete="off"
                />
                <FieldDescription>
                  Please select a name to be used in chat.
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Field className="gap-2">
          <Button type="submit">Complete Setup</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
