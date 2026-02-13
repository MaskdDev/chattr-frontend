"use client";

import { ArrowLeft } from "lucide-react";
import styles from "@/styles/heropatterns.module.css";
import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import CompleteSignUpForm from "@/components/CompleteSignUpForm";

export default function CompleteSignUpPage() {
  // Use auth and search params
  const { userProfile } = useAuth();
  const params = useSearchParams();

  // Get callback URL, or use default /rooms
  const callbackUrl = params.get("callbackUrl") ?? "/rooms";

  // If user has a username and display username, redirect to rooms page
  if (userProfile && userProfile.username && userProfile.displayName) {
    redirect("/rooms");
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <CompleteSignUpForm callbackUrl={callbackUrl} />
          </div>
        </div>
      </div>
      <div
        className={`relative hidden h-full w-full lg:block ${styles.texturedBackground}`}
      />
    </div>
  );
}
