import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

const explore = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Log", href: "#log" },
];

const connect = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "X", href: "https://x.com/" },
  { label: "Email", href: "mailto:hello@ashutoshsagar.dev" },
];

const year = new Date().getFullYear();

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group inline-block font-display text-[20px] text-foreground/85 transition-all duration-300 hover:translate-x-1 hover:text-foreground sm:text-[22px]"
    >
      {label}
    </a>
  );
}

function SocialLink({ label, href }: { label: string; href: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center gap-2 font-display text-[20px] text-foreground/85 transition-colors duration-300 hover:text-foreground sm:text-[22px]"
    >
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        {label}
      </span>
      <ArrowUpRight
        size={16}
        strokeWidth={1.75}
        className="text-muted opacity-0 transition-all duration-300 -translate-x-1 group-hover:translate-x-0 group-hover:scale-110 group-hover:text-foreground group-hover:opacity-100"
      />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative flex h-svh flex-col bg-black p-3 sm:p-5 lg:p-6">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[36px] bg-[#161616] px-6 py-8 sm:rounded-[60px] sm:px-10 sm:py-10 lg:rounded-[90px] lg:px-16 lg:py-12 xl:rounded-[120px]">
        <div className="grid pt-10 shrink-0 grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {/* intro */}
          <div className="flex flex-col">
            <Reveal>
              <p className="font-display text-[12px] tracking text-white/90 uppercase">
                Stay connected.
              </p>

              <h2 className="font-display mt-3 text-[13vw] leading-[0.9] tracking-[-0.02em] text-foreground sm:text-[7vw] lg:text-[4vw]">
                Ashutosh
              </h2>

              <p className="font-mono-label mt-3 text-[12px] tracking-[0.14em] text-muted uppercase">
                Software Engineer · Builder
              </p>

              <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-[#b7b6bd]">
                I build products, systems, and infrastructure from first
                principles.
              </p>
            </Reveal>
          </div>

          {/* explore */}
          <Reveal delay={0.05}>
            <ul className="mt-6 flex flex-col gap-4">
              {explore.map((link) => (
                <li key={link.href}>
                  <NavLink label={link.label} href={link.href} />
                </li>
              ))}
            </ul>
          </Reveal>

          {/* connect */}
          <Reveal delay={0.1}>
            <ul className="mt-6 flex flex-col gap-4">
              {connect.map((link) => (
                <li key={link.label}>
                  <SocialLink label={link.label} href={link.href} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* large wordmark signature */}
        <div className="mt-10 pt-20 flex shrink-0 flex-col items-center justify-center gap-3 sm:mt-12">
          <TextReveal
            text="Ashutosh"
            className="font-display block text-center text-[13vw] leading-none tracking-[-0.02em] text-white/90 sm:text-[9vw] lg:text-[6.5vw]"
          />

          <Reveal delay={0.15}>
            <p className="font-mono-label text-[10px] tracking-[0.08em] text-muted-dim uppercase">
              © {year} Ashutosh Sagar. All rights reserved.
            </p>
          </Reveal>
        </div>

        {/* empty space, clears the floating nav */}
        <div className="min-h-24 flex-1 sm:min-h-28 lg:min-h-32" />
      </div>
    </footer>
  );
}
