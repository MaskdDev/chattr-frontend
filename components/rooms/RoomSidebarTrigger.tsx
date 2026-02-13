import { PanelLeftIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export default function RoomSidebarTrigger() {
  // Get sidebar
  const sidebar = useSidebar();

  // Return component
  return (
    <button onClick={() => sidebar.toggleSidebar()}>
      <PanelLeftIcon className="text-slate-50" />
    </button>
  );
}
