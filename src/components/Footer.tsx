import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-white/5 py-12 px-4 text-center">
    <div className="max-w-4xl mx-auto">
      <div className="font-display font-black text-xl tracking-[0.2em] mb-8 text-white/20 select-none">
        ANAND
      </div>
      <div className="flex justify-center gap-8 mb-10">
        {[
          { icon: Github, href: "https://github.com/ANAND9KUMAR", label: "GitHub" },
          { icon: Linkedin, href: "https://www.linkedin.com/in/anand-kumar-3a8554213/", label: "LinkedIn" },
          { icon: Mail, href: "mailto:ananadgupta88099@gmail.com", label: "Email" },
        ].map((s, i) => (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="text-white/40 hover:text-accent hover:shadow-[0_0_15px_hsla(var(--accent)/0.5)] p-2 rounded-xl hover:bg-white/5 transition-all duration-300 transform hover:scale-110"
          >
            <s.icon size={22} />
          </a>
        ))}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
        © {new Date().getFullYear()} Autonomous Architecture • Engineered by Anand Kumar
      </p>
    </div>
  </footer>
);

export default Footer;
