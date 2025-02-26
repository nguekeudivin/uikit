import clsx from "clsx";
import { Ellipsis, TrendingDown, TrendingUp } from "lucide-react";

import { Line, LineChart } from "recharts";
import { hexToRGBA, kformat } from "@/lib/utils";

export default function BookingMainStats() {
  const stats = [
    {
      label: "Total Booking",
      value: 765000,
      change: 2.6,
      icon: "/assets/illustrations/booking-1.svg",
    },
    {
      label: "Sold",
      value: 311000,
      change: 1.6,
      icon: "/assets/illustrations/booking-2.svg",
    },
    {
      label: "Canceled",
      value: 124000,
      change: -0.6,
      icon: "/assets/illustrations/booking-3.svg",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {stats.map((item, index) => (
        <div key={`stats${index}`} className="shadow p-6 rounded-xl relative">
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-lg font-medium text-muted-foreground">
                {item.label}
              </h3>
              <p className="text-4xl font-semibold mt-2">
                {kformat(item.value)}
              </p>
              <div className="mt-4 flex items-center gap-2">
                {item.change > 0 ? (
                  <TrendingUp className="text-green-600" />
                ) : (
                  <TrendingDown className="text-red-500" />
                )}
                <span className="font-bold">{item.change}%</span>
              </div>
            </div>
            <div className="h-[100px] w-auto rounded-full bg-gray-200">
              <img src={item.icon} className="h-full w-auto" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
