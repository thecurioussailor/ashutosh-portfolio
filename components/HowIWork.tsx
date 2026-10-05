"use client";

import { useState, type CSSProperties, type ReactElement } from "react";
import { ArrowRight } from "lucide-react";
import { buildAreas, processSteps, type ProcessStep } from "@/data/process";
import Reveal from "./Reveal";

const S = {
  fill: "none",
  stroke: "#111",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Talk() {
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full" aria-hidden="true">
      <path
        {...S}
        d="M20 30 h100 a14 14 0 0 1 14 14 v40 a14 14 0 0 1 -14 14 H62 l-22 20 v-20 H20 a14 14 0 0 1 -14 -14 V44 a14 14 0 0 1 14 -14 z"
        fill="#fff"
      />
      <path
        d="M80 64 h100 a14 14 0 0 1 14 14 v34 a14 14 0 0 1 -14 14 h-12 v20 l-22 -20 H80 a14 14 0 0 1 -14 -14 V78 a14 14 0 0 1 14 -14 z"
        fill="#111"
      />
      <g fill="#fff">
        <circle cx="110" cy="95" r="5" />
        <circle cx="130" cy="95" r="5" />
        <circle cx="150" cy="95" r="5" />
      </g>
      <path {...S} d="M28 52 h60 M28 68 h36" />
    </svg>
  );
}

function Scope() {
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full" aria-hidden="true">
      <rect {...S} x="18" y="14" width="150" height="128" rx="10" fill="#fff" />
      <path
        {...S}
        strokeWidth={1.5}
        opacity="0.35"
        d="M18 46 h150 M18 78 h150 M18 110 h150 M56 14 v128 M94 14 v128 M132 14 v128"
      />
      <rect x="34" y="30" width="38" height="26" rx="5" fill="#111" />
      <rect {...S} x="112" y="30" width="40" height="26" rx="5" fill="#fff" />
      <rect {...S} x="70" y="94" width="44" height="28" rx="5" fill="#fff" />
      <path {...S} d="M72 43 h40 M53 56 v52 h17 M132 56 v52 h-18" />
      <path {...S} d="M150 150 l38 -64 l10 6 l-38 64 l-14 6 z" fill="#fff" />
      <path {...S} d="M180 99 l10 6" />
    </svg>
  );
}

function Build() {
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full" aria-hidden="true">
      <rect {...S} x="10" y="16" width="180" height="124" rx="12" fill="#fff" />
      <path {...S} d="M10 40 h180" />
      <g fill="#111">
        <circle cx="26" cy="28" r="4" />
        <circle cx="40" cy="28" r="4" />
        <circle cx="54" cy="28" r="4" />
      </g>
      <path {...S} d="M30 62 l-10 10 l10 10 M58 62 l10 10 l-10 10" />
      <path {...S} d="M84 64 h60 M84 80 h86 M30 102 h70 M30 118 h44" />
      <path
        d="M128 98 l34 14 l-14 5 l-5 14 z"
        fill="#111"
        stroke="#111"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Ship() {
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full" aria-hidden="true">
      <path
        {...S}
        d="M24 120 q-4 -18 16 -18 q6 -16 24 -8 q14 -6 18 12 q14 2 8 14 z"
        fill="#fff"
      />
      <path
        {...S}
        d="M132 54 q-2 -12 12 -12 q6 -10 18 -2 q12 0 10 14 z"
        fill="#fff"
      />
      <g transform="rotate(40 110 82)">
        <path
          d="M110 14 q26 28 22 82 h-44 q-4 -54 22 -82 z"
          fill="#fff"
          stroke="#111"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <circle cx="110" cy="54" r="10" fill="#111" />
        <path d="M88 76 l-18 26 h20 z M132 76 l18 26 h-20 z" fill="#111" />
        <path {...S} d="M98 104 q12 30 12 30 q0 0 12 -30" fill="#F0A33E" />
      </g>
    </svg>
  );
}

const ILLUSTRATIONS: Record<ProcessStep["illustration"], () => ReactElement> = {
  talk: Talk,
  scope: Scope,
  build: Build,
  ship: Ship,
};

// overlapping, hand-dealt look on desktop
const TILTS = [
  { r: -5, y: 30 },
  { r: -3, y: 50 },
  { r: 1, y: 40 },
  { r: -4, y: 0 },
];

// how far neighbours slide away from the hovered card (px)
const PUSH = 90;

export default function HowIWork() {
  const [active, setActive] = useState<number | null>(null);

  const cardVars = (i: number) => {
    const tilt = TILTS[i % TILTS.length];
    if (active === null) {
      return {
        "--tx": "0px",
        "--y": `${tilt.y}px`,
        "--r": `${tilt.r}deg`,
        "--s": 1,
        zIndex: i,
      };
    }
    if (i === active) {
      return {
        "--tx": "0px",
        "--y": `${tilt.y - 24}px`,
        "--r": "0deg",
        "--s": 1.06,
        zIndex: 20,
      };
    }
    // cards left of the hovered one slide left, cards to the right slide right
    const dir = i < active ? -1 : 1;
    const dist = Math.abs(i - active);
    return {
      "--tx": `${dir * PUSH * (1 + (dist - 1) * 0.35)}px`,
      "--y": `${tilt.y + 10}px`,
      "--r": `${tilt.r + dir * 3}deg`,
      "--s": 0.96,
      zIndex: i,
    };
  };

  return (
    // wrapper paints the corner cut-outs: cream on top (matches the projects section), page bg below
    <div className="bg-[linear-gradient(to_bottom,#fffdf6_50%,var(--background)_50%)]">
      <section
        id="process"
        className="relative overflow-hidden rounded-[36px] bg-[#F8D6F4] pt-24 pb-28 text-[#111] sm:rounded-[60px] sm:pt-32 sm:pb-36 lg:rounded-[90px] xl:rounded-[120px]"
      >
        {/* soft background blobs */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <path
            d="M0 420 C 220 260 420 320 560 420 S 900 260 1040 340 S 1300 520 1440 380 V900 H0 Z"
            fill="#FBE5F8"
          />
          <path
            d="M120 900 C 60 700 180 520 360 560 S 620 760 760 900 Z"
            fill="#F8D6F4"
            opacity="0.9"
          />
        </svg>

        <div className="relative px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <Reveal>
              <h2 className="font-poster text-[15vw] font-black leading-[0.95] tracking-[-0.05em] sm:text-[10vw] lg:text-[6.5vw]">
                How I work
              </h2>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="font-mono-label mr-1 text-[11px] uppercase text-black/60">
                  I build
                </span>
                {buildAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border-2 border-[#111] bg-white/70 px-3.5 py-1 text-[14px] font-semibold"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </Reveal>

            <p className="font-hand -rotate-[4deg] text-[28px] leading-[1.05] text-[#6B5BA8] lg:mt-2 lg:text-center lg:text-[32px]">
              freelance or full-time,
              <br />
              same process
            </p>

            <Reveal delay={0.1} className="lg:mt-6">
              <a
                href="#contact"
                className="group inline-flex items-stretch overflow-hidden rounded-lg text-[17px] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="bg-[#E8338A] px-5 py-3.5">
                  Start a project
                </span>
                <span className="flex items-center border-l border-white/25 bg-[#E8338A] px-4 transition-colors duration-300 group-hover:bg-[#D61F78]">
                  <ArrowRight
                    size={18}
                    strokeWidth={2.5}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </Reveal>
          </div>

          <ol
            onMouseLeave={() => setActive(null)}
            className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:mx-auto lg:flex lg:max-w-6xl lg:justify-center lg:gap-0"
          >
            {processSteps.map((step, i) => {
              const Illustration = ILLUSTRATIONS[step.illustration];
              return (
                <li
                  key={step.title}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="deal-card relative lg:-mx-10 lg:w-[310px] lg:shrink-0"
                  style={cardVars(i) as CSSProperties}
                >
                  <Reveal delay={i * 0.08}>
                    <div
                      className="flex min-h-[460px] flex-col rounded-[28px] p-7 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.5)] sm:min-h-[500px]"
                      style={{ backgroundColor: step.color }}
                    >
                      <p className="font-hand text-center text-[34px] leading-none">
                        Step #{i + 1}
                      </p>
                      <div className="mx-auto mt-6 h-[150px] w-full max-w-[220px]">
                        <Illustration />
                      </div>
                      <h3 className="font-poster mt-auto text-[30px] font-black leading-[0.95] tracking-[-0.04em]">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-[15px] font-medium leading-snug">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
}
