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
import {
  HeartPulse,
  Stethoscope,
  Syringe,
  Hospital,
  Smile,
  FlaskConical,
  Glasses,
} from "lucide-react";
import { useEffect } from "react";
import { Pie, PieChart } from "recharts";

const items = [
  {
    category: "Consultation",
    amount: 220,
    icon: Stethoscope,
    fill: "#6366F1",
  },
  {
    category: "Frais pharmaceutiques",
    amount: 180,
    icon: Syringe,
    fill: "#22C55E",
  },
  {
    category: "Frais d’hospitalisation",
    amount: 160,
    icon: Hospital,
    fill: "#F59E0B",
  },
  {
    category: "Soins dentaires",
    amount: 170,
    icon: Smile,
    fill: "#D97706",
  },
  {
    category: "Analyses médicales",
    amount: 140,
    icon: FlaskConical,
    fill: "#38BDF8",
  },
  {
    category: "Verres médicaux",
    amount: 120,
    icon: Glasses,
    fill: "#EF4444",
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
        <CardTitle label="Type de soins" />
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="flex flex-wrap md:flex-no-wrap gap-4 md:gap-8 justify-center items-center flex-wrap mt-6">
          <div className="w-[200px] md:w-[300px]">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square  max-h-[300px] md:max-h-[400px]"
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
          <div className=" mt-4 md:mt-0">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item, index) => (
                <li
                  key={`expensecategory${index}`}
                  className="flex items-center gap-2"
                >
                  <item.icon
                    className="w-6 h-6 shrink-0"
                    style={{ color: item.fill }}
                  />
                  <span>{item.category}</span>
                  <span className="font-bold">
                    ({item.amount.toLocaleString()})
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
          <p className="font-semibold text-2xl md:text-4xl">{items.length}</p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground text-xl">Total</p>
          <p className="font-semibold text-2xl md:text-4xl">
            {items.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
