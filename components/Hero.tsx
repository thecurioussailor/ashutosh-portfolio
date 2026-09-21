"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import TextReveal from "./TextReveal";

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = (delay: number, y = 12) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: easeOut },
  });

  return (
    <section
      id="home"
      className="relative flex h-svh flex-col bg-[#efe6d5] p-3 sm:p-5 lg:p-6"
    >
      <div className="relative h-full overflow-hidden rounded-[36px] bg-[#3f8fe0] sm:rounded-[60px] lg:rounded-[90px] xl:rounded-[120px]">
        {/* landscape, filling the stage; cropped toward the sky/horizon */}
        <Image
          src="/images/hero-background.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="z-0 object-cover object-[35%_60%] sm:object-[40%_60%] lg:object-center"
        />

        {/* soft local scrim behind the text only, keeps the landscape vivid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_45%_at_50%_42%,rgba(10,25,50,0.28),transparent_70%)]"
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-28 text-center [text-shadow:0_2px_24px_rgba(8,20,40,0.35)] sm:px-10 sm:pb-24 lg:px-16">
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
