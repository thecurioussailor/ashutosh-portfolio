export type ExperienceEntry = {
  year: string;
  role: string;
  org: string;
  description: string;
  tags?: string[];
};

export const experience: ExperienceEntry[] = [
  {
    year: "2025 — Present",
    role: "Software Engineer",
    org: "[Placeholder — current role]",
    description:
      "[Placeholder — replace with a concise description of scope and focus at this role.]",
    tags: ["Infrastructure", "Backend"],
  },
  {
    year: "2024 — 2025",
    role: "Independent Builder",
    org: "Bonfire, Solana Vault, Haunted Dorm",
    description:
      "Designed and shipped independent projects spanning payments infrastructure, developer tooling, and on-chain gaming.",
    tags: ["Solana", "Rust", "TypeScript"],
  },
  {
    year: "[Placeholder]",
    role: "[Placeholder — role]",
    org: "[Placeholder — company / project]",
    description:
      "[Placeholder — replace with real experience once details are confirmed.]",
    tags: ["[Placeholder]"],
  },
];
