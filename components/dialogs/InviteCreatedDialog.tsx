import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Check, Copy } from "lucide-react";
import { PartialInvite } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function InviteCreatedDialog({
  open,
  setOpen,
  invite,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  invite: PartialInvite | null;
}) {
  // Create copied state
  const [isCopied, setIsCopied] = useState(false);

  // Get invite URL
  const inviteUrl = `https://chattr.maskd.dev/invite/${invite?.code}`;

  // Return component
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Invite Created!</DialogTitle>
          <DialogDescription>
            Send out the invite code or the link to add people to the room.
          </DialogDescription>
        </DialogHeader>

        <div className="flex w-full flex-row items-center justify-center gap-3 rounded-xl border-2 border-slate-600 bg-white px-3 py-1 shadow-md">
          <input
            type="text"
            className="h-10 w-full bg-inherit px-2 focus:outline-none"
            value={inviteUrl}
            readOnly
          />
          <Button
            aria-label="Copy invite URL"
            className={cn(
              isCopied
                ? "border border-slate-950 bg-inherit text-slate-950"
                : "bg-slate-950 text-slate-50",
            )}
            variant={isCopied ? "secondary" : "default"}
            onClick={async () => {
              // Copy URL to clipboard
              await navigator.clipboard.writeText(inviteUrl);

              // Set is copied to true for 3 seconds
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 3000);
            }}
          >
            <Copy className={isCopied ? "hidden" : "inline"} />
            <Check className={isCopied ? "inline" : "hidden"} />
            {isCopied ? "Copied!" : "Copy URL"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
