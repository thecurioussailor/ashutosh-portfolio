"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import type { Project } from "@/data/projects";
import type { ProjectMedia } from "@/lib/projectMedia";
import { getCoverTheme } from "./ProjectCover";
import { MOTIFS } from "./ProjectVisual";
import YouTubeLite, { getYouTubeId } from "./YouTubeLite";

type Lenis = { stop: () => void; start: () => void };

const STATUS_COLOR: Record<string, string> = {
  Live: "#4ADE5E",
  "In progress": "#F7D35E",
  "Open source": "#6DE3EA",
  Archived: "#d4d4d4",
};

/*
 * Project panel — opens over the page when a project card is clicked.
 * Desktop: centred modal (media left, details right). Phones: bottom sheet.
 * Every section hides itself when its data is missing.
 */
export default function ProjectPanel({
  project,
  media,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project;
  media: ProjectMedia;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  // gallery index, remembered per project so it resets when you switch projects
  const [shotState, setShotState] = useState({ slug: project.slug, i: 0 });
  const shot = shotState.slug === project.slug ? shotState.i : 0;
  const setShot = (i: number) => setShotState({ slug: project.slug, i });

  // pause page scroll, wire up keyboard, focus the close button
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    lenis?.stop();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [onClose, onNext, onPrev]);

  const theme = getCoverTheme(project.slug);
  const Motif = MOTIFS[project.slug];
  const links = project.links ?? {};
  const hasLinks = Boolean(links.live || links.github);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center lg:items-center lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-panel-title"
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close project"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#0d1330]/55 backdrop-blur-sm"
      />

      <motion.div
        key={project.slug}
        initial={{ y: 60, opacity: 0, rotate: -1 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        data-lenis-prevent
        className="relative max-h-[90svh] w-full overflow-y-auto rounded-t-[32px] border-[2.5px] border-[#111] bg-[#fffdf6] text-[#111] shadow-[8px_8px_0_#111] lg:max-h-[86vh] lg:max-w-5xl lg:rounded-[36px]"
      >
        {/* close */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#111] bg-white transition-transform duration-300 hover:rotate-90"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* phone grab handle */}
        <div aria-hidden="true" className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-black/15 lg:hidden" />

        <div className="grid grid-cols-1 gap-8 p-5 pt-4 sm:p-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:p-10">
          {/* ---- media ---- */}
          <div>
            <div
              className="relative aspect-video w-full overflow-hidden rounded-[22px] border-[2.5px] border-[#111]"
              style={{ backgroundColor: theme.bg }}
            >
              {project.youtube && getYouTubeId(project.youtube) ? (
                <YouTubeLite key={project.slug} url={project.youtube} title={`${project.name} demo`} />
              ) : media.demo ? (
                <video
                  key={media.demo}
                  src={media.demo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="h-full w-full object-cover"
                />
              ) : media.shots.length > 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={media.shots[shot]}
                  alt={`${project.name} screenshot ${shot + 1}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                // no media yet — show the project's illustrated art
                <div
                  className="flex h-full w-full flex-col items-center justify-center"
                  style={{ color: theme.ink, "--foreground": theme.ink, "--accent": theme.accent } as CSSProperties}
                >
                  {Motif ? (
                    <div className="flex h-[55%] w-full items-center justify-center [&>svg]:!h-full [&>svg]:!w-auto">
                      <Motif />
                    </div>
                  ) : (
                    <span className="font-poster text-[90px] font-black opacity-20">{project.number}</span>
                  )}
                  <p className="font-hand mt-3 -rotate-2 text-[24px] opacity-80">demo coming soon</p>
                </div>
              )}
            </div>

            {/* thumbnails (when there are screenshots and no demo, or alongside it) */}
            {media.shots.length > (media.demo || project.youtube ? 0 : 1) && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {media.shots.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setShot(i)}
                    aria-label={`Show screenshot ${i + 1}`}
                    className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                      !media.demo && shot === i ? "border-[#111]" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ---- details ---- */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2 pr-12">
              {project.status && (
                <span
                  className="rounded-full border-2 border-[#111] px-3 py-0.5 text-[12.5px] font-bold"
                  style={{ backgroundColor: STATUS_COLOR[project.status] }}
                >
                  {project.status}
                </span>
              )}
              <span className="font-mono-label text-[11px] uppercase text-black/55">
                {project.category} · {project.year}
              </span>
            </div>

            <h2
              id="project-panel-title"
              className="font-poster mt-3 text-[40px] font-black leading-[0.95] tracking-[-0.04em] sm:text-[52px]"
            >
              {project.name}
            </h2>

            <p className="mt-4 text-[17px] font-medium leading-snug">{project.pitch ?? project.description}</p>

            {project.highlights && project.highlights.length > 0 && (
              <div className="mt-6">
                <p className="font-hand text-[24px] leading-none text-[#6B5BA8]">what I built</p>
                <ul className="mt-3 space-y-2.5">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[15px] leading-snug">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[#111]"
                        style={{ backgroundColor: theme.frame }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.role && (
              <p className="mt-6 text-[14.5px] leading-snug">
                <span className="font-mono-label mr-2 text-[11px] uppercase text-black/55">Role</span>
                {project.role}
              </p>
            )}

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <li key={t} className="rounded-full border-2 border-[#111] bg-white px-3 py-0.5 text-[13px] font-semibold">
                  {t}
                </li>
              ))}
            </ul>

            {hasLinks && (
              <div className="mt-7 flex flex-wrap gap-3">
                {links.live && (
                  <a
                    href={links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-stretch overflow-hidden rounded-lg text-[15px] font-semibold text-[#111] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <span className="bg-[#F0A33E] px-5 py-3">Visit live</span>
                    <span className="flex items-center border-l border-black/10 bg-[#F0A33E] px-3">
                      <ArrowUpRight size={17} strokeWidth={2.5} />
                    </span>
                  </a>
                )}
                {links.github && (
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-stretch overflow-hidden rounded-lg border-[2.5px] border-[#111] text-[15px] font-semibold transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <span className="bg-white px-5 py-[9.5px]">GitHub</span>
                    <span className="flex items-center border-l-[2.5px] border-[#111] bg-white px-3">
                      <ArrowUpRight size={17} strokeWidth={2.5} />
                    </span>
                  </a>
                )}
              </div>
            )}

            {/* prev / next */}
            <div className="mt-auto flex items-center justify-between gap-3 pt-8">
              <button
                type="button"
                onClick={onPrev}
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#111] bg-white px-4 py-2 text-[14px] font-semibold transition-transform hover:-translate-x-0.5"
              >
                <ArrowLeft size={16} strokeWidth={2.5} /> Prev
              </button>
              <button
                type="button"
                onClick={onNext}
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#111] bg-[#111] px-4 py-2 text-[14px] font-semibold text-white transition-transform hover:translate-x-0.5"
              >
                Next <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
