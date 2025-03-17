import UserAvatar from "@/components/common/UserAvatar";
import { format } from "date-fns";

export default function ChatsList({
  chats,
  selectChat,
}: {
  selectChat: any;
  chats: any[];
}) {
  const getLastMessageTime = (chat: any) => {
    const time = chat.lastMessageTime;
    if (time == undefined) {
      return chat.messages.sort((a: any, b: any) => b.time - a.time)[0].time;
    } else {
      return time;
    }
  };

  return (
    <>
      {chats.map((item, index) => (
        <div
          key={`chart-item-${index}`}
          onClick={() => {
            selectChat(item);
          }}
          className="flex px-4 border-b border-gray-200 py-2 w-full hover:bg-primary/10 cursor-pointer"
        >
          <div>
            <UserAvatar avatar={item.avatar} name={item.name} />
          </div>
          <div className="ml-4 w-full">
            <div className="flex items-center justify-between w-full">
              <h3>{item.name}</h3>
              <span className="text-xs">
                {format(getLastMessageTime(item), "hh:mm")}
              </span>
            </div>
            <h4 className="text-sm mt-1 h-6 overflow-hidden w-full text-muted-foreground">
              {item.messages[item.messages.length - 1].content}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}
