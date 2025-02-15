import { dateFromHourIndex } from "@/lib/utils";
import clsx from "clsx";
import { addDays, addMinutes, format } from "date-fns";

export function WeekDayCard({
  date,
  createItemComponent,
  items,
}: {
  date: Date;
  createItemComponent: any;
  items: any;
}) {
  const addItem = (startDate: Date, endDate: Date) => {};
  const hourHeight = 80;

  return (
    <>
      <div>
        <div
          onClick={() => {
            addItem(
              dateFromHourIndex(0, date),
              addDays(dateFromHourIndex(0, date), 1)
            );
          }}
          className="hover:bg-gray-200 h-12 border-b "
        ></div>

        <div className="relative w-full">
          <div className="w-full ">
            {Array.from({ length: 24 }).map((item, index) => (
              <div
                style={{ height: hourHeight }}
                key={`dayhourtimes${index}`}
                className={clsx("border-b border-0.5", {
                  "bg-gray-100": index % 2 == 0,
                })}
              >
                <div
                  onClick={() => {
                    const start = dateFromHourIndex(index, date);
                    const end = addMinutes(start, 30);
                    addItem(start, end);
                  }}
                  className="hover:bg-gray-200/50 border-b h-[50%] flex items-center justify-center"
                ></div>
                <div
                  onClick={() => {
                    const start = addMinutes(
                      dateFromHourIndex(index, date),
                      30
                    );
                    const end = addMinutes(start, 30);
                    addItem(start, end);
                  }}
                  className="hover:bg-gray-200 h-[50%]"
                ></div>
              </div>
            ))}
          </div>

          {items.map((item: any, index: number) => {
            const date = new Date(item.startDate);
            const top =
              hourHeight * date.getHours() +
              (hourHeight / 60) * date.getMinutes();

            const height =
              (hourHeight / 60) *
              Math.abs(
                new Date(item.startDate).getMinutes() -
                  new Date(item.endDate).getMinutes()
              );
            console.log(height);

            return (
              <div
                key={`weekdayitem${index}`}
                className="absolute w-full"
                style={{ top: `${top}px`, height: `${height}px` }}
              >
                {createItemComponent(item, index)}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
