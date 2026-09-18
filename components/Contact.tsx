import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

const links = [
  { label: "Email", href: "mailto:hello@ashutoshsagar.dev" },
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "X", href: "https://x.com/" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="flex flex-col justify-between gap-16 px-6 py-28 sm:px-10 sm:py-40"
    >
      <div>
        <Reveal>
          <p className="font-mono-label mb-6 text-[11px] tracking-[0.14em] uppercase text-accent sm:mb-8">
            Contact
          </p>
        </Reveal>

        <h2 className="text-[15vw] sm:text-[10vw] lg:text-[7.5vw] font-medium leading-[0.88] tracking-[-0.03em] text-foreground">
          <TextReveal text="Let's build" />
          <br />
          <TextReveal text="something." delay={0.12} />
        </h2>

        <Reveal delay={0.25}>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted sm:mt-10 sm:text-base">
            Have an interesting problem, product or idea?
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <ul className="flex flex-wrap gap-x-8 gap-y-4 border-t border-border pt-8 sm:gap-x-12">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group inline-flex items-center gap-1.5 font-mono-label text-[12px] tracking-[0.1em] uppercase text-muted transition-colors duration-300 hover:text-foreground"
              >
                {link.label}
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
