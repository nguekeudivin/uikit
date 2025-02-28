"use client";

import React, { useEffect } from "react";
import clsx from "clsx";
import {
  addDays,
  addMonths,
  addWeeks,
  format,
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
import { useDays } from "./useDays";
import { dateFromHourIndex } from "@/lib/utils";
import Agenda from "@/app/calendar/Agenda";
import { useAgenda } from "./useAgenda";
import { Display } from "@/components/common/Display";
import { useCalendar } from "./CalendarContext";

export default function CalendarView() {
  const { items } = useCalendar();

  const {
    render,
    setMode,
    mode,
    currentDate,
    setCurrentDate,
    daysList,
    renderDayName,
  } = useDays({
    defaultMode: "month",
  });

  const { setAgendaMode, changeAgendaDate, filterAgendaData } = useAgenda({
    currentDate,
    setCurrentDate,
  });

  const previousDate = () => {
    if (mode == "week") setCurrentDate(subWeeks(currentDate, 1));
    if (mode == "month") setCurrentDate(subMonths(currentDate, 1));
    if (mode == "day") setCurrentDate(subDays(currentDate, 1));
    if (mode == "agenda") changeAgendaDate(-1);
  };

  const nextDate = () => {
    if (mode == "week") setCurrentDate(addWeeks(currentDate, 1));
    if (mode == "month") setCurrentDate(addMonths(currentDate, 1));
    if (mode == "day") setCurrentDate(addDays(currentDate, 1));
    if (mode == "agenda") changeAgendaDate(1);
  };

  // const updateViewSize = () => {
  //   const calendar = document.getElementById("calendar");
  //   const container = document.getElementById("calendar-container");

  //   if (calendar && container) {
  //     if (window.innerWidth <= 1500) calendar.style.width = `${7 * 100}px`;
  //   }
  // };

  useEffect(() => {
    if (window) {
      window.onresize = () => {
        if (window.innerWidth < 768) {
          setMode("agenda");
        }
      };
    }
  }, []);

  return (
    <div className="rounded-xl shadow-xl bg-white">
      <header className="flex items-center justify-between flex-wrap gap-2 p-6 text-lg">
        <div className="flex gap-4">
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
          <Display cond={mode == "agenda"} className="flex items-center gap-2">
            <span>of the</span>
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
          </Display>
        </div>
        <div>
          <div className="flex gap-2 items-center text-lg">
            <button
              onClick={previousDate}
              className="w-8 h-8 inline-flex hover:bg-gray-100 items-center justify-center rounded-full"
            >
              <ChevronLeft />
            </button>
            <span>{format(currentDate, "EEEE MMM dd, yyyy")}</span>
            <button
              onClick={nextDate}
              className="w-8 h-8 inline-flex hover:bg-gray-100 items-center justify-center rounded-full"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        <div></div>
      </header>

      <section id="calendar-container" className="bg-white overflow-auto">
        {mode == "agenda" ? (
          <Agenda items={filterAgendaData(items)} />
        ) : (
          <div id="calendar" className="flex">
            <aside className="w-full">
              <div className="flex items-center border h-12">
                <Display cond={mode != "month"}>
                  <div className="w-[80px]"></div>
                </Display>
                <Display
                  cond={mode == "day"}
                  className="w-full text-center font-semibold text-lg  flex justify-center items-center"
                >
                  {renderDayName(format(currentDate, "EEEE"))}
                </Display>

                <Display
                  cond={mode != "day"}
                  className="w-full grid grid-cols-7 gap-4 "
                >
                  {daysList.map((day) => (
                    <div
                      key={day}
                      className="text-center font-semibold text-lg  flex justify-center items-center"
                    >
                      {renderDayName(day)}
                    </div>
                  ))}
                </Display>
              </div>
              <div className="flex ">
                <Display cond={mode != "month"} className="w-[80px]">
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
                </Display>
                <div className="w-full grid grid-cols-7">{render()}</div>
              </div>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
