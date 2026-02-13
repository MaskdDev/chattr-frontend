import { Room } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "@/lib/api";
import { useMemo } from "react";

export default function RoomMessages({ room }: { room: Room }) {
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

  // Return messages container
  return (
    <div className="h-full w-full overflow-y-scroll rounded-xl border-2 border-slate-600 bg-white py-2"></div>
  );
}
