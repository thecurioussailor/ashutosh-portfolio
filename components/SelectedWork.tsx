import { projects } from "@/data/projects";
import ProjectShowcaseCard from "./ProjectShowcaseCard";
import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

const featured = projects.filter((p) => p.featured);

export default function SelectedWork() {
  return (
    <section id="work" className="px-6 pt-28 pb-28 sm:px-10 sm:pt-36 sm:pb-36">
      <Reveal>
        <h2 className="font-display mt-4 max-w-3xl text-[13vw] leading-[0.92] tracking-[-0.01em] text-foreground sm:text-[8vw] lg:text-[5vw]">
          <TextReveal text="Selected Work" />
        </h2>

        <p className="mt-5 max-w-md text-[14px] leading-relaxed text-muted sm:text-[15px]">
          A selection of products, infrastructure, and experiments I&rsquo;ve
          built.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
        {featured.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <ProjectShowcaseCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
