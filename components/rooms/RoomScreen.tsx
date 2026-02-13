"use client";

import { Room } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "@/lib/api";
import { useMemo } from "react";
import { formatIsoString } from "@/lib/utils";

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
    <div>
      Room name: {room.name} <br />
      Room description: {JSON.stringify(room.description)} <br />
      Room ID: {room.id} <br />
      Room creator: {JSON.stringify(room.creator)}
      <div>
        {messages.map((message) => (
          <div
            className="mx-2 my-1 rounded-xl bg-slate-100 px-2.5 py-1.5 hover:bg-slate-200"
            key={message.id}
          >
            <div className="align-baseline">
              <h2 className="inline font-bold">
                {message.author?.displayName ?? "Deleted User"}
              </h2>
              {"  "}
              <span className="text-xs text-slate-500">
                {formatIsoString(message.timestamp)}
              </span>
            </div>

            <p>{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
