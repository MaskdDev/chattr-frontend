import { ButtonGroup } from "@/components/ui/button-group";
import { Edit2, Trash2 } from "lucide-react";
import MessageButton from "@/components/rooms/RoomMessageButton";
import { Message, Room, UserProfile } from "@/lib/types";

export default function RoomMessageButtons({
  userProfile,
  message,
  room,
  triggerMessageEdit,
}: {
  userProfile: UserProfile | null;
  message: Message;
  room: Room;
  triggerMessageEdit: () => void;
}) {
  // Get user ID, message author ID and room creator ID
  const userId = userProfile?.id;
  const authorId = message.author?.id;
  const creatorId = room.creator?.id;

  // If user ID exists, return button group
  if (userId) {
    return (
      <ButtonGroup aria-label="Message options button">
        {userId === authorId && (
          <MessageButton
            aria-label="Edit message"
            className="hover:text-green-300 focus:text-green-300"
            onClick={triggerMessageEdit}
          >
            <Edit2 className="size-4" />
          </MessageButton>
        )}

        {(userId === authorId || userId === creatorId) && (
          <MessageButton
            aria-label="Delete message"
            className="hover:text-red-400 focus:text-red-400"
          >
            <Trash2 className="size-4" />
          </MessageButton>
        )}
      </ButtonGroup>
    );
  }

  // Otherwise, return null
  return null;
}
