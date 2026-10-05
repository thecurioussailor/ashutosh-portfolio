"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { ArrowUp } from "lucide-react";
import { site } from "@/data/site";

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

const ICONS: Record<"github" | "linkedin" | "x", string> = {
  github:
    "M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z",
  linkedin:
    "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
  x: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41Z",
};

const pill =
  "inline-block rounded-full bg-[#F7EBA0] px-4 py-2 text-[15px] font-semibold text-[#111] transition-transform duration-300 hover:-translate-y-0.5";

/** Avatar that pops the social icons out in an arc on hover (tap on touch screens). */
function SocialAvatar() {
  const [open, setOpen] = useState(false);
  const n = site.socials.length;

  return (
    <div
      className="group/social relative shrink-0 p-2"
      data-open={open || undefined}
      onMouseLeave={() => setOpen(false)}
    >
      {site.socials.map((l, i) => {
        // spread icons evenly over an arc above the photo
        const angle = n === 1 ? -90 : -150 + (120 / (n - 1)) * i;
        const rad = (angle * Math.PI) / 180;
        const r = 68;
        return (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.label}
            title={l.label}
            style={
              {
                "--dx": `${Math.cos(rad) * r}px`,
                "--dy": `${Math.sin(rad) * r}px`,
                transitionDelay: `${i * 60}ms`,
              } as CSSProperties
            }
            className="social-pop absolute left-1/2 top-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#111] bg-[#F7EBA0] text-[#111] shadow-[2px_2px_0_#111] hover:bg-white"
          >
            <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="currentColor" aria-hidden="true">
              <path d={ICONS[l.icon]} />
            </svg>
          </a>
        );
      })}

      <button
        type="button"
        aria-label="Show social links"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-20 block h-14 w-14 overflow-hidden rounded-full ring-2 ring-[#F7EBA0] transition-transform duration-300 group-hover/social:scale-105 group-hover/social:-rotate-6 group-data-[open]/social:scale-105"
      >
        <Image src="/images/x-dp.png" alt={site.name} fill sizes="56px" className="object-cover" />
      </button>
    </div>
  );
}

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
            <SocialAvatar />
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
