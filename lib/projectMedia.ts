import fs from "node:fs";
import path from "node:path";

export type ProjectMedia = {
  /** short silent loop for the card hover */
  preview?: string;
  /** longer demo for the project panel */
  demo?: string;
  /** screenshots for the project panel */
  shots: string[];
};

const VIDEO = [".mp4", ".webm"];
const IMAGE = [".jpg", ".jpeg", ".png", ".webp"];

/** Reads public/projects/<slug>/ at build/render time and returns whatever media is there. */
export function getProjectMedia(slug: string): ProjectMedia {
  const dir = path.join(process.cwd(), "public", "projects", slug);
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return { shots: [] };
  }
  const url = (f: string) => `/projects/${slug}/${f}`;
  const find = (base: string) =>
    files.find((f) => VIDEO.includes(path.extname(f).toLowerCase()) && path.parse(f).name === base);

  const preview = find("preview");
  const demo = find("demo");
  const shots = files
    .filter((f) => f.startsWith("shot") && IMAGE.includes(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return {
    preview: preview ? url(preview) : undefined,
    demo: demo ? url(demo) : undefined,
    shots: shots.map(url),
  };
}
