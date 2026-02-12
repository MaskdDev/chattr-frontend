"use client";

import { ArrowLeft } from "lucide-react";
import styles from "@/styles/heropatterns.module.css";
import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";

export default function SignUpPage() {
  // Use auth
  const { session } = useAuth();

  // If user is logged in, redirect to dashboard
  if (session !== null) {
    redirect("/dashboard");
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            href="/"
            className="flex items-center gap-2 font-medium hover:underline"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div
        className={`relative hidden h-full w-full lg:block ${styles.texturedBackground}`}
      />
    </div>
  );
}
