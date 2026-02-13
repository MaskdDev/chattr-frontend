import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import { Copy } from "lucide-react";
import { PartialInvite } from "@/lib/types";

export default function InviteCreatedDialog({
  open,
  setOpen,
  invite,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  invite: PartialInvite | null;
}) {
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

        <div className="flex w-full flex-row items-center justify-center gap-3 rounded-xl border-2 border-slate-600 bg-white px-3 py-1">
          <input
            type="text"
            className="h-10 w-full bg-white px-2 focus:outline-none"
            value={inviteUrl}
            readOnly
          />
          <Button
            aria-label="Copy invite URL"
            onClick={() => navigator.clipboard.writeText(inviteUrl)}
          >
            <Copy className="text-slate-50" />
            Copy URL
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
