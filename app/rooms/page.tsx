"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/app/providers/AuthProvider";

export default function RootRoomPage() {
  // Get session
  const { session } = useAuth();

  // Return component
  return (
    <div className="h-dvh overflow-y-hidden">
      Session = {JSON.stringify(session?.user)}
      <Button
        onClick={() => {
          authClient.signOut();
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}
