export interface ActionButton {
  label: string;
  url?: string;
  query?: string;
  isExternal?: boolean;
}

export interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  actions?: ActionButton[];
  timestamp: string;
}

export const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    sender: "bot",
    text: "Hi there! 👋 I am Anand Kumar's Automated AI Assistant. How can I help you today?",
    actions: [
      { label: "🚀 View Projects", query: "Show me your projects" },
      { label: "⚡ Tech Stack", query: "What are your core skills?" },
      { label: "💼 Work Experience", query: "Tell me about your experience" },
      { label: "📄 Download CV", query: "How to download resume?" },
      { label: "📬 Contact Anand", query: "How can I contact Anand?" }
    ],
    timestamp: "Just now"
  }
];

export const getBotResponse = (input: string): { text: string; actions?: ActionButton[] } => {
  const lower = input.toLowerCase().trim();

  // Greetings
  if (lower.match(/\b(hi|hello|hey|hola|namaste|greetings|sup)\b/)) {
    return {
      text: "Hello! Welcome to Anand Kumar's portfolio. I can provide details about his projects, engineering experience, tech stack, or connect you directly with him.",
      actions: [
        { label: "🚀 Top Projects", query: "Show me your projects" },
        { label: "⚡ Core Skills", query: "What are your core skills?" },
        { label: "📞 Contact Info", query: "How can I contact Anand?" }
      ]
    };
  }

  // Projects
  if (lower.includes("project") || lower.includes("work") || lower.includes("portfolio") || lower.includes("build") || lower.includes("creation")) {
    return {
      text: "Anand has engineered several high-performance enterprise applications:\n\n• **UVIndia Enterprise**: Mission-critical platform with real-time Firebase sync\n• **Tridev Car Care**: Modern automotive solutions platform\n• **ArudhaTech**: Enterprise platform for cloud & AI solutions\n• **Finance Module**: Real-time financial management system with PDF analytics",
      actions: [
        { label: "🔗 UVIndia Demo", url: "https://uvindia.in", isExternal: true },
        { label: "🔗 Tridev Car Care", url: "https://tridevcarcare.com/", isExternal: true },
        { label: "🔗 ArudhaTech", url: "https://arudhatech.com/", isExternal: true },
        { label: "🔗 Finance Module", url: "https://finace-module.vercel.app/", isExternal: true }
      ]
    };
  }

  // Skills & Technologies
  if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack") || lower.includes("framework") || lower.includes("language")) {
    return {
      text: "Here is a breakdown of Anand's core technical expertise:\n\n• **Frontend & UI**: React 18+, TypeScript, Next.js, Tailwind CSS, Framer Motion, Zustand\n• **Core & Backend**: Node.js, Java, SQL, Firebase, REST APIs, Vite\n• **Engineering Focus**: 60fps animations, Core Web Vitals optimization, scalable system architecture",
      actions: [
        { label: "🚀 View Projects", query: "Show me your projects" },
        { label: "💼 Work Experience", query: "Tell me about your experience" }
      ]
    };
  }

  // Experience / Career
  if (lower.includes("experience") || lower.includes("job") || lower.includes("career") || lower.includes("history") || lower.includes("company") || lower.includes("role")) {
    return {
      text: "Anand works as a **Software Engineering Consultant** for independent and digital agencies (2025 – Present):\n\n• Engineered modular design systems reducing development cycles by 30%\n• Delivered client platforms with zero post-launch critical bugs\n• Optimized Core Web Vitals resulting in 40% boost in Lighthouse scores\n• Built secure real-time backend integrations with Firebase & Node.js",
      actions: [
        { label: "📄 Download CV", query: "Download resume" },
        { label: "📬 Discuss an Opportunity", query: "Contact Anand" }
      ]
    };
  }

  // Resume / CV
  if (lower.includes("resume") || lower.includes("cv") || lower.includes("download") || lower.includes("biodata")) {
    return {
      text: "You can view and download Anand's complete curriculum vitae (CV) directly via Google Drive:",
      actions: [
        {
          label: "📥 Open & Download CV",
          url: "https://drive.google.com/drive/folders/1wUkAnFLyMNUGn0ZB2WKaaCpYQg1h3wS2?usp=drive_link",
          isExternal: true
        }
      ]
    };
  }

  // Contact / Hire
  if (lower.includes("contact") || lower.includes("hire") || lower.includes("email") || lower.includes("phone") || lower.includes("call") || lower.includes("reach") || lower.includes("message") || lower.includes("talk")) {
    return {
      text: "You can reach out to Anand directly through any of these verified channels:\n\n📧 **Email**: ananadgupta88099@gmail.com\n📱 **Phone**: +91 9304705319\n💼 **LinkedIn**: linkedin.com/in/anand-kumar-3a8554213\n🐙 **GitHub**: github.com/ANAND9KUMAR\n📸 **Instagram**: @kum_ar_aanand",
      actions: [
        { label: "✉️ Send Email", url: "mailto:ananadgupta88099@gmail.com", isExternal: true },
        { label: "📞 Call Anand", url: "tel:+919304705319", isExternal: true },
        { label: "🌐 LinkedIn Profile", url: "https://www.linkedin.com/in/anand-kumar-3a8554213/", isExternal: true }
      ]
    };
  }

  // About Anand
  if (lower.includes("about") || lower.includes("who") || lower.includes("anand")) {
    return {
      text: "Anand Kumar is an innovative Software Engineer based in India specializing in high-performance web architectures, modern interactive UIs, and robust enterprise solutions. He delivers clean, maintainable, and user-centric software.",
      actions: [
        { label: "🚀 View Projects", query: "Show me your projects" },
        { label: "📄 Download CV", query: "Download resume" },
        { label: "📬 Contact Anand", query: "Contact Anand" }
      ]
    };
  }

  // Fallback
  return {
    text: "Thanks for asking! I can provide automated insights about Anand's work, technical capabilities, or contact details. What would you like to explore?",
    actions: [
      { label: "🚀 Projects", query: "Show me your projects" },
      { label: "⚡ Tech Stack", query: "What are your core skills?" },
      { label: "💼 Experience", query: "Tell me about your experience" },
      { label: "📬 Contact Info", query: "How can I contact Anand?" }
    ]
  };
};
