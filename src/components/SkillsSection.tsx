import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import {
  Code2, Palette, Terminal, Cpu,
  Coffee, Atom, FileJson, FileCode2, Zap, Library, Database,
  Wind, Move, Component, FileBox, MonitorSmartphone, Sparkles,
  TerminalSquare, LayoutGrid, Monitor, GitBranch, Github, Wrench
} from "lucide-react";

const skillGroups = [
  {
    category: "Development Core",
    icon: Code2,
    skills: [
      { name: "Java", icon: Coffee },
      { name: "SQL", icon: Database },
      { name: "React 18+", icon: Atom },
      { name: "TypeScript", icon: FileJson },
      { name: "JavaScript", icon: FileCode2 },
      { name: "Vite", icon: Zap },
      { name: "Zustand", icon: Library },
      { name: "React Query", icon: Database }
    ],
    color: "from-white/10 to-white/5"
  },
  {
    category: "Styling & UI",
    icon: Palette,
    skills: [
      { name: "Tailwind CSS", icon: Wind },
      { name: "Framer Motion", icon: Move },
      { name: "Shadcn UI", icon: Component },
      { name: "CSS Modules", icon: FileBox },
      { name: "Responsive Design", icon: MonitorSmartphone },
      { name: "Aesthetics", icon: Sparkles }
    ],
    color: "from-green-500/20 to-emerald-500/10"
  },
  {
    category: "Tools & Systems",
    icon: Wrench,
    skills: [
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: Github },
      { name: "VS Code", icon: Code2 },
      { name: "Linux", icon: TerminalSquare },
      { name: "Windows", icon: LayoutGrid },
      { name: "macOS", icon: Monitor }
    ]
  }
];

const SkillBadge = ({ skill, i }: { skill: { name: string; icon: any }; i: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.05 }}
    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-accent/10 hover:border-accent/40 shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_15px_hsla(var(--accent)/0.3)] transition-all duration-300 cursor-default group relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-primary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <skill.icon size={16} className="text-white/60 group-hover:text-accent relative z-10 transition-colors duration-300" />
    <span className="text-white/80 group-hover:text-white relative z-10 transition-colors duration-300">{skill.name}</span>
  </motion.div>
);

const SkillsSection = () => (
  <SectionWrapper id="skills">
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col items-center justify-center mb-16">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-glow">
          <Cpu size={32} />
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center">
          Technical <span className="gradient-text">Stack</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="relative p-[1px] rounded-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 group-hover:from-white/40 group-hover:via-accent/40 group-hover:to-accent/80 transition-all duration-500" />
            
            <div className="relative glass-card bg-card/90 p-8 flex flex-col h-full rounded-xl w-full">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-8 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:text-primary-foreground transition-all duration-500 shadow-inner group-hover:shadow-[0_0_20px_hsla(var(--accent)/0.5)]">
                <group.icon size={28} />
              </div>

              <h3 className="font-display text-xl font-bold mb-6 tracking-wide text-white/90 group-hover:text-white transition-colors duration-300">
                {group.category}
              </h3>

              <div className="flex flex-wrap gap-2 mt-6">
                {group.skills.map((s, i) => (
                  <SkillBadge key={s.name} skill={s} i={i + groupIdx * 5} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default SkillsSection;
