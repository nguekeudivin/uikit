"use client";

import Card from "@/components/custom/Card";
import DatePicker from "@/components/custom/DatePicker";
import CardTitle from "@/components/custom/CardTitle";
import { useEffect, useState } from "react";
import { Schedule } from "@/api-call/types";
import { getSchedules, searchSchedules } from "@/api-call/endpoints/schedules";
import { format } from "date-fns";
import useDepartment from "@/api-call/hooks/useDepartment";

export default function Schedules() {
  const [items, setItems] = useState<Schedule[]>([]);
  const { getByName } = useDepartment();

  useEffect(() => {
    getItems(new Date());
  }, []);

  const getItems = (date: Date) => {
    searchSchedules(date).then((items) => setItems(items));
  };

  return (
    <div className="w-full h-full">
      <Card>
        <CardTitle
          label="Schedule"
          action={<DatePicker onSelect={(date) => getItems(date)} />}
        />
        {items.length > 0 ? (
          <ol className="mt-4">
            {items.slice(-4).map((item, index) => (
              <li key={`schedule${index}`} className="flex">
                <time className="mt-1.5 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {format(item.date, "HH:mm")}
                </time>
                <div
                  className="w-full ml-4 pl-4 pb-4 relative border-l-2  border-dashed"
                  style={{ borderColor: getByName(item.department)?.color }}
                >
                  <div
                    className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white"
                    style={{
                      backgroundColor: getByName(item.department)?.color,
                    }}
                  ></div>
                  <div
                    className="w-full rounded-md p-2"
                    style={{
                      backgroundColor: getByName(item.department)?.color,
                    }}
                  >
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs  font-normal text-gray-500">
                      {item.department}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-4 bg-gray-100 p-4 text-muted-foreground">
            No schedules for this date
          </div>
        )}
      </Card>
    </div>
  );
}
