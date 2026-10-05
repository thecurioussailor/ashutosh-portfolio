"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import TextReveal from "./TextReveal";

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);

  // 0 -> 1 across the hero's own scroll travel (pinned while the video scrubs).
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Critically-damped spring: smooths raw scroll deltas without overshoot,
  // so the video timeline never jumps or bounces past where the scroll is.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.5,
    restDelta: 0.001,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldReduceMotion) return;

    const handleLoadedMetadata = () => {
      durationRef.current = video.duration || 0;
    };
    if (video.readyState >= 1) handleLoadedMetadata();
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => video.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, [shouldReduceMotion]);

  // Scrub the video's timeline from the smoothed scroll value. This runs on
  // Motion's own rAF-batched update loop, not on every raw scroll/wheel event,
  // and never touches React state, so it can't trigger a re-render.
  useMotionValueEvent(smoothProgress, "change", (progress) => {
    const video = videoRef.current;
    const duration = durationRef.current;
    if (!video || !duration || shouldReduceMotion) return;

    const time = Math.min(Math.max(progress, 0), 1) * duration;
    if (Math.abs(video.currentTime - time) > 0.02) {
      video.currentTime = time;
    }
  });

  const fadeIn = (delay: number, y = 12) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: easeOut },
  });

  return (
    <section
      id="home"
      ref={wrapperRef}
      className="relative h-[130vh] w-full bg-[#efe6d5]"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden rounded-t-none rounded-b-[28px] bg-[#3f8fe0] sm:rounded-b-[44px] lg:rounded-b-[72px]">
        {/* scroll-scrubbed motion background; falls back to the static
            landscape when reduced motion is requested */}
        {shouldReduceMotion ? (
          <Image
            src="/images/hero-mountain.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="z-0 object-cover object-[35%_60%] sm:object-[40%_60%] lg:object-center"
          />
        ) : (
          <video
            ref={videoRef}
            src="/video/hero-motion.mp4"
            poster="/images/hero-mountain.png"
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 z-0 h-full w-full object-cover object-[35%_60%] sm:object-[40%_60%] lg:object-center"
          />
        )}

        {/* subtle neutral overlay, slightly stronger behind the centered type */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(0,0,0,0.09)_0%,rgba(0,0,0,0.15)_50%,rgba(0,0,0,0.09)_100%)]"
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-28 text-center [text-shadow:0_1px_16px_rgba(0,0,0,0.25)] sm:px-10 sm:pb-24 lg:px-16">
          <motion.p
            {...fadeIn(0.05, 10)}
            className="font-mono-label text-[10px] tracking-[0.2em] text-white/90 uppercase sm:text-xs"
          >
            Build · Explore · Learn · Repeat
          </motion.p>

          <h1 className="font-display mt-5 text-[14vw] leading-[0.92] tracking-[-0.04em] text-white sm:mt-6 sm:text-[11vw] lg:text-[9vw]">
            <TextReveal text="Ashutosh" delay={0.2} mode="mount" />
          </h1>

          <motion.p
            {...fadeIn(0.6, 10)}
            className="font-display mt-4 text-[11px] tracking-[0.08em] text-white/95 uppercase sm:mt-5 sm:text-sm"
          >
            Software Engineer · Builder
          </motion.p>

          <motion.p
            {...fadeIn(0.75, 10)}
            className="mt-4 max-w-[260px] text-[14px] leading-relaxed text-white/90 sm:max-w-sm sm:text-base lg:max-w-md lg:text-lg"
          >
            Turning ideas into products, systems, and infrastructure.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
