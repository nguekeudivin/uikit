import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
const chartData = [
  { month: "Italy", A: 186, B: 80 },
  { month: "Japan", A: 305, B: 200 },
  { month: "China", A: 237, B: 120 },
  { month: "Canada", A: 73, B: 190 },
  { month: "France", A: 209, B: 130 },
];

const chartConfig = {
  A: {
    label: "2023",
    color: "#CCFBF1",
  },
  B: {
    label: "2024",
    color: "#0F766E",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;
export default function ConversionRates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle label="Conversation Rales" />
        <h4 className="text-muted-foreground">(+43%) than last year</h4>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={6}
              axisLine={false}
            />
            <XAxis dataKey="A" type="number" axisLine={false} />
            <XAxis dataKey="B" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="B"
              layout="vertical"
              fill="var(--color-B)"
              barSize={10}
            ></Bar>
            <Bar
              dataKey="A"
              layout="vertical"
              fill="var(--color-A)"
              barSize={10}
            ></Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
