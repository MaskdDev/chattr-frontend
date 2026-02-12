"use client";

import { ReactNode } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { redirect } from "next/navigation";

export default function ChannelsLayout({ children }: { children: ReactNode }) {
  // Use auth
  const { session } = useAuth();

  // If user isn't logged in, redirect to sign in page
  if (session === null) {
    redirect("/sign-in");
  }
}
