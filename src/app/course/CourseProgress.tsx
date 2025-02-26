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
} from "../../components/ui/card";

const chartData = [
  { label: "completed", value: 50, fill: "var(--color-completed)" },
  { label: "progress", value: 30, fill: "var(--color-progress)" },
  { label: "pending", value: 50, fill: "var(--color-pending)" },
];

const chartConfig = {
  progress: {
    label: "In Progress",
    color: "#F59E0B",
  },
  completed: {
    label: "Completed",
    color: "#22C55E",
  },
  pending: {
    label: "To start",
    color: "#CBD5E1",
  },
} satisfies ChartConfig;

export function CourseProgress() {
  const total = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className="rounded-xl shadow bg-white">
      <CardHeader>
        <CardTitle label="Current Download" action={undefined} />
      </CardHeader>

      <CardContent>
        <div className="mt-8">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
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
                outerRadius={120}
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
