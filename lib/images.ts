import fs from "node:fs";
import path from "node:path";

const COVER_CANDIDATES = ["cover.jpg", "cover.jpeg", "cover.png", "cover.webp"];

export function getProjectCoverSrc(imageDir: string): string | null {
  const dir = path.join(process.cwd(), "public", imageDir.replace(/^\//, ""));
  for (const file of COVER_CANDIDATES) {
    if (fs.existsSync(path.join(dir, file))) {
      return `${imageDir}/${file}`;
    }
  }
  return null;
}
