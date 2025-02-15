import { MonthDayCard } from "@/components/calendar/MonthDayCard";
import { WeekDayCard } from "@/components/calendar/WeekDayCard";
import clsx from "clsx";
import { addDays, format, subDays } from "date-fns";
import { useEffect, useState } from "react";

export function useCalendar({
  createItemComponent,
  onSelectDate,
  data,
  defaultMode = "month",
}: {
  createItemComponent: any;
  onAddItem: any;
  onSelectDate: any;
  data: any;
  defaultMode?: string;
}) {
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
  const [currentWeek, setCurrentWeek] = useState<any>({
    from: new Date(),
    to: new Date(),
  });
  const [selectedDate, selectDate] = useState<Date>(new Date());

  const changeYear = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
  };

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
    let remainingCells = totalCells - (startingDay + daysInMonth);

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
      (week) =>
        week.find(
          (date) =>
            format(date, "MM-dd-yyyy") == format(currentDate, "MM-dd-yyyy")
        ) != undefined
    );

    return currentWeek ? currentWeek : [];
  };

  const render = () => {
    let dates: Date[] = [];

    if (mode == "month") dates = computeMonthDates();
    if (mode == "week") dates = computeWeekDates();
    if (mode == "day") dates = [currentDate];

    return dates.map((date) => {
      const dateString = format(date, "yyyy-MM-dd");

      const items = data.filter(
        (item: any) => format(item.startDate, "yyyy-MM-dd") == dateString
      );
      return (
        <div
          key={dateString}
          // onClick={() => {
          //   setCurrentDate(date);
          //   selectDate(date);
          //   onSelectDate(date, items);
          // }}
          className={clsx(
            "cursor-pointer border-l border-b transition-colors",
            {
              "col-span-7": mode == "day",
              "min-h-32 overflow-auto": mode == "month",
              "min-h-screen": mode == "week",
              "text-muted-foreground":
                format(date, "MM") != format(currentDate, "MM"),
              "font-bold": format(date, "MM") == format(currentDate, "MM"),
            }
          )}
        >
          <div
            className={clsx("h-full", {
              "bg-gray-50": format(currentDate, "yyyy-MM-dd") == dateString,
            })}
          >
            {mode == "month" ? (
              <MonthDayCard
                date={date}
                createItemComponent={createItemComponent}
                items={items}
              />
            ) : (
              <WeekDayCard
                date={date}
                createItemComponent={createItemComponent}
                items={items}
              />
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

  useEffect(() => {
    const currentWeek = computeWeekDates();
    setCurrentWeek({
      from: currentWeek[0],
      to: currentWeek[currentWeek.length - 1],
    });
  }, [currentDate]);

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
