"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { kformat } from "@/lib/utils";

import { EllipsisVertical } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const monthData = [
  { month: "January", sold: 4000, cancelled: 6000 },
  { month: "February", sold: 10800, cancelled: 8800 },
  { month: "March", sold: 1200, cancelled: 2200 },
  { month: "April", sold: 7000, cancelled: 6000 },
  { month: "May", sold: 5100, cancelled: 8000 },
  { month: "June", sold: 5300, cancelled: 10300 },
  { month: "July", sold: 5400, cancelled: 10400 },
  { month: "August", sold: 5500, cancelled: 10500 },
  { month: "September", sold: 5600, cancelled: 10600 },
  { month: "October", sold: 5700, cancelled: 10700 },
  { month: "November", sold: 5800, cancelled: 10800 },
  { month: "December", sold: 5900, cancelled: 10900 },
];

const weekData = [
  { week: "Week 1", sold: 4000, cancelled: 6000 },
  { week: "Week 2", sold: 10800, cancelled: 8800 },
  { week: "Week 3", sold: 1200, cancelled: 2200 },
  { week: "Week 4", sold: 7000, cancelled: 6000 },
];

const yearData = [
  { year: "2019", sold: 4000, cancelled: 6000 },
  { year: "2020", sold: 10800, cancelled: 8800 },
  { year: "2021", sold: 1200, cancelled: 2200 },
  { year: "2022", sold: 7000, cancelled: 6000 },
  { year: "2023", sold: 5100, cancelled: 8000 },
  { year: "2024", sold: 5300, cancelled: 10300 },
];

const chartConfig = {
  sold: {
    label: "Sold",
    color: "#064E3B",
  },
  cancelled: {
    label: "Cancelled",
    color: "#DB2777",
  },
} satisfies ChartConfig;

export function BookingStatistics() {
  const [mode, setMode] = useState<string>("year");

  const getChartData = () => {
    switch (mode) {
      case "month":
        return monthData;
      case "week":
        return weekData;
      case "year":
        return yearData;
      default:
        return [];
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle
          label="Balance Statistics"
          action={
            <Select
              onValueChange={(value) => setMode(value)}
              defaultValue="year"
            >
              <SelectTrigger className="w-[100px]">Yearly</SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="week">Weekly</SelectItem>
                  <SelectItem value="month">Monthly</SelectItem>
                  <SelectItem value="year">Yearly</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          }
        />
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
                    getChartData().reduce(
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
          className="mt-6 max-h-[300px] w-full"
        >
          <BarChart accessibilityLayer data={getChartData()}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={mode}
              tickLine={false}
              tickMargin={5}
              axisLine={false}
            />
            <YAxis axisLine={false} width={30} />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="sold"
              fill="var(--color-sold)"
              radius={4}
              barSize={30}
            />
            <Bar
              dataKey="cancelled"
              fill="var(--color-cancelled)"
              radius={4}
              barSize={30}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
