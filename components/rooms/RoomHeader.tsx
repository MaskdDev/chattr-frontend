import RoomSidebarTrigger from "@/components/rooms/RoomSidebarTrigger";
import { Room } from "@/lib/types";

export default function RoomHeader({ room }: { room: Room }) {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-3 rounded-xl bg-slate-950 px-5 py-4 sm:flex-row sm:gap-4">
      <div className="flex flex-row items-center gap-5">
        <RoomSidebarTrigger />
        <div className="flex flex-col gap-1.5">
          <h1 className="text-center align-text-bottom text-4xl font-light text-slate-50 sm:text-left sm:text-5xl">
            {room.name}
          </h1>
          <h2 className="text-center text-lg text-slate-400 sm:text-left sm:text-xl">
            <span>{room.description}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
