"use client";

import { Calendar, Mail, Paperclip, Plus, Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { Column, KanbanBoard } from "@/components/custom/KanbanBoard";
import UserAvatar from "@/components/custom/UserAvatar";
import { format } from "date-fns";
import { boards } from "@/api-call/endpoints/kanban";

export default function KanbanPage() {
  const [columns, setColumns] = useState<Column[]>(boards);

  const addItem = () => {
    // Write the code to add item here.
  };

  const onMoveItem = (candidate: any, from: Column, to: Column) => {
    // When a candidate is mote from one board to another one, his status change.
    // we handle the status change here.
    console.log(candidate);
    console.log("from", from);
    console.log("to", to);
    // Implement the api call here to handle moving a candidate from one status to another one.
  };

  const handleInputSearch = (e: FormEvent) => {
    // Handle input search
    // It will be better to redirect directly to candidates page since this search input does not really fit the logic of this page
  };

  return (
    <>
      <section className="pl-4">
        <div className="mt-4 w-full relative">
          <KanbanBoard
            addItem={addItem}
            setColumns={setColumns}
            onMoveItem={onMoveItem}
            columns={columns.map((col) => {
              return {
                ...col,
                items: col.items.map((item) => ({
                  ...item,
                  colId: col.id, // it's usefull.
                  component: (
                    <div className="bg-white p-4 border shadow-md mb-4 rounded-xl">
                      <div className="flex justify-between">
                        <div className="flex">
                          <div className="">
                            <UserAvatar
                              name={item.name}
                              avatar={item.avatar as string}
                            />
                          </div>
                          <div className="ml-2">
                            <h3 className="">{item.name}</h3>
                            <h4 className="text-sm text-muted-foreground">
                              {item.email}
                            </h4>
                          </div>
                        </div>
                        <div>
                          <span className="block bg-secondary/50 rounded-full p-0.5 px-2 text-sm">
                            {item.progress}%
                          </span>
                        </div>
                      </div>

                      <p className="mt-3 font-medium">{item.role}</p>
                      <footer className="border-t mt-3 pt-3 flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{format(item.date, "MMM dd")}</span>
                        </div>
                        <div className="flex gap-2 text-muted-foreground items-center">
                          <Paperclip className="w-4 h-4" />
                          <span>{item.attachmentsCount}</span>
                          <Mail className="w-4 h-4" />
                          <span>{item.emailsCount}</span>
                        </div>
                      </footer>
                    </div>
                  ),
                })),
              };
            })}
          />
        </div>
      </section>
    </>
  );
}
