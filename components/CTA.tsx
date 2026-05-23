"use client";

import GlassCard from "./GlassCard";

export default function CTA() {
  return (
    <section id="contact" className="relative px-6 py-32 md:px-10 md:py-40">
      <div className="relative mx-auto max-w-[1200px]">
        <GlassCard className="relative overflow-hidden p-10 md:p-16">
          {/* inner ambient glow */}
          <div
            className="pointer-events-none absolute -right-[20%] -top-[30%] h-[80%] w-[80%] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(221,235,225,0.30) 0%, rgba(199,182,230,0.10) 35%, rgba(0,0,0,0) 70%)",
              filter: "blur(40px)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-[15%] -bottom-[30%] h-[60%] w-[60%] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(199,182,230,0.22) 0%, rgba(0,0,0,0) 65%)",
              filter: "blur(40px)",
            }}
            aria-hidden
          />

          <div className="relative grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <span className="eyebrow"><span className="dot" />Q2 2026 — 3 slots open</span>
              <h2 className="mt-6 font-display text-[36px] font-medium leading-[1.05] tracking-tighter text-white sm:text-[48px] md:text-[60px]">
                Let&apos;s find the seam
                <br />
                where AI actually
                <br />
                <span className="font-serif italic font-normal text-chromatic">moves the needle.</span>
              </h2>
              <p className="mt-6 max-w-[480px] text-[14.5px] leading-[1.6] text-white/55">
                Tell us what your team does, what slows it down, and what good would look like.
                We&apos;ll come back within two business days with a candid take — and whether we&apos;re
                the right partner for it.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="mailto:hello@aurokit.ai" className="btn-primary">
                  hello@aurokit.ai
                  <span className="btn-arrow">→</span>
                </a>
                <a href="#" className="btn-secondary">
                  Book a 20-min intro
                  <span className="btn-arrow text-white/55">→</span>
                </a>
              </div>
            </div>

            {/* Side stats */}
            <div className="md:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                <Stat k="First response" v="< 48h" />
                <Stat k="Time to first run" v="< 4 wks" />
                <Stat k="Engagement floor" v="$28k / mo" />
                <Stat k="Equity option" v="Available" />
              </div>

              <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                <div className="flex items-center gap-2">
                  <span className="node-dot" />
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-glow-mist">
                    Currently shipping
                  </span>
                </div>
                <p className="mt-3 text-[13.5px] leading-[1.55] text-white/65">
                  An ingest pipeline for a B2B publishing partner, an internal copilot for an
                  industrial design studio, and a research agent for a thematic fund.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/40">{k}</div>
      <div className="mt-1.5 font-display text-[20px] font-medium tracking-tightest text-white">
        {v}
      </div>
    </div>
  );
}
