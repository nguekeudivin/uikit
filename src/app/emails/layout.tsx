"use client";
import clsx from "clsx";
import {
  MailOpen,
  OctagonAlert,
  Plus,
  Send,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import EmailWrapper from "./wrapper";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { EmailLabel } from "@/api-call/types";
import { getLabels } from "@/api-call/endpoints/emails";

export default function InboxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = () => [
    {
      text: "Inbox",
      icon: <MailOpen className="w-5 h-5" />,
      page: "/inbox",
      label: 10,
    },
    {
      text: "Starred",
      icon: <Star className="w-5 h-5" />,
      page: "/emails/starred",
    },
    {
      text: "Sent",
      icon: <Send className="w-5 h-5" />,
      page: "/emails/sent",
    },
    {
      text: "Drafts",
      icon: <Users className="w-5 h-5" />,
      page: "/emails/drafts",
    },
    {
      text: "Spam",
      icon: <OctagonAlert className="w-5 h-5" />,
      page: "/emails/spam",
    },
    {
      text: "Trash",
      icon: <Trash2 className="w-5 h-5" />,
      page: "/emails/trash",
    },
  ];

  const [activePage, setActivePage] = useState<string>("/dashboard");
  const [labels, setLabels] = useState<EmailLabel[]>([]);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    links().forEach((item) => {
      if (pathname == item.page) {
        setActivePage(item.page);
      }
    });
    getLabels().then((items) => setLabels(items));
  }, [pathname]);

  return (
    <section className="flex">
      <aside className="bg-white w-[200px] px-4">
        <ul className="space-y-2 relative">
          {links().map((item, index) => (
            <li
              key={`inbox${index}`}
              className={clsx(
                ` flex items-center px-4 py-3 rounded-md cursor-pointer justify-between relative`,
                {
                  "bg-secondary/10": item.page == activePage,
                }
              )}
              onClick={() => router.push(item.page)}
            >
              <div className="items-center flex">
                <span className={clsx(`text-xl text-gray-500`)}>
                  {item.icon}
                </span>
                <span className="ml-3 text-gray-700 hidden lg:block">
                  {item.text}
                </span>
              </div>
              {item.label != undefined && (
                <>
                  <div className="hidden lg:flex w-6 h-6   rounded bg-red-400 text-white rounded-full inline-flex items-center justify-center text-xs">
                    {item.label}
                  </div>
                  <div className="lg:hidden absolute w-3 h-3 bg-red-400 rounded-full right-3 top-2"></div>
                </>
              )}
            </li>
          ))}
        </ul>
        <div className="border-t p-4  text-muted-foreground">
          <div className="flex justify-between items-center">
            <h4 className="text-lg">Labels</h4>
            <button>
              <Plus />
            </button>
          </div>
          <ul className="mt-4">
            {labels.map((item, index) => (
              <li
                key={`inboxsidebarlabel${index}`}
                className="flex items-center space-x-4"
              >
                <div
                  className="w-8 h-4"
                  style={{ backgroundColor: item.color }}
                ></div>
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <aside className="bg-white p-4 rounded-lg w-full h-90-vh">
        <EmailWrapper>{children}</EmailWrapper>
      </aside>
    </section>
  );
}
