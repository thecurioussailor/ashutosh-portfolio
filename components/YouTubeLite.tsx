"use client";

import { useState } from "react";

/** Accepts a full YouTube URL (watch, youtu.be, shorts, embed) or a bare video id. */
export function getYouTubeId(input: string): string | null {
  const s = input.trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  try {
    const u = new URL(s);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1, 12) || null;
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const m = u.pathname.match(/\/(embed|shorts|live)\/([\w-]{11})/);
    return m ? m[2] : null;
  } catch {
    return null;
  }
}

/*
 * "Lite" YouTube embed: shows the video's thumbnail + a play button, and only
 * loads YouTube's (heavy) player once someone clicks play.
 */
export default function YouTubeLite({ url, title }: { url: string; title: string }) {
  const id = getYouTubeId(url);
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : "");

  if (!id) return null;

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
      className="group/yt absolute inset-0 h-full w-full"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumb}
        alt=""
        loading="lazy"
        // maxres thumbnails don't exist for every video — fall back to the always-available one
        onLoad={(e) => {
          if (e.currentTarget.naturalWidth <= 120) setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
        }}
        onError={() => setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover/yt:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-black/15 transition-colors duration-300 group-hover/yt:bg-black/5" />
      <span className="absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[#111] bg-[#F0A33E] shadow-[4px_4px_0_#111] transition-transform duration-300 group-hover/yt:scale-110">
        <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" fill="#111" aria-hidden="true">
          <path d="M7 4.5v15l12-7.5z" />
        </svg>
      </span>
      <span className="font-hand absolute bottom-3 left-4 -rotate-2 text-[22px] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.6)]">
        watch the demo
      </span>
    </button>
  );
}
