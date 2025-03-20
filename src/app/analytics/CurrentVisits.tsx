"use client";

import * as React from "react";

import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { name: "africa", value: 1500, fill: "var(--color-africa)" },
  { name: "europe", value: 2000, fill: "var(--color-europe)" },
  { name: "asia", value: 5000, fill: "var(--color-asia)" },
  { name: "america", value: 3000, fill: "var(--color-america)" },
];

const chartConfig = {
  africa: {
    label: "Africa",
    color: "#D97706",
  },
  europe: {
    label: "Europe",
    color: "#0284C7",
  },
  asia: {
    label: "Asia",
    color: "#E11D48",
  },
  america: {
    label: "America",
    color: "#16A34A",
  },
} satisfies ChartConfig;

export function CurrentVisits() {
  const total = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className="rounded-xl shadow bg-white">
      <CardHeader>
        <CardTitle label="Sales by gender" action={undefined} />
      </CardHeader>

      <CardContent>
        <div className="mt-4">
          <div className="relative">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
            >
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="name" hideLabel />}
                />
                <Pie data={chartData} dataKey="value">
                  <LabelList
                    dataKey="name"
                    className="fill-background"
                    stroke="none"
                    fontSize={12}
                    formatter={(value: keyof typeof chartConfig) => {
                      const data = chartData.find(
                        (item) => item.name == value
                      ) as any;
                      return `${((data.value * 100) / total).toFixed(2)}%`;
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        </div>
        <CardFooter className="mt-8 w-full flex items-center justify-center">
          <div className="flex items-center justify-between gap-4">
            {Object.entries(chartConfig).map(([name, config]) => (
              <div key={`legend${name}`} className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded-full "
                  style={{ backgroundColor: (config as any).color }}
                ></div>
                <span>{config.label}</span>
              </div>
            ))}
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
