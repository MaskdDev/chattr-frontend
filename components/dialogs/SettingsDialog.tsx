import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export function SettingsDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (state: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 md:max-h-125 md:max-w-175 lg:max-w-200">
        <DialogTitle className="sr-only">Account Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <div className="flex flex-col items-center gap-2 overflow-y-auto p-4 py-10">
          <h1 className="text-xl sm:text-4xl">Account settings coming soon!</h1>
        </div>
      </DialogContent>
    </Dialog>
  );
}
