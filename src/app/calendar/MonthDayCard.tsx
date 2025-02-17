import { addDays, format, startOfDay } from "date-fns";
import { useCalendar } from "./CalendarContext";

export function MonthDayCard({ date, items }: { date: Date; items: any }) {
  const { startCreateItem, renderItemComponent } = useCalendar();

  return (
    <div
      onClick={() => {
        startCreateItem(startOfDay(date), addDays(startOfDay(date), 1));
      }}
    >
      <div className="pt-4 pb-4 px-4 text-end">{format(date, "dd")}</div>
      <div className="p-2 space-y-2">
        {items.map((item: any, index: number) =>
          renderItemComponent(item, index)
        )}
      </div>
    </div>
  );
}
