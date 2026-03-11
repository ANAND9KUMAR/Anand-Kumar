import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-white/5 py-12 px-4 text-center">
    <div className="max-w-4xl mx-auto">
      <div className="font-display font-black text-xl tracking-[0.2em] mb-8 text-white/20 select-none">
        ANAND
      </div>
      <div className="flex justify-center gap-8 mb-10">
        {[
          { icon: Github, href: "#" },
          { icon: Linkedin, href: "#" },
          { icon: Mail, href: "mailto:contact@anand.dev" },
        ].map((s, i) => (
          <a key={i} href={s.href} className="text-white/40 hover:text-primary transition-all duration-300 transform hover:scale-110">
            <s.icon size={22} />
          </a>
        ))}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
        © 2022 Engineering Excellence • Developed by Anand
      </p>
    </div>
  </footer>
);

export default Footer;
