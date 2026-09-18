export type BuildLogEntry = {
  title: string;
  date: string;
  href: string;
};

export const buildLog: BuildLogEntry[] = [
  { title: "Why I built a Solana Vault", date: "2025", href: "#" },
  { title: "How I designed Bonfire", date: "2025", href: "#" },
  { title: "Building a multiplayer game on Solana", date: "2024", href: "#" },
  { title: "Lessons from building payment infrastructure", date: "2024", href: "#" },
];

export const whatIBuild = [
  {
    number: "01",
    label: "Product",
    description:
      "End-to-end products — from first sketch to something real users depend on.",
  },
  {
    number: "02",
    label: "Infrastructure",
    description:
      "The systems underneath the product: services, data layers, and the plumbing that has to hold.",
  },
  {
    number: "03",
    label: "Blockchain",
    description:
      "On-chain programs and the tooling around them — Solana, Anchor, and the primitives they enable.",
  },
  {
    number: "04",
    label: "AI",
    description:
      "Applying models to real workflows — not demos, tools people actually keep open.",
  },
];
