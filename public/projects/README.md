# Project media

Each project has a folder here named after its `slug` in `data/projects.ts`.
Drop files in and the site picks them up automatically — no code changes.

| File | What it's for | Tips |
|---|---|---|
| `preview.mp4` / `.webm` | Silent loop that plays on the project card on hover (and when scrolled into view on phones) | 5–8 seconds, 3:4 or square crop, under ~1.5 MB, no audio |
| `demo.mp4` / `.webm` | Longer demo shown in the project panel | 15–30 seconds, 16:10 or 16:9, under ~6 MB |
| `shot-1.png`, `shot-2.webp`, … | Screenshots for the panel (shown if there's no demo, or alongside it) | 1600px wide, `.webp` is smallest |

Compress a screen recording with ffmpeg:

```
ffmpeg -i raw.mov -vf "scale=900:-2,fps=30" -an -c:v libx264 -crf 28 -preset slow -movflags +faststart preview.mp4
```
