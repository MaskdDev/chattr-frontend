"use client";

import { cn } from "@/lib/utils";
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
import React from "react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";

// Create signup form schema
const signupFormSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long.")
      .max(32, "Name must be at most 32 characters long.")
      .regex(/^[a-zA-Z ]+$/, "Name must contain only letters and spaces."),
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
    email: z.email({ error: "Invalid email address." }),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  // Create TanStack form
  const form = useForm({
    defaultValues: {
      name: "",
      username: "",
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: signupFormSchema,
    },
    onSubmit: async ({ value }) => {
      alert(`Form submitted successfully! ${JSON.stringify(value)}`);
    },
  });

  // Return sign up form component
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
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your Chattr account
          </p>
        </div>

        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                <Input
                  required
                  id={field.name}
                  type="text"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Jonathan Doe"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

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

        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid} className="gap-2">
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
              <Field data-invalid={isInvalid} className="gap-2">
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
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="confirmPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
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

        <Field className="gap-2">
          <Button type="submit">Create Account</Button>
        </Field>

        <FieldSeparator className="my-1">Or continue with</FieldSeparator>
        <Field className="gap-2">
          <Button variant="outline" type="button">
            <SiGithub />
            Sign up with GitHub
          </Button>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/login">Log in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
