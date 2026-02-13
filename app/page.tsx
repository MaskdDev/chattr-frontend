"use client";

import HomePageHero from "@/components/HomePageHero";
import { useAuth } from "@/app/providers/AuthProvider";
import { redirect } from "next/navigation";

export default function HomePage() {
  // Use auth
  const { session } = useAuth();

  // If user is logged in, redirect to rooms page
  if (session !== null) {
    redirect("/rooms");
  }

  // Return component
  return (
    <div className="h-dvh overflow-y-hidden bg-black">
      <HomePageHero />
    </div>
  );
}
