"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { site } from "@/data/site";
import Reveal from "./Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  // open the mail app and copy the address — many people have no mail client set up
  const onEmail = () => {
    navigator.clipboard?.writeText(site.email).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      },
      () => {},
    );
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#fffdf6] px-5 py-24 text-[#111] sm:px-10 sm:py-32">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative -rotate-[1.5deg] rounded-[36px] border-[2.5px] border-[#111] bg-[#F7D35E] px-6 py-16 text-center shadow-[8px_8px_0_#111] sm:rounded-[48px] sm:px-12 sm:py-20">
          {/* sticker */}
          <span
            aria-hidden="true"
            className="font-hand absolute -top-8 -right-3 flex h-24 w-24 rotate-[12deg] items-center justify-center rounded-full border-[2.5px] border-[#111] bg-[#F8A5E6] text-[24px] leading-none shadow-[3px_3px_0_#111] sm:-top-10 sm:-right-8 sm:h-28 sm:w-28 sm:text-[28px]"
          >
            say hi!
          </span>

          <p className="font-hand -rotate-[3deg] text-[28px] leading-none text-[#6B5BA8] sm:text-[34px]">
            got something in mind?
          </p>
          <h2 className="font-poster mt-5 text-[13vw] font-black leading-[0.92] tracking-[-0.05em] sm:text-[9vw] lg:text-[6.5vw]">
            Let&rsquo;s build
            <br />
            something.
          </h2>

          {site.availability && (
            <p className="font-hand mt-8 inline-flex rotate-[2deg] items-end gap-2 text-[26px] leading-none text-[#6B5BA8] sm:text-[30px]">
              {site.availability.toLowerCase()}
              {/* little hand-drawn arrow pointing at the buttons */}
              <svg aria-hidden="true" viewBox="0 0 40 40" className="h-8 w-8 translate-y-3">
                <path
                  d="M4 6 C 18 4, 30 12, 28 30 M20 24 L28 32 L34 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${site.email}`}
              onClick={onEmail}
              className="group inline-flex items-stretch overflow-hidden rounded-lg text-[17px] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="bg-[#111] px-6 py-4">{copied ? "Email copied!" : "Email me"}</span>
              <span className="flex items-center border-l border-white/20 bg-[#111] px-4 transition-colors duration-300 group-hover:bg-[#2a2a2a]">
                {copied ? (
                  <Check size={18} strokeWidth={2.75} />
                ) : (
                  <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                )}
              </span>
            </a>

            {site.bookingUrl && (
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-stretch overflow-hidden rounded-lg border-[2.5px] border-[#111] text-[17px] font-semibold text-[#111] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="bg-white px-6 py-[13.5px]">Book a call</span>
                <span className="flex items-center border-l-[2.5px] border-[#111] bg-white px-4 transition-colors duration-300 group-hover:bg-[#F8A5E6]">
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </span>
              </a>
            )}
          </div>
          <p className="font-mono-label mt-5 text-[12px] text-black/55">{site.email}</p>
        </div>
      </Reveal>
    </section>
  );
}
