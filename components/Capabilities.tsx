"use client";

import GlassCard from "./GlassCard";

type Cap = {
  tag: string;
  title: string;
  body: string;
  bullets: string[];
  glyph: React.ReactNode;
};

const CAPS: Cap[] = [
  {
    tag: "01 / Orchestration",
    title: "Multi-agent operations.",
    body:
      "Specialist agents that hand off context cleanly — routing, retries, evals, observability built in.",
    bullets: ["Tool routing", "Eval harness", "Trace replay"],
    glyph: <OrbitGlyph />,
  },
  {
    tag: "02 / Pipelines",
    title: "Back-office on autopilot.",
    body:
      "Document ingestion, enrichment, and decisioning that runs against your stack — Slack, Notion, Linear, your DB.",
    bullets: ["OCR & parse", "Webhook fanout", "Audit log"],
    glyph: <FlowGlyph />,
  },
  {
    tag: "03 / Copilots",
    title: "In-context assistants.",
    body:
      "Embedded copilots for sales, support, and internal teams — grounded in your data, not the open web.",
    bullets: ["RAG over your corpus", "PII redaction", "Citations"],
    glyph: <ChatGlyph />,
  },
  {
    tag: "04 / Infra",
    title: "Model-agnostic stack.",
    body:
      "We pick the model that fits the task — Claude, GPT, open-weights — and swap when economics shift.",
    bullets: ["Vendor neutral", "Cost guardrails", "Latency budgets"],
    glyph: <ChipGlyph />,
  },
  {
    tag: "05 / Evaluation",
    title: "Quality you can measure.",
    body:
      "Continuous evals on real traffic. Regressions surface before they hit your customers.",
    bullets: ["Golden set", "LLM-as-judge", "Drift alerts"],
    glyph: <GraphGlyph />,
  },
  {
    tag: "06 / Handoff",
    title: "Yours to run, or ours.",
    body:
      "Ship to your repo with documentation and runbooks — or stay on retainer and let us operate it.",
    bullets: ["Repo + runbooks", "Oncall optional", "Versioned"],
    glyph: <HandoffGlyph />,
  },
];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative px-6 py-32 md:px-10 md:py-40"
    >
      <div className="relative mx-auto max-w-[1280px]">
        <div className="bloom-tr opacity-50" />

        <div className="reveal mb-16 grid items-end gap-8 md:mb-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="eyebrow"><span className="dot" />Capabilities</span>
            <h2 className="mt-5 font-display text-[36px] font-medium leading-[1.05] tracking-tighter text-white sm:text-[46px] md:text-[58px]">
              A focused surface area.
              <br />
              <span className="text-white/45">Six things we do </span>
              <span className="font-serif italic font-normal text-chromatic">very well.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pl-10">
            <p className="text-[14.5px] leading-[1.6] text-white/55">
              We&apos;re not a platform. We&apos;re a small studio that builds bespoke AI systems
              for operators who already know what should be automated — and a sparring partner for
              those still figuring it out.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CAPS.map((c, i) => (
            <GlassCard
              key={i}
              className="reveal group flex h-full flex-col p-6 md:p-7"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/45">
                  {c.tag}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                  {c.glyph}
                </div>
              </div>

              <h3 className="mt-7 font-display text-[20px] font-medium leading-[1.15] tracking-tight text-white md:text-[22px]">
                {c.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-[1.55] text-white/55">{c.body}</p>

              <div className="mt-7 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-5">
                {c.bullets.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10.5px] tracking-tight text-white/70"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- glyphs ---------- */

function OrbitGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7.2" stroke="rgba(255,255,255,0.85)" strokeWidth="0.9" />
      <ellipse cx="10" cy="10" rx="7.2" ry="3" stroke="rgba(255,255,255,0.5)" strokeWidth="0.9" />
      <circle cx="10" cy="10" r="1.6" fill="rgba(221,235,225,0.95)" />
    </svg>
  );
}
function FlowGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="4" cy="5" r="1.6" fill="rgba(221,235,225,0.95)" />
      <circle cx="16" cy="5" r="1.6" stroke="rgba(255,255,255,0.85)" strokeWidth="0.9" />
      <circle cx="10" cy="15" r="1.6" stroke="rgba(255,255,255,0.85)" strokeWidth="0.9" />
      <path d="M5 6 Q10 8 9.4 13.6" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9" fill="none" />
      <path d="M15 6 Q10 8 10.6 13.6" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9" fill="none" />
    </svg>
  );
}
function ChatGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3" y="4" width="14" height="9" rx="2" stroke="rgba(255,255,255,0.85)" strokeWidth="0.9" />
      <path d="M7 13 L7 16 L10.5 13" stroke="rgba(255,255,255,0.85)" strokeWidth="0.9" strokeLinejoin="round" fill="none" />
      <circle cx="7.5" cy="8.5" r="0.9" fill="rgba(221,235,225,0.9)" />
      <circle cx="10" cy="8.5" r="0.9" fill="rgba(199,182,230,0.9)" />
      <circle cx="12.5" cy="8.5" r="0.9" fill="rgba(216,239,234,0.9)" />
    </svg>
  );
}
function ChipGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="5" y="5" width="10" height="10" rx="1.5" stroke="rgba(255,255,255,0.85)" strokeWidth="0.9" />
      <rect x="7.5" y="7.5" width="5" height="5" stroke="rgba(221,235,225,0.9)" strokeWidth="0.9" />
      {[3, 7, 10, 13, 17].map((y) =>
        [3, 17].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.6" fill="rgba(255,255,255,0.6)" />)
      )}
    </svg>
  );
}
function GraphGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3 15 L7 10 L11 12 L17 4" stroke="rgba(221,235,225,0.95)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="3" y1="17" x2="17" y2="17" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />
      <circle cx="11" cy="12" r="1.1" fill="rgba(221,235,225,0.95)" />
    </svg>
  );
}
function HandoffGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3 10 L13 10" stroke="rgba(255,255,255,0.85)" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M10 7 L13 10 L10 13" stroke="rgba(255,255,255,0.85)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="16" cy="10" r="1.6" fill="rgba(221,235,225,0.95)" />
    </svg>
  );
}
