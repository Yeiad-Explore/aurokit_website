"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STEPS = [
  {
    n: "01",
    title: "Map the seam.",
    body:
      "Two-week diagnostic. We sit with your operators, watch the work, and identify the precise seam where automation produces compounding leverage — not noise.",
    artifacts: ["Workflow map", "Cost-of-doing-nothing model", "Risk register"],
  },
  {
    n: "02",
    title: "Build the spine.",
    body:
      "We ship a minimum-viable system in three to five weeks. Real traffic, narrow scope, tight evals. Boring on purpose: it has to survive Monday morning.",
    artifacts: ["Orchestration spine", "Eval harness", "Internal dashboard"],
  },
  {
    n: "03",
    title: "Compound the surface.",
    body:
      "Once the spine is trustworthy, we expand outward — new agents, new pipelines, new copilots — using the same telemetry, same handoff patterns, same vendor-neutral primitives.",
    artifacts: ["Quarterly roadmap", "Cost guardrails", "Versioned releases"],
  },
  {
    n: "04",
    title: "Hand it back.",
    body:
      "You take the wheel whenever you’re ready. Documented repo, runbooks, oncall rotation. Or keep us on retainer and we’ll keep operating it for you.",
    artifacts: ["Runbooks", "Repo + CI", "Quarterly review"],
  },
];

export default function Process() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated progress rail
      gsap.to(".process-rail-fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".process-rail",
          start: "top 70%",
          end: "bottom 70%",
          scrub: 0.6,
        },
      });

      // Step reveal
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 1.0,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });

      // Step node activation
      gsap.utils.toArray<HTMLElement>(".process-node").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 40%",
          toggleClass: { targets: el, className: "is-active" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={rootRef}
      className="relative px-6 py-32 md:px-10 md:py-40"
    >
      <div className="bloom-bl opacity-60" />

      <div className="relative mx-auto grid max-w-[1280px] gap-12 md:grid-cols-12">
        {/* Left — title */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <span className="eyebrow"><span className="dot" />Process</span>
            <h2 className="mt-5 font-display text-[36px] font-medium leading-[1.05] tracking-tighter text-white sm:text-[44px] md:text-[52px]">
              We move in
              <br />
              <span className="font-serif italic font-normal text-chromatic">four phases.</span>
            </h2>
            <p className="mt-5 max-w-sm text-[14px] leading-[1.6] text-white/55">
              No discovery deck. No quarter-long roadmap before a line of code ships. We start in
              your real workflow, week one.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <a href="#contact" className="btn-secondary !h-10 !px-4">
                Talk to a partner
                <span className="btn-arrow text-white/55">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right — steps */}
        <div className="relative md:col-span-8">
          {/* progress rail */}
          <div className="process-rail pointer-events-none absolute left-[18px] top-2 h-[calc(100%-1rem)] w-px bg-white/[0.07] md:left-[24px]">
            <div className="process-rail-fill absolute inset-0 origin-top scale-y-0 bg-gradient-to-b from-glow-mist via-glow-cyan to-glow-violet opacity-70" />
          </div>

          <ol className="space-y-12 md:space-y-14">
            {STEPS.map((s) => (
              <li key={s.n} className="process-step relative pl-14 md:pl-20">
                <span
                  className="process-node absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-ink-elevated transition-all duration-700 md:h-12 md:w-12"
                >
                  <span className="font-mono text-[10.5px] tracking-tight text-white/70">{s.n}</span>
                </span>

                <h3 className="font-display text-[22px] font-medium leading-[1.15] tracking-tight text-white md:text-[26px]">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-xl text-[14px] leading-[1.6] text-white/60">{s.body}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {s.artifacts.map((a) => (
                    <span
                      key={a}
                      className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-[10.5px] tracking-tight text-white/65"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <style jsx>{`
        .process-node.is-active {
          border-color: rgba(221, 235, 225, 0.45);
          box-shadow: 0 0 0 4px rgba(221, 235, 225, 0.07), 0 0 28px rgba(221, 235, 225, 0.22);
          background: rgba(221, 235, 225, 0.06);
        }
      `}</style>
    </section>
  );
}
