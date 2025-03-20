import UserAvatar from "@/components/common/UserAvatar";
import { useChat } from "./ChatContext";

import { Power, Settings, SquareUser } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function UserMenu() {
  const { user } = useChat();

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <div>
            <UserAvatar name={user.name} avatar={user.avatar} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <div className="flex items-center justify-between w-full font-normal p-4">
            <div>
              <p className="font-semibold">Afrika Kemi</p>
              <p className="text-sm">afrikakemi@gmali.com</p>
            </div>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button>
                      <Power className="w-4 h-4 text-red-500" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Logout</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="border-t my-b"></div>
          <ul className="p-2">
            <li className="hover:bg-gray-100 flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer">
              <div className="w-2.5 h-2.5 rounded-full bg-green-600"></div>
              <span>Online</span>
            </li>
            <li className="hover:bg-gray-100 flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer">
              <SquareUser className="w-4 h-4" />
              Profile
            </li>
            <li className="hover:bg-gray-100 flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer">
              <Settings className="w-4 h-4" />
              Settings
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </>
  );
}
