"use client";

import React, { useState, useEffect } from "react";

export default function ROICalculator() {
  const [hours, setHours] = useState(250);
  const [rate, setRate] = useState(45);

  const hoursSavedPerYear = hours * 12;
  const annualCapitalReclaimed = hoursSavedPerYear * rate;
  
  // Example arbitrary calculation:
  // Base cost of system is $50,000 / year + setup. Let's make the payback period dynamic based on capital reclaimed.
  const cost = 25000;
  const paybackMonths = Math.max(1, Math.min(24, Math.round((cost / Math.max(1, annualCapitalReclaimed)) * 12)));

  // Generate sparkline path dynamically based on values
  const [pathD, setPathD] = useState("M 0 100 Q 25 100 50 100 T 100 100");

  useEffect(() => {
    // A simple math mapping to create a curve that arcs higher when savings are higher
    const maxSavings = 1000 * 200 * 12;
    const ratio = Math.min(1, annualCapitalReclaimed / (maxSavings * 0.2)); // Cap early for visual flair
    const peak = 100 - ratio * 80; // 100 is bottom, 20 is top
    setPathD(`M 0 100 Q 25 ${peak + 20} 50 ${peak} T 100 ${peak - 10}`);
  }, [annualCapitalReclaimed]);

  return (
    <section className="relative mx-auto max-w-[1280px] px-6 py-20 md:px-10">
      <div className="mb-12">
        <h2 className="font-display text-3xl font-medium tracking-tight text-white md:text-4xl">
          Value Simulator
        </h2>
        <p className="mt-4 max-w-[600px] text-[15px] leading-relaxed text-white/55">
          Model the immediate capital efficiency of deploying autonomous systems for your manual workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Controls */}
        <div className="flex flex-col gap-10 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-white/70">Monthly Manual Hours</label>
              <span className="font-mono text-sm text-glow-cyan">{hours} hrs</span>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="h-1.5 w-full appearance-none rounded-full bg-white/10 accent-glow-cyan outline-none"
              style={{
                background: `linear-gradient(to right, #D8EFEA ${(hours / 1000) * 100}%, rgba(255,255,255,0.1) ${(hours / 1000) * 100}%)`,
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-white/70">Hourly Operator Rate</label>
              <span className="font-mono text-sm text-glow-cyan">${rate}/hr</span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              step="5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="h-1.5 w-full appearance-none rounded-full bg-white/10 accent-glow-cyan outline-none"
              style={{
                background: `linear-gradient(to right, #D8EFEA ${((rate - 20) / 180) * 100}%, rgba(255,255,255,0.1) ${((rate - 20) / 180) * 100}%)`,
              }}
            />
          </div>
        </div>

        {/* Results & Sparkline */}
        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-white/40">Hours Saved / Yr</div>
              <div className="mt-2 font-display text-4xl font-medium tracking-tight text-white">
                {hoursSavedPerYear.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-white/40">Capital Reclaimed</div>
              <div className="mt-2 font-display text-4xl font-medium tracking-tight text-glow-cyan">
                ${annualCapitalReclaimed.toLocaleString()}
              </div>
            </div>
            <div className="col-span-2 mt-4">
              <div className="flex items-center gap-4">
                <div className="text-xs font-medium uppercase tracking-wider text-white/40">Payback Period</div>
                <div className="inline-flex items-center rounded-full border border-glow-violet/30 bg-glow-violet/10 px-3 py-1 text-sm font-medium text-glow-violet">
                  ~{paybackMonths} months
                </div>
              </div>
            </div>
          </div>

          {/* Animated Sparkline */}
          <div className="mt-12 h-[120px] w-full border-b border-l border-white/10 relative">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
              <path
                d={pathD}
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                className="transition-all duration-700 ease-out"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D8EFEA" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#D8EFEA" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute -bottom-6 left-0 text-[10px] text-white/30">Now</div>
            <div className="absolute -bottom-6 right-0 text-[10px] text-white/30">Year 1</div>
          </div>
        </div>
      </div>
    </section>
  );
}
