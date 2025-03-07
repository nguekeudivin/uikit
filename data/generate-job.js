const fs = require("fs");

const employmentTypes = ["Full-time", "Part-time", "On demand", "Negotiable"];

const experiences = [
  "No Experience",
  "1 Years Exp",
  "2 Years Exp",
  "+ 3 Years Exp",
];

const roles = [
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

const skills = [
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

const workingSchedules = [
  "Monday to Friday",
  "Weekend availability",
  "Day shift",
];

const locations = [
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

const benefits = [
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

function generateJobList(numJobs) {
  const jobList = [];

  // Real-world-like company data
  const companies = [
    {
      name: "Tech Innovators Inc.",
      logo: "/assets/images/companies/company-1.webp",
      address: "123 Silicon Valley Blvd, San Francisco, CA, USA",
      phoneNumber: "+1-555-123-4567",
    },
    {
      name: "Green Energy Solutions",
      logo: "/assets/images/companies/company-2.webp",
      address: "456 Renewable Energy Lane, Berlin, Germany",
      phoneNumber: "+49-555-987-6543",
    },
    {
      name: "Global Marketing Pros",
      logo: "/assets/images/companies/company-2.webp",
      address: "789 Advertising Ave, London, UK",
      phoneNumber: "+44-555-456-7890",
    },
    {
      name: "HealthCare Plus",
      logo: "/assets/images/companies/company-3.webp",
      address: "321 Wellness St, Toronto, Canada",
      phoneNumber: "+1-555-321-7654",
    },
    {
      name: "Creative Designs Studio",
      logo: "/assets/images/companies/company-4.webp",
      address: "654 Artisan Rd, Paris, France",
      phoneNumber: "+33-555-654-3210",
    },
    {
      name: "Future Tech Labs",
      logo: "/assets/images/companies/company-5.webp",
      address: "101 Innovation Drive, Austin, TX, USA",
      phoneNumber: "+1-555-101-2020",
    },
    {
      name: "EcoBuild Constructions",
      logo: "/assets/images/companies/company-6.webp",
      address: "202 Greenfield Rd, Vancouver, Canada",
      phoneNumber: "+1-555-202-3030",
    },
    {
      name: "Bright Minds Education",
      logo: "/assets/images/companies/company-7.webp",
      address: "303 Knowledge Lane, Sydney, Australia",
      phoneNumber: "+61-555-303-4040",
    },
    {
      name: "Urban Food Co.",
      logo: "/assets/images/companies/company-8.webp",
      address: "404 Farm-to-Table Ave, Portland, OR, USA",
      phoneNumber: "+1-555-404-5050",
    },
    {
      name: "NextGen Robotics",
      logo: "/assets/images/companies/company-9.webp",
      address: "505 Automation Blvd, Tokyo, Japan",
      phoneNumber: "+81-555-505-6060",
    },
    {
      name: "Skyline Travels",
      logo: "/assets/images/companies/company-10.webp",
      address: "606 Wanderlust St, Cape Town, South Africa",
      phoneNumber: "+27-555-606-7070",
    },
    {
      name: "Oceanic Shipping Ltd.",
      logo: "/assets/images/companies/company-11.webp",
      address: "707 Harbor View Rd, Singapore",
      phoneNumber: "+65-555-707-8080",
    },
    {
      name: "Opips Capital Sarl.",
      logo: "/assets/images/companies/company-12.webp",
      address: "707 Harbor View Rd, Singapore",
      phoneNumber: "+65-555-707-8080",
    },
  ];

  for (let i = 1; i <= numJobs; i++) {
    const randomLocation =
      locations[Math.floor(Math.random() * locations.length)];
    const randomEmploymentType =
      employmentTypes[Math.floor(Math.random() * employmentTypes.length)];
    const randomExperience =
      experiences[Math.floor(Math.random() * experiences.length)];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const randomSkills = skills.slice(
      0,
      Math.floor(Math.random() * skills.length) + 1
    );
    const randomWorkingSchedule =
      workingSchedules[Math.floor(Math.random() * workingSchedules.length)];
    const randomBenefits = benefits.slice(
      0,
      Math.floor(Math.random() * benefits.length) + 1
    );
    const randomCompany =
      companies[Math.floor(Math.random() * companies.length)];

    // Generate HTML content for the job
    const jobContent = `
        <h2>About the Role</h2>
        <p>We are looking for a talented <strong>${randomRole}</strong> to join our team at <strong>${
      randomCompany.name
    }</strong>. This is a <strong>${randomEmploymentType}</strong> position requiring <strong>${randomExperience}</strong>.</p>
        <h2>Responsibilities</h2>
        <ul>
          <li>Collaborate with cross-functional teams to deliver high-quality solutions.</li>
          <li>Develop and maintain software applications.</li>
          <li>Participate in code reviews and provide constructive feedback.</li>
        </ul>
        <h2>Requirements</h2>
        <ul>
          <li>Proficiency in ${randomSkills.join(", ")}.</li>
          <li>Strong problem-solving skills.</li>
          <li>Excellent communication and teamwork abilities.</li>
        </ul>
        <h2>Benefits</h2>
        <ul>
          ${randomBenefits.map((benefit) => `<li>${benefit}</li>`).join("")}
        </ul>
      `;

    const job = {
      title: `${randomRole} at ${randomCompany.name}`,
      description: `Join ${randomCompany.name} as a ${randomRole} and work in a dynamic environment.`,
      content: jobContent,
      employmentType: randomEmploymentType,
      experience: randomExperience,
      role: randomRole,
      skills: randomSkills,
      workingSchedule: randomWorkingSchedule,
      locations: [randomLocation],
      publish: true,
      expiredAt: new Date(
        Date.now() + (Math.floor(Math.random() * 30) + 1) * 24 * 60 * 60 * 1000
      ), // Random expiration date in the next 30 days
      salaryType: ["hourly", "custom"][Math.floor(Math.random() * 2)], // Use "hourly" or "custom"
      salary: Math.floor(Math.random() * 100000) + 20, // Random salary between 20 and 120
      benefits: randomBenefits,
      company: {
        name: randomCompany.name,
        logo: randomCompany.logo,
        address: randomCompany.address,
        phoneNumber: randomCompany.phoneNumber,
      },
    };
    jobList.push(job);
  }

  return jobList;
}

// Example usage: Generate 3 jobs
const jobs = generateJobList(50);

fs.writeFileSync("jobs.json", JSON.stringify(jobs));
