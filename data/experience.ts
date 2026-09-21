export type ExperienceEntry = {
  number: string;
  company: string;
  href?: string;
  role: string;
  dates: string;
  description: string;
  technologies: string[];
};

// Most recent first.
export const experience: ExperienceEntry[] = [
  {
    number: "01",
    company: "Unboxed",
    href: "https://www.beunboxed.com/",
    role: "Solana Mobile Engineer",
    dates: "Oct 2025 — Mar 2026",
    description:
      "Built and shipped a production fantasy sports application for Super Phoenix DAO, combining React Native, Solana Mobile, USDC payments, and a Supabase backend.",
    technologies: ["React Native", "Expo", "Solana", "TypeScript", "Supabase"],
  },
  {
    number: "02",
    company: "Ionfirm",
    href: "https://ionfirm.com/",
    role: "Full Stack Developer",
    dates: "Feb 2024 — Jun 2025",
    description:
      "Led development of client products and internal SaaS tools, owning the stack from frontend and APIs through cloud deployment.",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    number: "03",
    company: "Volvo & Eicher Commercial Vehicles",
    href: "https://www.vecv.in/",
    role: "Software Engineer",
    dates: "Mar 2023 — Jan 2024",
    description:
      "Built backend services and React dashboards for manufacturing and logistics workflows, with automated testing, CI/CD, and AWS deployment.",
    technologies: ["Java", "Spring Boot", "React", "Microservices", "AWS", "DevOps"],
  },
];

export type CurrentActivity = {
  label: string;
  detail: string;
};

export const currentActivity: CurrentActivity[] = [
  { label: "Solana Fellowship", detail: "Technical program / community" },
  { label: "Turbin3", detail: "Builder cohort / technical program" },
  { label: "Independent Projects", detail: "Products, developer tools, and experiments" },
];
