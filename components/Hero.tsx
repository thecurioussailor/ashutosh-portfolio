"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { BLOOMS, BLOOM_W, BloomArt, type Bloom } from "./HeroBlooms";


// soft cloud silhouette (bumps along the top, flat bottom)
const CLOUD =
  "M0 220 V150 C 10 100, 60 80, 100 100 C 110 50, 170 30, 210 60 C 240 20, 310 20, 330 70 C 370 50, 420 70, 430 110 C 470 100, 500 130, 500 160 V220 Z";

const BLUE = "#2452A8";
const WINDOW = "#1C4290";
const CREAM = "#F6ECDC";

/*
 * Poster hero — work objects growing out of a polaroid frame.
 * Layers (back → front): blue poster bg + name, the frame's blue window,
 * the cream frame, then the "blooms". The blooms are clipped only below the
 * window's bottom edge, so as they grow on scroll they spill over the top of
 * the frame and in front of the name.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const wrapperRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
    restDelta: 0.0005,
  });

  // mouse parallax (desktop)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  useEffect(() => {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  const titleX = useTransform(sx, (v) => v * 14);
  const titleY = useTransform(p, [0, 0.7], ["0vh", "5vh"]);
  const frameX = useTransform(sx, (v) => v * -6);
  const frameY = useTransform(sy, (v) => v * -6);
  const frameRotate = useTransform(sx, (v) => v * 2);
  const frontX = useTransform(sx, (v) => v * -18);
  const frontY = useTransform(sy, (v) => v * -10);
  const hintOpacity = useTransform(p, [0, 0.12], [1, 0]);
  // clouds rise slowly (back layer slower than front) and drift with the mouse
  const cloudBackY = useTransform(p, [0, 1], ["6%", "-6%"]);
  const cloudFrontY = useTransform(p, [0, 1], ["14%", "-10%"]);
  const cloudX = useTransform(sx, (v) => v * 10);

  return (
    // cream wrapper fills the area behind the hero's curved bottom corners
    <div className="bg-[#fffdf6]">
      <section
        id="home"
        ref={wrapperRef}
        // overflow-clip (not hidden) so the sticky panel keeps working; the curve only
        // shows once the pinned part has scrolled past
        className={`relative overflow-clip rounded-b-[32px] sm:rounded-b-[56px] lg:rounded-b-[80px] ${reduce ? "pb-[6vh]" : "h-[236vh]"}`}
        style={{ backgroundColor: BLUE }}
      >
        <div
          className="sticky top-0 h-svh w-full overflow-hidden"
          style={{ backgroundColor: BLUE }}
        >
          {/* paper grain */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 h-full w-full opacity-[0.09] mix-blend-overlay"
          >
            <filter id="hero-grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="2"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#hero-grain)" />
          </svg>

          {/* twinkling sparkles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
          >
            {[
              [12, 22, 22, 0],
              [86, 18, 18, 1.2],
              [21, 60, 14, 2.1],
              [80, 54, 20, 0.6],
              [93, 36, 12, 1.8],
              [6, 42, 12, 2.6],
            ].map(([x, y, size, d], i) => (
              <svg
                key={i}
                viewBox="0 0 20 20"
                className="hero-twinkle absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: size,
                  height: size,
                  animationDelay: `${d}s`,
                }}
              >
                <path
                  d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"
                  fill={CREAM}
                />
              </svg>
            ))}
          </div>

          {/* clouds — bottom corners, two depths */}
          <motion.div
            style={reduce ? undefined : { y: cloudBackY, x: cloudX }}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1]"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 500 220"
              className="absolute bottom-[-2%] left-[-6%] w-[46vw] max-w-[620px] min-w-[260px]"
            >
              <path d={CLOUD} fill="#3261BA" />
            </svg>
            <svg
              viewBox="0 0 500 220"
              className="absolute right-[-8%] bottom-[-2%] w-[48vw] max-w-[640px] min-w-[260px] -scale-x-100"
            >
              <path d={CLOUD} fill="#3261BA" />
            </svg>
          </motion.div>
          <motion.div
            style={reduce ? undefined : { y: cloudFrontY }}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2]"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 500 220"
              className="absolute bottom-[-6%] left-[-12%] w-[34vw] max-w-[460px] min-w-[200px]"
            >
              <path d={CLOUD} fill="#3E6FCB" />
            </svg>
            <svg
              viewBox="0 0 500 220"
              className="absolute right-[-14%] bottom-[-6%] w-[36vw] max-w-[480px] min-w-[200px] -scale-x-100"
            >
              <path d={CLOUD} fill="#3E6FCB" />
            </svg>
          </motion.div>

          {/* scroll hint */}
          <div
            className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-3 px-4 pb-5 sm:gap-4 sm:pb-6"
            style={{ color: CREAM }}
          >
            <motion.p
              style={reduce ? undefined : { opacity: hintOpacity }}
              className="font-hand flex items-center gap-1.5 text-[19px] leading-none sm:text-[21px]"
            >
              scroll down <span aria-hidden="true">↓</span>
            </motion.p>
          </div>

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-16 pb-[8vh]">
            {/* title */}
            <motion.div
              style={reduce ? undefined : { x: titleX, y: titleY }}
              className="relative z-0 text-center"
            >
              <p className="font-hand -rotate-[3deg] text-[22px] leading-none text-[#F7EBA0] sm:text-[28px]">
                hi, I&rsquo;m Ashutosh, a software engineer &amp;
              </p>
              <h1 className="font-poster mt-1 text-[22vw] font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-[14vw] lg:text-[9vw]">
                <span style={{ color: CREAM }}>Builder</span>
              </h1>
            </motion.div>

            {/* frame + blooms */}
            <motion.div
              style={
                reduce
                  ? undefined
                  : { x: frameX, y: frameY, rotate: frameRotate }
              }
              className="relative z-10 mt-[2vh] aspect-[4/5] w-[min(68vw,34vh)]"
            >
              {/* the cream polaroid with its blue window */}
              <div
                className="absolute inset-0 rounded-[6px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]"
                style={{ backgroundColor: CREAM }}
              >
                <div
                  className="absolute top-[7%] right-[7%] bottom-[24%] left-[7%] overflow-hidden"
                  style={{ backgroundColor: WINDOW }}
                >
                  {/* a few sparkles in the window */}
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden="true"
                  >
                    {[
                      [16, 18, 2.2],
                      [80, 12, 1.6],
                      [62, 30, 1.2],
                      [28, 40, 1.4],
                      [88, 44, 2],
                    ].map(([x, y, r], i) => (
                      <path
                        key={i}
                        d={`M${x} ${y - r * 2} L${x + r * 0.5} ${y - r * 0.5} L${x + r * 2} ${y} L${x + r * 0.5} ${y + r * 0.5} L${x} ${y + r * 2} L${x - r * 0.5} ${y + r * 0.5} L${x - r * 2} ${y} L${x - r * 0.5} ${y - r * 0.5} Z`}
                        fill={CREAM}
                        opacity="0.75"
                      />
                    ))}
                  </svg>
                </div>
              </div>

              {/* blooms — clipped only below the window's bottom edge */}
              <motion.div
                style={reduce ? undefined : { x: frontX, y: frontY }}
                className="absolute inset-0 [clip-path:inset(-200%_-60%_24%_-60%)]"
              >
                {BLOOMS.map((b, i) => (
                  <BloomLayer
                    key={b.key}
                    bloom={b}
                    index={i}
                    progress={p}
                    reduce={!!reduce}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function BloomLayer({
  bloom,
  index,
  progress,
  reduce,
}: {
  bloom: Bloom;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  // each bloom grows on its own slightly offset schedule
  const from = 0.02 + index * 0.035;
  const to = 0.55 + index * 0.03;
  const y = useTransform(progress, [from, to], [`${bloom.start * 100}%`, "0%"]);
  const rotate = useTransform(
    progress,
    [from, to],
    [bloom.rotate * 0.3, bloom.rotate],
  );
  const scale = useTransform(progress, [from, to], [0.9, 1]);

  return (
    <motion.div
      className="absolute bottom-[24%] origin-bottom"
      style={{
        left: `${bloom.x}%`,
        width: `${BLOOM_W}%`,
        height: `${bloom.h}%`,
        x: "-50%",
        ...(reduce ? { rotate: bloom.rotate } : { y, rotate, scale }),
      }}
    >
      <BloomArt bloom={bloom} />
    </motion.div>
  );
}
