import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { 
  Code2, Palette, Terminal, Cpu,
  Coffee, Atom, FileJson, FileCode2, Zap, Library, Database,
  Wind, Move, Component, FileBox, MonitorSmartphone, Sparkles,
  TerminalSquare, LayoutGrid, Monitor
} from "lucide-react";

const skillGroups = [
  {
    category: "Development Core",
    icon: Code2,
    skills: [
      { name: "Java", icon: Coffee },
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
    category: "Operating Systems",
    icon: Terminal,
    skills: [
      { name: "Linux", icon: TerminalSquare },
      { name: "Windows", icon: LayoutGrid },
      { name: "macOS", icon: Monitor }
    ],
    color: "from-zinc-500/20 to-zinc-600/10"
  }
];

const SkillBadge = ({ skill, i }: { skill: { name: string; icon: any }; i: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.05 }}
    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all cursor-default group"
  >
    <skill.icon size={16} className="text-white/50 group-hover:text-primary transition-colors" />
    <span>{skill.name}</span>
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
          <div key={groupIdx} className="glass-card p-8 flex flex-col h-full hover:border-primary/40 transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-inner">
              <group.icon size={28} />
            </div>
            
            <h3 className="font-display text-xl font-bold mb-6 tracking-wide text-white/90">
              {group.category}
            </h3>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {group.skills.map((s, i) => (
                <SkillBadge key={s.name} skill={s} i={i + groupIdx * 5} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default SkillsSection;
