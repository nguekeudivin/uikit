"use client";

import EditorField from "@/components/common/form/EditorField";
import TextField from "@/components/common/form/TextField";
import PageContent from "@/components/common/PageContent";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { z } from "zod";
import CheckboxesField from "@/components/common/form/CheckboxesField";
import { CheckBoxOption } from "@/types/form";
import RadiosField from "@/components/common/form/RadiosFields";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChipsField } from "@/components/common/form/ChipsField";
import { CalendarClock, Clock, X } from "lucide-react";
import DateField from "@/components/common/form/DateField";
import LeadedTextField from "@/components/common/form/LeadedTextField";
import { cn } from "@/lib/utils";

export default function CreateJobPage() {
  const form = useSimpleForm({
    defaultValues: {
      title: "Senior Software Engineer",
      description:
        "We are looking for a highly skilled Senior Software Engineer to join our dynamic team and contribute to cutting-edge projects.",
      content: `
        <h1>Senior Software Engineer</h1>
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
      expiredAt: new Date("2023-12-31"), // Job posting expires on December 31, 2023
      salaryType: "custom",
      salary: "140000",
      benefits: [
        "Health insurance",
        "Paid time off",
        "Retirement plans",
        "Flexible work schedule",
        "Training and development",
      ],
    },
    schema: z.object({
      title: z.string().min(1, "Job title is required"),
      description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
      content: z.string().min(20, "Content must be at least 20 characters"),
      employmentType: z
        .array(z.string())
        .min(1, "At least one employment type is required"),
      experience: z.string().min(1, "Experience level is required"),
      role: z.string().min(1, "Role is required"),
      skills: z.array(z.string()).min(1, "At least one skill is required"),
      workingSchedule: z
        .array(z.string())
        .min(1, "At least one working schedule is required"),
      locations: z
        .array(z.string())
        .min(1, "At least one location is required"),
      publish: z.boolean(),
      expiredAt: z.date().optional(),
      salaryType: z.string().min(1, "Salary type is required"),
      salary: z.string().min(1, "Salary is required"),
      benefits: z.array(z.string()).optional(),
    }),
  });
  const submit = () => {
    if (form.check()) {
      // submit the form
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      // To do submit
    }
  };

  return (
    <PageContent
      title="Create new job"
      links={{ Job: "/job/list", "New Job": "#" }}
      className="max-w-6xl mx-auto mb-24"
    >
      <section className="shadow max-w-4xl mx-auto mt-8 rounded-xl">
        <header className="p-6">
          <h3 className="text-2xl font-semibold"> Details </h3>
          <h4 className="text-muted-foreground">Name, content</h4>
        </header>
        <div className="p-6 border-t space-y-6">
          <div>
            <Label>Name</Label>
            <TextField
              name="title"
              placeholder="Ex: Developper Web"
              value={form.values.title}
              onChange={form.handleChange}
              error={form.errors.title}
            />
          </div>

          <div>
            <Label className=""> Content </Label>
            <EditorField
              content={form.values.content}
              onContentChange={(content: string) => {
                form.setValue("content", content);
              }}
              error={form.errors.content}
            />
          </div>
        </div>
      </section>
      <section className="shadow max-w-4xl mx-auto mt-8 rounded-xl">
        <header className="p-6">
          <h3 className="text-2xl font-semibold"> Properties </h3>
          <h4 className="text-muted-foreground">
            Additional functions and attributes...
          </h4>
        </header>
        <div className="flex flex-col gap-8 p-6 border-t border-dashed">
          <div>
            <CheckboxesField
              name="employmentType"
              label="Employement Type"
              options={[
                "Full-time",
                "Part-time",
                "On demand",
                "Negotiable",
              ].map((item) => ({ value: item, label: item }))}
              values={form.values.employmentType}
              onCheckedChange={(
                item: CheckBoxOption,
                checked: boolean | string
              ) => {
                form.pushToggle(
                  "employmentType",
                  item.value,
                  checked as boolean
                );
              }}
              error={form.errors.employmentType}
            />
          </div>

          <div>
            <RadiosField
              name="experience"
              label="Experience"
              options={[
                "No Experience",
                "1 Years Exp",
                "2 Years Exp",
                "+ 3 Years Exp",
              ].map((item) => ({ value: item, label: item }))}
              value={form.values.experience}
              onValueChange={(value: CheckBoxOption) => {
                form.setValue("experience", value);
              }}
              error={form.errors.experience}
            />
          </div>

          <div>
            <Label className="mb-3">Role</Label>
            <Select value={form.values.role}>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                {[
                  " Chief Executive Officer (CEO)",
                  "Software Engineer",
                  "Marketing Manager",
                  "Human Resources Generalist",
                  "Financial Analyst",
                  "Sales Representative",
                  "Customer Support Specialist",
                  "Graphic Designer",
                  "Data Scientist",
                  "Operations Manager",
                  "Product Manager",
                  "Content Writer",
                  "IT Support Specialist",
                  "Recruiter",
                  "Accountant",
                  "UX/UI Designer",
                  "Project Manager",
                  "Business Development Manager",
                  "Cybersecurity Analyst",
                  "Event Coordinator",
                ].map((item, index: number) => (
                  <SelectItem key={`roleitem${index}`} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-3">Skills</Label>
            <ChipsField
              name="skills"
              values={form.values.skills}
              suggestions={[
                "Communication",
                "Problem Solving",
                "Teamwork",
                "Time Management",
                "Leadership",
                "Adaptability",
                "Technical Proficiency",
                "Critical Thinking",
                "Project Management",
                "Creativity",
              ]}
              placeholder="+1 Skill"
              onValuesChange={(values: (string | number)[]) => {
                form.setValue("skills", values);
              }}
              error={form.errors.guides}
            />
          </div>

          <div>
            <Label className="mb-3">Working Schedule</Label>
            <ChipsField
              name="workingSchedule"
              values={form.values.workingSchedule}
              suggestions={[
                "Monday to Friday",
                "Weekend availability",
                "Day shift",
              ]}
              shouldPickSuggestion={true}
              placeholder="+ Working Schedule"
              onValuesChange={(values: (string | number)[]) => {
                form.setValue("workingSchedule", values);
              }}
              error={form.errors.workingSchedule}
            />
          </div>

          <div>
            <Label className="mb-3">Localtions</Label>
            <ChipsField
              name="locations"
              values={form.values.locations}
              suggestions={[
                { name: "France", ab: "fr", code: "+33" },
                { name: "Cameroon", ab: "cm", code: "+237" },
                { name: "United States", ab: "us", code: "+1" },
                { name: "Canada", ab: "ca", code: "+1" },
                { name: "Germany", ab: "de", code: "+49" },
                { name: "United Kingdom", ab: "gb", code: "+44" },
                { name: "Nigeria", ab: "ng", code: "+234" },
                { name: "India", ab: "in", code: "+91" },
                { name: "Brazil", ab: "br", code: "+55" },
                { name: "South Africa", ab: "za", code: "+27" },
              ]}
              searchPredicate={(item: any, keyword: string) => {
                return item.name
                  .toLowerCase()
                  .includes(keyword.toLocaleLowerCase());
              }}
              shouldPickSuggestion={true}
              renderChip={(item: any, remove: any) => {
                return (
                  <div className="rounded-xl p-0.5 px-2  flex no-wrap items-center gap-2 bg-gray-100">
                    <div className="p-1 cursor-pointer rounded-lg bg-gray flex items-center gap-2 hover:bg-gray-100">
                      <div
                        className="shrink-0 w-4 h-4 bg-gray-200 bg-cover bg-center rounded-full"
                        style={{
                          backgroundImage: `url(https://flagcdn.com/w80/${item?.ab}.png)`,
                        }}
                      ></div>
                      <div className="flex item-center gap-2">
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-sm uppercase text-muted-foreground">
                          {item.ab}({item.code})
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={remove}
                      className="bg-gray-500 p-0.5 rounded-full text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              }}
              renderSuggestion={(item: any, pick: any) => {
                return (
                  <div
                    onClick={pick}
                    className="flex  items-center gap-2 py-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <div
                      className="shrink-0 w-4 h-4 bg-gray-200 bg-cover bg-center rounded-full"
                      style={{
                        backgroundImage: `url(https://flagcdn.com/w80/${item?.ab}.png)`,
                      }}
                    ></div>
                    <div className="flex item-center gap-2">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-sm uppercase text-muted-foreground">
                        {item.ab}({item.code})
                      </p>
                    </div>
                  </div>
                );
              }}
              placeholder="+1 Location"
              onValuesChange={(values: (string | number)[]) => {
                form.setValue("locations", values);
              }}
              error={form.errors.locations}
            />
          </div>

          <div>
            <Label className="mb-3">Expired At</Label>
            <DateField
              className="w-full"
              name="expiredAt"
              label="ExpiredAt"
              value={form.values.expiredAt}
              onValueChange={(date) => {
                form.setValue("startDate", date);
              }}
              error={form.errors.enddate}
            />
          </div>

          <div className="space-y-6">
            <Label>Salary</Label>
            <ul className="grid grid-cols-2 gap-4">
              <li
                onClick={() => form.setValue("salaryType", "hourly")}
                className={cn(
                  "flex items-center justify-center flex-col border-2 border-gray-200 hover:border-sky-500 hover:bg-sky-50 p-6 rounded-xl",
                  {
                    "border-sky-500 bg-sky-50":
                      form.values.salaryType == "hourly",
                  }
                )}
              >
                <Clock className="w-8 h-8" />
                <span className="mt-4">Hourly</span>
              </li>
              <li
                onClick={() => form.setValue("salaryType", "custom")}
                className={cn(
                  "flex items-center justify-center flex-col border-2 border-gray-200 hover:border-sky-500 hover:bg-sky-50 p-6 rounded-xl",
                  {
                    "border-sky-500 bg-sky-50":
                      form.values.salaryType == "custom",
                  }
                )}
              >
                <CalendarClock className="w-8 h-8" />
                <span className="font-semibold mt-4">Custom</span>
              </li>
            </ul>
            <LeadedTextField
              placeholder="0.0"
              name="salary"
              value={form.values.salary}
              onChange={form.handleNumberChange}
              leading="$"
              error={form.errors.salary}
            />
            <div className="flex gap-3 items-center">
              <Switch
                id="salaryIsNegociableSwitch"
                checked={form.values.salaryIsNegociable}
                onCheckedChange={(checked) => {
                  form.setValue("salaryIsNegociable", checked);
                }}
              />
              <span>Salary is negociable</span>
            </div>
          </div>
          <CheckboxesField
            label="Benefits"
            options={[
              "Free parking",
              "Bonus commission",
              "Travel",
              "Device support",
              "Health care",
              "Training",
              "Health insurance",
              "Retirement plans",
              "Paid time off",
              "Flexible work schedule",
            ].map((item) => ({ label: item, value: item }))}
            values={form.values.benefits}
            className="grid grid-cols-2 gap-x-8 gap-y-4"
            onCheckedChange={(item: CheckBoxOption, checked: boolean) => {
              form.pushToggle("benefits", item.value, checked as boolean);
            }}
            error={form.errors.benefits}
          />
        </div>
      </section>

      <footer className="max-w-4xl mx-auto  px-4 flex items-center justify-between mt-12">
        <div className="flex gap-3 items-center">
          <Switch
            id="publishSwitch"
            checked={form.values.publish}
            onCheckedChange={(checked) => {
              form.setValue("publish", checked);
            }}
          />
          <span>Publish</span>
        </div>
        <div>
          <Button onClick={submit} variant="dark" size="lg" className="text-lg">
            Save changes
          </Button>
        </div>
      </footer>
    </PageContent>
  );
}
