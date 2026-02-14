import { ButtonGroup } from "@/components/ui/button-group";
import { Edit2, Trash2 } from "lucide-react";
import MessageButton from "@/components/rooms/RoomMessageButton";

export default function RoomMessageButtons({
  triggerMessageEdit,
}: {
  triggerMessageEdit: () => void;
}) {
  return (
    <ButtonGroup aria-label="Message options button">
      <MessageButton
        aria-label="Edit message"
        className="hover:text-green-300 focus:text-green-300"
        onClick={triggerMessageEdit}
      >
        <Edit2 className="size-4" />
      </MessageButton>
      <MessageButton
        aria-label="Delete message"
        className="hover:text-red-400 focus:text-red-400"
      >
        <Trash2 className="size-4" />
      </MessageButton>
    </ButtonGroup>
  );
}
