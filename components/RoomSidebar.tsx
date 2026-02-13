"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { PartialRoom } from "@/lib/types";
import Link from "next/link";
import { MailCheck, Plus } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import RoomCreateDialog from "@/components/dialogs/RoomCreateDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import InviteAcceptDialog from "@/components/dialogs/InviteAcceptDialog";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import RoomSidebarLink from "@/components/RoomSidebarLink";

export default function RoomSidebar({
  rooms,
  activeRoomId,
}: {
  rooms?: PartialRoom[];
  activeRoomId?: string;
}) {
  // Create dialog state
  const [roomCreateOpen, setRoomCreateOpen] = useState(false);
  const [acceptInviteOpen, setAcceptInviteOpen] = useState(false);

  // Return component
  return (
    <Sidebar className="bg-slate-950 px-3 py-6" variant="sidebar">
      <SidebarHeader className="p-0">
        <Link href="/rooms">
          <h1 className="pl-2 font-sans text-5xl font-medium text-cyan-300 sm:text-left">
            Chattr
          </h1>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <div className="mt-5 flex items-center justify-between px-2">
          <h2 className="font-sans text-xl font-semibold text-slate-50">
            Rooms
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-slate-50 hover:brightness-75">
                <Plus className="size-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setRoomCreateOpen(true)}>
                  <Plus />
                  Create New Room
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setAcceptInviteOpen(true)}>
                  <MailCheck />
                  Accept Invite
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {rooms !== undefined
          ? rooms?.map((room) => (
              <RoomSidebarLink
                room={room}
                activeRoomId={activeRoomId}
                key={room.id}
              />
            ))
          : [...Array(5).keys()].map((key) => (
              <Skeleton
                className="flex h-8 w-full items-center rounded-md bg-slate-800 px-2"
                key={key}
              />
            ))}
      </SidebarContent>

      <SidebarFooter>
        <Button
          className="w-full bg-slate-50 text-slate-950 hover:bg-slate-50 hover:brightness-75"
          onClick={() => authClient.signOut()}
        >
          Sign Out
        </Button>
      </SidebarFooter>
      <RoomCreateDialog open={roomCreateOpen} setOpen={setRoomCreateOpen} />
      <InviteAcceptDialog
        open={acceptInviteOpen}
        setOpen={setAcceptInviteOpen}
      />
    </Sidebar>
  );
}
