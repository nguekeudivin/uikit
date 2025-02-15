import colors from "@/lib/colors";
import { format } from "date-fns";
import { CalendarMinus2, Minus } from "lucide-react";
import { useEffect } from "react";

interface AgendaProps {
  data: any[];
}

export default function Agenda({ data }: AgendaProps) {
  useEffect(() => {
    console.log(data);
  }, []);

  if (data.length == 0)
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <CalendarMinus2 className="mx-auto w-24 h-24 text-gray-200" />
          <p className="mt-4 text-muted-foreground text-xl text-center">
            No schedules do display
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-[600px]">
      {data.map((item, index) => {
        const prevItem = data[index - 1];
        let displayDateHeader = true;
        if (prevItem) {
          displayDateHeader =
            format(item.startDate, "MM-dd-yyyy") !=
            format(prevItem.startDate, "MM-dd-yyyy");
        }

        return (
          <div key={`agendaitem${index}`}>
            {displayDateHeader && (
              <div className="bg-gray-100 flex items-center justify-between py-2 px-6 font-semibold">
                <span>{format(item.startDate, "EEEE")}</span>
                <span>{format(item.startDate, "MMMM dd, yyy")}</span>
              </div>
            )}

            <div className="flex items-center py-2 px-6">
              <div className="flex gap-1 items-center">
                <span className="text-gray-700">
                  {format(item.startDate, "hh:mm a").toLocaleLowerCase()}
                </span>{" "}
                <Minus className="w-2 h-2" />
                <span className="text-gray-700">
                  {format(item.endDate, "hh:mm a").toLocaleLowerCase()}
                </span>
              </div>
              <div className="flex items-center ml-8">
                <div
                  style={{ backgroundColor: colors[item.label] }}
                  className="w-3 h-3 rounded-full"
                ></div>
                <div className="ml-4 text-gray-700">{item.title}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
