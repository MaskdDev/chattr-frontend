import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function RoomMessageButton({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Button
      size="icon-sm"
      className={cn("bg-slate-900 hover:scale-105 focus:scale-105", className)}
      {...props}
    >
      {children}
    </Button>
  );
}
