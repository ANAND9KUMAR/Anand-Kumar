import SectionWrapper from "./SectionWrapper";
import { Code2, Zap, Smartphone, Palette } from "lucide-react";

const highlights = [
  { icon: Code2, title: "Modern Stack Expertise", desc: "Expertise in React, Node, and TypeScript ecosystems." },
  { icon: Zap, title: "Performance Engineering", desc: "Specializing in load speed and runtime optimizations." },
  { icon: Smartphone, title: "Cross-Platform Precision", desc: "Experience in building fluid, pixel-perfect mobile-first apps." },
  { icon: Palette, title: "Architectural Integrity", desc: "Committed to clean, maintainable, and scalable codebases." },
];

const AboutSection = () => (
  <SectionWrapper id="about">
    <div className="max-w-4xl mx-auto">
      <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-8">
        Professional <span className="gradient-text">Overview</span>
      </h2>
      <p className="text-xl text-muted-foreground text-center mb-16 leading-relaxed">
        Software Engineer dedicated to building next-generation digital products.
        I bridge the gap between <span className="text-white font-medium">complex engineering</span> and <span className="text-white font-medium">intuitive user experiences</span>.
        Based in India, I focus on delivering high-impact solutions for startups and enterprises globally.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {highlights.map((h, i) => (
          <div key={i} className="relative p-[1px] rounded-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 group-hover:from-white/40 group-hover:via-accent/40 group-hover:to-accent/80 transition-all duration-500" />
            
            <div className="relative glass-card bg-card/90 p-8 flex flex-col h-full rounded-xl w-full">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-6 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:text-primary-foreground transition-all duration-500 shadow-inner group-hover:shadow-[0_0_20px_hsla(var(--accent)/0.5)]">
                <h.icon size={28} />
              </div>
              
              <h3 className="font-display text-xl font-bold mb-3 tracking-wide text-white/90 group-hover:text-white transition-colors duration-300">
                {h.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {h.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default AboutSection;
