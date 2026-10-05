export type ProcessStep = {
  title: string;
  description: string;
  color: string;
  illustration: "talk" | "scope" | "build" | "ship";
};

// Edit these to match exactly how you work — each line is a promise to the reader.
export const processSteps: ProcessStep[] = [
  {
    title: "Tell me the problem",
    description:
      "A quick call about what you're building, who it's for, and what “done” looks like.",
    color: "#6DE3EA",
    illustration: "talk",
  },
  {
    title: "I scope it",
    description:
      "Architecture, timeline and a clear plan, agreed before a single line of code is written.",
    color: "#E851E3",
    illustration: "scope",
  },
  {
    title: "Build in the open",
    description:
      "Regular updates and working demos you can click through, not just status messages.",
    color: "#F7D35E",
    illustration: "build",
  },
  {
    title: "Ship & hand over",
    description:
      "Deployed, documented, and supported after launch, so it keeps running without me.",
    color: "#9886D8",
    illustration: "ship",
  },
];

// What I build — shown as chips in the "How I work" section
export const buildAreas = ["Products", "Infrastructure", "Blockchain", "AI tools"];
