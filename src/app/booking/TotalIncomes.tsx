"use client";

import { ChartConfig } from "@/components/ui/chart";
import { formatDollars, kformat } from "@/lib/utils";
import { TrendingDown } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, XAxis, LineChart } from "recharts";

import { TrendingUp } from "lucide-react";
import CustomRadialBar from "@/components/common/CustomRadialBar";

const incomeChart = {
  data: [
    { month: "January", income: 6000 },
    { month: "February", income: 8800 },
    { month: "March", income: 2200 },
    { month: "April", income: 6000 },
    { month: "May", income: 8000 },
    { month: "June", income: 10300 },
    { month: "July", income: 9700 },
    { month: "August", income: 10400 },
  ],
  config: {
    income: {
      label: "Income",
      color: "#22C55E",
    },
  } satisfies ChartConfig,
};

const booked = [
  {
    category: "Pending",
    amount: 8374,
    percentage: 10.1,
    color: "#06B6D4",
  },
  {
    category: "Canceled",
    amount: 9714,
    percentage: 13.6,
    color: "#16A34A",
  },
  {
    category: "Sold",
    amount: 6871,
    percentage: 28.2,
    color: "#D97706",
  },
];

export default function TotalIncomes() {
  const incomes = {
    value: 18765,
    change: 4.5,
  };

  return (
    <div className="rounded-2xl bg-gray-200 p-2">
      <article className="grid grid-cols-1 md:grid-cols-2 bg-white p-2 rounded-xl">
        <div className="bg-[#1B4B50] p-8 rounded-xl text-green-100">
          <div className="flex justify-between">
            <div className="">
              <p className="text-lg text-green-100">Total incomes</p>
              <p className="text-3xl font-bold mt-2">
                {formatDollars(incomes.value)}
              </p>
            </div>
            <div className=" text-gray-200">
              <div className="flex items-center gap-2">
                {incomes.change > 0 ? (
                  <TrendingUp className="text-green-100" />
                ) : (
                  <TrendingDown className="text-red-100" />
                )}
                <span>{incomes.change}%</span>
              </div>
              <p className="text-lg text-green-100/80">Last month</p>
            </div>
          </div>

          <ChartContainer
            config={incomeChart.config}
            className="max-h-[150px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={incomeChart.data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="income"
                type="monotone"
                stroke="var(--color-income)"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
        <div className="p-8 bg-white">
          <h3 className="text-2xl font-semibold">Booked</h3>
          <ul className="space-y-6 mt-4">
            {booked.map((item, index) => (
              <li key={`JpdnYKZA${index}`}>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{item.category}</p>
                  <p>
                    <span className="font-semibold">
                      {kformat(item.amount)}
                    </span>
                  </p>
                </div>
                <div className="mt-2 bg-gray-200 h-2 w-full rounded-md">
                  <div
                    className="h-full rounded-md"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </article>
      <article className="grid grid-cols-1 md:grid-cols-2 bg-white mt-2 rounded-xl">
        <div className="p-8 border-b md:border-b-none md:border-r  flex items-center md:justify-center">
          <div className="flex items-center">
            <div className="relative h-[100px] w-[100px]">
              <CustomRadialBar
                radius={80}
                width={100}
                height={100}
                coloredSize={15}
                mutedSize={10}
                color="#16A34A"
                mutedColor="#F3F4F6"
                coverage={booked[2].percentage}
                centerHTML={
                  <>
                    <div className="font-semibold">{booked[2].percentage}%</div>
                  </>
                }
              />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold">{booked[2].amount}</p>
              <p className="text-muted-foreground">Sold</p>
            </div>
          </div>
        </div>
        <div className="p-8  flex items-center md:justify-center">
          <div className="flex items-center">
            <div className="relative h-[100px] w-[100px]">
              <CustomRadialBar
                radius={80}
                width={100}
                height={100}
                coloredSize={15}
                mutedSize={10}
                color={booked[0].color}
                gradientId={"pendingpayment"}
                mutedColor="#F3F4F6"
                coverage={80}
                centerHTML={
                  <>
                    <div className="font-semibold">{booked[0].percentage}%</div>
                  </>
                }
              />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold">{booked[0].amount}</p>
              <p className="text-muted-foreground">Pending for payment</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
