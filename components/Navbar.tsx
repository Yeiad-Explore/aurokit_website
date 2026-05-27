"use client";

import { useEffect, useRef, useState } from "react";
import { applyMagneticEffect } from "@/lib/gsap";
const LINKS = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#showcase" },
  { label: "Telemetry", href: "#metrics" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const bookRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!bookRef.current) return;
    return applyMagneticEffect(bookRef.current, 0.3);
  }, []);

  return (
    <header
      className={`fixed left-1/2 top-5 z-50 -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled ? "top-3 scale-[0.98]" : "top-5"
      }`}
    >
      <nav className="pill-glass flex items-center gap-1 rounded-full px-2 py-1.5 sm:px-3">
        <a
          href="#top"
          className="group flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium tracking-tight text-white"
        >
          <span className="relative inline-block h-[14px] w-[14px]">
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-glow-mist via-glow-cyan to-glow-violet opacity-90" />
            <span className="absolute inset-[2px] rounded-full bg-ink-base" />
            <span className="absolute inset-[5px] rounded-full bg-gradient-to-br from-white to-glow-mist" />
          </span>
          <span className="font-display">aurokit<span className="text-white/45">.ai</span></span>
        </a>

        <div className="mx-1 hidden h-5 w-px bg-white/10 sm:block" />

        <ul className="hidden items-center sm:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1.5 text-[12px] font-medium tracking-tight text-white/70 transition-colors duration-300 hover:bg-white/[0.06] hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          ref={bookRef}
          href="#contact"
          className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-medium text-ink-deep transition-transform duration-300 hover:scale-[1.02]"
        >
          Book intro
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </nav>
    </header>
  );
}
