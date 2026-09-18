"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

// Natural pixel dimensions of /public/images/hero-cat.png
const NATURAL_W = 1536;
const NATURAL_H = 1024;

// Eye geometry measured directly from the artwork (natural pixel space).
const EYES = [
  {
    id: "left",
    iris: { cx: 600, cy: 335, r: 95 },
    pupil: { cx: 600, cy: 335 },
  },
  {
    id: "right",
    iris: { cx: 885, cy: 355, r: 107 },
    pupil: { cx: 885, cy: 355 },
  },
] as const;

const MAX_X = 6;
const MAX_Y = 2.5;
const SPRING = { stiffness: 150, damping: 20, mass: 0.6 };

type Layout = {
  scale: number;
  offsetX: number;
  offsetY: number;
};

function computeLayout(containerW: number, containerH: number): Layout {
  if (!containerW || !containerH) return { scale: 0, offsetX: 0, offsetY: 0 };
  const containerAspect = containerW / containerH;
  const naturalAspect = NATURAL_W / NATURAL_H;

  if (containerAspect > naturalAspect) {
    // container wider than the image -> height-constrained, letterboxed left/right
    const height = containerH;
    const width = height * naturalAspect;
    return {
      scale: height / NATURAL_H,
      offsetX: (containerW - width) / 2,
      offsetY: 0,
    };
  }

  // container taller than the image -> width-constrained, letterboxed top/bottom
  const width = containerW;
  const height = width / naturalAspect;
  return {
    scale: width / NATURAL_W,
    offsetX: 0,
    offsetY: (containerH - height) / 2,
  };
}

function EyeOverlay({
  eye,
  layout,
  targetX,
  targetY,
}: {
  eye: (typeof EYES)[number];
  layout: Layout;
  targetX: ReturnType<typeof useMotionValue<number>>;
  targetY: ReturnType<typeof useMotionValue<number>>;
}) {
  const springX = useSpring(targetX, SPRING);
  const springY = useSpring(targetY, SPRING);

  const { scale, offsetX, offsetY } = layout;
  const pupilW = eye.iris.r * 0.27 * scale;
  const pupilH = eye.iris.r * 0.92 * scale;
  const left = offsetX + eye.pupil.cx * scale;
  const top = offsetY + eye.pupil.cy * scale;

  return (
    <motion.div
      aria-hidden="true"
      className="absolute rounded-full bg-[#141008]"
      style={{
        left,
        top,
        width: pupilW,
        height: pupilH,
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}

export default function InteractiveCat() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [layout, setLayout] = useState<Layout>({ scale: 0, offsetX: 0, offsetY: 0 });
  const [isCoarsePointer] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches,
  );
  const enabled = !isCoarsePointer && !shouldReduceMotion;

  const leftX = useMotionValue(0);
  const leftY = useMotionValue(0);
  const rightX = useMotionValue(0);
  const rightY = useMotionValue(0);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setLayout(computeLayout(width, height));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const mouse = { x: -9999, y: -9999, inside: false };
    let rafId = 0;

    const onPointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onPointerLeaveWindow = () => {
      mouse.inside = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeaveWindow);
    window.addEventListener("blur", onPointerLeaveWindow);

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const margin = 160;
      const inside =
        mouse.x >= rect.left - margin &&
        mouse.x <= rect.right + margin &&
        mouse.y >= rect.top - margin &&
        mouse.y <= rect.bottom + margin;
      mouse.inside = inside;

      const applyTarget = (
        eye: (typeof EYES)[number],
        mx: ReturnType<typeof useMotionValue<number>>,
        my: ReturnType<typeof useMotionValue<number>>,
      ) => {
        if (!inside) {
          mx.set(0);
          my.set(0);
          return;
        }
        const eyeScreenX = rect.left + layout.offsetX + eye.iris.cx * layout.scale;
        const eyeScreenY = rect.top + layout.offsetY + eye.iris.cy * layout.scale;
        const dx = mouse.x - eyeScreenX;
        const dy = mouse.y - eyeScreenY;
        const dist = Math.hypot(dx, dy) || 1;
        const nx = dx / dist;
        const ny = dy / dist;
        const growth = 0.12;
        mx.set(nx * Math.min(dist * growth, MAX_X));
        my.set(ny * Math.min(dist * growth, MAX_Y));
      };

      applyTarget(EYES[0], leftX, leftY);
      applyTarget(EYES[1], rightX, rightY);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeaveWindow);
      window.removeEventListener("blur", onPointerLeaveWindow);
    };
  }, [enabled, layout, leftX, leftY, rightX, rightY]);

  return (
    <div ref={wrapperRef} className="relative h-full w-full">
      <Image
        src="/images/hero-cat1.png"
        alt="Illustration of an orange tabby cat with large green eyes peeking out of an open cardboard box"
        width={NATURAL_W}
        height={NATURAL_H}
        priority
        sizes="(min-width: 1280px) 720px, (min-width: 1024px) 640px, (min-width: 768px) 520px, (min-width: 640px) 420px, 300px"
        className="h-full w-full select-none object-contain [-webkit-mask-image:radial-gradient(ellipse_92%_90%_at_50%_50%,black_68%,transparent_100%)] [mask-image:radial-gradient(ellipse_92%_90%_at_50%_50%,black_68%,transparent_100%)]"
      />

      {enabled && layout.scale > 0 && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <EyeOverlay eye={EYES[0]} layout={layout} targetX={leftX} targetY={leftY} />
          <EyeOverlay eye={EYES[1]} layout={layout} targetX={rightX} targetY={rightY} />
        </div>
      )}
    </div>
  );
}
