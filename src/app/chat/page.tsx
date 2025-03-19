"use client";

import { useSimpleForm } from "@/hooks/use-simple-form";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { MdCloseFullscreen, MdFullscreen, MdSearch } from "react-icons/md";
import ChatsList from "./ChatsList";
import ChatStatusBar from "./ChatStatusBar";
import ChatMessagesList from "./ChatMessagesList";
import { chats } from "@/api-call/mocks/chats";
import { ChatContext } from "./ChatContext";
import MessageInput from "./MessageInput";
import { MessageSquarePlus } from "lucide-react";
import UserMenu from "./UserMenu";
import ChatInfo from "./ChatInfo";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const [chat, setChat] = useState<any>(chats[0]);
  const [fullScreen, setFullScreen] = useState<boolean>(false);

  const form = useSimpleForm({
    defaultValues: {
      message: "",
      image: undefined,
      video: undefined,
      document: undefined,
    },
  });

  const sendMessage = (input: any) => {
    setChat((cht: any) => ({
      ...cht,
      messages: [
        ...cht.messages,
        {
          sender_id: 1,
          receiver_id: chat.id,
          content: form.values.message,
          image: form.values.image,
          document: form.values.document,
          time: new Date().getTime(),
          ...input,
        },
      ],
    }));
    form.setValue("message", "");
  };

  useEffect(() => {
    form.setValue("message", "");
    form.setValue("image", null);
    form.setValue("document", null);
  }, []);

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
    // setTimeout(calculateElementsSizes, 50);
  };

  const [show, setShow] = useState<Record<string, boolean>>({
    chatsList: true,
    messagesList: false,
  });

  const selectChat = (item: any) => {
    setChat(() => ({ ...item }));
    setShow((current) => ({
      ...current,
      chatsList: false,
      messagesList: true,
    }));
  };

  const onBack = () => {
    setShow((current) => ({
      ...current,
      chatsList: true,
      messagesList: false,
    }));
  };

  const user = {
    name: "Divino FC",
    avatar: "/assets/images/avatar/avatar-4.webp",
    id: 1,
  };

  const [showChatInfo, setShowChatInfo] = useState<boolean>(false);

  return (
    <ChatContext.Provider
      value={{ user, form, sendMessage, chat, showChatInfo, setShowChatInfo }}
    >
      <section className="mt-8 mb-24">
        <h2 className="text-2xl md:text-3xl items-center flex  justify-between">
          <span className="font-bold"> Chat </span>
          <button
            onClick={toggleFullScreen}
            className="text-gray-600 rounded-full hover:bg-gray-100 p-1"
          >
            <MdFullscreen />
          </button>
        </h2>

        <div
          className={clsx(
            "rounded-2xl border overflow-hidden shadow h-[600px] md:h-[700px] mt-4 md:mt-8",
            {
              "fixed top-0 left-0 w-full h-screen md:h-screen mt-0 md:mt-0 bg-white":
                fullScreen,
            }
          )}
        >
          <div
            className={clsx(
              "flex justify-between overflow-hidden  items-center absolute top-0 left-0 w-full",
              {
                "h-[0px]": !fullScreen,
                "h-16 py-1 px-4  border-b": fullScreen,
              }
            )}
          >
            <h2 className="text-2xl font-semibold">Chat</h2>
            <div>
              <button
                onClick={toggleFullScreen}
                className="text-muted-foregronud p-2"
              >
                <MdCloseFullscreen className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div
            className={cn("w-full h-full flex", {
              "pt-16": fullScreen,
            })}
          >
            <aside
              className={clsx("w-full md:w-1/4 h-full border-r border-r-2 ", {
                "hidden md:block": !show["chatsList"],
              })}
            >
              <div className="border-b py-4 px-4">
                <div className="flex items-center justify-between">
                  <UserMenu />
                  <button className="p-2 rounded-full hover:bg-gray-100 text-muted-foreground">
                    <MessageSquarePlus className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative w-full mt-4">
                  <button className="px-2 py-2 rounded-full  absolute top-0 left-1">
                    <MdSearch className="text-gray-300 md:w-8 md:h-8 w-4 h-4" />
                  </button>
                  <input
                    name="searchKeyword"
                    className="rounded-lg block w-full py-2.5 pl-12 border focus:outline-none focus:ring-2 focus:ring-primarySoft focus:border-transparent md:text-base text-xs"
                    placeholder="Rechercher"
                  />
                </div>
              </div>
              <ChatsList chats={chats} selectChat={selectChat} />
            </aside>

            <aside
              className={clsx("w-full md:w-3/4  relative", {
                "hidden md:block": !show["messagesList"],
              })}
            >
              <div className="h-16 absolute top-0 left-0 w-full">
                <ChatStatusBar chat={chat} onBack={onBack} />
              </div>

              <div className="flex h-full w-full pt-16">
                <div
                  className={cn("h-full w-full", {
                    "hidden md:block": showChatInfo,
                  })}
                >
                  <div className="space-y-2 py-8 pb-32 h-full overflow-hidden hover:overflow-auto scrollbar-thin scrollbar-thumb-gray-primary scrollbar-track-gray-200 ">
                    <ChatMessagesList chat={chat} />
                  </div>

                  <div className="h-20 bg-white  border-t  w-full bottom-0 absolute left-0 overflow-auto scrollbar-thin scrollbar-thumb-gray-primary scrollbar-track-gray-200">
                    <MessageInput />
                  </div>
                </div>

                <div
                  className={cn(
                    "w-full md:w-[300px] shrink-0 border-l h-full overflow-hidden hover:overflow-auto scrollbar-thin scrollbar-thumb-gray-primary scrollbar-track-gray-200",
                    {
                      hidden: !showChatInfo,
                    }
                  )}
                >
                  <ChatInfo />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </ChatContext.Provider>
  );
}
