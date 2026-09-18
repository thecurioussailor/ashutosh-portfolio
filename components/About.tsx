import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

const principles = [
  { step: "Idea", detail: "Start with the real problem, not the stack." },
  { step: "Architecture", detail: "Decide what has to be true before writing code." },
  { step: "Implementation", detail: "Build the smallest thing that proves it." },
  { step: "Deployment", detail: "Ship it where it has to survive real usage." },
  { step: "Iteration", detail: "Watch what breaks, then fix the actual thing." },
];

export default function About() {
  return (
    <section id="about" className="relative px-3 pt-3 pb-3 sm:px-5 sm:pt-5 sm:pb-5 lg:px-6 lg:pt-6 lg:pb-6">
      <div className="relative overflow-hidden rounded-[36px] bg-[#161616]  px-6 py-16 sm:rounded-[60px] sm:px-10 sm:py-20 lg:rounded-[90px] lg:px-16 lg:py-24 xl:rounded-[120px]">
        <header>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[15vw] leading-[0.92] tracking-[-0.01em] text-foreground sm:text-[9vw] lg:text-[6vw]">
              <TextReveal text="About" />
            </h2>
          </Reveal>
        </header>

        <Reveal delay={0.15} className="mt-16 pt-14 sm:mt-20 sm:pt-16">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
            {/* introduction */}
            <div className="lg:col-span-7">
              <p className="max-w-xl text-[7vw] leading-[1.15] font-medium tracking-[-0.01em] text-foreground sm:text-[3.6vw] lg:text-[1.9vw]">
                I build products, systems, and infrastructure from first
                principles.
              </p>

              <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-muted sm:text-base">
                I like taking an idea apart until only the real constraints
                are left, then building back up — from a rough architecture
                to something deployed and used. Most of what interests me
                sits at the intersection of products, the systems underneath
                them, and the infrastructure that keeps both honest.
              </p>
            </div>

            {/* how I work */}
            <div className="lg:col-span-5">
              <p className="font-mono-label text-[11px] tracking-[0.14em] uppercase text-muted-dim">
                How I Work
              </p>

              <ol className="mt-6 border-t border-border">
                {principles.map((item, i) => (
                  <Reveal key={item.step} delay={0.2 + i * 0.05}>
                    <li className="group flex items-baseline gap-4 border-b border-border py-4 transition-colors duration-300 sm:gap-6 sm:py-5">
                      <span className="font-mono-label w-6 shrink-0 text-[11px] text-muted-dim transition-transform duration-300 group-hover:translate-x-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="w-28 shrink-0 font-mono-label text-[11px] tracking-[0.08em] uppercase text-foreground/85 transition-colors duration-300 group-hover:text-foreground sm:w-32">
                        {item.step}
                      </span>
                      <span className="text-[13px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground/85 sm:text-sm">
                        {item.detail}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
