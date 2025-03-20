import { paginateList } from "@/lib/utils";
import { jobs } from "../mocks/jobs";

export function fetchJobs(params: any) {
  console.log(params);
  return Promise.resolve(paginateList(jobs));
}

export const employmentTypes = [
  "Full-time",
  "Part-time",
  "On demand",
  "Negotiable",
];

export const experiences = [
  "No Experience",
  "1 Years Exp",
  "2 Years Exp",
  "+ 3 Years Exp",
];

export const roles = [
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
];

export const skills = [
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
];

export const workingSchedules = [
  "Monday to Friday",
  "Weekend availability",
  "Day shift",
];

export const locations = [
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
];

export const benefits = [
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
];
