import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";
import ProjectVisual from "./ProjectVisual";

export default function ProjectShowcaseCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex flex-col transition-transform duration-500 ease-out hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px]">
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <ProjectVisual slug={project.slug} number={project.number} />
        </div>

        <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 opacity-0 backdrop-blur-sm transition-all duration-400 ease-out group-hover:translate-x-0 group-hover:opacity-100 sm:translate-x-1">
          <ArrowUpRight size={15} strokeWidth={1.5} className="text-foreground" />
        </div>
      </div>

      <div className="mt-6 flex items-baseline justify-between gap-4">
        <span className="font-mono-label text-[11px] tracking-[0.12em] text-muted-dim transition-colors duration-300 group-hover:text-muted">
          {project.number}
        </span>
        <span className="font-mono-label text-[11px] tracking-[0.12em] text-muted-dim transition-colors duration-300 group-hover:text-muted">
          {project.year}
        </span>
      </div>

      <h3 className="font-display mt-2 text-[7vw] leading-none tracking-[-0.01em] text-foreground transition-colors duration-300 group-hover:text-white sm:text-[3.2vw] lg:text-[1.7vw]">
        {project.name}
      </h3>

      <p className="font-mono-label mt-3 text-[10.5px] tracking-[0.1em] uppercase text-muted-dim transition-colors duration-300 group-hover:text-muted">
        {project.category}
      </p>

      <p className="mt-3 max-w-xs text-[13.5px] leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5">
        {project.technologies.map((tech, i) => (
          <span key={tech} className="flex items-center gap-2">
            <span className="font-mono-label text-[10px] tracking-[0.08em] uppercase text-muted-dim">
              {tech}
            </span>
            {i < project.technologies.length - 1 && (
              <span className="h-1 w-1 rounded-full bg-border-strong" />
            )}
          </span>
        ))}
      </div>

      <span className="group/link mt-5 inline-flex items-center gap-1.5 font-mono-label text-[10.5px] tracking-[0.1em] uppercase text-muted transition-colors duration-300 group-hover:text-accent">
        View Project
        <ArrowUpRight
          size={12}
          strokeWidth={1.75}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
