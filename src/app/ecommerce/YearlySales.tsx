"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

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
  { month: "January", expense: 4000, income: 6000 },
  { month: "February", expense: 10800, income: 8800 },
  { month: "March", expense: 1200, income: 2200 },
  { month: "April", expense: 7000, income: 6000 },
  { month: "May", expense: 5100, income: 8000 },
  { month: "June", expense: 5300, income: 10300 },
  { month: "July", expense: 4700, income: 9700 },
  { month: "August", expense: 5400, income: 10400 },
  { month: "September", expense: 10600, income: 9600 },
  { month: "October", expense: 5500, income: 10500 },
  { month: "November", expense: 4500, income: 9500 },
  { month: "December", expense: 5600, income: 10600 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "#22C55E",
  },
  expense: {
    label: "Expense",
    color: "#F59E0B",
  },
} satisfies ChartConfig;

export function YearlySales() {
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
          className="mt-6 max-h-[350px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="income"
              type="monotone"
              stroke="var(--color-income)"
              strokeWidth={2}
              dot={false}
              fill="var(--color-income)"
            />
            <Line
              dataKey="expense"
              type="monotone"
              stroke="var(--color-expense)"
              strokeWidth={2}
              dot={false}
              fill="var(--color-income)"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
