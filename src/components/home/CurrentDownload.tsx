"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const chartData = [
  { label: "mac", value: 275, fill: "var(--color-mac)" },
  { label: "window", value: 200, fill: "var(--color-window)" },
  { label: "ios", value: 287, fill: "var(--color-ios)" },
  { label: "android", value: 173, fill: "var(--color-android)" },
];

const chartConfig = {
  mac: {
    label: "Mac",
    color: "#C7F5D5",
  },
  window: {
    label: "Window",
    color: "#6FE59B",
  },
  ios: {
    label: "Ios",
    color: "#357967",
  },
  android: {
    label: "Android",
    color: "#1B4B50",
  },
} satisfies ChartConfig;

export function CurrentDownload() {
  const total = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className="rounded-xl shadow bg-white">
      <CardHeader>
        <CardTitle label="Current Download" action={undefined} />
        <h4 className="text-muted-foreground">Downloaded by operating sytem</h4>
      </CardHeader>

      <CardContent>
        <div className="mt-8">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                innerRadius={90}
                outerRadius={130}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 10}
                            className="fill-muted-foreground"
                          >
                            Total
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 20}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {total.toLocaleString()}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
        <CardFooter className="bottom-0 absolute left-0 w-full flex items-center justify-center">
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
