import { useEffect, useState, useCallback } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Sparkles,
  Briefcase,
  Code2,
  Mail,
  Phone,
  FileText,
  ExternalLink,
  Github,
  Linkedin,
  Copy,
  Terminal,
  Layers,
  GraduationCap
} from "lucide-react";
import { toast } from "sonner";

interface CommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const CommandPalette = ({
  open: controlledOpen,
  onOpenChange: setControlledOpen
}: CommandPaletteProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      if (isControlled && setControlledOpen) {
        const nextValue = typeof value === "function" ? value(open) : value;
        setControlledOpen(nextValue);
      } else {
        setInternalOpen(value);
      }
    },
    [isControlled, open, setControlledOpen]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  const navigateTo = (id: string) => {
    setOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`, {
      description: text,
      duration: 3000,
    });
    setOpen(false);
  };

  const openUrl = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search portfolio..." />
      <CommandList className="max-h-[380px] overflow-y-auto">
        <CommandEmpty>No matching command found.</CommandEmpty>

        <CommandGroup heading="⚡ Quick Navigation">
          <CommandItem onSelect={() => navigateTo("about")}>
            <Layers className="mr-2 h-4 w-4 text-accent" />
            <span>About Anand</span>
            <CommandShortcut>#about</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("skills")}>
            <Code2 className="mr-2 h-4 w-4 text-accent" />
            <span>Technical Stack</span>
            <CommandShortcut>#skills</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("automation")}>
            <Terminal className="mr-2 h-4 w-4 text-accent" />
            <span>Automation & Architecture Hub</span>
            <CommandShortcut>#automation</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("projects")}>
            <Briefcase className="mr-2 h-4 w-4 text-accent" />
            <span>Selected Projects</span>
            <CommandShortcut>#projects</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("experience")}>
            <Layers className="mr-2 h-4 w-4 text-accent" />
            <span>Work Experience</span>
            <CommandShortcut>#experience</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("education")}>
            <GraduationCap className="mr-2 h-4 w-4 text-accent" />
            <span>Academic Background</span>
            <CommandShortcut>#education</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("contact")}>
            <Mail className="mr-2 h-4 w-4 text-accent" />
            <span>Contact & Consultation</span>
            <CommandShortcut>#contact</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="🚀 Quick Actions">
          <CommandItem
            onSelect={() =>
              copyToClipboard("ananadgupta88099@gmail.com", "Email address")
            }
          >
            <Copy className="mr-2 h-4 w-4 text-primary" />
            <span>Copy Email (ananadgupta88099@gmail.com)</span>
          </CommandItem>
          <CommandItem
            onSelect={() => copyToClipboard("+919304705319", "Phone number")}
          >
            <Phone className="mr-2 h-4 w-4 text-primary" />
            <span>Copy Phone (+91 9304705319)</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              openUrl(
                "https://drive.google.com/drive/folders/1wUkAnFLyMNUGn0ZB2WKaaCpYQg1h3wS2?usp=drive_link"
              )
            }
          >
            <FileText className="mr-2 h-4 w-4 text-accent" />
            <span>Download Curriculum Vitae (CV)</span>
            <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="📁 Featured Project Demos">
          <CommandItem onSelect={() => openUrl("https://uvindia.in")}>
            <Sparkles className="mr-2 h-4 w-4 text-emerald-400" />
            <span>UVIndia Enterprise</span>
            <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
          </CommandItem>
          <CommandItem onSelect={() => openUrl("https://tridevcarcare.com/")}>
            <Sparkles className="mr-2 h-4 w-4 text-emerald-400" />
            <span>Tridev Car Care</span>
            <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
          </CommandItem>
          <CommandItem onSelect={() => openUrl("https://arudhatech.com/")}>
            <Sparkles className="mr-2 h-4 w-4 text-emerald-400" />
            <span>ArudhaTech Platform</span>
            <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
          </CommandItem>
          <CommandItem onSelect={() => openUrl("https://finace-module.vercel.app/")}>
            <Sparkles className="mr-2 h-4 w-4 text-emerald-400" />
            <span>Enterprise Finance Module</span>
            <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="🌐 Social & Verified Channels">
          <CommandItem onSelect={() => openUrl("https://github.com/ANAND9KUMAR")}>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub Profile (@ANAND9KUMAR)</span>
            <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
          </CommandItem>
          <CommandItem
            onSelect={() =>
              openUrl("https://www.linkedin.com/in/anand-kumar-3a8554213/")
            }
          >
            <Linkedin className="mr-2 h-4 w-4" />
            <span>LinkedIn Profile (Anand Kumar)</span>
            <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
