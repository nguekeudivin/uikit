const fs = require("fs");

const generateUsers = () => {
  const firstNames = [
    "James",
    "Mary",
    "John",
    "Patricia",
    "Robert",
    "Jennifer",
    "Michael",
    "Linda",
    "William",
    "Elizabeth",
    "David",
    "Barbara",
    "Richard",
    "Susan",
    "Joseph",
    "Jessica",
    "Thomas",
    "Sarah",
    "Charles",
    "Karen",
    "Christopher",
    "Nancy",
    "Daniel",
    "Lisa",
    "Matthew",
  ];

  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Perez",
    "Thompson",
    "White",
    "Harris",
  ];

  const countries = [
    "Cameroon",
    "United States",
    "France",
    "England",
    "Nigeria",
    "Ghana",
    "Spain",
    "Canada",
    "Australia",
    "Germany",
    "Denmark",
    "Brazil",
    "Mexico",
    "Switzerland",
    "Netherlands",
    "Japan",
    "South Africa",
    "India",
    "Italy",
    "Russia",
    "South Korea",
    "Sweden",
    "Argentina",
    "New Zealand",
    "Singapore",
  ];

  const roles = [
    "CTO",
    "CEO",
    "Project Coordinator",
    "Team Leader",
    "Software Developer",
    "Marketing Strategist",
    "Data Analyst",
    "Product Owner",
    "Graphic Designer",
    "Operations Manager",
    "Customer Support Specialist",
    "Sales Manager",
    "HR Recruiter",
    "Business Consultant",
    "Financial Planner",
    "Network Engineer",
    "Content Creator",
    "Quality Assurance Tester",
    "UX Designer",
    "DevOps Engineer",
    "System Administrator",
    "Technical Writer",
    "Social Media Manager",
    "Business Analyst",
    "Security Specialist",
  ];

  const companies = [
    "Tech Innovators Inc.",
    "Global Solutions Ltd.",
    "Future Enterprises",
    "Bright Minds Co.",
    "NextGen Technologies",
    "Alpha Ventures",
    "Stellar Systems",
    "Prime Consulting",
    "Infinite Horizons",
    "Pioneer Networks",
    "Summit Solutions",
    "Eagle Eye Analytics",
    "Blue Ocean Strategies",
    "Golden Gate Industries",
    "Silverline Services",
    "Quantum Leap Corp.",
    "Horizon Dynamics",
    "Nova Innovations",
    "Apex Advisors",
    "Visionary Labs",
    "Zenith Partners",
    "Infinity Works",
    "Eclipse Enterprises",
    "Phoenix Global",
    "Orion Solutions",
  ];

  const domains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "protonmail.com",
    "aol.com",
    "zoho.com",
    "mail.com",
    "yandex.com",
  ];

  const statuses = ["active", "pending", "banned", "rejected"];

  const users = [];

  for (let i = 0; i < 25; i++) {
    const firstName = firstNames[i];
    const lastName = lastNames[i];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const user = {
      name: `${firstName} ${lastName}`,
      role: roles[i],
      avatar: `/assets/images/avatar/avatar-${i + 1}.webp`,
      country: countries[i],
      following: Math.floor(Math.random() * 1000) + 500,
      followers: Math.floor(Math.random() * 500) + 100,
      totalPosts: Math.floor(Math.random() * 50) + 20,
      cover: `/assets/images/cover/cover-${i + 1}.webp`,
      company: companies[i],
      phoneNumber: `+${Math.floor(Math.random() * 10000000000)}`,
      email: email,
      status: status,
    };
    users.push(user);
  }

  return users;
};

const users = generateUsers();
console.log(users);
fs.writeFileSync("./users.json", JSON.stringify(users));
