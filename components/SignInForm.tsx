"use client";

import { cn, frontendUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import { KeyIcon } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";

// Create sign in form schema
const signinFormSchema = z.object({
  email: z.email({ error: "Invalid email address." }),
  password: z.string(),
});

export default function SignInForm({
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
      email: "",
      password: "",
    },
    validators: {
      onSubmit: signinFormSchema,
    },
    onSubmit: async ({ value }) => {
      if (!formLock) {
        authClient.signIn.email(
          {
            email: value.email,
            password: value.password,
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

  // Return sign in form component
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
          <h1 className="text-2xl font-bold">Sign In</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email and password to sign in to your Chattr account.
          </p>
        </div>

        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  required
                  id={field.name}
                  type="email"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="john.doe@example.com"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  required
                  id={field.name}
                  type="password"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Field>
          <Button type="submit">Sign In</Button>
        </Field>

        <FieldSeparator className="my-1">Or continue with</FieldSeparator>
        <Field className="gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={async () => {
              await authClient.signIn.social({
                provider: "github",
                callbackURL: `${frontendUrl()}${callbackUrl}`,
                newUserCallbackURL: `${frontendUrl()}/complete-sign-up`,
              });
            }}
          >
            <SiGithub />
            Sign in with Github
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={async () => {
              await authClient.signIn.social({
                provider: "google",
                callbackURL: `${frontendUrl()}/${callbackUrl}`,
                newUserCallbackURL: `${frontendUrl()}/complete-sign-up`,
              });
            }}
          >
            <SiGoogle />
            Sign in with Google
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={async () => {
              authClient.signIn.passkey({
                fetchOptions: {
                  onSuccess() {
                    // Redirect to callback URL
                    router.push(callbackUrl);
                  },
                  onError() {
                    alert(
                      "Sign in failed - Please select another method or try again.",
                    );
                  },
                },
              });
            }}
          >
            <KeyIcon />
            Sign in with Passkey
          </Button>
          <FieldDescription className="px-6 text-center">
            Don&#39;t have an account?{" "}
            <Link
              href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            >
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
