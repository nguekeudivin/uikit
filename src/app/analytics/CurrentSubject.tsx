import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { subject: "English", A: 186, B: 80, C: 90 },
  { subject: "Historgy", A: 305, B: 200, C: 100 },
  { subject: "Geography", A: 237, B: 120, C: 150 },
  { subject: "Math", A: 73, B: 190, C: 200 },
  { subject: "Physics", A: 209, B: 130, C: 100 },
  { subject: "Chinese", A: 214, B: 140, C: 50 },
];

const chartConfig = {
  A: {
    label: "Serie 1",
    color: "#059669",
  },
  B: {
    label: "Serie 2",
    color: "#F59E0B",
  },
  C: {
    label: "Serie 3",
    color: "#EC4899",
  },
} satisfies ChartConfig;

export default function CurrentSubject() {
  return (
    <Card>
      <CardHeader>
        <CardTitle label="Current Subject" />
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="subject" />
            <PolarGrid />
            <Radar
              dataKey="A"
              fill="var(--color-A)"
              fillOpacity={0.3}
              stroke="var(--color-A)"
              strokeWidth={2}
            />
            <Radar
              dataKey="B"
              fill="var(--color-B)"
              fillOpacity={0.5}
              stroke="var(--color-B)"
              strokeWidth={2}
            />
            <Radar
              dataKey="C"
              fill="var(--color-C)"
              fillOpacity={0.2}
              stroke="var(--color-C)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
