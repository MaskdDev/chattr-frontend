import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React from "react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup className="gap-3">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your Chattr account
          </p>
        </div>

        <Field className="gap-2">
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" type="text" placeholder="John Doe" required />
        </Field>

        <Field className="gap-2">
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" type="text" required />
          <FieldDescription>Please select a username.</FieldDescription>
        </Field>

        <Field className="gap-2">
          <FieldLabel htmlFor="username">Display Name</FieldLabel>
          <Input id="username" type="text" required />
          <FieldDescription>
            Please select a name to be used in chat.
          </FieldDescription>
        </Field>

        <Field className="gap-2">
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            required
          />
        </Field>

        <Field className="gap-2">
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" required />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>

        <Field className="gap-2">
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input id="confirm-password" type="password" required />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>

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
