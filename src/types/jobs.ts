export interface Job {
  title: string;
  description: string;
  content: string;
  employmentType: string[];
  experience: string;
  role: string;
  skills: string[];
  workingSchedule: string[];
  locations: string[];
  publish: boolean;
  expiredAt?: Date;
  postedAt?: Date;
  salaryType: string;
  salary: string;
  benefits: string[];
  company: Record<string, unknown>;
}
