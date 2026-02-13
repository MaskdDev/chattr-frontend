import { getRoom } from "@/lib/api";
import { notFound } from "next/navigation";
import RoomScreen from "@/components/rooms/RoomScreen";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  // Get room ID
  const { roomId } = await params;

  // Fetch room
  const room = await getRoom(roomId, true);

  // If room exists, return room screen
  if (room) {
    return <RoomScreen room={room} />;
  } else {
    // Otherwise, return not found page
    return notFound();
  }
}
