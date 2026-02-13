"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { Message, MessageCreate, Room } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { postMessage } from "@/lib/api";
import { useAuth } from "@/app/providers/AuthProvider";
import {
  addPendingMessage,
  errorPendingMessage,
  replacePendingMessage,
} from "@/lib/query";
import { generateNonce } from "@/lib/utils";

export default function RoomMessageBox({
  room,
  disabled,
}: {
  room: Room;
  disabled: boolean;
}) {
  // Use auth for user profile
  const { userProfile } = useAuth();

  // Create message mutation query
  const messageMutation = useMutation({
    mutationFn: async (message: MessageCreate) => {
      return postMessage(room.id, message);
    },
    onMutate: async (message, { client: queryClient }) => {
      // Cancel queries
      await queryClient.cancelQueries({ queryKey: ["messages", room.id] });

      // Get current timestamp
      const timestamp = new Date();

      // Create temporary message ID and nonce
      const temporaryId = `pending-${timestamp.valueOf()}`;

      // Create pending message
      const pendingMessage: Message = {
        ...message,
        id: temporaryId,
        roomId: room.id,
        author: userProfile,
        timestamp: timestamp.toISOString(),
        editedTimestamp: null,
      };

      // Add pending message
      addPendingMessage(queryClient, room.id, pendingMessage);

      // Return temporary ID
      return { temporaryId };
    },
    onSuccess: (message, _, context, { client: queryClient }) => {
      // Replace pending message with complete message
      replacePendingMessage(queryClient, room.id, message, context.temporaryId);
    },
    onError: (error, _, context, { client: queryClient }) => {
      // Replace pending message with error message, if context is present
      if (context) {
        errorPendingMessage(queryClient, room.id, context.temporaryId);
      }
    },
  });

  // Create message box state
  const [message, setMessage] = useState("");

  // Return component
  return (
    <form
      className="flex w-full flex-row items-center justify-center gap-3 rounded-xl border-2 border-slate-600 bg-white px-3 py-1.5"
      onSubmit={(event) => {
        // Prevent default event
        event.preventDefault();

        // Check if message is valid
        if (message.trim().length > 0) {
          // Create message request
          const messageCreate: MessageCreate = {
            content: message,
            nonce: generateNonce(),
          };

          // Send message and reset message box
          messageMutation.mutate(messageCreate);
          setMessage("");
        }
      }}
    >
      <input
        type="text"
        className="h-10 w-full bg-white px-2 focus:outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Send a message"
        disabled={disabled}
        maxLength={1000}
      />
      <button type="submit" aria-label="Send message" disabled={disabled}>
        <SendHorizontal className="text-slate-900" />
      </button>
    </form>
  );
}
