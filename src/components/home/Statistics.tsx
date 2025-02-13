import clsx from "clsx";
import { Ellipsis, TrendingDown, TrendingUp } from "lucide-react";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { label: "January", value: 186 },
  { label: "February", value: 305 },
  { label: "March", value: 237 },
  { label: "April", value: 73 },
  { label: "May", value: 209 },
  { label: "June", value: 214 },
  { label: "June", value: 214 },
];

const chartConfig = {
  value: {
    label: "Label",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Statistics() {
  const stats = [
    {
      label: "Total active users",
      value: 18765,
      change: 2.6,
      date: "Last 7 days",
      chartColor: "#14B8A6",
    },
    {
      label: "Total installed",
      value: 4876,
      change: 0.2,
      date: "Last 7 days",
      chartColor: "#0EA5E9",
    },
    {
      label: "Total Downloads",
      value: 678,
      change: -0.1,
      date: "Last 7 days",
      chartColor: "#EF4444",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {stats.map((item, index) => (
        <div
          key={`stats${index}`}
          className="bg-white shadow p-6 flex items-center justify-between rounded-xl"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              {" "}
              {item.label}
            </h3>
            <p className="text-4xl font-semibold mt-4">{item.value}</p>
            <div className="flex items-center gap-2 mt-3">
              {item.change > 0 ? (
                <TrendingDown className="text-green-600" />
              ) : (
                <TrendingUp className="text-red-500" />
              )}
              <span>{item.change}%</span>
              <span className="text-muted-foreground">{item.date}</span>
            </div>
          </div>
          <div className="w-[100px]">
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                barSize={5}
                barGap={0}
                barCategoryGap={0}
              >
                <CartesianGrid vertical={false} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="value" fill={item.chartColor} radius={4} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      ))}
    </div>
  );
}
