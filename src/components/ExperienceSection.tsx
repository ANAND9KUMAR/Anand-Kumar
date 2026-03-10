import SectionWrapper from "./SectionWrapper";
import { Briefcase, CheckCircle } from "lucide-react";

const experience = [
  {
    role: "Software Engineering Consultant",
    company: "Independent / Digital Agencies",
    period: "2025 – Present",
    desc: "Advised and developed high-scale web solutions for diverse clients, focusing on architectural integrity and performant frontend ecosystems.",
    achievements: [
      "Engineered comprehensive design systems reducing development time by 30%.",
      "Successfully launched the digital presence for UVIndia and SEPL with zero post-launch critical bugs.",
      "Optimized Core Web Vitals resulting in a 40% improvement in lighthouse performance scores.",
      "Implemented highly secure Firebase backend integration for real-time data handling."
    ]
  }
];

const ExperienceSection = () => (
  <SectionWrapper id="experience">
    <div className="max-w-4xl mx-auto">
      <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16">
        Professional <span className="gradient-text">History</span>
      </h2>

      <div className="space-y-8">
        {experience.map((exp, i) => (
          <div key={i} className="glass-card p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-10 bottom-0 w-[1px] bg-white/5 hidden md:block" />

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <Briefcase size={28} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{exp.role}</h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                </div>
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] bg-white/5 px-4 py-2 rounded-full border border-white/10 text-white/40">
                {exp.period}
              </span>
            </div>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed italic border-l-2 border-primary/30 pl-6">
              "{exp.desc}"
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exp.achievements.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-transparent hover:border-white/10 transition-all">
                  <CheckCircle size={18} className="text-primary mt-1 shrink-0" />
                  <p className="text-sm text-white/70 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default ExperienceSection;
