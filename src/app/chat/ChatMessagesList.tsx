import { cn } from "@/lib/utils";

export default function ChatMessagesList({ chat }: { chat: any }) {
  return (
    <>
      {chat.messages.map((item: any, index: number) => (
        <div
          key={`chat-message-${index}`}
          className={cn("flex items-center px-4 py-2", {
            "justify-start": item.sender_id == 0,
            "justify-end": item.sender_id == 1,
          })}
        >
          <div
            className={cn("max-w-[600px] p-2", {
              " text-white rounded-xl rounded-bl-none": item.sender_id == 0,
              "bg-gray-200 rounded-lg rounded-br-none": item.sender_id == 1,
            })}
          >
            {item.image && (
              <div
                className="w-36 h-36 bg-cover"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
            )}
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </>
  );
}
