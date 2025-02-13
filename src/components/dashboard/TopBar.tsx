import { Bell, ChevronDown, MessageCircleMore, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";

export default function TopBar() {
  return (
    <div className="bg-white py-4 px-4 rounded-lg flex items-center justify-between">
      <div></div>
      <div className="items-center flex justify-between text-muted-foreground space-x-4">
        <div className="relative w-[250px]">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className="text-gray-400" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full px-4 py-2 text-sm ps-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Search for something."
            required
          />
        </div>
        <div className="relative">
          <button>
            <MessageCircleMore />
          </button>
          {/* <div className="absolute w-3 h-3 bg-red-400 rounded-full -right-1 top-0"></div> */}
        </div>
        <div className="relative">
          <button>
            <Bell />
          </button>
          <div className="absolute w-3 h-3 bg-red-400 rounded-full -right-1 top-0"></div>
        </div>

        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div>
          <p className="text-gray-900 text-sm font-medium">Andrew Sebastian</p>
          <p className="text-xs text-muted-foreground">HR</p>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ChevronDown />
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
