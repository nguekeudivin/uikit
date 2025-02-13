"use client";

import CalendarView from "./CalendarView";
import { schedules } from "@/api-call/endpoints/schedules";
import { format } from "date-fns";
import colors from "@/lib/colors";
import { useState } from "react";

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
            key={`${format(item.date, "yyyy-MM-dd")}${index}`}
            className="p-2 rounded-lg"
            style={{ backgroundColor: colors[item.department] }}
          >
            <h4 className="font-medium">{item.title}</h4>
            <p className="text-sm mt-2 text-gray-700">{item.department}</p>
            <p className="text-sm text-gray-700">
              {format(item.date, "hh:mm a")}
            </p>
          </div>
        )}
      />
    </section>
  );
}
