import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";
import { MOTIFS } from "./ProjectVisual";

type CoverTheme = {
  frame: string; // thick outer border, like a book jacket
  bg: string; // cover colour
  ink: string; // title / text colour on the cover
  accent: string; // motif highlight colour
  badge: string; // pill background
};

const THEMES: Record<string, CoverTheme> = {
  bonfire: { frame: "#8C8AA8", bg: "#F2552C", ink: "#FFF3DF", accent: "#FFD23F", badge: "#4ADE5E" },
  trueman: { frame: "#C6DC52", bg: "#1E3B2C", ink: "#E9F6A8", accent: "#FF5FA2", badge: "#4ADE5E" },
  eggcode: { frame: "#2F4A3C", bg: "#F3E6C0", ink: "#1F2A22", accent: "#E5487C", badge: "#FF3D8B" },
  "solana-vault": { frame: "#FFE94A", bg: "#2C5D63", ink: "#FFE94A", accent: "#FFFFFF", badge: "#4ADE5E" },
  "haunted-dorm": { frame: "#4FB3E8", bg: "#FBD3E0", ink: "#23336B", accent: "#E5487C", badge: "#FF3D8B" },
};

const FALLBACK: CoverTheme = {
  frame: "#F2A541",
  bg: "#FFF8E6",
  ink: "#2A2A2A",
  accent: "#7A5CFA",
  badge: "#7A5CFA",
};

export function getCoverTheme(slug: string) {
  return THEMES[slug] ?? FALLBACK;
}

export default function ProjectCover({ project }: { project: Project }) {
  const theme = getCoverTheme(project.slug);
  const Motif = MOTIFS[project.slug];

  return (
    <div
      className="rounded-[30px] p-3 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] sm:p-3.5"
      style={{ backgroundColor: theme.frame }}
    >
      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-[20px]"
        // --foreground / --accent drive the motif's currentColor + text-accent
        style={
          {
            backgroundColor: theme.bg,
            color: theme.ink,
            "--foreground": theme.ink,
            "--accent": theme.accent,
          } as CSSProperties
        }
      >
        {/* motif */}
        {Motif ? (
          <div className="absolute inset-0 flex items-center justify-center pb-[34%] transition-transform duration-700 ease-out group-hover:scale-110">
            <Motif />
          </div>
        ) : (
          <span className="font-poster pointer-events-none absolute -right-4 top-10 select-none text-[160px] leading-none opacity-15">
            {project.number}
          </span>
        )}

        {/* badge */}
        {project.badge && (
          <span
            className="absolute left-4 top-5 -rotate-2 rounded-full px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-white shadow-sm sm:text-[13px]"
            style={{ backgroundColor: theme.badge }}
          >
            {project.badge}
          </span>
        )}

        <span className="font-mono-label absolute right-5 top-6 text-[11px] opacity-70">
          Nº {project.number}
        </span>

        {/* title block */}
        <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
          <p className="font-mono-label mb-2 text-[10.5px] uppercase opacity-75">
            {project.category}
          </p>
          <h3 className="font-poster text-[clamp(28px,9vw,42px)] font-black uppercase leading-[0.9] tracking-[-0.03em] break-words sm:text-[40px]">
            {project.name}
          </h3>
        </div>
      </div>
    </div>
  );
}
