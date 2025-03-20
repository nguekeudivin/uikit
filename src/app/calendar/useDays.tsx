import { MonthDayCard } from "@/app/calendar/MonthDayCard";
import { WeekDayCard } from "@/app/calendar/WeekDayCard";
import clsx from "clsx";
import { addDays, format, isSameDay, isSameMonth } from "date-fns";
import { useState } from "react";
import { useCalendar } from "./CalendarContext";

export function useDays({ defaultMode = "month" }: { defaultMode?: string }) {
  const daysList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday",
  ];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [mode, setMode] = useState<string>(defaultMode);
  const { items: data } = useCalendar();

  const computeMonthDates = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1); // First day of the current month
    const lastDayOfMonth = new Date(year, month + 1, 0); // Last day of the current month
    const daysInMonth = lastDayOfMonth.getDate(); // Total days in the current month
    const startingDay = firstDayOfMonth.getDay(); // Day of the week for the first day of the month (0 = Sunday, 6 = Saturday)

    const dates = [];

    // Get the last day of the previous month
    const lastDayOfPrevMonth = new Date(year, month, 0);
    const daysInPrevMonth = lastDayOfPrevMonth.getDate();

    // Add days from the previous month
    for (let i = startingDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i; // Days from the end of the previous month
      const date = new Date(year, month - 1, day);

      dates.push(date);
    }

    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      dates.push(date);
    }

    let totalCells = 35; // 7 days x 5 weeks by default;
    if (dates.length > 35) {
      totalCells = 42; // 7 days x 5 weeks for some months.
    }

    // Calculate the number of remaining cells to fill the grid (42 cells total)
    const remainingCells = totalCells - (startingDay + daysInMonth);

    // Add days from the next month
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month + 1, i);
      dates.push(date);
    }

    return dates;
  };

  const computeWeekDates = () => {
    const dates = computeMonthDates();
    const weeks = Array.from({ length: Math.ceil(dates.length / 7) })
      .map((_, i) => i + 1)
      .map((index) => [(index - 1) * 7, index * 7])
      .map(([i1, i2]) => dates.slice(i1, i2));

    const currentWeek = weeks.find(
      (week) => week.find((date) => isSameDay(date, currentDate)) != undefined
    );

    return currentWeek ? currentWeek : [];
  };

  const render = () => {
    let dates: Date[] = [];

    if (mode == "month") dates = computeMonthDates();
    if (mode == "week") dates = computeWeekDates();
    if (mode == "day") dates = [currentDate];

    return dates.map((date) => {
      const items = data.filter((item: any) => isSameDay(item.startDate, date));
      return (
        <div
          key={format(date, "MM-dd-yyyy")}
          className={clsx(
            "cursor-pointer border-l border-b transition-colors",
            {
              "col-span-7": mode == "day",
              "min-h-32 overflow-auto": mode == "month",
              "min-h-screen": mode == "week",
              "text-muted-foreground": !isSameMonth(date, currentDate),
              "font-bold": isSameMonth(date, currentDate),
            }
          )}
        >
          <div
            className={clsx("h-full", {
              "bg-gray-50": isSameDay(currentDate, date),
            })}
          >
            {mode == "month" ? (
              <MonthDayCard date={date} items={items} />
            ) : (
              <WeekDayCard date={date} items={items} />
            )}
          </div>
        </div>
      );
    });
  };

  const renderDayName = (dayName: string) => {
    const currentDayIndex = daysList.indexOf(format(currentDate, "EEEE"));
    const index = daysList.indexOf(dayName);
    const diff = index - currentDayIndex;

    const date = addDays(currentDate, diff);

    return mode == "week" ? format(date, "EEE M/d") : dayName;
  };

  return {
    render,
    setMode,
    mode,
    currentDate,
    setCurrentDate,
    daysList,
    renderDayName,
  };
}
