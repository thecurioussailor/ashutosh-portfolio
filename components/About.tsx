import Image from "next/image";
import type { CSSProperties } from "react";
import { aboutPills } from "@/data/about";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#fffdf6] px-6 py-24 text-[#111] sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-10">
        {/* intro */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-hand -rotate-[5deg] text-[28px] leading-none text-[#6B5BA8] sm:text-[32px]">
              the short version
            </p>
            <h2 className="font-poster mt-4 text-[15vw] font-black leading-[0.95] tracking-[-0.05em] sm:text-[10vw] lg:text-[5.6vw]">
              Why me?
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-[20px] font-semibold leading-snug tracking-[-0.01em] sm:text-[24px]">
              I build products, systems, and infrastructure from first principles.
            </p>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-[#444]">
              I like taking an idea apart until only the real constraints are left, then building
              back up, from a rough architecture to something deployed and used. Most of what
              interests me sits where products, the systems underneath them, and the
              infrastructure that keeps both honest meet.
            </p>
            <a
              href="#contact"
              className="group mt-8 inline-flex items-stretch overflow-hidden rounded-lg text-[16px] font-semibold text-[#111] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="bg-[#F7D35E] px-5 py-3">Say hi</span>
              <span className="flex items-center border-l border-black/10 bg-[#F7D35E] px-4 transition-colors duration-300 group-hover:bg-[#F0C53A]">
                →
              </span>
            </a>
          </Reveal>
        </div>

        {/* photo + orbiting pills */}
        <Reveal delay={0.15} className="lg:col-span-7">
          <div className="relative mx-auto w-full max-w-[600px] lg:aspect-square">
            {/* dashed spokes (desktop) */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            >
              {aboutPills.map((p) => (
                <line
                  key={p.label}
                  x1="50"
                  y1="50"
                  x2={p.x}
                  y2={p.y}
                  stroke="#111"
                  strokeWidth="0.35"
                  strokeDasharray="1.4 1.4"
                  opacity="0.45"
                />
              ))}
            </svg>

            {/* photo */}
            <div className="relative mx-auto aspect-square w-[62%] max-w-[300px] lg:absolute lg:left-1/2 lg:top-1/2 lg:w-[46%] lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2">
              <div className="absolute inset-0 rotate-[6deg] rounded-full bg-[#F8D6F4]" />
              <div className="relative h-full w-full overflow-hidden rounded-full border-[6px] border-[#111]">
                <Image
                  src="/images/x-dp.png"
                  alt="Ashutosh Sagar"
                  fill
                  sizes="(min-width: 1024px) 280px, 60vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* pills: wrapped list on mobile, orbit on desktop */}
            <ul className="mt-10 flex flex-wrap justify-center gap-3 lg:mt-0 lg:block">
              {aboutPills.map((p, i) => (
                <li
                  key={p.label}
                  className="about-pill lg:absolute"
                  style={
                    {
                      "--x": `${p.x}%`,
                      "--y": `${p.y}%`,
                      "--rot": `${p.rotate}deg`,
                      "--delay": `${i * -1.1}s`,
                    } as CSSProperties
                  }
                >
                  <span
                    className="inline-block whitespace-nowrap rounded-full border-[2.5px] border-[#111] px-5 py-2.5 text-[15px] font-bold shadow-[3px_3px_0_#111] transition-transform duration-300 hover:scale-110 sm:text-[17px]"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
