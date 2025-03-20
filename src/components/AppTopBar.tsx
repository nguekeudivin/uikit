import { Bell, Menu, MessageCircleMore } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import SearchDialog from "./common/SearchDialog";

interface TopBarProps {
  toggleMenu?: any;
}
export default function TopBar({ toggleMenu }: TopBarProps) {
  return (
    <div
      id="topbar"
      className="no-print bg-white py-4 px-4 rounded-lg flex items-center justify-between"
    >
      <div>
        <button
          className="md:hidden"
          onClick={() => {
            if (toggleMenu) toggleMenu();
          }}
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="items-center flex justify-between text-muted-foreground space-x-4">
        <div className="flex items-center">
          <SearchDialog />
        </div>
        <div className="relative">
          <Link href="/chat">
            <button>
              <MessageCircleMore />
            </button>
          </Link>
          {/* <div className="absolute w-3 h-3 bg-red-400 rounded-full -right-1 top-0"></div> */}
        </div>
        <div className="relative">
          <button>
            <Bell />
          </button>

          <div className="absolute w-3 h-3 bg-red-400 rounded-full -right-1 top-0"></div>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
