"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";

const links = [
  { label: "Work", href: "#work" },
  { label: "How I work", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
];

const pill =
  "rounded-full bg-[#F7EBA0] px-5 py-2.5 text-[16px] font-semibold tracking-[-0.01em] text-[#111] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F3E07A]";

export default function TopNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

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
        <a
          href="#home"
          aria-label="Ashutosh Sagar — home"
          className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#F7EBA0] transition-transform duration-300 hover:rotate-[-6deg] sm:h-13 sm:w-13"
        >
          <Image src="/images/x-dp.png" alt="Ashutosh Sagar" fill sizes="52px" className="object-cover" />
        </a>

        <ul className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={`${pill} inline-block`}>
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
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F7EBA0] text-[#111] md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-3 flex max-w-6xl flex-wrap justify-end gap-2 md:hidden"
        >
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)} className={`${pill} inline-block`}>
                {link.label}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.header>
  );
}
