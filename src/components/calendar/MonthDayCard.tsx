import { format } from "date-fns";

export function MonthDayCard({
  date,
  createItemComponent,
  items,
}: {
  date: Date;
  createItemComponent: any;
  items: any;
}) {
  return (
    <>
      <div className="pt-4 pb-4 px-4 text-end">{format(date, "dd")}</div>
      <div className="p-2 space-y-2">
        {items.map((item: any, index: number) =>
          createItemComponent(item, index)
        )}
      </div>
    </>
  );
}
