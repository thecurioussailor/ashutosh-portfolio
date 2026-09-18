import type { ReactElement } from "react";

type ProjectVisualProps = {
  slug: string;
  number: string;
};

const TONES: Record<string, string> = {
  bonfire: "bg-[#13120e]",
  trueman: "bg-[#0e1113]",
  eggcode: "bg-[#100e15]",
};

function BonfireMotif() {
  // three MPC signing nodes, connected — a wallet secured by no single point of failure
  return (
    <svg viewBox="0 0 200 200" className="h-[46%] w-[46%]" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.55">
        <path d="M100 40 L164 148 L36 148 Z" strokeLinejoin="round" />
        <path d="M100 40 L100 148" opacity="0.4" />
      </g>
      <g fill="currentColor">
        <circle cx="100" cy="40" r="6.5" />
        <circle cx="164" cy="148" r="6.5" />
        <circle cx="36" cy="148" r="6.5" />
      </g>
      <circle
        cx="100"
        cy="112"
        r="3"
        fill="currentColor"
        className="text-accent"
      />
    </svg>
  );
}

function TruemanMotif() {
  // orderbook / market bars
  const heights = [28, 46, 34, 58, 40, 64, 30, 50];
  return (
    <svg viewBox="0 0 200 120" className="h-[36%] w-[62%]" aria-hidden="true">
      <g fill="currentColor" opacity="0.6">
        {heights.map((h, i) => (
          <rect
            key={i}
            x={i * 25 + 4}
            y={120 - h}
            width="14"
            height={h}
            rx="2"
          />
        ))}
      </g>
      <path
        d="M2 78 L27 60 L52 70 L77 40 L102 56 L127 24 L152 44 L177 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-accent"
        opacity="0.85"
      />
    </svg>
  );
}

function EggcodeMotif() {
  // terminal / agent session prompt
  return (
    <svg viewBox="0 0 200 140" className="h-[40%] w-[62%]" aria-hidden="true">
      <rect
        x="1"
        y="1"
        width="198"
        height="138"
        rx="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.35"
      />
      <g
        fontFamily="var(--font-mono)"
        fontSize="15"
        fill="currentColor"
        opacity="0.8"
      >
        <text x="18" y="38">
          &gt; run agent
        </text>
        <text x="18" y="64" className="text-accent" fill="currentColor">
          ~/eggcode
        </text>
        <text x="18" y="90">
          ...
        </text>
      </g>
      <rect x="18" y="100" width="24" height="14" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

const MOTIFS: Record<string, () => ReactElement> = {
  bonfire: BonfireMotif,
  trueman: TruemanMotif,
  eggcode: EggcodeMotif,
};

export default function ProjectVisual({ slug, number }: ProjectVisualProps) {
  const Motif = MOTIFS[slug];
  const tone = TONES[slug] ?? "bg-background-raised";

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden text-foreground ${tone}`}
      aria-hidden="true"
    >
      <span className="font-display pointer-events-none absolute bottom-[-6%] left-[4%] select-none text-[34%] leading-none text-foreground/6">
        {number}
      </span>
      {Motif ? <Motif /> : null}
    </div>
  );
}
