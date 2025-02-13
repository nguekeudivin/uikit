import React from "react";
import clsx from "clsx";
import { Briefcase, ChartNoAxesColumnIncreasing } from "lucide-react"; // Assuming you're using Lucide React for icons
import { formatDollars } from "@/lib/utils"; // Assuming you have a utility function to format dollars
import useDepartment from "@/api-call/hooks/useDepartment";
import { Job } from "@/api-call/types";
import { Button } from "../ui/button";
import Link from "next/link";

interface JobCardProps {
  item: Job;
}

const JobCard: React.FC<JobCardProps> = ({ item }) => {
  const { getByName } = useDepartment();

  return (
    <div
      key={`job${item.id}`}
      className={clsx("rounded-xl p-4 bg-white cursor-pointer transition-all")}
    >
      {/* Job Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Department Icon */}
          <div
            className={clsx(
              "bg-primary text-gray-800 rounded-md w-12 h-12 flex items-center justify-center"
            )}
          >
            <span
              className="text-xl"
              dangerouslySetInnerHTML={{
                __html: getByName(item.department)?.icon || "", // Render department icon
              }}
            ></span>
          </div>
          <div className="ml-2">
            <h3 className="text-lg">{item.title}</h3>
            <h4 className="text-muted-foreground">{item.department}</h4>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <div className="bg-gray-100 text-sm rounded p-1.5">
          {item.employmentType}
        </div>
        <div className="bg-gray-100 text-sm rounded p-1.5">{item.workType}</div>
      </div>

      <ul className="mt-4 space-y-2">
        <li className="flex items-center">
          <ChartNoAxesColumnIncreasing className="text-muted-foreground w-4 h-4" />
          <span className="ml-4 font-semibold">{item.level}</span>
        </li>
        <li className="flex items-center">
          <Briefcase className="text-muted-foreground w-4 h-4" />
          <span className="font-semibold ml-4">{item.workExperience}</span>
          <span className="text-muted-foreground ml-2">experience</span>
        </li>
      </ul>

      <div className="mt-4 border-t pt-4 flex items-center justify-between">
        {/* Salary Range */}
        <p className="font-medium text-xl">
          {`${formatDollars(item.salaryRange[0])} - ${formatDollars(
            item.salaryRange[1]
          )}`}
        </p>
        <div>
          <Button className="bg-gray-100" asChild>
            <Link href={`/jobs/${item.id}`}> View details </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
