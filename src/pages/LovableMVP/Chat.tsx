
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 relative overflow-hidden">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Header with glassmorphism */}
      <div className="w-full py-5 px-0 relative backdrop-blur-xl bg-gradient-to-r from-purple-700/20 via-fuchsia-600/20 to-pink-500/20 border-b border-white/10 shadow-2xl text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700/30 via-fuchsia-600/30 to-pink-500/30 backdrop-blur-sm"></div>
        <h1 className="text-2xl font-bold text-white tracking-tight relative z-10 drop-shadow-lg">💰 BudgetBuddy</h1>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col max-w-lg w-full mx-auto px-2 pb-0 relative z-10">
        <div className="flex-1 overflow-y-auto py-8 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.side === "right" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div
                className={`rounded-2xl px-4 py-3 max-w-[80%] text-base font-medium shadow-2xl backdrop-blur-lg border transition-all duration-300 hover:scale-[1.02] ${
                  msg.side === "right"
                    ? "bg-gradient-to-br from-fuchsia-600/90 to-pink-500/90 text-white border-fuchsia-300/20 shadow-fuchsia-500/25"
                    : "bg-slate-800/70 text-slate-100 border-slate-600/30 shadow-slate-900/50"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input with futuristic styling */}
        <form
          className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-xl rounded-xl px-3 py-2 mb-3 shadow-2xl border border-slate-700/50 transition-all duration-300 hover:border-slate-600/70 focus-within:border-blue-500/50 focus-within:shadow-blue-500/20"
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-400 border-none outline-none text-base py-2 px-2"
            placeholder="type ur message bestie… ✨"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="p-2 rounded-full bg-gradient-to-br from-fuchsia-600 to-pink-500 hover:from-fuchsia-500 hover:to-pink-400 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-fuchsia-500/30 hover:scale-110 active:scale-95"
            aria-label="Send"
          >
            <Send size={22} />
          </button>
        </form>

        {/* Quick actions with glassmorphism */}
        <div className="flex gap-2 justify-center pb-6">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="px-4 py-1.5 rounded-full bg-slate-800/60 backdrop-blur-lg text-slate-100 text-sm font-semibold shadow-lg hover:bg-slate-700/70 transition-all duration-300 border border-slate-700/50 hover:border-slate-600/70 hover:scale-105 active:scale-95 hover:shadow-slate-600/30"
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
