import { useState } from "react";
import { SendHorizontal } from "lucide-react";

export default function RoomMessageBox({
  sendCallback,
  disabled,
}: {
  sendCallback: (message: string) => Promise<void>;
  disabled: boolean;
}) {
  // Create message box state
  const [message, setMessage] = useState("");

  // Return component
  return (
    <form
      className="flex w-full flex-row items-center justify-center gap-3 rounded-xl border-2 border-slate-600 bg-white px-3 py-1.5"
      onSubmit={async (event) => {
        // Prevent default event
        event.preventDefault();

        // Check if message is valid
        if (message.trim().length > 0) {
          sendCallback(message).then(() => setMessage(""));
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
      />
      <button type="submit" aria-label="Send message" disabled={disabled}>
        <SendHorizontal className="text-slate-900" />
      </button>
    </form>
  );
}
