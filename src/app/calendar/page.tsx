"use client";

import CalendarView from "./CalendarView";
import { schedules } from "@/api-call/endpoints/schedules";

import { format } from "date-fns";
import colors from "@/lib/colors";
import { useState } from "react";
import { Minus } from "lucide-react";

export default function CalendarPage() {
  const [selected, setSelected] = useState<any[]>([]);

  const addItem = () => {
    // handle click to add new item here.
  };

  const handleSelectDate = (date: Date, items: any) => {
    setSelected(items);
  };

  return (
    <section className="px-8">
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl font-bold"> Calendar </h2>
      </div>
      <CalendarView
        schedules={schedules}
        onAddItem={addItem}
        onSelectDate={handleSelectDate} // handle when a date with schedules is selected
        createItemComponent={(item, index) => (
          <div
            key={`${format(item.startDate, "yyyy-MM-dd")}${index}`}
            className="h-full p-1 rounded-lg font-normal"
            style={{ backgroundColor: colors[item.label] }}
          >
            <h4 className="text-sm">{item.title}</h4>
            <div className="flex gap-1 items-center">
              <span className="text-xs text-gray-700">
                {format(item.startDate, "hh:mm a")}
              </span>{" "}
              <Minus className="w-2 h-2" />
              <span className="text-xs text-gray-700">
                {format(item.endDate, "hh:mm a")}
              </span>
            </div>
          </div>
        )}
      />
    </section>
  );
}
