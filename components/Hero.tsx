"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import TextReveal from "./TextReveal";
import InteractiveCat from "./InteractiveCat";

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-svh flex-col bg-[#efe6d5] p-3 sm:p-5 lg:p-6"
    >
      <div className="relative h-full overflow-hidden rounded-[36px] bg-[#fcf3e3] sm:rounded-[60px] lg:rounded-[90px] xl:rounded-[120px]">
        {/* cat artwork, filling the stage behind the text */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <CatArt />
        </div>

        {/* identity + description, centered on top of the artwork */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center sm:px-10 lg:px-16">
          <div className="flex w-full flex-col items-center gap-4 lg:flex-row lg:items-start lg:justify-between lg:text-left">
            <div>
              <h1 className="font-display text-[16vw] leading-[0.92] tracking-[-0.16em] text-[#211a13] sm:text-[9vw] lg:text-[6vw]">
                <TextReveal text="Ashutosh" delay={0.1} mode="mount" />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: easeOut }}
                className="font-display mt-3 text-[11px] pl-2 tracking-[0.04em] text-[#6b5f52] uppercase sm:mt-4 sm:text-xs"
              >
                Software Engineer · Builder
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: easeOut }}
              className="max-w-[220px] text-[13px] leading-relaxed text-[#6b5f52] sm:max-w-xs sm:text-[15px] lg:max-w-sm lg:pt-3 lg:text-base"
            >
              I build products, systems, and infrastructure from first
              principles.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CatArt() {
  const shouldReduceMotion = useReducedMotion();
  const [settled, setSettled] = useState(false);

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1, y: 0 }
          : settled
            ? { opacity: 1, y: [0, -5, 0] }
            : { opacity: 1, y: 0 }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : settled
            ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 1, delay: 0.9, ease: easeOut }
      }
      className="relative h-[42%] w-[60%] sm:h-[48%] sm:w-[52%] lg:h-[52%] lg:w-[42%]"
      onAnimationComplete={() => {
        if (!settled) setSettled(true);
      }}
    >
      <InteractiveCat />
    </motion.div>
  );
}
