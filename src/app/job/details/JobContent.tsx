import { backgrounds } from "@/lib/colors";
import { formatDollars } from "@/lib/utils";
import { format } from "date-fns";
import {
  Calendar,
  CalendarCheck,
  CalendarX,
  ChartNoAxesCombined,
  Clock,
  HandCoins,
} from "lucide-react";

export default function JobContent() {
  const job = {
    title: "Senior Software Engineer",
    description:
      "We are looking for a highly skilled Senior Software Engineer to join our dynamic team and contribute to cutting-edge projects.",
    content: `
      <p>We are seeking a talented Senior Software Engineer to join our team. In this role, you will:</p>
      <ul>
        <li>Design and develop scalable software solutions.</li>
        <li>Collaborate with cross-functional teams to define and ship new features.</li>
        <li>Mentor junior developers and conduct code reviews.</li>
        <li>Ensure software quality through testing and debugging.</li>
      </ul>
      <p>If you are passionate about technology and innovation, we want to hear from you!</p>
    `,
    employmentType: ["Full-time", "Negotiable"],
    experience: "+ 3 Years Exp",
    role: "Financial Analyst",
    skills: ["Teamwork", "Time Management", "Leadership", "Adaptability"],
    workingSchedule: ["Weekend availability", "Day shift"],
    locations: [{ name: "Cameroon", ab: "cm", code: "+237" }],
    publish: true,
    createdAt: new Date("2024-03-06"),
    expiredAt: new Date("2025-12-31"), // Job posting expires on December 31, 2023
    salaryType: "custom",
    salary: 140000,
    benefits: [
      "Health insurance",
      "Paid time off",
      "Retirement plans",
      "Flexible work schedule",
      "Training and development",
    ],
    company: {
      logo: "/assets/logo/logo.png",
      name: "OPIPS Capital SARL",
      address: "Doula Logopom. Near to Fin Goudron Latenga",
      phoneNumber: "+237 681037278",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <aside className="col-span-2 shadow rounded-xl p-6">
        <h2 className="text-2xl font-semibold">{job.title}</h2>

        <h3 className="text-xl font-semibold mt-6">Job description</h3>
        <p>{job.description}</p>

        <div
          className="mt-6 ProseMirror border p-0 rounded-lg border-dashed"
          dangerouslySetInnerHTML={{ __html: job.content }}
        ></div>

        <h3 className="text-xl font-semibold mt-6">Skills</h3>
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {job.skills.map((item, index) => (
            <span
              key={`skill${index}`}
              className="px-2 py-1  bg-gray-100 rounded-md"
            >
              {item}
            </span>
          ))}
        </div>

        <h3 className="text-xl mt-6 font-semibold">Benefits</h3>
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {job.benefits.map((item, index) => (
            <span
              key={`benetifs${index}`}
              className="px-2 py-1  bg-gray-100 rounded-md"
            >
              {item}
            </span>
          ))}
        </div>
      </aside>
      <aside className="space-y-6">
        <ul className="rounded-xl shadow p-6 space-y-1">
          {[
            {
              icon: CalendarCheck,
              label: "Date posted",
              value: format(job.createdAt, "dd MMM yyyy"),
            },
            {
              icon: CalendarX,
              label: "Expiration Date",
              value: format(job.expiredAt, "dd MMM yyyy"),
            },
            {
              icon: Clock,
              label: "Employment Type",
              value: (
                <div className="flex items-center gap-2 mt-1">
                  {job.employmentType.map((item, index) => (
                    <span
                      key={`employmentType${index}`}
                      className="font-semibold px-2 py-1  bg-gray-100 rounded-lg"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ),
            },
            {
              icon: HandCoins,
              label: "Offered salary",
              value: formatDollars(job.salary),
            },
            {
              icon: ChartNoAxesCombined,
              label: "Experience",
              value: job.experience,
            },
          ].map((item) => (
            <li className="flex gap-4 items-center">
              <div>
                <item.icon className="w-5 h-5" />
              </div>
              <div className="pt-3">
                <p className="text-gray-600">{item.label}</p>
                <p className="font-semibold">{item.value}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="shadow rounded-xl p-6 flex  gap-5">
          <div className="pt-2">
            <div
              className="bg-cover bg-center w-16 rounded-lg h-16 bg-gray-100"
              style={{ backgroundImage: `url(${job.company.logo})` }}
            ></div>
          </div>

          <div>
            <p className="font-semibold">{job.company.name}</p>
            <p className="text-muted-foreground">{job.company.address}</p>
            <p className="text-muted-foreground">{job.company.phoneNumber}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
