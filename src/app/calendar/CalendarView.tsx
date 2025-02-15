"use client";

import React, { ReactNode, useEffect, useState } from "react";
import clsx from "clsx";
import {
  addDays,
  addMonths,
  addWeeks,
  format,
  isSameDay,
  isSameMonth,
  isSameWeek,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCalendar } from "./useCalendar";
import { dateFromHourIndex } from "@/lib/utils";
import Agenda from "@/components/calendar/Agenda";
import { useAgenda } from "./useAgenda";

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
    render,
    setMode,
    mode,
    currentDate,
    setCurrentDate,
    daysList,
    renderDayName,
  } = useCalendar({
    onAddItem,
    createItemComponent,
    onSelectDate,
    data: schedules,
    defaultMode: "agenda",
  });

  const { setAgendaMode, changeAgendaDate, filterAgendaData } = useAgenda({
    currentDate,
    setCurrentDate,
  });

  return (
    <div className="rounded-xl shadow-xl bg-white">
      <header className="flex items-center justify-between p-6 text-lg">
        <div>
          <Select
            defaultValue="agenda"
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

        {mode == "agenda" && (
          <div>
            <Select
              defaultValue="month"
              onValueChange={(value: string) => {
                setAgendaMode(value);
              }}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              if (mode == "week") setCurrentDate(subWeeks(currentDate, 1));
              if (mode == "month") setCurrentDate(subMonths(currentDate, 1));
              if (mode == "day") setCurrentDate(subDays(currentDate, 1));
              if (mode == "agenda") changeAgendaDate(-1);
            }}
            className="w-8 h-8 inline-flex hover:bg-gray-100 items-center justify-center rounded-full"
          >
            <ChevronLeft />
          </button>
          <span>{format(currentDate, "EEEE MMM dd, yyyy")}</span>
          <button
            onClick={() => {
              if (mode == "week") setCurrentDate(addWeeks(currentDate, 1));
              if (mode == "month") setCurrentDate(addMonths(currentDate, 1));
              if (mode == "day") setCurrentDate(addDays(currentDate, 1));
              if (mode == "agenda") changeAgendaDate(1);
            }}
            className="w-8 h-8 inline-flex hover:bg-gray-100 items-center justify-center rounded-full"
          >
            <ChevronRight />
          </button>
        </div>
        <div></div>
      </header>

      <section id="calendar-container" className="bg-white overflow-auto">
        {mode == "agenda" ? (
          <Agenda data={filterAgendaData(schedules)} />
        ) : (
          <div id="calendar" className="flex">
            <aside className="w-full">
              <div className="flex items-center border h-12">
                {mode != "month" && <div className="w-[80px]"></div>}
                {mode == "day" ? (
                  <div className="w-full text-center font-semibold text-lg  flex justify-center items-center">
                    {renderDayName(format(currentDate, "EEEE"))}
                  </div>
                ) : (
                  <div className="w-full grid grid-cols-7 gap-4 ">
                    {daysList.map((day) => (
                      <div
                        key={day}
                        className="text-center font-semibold text-lg  flex justify-center items-center"
                      >
                        {renderDayName(day)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex ">
                {mode != "month" && (
                  <aside className="w-[80px]">
                    <div className="h-12 border-b flex items-center justify-center">
                      All day
                    </div>
                    {Array.from({ length: 24 }).map((item, index) => (
                      <div
                        key={`daytimes${index}`}
                        className={clsx("border-b border-0.5 h-[80px]", {
                          "bg-gray-100": index % 2 == 0,
                        })}
                      >
                        <div className="border-b h-[50%] flex items-center justify-center">
                          {format(dateFromHourIndex(index), "ha").toLowerCase()}
                        </div>
                        <div></div>
                      </div>
                    ))}
                  </aside>
                )}
                <div className="w-full grid grid-cols-7">{render()}</div>
              </div>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
