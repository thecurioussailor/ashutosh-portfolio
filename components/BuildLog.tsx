import { ArrowUpRight } from "lucide-react";
import { buildLog } from "@/data/buildlog";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function BuildLog() {
  return (
    <section id="log" className="px-6 py-28 sm:px-10 sm:py-40">
      <SectionHeading eyebrow="Build Log" title="Notes along the way." />

      <div className="mt-14 border-t border-border sm:mt-20">
        {buildLog.map((entry, i) => (
          <Reveal key={entry.title} delay={i * 0.05}>
            <a
              href={entry.href}
              className="group flex items-center justify-between gap-6 border-b border-border py-6 sm:py-7"
            >
              <span className="flex items-baseline gap-4 sm:gap-6">
                <span className="font-mono-label text-[11px] text-muted-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-medium tracking-[-0.01em] text-foreground transition-transform duration-400 ease-out group-hover:translate-x-1.5 sm:text-xl">
                  {entry.title}
                </span>
              </span>

              <span className="flex items-center gap-4 shrink-0">
                <span className="font-mono-label hidden text-[11px] text-muted-dim sm:inline">
                  {entry.date}
                </span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
