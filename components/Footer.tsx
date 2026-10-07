"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { site } from "@/data/site";
import SocialAvatar from "./SocialAvatar";

const explore = [
  { label: "Work", href: "#work" },
  { label: "How I work", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
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


const pill =
  "inline-block rounded-full bg-[#F7EBA0] px-4 py-2 text-[15px] font-semibold text-[#111] transition-transform duration-300 hover:-translate-y-0.5";

export default function Footer() {
  const time = useLocalTime(site.timeZone);
  const year = new Date().getFullYear();

  return (
    // cream behind the curved top so it blends into the Contact section
    <footer className="relative bg-[#fffdf6]">
      <div className="relative overflow-hidden rounded-t-[36px] bg-[#3B308F] px-6 pt-14 pb-8 text-white sm:rounded-t-[60px] sm:px-10 sm:pt-20 lg:rounded-t-[90px] lg:px-16 xl:rounded-t-[120px]">
        {/* sign-off row */}
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <div className="flex items-center gap-3">
            {/* hint, with a hand-drawn arrow pointing at the photo */}
            <p className="font-hand flex -rotate-[6deg] items-center gap-1 text-[21px] leading-none text-[#F8A5E6]">
              <span className="hidden [@media(hover:hover)]:inline">hover me</span>
              <span className="[@media(hover:hover)]:hidden">tap me</span>
              <svg aria-hidden="true" viewBox="0 0 40 24" className="h-5 w-8">
                <path
                  d="M2 6 C 12 2, 26 4, 34 14 M26 15 L34 15 L33 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
            <SocialAvatar direction="up" />
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
          </ul>

          <p className="font-hand -rotate-[3deg] text-[24px] leading-none text-[#F7EBA0]" suppressHydrationWarning>
            it&rsquo;s {time ?? "…"} here in {site.city}
          </p>
        </div>

        {/* signature — SVG text stretches to fit the width exactly, so it never clips */}
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
