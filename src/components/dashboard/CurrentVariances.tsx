"use client";

import { getJobsByFilter, getLastJobs } from "@/api-call/endpoints/jobs";
import useDepartment from "@/api-call/hooks/useDepartment";
import { Job } from "@/api-call/types";
import CardTitle from "@/components/custom/CardTitle";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatSalary } from "@/lib/utils";
import clsx from "clsx";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CurrentVariances() {
  const [items, setItems] = useState<Job[]>([]);
  const { getByName } = useDepartment();

  useEffect(() => {
    getLastJobs().then((jobs) => setItems(jobs));
  }, []);

  const handleFilter = (value: string) => {
    getJobsByFilter(value).then((jobs) => setItems(jobs));
  };

  return (
    <div className="w-full h-full">
      <CardTitle
        label="Current Variances"
        count={104}
        action={
          <div className="items-center justify-between flex  space-x-2">
            <span className="text-muted-foreground text-sm">Sort By:</span>
            <Select value="popular" onValueChange={handleFilter}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="less_popular">Less popular</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button className="bg-white text-muted-foreground" asChild>
              <Link href="dashboard/jobs">Sell All</Link>
            </Button>
          </div>
        }
      />
      <div className="grid grid-cols-2 gap-4 mt-4">
        {items.slice(0, 4).map((item: Job, index: number) => (
          <div key={`job${item.id}`} className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={clsx(
                    "text-gray-800 rounded-md w-10 h-10 flex items-center justify-center",
                    {
                      "bg-secondary": index % 2 == 1,
                      "bg-primary": index % 2 == 0,
                    }
                  )}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: getByName(item.department).icon,
                    }}
                  ></span>
                </div>
                <h3 className="font-medium ml-4">{item.title}</h3>
              </div>

              <button className="text-muted-foreground">
                <Ellipsis className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <div className="bg-secondary/30 text-xs rounded p-1.5">
                {item.employmentType}
              </div>
              <div className="bg-secondary/30 text-xs rounded p-1.5">
                {item.workType}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">
                  {`${formatSalary(item.salaryRange[0])} - ${formatSalary(
                    item.salaryRange[1]
                  )}`}
                </span>
                <span className="text-muted-foreground text-sm ml-1">/y</span>
                {item.withCommission ? (
                  <span className="text-muted-foreground text-sm ml-1">
                    + commission
                  </span>
                ) : null}
              </div>
              <p className="text-sm">{item.totalApplicants} Applications </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
