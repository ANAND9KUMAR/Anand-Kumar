import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  ExternalLink,
  RotateCcw,
  Briefcase,
  Code2,
  Mail,
  FileText
} from "lucide-react";
import {
  type ActionButton,
  type Message,
  INITIAL_MESSAGES,
  getBotResponse
} from "@/lib/chatbotEngine";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasNewMessage(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      const response = getBotResponse(text);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.text,
        actions: response.actions,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleActionClick = (action: ActionButton) => {
    if (action.url) {
      window.open(action.url, "_blank", "noopener,noreferrer");
    } else if (action.query) {
      handleSendMessage(action.query);
    }
  };

  const resetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      <motion.button
        type="button"
        aria-label={isOpen ? "Close AI Assistant chat" : "Open AI Assistant chat"}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-accent via-emerald-400 to-primary text-black font-bold shadow-[0_0_30px_hsla(var(--accent)/0.5)] flex items-center justify-center border border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Bot size={26} />
              {hasNewMessage && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-2 border-emerald-500" />
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-20 right-0 w-[92vw] sm:w-[420px] max-h-[82vh] h-[580px] flex flex-col rounded-2xl bg-card/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden"
          >
            {/* Header */}
            <div className="relative px-5 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shadow-[0_0_15px_hsla(var(--accent)/0.3)]">
                  <Bot size={22} />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-card" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Anand's AI Assistant
                    <Sparkles size={14} className="text-accent" />
                  </h3>
                  <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Automated & Online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={resetChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scroll-smooth">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.sender === "bot" && (
                    <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/30 text-accent flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={15} />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs md:text-sm leading-relaxed ${
                      m.sender === "user"
                        ? "bg-gradient-to-r from-accent to-emerald-500 text-black font-medium shadow-md ml-4"
                        : "bg-white/5 border border-white/10 text-white/90 shadow-inner"
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>

                    {/* Action buttons embedded in message */}
                    {m.actions && m.actions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {m.actions.map((act, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleActionClick(act)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/10 hover:bg-accent/20 hover:text-accent border border-white/10 hover:border-accent/40 text-white/90 transition-all active:scale-95"
                          >
                            <span>{act.label}</span>
                            {act.isExternal && <ExternalLink size={11} className="opacity-70" />}
                          </button>
                        ))}
                      </div>
                    )}

                    <div
                      className={`text-[9px] mt-1.5 ${
                        m.sender === "user" ? "text-black/60 text-right" : "text-white/40"
                      }`}
                    >
                      {m.timestamp}
                    </div>
                  </div>

                  {m.sender === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <User size={15} />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3 justify-start items-center text-white/50 text-xs">
                  <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/30 text-accent flex items-center justify-center shrink-0">
                    <Bot size={15} />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Automation Suggestions */}
            <div className="px-4 py-2 bg-black/30 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => handleSendMessage("Show me your projects")}
                className="whitespace-nowrap flex items-center gap-1 text-[11px] text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full border border-white/5 transition-colors"
              >
                <Briefcase size={11} className="text-accent" />
                Projects
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage("What are your core skills?")}
                className="whitespace-nowrap flex items-center gap-1 text-[11px] text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full border border-white/5 transition-colors"
              >
                <Code2 size={11} className="text-accent" />
                Skills
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage("How can I contact Anand?")}
                className="whitespace-nowrap flex items-center gap-1 text-[11px] text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full border border-white/5 transition-colors"
              >
                <Mail size={11} className="text-accent" />
                Contact
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage("Download resume")}
                className="whitespace-nowrap flex items-center gap-1 text-[11px] text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full border border-white/5 transition-colors"
              >
                <FileText size={11} className="text-accent" />
                CV
              </button>
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-white/10 bg-white/5 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about projects, skills, contact..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs md:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
                className="w-9 h-9 rounded-xl bg-accent text-black font-semibold flex items-center justify-center hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-accent transition-all active:scale-95 shrink-0"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
