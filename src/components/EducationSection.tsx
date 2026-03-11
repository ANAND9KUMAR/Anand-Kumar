import SectionWrapper from "./SectionWrapper";
import { GraduationCap } from "lucide-react";

const education = [
  { degree: "B.E. Computer Science & Engineering", school: "Chandigarh University", period: "2020 – 2024" },
  { degree: "Higher Secondary", school: "SGM+2 High School", period: "" },
];

const EducationSection = () => (
  <SectionWrapper id="education">
    <div className="max-w-4xl mx-auto">
      <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16">
        Academic <span className="gradient-text">Background</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {education.map((e, i) => (
          <div key={i} className="relative p-[1px] rounded-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 group-hover:from-white/40 group-hover:via-accent/40 group-hover:to-accent/80 transition-all duration-500" />
            
            <div className="relative glass-card bg-card/90 p-8 flex flex-col h-full rounded-xl w-full shadow-inner group-hover:shadow-[0_0_20px_hsla(var(--accent)/0.5)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-transparent opacity-50 z-0 group-hover:from-accent group-hover:opacity-100 transition-all duration-500" />

              <div className="relative z-10 flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:text-primary-foreground transition-all duration-500 shadow-inner group-hover:shadow-[0_0_20px_hsla(var(--accent)/0.5)]">
                  <GraduationCap size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
                      {e.degree}
                    </h3>
                  </div>
                  <p className="text-white/70 font-medium mb-1 group-hover:text-accent/90 transition-colors">{e.school}</p>
                  {e.period && (
                    <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 bg-white/5 px-2 py-1 rounded mt-2 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                      {e.period}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default EducationSection;
