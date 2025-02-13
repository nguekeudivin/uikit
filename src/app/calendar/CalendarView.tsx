"use client";

import React, { ReactNode, useEffect, useState } from "react";
import clsx from "clsx";
import { addMonths, addWeeks, format, subMonths, subWeeks } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCalendar } from "./useCalendar";

interface CalendarViewProps {
  schedules: any[];
  onAddItem?: () => void;
  createItemComponent: (item: any, index: number) => ReactNode;
  onSelectDate?: (date: Date, items: any) => void;
}

export default function CalendarView({
  schedules,
  onAddItem = () => {},
  createItemComponent,
  onSelectDate = () => {},
}: CalendarViewProps) {
  useEffect(() => {
    const calendar = document.getElementById("calendar");
    const container = document.getElementById("calendar-container");

    if (calendar && container) {
      // Make the draw fit so screen larger or than 14 inches screen size. if the screen is smaller then the calendar scroll.
      if (window.innerWidth <= 1500) calendar.style.width = `${7 * 100}px`;
    }
  }, []);

  const {
    renderWeek,
    renderMonth,
    setMode,
    mode,
    currentDate,
    setCurrentDate,
  } = useCalendar({
    onAddItem,
    createItemComponent,
    onSelectDate,
    data: schedules,
    defaultMode: "week",
  });

  return (
    <div className="rounded-xl shadow-xl bg-white">
      <header className="flex items-center justify-between p-6 text-lg">
        <div>
          <Select
            defaultValue="month"
            onValueChange={(value: string) => {
              setMode(value);
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="agenda">Agenda</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() =>
              mode == "week"
                ? setCurrentDate(subWeeks(currentDate, 1))
                : setCurrentDate(subMonths(currentDate, 1))
            }
            className="w-8 h-8 inline-flex hover:bg-gray-100 items-center justify-center rounded-full"
          >
            <ChevronLeft />
          </button>
          <span>{format(currentDate, "MMM dd, yyyy")}</span>
          <button
            onClick={() =>
              mode == "week"
                ? setCurrentDate(addWeeks(currentDate, 1))
                : setCurrentDate(addMonths(currentDate, 1))
            }
            className="w-8 h-8 inline-flex hover:bg-gray-100 items-center justify-center rounded-full"
          >
            <ChevronRight />
          </button>
        </div>
        <div></div>
      </header>

      <section id="calendar-container" className="bg-white overflow-auto">
        <div id="calendar" className="flex">
          {mode != "month" && (
            <aside className="w-[80px]">
              <div className="h-12 border-b"></div>
              {Array.from({ length: 24 }).map((item, index) => (
                <div
                  className={clsx("border-b border-0.5 h-[60px]", {
                    "bg-gray-100": index % 2 == 0,
                  })}
                >
                  <div className="border-b h-[50%] flex items-center justify-center">
                    {format(
                      new Date(
                        `01-01-2025 ${index > 9 ? index : `0${index}`}:00:00`
                      ),
                      "ha"
                    ).toLowerCase()}
                  </div>
                  <div></div>
                </div>
              ))}
            </aside>
          )}

          <aside className="w-full">
            <div className="w-full grid grid-cols-7 gap-4 border  h-12">
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thurday",
                "Friday",
                "Saturday",
              ].map((day) => (
                <div
                  key={day}
                  className="text-center font-semibold text-lg  flex justify-center items-center"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {mode == "week" ? renderWeek() : renderMonth()}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
