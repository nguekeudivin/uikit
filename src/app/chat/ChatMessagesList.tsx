import { cn, formatFileSize } from "@/lib/utils";
import { useChat } from "./ChatContext";
import { format } from "date-fns";
import FileIcon from "@/components/common/FileIcon";

export default function ChatMessagesList({ chat }: { chat: any }) {
  const { user } = useChat();

  return (
    <>
      {chat.messages.map((item: any, index: number) => (
        <div
          key={`chat-message-${index}`}
          className={cn("flex items-center px-4 py-2", {
            "justify-start": item.sender_id != user.id,
            "justify-end": item.sender_id == user.id,
          })}
        >
          <div className="max-w-[600px]">
            <div
              className={cn(" p-2", {
                "bg-gray-100  rounded-xl rounded-bl-none":
                  item.sender_id != user.id,
                "bg-sky-100 rounded-lg rounded-br-none":
                  item.sender_id == user.id,
              })}
            >
              {item.image && (
                <div
                  className="w-36 h-36 bg-cover"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
              )}
              {item.document && (
                <div className="flex items-center gap-2">
                  <div className="shrink-0">
                    <FileIcon name={item.document.name} className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-semibold truncate">
                      {item.document.name}
                    </p>
                    <p className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatFileSize(item.document.size)}</span>
                    </p>
                  </div>
                </div>
              )}
              <p>{item.content}</p>
            </div>
            <div className="text-end text-sm text-gray-700">
              {format(item.time, "HH:mm")}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
