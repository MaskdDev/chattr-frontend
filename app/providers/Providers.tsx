"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <Toaster richColors position="top-center" />
      {children}
    </AuthProvider>
  );
}
