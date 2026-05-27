"use client";

import React, { useState, useEffect, useRef } from "react";

type LogEntry = {
  id: number;
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning";
};

const NODES = [
  { id: "intake", label: "Intake" },
  { id: "orchestration", label: "Orchestration" },
  { id: "eval", label: "Eval Harness" },
  { id: "dispatch", label: "Dispatch" },
];

export default function PipelineSandbox() {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string, type: "info" | "success" | "warning" = "info") => {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}.${now
      .getMilliseconds()
      .toString()
      .padStart(3, "0")}`;
    setLogs((prev) => [...prev, { id: Date.now() + Math.random(), timestamp: timeString, message, type }]);
  };

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const triggerPipeline = (triggerName: string) => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    setActiveNodeIndex(-1);
    
    addLog(`[System] Received trigger: ${triggerName}`, "info");

    let step = 0;
    const runStep = () => {
      if (step >= NODES.length) {
        setIsRunning(false);
        setActiveNodeIndex(-1);
        addLog(`[System] Pipeline completed successfully.`, "success");
        return;
      }

      setActiveNodeIndex(step);
      
      if (step === 0) {
        addLog(`[Intake] Parsing payload... confidence 0.99`, "info");
      } else if (step === 1) {
        addLog(`[Orchestration] Spawning 3 sub-agents...`, "info");
      } else if (step === 2) {
        addLog(`[Eval Harness] Validating output... PASSED`, "success");
      } else if (step === 3) {
        addLog(`[Dispatch] Executing downstream action.`, "info");
      }

      step++;
      setTimeout(runStep, 1000 + Math.random() * 500);
    };

    setTimeout(runStep, 400);
  };

  return (
    <section className="relative mx-auto max-w-[1280px] px-6 py-20 md:px-10">
      <div className="mb-12">
        <h2 className="font-display text-3xl font-medium tracking-tight text-white md:text-4xl">
          Agent Sandbox
        </h2>
        <p className="mt-4 max-w-[600px] text-[15px] leading-relaxed text-white/55">
          Trigger a live pipeline simulation to see how Aurokit orchestrates multi-agent workflows.
        </p>
      </div>

      <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-base shadow-2xl lg:flex-row">
        {/* Left Panel: Triggers */}
        <div className="flex w-full flex-col border-b border-white/10 bg-white/[0.02] p-6 lg:w-[280px] lg:border-b-0 lg:border-r">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
            Intake Triggers
          </h3>
          <div className="flex flex-col gap-3">
            {["Inbound Invoice", "Support Ticket", "PR Review"].map((trigger) => (
              <button
                key={trigger}
                onClick={() => triggerPipeline(trigger)}
                disabled={isRunning}
                className="group relative flex items-center justify-between overflow-hidden rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white disabled:opacity-50"
              >
                <span>{trigger}</span>
                <span className="text-white/30 transition-transform group-hover:translate-x-1">→</span>
              </button>
            ))}
          </div>
        </div>

        {/* Middle Panel: Visual Pipeline */}
        <div className="relative flex flex-1 items-center justify-center p-8 lg:p-12">
          {/* Ambient Glow */}
          <div
            className={`absolute inset-0 bg-gradient-to-br transition-all duration-1000 ${
              activeNodeIndex === 0 ? "from-glow-mist/20 to-transparent" :
              activeNodeIndex === 1 ? "from-glow-cyan/20 to-transparent" :
              activeNodeIndex === 2 ? "from-glow-violet/20 to-transparent" :
              activeNodeIndex === 3 ? "from-white/10 to-transparent" :
              "from-transparent to-transparent"
            }`}
          />
          
          <div className="relative z-10 flex w-full max-w-[500px] flex-col gap-6">
            {NODES.map((node, i) => {
              const isActive = activeNodeIndex === i;
              const isPast = activeNodeIndex > i && activeNodeIndex !== -1;
              
              return (
                <div key={node.id} className="relative flex items-center gap-4">
                  {/* Connecting Line */}
                  {i < NODES.length - 1 && (
                    <div className="absolute left-[19px] top-[40px] h-[36px] w-[2px] bg-white/10">
                      {(isActive || isPast) && (
                        <div className="h-full w-full origin-top scale-y-0 animate-[pulse-down_1s_ease-in-out_forwards] bg-gradient-to-b from-glow-cyan to-glow-violet" />
                      )}
                    </div>
                  )}

                  {/* Node Circle */}
                  <div
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                      isActive
                        ? "border-glow-cyan bg-glow-cyan/10 shadow-[0_0_20px_rgba(40,195,191,0.5)]"
                        : isPast
                        ? "border-glow-violet bg-glow-violet/20"
                        : "border-white/20 bg-black/40"
                    }`}
                  >
                    <div
                      className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                        isActive ? "bg-glow-cyan shadow-[0_0_10px_#28c3bf]" : isPast ? "bg-glow-violet" : "bg-white/30"
                      }`}
                    />
                  </div>
                  
                  {/* Node Label */}
                  <span
                    className={`text-sm font-medium transition-all duration-500 ${
                      isActive ? "text-white" : isPast ? "text-white/70" : "text-white/40"
                    }`}
                  >
                    {node.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Console Log */}
        <div className="flex w-full flex-col border-t border-white/10 bg-black/80 lg:w-[380px] lg:border-t-0 lg:border-l">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-2 font-mono text-[10px] text-white/40">stdout</span>
          </div>
          <div
            ref={logContainerRef}
            className="flex-1 overflow-y-auto p-4 font-mono text-[11px] leading-[1.7] text-white/60"
            style={{ maxHeight: "360px" }}
          >
            {logs.length === 0 ? (
              <div className="text-white/20">Waiting for trigger...</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="mb-1 flex gap-3">
                  <span className="shrink-0 text-white/30">{log.timestamp}</span>
                  <span
                    className={
                      log.type === "success"
                        ? "text-glow-cyan"
                        : log.type === "warning"
                        ? "text-yellow-400"
                        : "text-white/80"
                    }
                  >
                    {log.message}
                  </span>
                </div>
              ))
            )}
            {isRunning && (
              <div className="mt-2 flex items-center gap-2 text-white/40">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white/60" />
                processing...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
