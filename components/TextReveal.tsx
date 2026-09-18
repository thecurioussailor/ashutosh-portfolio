"use client";

import { motion, useReducedMotion } from "motion/react";

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  /** "view" animates in when scrolled into view (default), "mount" animates
   * immediately on mount — use "mount" for content already visible on load
   * (e.g. hero headlines), since whileInView never fires for it. */
  mode?: "view" | "mount";
};

export default function TextReveal({
  text,
  className,
  delay = 0,
  once = true,
  mode = "view",
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const animationProps =
    mode === "mount"
      ? { animate: { y: 0 } }
      : {
          whileInView: { y: 0 },
          viewport: { once, margin: "-5% 0px -5% 0px" },
        };

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`inline-block align-top pb-[0.08em] ${
            i < words.length - 1 ? "mr-[0.26em]" : ""
          }`}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            {...animationProps}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.045,
              ease: [0.16, 1, 0.3, 1],
            }}
            aria-hidden="true"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
