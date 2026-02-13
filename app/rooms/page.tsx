"use client";

import { Button } from "@/components/ui/button";
import RoomCreateDialog from "@/components/dialogs/RoomCreateDialog";
import InviteAcceptDialog from "@/components/dialogs/InviteAcceptDialog";
import { useState } from "react";
import RoomSidebarTrigger from "@/components/rooms/RoomSidebarTrigger";

export default function RootRoomPage() {
  // Create dialog state
  const [roomCreateOpen, setRoomCreateOpen] = useState(false);
  const [acceptInviteOpen, setAcceptInviteOpen] = useState(false);

  // Return component
  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-slate-300">
      <RoomSidebarTrigger className="absolute top-5 left-5 text-slate-950" />
      <h1 className="mb-2.5 text-center text-6xl text-slate-950 sm:mb-4 sm:text-8xl">
        Welcome to Chattr!
      </h1>
      <h2 className="mb-3 text-center text-xl text-slate-950 sm:mb-7 sm:text-3xl">
        Select a room from the sidebar to start chatting.
      </h2>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Button
          variant="secondary"
          className="h-9 w-40 bg-slate-50 text-slate-950 sm:h-10 sm:w-56 sm:text-lg"
          onClick={() => setRoomCreateOpen(true)}
        >
          Create Room
        </Button>

        <Button
          variant="secondary"
          className="h-9 w-40 bg-slate-50 text-slate-950 sm:h-10 sm:w-56 sm:text-lg"
          onClick={() => setAcceptInviteOpen(true)}
        >
          Join Room
        </Button>
      </div>
      <RoomCreateDialog open={roomCreateOpen} setOpen={setRoomCreateOpen} />
      <InviteAcceptDialog
        open={acceptInviteOpen}
        setOpen={setAcceptInviteOpen}
      />
    </div>
  );
}
