import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MouseEventHandler, ReactNode } from "react";

export default function RoomMessageButton({
  className,
  children,
  onClick,
  ...props
}: {
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Button
      size="icon-sm"
      className={cn("bg-slate-900 hover:scale-105 focus:scale-105", className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
}
