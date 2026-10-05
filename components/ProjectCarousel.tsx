"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, PointerEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import ProjectCover from "./ProjectCover";

// hand-placed feel: each card gets its own tilt + vertical nudge
const TILTS = [
  { r: -3, y: 18 },
  { r: 2, y: 0 },
  { r: -1, y: 8 },
  { r: 2.5, y: 36 },
  { r: -2, y: -6 },
  { r: 1.5, y: 20 },
];

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // click-and-drag scrolling for mouse users (touch already scrolls natively)
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || e.pointerType !== "mouse") return;
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
    el.style.scrollSnapType = "none";
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    drag.current.down = false;
    el.style.scrollSnapType = "";
  };
  const onClickCapture = (e: MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const arrowBase =
    "flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 sm:h-16 sm:w-16";

  return (
    <div>
      <div className="flex justify-end gap-3 px-6 sm:px-10">
        <button
          type="button"
          aria-label="Previous projects"
          onClick={() => scrollByCard(-1)}
          disabled={!canPrev}
          className={`${arrowBase} ${
            canPrev
              ? "bg-[#111] text-white hover:scale-105"
              : "cursor-not-allowed bg-[#d4d4d4] text-white"
          }`}
        >
          <ArrowLeft size={22} strokeWidth={2.25} />
        </button>
        <button
          type="button"
          aria-label="Next projects"
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
          className={`${arrowBase} ${
            canNext
              ? "bg-[#111] text-white hover:scale-105"
              : "cursor-not-allowed bg-[#d4d4d4] text-white"
          }`}
        >
          <ArrowRight size={22} strokeWidth={2.25} />
        </button>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-6 px-6 pt-10 pb-16 select-none sm:mt-10 sm:gap-10 sm:scroll-px-10 sm:px-10 lg:cursor-grab lg:active:cursor-grabbing"
      >
        {projects.map((project, i) => {
          const tilt = TILTS[i % TILTS.length];
          return (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              data-card
              draggable={false}
              className="tilt-card group w-[76vw] shrink-0 snap-start outline-none sm:w-[330px] lg:w-[350px]"
              style={{ "--r": `${tilt.r}deg`, "--y": `${tilt.y}px` } as CSSProperties}
            >
              <ProjectCover project={project} />

              <div className="mt-5 px-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="font-poster text-[20px] font-bold tracking-[-0.02em] text-[#111]">
                    {project.name}
                  </h4>
                  <span className="font-mono-label text-[11px] text-[#777]">
                    {project.year}
                  </span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-[14px] leading-snug text-[#555]">
                  {project.description}
                </p>
                <p className="font-mono-label mt-3 text-[10.5px] uppercase text-[#888]">
                  {project.technologies.join("  ·  ")}
                </p>
              </div>
            </Link>
          );
        })}
        {/* trailing spacer so the last card can snap fully into view */}
        <div aria-hidden className="w-px shrink-0" />
      </div>
    </div>
  );
}
