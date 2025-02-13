"use client";

import Card from "@/components/custom/Card";
import CardTitle from "@/components/custom/CardTitle";
import { Bell, Ellipsis } from "lucide-react";
import { Activity } from "@/api-call/types";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { format, subDays } from "date-fns";
import { getActivities } from "@/api-call/endpoints/activities";

export default function RecentActivity() {
  const [items, setItems] = useState<Activity[]>([]);

  useEffect(() => {
    getActivities().then((items) => setItems(items.slice(-5)));
  }, []);

  const getFormattedDate = (item: Activity, index: number) => {
    const formatted = format(item.date, "MMM, dd yyyy");

    if (index != 0) {
      if (formatted == format(items[index - 1].date, "MMM, dd yyyy")) {
        return null;
      }
    }

    if (formatted == format(new Date(), "MMM, dd yyyy")) {
      return "Today";
    }

    if (formatted == format(subDays(new Date(), 1), "MMM, dd yyyy")) {
      return "Yesterday";
    }

    return formatted;
  };

  const displayDate = (item: Activity, index: number) => {
    const formatted = getFormattedDate(item, index);
    if (formatted != null) {
      return <div className="text-semibold  mb-4">{formatted}</div>;
    } else {
      return null;
    }
  };

  return (
    <div className="w-full h-full">
      <Card>
        <CardTitle
          label="Recent Activity"
          action={
            <button className="text-muted-foreground">
              <Ellipsis />
            </button>
          }
        />
        <div className="mt-4 space-y-4">
          {items.map((item, index) => (
            <div key={`activity${index}`} className="">
              {displayDate(item, index)}
              <div className="flex ">
                <div>
                  <div
                    className={clsx(
                      "text-gray-800 rounded-md w-8 h-8 flex items-center justify-center",
                      {
                        "bg-secondary": index % 2 == 1,
                        "bg-primary": index % 2 == 0,
                      }
                    )}
                  >
                    <Bell className="w-4 h-4" />
                  </div>
                </div>

                <div className="ml-4">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {format(item.date, "HH:mm")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
