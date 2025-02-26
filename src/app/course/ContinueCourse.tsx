import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDollars } from "@/lib/utils";

const courses = [
  {
    title: "Introduction to Python Programming",
    lessonsCompleted: 7,
    totalLessons: 12,
    progress: 58.3,
    image: "/assets/images/courses/course-1.jpg",
  },
  {
    title: "Digital Marketing Fundamentals",
    lessonsCompleted: 8,
    totalLessons: 12,
    progress: 66.7,
    image: "/assets/images/courses/course-2.jpg",
  },
  {
    title: "Data Science with R",
    lessonsCompleted: 9,
    totalLessons: 12,
    progress: 75,
    image: "/assets/images/courses/course-3.jpg",
  },
  {
    title: "Graphic Design Essentials",
    lessonsCompleted: 10,
    totalLessons: 12,
    progress: 83.3,
    image: "/assets/images/courses/course-4.jpg",
  },
];

export default function CourseContinue() {
  return (
    <Card>
      <CardHeader>
        <CardTitle label="Course Continue" />
      </CardHeader>
      <CardContent className="px-6 pb-6 w-full">
        <ul className="space-y-6">
          {courses.map((item, index) => (
            <li
              key={`JpdnYSRKZA${index}`}
              className="w-full flex items-center gap-3"
            >
              <div
                className="rounded-xl bg-cover w-20 h-16"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div className="w-full">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  Lesson: {item.lessonsCompleted} / {item.totalLessons}
                </p>
                <div className="flex items-center w-full">
                  <div className="bg-gray-200 h-1.5 w-full rounded-md">
                    <div
                      className="h-full rounded-md bg-yellow-500"
                      style={{
                        width: `${item.progress}%`,
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
      </CardContent>
    </Card>
  );
}
