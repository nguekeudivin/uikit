"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { kformat } from "@/lib/utils";

const chartData = [
  { month: "January", africa: 186, europe: 80, asia: 150, america: 120 },
  { month: "February", africa: 305, europe: 200, asia: 180, america: 140 },
  { month: "March", africa: 237, europe: 120, asia: 160, america: 130 },
  { month: "April", africa: 73, europe: 190, asia: 140, america: 150 },
  { month: "May", africa: 209, europe: 130, asia: 170, america: 160 },
  { month: "June", africa: 214, europe: 140, asia: 175, america: 155 },
  { month: "July", africa: 220, europe: 150, asia: 180, america: 160 },
  { month: "August", africa: 230, europe: 160, asia: 185, america: 165 },
  { month: "September", africa: 240, europe: 170, asia: 190, america: 170 },
  { month: "October", africa: 250, europe: 180, asia: 195, america: 175 },
  { month: "November", africa: 260, europe: 190, asia: 200, america: 180 },
  { month: "December", africa: 270, europe: 200, asia: 205, america: 185 },
];

const chartConfig = {
  africa: {
    label: "Africa",
    color: "#F6AA28",
  },
  europe: {
    label: "Europe",
    color: "#357967",
  },
  asia: {
    label: "Asia",
    color: "#0C4A6E",
  },
  america: {
    label: "America",
    color: "#4AB9D9",
  },
} satisfies ChartConfig;

export function AreaInstalled() {
  return (
    <Card>
      <CardHeader>
        <CardTitle
          label="Area Installed"
          action={
            <Select defaultValue="2025">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          }
        />
        <h4 className="text-muted-foreground">(+43%) than last year</h4>
      </CardHeader>
      <CardContent className="px-6">
        <div className="flex justify-between">
          <div className="flex items-center justify-between gap-8">
            {Object.entries(chartConfig).map(([name, config]) => (
              <div key={`area${name}`}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full "
                    style={{ backgroundColor: (config as any).color }}
                  ></div>
                  <span>{config.label}</span>
                </div>
                <div className="mt-1 font-semibold text-xl">
                  {kformat(
                    chartData.reduce(
                      (acc, item) => acc + (item as any)[name],
                      0
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <ChartContainer
          config={chartConfig}
          className="mt-6 max-h-[400px] w-full"
        >
          <BarChart accessibilityLayer data={chartData} barSize={30}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={2}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis axisLine={false} width={30} />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            {Object.entries(chartConfig).map(([name, config], index) => (
              <Bar
                key={`bar${name}`}
                dataKey={name}
                stackId="a"
                fill={config.color}
                radius={
                  index == 0
                    ? [0, 0, 8, 8]
                    : Object.keys(chartConfig).length - 1 == index
                    ? [8, 8, 0, 0]
                    : [0, 0, 0, 0]
                }
              />
            ))}

            {/* <Bar
            dataKey="mobile"
            stackId="a"
            fill="var(--color-mobile)"
            radius={[4, 4, 0, 0]}
          /> */}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
