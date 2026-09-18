import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getAdjacentProject, getProject, projects, Project } from "@/data/projects";
import { getProjectCoverSrc } from "@/lib/images";
import ProjectPlaceholder from "@/components/ProjectPlaceholder";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Ashutosh Sagar`,
    description: project.description,
  };
}

const caseStudySections: {
  key: keyof Project["caseStudy"];
  label: string;
}[] = [
  { key: "overview", label: "Overview" },
  { key: "problem", label: "Problem" },
  { key: "approach", label: "Approach" },
  { key: "architecture", label: "Architecture" },
  { key: "implementation", label: "Implementation" },
  { key: "result", label: "Result" },
];

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getAdjacentProject(slug);
  const imageSrc = getProjectCoverSrc(project.image);

  return (
    <article>
      <div className="px-6 pt-24 sm:px-10 sm:pt-28">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 font-mono-label text-[11px] tracking-[0.1em] uppercase text-muted transition-colors duration-300 hover:text-foreground"
        >
          <ArrowLeft
            size={13}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          All Work
        </Link>

        <div className="mt-10 flex items-baseline justify-between gap-4 sm:mt-14">
          <span className="font-mono-label text-[11px] tracking-[0.12em] text-muted-dim">
            {project.number}
          </span>
          <span className="font-mono-label text-[11px] tracking-[0.12em] text-muted-dim">
            {project.year}
          </span>
        </div>

        <h1 className="mt-4 text-[13vw] sm:text-[8vw] lg:text-[6vw] font-medium leading-[0.9] tracking-[-0.03em] text-foreground">
          <TextReveal text={project.name} />
        </h1>

        <p className="font-mono-label mt-4 text-[11px] tracking-[0.1em] uppercase text-accent">
          {project.category}
        </p>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/85 sm:text-xl">
            {project.description}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap gap-x-2 gap-y-2 sm:mt-10">
            {project.technologies.map((tech, i) => (
              <span key={tech} className="flex items-center gap-2">
                <span className="font-mono-label text-[11px] tracking-[0.08em] uppercase text-muted">
                  {tech}
                </span>
                {i < project.technologies.length - 1 && (
                  <span className="h-1 w-1 rounded-full bg-border-strong" />
                )}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="relative mt-16 aspect-[16/10] w-full overflow-hidden border-y border-border sm:mt-24 sm:aspect-[21/9]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={`${project.name} — hero visual`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <ProjectPlaceholder label={project.name} number={project.number} />
          )}
        </div>
      </Reveal>

      <div className="px-6 py-20 sm:px-10 sm:py-28">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-12">
          {caseStudySections.map((section, i) => (
            <Reveal
              key={section.key}
              delay={i * 0.03}
              className="lg:col-span-12"
            >
              <div className="grid grid-cols-1 gap-4 border-t border-border pt-8 lg:grid-cols-12 lg:gap-8">
                <h2 className="font-mono-label text-[11px] tracking-[0.12em] uppercase text-muted-dim lg:col-span-3">
                  {section.label}
                </h2>
                <p className="max-w-2xl text-[15px] leading-relaxed text-foreground/85 lg:col-span-8 sm:text-base">
                  {project.caseStudy[section.key]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {project.links && project.links.length > 0 && (
          <Reveal className="mt-16">
            <div className="border-t border-border pt-8">
              <h2 className="font-mono-label text-[11px] tracking-[0.12em] uppercase text-muted-dim">
                Links
              </h2>
              <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-[15px] text-foreground/85 transition-colors duration-300 hover:text-accent"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>

      <Link
        href={`/work/${next.slug}`}
        className="group block border-t border-border px-6 py-16 sm:px-10 sm:py-24"
      >
        <p className="font-mono-label text-[11px] tracking-[0.12em] uppercase text-muted-dim">
          Next Project
        </p>
        <div className="mt-4 flex items-center justify-between gap-6">
          <h2 className="text-[11vw] sm:text-[6vw] lg:text-[4.5vw] font-medium leading-[0.95] tracking-[-0.02em] text-foreground transition-transform duration-500 ease-out group-hover:translate-x-2">
            {next.name}
          </h2>
          <ArrowUpRight
            size={32}
            strokeWidth={1.25}
            className="shrink-0 text-muted transition-all duration-400 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
          />
        </div>
      </Link>
    </article>
  );
}
