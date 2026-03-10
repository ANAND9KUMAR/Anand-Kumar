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
          <div key={i} className="glass-card p-8 group hover:border-white/20 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-transparent opacity-50" />

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <GraduationCap size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {e.degree}
                  </h3>
                </div>
                <p className="text-white/80 font-medium mb-1">{e.school}</p>
                {e.period && (
                  <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 bg-white/5 px-2 py-1 rounded mt-2">
                    {e.period}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default EducationSection;
