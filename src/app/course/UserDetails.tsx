import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { copyToClipboard, hexToRGBA } from "@/lib/utils";
import { Calendar, Copy } from "lucide-react";
import { courses } from "@/api-call/endpoints/courses";
import { colors } from "@/lib/colors";

import { format } from "date-fns";
const chartData = [
  { subject: "English", score: 186 },
  { subject: "Historgy", score: 305 },
  { subject: "Geography", score: 237 },
  { subject: "Math", score: 190 },
  { subject: "Physics", score: 130 },
  { subject: "Chinese", score: 214 },
];

const chartConfig = {
  score: {
    label: "Score",
    color: "#059669",
  },
} satisfies ChartConfig;

export default function UserDetails() {
  const user = {
    id: 123455,
    name: "Afrika Kemi",
    avatar: "/assets/images/avatar/avatar-1.webp",
  };
  return (
    <div className="p-12">
      <div className="text-center">
        <div className="relative">
          <div
            className="z-20 border-white border-2 mx-auto w-24 h-24 bg-cover rounded-full"
            style={{ backgroundImage: `url(${user.avatar})` }}
          ></div>
          <div className="absolute top-0 left-0 z-10 w-full h-ull">
            <div className="mx-auto animate-spin-slow rounded-full h-25 w-25 border-t-2  border-blue-500"></div>
          </div>
        </div>
        <p className="text-lg font-semibold mt-4">{user.name}</p>
        <p className="text-uppercase text-muted-foreground flex items-center gap-2 justify-center">
          <span className="text-lg">ID:{user.id}</span>
          <button
            onClick={() => {
              copyToClipboard(user.id);
            }}
            className="click:bg-gray-200"
          >
            <Copy className="w-4 h-4" />
          </button>
        </p>
      </div>

      <h3 className="text-xl mt-8 font-semibold"> Strengh</h3>
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
            dataKey="score"
            fill="var(--color-score)"
            fillOpacity={0.3}
            stroke="var(--color-score)"
            strokeWidth={2}
          />
        </RadarChart>
      </ChartContainer>

      <h3 className="text-xl mt-8 font-semibold"> Reminder</h3>
      <ul className="space-y-6 mt-4">
        {courses.map((item, index) => (
          <li key={`JpYSRKZA${index}`} className="w-full flex  gap-3">
            <div
              className="w-2 rounded-lg h-6 mt-2"
              style={{ backgroundColor: hexToRGBA(colors[index], 0.2) }}
            ></div>

            <div className="w-full">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm mt-2 text-muted-foreground flex items-center gap-2">
                <span>
                  <Calendar className="w-4 h-4" />
                </span>
                <span> {format(item.dueDate, "dd MMM yyyy hh:mm a")}</span>
              </p>
              <div className="flex items-center w-full mt-2">
                <div className="bg-gray-200 h-1.5 w-full rounded-md">
                  <div
                    className="h-full rounded-md"
                    style={{
                      width: `${item.progress}%`,
                      backgroundColor: colors[index],
                    }}
                  ></div>
                </div>
                <div className="ml-1 pt-0.5 text-center flex items-center justify-center w-8 text-xs text-muted-foreground">
                  {item.progress}%
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
