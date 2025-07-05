
import React, { useRef, useState } from "react";
import { Send } from "lucide-react";

const sampleMessages = [
  {
    id: 1,
    text: "💥 yo alex! yesterday u spent €30 on food. net + €383. balance: €1,240.",
    side: "left",
  },
  {
    id: 2,
    text: "☕ skip the café today—brew at home & save €3 bestie!",
    side: "right",
  },
];

const quickActions = [
  { label: "💰 balance check" },
  { label: "🚀 earn tip" },
  { label: "🍝 log expense" },
];

const Chat = () => {
  const [messages, setMessages] = useState(sampleMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { id: Date.now(), text: input, side: "right" },
      ]);
      setInput("");
    }
  };

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      {/* Enhanced Header */}
      <nav className="w-full flex items-center justify-between gap-2 px-4 py-6 glass-effect-light border-b border-slate-700/50 shadow-lift relative z-10">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-2xl enhanced-gradient p-3 shadow-neon">
            <Send className="text-white" size={24} />
          </span>
          <span className="text-xl font-bold text-white font-space-grotesk tracking-tight">💰 BudgetBuddy</span>
        </div>
      </nav>

      {/* Enhanced Chat area */}
      <div className="flex-1 flex flex-col max-w-lg w-full mx-auto px-4 pb-0 relative z-10">
        <div className="flex-1 overflow-y-auto py-8 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.side === "right" ? "justify-end" : "justify-start"} animate-message-enter`}
            >
              <div
                className={`rounded-3xl px-6 py-4 max-w-[85%] text-base font-medium shadow-lift border transition-all duration-500 hover-lift hover:scale-[1.02] ${
                  msg.side === "right"
                    ? "enhanced-gradient text-white border-blue-300/20 neon-glow"
                    : "glass-effect text-slate-100 border-slate-600/30 inner-glow"
                }`}
              >
                <span className="font-outfit font-medium">{msg.text}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input */}
        <form
          className="flex items-center gap-3 glass-effect rounded-2xl px-4 py-3 mb-4 shadow-lift border border-slate-700/50 relative overflow-hidden"
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
        >
          <div className="absolute inset-0 shimmer opacity-20" />
          <input
            className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-400 border-none outline-none text-base py-3 px-3 font-outfit relative z-10"
            placeholder="type ur message bestie… ✨"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="p-3 rounded-2xl enhanced-gradient text-white flex items-center justify-center transition-all duration-300 shadow-neon hover:shadow-neon-lg hover:scale-110 active:scale-95 relative z-10"
            aria-label="Send"
          >
            <Send size={20} />
          </button>
        </form>

        {/* Enhanced Quick actions */}
        <div className="flex gap-3 justify-center pb-8">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="px-5 py-2.5 rounded-2xl glass-effect-light text-slate-100 text-sm font-semibold shadow-enhanced border border-slate-600/30 hover-lift transition-all duration-300 hover:scale-105 active:scale-95 font-outfit"
              type="button"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
