export const jobs = [
  {
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
  },
];
