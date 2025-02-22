"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatDollars } from "@/lib/utils";
import {
  Clapperboard,
  Fuel,
  Coffee,
  Wifi,
  HeartPulse,
  Dumbbell,
  ShoppingCart,
  CupSoda,
} from "lucide-react";
import { useEffect } from "react";
import { Pie, PieChart } from "recharts";

const items = [
  {
    category: "Entertainment",
    amount: 22,
    icon: Clapperboard,
    fill: "#6366F1",
  },
  {
    category: "Fuel",
    amount: 18,
    icon: Fuel,
    fill: "#22C55E",
  },
  {
    category: "Fast food",
    amount: 16,
    icon: CupSoda,
    fill: "#F59E0B",
  },
  {
    category: "Cafe",
    amount: 17,
    icon: Coffee,
    fill: "#D97706",
  },
  {
    category: "Connection",
    amount: 14,
    icon: Wifi,
    fill: "#38BDF8",
  },
  {
    category: "Healthcare",
    amount: 22,
    icon: HeartPulse,
    fill: "#EF4444",
  },
  {
    category: "Fitness",
    amount: 10,
    icon: Dumbbell,
    fill: "#8B5CF6",
  },
  {
    category: "Supermarket",
    amount: 21,
    icon: ShoppingCart,
    fill: "#14B8A6",
  },
];

const chartConfig = Object.fromEntries(
  items.map((item) => {
    return [item.category, { label: item.category, color: item.fill }];
  })
);

export default function ExpenseCategories() {
  useEffect(() => {
    console.log(chartConfig);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle label="Expenses Categories" />
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="flex justify-center items-center flex-wrap mt-6">
          <div className="w-[300px]">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[400px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={items}
                  dataKey="amount"
                  nameKey="category"
                  outerRadius={150}
                />
              </PieChart>
            </ChartContainer>
          </div>
          <div className="ml-8">
            <ul className="grid grid-cols-2 gap-4">
              {items.map((item, index) => (
                <li
                  key={`expensecategory${index}`}
                  className="flex items-center gap-2"
                >
                  <item.icon className="w-6 h-6" style={{ color: item.fill }} />
                  <span>{item.category}</span>
                  <span className="font-bold">
                    ({formatDollars(item.amount)})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-around">
        <div className="text-center">
          <p className="text-muted-foreground text-xl">Categories</p>
          <p className="font-semibold text-4xl">{items.length}</p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground text-xl">Total</p>
          <p className="font-semibold text-4xl">
            {formatDollars(items.reduce((sum, item) => sum + item.amount, 0))}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
