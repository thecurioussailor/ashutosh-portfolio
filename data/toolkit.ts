export type ToolkitRow = {
  label: string;
  items: string[];
  direction: "left" | "right";
  duration: number;
};

// Most relevant to a frontend-leaning full-stack / Web3 positioning first.
export const toolkitRows: ToolkitRow[] = [
  {
    label: "Core / Frontend",
    items: [
      "React",
      "TypeScript",
      "Rust",
      "Next.js",
      "JavaScript",
      "Tailwind",
      "React Native",
      "Expo",
    ],
    direction: "left",
    duration: 42,
  },
  {
    label: "Backend / Data",
    items: [
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Prisma",
      "Redis",
      "Spring Boot",
      "Java",
    ],
    direction: "right",
    duration: 48,
  },
  {
    label: "Blockchain / Infrastructure",
    items: ["Solana", "Anchor", "Docker", "AWS", "Vercel", "Supabase", "Cloudflare"],
    direction: "left",
    duration: 36,
  },
];
