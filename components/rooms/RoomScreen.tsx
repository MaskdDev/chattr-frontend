"use client";

import { Room } from "@/lib/types";
import RoomHeader from "@/components/rooms/RoomHeader";
import RoomMessages from "@/components/rooms/RoomMessages";
import RoomMessageBox from "@/components/rooms/RoomMessageBox";

export default function RoomScreen({ room }: { room: Room }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-5 bg-slate-300 p-5">
      <RoomHeader room={room} />
      <RoomMessages room={room} />
      <RoomMessageBox sendCallback={async () => {}} disabled={false} />
    </div>
  );
}
