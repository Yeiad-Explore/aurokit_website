"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const TEXT = [
  "We don&apos;t believe in",
  "AI moonshots,",
  "demoware,",
  "or platforms",
  "looking for a problem.",
  "We believe in",
  "small, sharp systems",
  "that quietly",
  "do the work —",
  "and survive",
  "Monday morning.",
];

export default function Manifesto() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".manifesto-word");
      gsap.fromTo(
        words,
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 0.8,
          },
        }
      );

      // Subtle parallax on flanking labels
      gsap.to(".manifesto-side", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => ScrollTrigger.refresh();
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-32 md:px-10 md:py-44">
      <div className="bloom-bl opacity-50" />
      <div className="manifesto-side absolute left-6 top-32 hidden font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/35 md:block">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-glow-mist" /> Manifesto
        </div>
        <div className="text-white/25">— scroll to read —</div>
      </div>
      <div className="manifesto-side absolute right-6 bottom-32 hidden text-right font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/35 md:block">
        <div>Est. 2023</div>
        <div className="text-white/25">— Bangalore · Remote —</div>
      </div>

      <div className="relative mx-auto max-w-[1080px]">
        <p className="font-display text-[32px] font-medium leading-[1.18] tracking-tighter text-white sm:text-[44px] md:text-[58px]">
          {TEXT.map((w, i) => (
            <span
              key={i}
              className="manifesto-word inline pr-3"
              dangerouslySetInnerHTML={{
                __html:
                  w.includes("small, sharp") || w.includes("quietly") || w.includes("Monday")
                    ? `<span class="font-serif italic font-normal text-chromatic">${w}</span>`
                    : w,
              }}
            />
          ))}
        </p>
      </div>
    </section>
  );
}
