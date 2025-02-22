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
  { year: "2019", income: 4000, saving: 6000, investment: 5000 },
  { year: "2020", income: 10800, saving: 8800, investment: 4000 },
  { year: "2021", income: 1200, saving: 2200, investment: 3000 },
  { year: "2022", income: 7000, saving: 6000, investment: 8000 },
  { year: "2023", income: 5100, saving: 8000, investment: 6000 },
  { year: "2024", income: 5300, saving: 10300, investment: 7000 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "#22C55E",
  },
  saving: {
    label: "Saving",
    color: "#F59E0B",
  },
  investment: {
    label: "Investment",
    color: "#0EA5E9",
  },
} satisfies ChartConfig;

export function BalanceStatistics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle label="Balance Statistics" />
        <h4 className="text-muted-foreground">(+43%) than last 5 year</h4>
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
              dataKey="year"
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
              dataKey="income"
              fill="var(--color-income)"
              radius={4}
              barSize={20}
            />
            <Bar
              dataKey="saving"
              fill="var(--color-saving)"
              radius={4}
              barSize={20}
            />
            <Bar
              dataKey="investment"
              fill="var(--color-investment)"
              radius={4}
              barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
