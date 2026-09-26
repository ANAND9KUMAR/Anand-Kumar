import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Automation", href: "#automation" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-50 px-4 pointer-events-none"
    >
      <div
        className={`max-w-5xl mx-auto rounded-full transition-all duration-500 pointer-events-auto border ${scrolled
          ? "bg-black/40 backdrop-blur-xl border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] py-3 px-6"
          : "bg-transparent border-transparent py-4 px-8"
          } flex items-center justify-between`}
      >
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-display font-extrabold text-2xl tracking-[0.2em] text-white">
            ANAND
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              {link.label}
              <motion.span
                className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                layoutId="nav-hover"
              />
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
            }}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/60 hover:text-white transition-all mx-2"
            title="Open Command Palette (⌘K / Ctrl+K)"
            aria-label="Open Command Palette"
          >
            <Search size={13} className="text-accent" />
            <span className="text-[11px] font-medium">Quick Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono text-white/50 border border-white/10">⌘K</kbd>
          </button>
          <div className="w-[1px] h-4 bg-white/10 mx-1" />
          <a
            href="#contact"
            className="text-xs font-bold bg-white text-black px-8 py-3 rounded-full hover:bg-white/90 transition-all transform hover:scale-105 active:scale-95 uppercase tracking-widest"
          >
            Connect
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="md:hidden absolute top-full left-4 right-4 mt-4 p-4 rounded-3xl bg-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl pointer-events-auto"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-6 py-4 rounded-2xl text-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 text-center bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all active:scale-[0.98] uppercase tracking-wider"
              >
                Connect
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
