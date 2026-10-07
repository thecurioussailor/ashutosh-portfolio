"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import SocialAvatar from "./SocialAvatar";
import { ArrowRight, Menu, X } from "lucide-react";

const links = [
  { label: "Work", href: "#work" },
  { label: "How I work", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
];

// frosted dark glass — readable over the blue hero and the light sections alike
const glass =
  "rounded-full bg-[#0d1330]/35 ring-1 ring-white/20 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150";
const linkText = "relative z-10 block rounded-full px-5 py-2.5 text-[15.5px] font-semibold tracking-[-0.01em] transition-colors duration-200";

export default function TopNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  // hide while scrolling down, reveal on any scroll up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (open) return;
    setHidden(y > prev && y > 160);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -110 : 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5"
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-3"
      >
        {/* hover (tap on phones) to pop the socials out below the photo */}
        <div className="-m-2">
          <SocialAvatar direction="down" size={50} />
        </div>

        <ul onMouseLeave={() => setHovered(null)} className={`hidden items-center gap-0.5 p-1.5 md:flex ${glass}`}>
          {links.map((link, i) => (
            <li key={link.href} className="relative" onMouseEnter={() => setHovered(i)}>
              {/* yellow pill that slides to whichever link is hovered */}
              {hovered === i && (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-0 rounded-full bg-[#F7EBA0]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <a href={link.href} className={`${linkText} ${hovered === i ? "text-[#111]" : "text-[#fffdf6]"}`}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="group flex items-stretch overflow-hidden rounded-lg text-[15px] font-semibold text-[#111] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="bg-[#F0A33E] px-4 py-2.5 sm:px-5">Let&rsquo;s talk</span>
            <span className="flex items-center border-l border-black/10 bg-[#F0A33E] px-3 transition-colors duration-300 group-hover:bg-[#EA9426]">
              <ArrowRight size={16} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`flex h-11 w-11 items-center justify-center text-[#fffdf6] md:hidden ${glass}`}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3 ml-auto flex w-fit flex-col gap-0.5 p-1.5 md:hidden ${glass} rounded-3xl`}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)} className={`${linkText} text-[#fffdf6] hover:bg-[#F7EBA0] hover:text-[#111]`}>
                {link.label}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.header>
  );
}
