"use client";

import { use } from "react";

export default function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  // Get room ID
  const { roomId } = use(params);

  // Return component
  return <div>Room ID: {roomId}</div>;
}
