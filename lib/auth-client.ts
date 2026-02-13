import { createAuthClient } from "better-auth/react";
import { passkeyClient } from "@better-auth/passkey/client";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  plugins: [passkeyClient(), usernameClient()],
  sessionOptions: {
    refetchOnWindowFocus: false,
    refetchInterval: 3 * 60 * 1000,
  },
});

export type Session = typeof authClient.$Infer.Session;
