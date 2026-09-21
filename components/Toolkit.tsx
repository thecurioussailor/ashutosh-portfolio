"use client";

import { useEffect, useRef } from "react";
import { toolkitRows } from "@/data/toolkit";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ToolkitRow from "./ToolkitRow";

export default function Toolkit() {
  const trackAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackAreaRef.current;
    if (!el) return;

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarsePointer) return;

    let lastX = 0;
    let hasLast = false;
    let speed = 1;
    let targetBoost = 0;
    let rafId = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        hasLast = false;
        return;
      }
      if (hasLast) {
        const dx = Math.abs(e.clientX - lastX);
        targetBoost = Math.min(dx * 0.02, 0.6);
      }
      lastX = e.clientX;
      hasLast = true;
    };

    const onPointerLeave = () => {
      hasLast = false;
      targetBoost = 0;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    el.addEventListener("pointerleave", onPointerLeave);

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      speed += (1 + targetBoost - speed) * 0.06;
      targetBoost *= 0.92;
      el.style.setProperty("--toolkit-speed", speed.toFixed(3));
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <section className="py-28 sm:py-40">
      <div className="px-6 sm:px-10">
        <SectionHeading eyebrow="What I Know" title="Current toolkit." />
      </div>

      <div
        ref={trackAreaRef}
        className="mt-14 flex flex-col gap-8 sm:mt-20 sm:gap-10"
      >
        {toolkitRows.map((row, i) => (
          <Reveal key={row.label} delay={i * 0.08}>
            <div>
              <p className="font-mono-label mb-3 px-6 text-[10.5px] tracking-[0.12em] uppercase text-muted-dim sm:px-10">
                {row.label}
              </p>
              <ToolkitRow {...row} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
