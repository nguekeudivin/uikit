"use client";

import { users } from "@/api-call/mocks/users";
import FullPagination from "@/components/common/FullPagination";
import { Button } from "@/components/ui/button";
import { cn, paginateList } from "@/lib/utils";
import { ListPagination } from "@/types/shared";
import { User } from "@/types/users";
import {
  EllipsisVertical,
  FileDown,
  Mail,
  MessageSquareMore,
  Phone,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function TourBookers() {
  const [items, setItems] = useState<ListPagination<User>>(
    paginateList(users, 1, 12)
  );

  const makeCall = (item: any) => {};
  const sendMessage = (item: any) => {};
  const sendMail = (item: any) => {};
  const download = (item: any) => {};

  return (
    <>
      <div className="grid grid-cols-3 gap-8">
        {items.data.map((item, index) => (
          <div
            key={`friend${index}`}
            className="relative shadow rounded-xl p-4 flex items-center justify-between gap-2"
          >
            <div className="flex gap-4 w-full">
              <div
                className="w-12 h-12 bg-cover rounded-full shrink-0"
                style={{ backgroundImage: `url(${item.avatar})` }}
              ></div>
              <div className="flex gap-2 justify-between w-full">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <div className="text-muted-foreground flex gap-1 text-sm mt-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span> 15 </span>
                    <span>guests</span>
                  </div>
                  <div className="mt-4 flex gap-2 items-center">
                    {[
                      {
                        icon: Phone,
                        action: makeCall,
                        className: "text-red-500 bg-red-50 hover:bg-red-100",
                      },
                      {
                        icon: MessageSquareMore,
                        action: sendMessage,
                        className: "text-sky-500 bg-sky-50 hover:bg-sky-100",
                      },
                      {
                        icon: Mail,
                        action: sendMail,
                        className:
                          "text-green-500 bg-green-50 hover:bg-green-100",
                      },
                    ].map((item, index) => (
                      <button
                        key={`action${index}`}
                        onClick={() => item.action(item)}
                        className={cn(
                          "p-2 rounded-md transition-all duration-200 ease-in-out",
                          item.className
                        )}
                      >
                        <item.icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Button variant="outline" className="rounded-xl" size="sm">
                    {" "}
                    Approve{" "}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer className="mt-12 justify-center flex">
        <FullPagination
          pagination={items}
          onPrevious={() => {
            if (items.currentPage != 1)
              setItems(paginateList(users, items.currentPage - 1, 12));
          }}
          onNext={() => {
            if (items.currentPage != items.lastPage)
              setItems(paginateList(users, items.currentPage + 1, 12));
          }}
          onGoto={(page) => {
            setItems(paginateList(users, page, 12));
          }}
        />
      </footer>
    </>
  );
}
