"use client";

import { useReducedMotion } from "motion/react";
import { ToolkitRow as ToolkitRowData } from "@/data/toolkit";
import ToolkitCard from "./ToolkitCard";

export default function ToolkitRow({ items, direction, duration }: ToolkitRowData) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="flex flex-wrap gap-3 px-6 sm:px-10">
        {items.map((item) => (
          <ToolkitCard key={item} name={item} />
        ))}
      </div>
    );
  }

  const track = [...items, ...items];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex w-max items-center gap-3"
        style={
          {
            "--toolkit-base": `${duration}s`,
            animationName: "toolkit-marquee",
            animationDuration: "calc(var(--toolkit-base) / var(--toolkit-speed, 1))",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDirection: direction === "right" ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {track.map((item, i) => (
          <ToolkitCard key={`${item}-${i}`} name={item} />
        ))}
      </div>
    </div>
  );
}
