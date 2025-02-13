"use client";

import { Button } from "@/components/ui/button";
import Card from "@/components/custom/Card";
import CardTitle from "@/components/custom/CardTitle";
import { Plus } from "lucide-react";
import { getTasks } from "@/api-call/endpoints/tasks";
import { Task } from "@/api-call/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    getTasks().then((tasks) => {
      setTasks(tasks.slice(0, 4));
    });
  }, []);

  return (
    <div className="w-full h-full">
      <Card>
        <CardTitle
          label="Tasks"
          action={
            <Button>
              <Plus className="w-5 h-5" />
            </Button>
          }
        />
        <div className="mt-4 overflow-auto space-y-4">
          {tasks.map((item: Task, index: number) => (
            <div
              key={`task${index}`}
              className="bg-gray-100 py-2 px-3 rounded flex items-center"
            >
              <div className="relative">
                <svg width="40" height="40" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#e6eafe"
                    strokeWidth="20"
                  />

                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#9baafd"
                    strokeWidth="20"
                    strokeDasharray={`${
                      90 * 2 * Math.PI * item.progress * 0.01
                    } ${90 * 2 * Math.PI * (100 - item.progress) * 0.01}`}
                    strokeDashoffset="0"
                    transform="rotate(-90 100 100)"
                  />
                </svg>
                <div
                  className="text-muted-foreground absolute top-[14px] left-[14px]"
                  style={{ fontSize: 8 }}
                >
                  {item.progress}%
                </div>
              </div>
              <div className="ml-2">
                <p className="font-medium text-sm">{item.title}</p>
                <div className="mt-1 text-muted-foreground flex items-center text-xs space-x-2">
                  <div>{item.category}</div>
                  <div className="w-1 h-1 bg-gray-400 block rounded-full"></div>
                  <div>{format(item.dueDate, "MMMM, dd yyyy")}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
