import { motion } from "framer-motion";
import { ArrowDown, Download, Terminal, Copy, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const useTypewriter = (text: string, speed = 100, delay = 1000) => {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setIsDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, isDone };
};

const HeroSection = () => {
  const { displayed: name, isDone: nameDone } = useTypewriter("Anand Kumar", 150, 1000);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Trending Live Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-2 shadow-[0_0_25px_rgba(74,222,128,0.15)] group hover:border-accent/40 transition-all cursor-default"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-xs font-semibold text-white/90 tracking-wide flex items-center gap-1.5">
              Available for High-Scale Enterprise Projects
              <Sparkles size={12} className="text-accent" />
            </span>
          </motion.div>

          <div className="relative inline-block">
            <h1 className="font-display text-6xl md:text-9xl font-extrabold tracking-tighter leading-none mb-4 min-h-[1.2em]">
              <span className="relative inline-flex items-center">
                {name.includes("Kumar") ? (
                  <>
                    <span className="text-foreground">{name.split("Kumar")[0]}</span>
                    <span className="gradient-text drop-shadow-[0_0_25px_rgba(74,222,128,0.3)]">
                      Kumar
                    </span>
                  </>
                ) : (
                  <span className="text-foreground">{name}</span>
                )}

                {/* Magical Typing Cursor */}
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className={`inline-block w-[4px] h-[0.8em] bg-primary ml-2 shadow-[0_0_15px_rgba(74,222,128,0.8)] ${nameDone ? 'hidden' : ''}`}
                />
              </span>
            </h1>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[100px] -z-10" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed">
              Software Engineer specializing in <span className="text-foreground font-medium">performant web architectures</span>.
              Engineering scalable solutions with a focus on <span className="text-foreground font-medium">user-centric design & automation</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="flex flex-wrap gap-4 justify-center pt-8"
          >
            <a
              href="#projects"
              className="glow-button group bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-semibold inline-flex items-center gap-2.5 text-base transition-all hover:gap-4 shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              Explore Portfolio
              <ArrowDown size={18} />
            </a>

            <a
              href="#automation"
              className="glass-card hover:bg-white/10 px-7 py-3.5 rounded-full font-semibold border border-white/10 hover:border-accent/40 text-white inline-flex items-center gap-2 text-base transition-all"
            >
              <Terminal size={18} className="text-accent" />
              Automation Hub
            </a>

            <a
              href="https://drive.google.com/drive/folders/1wUkAnFLyMNUGn0ZB2WKaaCpYQg1h3wS2?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card hover:bg-white/10 px-7 py-3.5 rounded-full font-semibold border border-white/10 inline-flex items-center gap-2 text-base transition-all text-white/90 hover:text-white"
            >
              Download CV <Download size={18} />
            </a>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText("ananadgupta88099@gmail.com");
                toast.success("Email copied to clipboard!", {
                  description: "ananadgupta88099@gmail.com",
                  duration: 3000
                });
              }}
              className="glass-card hover:bg-white/10 px-5 py-3.5 rounded-full font-semibold border border-white/10 inline-flex items-center gap-2 text-base transition-all text-white/70 hover:text-white"
              title="Copy Email"
              aria-label="Copy Email"
            >
              <Copy size={16} className="text-accent" />
              <span>Copy Email</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative magical elements */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh"
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [null, -100 - Math.random() * 200]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
