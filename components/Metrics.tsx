"use client";

import { useEffect, useRef } from "react";
import GlassCard from "./GlassCard";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Metrics() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Number count-ups
      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        const target = parseFloat(el.dataset.counter || "0");
        const decimals = parseInt(el.dataset.decimals || "0");
        const suffix = el.dataset.suffix || "";
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: target,
              duration: 1.6,
              ease: "expo.out",
              onUpdate: () => {
                el.textContent = obj.v.toFixed(decimals) + suffix;
              },
            });
          },
        });
      });

      // Bars
      gsap.utils.toArray<HTMLElement>(".m-bar").forEach((el) => {
        gsap.from(el, {
          scaleY: 0,
          transformOrigin: "bottom",
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.04,
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="metrics" ref={ref} className="relative px-6 py-32 md:px-10 md:py-40">
      <div className="bloom-tr opacity-40" />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="mb-16 grid items-end gap-8 md:mb-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="eyebrow"><span className="dot" />Telemetry</span>
            <h2 className="mt-5 font-display text-[36px] font-medium leading-[1.05] tracking-tighter text-white sm:text-[46px] md:text-[58px]">
              The numbers we
              <br />
              <span className="font-serif italic font-normal text-chromatic">obsess over.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pl-10">
            <p className="text-[14.5px] leading-[1.6] text-white/55">
              Aggregated across active engagements. Updated quarterly. We&apos;d rather show fewer
              metrics that actually mean something than a wall of vanity numbers.
            </p>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-12">
          {/* Big metric */}
          <GlassCard className="lg:col-span-7 p-8 md:p-10">
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/45">
                    Operator hours reclaimed
                  </div>
                  <div className="mt-1 text-[13.5px] text-white/65">Rolling 90 days · across 11 partners</div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-glow-mist">
                  ↑ 38% qoq
                </div>
              </div>

              <div className="flex items-end gap-4">
                <span
                  data-counter="48230"
                  data-decimals="0"
                  data-suffix=""
                  className="tabular font-display text-[64px] font-medium leading-[0.9] tracking-tightest text-white md:text-[88px]"
                >
                  0
                </span>
                <span className="pb-2 font-mono text-[12px] tracking-tight text-white/45">hours</span>
              </div>

              {/* Bar chart */}
              <div className="mt-2 flex h-[120px] items-end gap-[3px]">
                {Array.from({ length: 36 }).map((_, i) => {
                  const h = 18 + Math.round(45 * Math.abs(Math.sin(i * 0.62)) + (i % 5) * 4);
                  return (
                    <div
                      key={i}
                      className="m-bar flex-1 rounded-t-[3px] bg-gradient-to-t from-glow-mist/15 via-glow-mist/40 to-glow-mist/85"
                      style={{ height: `${h}%`, opacity: 0.35 + (i / 36) * 0.6 }}
                    />
                  );
                })}
              </div>

              <div className="flex items-center justify-between border-t border-white/[0.06] pt-4 font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/40">
                <span>Q3 &apos;25</span>
                <span>Q4 &apos;25</span>
                <span>Q1 &apos;26</span>
              </div>
            </div>
          </GlassCard>

          {/* Right side stacked */}
          <div className="grid gap-3 lg:col-span-5">
            <GlassCard className="p-6 md:p-7">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/45">
                    Median time to ship
                  </div>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span data-counter="23" data-decimals="0" className="tabular font-display text-[44px] font-medium tracking-tightest text-white">0</span>
                    <span className="text-[13px] text-white/55">days</span>
                  </div>
                  <div className="mt-1 font-mono text-[10.5px] tracking-tight text-white/45">
                    diagnostic → first run
                  </div>
                </div>
                <div className="border-l border-white/[0.07] pl-5">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/45">
                    Mean eval pass
                  </div>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span data-counter="0.942" data-decimals="3" className="tabular font-display text-[44px] font-medium tracking-tightest text-white">0</span>
                  </div>
                  <div className="mt-1 font-mono text-[10.5px] tracking-tight text-white/45">
                    rolling 30d, weighted
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 md:p-7">
              <div className="flex items-start gap-5">
                {/* Ring */}
                <div className="relative h-[120px] w-[120px] shrink-0">
                  <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                    <circle cx="60" cy="60" r="52" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      stroke="rgba(221,235,225,0.95)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray="326"
                      strokeDashoffset="60"
                      fill="none"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="tabular font-display text-[26px] font-medium tracking-tightest text-white">81%</span>
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-white/50">retention</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/45">
                    Partner retention
                  </div>
                  <div className="mt-1 text-[14px] leading-[1.5] text-white/70">
                    8 of our last 10 engagements renewed for a second phase. The two that
                    didn&apos;t took the system in-house with our runbooks.
                  </div>
                </div>
              </div>
            </GlassCard>

            <div className="grid grid-cols-3 gap-3">
              <Mini label="Languages" value="11" />
              <Mini label="Models in rotation" value="14" />
              <Mini label="Continents" value="4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <GlassCard className="p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/40">{label}</div>
      <div className="mt-1.5 tabular font-display text-[22px] font-medium tracking-tightest text-white">
        {value}
      </div>
    </GlassCard>
  );
}
