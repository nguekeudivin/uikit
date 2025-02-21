"use client";

import * as React from "react";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

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
  { label: "", value: 360, fill: "white" },
  { label: "kids", value: 100, fill: "var(--color-kids)" },
  { label: "womens", value: 100, fill: "var(--color-womens)" },
  { label: "mens", value: 200, fill: "var(--color-mens)" },
];

const chartConfig = {
  mens: {
    label: "Mens",
    color: "#22C55E",
  },
  womens: {
    label: "Womens",
    color: "#F59E0B",
  },
  kids: {
    label: "Kids",
    color: "#EF4444",
  },
} satisfies ChartConfig;

export function SalesByGenders() {
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
            <div className="z-20 transparent absolute w-full h-full flex items-center justify-center">
              <div>
                <div className="text-muted-foreground text-center">Total</div>
                <div className="font-semibold text-2xl text-center">
                  {total.toLocaleString()}
                </div>
              </div>
            </div>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <RadialBarChart
                data={chartData}
                innerRadius={30}
                outerRadius={150}
                barSize={15}
              >
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel nameKey="label" />}
                />
                <RadialBar dataKey="value" background cornerRadius={10} />
              </RadialBarChart>
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
