import clsx from "clsx";
import { Ellipsis, TrendingDown, TrendingUp } from "lucide-react";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Line, LineChart } from "recharts";
import { hexToRGBA } from "@/lib/utils";

const generateStats = (color: string) => {
  const data = Array.from({ length: 7 }).map((value, index) => {
    return {
      label: `Label ${index + 1}`,
      value: Math.ceil(Math.random() * 1000),
    };
  });

  const config = {
    value: {
      label: "Label",
      color: color,
    },
  } satisfies ChartConfig;

  return { data, config };
};

export default function StatisticsColored() {
  const stats = [
    {
      label: "Weekly sales",
      value: 765,
      change: 2.6,
      date: "Last 7 days",
      chartColor: "#296EDF",
      stats: generateStats("#296EDF"),
      icon: "/assets/icons/glass/ic-glass-bag.svg",
    },
    {
      label: "New Users",
      value: 100000,
      change: 0.2,
      date: "Last 7 days",
      chartColor: "#986BEF",
      stats: generateStats("#986BEF"),
      icon: "/assets/icons/glass/ic-glass-users.svg",
    },
    {
      label: "Purchase orders",
      value: 400000,
      change: -0.1,
      date: "Last 7 days",
      chartColor: "#EAA62A",
      stats: generateStats("#EAA62A"),
      icon: "/assets/icons/glass/ic-glass-buy.svg",
    },
    {
      label: "Messages",
      value: 235,
      change: 4.6,
      date: "Last 7 days",
      chartColor: "#E35538",
      stats: generateStats("#E35538"),
      icon: "/assets/icons/glass/ic-glass-message.svg",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((item, index) => (
        <div
          key={`stats${index}`}
          style={{ backgroundColor: hexToRGBA(item.chartColor, 0.1) }}
          className="shadow p-6 rounded-xl relative"
        >
          <div className="absolute top-6 right-6 flex items-center gap-2">
            {item.change > 0 ? (
              <TrendingUp className="text-green-600" />
            ) : (
              <TrendingDown className="text-red-500" />
            )}
            <span>{item.change}%</span>
          </div>
          <div>
            <img src={item.icon} />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-700">
                {item.label}
              </h3>
              <p className="text-4xl font-semibold mt-1">
                {item.value.toLocaleString()}
              </p>
            </div>
            <div className="w-[150px]">
              <ChartContainer config={item.stats.config}>
                <LineChart
                  accessibilityLayer
                  data={item.stats.data}
                  margin={{
                    left: 5,
                    right: 5,
                    top: 5,
                    bottom: 5,
                  }}
                >
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="value"
                    type="natural"
                    stroke="var(--color-value)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
