"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
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
  { month: "January", A: 4000, B: 6000 },
  { month: "February", A: 10800, B: 8800 },
  { month: "March", A: 1200, B: 2200 },
  { month: "April", A: 7000, B: 6000 },
  { month: "May", A: 5100, B: 8000 },
  { month: "June", A: 5300, B: 10300 },
  { month: "July", A: 4700, B: 9700 },
  { month: "August", A: 5400, B: 10400 },
  { month: "September", A: 10600, B: 9600 },
  { month: "October", A: 5500, B: 10500 },
  { month: "November", A: 4500, B: 9500 },
  { month: "December", A: 5600, B: 10600 },
];

const chartConfig = {
  A: {
    label: "Team A",
    color: "#22C55E",
  },
  B: {
    label: "Team B",
    color: "#F59E0B",
  },
} satisfies ChartConfig;

export function WebsiteVisits() {
  return (
    <Card>
      <CardHeader>
        <CardTitle
          label="Website visits"
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
          className="mt-6 max-h-[300px] w-full"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="A" fill="var(--color-A)" radius={4} barSize={20} />
            <Bar dataKey="B" fill="var(--color-B)" radius={4} barSize={20} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
