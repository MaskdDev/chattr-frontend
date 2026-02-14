import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideLogOut, EllipsisVertical, Settings } from "lucide-react";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { UserProfile } from "@/lib/types";
import { cn, getInitials } from "@/lib/utils";
import { signOutAndClear } from "@/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";

export default function RoomSidebarProfile({
  user,
  openSettings,
}: {
  user: UserProfile | null;
  openSettings: () => void;
}) {
  // Use query client
  const queryClient = useQueryClient();

  // Use fallback user while user is loading
  if (user === null) {
    user = {
      id: "",
      username: "...",
      displayName: "Loading...",
      avatarUrl: null,
    };
  }

  // Check if we're on a mobile view
  const { isMobile } = useSidebar();

  // Create avatar block component
  const AvatarBlock = ({ grayscale }: { grayscale?: boolean }) => (
    <>
      <Avatar className={cn("size-8 rounded-lg", grayscale ? "grayscale" : "")}>
        <AvatarImage src={user.avatarUrl ?? undefined} alt={user.displayName} />
        <AvatarFallback className="rounded-lg">
          {getInitials(user.displayName ?? "Deleted User")}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.displayName}</span>
        <span className="text-muted-foreground truncate text-xs">
          @{user.username}
        </span>
      </div>
    </>
  );

  // Return component
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-slate-800 hover:text-slate-50"
        >
          <AvatarBlock grayscale />
          <EllipsisVertical className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <AvatarBlock />
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => openSettings()}>
            <Settings />
            Account Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOutAndClear(queryClient)}>
          <LucideLogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
