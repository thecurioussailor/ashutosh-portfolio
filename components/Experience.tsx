"use client";

import { ArrowUpRight } from "lucide-react";
import { experience, currentActivity } from "@/data/experience";
import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

export default function Experience() {
  return (
    <section className="relative px-3 pt-3 pb-3 sm:px-5 sm:pt-5 sm:pb-5 lg:px-6 lg:pt-6 lg:pb-6">
      <div className="relative overflow-hidden rounded-[36px] bg-[#161616] px-6 py-16 sm:rounded-[60px] sm:px-10 sm:py-20 lg:rounded-[90px] lg:px-16 lg:py-24 xl:rounded-[120px]">
        <header>
          <Reveal delay={0.05}>
            <h2 className="font-display mt-4 text-[15vw] leading-[0.92] tracking-[-0.01em] text-foreground sm:text-[9vw] lg:text-[6vw]">
              <TextReveal text="Experience" />
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-mono-label mt-4 text-[11px] tracking-[0.14em] uppercase text-muted-dim">
              Where I&rsquo;ve Built
            </p>
          </Reveal>
        </header>

        <Reveal delay={0.15} className="mt-16 border-t border-border sm:mt-20">
          {experience.map((entry, i) => (
            <Reveal key={entry.company} delay={0.2 + i * 0.06}>
              <div className="group border-b border-border py-10 transition-colors duration-300 group-hover:border-border-strong sm:py-12">
                <div className="transition-transform duration-300 ease-out group-hover:translate-x-[3px]">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono-label text-[11px] text-muted-dim">
                        {entry.number}
                      </span>

                      {entry.href ? (
                        <a
                          href={entry.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display inline-flex items-center gap-2 text-[8vw] leading-none tracking-[-0.01em] text-foreground/90 transition-colors duration-300 hover:text-foreground sm:text-[4vw] lg:text-[2.2vw]"
                        >
                          {entry.company}
                          <ArrowUpRight
                            size={16}
                            strokeWidth={1.75}
                            className="text-muted opacity-0 transition-all duration-300 group-hover:opacity-100"
                          />
                        </a>
                      ) : (
                        <h3 className="font-display text-[8vw] leading-none tracking-[-0.01em] text-foreground/90 sm:text-[4vw] lg:text-[2.2vw]">
                          {entry.company}
                        </h3>
                      )}
                    </div>

                    <span className="font-mono-label shrink-0 text-[11px] tracking-[0.08em] text-muted-dim">
                      {entry.dates}
                    </span>
                  </div>

                  <p className="font-mono-label mt-3 text-[11px] tracking-[0.1em] uppercase text-muted transition-colors duration-300 group-hover:text-foreground/80">
                    {entry.role}
                  </p>

                  <p className="mt-4 max-w-xl text-[13.5px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground/80 sm:text-[14.5px]">
                    {entry.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
                    {entry.technologies.map((tech, techI) => (
                      <span key={tech} className="flex items-center gap-2">
                        <span className="font-mono-label text-[10px] tracking-[0.08em] uppercase text-muted-dim transition-colors duration-300 group-hover:text-muted">
                          {tech}
                        </span>
                        {techI < entry.technologies.length - 1 && (
                          <span className="h-1 w-1 rounded-full bg-border-strong" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </Reveal>

        {/* currently building — independent activity, not employment */}
        <Reveal delay={0.1} className="mt-16 sm:mt-20">
          <p className="font-mono-label text-[11px] tracking-[0.14em] uppercase text-accent">
            Currently Building
          </p>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted">
            Building independently, exploring new systems, and continuing to
            work through technical programs and experiments.
          </p>

          <ul className="mt-8 flex flex-col gap-6 sm:flex-row sm:gap-12">
            {currentActivity.map((item) => (
              <li key={item.label}>
                <p className="font-mono-label text-[11px] tracking-[0.08em] uppercase text-foreground/85">
                  {item.label}
                </p>
                <p className="mt-1 text-[13px] text-muted-dim">{item.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
