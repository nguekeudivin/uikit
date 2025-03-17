"use client";

import { useSimpleForm } from "@/hooks/use-simple-form";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  MdCloseFullscreen,
  MdFullscreen,
  MdImage,
  MdSearch,
  MdSend,
} from "react-icons/md";
import ChatsList from "./ChatsList";
import ChatStatusBar from "./ChatStatusBar";
import ChatMessagesList from "./ChatMessagesList";
import { chats } from "@/api-call/mocks/chats";
import { ChatContext } from "./ChatContext";
import MessageInput from "./MessageInput";
import UserAvatar from "@/components/common/UserAvatar";
import { MessageSquarePlus } from "lucide-react";

export default function MessagesPage() {
  const [chat, setChat] = useState<any>(chats[0]);

  const form = useSimpleForm({
    defaultValues: {
      message: "",
      image: undefined,
      video: undefined,
    },
  });

  const sendMessage = (input: any) => {
    setChat((cht: any) => ({
      ...cht,
      messages: [
        ...cht.messages,
        {
          sender_id: 1,
          receiver_id: 0,
          content: form.values.message,
          image: form.values.image,
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

    calculateElementsSizes();

    window.onresize = () => {
      calculateElementsSizes();
    };
  }, []);

  const calculateElementsSizes = () => {
    const container = document.getElementById("container") as HTMLElement;
    const inputContainer = document.getElementById(
      "input-container"
    ) as HTMLElement;
    const chatMessageList = document.getElementById(
      "chat-messages-list"
    ) as HTMLElement;
    const chatStatusBar = document.getElementById(
      "chat-status-bar"
    ) as HTMLElement;
    const topBar = document.getElementById("top-bar") as HTMLElement;

    if (chatMessageList) {
      chatMessageList.style.height = `${
        container.offsetHeight -
        chatStatusBar.offsetHeight -
        inputContainer.offsetHeight -
        topBar.offsetHeight
      }px`;
    }
  };

  const [fullScreen, setFullScreen] = useState<boolean>(false);

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
    setTimeout(calculateElementsSizes, 50);
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
  };

  return (
    <ChatContext.Provider value={{ user, form, sendMessage }}>
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
          id="container"
          className={clsx("overflow-hidden border rounded-2xl shadow", {
            "fixed top-0 left-0 w-full h-screen bg-white": fullScreen,
            "h-[600px] md:h-[700px] mt-4 md:mt-8": !fullScreen,
          })}
        >
          <div
            id="top-bar"
            className={clsx(
              "flex justify-between overflow-hidden  items-center",
              {
                "h-[0px]": !fullScreen,
                "h-auto py-1 px-4  border-b": fullScreen,
              }
            )}
          >
            <h2 className="text-4xl text-green-600 font-black">M</h2>
            <div>
              <button
                onClick={toggleFullScreen}
                className="icon-btn bg-primary p-2"
              >
                <MdCloseFullscreen className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="w-full h-full flex">
            <aside
              className={clsx("w-full md:w-1/4 h-full border-r border-r-2 ", {
                "hidden md:block": !show["chatsList"],
              })}
            >
              <div className="border-b py-4 px-4">
                <div className="flex items-center justify-between">
                  <UserAvatar name={user.name} avatar={user.avatar} />
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
              <div id="chat-status-bar" className="h-16">
                <ChatStatusBar chat={chat} onBack={onBack} />
              </div>

              <div id="chat-messages-list" className="space-y-2">
                <ChatMessagesList chat={chat} />
              </div>

              <div
                id="input-container"
                className="border-t w-full overflow-auto"
              >
                <MessageInput />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </ChatContext.Provider>
  );
}
