import UserAvatar from "@/components/common/UserAvatar";
import { MdArrowBack } from "react-icons/md";

export default function ChatStatusBar({
  chat,
  onBack,
}: {
  chat: any;
  onBack: any;
}) {
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
    </div>
  );
}
