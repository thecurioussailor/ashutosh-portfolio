"use client";

import { motion } from "motion/react";
import { experience } from "@/data/experience";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section className="px-6 py-28 sm:px-10 sm:py-40">
      <SectionHeading eyebrow="Experience" title="Where I've built things." />

      <div className="mt-14 border-t border-border sm:mt-20">
        {experience.map((entry, i) => (
          <Reveal key={`${entry.role}-${i}`} delay={i * 0.05}>
            <motion.div
              initial="rest"
              whileHover="hover"
              className="group relative border-b border-border py-7 sm:py-8"
            >
              <motion.div
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute inset-y-0 -left-6 -right-6 -z-10 bg-background-raised sm:-left-10 sm:-right-10"
              />
              <div className="flex flex-col gap-2 sm:grid sm:grid-cols-12 sm:items-baseline sm:gap-6">
                <span className="font-mono-label text-[11px] tracking-[0.1em] text-muted-dim sm:col-span-2">
                  {entry.year}
                </span>

                <div className="sm:col-span-4">
                  <h3 className="text-lg font-medium tracking-[-0.01em] text-foreground sm:text-xl">
                    {entry.role}
                  </h3>
                  <p className="mt-0.5 font-mono-label text-[11px] tracking-[0.06em] text-muted">
                    {entry.org}
                  </p>
                </div>

                <p className="mt-2 text-[13.5px] leading-relaxed text-muted sm:col-span-4 sm:mt-0 sm:text-sm">
                  {entry.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2 sm:col-span-2 sm:mt-0 sm:justify-end">
                  {entry.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono-label text-[10px] tracking-[0.06em] uppercase text-muted-dim"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
