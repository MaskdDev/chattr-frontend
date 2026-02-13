"use client";

import { useParams } from "next/navigation";

export default function RoomPage() {
  // Get room ID
  const { roomId } = useParams<{ roomId: string }>();

  // Return component
  return <div>Room ID: {roomId}</div>;
}
