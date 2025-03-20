"use client";

import { hexToRGBA } from "@/lib/utils";
import { BookCheck, BookOpenCheck, FileBadge } from "lucide-react";
import HoursSpent from "./HoursSpent";
import { CourseProgress } from "./CourseProgress";
import ContinueCourse from "./ContinueCourse";
import FeaturedCourse from "./FeaturedCourse";
import UserDetails from "./UserDetails";

const stats = [
  {
    value: 6,
    label: "Courses in progress",
    color: "#F59E0B",
    icon: BookOpenCheck,
  },
  {
    value: 5,
    label: "Courses completed",
    color: "#10B981",
    icon: BookCheck,
  },
  {
    value: 2,
    label: "Certificates",
    color: "#8B5CF6",
    icon: FileBadge,
  },
];

export default function CoursePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 w-full border">
      <aside className="p-8 bg-white col-span-3">
        <header>
          <h3 className="text-3xl font-semibold">{`Hi, Afrika Kemi 👋`}</h3>
          <h4 className="mt-2 text-lg text-muted-foreground">
            {`Let's learn something new today!`}
          </h4>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {stats.map((item, index) => (
            <div
              key={`coursestat${index}`}
              className="p-6 relative shadow rounded-xl overflow-hidden"
            >
              <p className="text-4xl font-bold">{item.value}</p>
              <p className="text-lg text-muted-foreground">{item.label}</p>

              <div
                className="w-32 h-24 absolute rotate-45 -right-14 top-0 rounded-2xl bg-green-600"
                style={{ backgroundColor: hexToRGBA(item.color, 0.2) }}
              ></div>

              <div
                className="absolute top-6 right-4"
                style={{ color: item.color }}
              >
                <item.icon className="w-8 h-8" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <HoursSpent />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <CourseProgress />
          </div>
          <div>
            <ContinueCourse />
          </div>
        </div>
        <div className="mt-8">
          <FeaturedCourse />
        </div>
      </aside>
      <aside className="bg-gray-100 ">
        <UserDetails />
      </aside>
    </div>
  );
}
