"use client";

import { Room } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "@/lib/api";
import { useMemo } from "react";
import { formatIsoString } from "@/lib/utils";
import RoomHeader from "@/components/rooms/RoomHeader";

export default function RoomScreen({ room }: { room: Room }) {
  // Get messages
  const { data: messagePages } = useInfiniteQuery({
    queryKey: ["messages", room.id],
    queryFn: async ({ pageParam }: { pageParam: string }) =>
      getMessages(room.id, 25, pageParam === "start" ? undefined : pageParam),
    initialPageParam: "start",
    getNextPageParam: (lastPage) =>
      lastPage.length === 25 ? lastPage[24].id : null,
  });

  // Get messages
  const messages = useMemo(() => {
    // If messages aren't loaded yet, return an empty array.
    if (!messagePages) {
      return [];
    }

    // Flatten message pages into a single message array
    return messagePages.pages
      .slice()
      .reverse()
      .flatMap((page) => page.slice().reverse());
  }, [messagePages]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-5 bg-slate-300 p-5">
      <RoomHeader room={room} />
    </div>
  );
}
