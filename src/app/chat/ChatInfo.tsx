import UserAvatar from "@/components/common/UserAvatar";
import { useChat } from "./ChatContext";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FileIcon from "@/components/common/FileIcon";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ChatInfo() {
  const { chat } = useChat();

  const info = {
    role: "Team leader",
    address: "110 Lamar Station Apt. 730 - Hagerstown, OK / 49808",
    phone: "+61 2 9876 5432",
    email: "violet.ratke86@yahoo.com",
  };

  const attachements = [
    {
      name: "cover-3.jpg",
      date: "18 Mar 2025 10:58 pm",
    },
    {
      name: "design-suriname-2015.mp3",
      date: "17 Mar 2025 9:58 pm",
    },
    {
      name: "expertise-2015-conakry-sao-tome-and-principe-gender.mp4",
      date: "16 Mar 2025 8:58 pm",
    },
    {
      name: "money-popup-crack.pdf",
      date: "15 Mar 2025 7:58 pm",
    },
  ];

  return (
    <div className="overflow-auto">
      <div className="py-4 flex flex-col items-center justify-center">
        <UserAvatar
          className="w-20 h-20"
          name={chat.name}
          avatar={chat.avatar}
        />
        <p className="mt-2">{chat.name}</p>
        <p className="text-muted-foreground">{info.role}</p>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-gray-100 py-2 px-4 text-gray-700 uppercase text-sm">
            Information
          </AccordionTrigger>
          <AccordionContent>
            <ul className="px-4 mt-4 space-y-3 text-gray-700">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 shrink-0" />
                <p>{info.address}</p>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <p>{info.email}</p>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <p>{info.phone}</p>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-gray-100 py-2 px-4 text-gray-700 uppercase text-sm">
            Attachements
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-4 space-y-4 pt-4">
              {attachements.map((item, index) => (
                <div
                  key={`attachement-${index}`}
                  className="flex items-center gap-2"
                >
                  <div className="shrink-0">
                    <FileIcon name={item.name} className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-semibold truncate">{item.name}</p>
                    <p className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{item.date}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
