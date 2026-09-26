import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Sparkles, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "UVIndia Enterprise",
    category: "Full-Stack Development",
    filterKey: "fullstack",
    desc: "A mission-critical enterprise platform with complex state management and real-time backend synchronization.",
    tech: ["React 18", "Query", "Firebase", "Optimization"],
    demo: "https://uvindia.in",
    status: "Live in Production",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
  },
  {
    title: "Tridev Car Care",
    category: "Web Development",
    filterKey: "web",
    desc: "A modern platform for premium car care services, detailing, and automotive solutions.",
    tech: ["React", "Tailwind", "Motion", "Architecture"],
    demo: "https://tridevcarcare.com/",
    status: "Live Platform",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10"
  },
  {
    title: "ArudhaTech",
    category: "Full-Stack & Cloud",
    filterKey: "fullstack",
    desc: "A comprehensive digital enterprise platform offering web & mobile development, cloud architecture, and AI solutions.",
    tech: ["React", "Next.js", "Node.js", "Cloud"],
    demo: "https://arudhatech.com/",
    status: "Enterprise Scale",
    badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10"
  },
  {
    title: "Finance Module",
    category: "FinTech & Enterprise",
    filterKey: "fintech",
    desc: "An enterprise financial management system featuring real-time transaction tracking, reporting analytics, and automated document exports.",
    tech: ["React", "Node.js", "Tailwind", "PDF Export"],
    demo: "https://finace-module.vercel.app/",
    status: "FinTech Suite",
    badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10"
  },
];

const FILTERS = [
  { key: "all", label: "All Projects" },
  { key: "fullstack", label: "Full-Stack & Cloud" },
  { key: "web", label: "Web Apps" },
  { key: "fintech", label: "FinTech" },
];

const ProjectsSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredProjects = selectedFilter === "all"
    ? projects
    : projects.filter((p) => p.filterKey === selectedFilter);

  return (
    <SectionWrapper id="projects">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/80 mb-3">
              <Sparkles size={13} className="text-accent" />
              <span>Engineered Systems</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Selected <span className="gradient-text">Creations</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              A showcase of engineering excellence and creative problem-solving across diverse industries.
            </p>
          </div>

          {/* Trending Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setSelectedFilter(f.key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  selectedFilter === f.key
                    ? "bg-accent text-black shadow-[0_0_15px_hsla(var(--accent)/0.4)]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Projects Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative p-[1px] rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-500"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                {/* Animated Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 group-hover:from-white/40 group-hover:via-accent/40 group-hover:to-accent/80 transition-all duration-500" />

                <div className="relative glass-card bg-card/90 p-8 h-full flex flex-col rounded-2xl overflow-hidden shadow-inner group-hover:shadow-[0_0_25px_hsla(var(--accent)/0.3)]">
                  <div className="flex justify-between items-start mb-6 z-10 relative">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary py-1 px-3 bg-primary/10 rounded-full group-hover:bg-accent/20 group-hover:text-accent transition-colors">
                        {p.category}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider py-0.5 px-2.5 rounded-full border ${p.badgeColor} flex items-center gap-1`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        {p.status}
                      </span>
                    </div>

                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${p.title}`}
                      className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent hover:text-black transition-all duration-300 transform group-hover:scale-105 shadow-inner hover:shadow-[0_0_20px_hsla(var(--accent)/0.6)]"
                    >
                      <ArrowUpRight size={20} />
                    </a>
                  </div>

                  <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-white transition-colors z-10 relative">
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground mb-8 line-clamp-2 leading-relaxed z-10 relative">
                    {p.desc}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 z-10 relative pt-4 border-t border-white/5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-bold uppercase tracking-wider text-white/50 px-3 py-1 bg-white/5 rounded-md border border-white/5 group-hover:border-accent/30 group-hover:text-white/90 transition-all"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
