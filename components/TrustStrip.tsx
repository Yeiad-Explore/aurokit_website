"use client";

const ENTITIES = [
  "Northwind Labs",
  "Helix Capital",
  "Atrium Health",
  "Beacon Robotics",
  "Lumen Industrial",
  "Vector Studio",
  "Karst Logistics",
  "Forma Foundry",
  "Halcyon Press",
  "Quora Mining",
];

export default function TrustStrip() {
  return (
    <section className="relative border-y border-white/[0.06] bg-ink-deep/40 py-10 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 md:flex-row md:items-center md:gap-10 md:px-10">
        <div className="shrink-0 md:max-w-[220px]">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/45">
            // Operators trust us
          </div>
          <div className="mt-1 text-[13.5px] tracking-tight text-white/70">
            Teams compounding output without compounding headcount.
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="marquee gap-12">
            {[...ENTITIES, ...ENTITIES].map((n, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center gap-3 font-display text-[18px] font-medium tracking-tight text-white/55"
              >
                <span className="h-1 w-1 rounded-full bg-white/30" />
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
