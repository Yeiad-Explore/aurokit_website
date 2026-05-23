"use client";

import GlassCard from "./GlassCard";

type Case = {
  client: string;
  sector: string;
  headline: string;
  body: string;
  metric: { value: string; label: string };
  tags: string[];
  visual: React.ReactNode;
};

const CASES: Case[] = [
  {
    client: "Halcyon Press",
    sector: "Publishing",
    headline: "Editorial intake, end to end.",
    body:
      "Three-agent pipeline ingests submissions, fact-checks, and routes to the right desk. Lead editors reclaimed an estimated two days per week.",
    metric: { value: "11.4×", label: "submissions processed / FTE" },
    tags: ["Multi-agent", "Webhook fanout", "Eval harness"],
    visual: <PathVisual />,
  },
  {
    client: "Karst Logistics",
    sector: "Operations",
    headline: "BOL parsing that doesn&apos;t miss.",
    body:
      "OCR + structured extraction across 14 carrier formats, with a human-in-the-loop checkpoint above a confidence threshold. Exceptions, not pages, get reviewed.",
    metric: { value: "0.41%", label: "exception rate, down from 6.8" },
    tags: ["OCR", "RAG", "HITL"],
    visual: <BarsVisual />,
  },
  {
    client: "Vector Studio",
    sector: "Creative agency",
    headline: "An internal copilot that actually knows the brand.",
    body:
      "Grounded copilot indexed against twelve years of style guides, brand decks, and approved copy. Citations on every answer; PII redacted at the edge.",
    metric: { value: "94%", label: "answers cite original source" },
    tags: ["RAG", "Citations", "PII guardrail"],
    visual: <RingVisual />,
  },
];

export default function Showcase() {
  return (
    <section
      id="showcase"
      className="relative px-6 py-32 md:px-10 md:py-40"
    >
      <div className="relative mx-auto max-w-[1280px]">
        <div className="mb-16 grid items-end gap-8 md:mb-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="eyebrow"><span className="dot" />Selected work</span>
            <h2 className="mt-5 font-display text-[36px] font-medium leading-[1.05] tracking-tighter text-white sm:text-[46px] md:text-[58px]">
              Quiet systems doing
              <br />
              <span className="font-serif italic font-normal text-chromatic">very loud work.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pl-10">
            <p className="text-[14.5px] leading-[1.6] text-white/55">
              We work with small, motivated teams. Most engagements are under NDA; below is a
              sampling of the patterns we&apos;ve shipped most recently.
            </p>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-12">
          {/* Featured */}
          <GlassCard className="lg:col-span-7 p-7 md:p-10">
            <Case data={CASES[0]} large />
          </GlassCard>

          <div className="grid gap-3 lg:col-span-5">
            <GlassCard className="p-6 md:p-7"><Case data={CASES[1]} /></GlassCard>
            <GlassCard className="p-6 md:p-7"><Case data={CASES[2]} /></GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function Case({ data, large = false }: { data: Case; large?: boolean }) {
  return (
    <div className={`flex h-full flex-col ${large ? "gap-8" : "gap-5"}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/45">
            {data.sector}
          </div>
          <div className="mt-1 font-display text-[15px] tracking-tight text-white/80">
            {data.client}
          </div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-white/55">
          Case · 24
        </div>
      </div>

      <div className={`${large ? "max-w-[520px]" : ""}`}>
        <h3
          className={`font-display font-medium tracking-tight text-white ${
            large ? "text-[28px] leading-[1.1] md:text-[34px]" : "text-[19px] leading-[1.18]"
          }`}
          dangerouslySetInnerHTML={{ __html: data.headline }}
        />
        <p
          className={`mt-3 text-white/55 ${
            large ? "text-[14.5px] leading-[1.6]" : "text-[13.5px] leading-[1.55]"
          }`}
          dangerouslySetInnerHTML={{ __html: data.body }}
        />
      </div>

      {large && (
        <div className="my-2 flex h-[180px] w-full items-center justify-center rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.025] to-transparent">
          {data.visual}
        </div>
      )}

      <div className="mt-auto grid grid-cols-3 items-end gap-6 border-t border-white/[0.06] pt-5">
        <div className="col-span-2">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/45">
            outcome
          </div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className={`tabular font-display font-medium tracking-tightest text-white ${
              large ? "text-[44px]" : "text-[30px]"
            }`}>
              {data.metric.value}
            </span>
          </div>
          <div className="mt-1 text-[12.5px] text-white/55">{data.metric.label}</div>
        </div>
        <div className="col-span-1 flex flex-wrap justify-end gap-1.5">
          {data.tags.slice(0, large ? 3 : 2).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.035] px-2 py-1 font-mono text-[10px] text-white/65"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- visuals ---------- */

function PathVisual() {
  return (
    <svg viewBox="0 0 560 160" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="lg1" x1="0" x2="1">
          <stop offset="0%" stopColor="rgba(216,239,234,0.05)" />
          <stop offset="50%" stopColor="rgba(216,239,234,0.85)" />
          <stop offset="100%" stopColor="rgba(199,182,230,0.85)" />
        </linearGradient>
      </defs>
      {/* grid */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={i} x1={i * 40} y1="0" x2={i * 40} y2="160" stroke="rgba(255,255,255,0.04)" />
      ))}
      {/* path */}
      <path
        d="M10 110 C 80 110, 110 50, 180 50 C 240 50, 260 130, 320 130 C 380 130, 410 60, 470 60 C 510 60, 530 90, 550 80"
        stroke="url(#lg1)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* nodes */}
      {[
        [10, 110],
        [180, 50],
        [320, 130],
        [470, 60],
        [550, 80],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="2.4" fill="rgba(221,235,225,0.95)" />
          <circle cx={x} cy={y} r="9" fill="none" stroke="rgba(221,235,225,0.18)" />
        </g>
      ))}
      {/* labels */}
      <g fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(255,255,255,0.45)">
        <text x="14" y="128">intake</text>
        <text x="170" y="38">classify</text>
        <text x="304" y="148">factcheck</text>
        <text x="450" y="48">route</text>
        <text x="520" y="100">deliver</text>
      </g>
    </svg>
  );
}

function BarsVisual() {
  const bars = [12, 18, 22, 14, 28, 19, 24, 16, 30, 21];
  return (
    <svg viewBox="0 0 180 60" className="h-full w-full" aria-hidden>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 16 + 6}
          y={60 - h}
          width="9"
          height={h}
          rx="2"
          fill="rgba(221,235,225,0.8)"
          opacity={0.4 + i * 0.06}
        />
      ))}
    </svg>
  );
}

function RingVisual() {
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden>
      <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.10)" strokeWidth="2" fill="none" />
      <circle
        cx="40"
        cy="40"
        r="32"
        stroke="rgba(221,235,225,0.95)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="201"
        strokeDashoffset="12"
        transform="rotate(-90 40 40)"
        fill="none"
      />
    </svg>
  );
}
