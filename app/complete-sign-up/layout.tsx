import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Chattr | Complete Sign Up",
  description: "The simple chatting app!",
  openGraph: {
    images: ["/embed.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function SignInLayout({ children }: { children: ReactNode }) {
  return children;
}
