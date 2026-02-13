import { Message } from "@/lib/types";
import { InfiniteData, QueryClient } from "@tanstack/react-query";

/**
 * Add a message to the query cache for a given room ID.
 */
export function addMessageToQueryCache(
  queryClient: QueryClient,
  message: Message,
  roomId: string,
) {
  queryClient.setQueryData(
    ["messages", roomId],
    (currentMessages: InfiniteData<Message[]> | undefined) => {
      // If current messages don't exist, return
      if (!currentMessages) return currentMessages;

      // Check if message is already rendered (using both ID and nonce, if present)
      if (
        currentMessages.pages.some((page) =>
          page.some(
            (m: Message) =>
              m.id === message.id || (m.nonce && m.nonce === message.nonce),
          ),
        )
      ) {
        return currentMessages;
      }

      // Otherwise, insert message into first page
      currentMessages.pages[0].unshift(message);

      // Return modified messages
      return {
        ...currentMessages,
        pages: currentMessages.pages.map((page, index) => {
          if (index === 0) {
            return page.slice();
          } else {
            return page;
          }
        }),
      };
    },
  );
}

/**
 * Add a pending message to the message cache.
 */
export function addPendingMessage(
  queryClient: QueryClient,
  roomId: string,
  pendingMessage: Message,
) {
  queryClient.setQueryData(
    ["messages", roomId],
    (currentMessages: InfiniteData<Message[]> | undefined) => {
      // If current messages don't exist, return
      if (!currentMessages) return currentMessages;

      // Insert pending message into first page and return modified messages
      return {
        ...currentMessages,
        pages: [
          [pendingMessage, ...currentMessages.pages[0]],
          ...currentMessages.pages.slice(1),
        ],
      };
    },
  );
}

/**
 * Replace a pending message with its complete version in the message cache.
 */
export function replacePendingMessage(
  queryClient: QueryClient,
  roomId: string,
  message: Message,
  pendingMessageId: string,
) {
  queryClient.setQueryData(
    ["messages", roomId],
    (currentMessages: InfiniteData<Message[]> | undefined) => {
      // If current messages don't exist, return
      if (!currentMessages) return currentMessages;

      // Find pending message in pages, to create new pages
      const newPages = currentMessages.pages.map((page) => {
        // Try and find pending message
        const pendingIndex = page.findIndex(
          (message) => message.id === pendingMessageId,
        );

        // If not this page, return the page unchanged
        if (pendingIndex === -1) return page;

        // Otherwise, create new page
        return [
          ...page.slice(0, pendingIndex),
          message,
          ...page.slice(pendingIndex + 1),
        ];
      });

      // Return modified messages
      return {
        ...currentMessages,
        pages: newPages,
      };
    },
  );
}

/**
 * Replace a pending message with an errored version in the message cache.
 */
export function errorPendingMessage(
  queryClient: QueryClient,
  roomId: string,
  pendingMessageId: string,
) {
  queryClient.setQueryData(
    ["messages", roomId],
    (currentMessages: InfiniteData<Message[]> | undefined) => {
      // If current messages don't exist, return
      if (!currentMessages) return currentMessages;

      // Find pending message in pages, to create new pages
      const newPages = currentMessages.pages.map((page) => {
        // Try and find pending message
        const pendingIndex = page.findIndex(
          (message) => message.id === pendingMessageId,
        );

        // If not this page, return the page unchanged
        if (pendingIndex === -1) return page;

        // Otherwise, create new page
        return [
          ...page.slice(0, pendingIndex),
          {
            ...page[pendingIndex],
            id: page[pendingIndex].id.replace("pending", "error"),
          },
          ...page.slice(pendingIndex + 1),
        ];
      });

      // Return modified messages
      return {
        ...currentMessages,
        pages: newPages,
      };
    },
  );
}
