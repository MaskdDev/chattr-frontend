import type { Message } from "@/lib/types";
import MessageButtons from "@/components/rooms/RoomMessageButtons";
import { cn, formatIsoString, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function RoomMessage({
  message,
  openEditModal,
}: {
  message: Message;
  openEditModal: (message: Message) => void;
}) {
  // Check if message is pending / errored
  const isPending = message.id.startsWith("pending");
  const isError = message.id.startsWith("error");

  // Return component
  return (
    <div
      className={cn(
        "group relative w-full flex-col rounded-xl bg-inherit px-4 py-2 focus-within:bg-slate-100 hover:bg-slate-100 focus:outline-none",
        isError ? "focus-within:bg-red-100 hover:bg-red-100" : "",
      )}
      key={`message-${message.id}`}
      tabIndex={0}
    >
      {!isPending && !isError && (
        <div className="absolute -top-2 right-2 hidden group-focus-within:block group-hover:block">
          <MessageButtons triggerMessageEdit={() => openEditModal(message)} />
        </div>
      )}
      <div className="flex flex-row items-start gap-3.5">
        <div className="pt-1">
          <Avatar size="lg">
            <AvatarImage src={message.author?.avatarUrl ?? undefined} />
            <AvatarFallback>
              {getInitials(message.author?.displayName ?? "Deleted User")}
            </AvatarFallback>
          </Avatar>
        </div>

        <div
          className={cn(
            "min-w-0",
            isPending ? "opacity-60" : "",
            isError ? "text-red-400" : "",
          )}
        >
          <div className="inline-block align-text-bottom leading-0 text-wrap">
            <span className="text-base font-semibold">
              {message.author?.displayName ?? "Deleted User"}
            </span>{" "}
            <span
              className={cn(
                "pl-1 text-xs text-slate-500",
                isError ? "text-red-500" : "",
              )}
            >
              {formatIsoString(message.timestamp)}
            </span>
          </div>
          <div className="cursor-default align-baseline text-base wrap-break-word">
            {message.content}
            {message.editedTimestamp && (
              <Tooltip delayDuration={1000} disableHoverableContent={true}>
                <TooltipTrigger asChild>
                  <span className="inline-block pl-1 text-[10px] text-slate-500">
                    (edited)
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edited {formatIsoString(message.editedTimestamp)}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
