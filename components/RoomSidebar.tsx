"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { PartialRoom } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Hash, MailCheck, Plus } from "lucide-react";
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
              <Link
                href={`/rooms/${room.id}`}
                className={cn(
                  "flex w-full items-center rounded-md px-2 py-1 text-base hover:bg-slate-800",
                  room.id === activeRoomId ? "bg-slate-700" : "bg-slate-950",
                )}
                key={room.id}
              >
                <Hash className="inline pr-1" />
                {room.name}
              </Link>
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
