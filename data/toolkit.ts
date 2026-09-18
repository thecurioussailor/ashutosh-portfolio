export type ToolkitCategory = {
  label: string;
  items: string[];
};

export const toolkit: ToolkitCategory[] = [
  { label: "Languages", items: ["Rust", "TypeScript", "Python", "JavaScript"] },
  { label: "Frontend", items: ["Next.js", "React", "Tailwind"] },
  { label: "Backend", items: ["Node.js", "PostgreSQL", "Redis"] },
  { label: "Blockchain", items: ["Solana", "Anchor"] },
  { label: "Infrastructure", items: ["Docker", "AWS", "Vercel"] },
];
