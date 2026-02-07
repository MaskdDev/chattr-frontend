import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Monitor, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";

export default function SourceDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          className="w-40 bg-slate-200 font-sans text-lg text-slate-950 hover:text-slate-50"
        >
          <SiGithub />
          View Source
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select Repository</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <a href="https://github.com/MaskdDev/chattr-frontend">
            <Monitor /> Frontend
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="https://github.com/MaskdDev/chatrooms-backend-v1">
            <Server /> Backend
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
