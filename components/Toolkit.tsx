import { toolkit } from "@/data/toolkit";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Toolkit() {
  return (
    <section className="px-6 py-28 sm:px-10 sm:py-40">
      <SectionHeading eyebrow="What I Know" title="Current toolkit." />

      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:mt-20 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-5">
        {toolkit.map((category, i) => (
          <Reveal key={category.label} delay={i * 0.05}>
            <div className="border-t border-border pt-5">
              <h3 className="font-mono-label text-[11px] tracking-[0.12em] uppercase text-accent">
                {category.label}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="text-[15px] leading-snug text-foreground/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
