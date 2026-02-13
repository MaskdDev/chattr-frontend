import { Message, Room } from "@/lib/types";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "@/lib/api";
import { useEffect, useMemo, useRef } from "react";
import RoomMessage from "@/components/rooms/RoomMessage";
import { gatewaySocket } from "@/lib/sockets";
import { addMessageToQueryCache } from "@/lib/query";
import RoomMessagesLoading from "@/components/rooms/RoomMessagesLoading";

export default function RoomMessages({ room }: { room: Room }) {
  // Use query client
  const queryClient = useQueryClient();

  // Create reference to messages container
  const messageContainer = useRef<HTMLDivElement>(null);

  // Subscribe to messages from room
  useEffect(() => {
    // Create callback function
    const messageListener = (message: Message) => {
      // Add message to messages
      addMessageToQueryCache(queryClient, message, room.id);
    };

    // Subscribe to new messages with callback function
    gatewaySocket.subscribe(room.id, messageListener);

    // Return cleanup function
    return () => gatewaySocket.unsubscribe(room.id, messageListener);
  }, [room, queryClient]);

  // Get messages
  const { data: messagePages, isPending } = useInfiniteQuery({
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

  // Scroll to the bottom of messages whenever a new message is added
  useEffect(() => {
    messageContainer.current?.lastElementChild?.scrollIntoView({
      behavior: "instant",
    });
  }, [messages]);

  // Return messages container
  return (
    <div
      className="h-full w-full overflow-x-hidden overflow-y-scroll rounded-xl border-2 border-slate-600 bg-white py-2"
      ref={messageContainer}
    >
      {!isPending ? (
        messages.map((message) => (
          <RoomMessage message={message} key={message.id} />
        ))
      ) : (
        <RoomMessagesLoading />
      )}
    </div>
  );
}
