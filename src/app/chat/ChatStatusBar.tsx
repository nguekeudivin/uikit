import UserAvatar from "@/components/common/UserAvatar";
import { MdArrowBack } from "react-icons/md";
import { useChat } from "./ChatContext";
import {
  BellOff,
  CircleOff,
  EllipsisVertical,
  PanelLeftOpen,
  Phone,
  Trash,
  TriangleAlert,
  Video,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function ChatStatusBar({
  chat,
  onBack,
}: {
  chat: any;
  onBack: any;
}) {
  const { showChatInfo, setShowChatInfo } = useChat();

  const actions = [
    {
      icon: Phone,
      text: "Call",
      action: () => {},
    },
    {
      icon: Video,
      text: "video call",
      action: () => {
        window.print();
      },
    },
    {
      icon: PanelLeftOpen,
      text: "Details",
      action: () => {
        // Print it
        setShowChatInfo(!showChatInfo);
      },
    },
  ];

  return (
    <div className="border-b flex h-full justify-between items-center px-4">
      <div className="flex items-center">
        <button className="md:hidden" onClick={onBack}>
          <MdArrowBack className="w-5 h-5 text-gray-500" />
        </button>
        <div className="ml-3">
          <UserAvatar name={chat.name} avatar={chat.avatar} />
        </div>
        <div className="ml-4">
          <h3>{chat.name}</h3>
          <h4 className="text-xs">Online</h4>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {actions.map((item, index) => (
          <div
            key={`action-${index}`}
            className={cn({
              "hidden md:block": item.text != "Details",
            })}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      item.action();
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <item.icon className="w-5 h-5 text-gray-600" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{item.text}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical className="w-4 h-4 text-gray-800" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {actions
              .filter((item) => item.text != "Details")
              .map((item) => (
                <DropdownMenuItem
                  key={`dropdown-status-${item.text}`}
                  className="md:hidden"
                >
                  <item.icon />
                  <span>{item.text}</span>
                </DropdownMenuItem>
              ))}
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <BellOff />
              <span>Hide notification</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CircleOff />
              <span> Block</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <TriangleAlert />
              <span>Report</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 bg-red-50 focus:text-red-500 focus:bg-red-100">
              <Trash className="text-red-500" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
