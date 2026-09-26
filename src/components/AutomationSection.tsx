import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import {
  Terminal,
  CheckCircle2,
  Cpu,
  Zap,
  Play,
  RotateCcw,
  Sparkles,
  GitBranch,
  Gauge,
  Workflow
} from "lucide-react";

interface PipelineStep {
  id: string;
  name: string;
  command: string;
  status: "idle" | "running" | "success";
  duration: string;
}

const INITIAL_STEPS: PipelineStep[] = [
  { id: "lint", name: "Code Quality & ESLint", command: "npm run lint", status: "success", duration: "1.2s" },
  { id: "test", name: "Vitest Automated Suites", command: "npm test (26 tests)", status: "success", duration: "2.8s" },
  { id: "build", name: "Production Optimization", command: "npm run build", status: "success", duration: "11.4s" },
  { id: "deploy", name: "Edge Deployment & Cache", command: "Cloudflare / Vercel Edge", status: "success", duration: "1.5s" },
];

const AutomationSection = () => {
  const [steps, setSteps] = useState<PipelineStep[]>(INITIAL_STEPS);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<"pipeline" | "metrics">("pipeline");

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);

    // Reset all to idle
    setSteps((prev) => prev.map((s) => ({ ...s, status: "idle" })));

    INITIAL_STEPS.forEach((step, index) => {
      // Set to running
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, i) => (i === index ? { ...s, status: "running" } : s))
        );
      }, index * 800);

      // Set to success
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, i) => (i === index ? { ...s, status: "success" } : s))
        );
        if (index === INITIAL_STEPS.length - 1) {
          setIsRunning(false);
        }
      }, (index + 1) * 800);
    });
  };

  return (
    <SectionWrapper id="automation">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_hsla(var(--accent)/0.2)]">
            <Sparkles size={14} />
            <span>Autonomous Engineering</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Architecture & <span className="gradient-text">Automation Hub</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Engineered with modern automated quality gates, continuous integration, and real-time performance telemetry.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Interactive CI/CD Pipeline Simulator (7 Cols) */}
          <div className="lg:col-span-7 relative p-[1px] rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-white/5 to-transparent rounded-2xl blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-700" />
            <div className="relative glass-card bg-card/90 p-6 md:p-8 rounded-2xl h-full flex flex-col border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shadow-[0_0_15px_hsla(var(--accent)/0.3)]">
                    <Workflow size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Live CI/CD Pipeline</h3>
                    <p className="text-xs text-muted-foreground">Automated quality checks & deployment gates</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={runSimulation}
                  disabled={isRunning}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-black hover:bg-emerald-400 disabled:opacity-50 transition-all active:scale-95 shadow-[0_0_20px_hsla(var(--accent)/0.4)]"
                >
                  {isRunning ? (
                    <>
                      <RotateCcw size={14} className="animate-spin" />
                      <span>Simulating Pipeline...</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} fill="currentColor" />
                      <span>Test Automation Pipeline</span>
                    </>
                  )}
                </button>
              </div>

              {/* Pipeline Steps Flow */}
              <div className="space-y-3.5 my-auto py-2">
                {steps.map((step, idx) => (
                  <div
                    key={step.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 ${
                      step.status === "running"
                        ? "bg-accent/10 border-accent/50 shadow-[0_0_15px_hsla(var(--accent)/0.2)]"
                        : step.status === "success"
                        ? "bg-white/5 border-white/10 hover:border-accent/30"
                        : "bg-white/[0.02] border-white/5 opacity-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono">
                        {step.status === "running" ? (
                          <div className="w-3.5 h-3.5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                        ) : step.status === "success" ? (
                          <CheckCircle2 size={18} className="text-accent" />
                        ) : (
                          <span className="text-white/30 font-bold">{idx + 1}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/90">{step.name}</p>
                        <p className="text-[11px] font-mono text-muted-foreground">{step.command}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          step.status === "running"
                            ? "bg-accent/20 text-accent"
                            : step.status === "success"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-white/5 text-white/40"
                        }`}
                      >
                        {step.status === "running" ? "Executing..." : step.status === "success" ? "Passed" : "Queued"}
                      </span>
                      <p className="text-[10px] text-white/40 font-mono mt-0.5">{step.duration}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status footer banner */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Quality Gate: Zero Lint & Build Errors
                </span>
                <span className="font-mono text-[11px] text-white/60">Automated via GitHub Actions</span>
              </div>
            </div>
          </div>

          {/* Card 2: Metrics Bento Box (5 Cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {/* Metric 1 */}
            <div className="glass-card bg-card/90 p-5 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-accent/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                <Gauge size={20} />
              </div>
              <div className="font-display text-3xl font-extrabold text-white mb-1">
                40%<span className="text-accent text-xl font-normal">+</span>
              </div>
              <p className="text-xs font-semibold text-white/90">Lighthouse Performance</p>
              <p className="text-[11px] text-muted-foreground mt-1">Core Web Vitals optimized at 60 FPS</p>
            </div>

            {/* Metric 2 */}
            <div className="glass-card bg-card/90 p-5 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-accent/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent mb-3">
                <Zap size={20} />
              </div>
              <div className="font-display text-3xl font-extrabold text-white mb-1">
                &lt;100<span className="text-accent text-xl font-normal">ms</span>
              </div>
              <p className="text-xs font-semibold text-white/90">State & UI Latency</p>
              <p className="text-[11px] text-muted-foreground mt-1">Instant reactive state with Zustand</p>
            </div>

            {/* Metric 3 */}
            <div className="glass-card bg-card/90 p-5 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-accent/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 mb-3">
                <CheckCircle2 size={20} />
              </div>
              <div className="font-display text-3xl font-extrabold text-white mb-1">
                0<span className="text-emerald-400 text-xl font-normal"> Bugs</span>
              </div>
              <p className="text-xs font-semibold text-white/90">Critical Post-Launch</p>
              <p className="text-[11px] text-muted-foreground mt-1">100% passing test assertion coverage</p>
            </div>

            {/* Metric 4 */}
            <div className="glass-card bg-card/90 p-5 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-accent/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 mb-3">
                <Cpu size={20} />
              </div>
              <div className="font-display text-3xl font-extrabold text-white mb-1">
                26<span className="text-purple-400 text-xl font-normal">/26</span>
              </div>
              <p className="text-xs font-semibold text-white/90">Vitest Test Suites</p>
              <p className="text-[11px] text-muted-foreground mt-1">Component, unit & logic tests</p>
            </div>

            {/* Full-width Terminal command card in the bento column */}
            <div className="col-span-2 glass-card bg-black/60 p-4 rounded-2xl border border-white/10 font-mono text-xs text-white/80">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Terminal size={12} className="text-accent" />
                  Automation Shell
                </span>
                <span className="text-emerald-400">● Live Ready</span>
              </div>
              <div className="space-y-1 text-[11px]">
                <p className="text-white/60">$ <span className="text-accent">npm run validate</span></p>
                <p className="text-emerald-400/90 text-[10px]">✔ ESLint passed (0 errors)</p>
                <p className="text-emerald-400/90 text-[10px]">✔ Vitest passed (9 test files)</p>
                <p className="text-emerald-400/90 text-[10px]">✔ Production bundle compiled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AutomationSection;
