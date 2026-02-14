import { PartialInvite, PartialRoom } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Hash, UserPlus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createInvite } from "@/lib/api";

export default function RoomSidebarLink({
  room,
  activeRoomId,
  openInviteModal,
}: {
  room: PartialRoom;
  activeRoomId: string | undefined;
  openInviteModal: (invite: PartialInvite) => void;
}) {
  // Check whether room is active
  const activeRoom = room.id === activeRoomId;

  // Return component
  return (
    <Link
      href={`/rooms/${room.id}`}
      className={cn(
        "group/room-link flex w-full items-center justify-between rounded-md px-2 py-1 focus-within:bg-slate-800 hover:bg-slate-800 focus:outline-none",
        activeRoom ? "bg-slate-700 hover:bg-slate-700" : "bg-slate-950",
      )}
    >
      <div className="flex items-center text-base">
        <Hash className="inline size-5.5 pr-1" />
        {room.name}
      </div>
      <div
        className={cn(
          "flex items-center opacity-0 group-focus-within/room-link:opacity-100 group-hover/room-link:opacity-100",
          activeRoom ? "opacity-100" : "",
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="cursor-pointer hover:brightness-75"
              onClick={async () => {
                // Create invite code
                const invite = await createInvite(room.id, {
                  expires: null,
                  maxUses: null,
                });

                // Open invite created modal
                openInviteModal(invite);
              }}
            >
              <UserPlus className="size-4.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="pointer-events-none">
            <p>Invite users</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </Link>
  );
}
