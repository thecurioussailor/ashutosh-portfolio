export type ProjectStatus = "Live" | "In progress" | "Open source" | "Archived";

export type Project = {
  slug: string;
  number: string;
  name: string;
  category: string;
  /** short line shown under the card */
  description: string;
  year: string;
  technologies: string[];
  /** small pill shown on the project cover, e.g. "FEATURED" */
  badge?: string;
  featured?: boolean;

  // ---- shown in the project panel (all optional — sections hide when empty) ----
  /** one or two sentences: what it is and why it exists */
  pitch?: string;
  status?: ProjectStatus;
  /** e.g. "Solo — design, smart contracts and frontend" */
  role?: string;
  /** 2–3 bullets: what you built, what was hard, real numbers if you have them */
  highlights?: string[];
  links?: { live?: string; github?: string };
  /** YouTube link for the full demo shown in the panel (any youtube.com / youtu.be URL) */
  youtube?: string;
};

/*
 * MEDIA — no code needed. Drop files into public/projects/<slug>/:
 *   preview.mp4 (or .webm)  → 5–8s silent loop, plays on the card on hover
 *   demo.mp4    (or .webm)  → longer demo, shown in the project panel
 *   shot-1.png, shot-2.webp → screenshots for the panel (jpg/png/webp)
 * They're picked up automatically by lib/projectMedia.ts.
 */

export const projects: Project[] = [
  {
    slug: "bonfire",
    number: "01",
    name: "Bonfire",
    category: "MPC-Secured Solana Wallet",
    description:
      "An MPC-secured Solana wallet focused on safe, developer-friendly transaction infrastructure.",
    year: "2025 — 2026",
    technologies: ["Solana", "Rust", "TypeScript"],
    badge: "Featured",
    featured: true,
    pitch:
      "An MPC-secured Solana wallet built for safe, developer-friendly transaction infrastructure — key custody without a single point of failure.",
    youtube: "https://youtu.be/BIZC2nLOY1E",
    // TODO: status, role, highlights, links
  },
  {
    slug: "trueman",
    number: "02",
    name: "Trueman",
    category: "Crypto Trading Infrastructure",
    description:
      "A custom crypto exchange engine built around matching, market data, and real-time infrastructure.",
    year: "2025",
    technologies: ["Rust", "WebSocket", "Redis"],
    badge: "Featured",
    featured: true,
    pitch:
      "Crypto trading infrastructure built around a matching engine, live market data, and real-time client connections.",
    // TODO: status, role, highlights, links
  },
  {
    slug: "eggcode",
    number: "03",
    name: "Eggcode",
    category: "AI Developer Workspace",
    description:
      "A persistent browser workspace for building and running Claude Agent SDK sessions.",
    year: "2026",
    technologies: ["Next.js", "TypeScript", "Claude SDK"],
    badge: "New",
    featured: true,
    pitch:
      "A persistent browser workspace for building and running Claude Agent SDK sessions — a developer tool for working with AI agents.",
    // TODO: status, role, highlights, links
  },
  {
    slug: "solana-vault",
    number: "04",
    name: "Solana Vault",
    category: "Developer Tooling",
    description:
      "A developer-focused vault architecture on Solana — built with Anchor for teams that need programmable custody without reinventing the primitives.",
    year: "2025",
    technologies: ["Solana", "Rust", "Anchor", "TypeScript"],
    badge: "Dev Tool",
    pitch:
      "An Anchor-based program that gives developers a composable, auditable building block for programmable custody on Solana.",
    // TODO: status, role, highlights, links
  },
  {
    slug: "haunted-dorm",
    number: "05",
    name: "Haunted Dorm",
    category: "On-Chain Game",
    description:
      "A multiplayer on-chain game where every move is a transaction — built to explore what real-time interaction feels like when state lives on Solana.",
    year: "2024",
    technologies: ["Solana", "TypeScript", "React"],
    badge: "On-chain Game",
    pitch:
      "An on-chain multiplayer game exploring the line between real-time gameplay and blockchain-verified state.",
    // TODO: status, role, highlights, links
  },
  {
    slug: "placeholder-project",
    number: "06",
    name: "Next Project",
    category: "Coming soon",
    description: "Something new is cooking. Check back soon.",
    year: "—",
    technologies: ["TBD"],
    badge: "Coming Soon",
    pitch: "The next build is in progress — it'll show up here once it's ready to share.",
  },
];
