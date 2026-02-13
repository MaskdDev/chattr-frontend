"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Invite, PartialInvite, PartialRoom } from "@/lib/types";
import Link from "next/link";
import { MailCheck, Plus } from "lucide-react";
import RoomCreateDialog from "@/components/dialogs/RoomCreateDialog";
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
import { useAuth } from "@/app/providers/AuthProvider";
import RoomSidebarProfile from "@/components/RoomSidebarProfile";
import InviteCreatedDialog from "@/components/dialogs/InviteCreatedDialog";

export default function RoomSidebar({
  rooms,
  activeRoomId,
}: {
  rooms?: PartialRoom[];
  activeRoomId?: string;
}) {
  // Use auth for user profile
  const { userProfile } = useAuth();

  // Create dialog state
  const [roomCreateOpen, setRoomCreateOpen] = useState(false);
  const [acceptInviteOpen, setAcceptInviteOpen] = useState(false);
  const [inviteCreatedOpen, setInviteCreatedOpen] = useState(false);

  // Create invite code state
  const [invite, setInvite] = useState<PartialInvite | null>(null);

  // Return component
  return (
    <Sidebar className="bg-slate-950 pt-6 pb-1" variant="sidebar">
      <SidebarHeader className="px-3">
        <Link href="/rooms">
          <h1 className="pl-2 font-sans text-5xl font-medium text-cyan-300 sm:text-left">
            Chattr
          </h1>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3">
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
                setInvite={setInvite}
                openInviteModal={() => setInviteCreatedOpen(true)}
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

      <SidebarFooter className="px-1.5">
        <RoomSidebarProfile user={userProfile} />
      </SidebarFooter>
      <RoomCreateDialog open={roomCreateOpen} setOpen={setRoomCreateOpen} />
      <InviteAcceptDialog
        open={acceptInviteOpen}
        setOpen={setAcceptInviteOpen}
      />
      <InviteCreatedDialog
        open={inviteCreatedOpen}
        setOpen={setInviteCreatedOpen}
        invite={invite}
      />
    </Sidebar>
  );
}
