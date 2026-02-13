"use client";

import { ApiError, Invite } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { attemptInviteAccept, getInitials } from "@/lib/utils";
import { useAuth } from "@/app/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { acceptInvite } from "@/lib/api";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import React, { useState } from "react";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import LinkButton from "@/components/LinkButton";

export default function InviteScreen({ invite }: { invite: Invite }) {
  // Use auth, router and pathname
  const { session } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Create joining state
  const [joining, setJoining] = useState(false);

  // Return component
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-5 bg-slate-950">
      <div className="flex flex-col items-center justify-center">
        <Avatar className="mb-1 size-20 sm:mb-3">
          <AvatarImage src={invite.creator?.avatarUrl ?? undefined} />
          <AvatarFallback>
            {getInitials(invite.creator?.displayName ?? "Deleted User")}
          </AvatarFallback>
        </Avatar>
        <h1 className="mb-1 text-center text-3xl text-cyan-300 sm:mb-3 sm:text-5xl">
          {invite.creator?.displayName ?? "Deleted User"}
        </h1>
        <h2 className="text-center text-xl text-slate-50 sm:text-2xl">
          Has invited you to join &#34;{invite.room.name}&#34;
        </h2>
      </div>

      {session ? (
        <Button
          variant="secondary"
          className="h-8 w-36 bg-slate-50 text-slate-950 sm:h-9 sm:w-50 sm:text-lg"
          onClick={async () => {
            // Set joining
            setJoining(true);

            // Attempt to accept invite
            await attemptInviteAccept(invite, router);

            // Set joining to false
            setJoining(false);
          }}
          disabled={joining}
        >
          {joining ? <Spinner /> : <></>}
          Join Room
        </Button>
      ) : (
        <div className="flex flex-col gap-5 sm:flex-row">
          <LinkButton
            href={`/sign-in?callbackUrl=${encodeURIComponent(pathname)}`}
            text="Sign In"
          />
          <LinkButton
            href={`/sign-up?callbackUrl=${encodeURIComponent(pathname)}`}
            text="Sign Up"
          />
        </div>
      )}
    </div>
  );
}
