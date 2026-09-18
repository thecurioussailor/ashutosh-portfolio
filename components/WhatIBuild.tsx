"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { whatIBuild } from "@/data/buildlog";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function WhatIBuild() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="px-6 py-28 sm:px-10 sm:py-40">
      <SectionHeading eyebrow="How I Think" title="What I build." />

      <div className="mt-14 border-t border-border sm:mt-20">
        {whatIBuild.map((item, i) => {
          const isActive = active === i;
          const isDimmed = active !== null && active !== i;

          return (
            <Reveal key={item.number} delay={i * 0.05}>
              <div
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="group relative flex cursor-default flex-col gap-2 border-b border-border py-8 transition-opacity duration-500 sm:flex-row sm:items-center sm:gap-10 sm:py-10"
                style={{ opacity: isDimmed ? 0.35 : 1 }}
              >
                <span className="font-mono-label w-10 shrink-0 text-[11px] text-muted-dim">
                  {item.number}
                </span>

                <h3 className="text-[10vw] sm:text-[5.5vw] lg:text-[3.6vw] font-medium leading-none tracking-[-0.02em] text-foreground sm:w-[40%]">
                  <motion.span
                    animate={{ x: isActive ? 12 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {item.label}
                  </motion.span>
                </h3>

                <p className="max-w-sm text-[14px] leading-relaxed text-muted sm:ml-auto sm:text-[15px]">
                  {item.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
