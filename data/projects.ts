export type Project = {
  slug: string;
  number: string;
  name: string;
  category: string;
  description: string;
  year: string;
  technologies: string[];
  image: string;
  featured?: boolean;
  links?: { label: string; href: string }[];
  caseStudy: {
    overview: string;
    problem: string;
    approach: string;
    architecture: string;
    implementation: string;
    result: string;
  };
};

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
    image: "/projects/bonfire",
    featured: true,
    caseStudy: {
      overview:
        "Bonfire is an MPC-secured Solana wallet built for safe, developer-friendly transaction infrastructure — key custody without a single point of failure.",
      problem:
        "[Placeholder — describe the specific problem Bonfire addresses: what was slow, expensive, or fragile about existing wallet custody, and who felt that pain.]",
      approach:
        "[Placeholder — describe the approach taken: design principles, tradeoffs considered, why MPC was the right custody model.]",
      architecture:
        "[Placeholder — describe the system architecture: MPC signing flow, on-chain programs, off-chain services, data flow between the Rust layer and the TypeScript client.]",
      implementation:
        "[Placeholder — describe notable implementation details: key-share generation, signing protocol, how correctness and safety were verified.]",
      result:
        "[Placeholder — describe the current state of the project and what shipped.]",
    },
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
    image: "/projects/trueman",
    featured: true,
    caseStudy: {
      overview:
        "Trueman is a crypto trading infrastructure project built around a matching engine, live market data, and real-time client infrastructure.",
      problem:
        "[Placeholder — describe the specific problem Trueman addresses: what existing trading infrastructure couldn't do, and who felt that pain.]",
      approach:
        "[Placeholder — describe the approach taken: design principles, tradeoffs considered, why a custom matching engine was the right call.]",
      architecture:
        "[Placeholder — describe the system architecture: the Rust matching engine, Redis for state/market data, and the WebSocket layer to clients.]",
      implementation:
        "[Placeholder — describe notable implementation details: order matching, market data fan-out, how correctness and latency were verified.]",
      result:
        "[Placeholder — describe the current state of the project and what shipped.]",
    },
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
    image: "/projects/eggcode",
    featured: true,
    caseStudy: {
      overview:
        "Eggcode is a persistent browser workspace for building and running Claude Agent SDK sessions — a developer tool for working with AI agents.",
      problem:
        "[Placeholder — describe the specific problem Eggcode addresses: what was fragile or missing in existing agent-development workflows, and who felt that pain.]",
      approach:
        "[Placeholder — describe the approach taken: design principles, tradeoffs considered, why a persistent browser workspace was the right shape.]",
      architecture:
        "[Placeholder — describe the system architecture: the Next.js/TypeScript client, session persistence, and integration with the Claude Agent SDK.]",
      implementation:
        "[Placeholder — describe notable implementation details: session state, streaming, how correctness and reliability were verified.]",
      result:
        "[Placeholder — describe the current state of the project and what shipped.]",
    },
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
    image: "/projects/solana-vault",
    caseStudy: {
      overview:
        "Solana Vault is an Anchor-based program that gives developers a composable, auditable building block for programmable custody on Solana.",
      problem:
        "[Placeholder — describe the gap in existing vault primitives that motivated this project.]",
      approach:
        "[Placeholder — describe the design philosophy: minimal trust surface, composability, auditability.]",
      architecture:
        "[Placeholder — describe the Anchor program structure, PDAs, account relationships, and client SDK.]",
      implementation:
        "[Placeholder — describe key implementation decisions, testing strategy, and security considerations.]",
      result:
        "[Placeholder — describe current status: open source, in use, under audit, etc.]",
    },
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
    image: "/projects/haunted-dorm",
    caseStudy: {
      overview:
        "Haunted Dorm is an on-chain multiplayer game exploring the boundary between real-time gameplay and blockchain-verified state.",
      problem:
        "[Placeholder — describe the design challenge: latency, state synchronization, or cost constraints unique to on-chain gaming.]",
      approach:
        "[Placeholder — describe the approach to making on-chain interaction feel responsive.]",
      architecture:
        "[Placeholder — describe the client/program architecture and how game state is represented on-chain.]",
      implementation:
        "[Placeholder — describe implementation details of the game loop, program instructions, and client sync.]",
      result:
        "[Placeholder — describe what shipped and what was learned.]",
    },
  },
  {
    slug: "placeholder-project",
    number: "06",
    name: "Next Project",
    category: "Placeholder",
    description:
      "This slot is reserved for the next build — replace this entry in data/projects.ts once the project is ready to publish.",
    year: "—",
    technologies: ["TBD"],
    image: "/projects/placeholder",
    caseStudy: {
      overview: "[Placeholder — replace with project overview.]",
      problem: "[Placeholder — replace with the problem statement.]",
      approach: "[Placeholder — replace with the approach taken.]",
      architecture: "[Placeholder — replace with architecture notes.]",
      implementation: "[Placeholder — replace with implementation notes.]",
      result: "[Placeholder — replace with the result.]",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return projects[0];
  return projects[(index + 1) % projects.length];
}
