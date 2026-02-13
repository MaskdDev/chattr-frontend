import { PanelLeftIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import * as React from "react";

export default function RoomSidebarTrigger({
  className,
  ...props
}: React.ComponentProps<"button">) {
  // Get sidebar
  const sidebar = useSidebar();

  // Return component
  return (
    <button
      onClick={() => sidebar.toggleSidebar()}
      className={cn("text-slate-50", className)}
      {...props}
    >
      <PanelLeftIcon />
    </button>
  );
}
