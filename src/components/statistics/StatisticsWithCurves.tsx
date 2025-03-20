import { TrendingDown, TrendingUp } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Line, LineChart } from "recharts";

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

export default function StatisticsWithCurves() {
  const stats = [
    {
      label: "Produt sold",
      value: 765,
      change: 2.6,
      date: "Last 7 days",
      chartColor: "#14B8A6",
      stats: generateStats("#14B8A6"),
    },
    {
      label: "Total balance",
      value: 100000,
      change: 0.2,
      date: "Last 7 days",
      chartColor: "#0EA5E9",
      stats: generateStats("#0EA5E9"),
    },
    {
      label: "Sales profit",
      value: 400000,
      change: -0.1,
      date: "Last 7 days",
      chartColor: "#EF4444",
      stats: generateStats("#EF4444"),
    },
  ];

  return (
    <div className="grid grid-cols-1  md:grid-cols-3 gap-6">
      {stats.map((item, index) => (
        <div
          key={`stats${index}`}
          className="bg-white shadow p-6 flex items-center justify-between rounded-xl"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              {item.label}
            </h3>
            <p className="text-4xl font-semibold mt-4">
              {item.value.toLocaleString()}
            </p>
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
      ))}
    </div>
  );
}
