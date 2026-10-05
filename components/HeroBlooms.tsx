import type { ReactElement } from "react";

/*
 * "Blooms" for the poster hero — work objects growing on stems.
 * Each one is drawn 120 units wide: the object sits in the top 120 units and the
 * stem + leaves run down to the bottom edge (where it "grows" from). The stem
 * length is derived from the bloom's box so taller blooms really are taller.
 */

const INK = "#111";
const STEM = "#2F5D3A";
const LEAF = "#5E9C68";

function Stem({ curve = 0, len, leaves = [0.5, 0.75] }: { curve?: number; len: number; leaves?: number[] }) {
  // gentle S-curve from the bottom centre up to the object
  const d = `M60 ${len} C ${60 + curve} ${len * 0.78}, ${60 - curve} ${len * 0.5}, 60 112`;
  return (
    <g>
      {leaves.map((t, i) => {
        const y = 112 + (len - 112) * t;
        const left = i % 2 === 0;
        return (
          <path
            key={i}
            d={
              left
                ? `M58 ${y} C 36 ${y - 6}, 18 ${y - 26}, 14 ${y - 46} C 34 ${y - 44}, 52 ${y - 28}, 58 ${y} Z`
                : `M62 ${y} C 84 ${y - 6}, 102 ${y - 26}, 106 ${y - 46} C 86 ${y - 44}, 68 ${y - 28}, 62 ${y} Z`
            }
            fill={LEAF}
            stroke={INK}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        );
      })}
      <path d={d} fill="none" stroke={INK} strokeWidth="10" strokeLinecap="round" />
      <path d={d} fill="none" stroke={STEM} strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

function Terminal() {
  return (
    <g>
      <rect x="10" y="20" width="100" height="80" rx="12" fill="#F7D35E" stroke={INK} strokeWidth="3.5" />
      <path d="M10 40 H110" stroke={INK} strokeWidth="3" />
      <circle cx="22" cy="30" r="3.5" fill={INK} />
      <circle cx="33" cy="30" r="3.5" fill={INK} />
      <circle cx="44" cy="30" r="3.5" fill={INK} />
      <path d="M26 58 L38 68 L26 78" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="46" y="74" width="22" height="5" rx="2.5" fill={INK} />
    </g>
  );
}

function Coin() {
  return (
    <g>
      <ellipse cx="62" cy="64" rx="44" ry="44" fill="#C97A1E" stroke={INK} strokeWidth="3.5" />
      <circle cx="58" cy="60" r="44" fill="#F0A33E" stroke={INK} strokeWidth="3.5" />
      <circle cx="58" cy="60" r="31" fill="none" stroke={INK} strokeWidth="3" />
      <path d="M58 40 L75 50 V70 L58 80 L41 70 V50 Z" fill="#F7D35E" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
    </g>
  );
}

function Rocket() {
  return (
    <g>
      <path d="M60 6 C 82 26, 86 62, 80 94 H40 C 34 62, 38 26, 60 6 Z" fill="#B7A8F0" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <circle cx="60" cy="48" r="11" fill="#6DE3EA" stroke={INK} strokeWidth="3" />
      <path d="M40 72 L22 98 H42 Z M80 72 L98 98 H78 Z" fill="#F8A5E6" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M48 94 Q60 120 72 94 Z" fill="#F0A33E" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
    </g>
  );
}

function Phone() {
  return (
    <g>
      <rect x="32" y="6" width="56" height="104" rx="13" fill="#F8A5E6" stroke={INK} strokeWidth="3.5" />
      <rect x="40" y="18" width="40" height="70" rx="6" fill="#fffdf6" stroke={INK} strokeWidth="2.5" />
      <rect x="46" y="28" width="28" height="8" rx="4" fill="#6DE3EA" />
      <rect x="46" y="42" width="20" height="6" rx="3" fill={INK} opacity="0.75" />
      <rect x="46" y="54" width="26" height="6" rx="3" fill={INK} opacity="0.75" />
      <circle cx="60" cy="99" r="4" fill={INK} />
    </g>
  );
}

function Cloud() {
  return (
    <g>
      <path
        d="M28 78 C 10 78, 8 52, 28 50 C 28 30, 56 24, 64 40 C 74 26, 102 32, 98 54 C 114 56, 114 80, 96 80 Z"
        fill="#6DE3EA"
        stroke={INK}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <rect x="38" y="86" width="44" height="14" rx="4" fill="#fffdf6" stroke={INK} strokeWidth="3" />
      <rect x="38" y="100" width="44" height="14" rx="4" fill="#fffdf6" stroke={INK} strokeWidth="3" />
      <circle cx="47" cy="93" r="2.5" fill="#4ADE5E" />
      <circle cx="47" cy="107" r="2.5" fill="#4ADE5E" />
    </g>
  );
}

export type Bloom = {
  key: string;
  object: () => ReactElement;
  /** horizontal centre, % of the frame width */
  x: number;
  /** total height, % of the frame height */
  h: number;
  rotate: number;
  curve: number;
  /** how far down it starts (fraction of its own height) before growing out */
  start: number;
};

export const BLOOMS: Bloom[] = [
  { key: "terminal", object: Terminal, x: 16, h: 92, rotate: -9, curve: 14, start: 0.62 },
  { key: "coin", object: Coin, x: 33, h: 66, rotate: 6, curve: -10, start: 0.5 },
  { key: "rocket", object: Rocket, x: 50, h: 118, rotate: -2, curve: 8, start: 0.66 },
  { key: "phone", object: Phone, x: 68, h: 82, rotate: 8, curve: -12, start: 0.56 },
  { key: "cloud", object: Cloud, x: 85, h: 100, rotate: 10, curve: 12, start: 0.62 },
];

/** bloom box width as a % of the frame width (frame is 4:5) */
export const BLOOM_W = 34;

export function BloomArt({ bloom }: { bloom: Bloom }) {
  const Obj = bloom.object;
  // box aspect = (h% of frame height) / (BLOOM_W% of frame width), frame height = 1.25 × width
  const len = Math.round((120 * (bloom.h * 1.25)) / BLOOM_W);
  return (
    <svg viewBox={`0 0 120 ${len}`} preserveAspectRatio="xMidYMax meet" className="h-full w-full overflow-visible" aria-hidden="true">
      <Stem curve={bloom.curve} len={len} />
      <Obj />
    </svg>
  );
}
