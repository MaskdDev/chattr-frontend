"use client";

import { ReactNode } from "react";
import { getRooms } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Hash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingScreen from "@/components/LoadingScreen";
import { authClient } from "@/lib/auth-client";
import CreateOrJoinRoom from "@/components/CreateOrJoinRoom";
import { redirect, useParams } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";

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
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  // Return loading channels while getting user rooms
  if (isPending) {
    return <LoadingScreen loadingText="Loading Rooms" />;
  }

  // If user doesn't have rooms, return empty screen
  if (data?.length === 0) {
    return <CreateOrJoinRoom />;
  }

  // Return component
  return (
    <div className="flex h-dvh overflow-y-hidden">
      <div className="flex h-full w-80 shrink-0 flex-col justify-between bg-slate-950 px-3 py-6">
        <div>
          <h1 className="pl-2 font-sans text-5xl font-medium text-cyan-300 sm:text-left">
            Chattr
          </h1>
          <div className="mt-5 flex items-center justify-between px-2">
            <h2 className="font-sans text-xl font-semibold text-slate-50">
              Rooms
            </h2>
            <button className="text-slate-50 hover:brightness-75">
              <Plus className="size-5" />
            </button>
          </div>
          <div className="mt-1.5 space-y-1 text-base text-slate-50">
            {data?.map((room) => (
              <Link
                href={`/rooms/${room.id}`}
                className={cn(
                  "flex w-full items-center rounded-md px-2 py-1 text-base hover:bg-slate-800",
                  room.id === roomId ? "bg-slate-700" : "bg-slate-950",
                )}
                key={room.id}
              >
                <Hash className="inline pr-1" />
                {room.name}
              </Link>
            ))}
          </div>
        </div>
        <Button
          className="w-full bg-slate-50 text-slate-950 hover:bg-slate-50 hover:brightness-75"
          onClick={() => authClient.signOut()}
        >
          Sign Out
        </Button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
