"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUp, ArrowUpRight, Check } from "lucide-react";
import { site } from "@/data/site";
import Reveal from "./Reveal";

const explore = [
  { label: "Work", href: "#work" },
  { label: "How I work", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
];

function useLocalTime(timeZone: string) {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

export default function Footer() {
  const time = useLocalTime(site.timeZone);
  const [copied, setCopied] = useState(false);
  const year = new Date().getFullYear();

  // open the mail app and copy the address — many people have no mail client set up
  const onEmail = () => {
    navigator.clipboard?.writeText(site.email).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      },
      () => {},
    );
  };

  const pill =
    "rounded-full bg-[#F7EBA0] px-4 py-2 text-[15px] font-semibold text-[#111] transition-transform duration-300 hover:-translate-y-0.5 inline-block";

  return (
    <footer id="contact" className="relative bg-[var(--background)]">
      <div className="relative overflow-hidden rounded-t-[36px] bg-[#3B308F] px-6 pt-20 pb-8 text-white sm:rounded-t-[60px] sm:px-10 sm:pt-28 lg:rounded-t-[90px] lg:px-16 xl:rounded-t-[120px]">
        {/* 1 — the invite */}
        <div className="mx-auto max-w-6xl text-center">
          <Reveal>
            <p className="font-hand -rotate-[4deg] text-[28px] leading-none text-[#F7EBA0] sm:text-[34px]">
              got something in mind?
            </p>
            <h2 className="font-poster mt-5 text-[14vw] font-black leading-[0.92] tracking-[-0.05em] sm:text-[10vw] lg:text-[7.5vw]">
              Let&rsquo;s build
              <br />
              something.
            </h2>
          </Reveal>

          {site.availability && (
            <Reveal delay={0.05}>
              <p className="font-hand mt-8 inline-flex rotate-[2deg] items-end gap-2 text-[26px] leading-none text-[#F8A5E6] sm:text-[30px]">
                {site.availability.toLowerCase()}
                {/* little hand-drawn arrow pointing at the buttons */}
                <svg aria-hidden="true" viewBox="0 0 40 40" className="h-8 w-8 translate-y-3">
                  <path
                    d="M4 6 C 18 4, 30 12, 28 30 M20 24 L28 32 L34 22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </p>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${site.email}`}
                onClick={onEmail}
                className="group inline-flex items-stretch overflow-hidden rounded-lg text-[17px] font-semibold text-[#111] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="bg-[#F0A33E] px-6 py-4">{copied ? "Email copied!" : "Email me"}</span>
                <span className="flex items-center border-l border-black/10 bg-[#F0A33E] px-4 transition-colors duration-300 group-hover:bg-[#EA9426]">
                  {copied ? (
                    <Check size={18} strokeWidth={2.75} />
                  ) : (
                    <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  )}
                </span>
              </a>

              {site.bookingUrl && (
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-stretch overflow-hidden rounded-lg text-[17px] font-semibold text-[#111] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="bg-[#F7EBA0] px-6 py-4">Book a call</span>
                  <span className="flex items-center border-l border-black/10 bg-[#F7EBA0] px-4 transition-colors duration-300 group-hover:bg-[#F3E07A]">
                    <ArrowUpRight size={18} strokeWidth={2.5} />
                  </span>
                </a>
              )}
            </div>
            <p className="font-mono-label mt-4 text-[12px] text-white/50">{site.email}</p>
          </Reveal>
        </div>

        {/* 2 — compact sign-off row */}
        <div className="mx-auto mt-20 flex max-w-6xl flex-col items-center gap-8 border-t border-white/15 pt-10 lg:flex-row lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#F7EBA0]">
              <Image src="/images/x-dp.png" alt={site.name} fill sizes="48px" className="object-cover" />
            </div>
            <div className="leading-tight">
              <p className="font-poster text-[17px] font-bold">{site.name}</p>
              <p className="text-[13px] text-white/60">Software Engineer</p>
            </div>
          </div>

          <ul className="flex flex-wrap justify-center gap-2">
            {explore.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={pill}>
                  {l.label}
                </a>
              </li>
            ))}
            {site.socials.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className={`${pill} inline-flex items-center gap-1`}>
                  {l.label}
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </a>
              </li>
            ))}
          </ul>

          <p className="font-hand -rotate-[3deg] text-[24px] leading-none text-[#F7EBA0]" suppressHydrationWarning>
            it&rsquo;s {time ?? "…"} here in {site.city}
          </p>
        </div>

        {/* 3 — signature: SVG text stretches to fit the width exactly, so it never clips */}
        <div className="mx-auto mt-14 max-w-7xl">
          <svg aria-hidden="true" viewBox="0 0 1000 190" className="block w-full select-none">
            <text
              x="500"
              y="160"
              textAnchor="middle"
              textLength="990"
              lengthAdjust="spacingAndGlyphs"
              className="font-poster"
              fontSize="190"
              fontWeight="900"
              letterSpacing="-8"
              fill="rgba(255,255,255,0.1)"
            >
              Ashutosh
            </text>
          </svg>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-mono-label text-[11px] text-white/45">
              © {year} {site.name}. All rights reserved.
            </p>
            <a
              href="#home"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[14px] font-semibold ring-1 ring-white/20 transition-colors duration-300 hover:bg-white/20"
            >
              Back to top <ArrowUp size={15} strokeWidth={2.25} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
