"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Log", href: "#log" },
];

export default function FloatingNav() {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 sm:bottom-8"
    >
      <nav
        aria-label="Primary"
        className="relative flex items-center gap-1.5 rounded-full bg-black/55 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10 backdrop-blur-xl supports-backdrop-filter:bg-black/45"
      >
        <a
          href="#home"
          aria-label="Ashutosh Sagar — home"
          className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 ring-1 ring-accent/30 transition-colors duration-300 hover:ring-accent/60 sm:h-14 sm:w-14"
        >
          <Image
            src="/images/x-dp.png"
            alt="Ashutosh Sagar"
            fill
            sizes="56px"
            className="object-cover"
          />
        </a>

        <ul className="hidden items-center gap-1 px-2 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative inline-flex flex-col items-center overflow-hidden rounded-full px-4 py-3.5 font-display text-[11px] tracking-[0.1em] uppercase text-white/75 transition-colors duration-300 hover:text-white lg:px-5 lg:text-[12px]"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-3 h-1 w-1 translate-y-0 rounded-full bg-current opacity-0 transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:opacity-900"
                />
                <span className="transition-transform duration-300 ease-out group-hover:translate-y-0.5">
                  {link.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="group flex shrink-0 items-center gap-2 rounded-full bg-[#fcf3e3] py-3.5 pl-5 pr-4 font-display text-[11px] tracking-[0.1em] uppercase text-[#211a13] transition-colors duration-300 hover:bg-white lg:text-[12px]"
        >
          Contact
          <ArrowUpRight
            size={14}
            strokeWidth={1.75}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </nav>
    </motion.div>
  );
}
