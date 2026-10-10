"use client";

import { useEffect, useRef } from "react";

/** Silent looping clip that fades in over a project cover while `playing` is true. */
export default function PreviewVideo({ src, playing }: { src: string; playing: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (playing) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [playing]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className={`absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-500 ${
        playing ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
