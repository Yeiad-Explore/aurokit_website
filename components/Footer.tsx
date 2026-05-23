"use client";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] px-6 pt-20 pb-10 md:px-10">
      {/* Oversized wordmark */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[-22%] flex justify-center select-none">
        <span
          aria-hidden
          className="font-display text-[22vw] font-medium leading-none tracking-[-0.06em]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.0) 75%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          aurokit
        </span>
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <a href="#top" className="flex items-center gap-2">
              <span className="relative inline-block h-[16px] w-[16px]">
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-glow-mist via-glow-cyan to-glow-violet opacity-90" />
                <span className="absolute inset-[2px] rounded-full bg-ink-base" />
                <span className="absolute inset-[5px] rounded-full bg-gradient-to-br from-white to-glow-mist" />
              </span>
              <span className="font-display text-[15px] font-medium tracking-tight text-white">
                aurokit<span className="text-white/45">.ai</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-[13.5px] leading-[1.6] text-white/55">
              A small studio building AI automation systems for operators. Vendor-neutral,
              evidence-led, deeply embedded.
            </p>

            <div className="mt-6 flex items-center gap-2">
              <span className="node-dot" />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/55">
                Currently online · Bangalore · 22:14 IST
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-4">
            <Col title="Studio">
              <FLink>About</FLink>
              <FLink>Method</FLink>
              <FLink>Careers</FLink>
              <FLink>Press</FLink>
            </Col>
            <Col title="Work">
              <FLink>Case studies</FLink>
              <FLink>Patterns</FLink>
              <FLink>Eval reports</FLink>
            </Col>
            <Col title="Resources">
              <FLink>Field notes</FLink>
              <FLink>Diagnostic guide</FLink>
              <FLink>Brand kit</FLink>
            </Col>
            <Col title="Contact">
              <FLink>hello@aurokit.ai</FLink>
              <FLink>X / Twitter</FLink>
              <FLink>LinkedIn</FLink>
            </Col>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.06] pt-6 font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/40 md:flex-row md:items-center md:justify-between">
          <div>© 2026 Aurokit Systems Pvt. Ltd. · All rights reserved.</div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>v04.2.1</span>
            <a href="#" className="hover:text-white/70">Privacy</a>
            <a href="#" className="hover:text-white/70">Terms</a>
            <a href="#" className="hover:text-white/70">Status · 100%</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/40">{title}</div>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FLink({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <a
        href="#"
        className="group inline-flex items-center gap-1 text-[13.5px] tracking-tight text-white/70 transition-colors hover:text-white"
      >
        {children}
        <span className="inline-block translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
          →
        </span>
      </a>
    </li>
  );
}
