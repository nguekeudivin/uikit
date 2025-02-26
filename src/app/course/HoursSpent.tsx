"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { CartesianGrid, Line, XAxis, LineChart, YAxis } from "recharts";

const weekData = [
  { week: "Week 1", hours: 8 },
  { week: "Week 2", hours: 12 },
  { week: "Week 3", hours: 10 },
  { week: "Week 4", hours: 12 },
];
const monthData = [
  { month: "January", hours: 20 },
  { month: "February", hours: 25 },
  { month: "March", hours: 30 },
  { month: "April", hours: 22 },
  { month: "May", hours: 35 },
  { month: "June", hours: 15 },
  { month: "July", hours: 10 },
  { month: "August", hours: 12 },
  { month: "September", hours: 28 },
  { month: "October", hours: 22 },
  { month: "November", hours: 18 },
  { month: "December", hours: 30 },
];
const yearData = [
  { year: "2019", hours: 50 },
  { year: "2020", hours: 120 },
  { year: "2021", hours: 150 },
  { year: "2022", hours: 130 },
  { year: "2023", hours: 140 },
  { year: "2024", hours: 110 },
];

const chartConfig = {
  hours: {
    label: "hours",
    color: "#22C55E",
  },
} satisfies ChartConfig;

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../../components/ui/select";
import { useState } from "react";

export default function HoursSpent() {
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
          label="Hours spent"
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
      <CardContent className="px-6 pb-6">
        <ChartContainer
          config={chartConfig}
          className="max-h-[350px] w-full mt-4"
        >
          <LineChart
            accessibilityLayer
            data={getChartData()}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={mode}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis axisLine={false} tickMargin={8} width={30} />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="hours"
              type="monotone"
              stroke="var(--color-hours)"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
