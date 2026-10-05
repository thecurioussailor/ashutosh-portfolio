import { projects } from "@/data/projects";
import ProjectCarousel from "./ProjectCarousel";
import Reveal from "./Reveal";

export default function SelectedWork() {
  return (
    <section
      id="work"
      className="relative overflow-hidden bg-[#fffdf6] pt-24 pb-10 text-[#111] sm:pt-36"
    >
      <div className="relative px-6 sm:px-10">
        {/* handwritten side note */}
        <p className="font-hand mx-auto mb-6 w-fit -rotate-[8deg] text-center text-[26px] leading-[1.05] text-[#6B5BA8] lg:absolute lg:left-[3%] lg:-top-16 lg:mb-0 lg:text-[30px]">
          wallets, exchanges
          <br />
          &amp; agent tools I
          <br />
          can&rsquo;t stop building
        </p>

        <Reveal className="text-center">
          <h2 className="font-poster text-[14vw] font-black leading-[0.95] tracking-[-0.05em] sm:text-[10vw] lg:text-[7vw]">
            Stuff I&rsquo;ve built
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[17px] font-medium leading-snug tracking-[-0.01em] sm:mt-8 sm:text-[22px]">
            Products, infrastructure and experiments.
            <br />
            Pick a cover to read the full story.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-14 sm:mt-20" delay={0.1}>
        <ProjectCarousel projects={projects} />
      </Reveal>
    </section>
  );
}
