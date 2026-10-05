import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { builtWith, experience } from "@/data/experience";
import Reveal from "./Reveal";

const CARD_COLORS = ["#F7D35E", "#F8A5E6", "#B7A8F0", "#6DE3EA"];
const TILTS = [-1.5, 1.2, -1];

export default function Experience() {
  return (
    // wrapper paints the corner cut-outs: cream above (About) and below (Contact)
    <div className="bg-[#fffdf6]">
      <section
        id="experience"
        className="relative overflow-hidden rounded-[36px] bg-[#C9F1F5] px-6 pt-24 pb-20 text-[#111] sm:rounded-[60px] sm:px-10 sm:pt-32 sm:pb-24 lg:rounded-[90px] lg:px-16 xl:rounded-[120px]"
      >
        {/* header */}
        <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 className="font-poster text-[14vw] font-black leading-[0.95] tracking-[-0.05em] sm:text-[10vw] lg:text-[6vw]">
              Where I&rsquo;ve built
            </h2>
          </Reveal>
          <p className="font-hand -rotate-[4deg] text-[28px] leading-[1.05] text-[#6B5BA8] lg:mb-4 lg:text-right lg:text-[32px]">
            real teams,
            <br />
            real users
          </p>
        </div>

        {/* timeline */}
        <ol className="relative mx-auto mt-16 max-w-6xl sm:mt-20">
          {/* the spine */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[19px] border-l-[3px] border-dashed border-[#111]/40 lg:left-1/2 lg:-translate-x-1/2"
          />

          {experience.map((entry, i) => {
            const left = i % 2 === 0;
            const color = CARD_COLORS[i % CARD_COLORS.length];
            return (
              <li key={entry.company} className="relative pb-14 pl-14 last:pb-0 lg:grid lg:grid-cols-2 lg:gap-24 lg:pl-0">
                {/* node + date badge */}
                <span
                  aria-hidden="true"
                  className="absolute top-6 left-[9px] h-6 w-6 rounded-full border-[3px] border-[#111] bg-[#F0A33E] lg:left-1/2 lg:-translate-x-1/2"
                />
                <div className={`mb-4 lg:mb-0 lg:flex lg:pt-4 ${left ? "lg:order-2 lg:justify-start" : "lg:order-1 lg:justify-end"}`}>
                  <span className="inline-block -rotate-3 rounded-full bg-[#F0A33E] px-4 py-1.5 text-[14px] font-bold text-[#111] shadow-[2px_2px_0_#111]">
                    {entry.dates}
                  </span>
                </div>

                {/* card */}
                <Reveal delay={0.05} className={left ? "lg:order-1" : "lg:order-2"}>
                  <article
                    className="tilt-card group rounded-[28px] border-[2.5px] border-[#111] p-7 shadow-[6px_6px_0_#111] sm:p-8"
                    style={{ backgroundColor: color, "--r": `${TILTS[i % TILTS.length]}deg` } as CSSProperties}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono-label text-[11px] uppercase opacity-70">{entry.role}</p>
                        <h3 className="font-poster mt-2 text-[26px] font-black leading-[1] tracking-[-0.03em] sm:text-[32px]">
                          {entry.company}
                        </h3>
                      </div>
                      {entry.href && (
                        <a
                          href={entry.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${entry.company}`}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#111] text-white transition-transform duration-300 hover:rotate-45"
                        >
                          <ArrowUpRight size={18} strokeWidth={2.25} />
                        </a>
                      )}
                    </div>

                    <p className="mt-4 text-[15.5px] font-medium leading-snug">{entry.description}</p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {entry.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border-2 border-[#111] bg-white/70 px-3 py-0.5 text-[12.5px] font-semibold"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>

        {/* built with / for strip */}
        <Reveal className="mx-auto mt-24 max-w-6xl border-t-[2.5px] border-[#111] pt-8 sm:mt-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
            <p className="font-hand shrink-0 -rotate-[3deg] text-[26px] leading-none text-[#6B5BA8]">
              built with &amp; for
            </p>
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {builtWith.map((name) => (
                <li
                  key={name}
                  className="font-poster text-[18px] font-bold tracking-[-0.02em] text-[#111]/55 transition-colors duration-300 hover:text-[#111] sm:text-[22px]"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
