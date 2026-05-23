"use client";

import { useEffect, useRef } from "react";
import HeroShader from "./HeroShader";
import { gsap } from "@/lib/gsap";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-eyebrow", { y: 14, opacity: 0, duration: 0.8 }, 0.2)
        .from(
          ".hero-headline .word",
          {
            yPercent: 110,
            opacity: 0,
            duration: 1.1,
            stagger: 0.06,
          },
          0.3
        )
        .from(".hero-sub", { y: 16, opacity: 0, duration: 0.9 }, 0.85)
        .from(".hero-cta > *", { y: 14, opacity: 0, duration: 0.8, stagger: 0.08 }, 1.0)
        .from(".hero-float", { opacity: 0, y: 12, duration: 0.9, stagger: 0.07 }, 0.6)
        .from(".hero-meta", { y: 10, opacity: 0, duration: 0.8, stagger: 0.06 }, 1.2);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative isolate overflow-hidden pt-[140px] pb-[110px] md:pt-[170px] md:pb-[140px]"
    >
      {/* WebGL shader background */}
      <div className="absolute inset-0 -z-10">
        <HeroShader />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-base" />
        <div className="bg-grid absolute inset-0 opacity-[0.45]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        {/* Eyebrow */}
        <div className="hero-eyebrow flex justify-center">
          <span className="eyebrow">
            <span className="dot" />
            <span>v04 · accepting 3 partnerships · Q2 2026</span>
          </span>
        </div>

        {/* Headline */}
        <h1 className="hero-headline mx-auto mt-7 max-w-[1080px] text-center font-display text-[44px] font-medium leading-[1.0] tracking-tighter text-white sm:text-[60px] md:text-[78px] lg:text-[92px]">
          {[
            "AI",
            "automation",
            "built",
            "to",
          ].map((w, i) => (
            <Word key={i}>{w}</Word>
          ))}
          <br />
          {["operate", "while"].map((w, i) => (
            <Word key={i}>{w}</Word>
          ))}
          <Word>
            <em className="font-serif italic font-normal text-chromatic">you</em>
          </Word>
          {["sleep."].map((w, i) => (
            <Word key={i}>{w}</Word>
          ))}
        </h1>

        {/* Sub */}
        <p className="hero-sub mx-auto mt-7 max-w-[640px] text-center text-[15px] leading-[1.55] text-white/55 md:text-[16.5px]">
          Aurokit designs and ships custom AI systems — orchestrated agents, internal copilots,
          and back-office pipelines — that compound quietly inside the businesses we partner with.
        </p>

        {/* CTAs */}
        <div className="hero-cta mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#contact" className="btn-primary">
            Start an engagement
            <span className="btn-arrow">→</span>
          </a>
          <a href="#process" className="btn-secondary">
            How we work
            <span className="btn-arrow text-white/55">→</span>
          </a>
        </div>

        {/* Floating telemetry labels around hero */}
        <FloatingLabel
          className="left-[6%] top-[24%] hidden md:flex"
          dotPos="right"
          title="ORCH-04"
          value="14 agents idle"
        />
        <FloatingLabel
          className="right-[5%] top-[19%] hidden md:flex"
          dotPos="left"
          title="LAT-AVG"
          value="218ms · p99 612ms"
        />
        <FloatingLabel
          className="left-[10%] bottom-[16%] hidden lg:flex"
          dotPos="right"
          title="TASKS-24H"
          value="42,118 actions"
        />
        <FloatingLabel
          className="right-[8%] bottom-[12%] hidden lg:flex"
          dotPos="left"
          title="CONFIDENCE"
          value="0.94 mean"
        />

        {/* Bottom meta strip */}
        <div className="hero-meta mt-20 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
          <Meta k="Founded" v="2023, Bangalore" />
          <Meta k="Stack" v="Custom · vendor-neutral" />
          <Meta k="Engagement" v="Equity + retainer" />
          <Meta k="SLA" v="< 4 weeks to first run" />
        </div>
      </div>
    </section>
  );
}

function Word({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block overflow-hidden align-baseline pr-3 last:pr-0">
      <span className="word inline-block will-change-transform">{children}</span>
    </span>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/40">
        {k}
      </span>
      <span className="text-[13.5px] tracking-tight text-white/85">{v}</span>
    </div>
  );
}

function FloatingLabel({
  className = "",
  dotPos,
  title,
  value,
}: {
  className?: string;
  dotPos: "left" | "right";
  title: string;
  value: string;
}) {
  return (
    <div
      className={`hero-float absolute flex items-center gap-3 ${className}`}
      aria-hidden="true"
    >
      {dotPos === "left" && <Node />}
      <div className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md">
        <div className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-white/40">
          {title}
        </div>
        <div className="font-mono text-[11px] tracking-tight text-white/85">{value}</div>
      </div>
      {dotPos === "right" && <Node />}
    </div>
  );
}

function Node() {
  return (
    <span className="relative flex h-[22px] w-[22px] items-center justify-center rounded-full border border-white/12 bg-white/[0.03]">
      <span className="node-dot" />
    </span>
  );
}
