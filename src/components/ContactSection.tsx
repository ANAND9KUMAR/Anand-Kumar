import SectionWrapper from "./SectionWrapper";
import { Mail, Phone, Github, Linkedin, Instagram, Twitter, InstagramIcon } from "lucide-react";
import { motion } from "framer-motion";

const contacts = [
  { icon: Mail, label: "Direct Inquiry", value: "ananadgupta88099@gmail.com", href: "mailto:ananadgupta88099@gmail.com" },
  { icon: Linkedin, label: "Professional Profile", value: "Anand Kumar", href: "https://www.linkedin.com/in/anand-kumar-3a8554213/" },
  { icon: Github, label: "Technical Workspace", value: "Anand Kumar", href: "https://github.com/ANAND9KUMAR" },
  { icon: Instagram, label: "Social Media", value: "kum_ar_aanand", href: "https://www.instagram.com/kum_ar_aanand/" },
  { icon: Phone, label: "Direct Consultation", value: "+91 9304705319", href: "tel:+919304705319" },
  
  { icon: Twitter, label: "Social Media", value: "", href: "" },
];

const ContactSection = () => (
  <SectionWrapper id="contact">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
          Start a <span className="gradient-text">Conversation</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Currently open to new opportunities and collaborations. I'm usually responsive within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {contacts.map((c, i) => (
          <motion.a
            key={i}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group glass-card p-6 flex items-center gap-6 hover:border-primary/40 transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-inner">
              <c.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-1">{c.label}</p>
              <p className="text-lg font-bold tracking-tight text-white/90 group-hover:text-white">{c.value}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default ContactSection;
