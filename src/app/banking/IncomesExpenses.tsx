"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatDollars } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  Plus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { CartesianGrid, Line, XAxis, LineChart, YAxis } from "recharts";
import clsx from "clsx";

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

export default function IncomesExpenses() {
  const data = {
    balance: 49990,
    incomes: {
      value: 9980,
      change: 8.5,
    },
    expenses: {
      value: 1123,
      change: -1.4,
    },
  };

  return (
    <Card>
      <CardContent className="px-4 md:px-6 py-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-gray-700">Total Balance</h3>
          <div className="hidden flex items-center gap-2">
            <button className="inline-flex items-center px-3 gap-2 py-1.5 rounded-lg bg-gray-100">
              <ArrowUp className="w-4 h-4" />
              Send
            </button>
            <button className="inline-flex items-center px-3 gap-2 py-1.5 rounded-lg bg-gray-100">
              <Plus className="w-4 h-4" />
              Add card
            </button>
            <button className="inline-flex items-center px-3 gap-2 py-1.5 rounded-lg bg-gray-100">
              <ArrowDown className="w-4 h-4" />
              Request
            </button>
          </div>
        </div>
        <div className="font-bold text-4xl mt-4 mb-6">
          {formatDollars(data.balance)}
        </div>
        <div className="md:hidden mb-4 flex items-center gap-2">
          <button className="inline-flex items-center px-3 gap-2 py-1.5 rounded-lg bg-gray-100">
            <ArrowUp className="w-4 h-4" />
            Send
          </button>
          <button className="inline-flex items-center px-3 gap-2 py-1.5 rounded-lg bg-gray-100">
            <Plus className="w-4 h-4" />
            Add card
          </button>
          <button className="inline-flex items-center px-3 gap-2 py-1.5 rounded-lg bg-gray-100">
            <ArrowDown className="w-4 h-4" />
            Request
          </button>
        </div>
        <Tabs defaultValue="income">
          <TabsList className="grid w-full grid-cols-2 w-full p-4">
            <TabsTrigger value="income" className="rounded-xl">
              <div className="flex flex-wrap md:flex-no-wrap items-center relative  w-full p-2 md:p-4">
                <div className="hidden md:flex w-12 h-12 rounded-full  items-center justify-center bg-teal-800 text-white ">
                  <ArrowDown className="rotate-45" />
                </div>
                <div className="md:ml-4 text-start">
                  <p className="text-gray-700">Income</p>
                  <p className="text-2xl font-semibold mt-2">
                    {formatDollars(data.incomes.value)}
                  </p>
                </div>
                <div
                  className={clsx(
                    "md:absolute md:top-2 md:right-2 w-full mt-2 md:mt-0 md:w-auto flex items-center gap-2 bg-green-100  px-1 py-0.5 rounded-lg",
                    {
                      "bg-teal-100": data.incomes.change > 0,
                      "bg-red-100": data.incomes.change < 0,
                    }
                  )}
                >
                  {data.incomes.change > 0 ? (
                    <TrendingUp className="text-green-600" />
                  ) : (
                    <TrendingDown className="text-red-500" />
                  )}
                  <span>{data.incomes.change}%</span>
                </div>
              </div>
            </TabsTrigger>
            <TabsTrigger value="expense" className="rounded-xl">
              <div className="flex flex-wrap md:flex-no-wrap items-center relative  w-full p-2 md:p-4">
                <div className="hidden md:flex w-12 h-12 rounded-full  items-center justify-center bg-red-900 text-white ">
                  <ArrowUp className="rotate-45" />
                </div>
                <div className="md:ml-4 text-start">
                  <p className="text-gray-700">Expense</p>
                  <p className="text-2xl font-semibold mt-2">
                    {formatDollars(data.expenses.value)}
                  </p>
                </div>
                <div
                  className={clsx(
                    "md:absolute md:top-2 md:right-2 w-full mt-2 md:mt-0 md:w-auto flex items-center gap-2 bg-green-100  px-1 py-0.5 rounded-lg",
                    {
                      "bg-teal-100": data.expenses.change > 0,
                      "bg-red-100": data.expenses.change < 0,
                    }
                  )}
                >
                  {data.expenses.change > 0 ? (
                    <TrendingUp className="text-green-600" />
                  ) : (
                    <TrendingDown className="text-red-500" />
                  )}
                  <span>{data.expenses.change}%</span>
                </div>
              </div>
            </TabsTrigger>
          </TabsList>
          <div className="mt-8">
            <TabsContent value="income">
              <ChartContainer
                config={chartConfig}
                className="max-h-[400px] w-full"
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
                  <YAxis axisLine={false} width={30} />

                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="income"
                    type="monotone"
                    stroke="var(--color-income)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="expense">
              <ChartContainer
                config={chartConfig}
                className="max-h-[400px] w-full"
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
                  <YAxis axisLine={false} width={30} />

                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="expense"
                    type="monotone"
                    stroke="var(--color-expense)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
