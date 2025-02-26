"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../../components/ui/select";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { kformat } from "@/lib/utils";
import { useState } from "react";

const monthData = [
  { month: "January", image: 186, media: 80, documents: 150, others: 120 },
  { month: "February", image: 305, media: 200, documents: 180, others: 140 },
  { month: "March", image: 237, media: 120, documents: 160, others: 130 },
  { month: "April", image: 73, media: 190, documents: 140, others: 150 },
  { month: "May", image: 209, media: 130, documents: 170, others: 160 },
  { month: "June", image: 214, media: 140, documents: 175, others: 155 },
  { month: "July", image: 220, media: 150, documents: 180, others: 160 },
  { month: "August", image: 230, media: 160, documents: 185, others: 165 },
  { month: "September", image: 240, media: 170, documents: 190, others: 170 },
  { month: "October", image: 250, media: 180, documents: 195, others: 175 },
  { month: "November", image: 260, media: 190, documents: 200, others: 180 },
  { month: "December", image: 270, media: 200, documents: 205, others: 185 },
];

const weekData = [
  { week: "Week 1", image: 186, media: 80, documents: 150, others: 120 },
  { week: "Week 2", image: 305, media: 200, documents: 180, others: 140 },
  { week: "Week 3", image: 237, media: 120, documents: 160, others: 130 },
  { week: "Week 4", image: 73, media: 190, documents: 140, others: 150 },
];

const yearData = [
  { year: "2018", image: 186, media: 80, documents: 150, others: 120 },
  { year: "2019", image: 305, media: 200, documents: 180, others: 140 },
  { year: "2020", image: 237, media: 120, documents: 160, others: 130 },
  { year: "2021", image: 73, media: 190, documents: 140, others: 150 },
  { year: "2022", image: 73, media: 190, documents: 140, others: 150 },
  { year: "2023", image: 73, media: 190, documents: 140, others: 150 },
  { year: "2024", image: 73, media: 190, documents: 140, others: 150 },
];

const chartConfig = {
  image: {
    label: "Image",
    color: "#50A86F",
  },
  media: {
    label: "Media",
    color: "#ED502E",
  },
  documents: {
    label: "Documents",
    color: "#F6AA28",
  },
  others: {
    label: "Others",
    color: "#CBD1D7",
  },
} satisfies ChartConfig;

export function DataActivity() {
  const [mode, setMode] = useState<string>("year");

  const getChartData = () => {
    switch (mode) {
      case "month":
        return monthData;
      case "week":
        return weekData;
      case "year":
        return yearData;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle
          label="Data Activity"
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
        <div className="flex justify-end">
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
              </div>
            ))}
          </div>
        </div>

        <ChartContainer
          config={chartConfig}
          className="mt-6 max-h-[400px] w-full"
        >
          <BarChart accessibilityLayer data={getChartData()} barSize={30}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={mode}
              tickLine={false}
              tickMargin={2}
              axisLine={false}
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
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
