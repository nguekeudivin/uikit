import {
  addDays,
  addMonths,
  addWeeks,
  isSameDay,
  isSameMonth,
  isSameWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useState } from "react";

export function useAgenda({
  setCurrentDate,
  currentDate,
}: {
  setCurrentDate: any;
  currentDate: Date;
}) {
  const [agendaMode, setAgendaMode] = useState<string>("week");
  const filterAgendaData = (data: any) => {
    if (agendaMode == "month")
      return data.filter((item: any) =>
        isSameMonth(item.startDate, currentDate)
      );
    if (agendaMode == "week")
      return data.filter((item: any) =>
        isSameWeek(item.startDate, currentDate)
      );

    if (agendaMode == "day")
      return data.filter((item: any) => isSameDay(item.startDate, currentDate));
  };

  const changeAgendaDate = (increment: number) => {
    console.log("change current date from inside agendata");
    if (agendaMode == "month") {
      setCurrentDate(addMonths(startOfMonth(currentDate), increment));
    }
    if (agendaMode == "week")
      setCurrentDate(addWeeks(startOfWeek(currentDate), increment));
    if (agendaMode == "day") setCurrentDate(addDays(currentDate, increment));
  };

  return { agendaMode, setAgendaMode, changeAgendaDate, filterAgendaData };
}
