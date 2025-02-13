"use client";

import {
  getApplicationsByDepartmentChartData,
  getApplicationsChartData,
} from "@/api-call/endpoints/applications";
import Card from "@/components/custom/Card";
import CardTitle from "@/components/custom/CardTitle";
import { DatePickerWithRange } from "@/components/custom/DatePickerWidthRange";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { subDays } from "date-fns";
import { useEffect, useState } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Pie,
  PieChart,
} from "recharts";

function ApplicationsChart() {
  // Applications charts.
  const [data, setData] = useState<any>({});
  const config = {
    applied: {
      label: "Applied",
      color: "#CAD2FE",
    },
    shortlisted: {
      label: "Shortlisted",
      color: "#D0ED5A",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    getData(subDays(new Date(), 6), new Date());
  }, []);

  const getData = (startDate: Date, endDate: Date) => {
    getApplicationsChartData(startDate, endDate).then((data) => {
      setData(data);
    });
  };

  return (
    <Card>
      <CardTitle
        label="Applications"
        action={
          <DatePickerWithRange
            onSelect={(date) => getData(date.from as Date, date.to as Date)}
          />
        }
      />

      <div className="mt-4">
        {data.dataKey != undefined && (
          <ChartContainer config={config}>
            <BarChart accessibilityLayer data={data.data}>
              <CartesianGrid vertical={false} />
              <YAxis axisLine={false} width={30} />
              <XAxis
                dataKey={data.dataKey}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend
                verticalAlign="top"
                content={<ChartLegendContent />}
              />
              <Bar
                dataKey="applied"
                stackId="a"
                fill="var(--color-applied)"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="shortlisted"
                stackId="a"
                fill="var(--color-shortlisted)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </div>
    </Card>
  );
}

function ApplicationByDepartementChart() {
  const [data, setData] = useState<any>([]);
  const [config, setConfig] = useState<any>({});

  useEffect(() => {
    getData(subDays(new Date(), 6), new Date());
  }, []);

  const getData = (startDate: Date, endDate: Date) => {
    getApplicationsByDepartmentChartData(startDate, endDate).then((inputs) => {
      const chartData = inputs.map((item: any) => ({
        department: item.name,
        applications: item.value,
        fill: item.color,
      }));

      const chartConfig = Object.fromEntries([
        ...[["applications", { label: "Applications" }]],
        ...inputs.map((item: any) => [
          item.name,
          { label: item.name, color: item.color },
        ]),
      ]);

      setData(chartData);
      setConfig(chartConfig);
    });
  };

  return (
    <Card className="">
      <CardTitle
        label="Applications by department"
        action={
          <DatePickerWithRange
            onSelect={(date) => getData(date.from as Date, date.to as Date)}
          />
        }
      />
      <div className="mt-4 grid grid-cols-5">
        <div className="col-span-2">
          <ChartContainer
            config={config}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey="applications"
                nameKey="department"
                innerRadius={40}
              />
            </PieChart>
          </ChartContainer>
          <div className="mt-4">
            <h4 className="text-center text-xl font-medium">
              {data.reduce(
                (sum: number, item: any) => sum + item.applications,
                0
              )}
            </h4>
            <p className="mt-1 text-center text-sm text-gray-600">
              Total applications
            </p>
          </div>
        </div>
        <div className="col-span-3  pl-8">
          <ul className="space-y-6 w-full">
            {data.map((item: any, index: number) => (
              <li
                key={`applicationByDep${index}`}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="text-muted-foreground">{item.department}</div>
                </div>
                <div className="font-semibold tex-tsm">{item.applications}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

export default function Applications() {
  return (
    <div className="h-full grid lg:grid-cols-2 grid-cols-1 gap-4">
      <ApplicationsChart />

      <ApplicationByDepartementChart />
    </div>
  );
}
