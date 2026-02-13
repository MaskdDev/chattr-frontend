import { Room } from "@/lib/types";

export default function RoomScreen({ room }: { room: Room }) {
  return (
    <div>
      Room name: {room.name} <br />
      Room description: {JSON.stringify(room.description)} <br />
      Room ID: {room.id} <br />
      Room creator: {JSON.stringify(room.creator)}
    </div>
  );
}
