"use client";

import { ReactNode } from "react";
import { getRooms } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import CreateOrJoinRoom from "@/components/CreateOrJoinRoom";
import { redirect, useParams } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import RoomSidebar from "@/components/RoomSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RoomsLayout({ children }: { children: ReactNode }) {
  // Get auth
  const { session } = useAuth();

  // Redirect user to sign in page if not logged in
  if (!session) {
    redirect("/sign-up");
  }

  // Get room ID, if present
  const roomId = useParams<{ roomId?: string }>().roomId;

  // Get user's rooms
  const { isPending, data: rooms } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // If user doesn't have rooms, return empty screen
  if (rooms?.length === 0) {
    return <CreateOrJoinRoom />;
  }

  // Return component
  return (
    <div className="flex h-dvh w-full overflow-y-hidden">
      <SidebarProvider>
        <RoomSidebar
          rooms={isPending ? undefined : rooms}
          activeRoomId={roomId}
        />
        <div className="flex-1">{children}</div>
      </SidebarProvider>
    </div>
  );
}
