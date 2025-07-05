
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
    <div className="flex flex-col min-h-screen bg-slate-950">
      {/* Header */}
      <nav className="w-full flex items-center justify-between gap-2 px-4 py-5 bg-slate-900 border-b border-slate-800 shadow">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-2">
            <Send className="text-white" size={24} />
          </span>
          <span className="text-lg font-bold text-white">💰 BudgetBuddy</span>
        </div>
      </nav>

      {/* Chat area */}
      <div className="flex-1 flex flex-col max-w-lg w-full mx-auto px-2 pb-0">
        <div className="flex-1 overflow-y-auto py-8 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.side === "right" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div
                className={`rounded-2xl px-4 py-3 max-w-[80%] text-base font-medium shadow-lg border transition-all duration-300 hover:scale-[1.02] ${
                  msg.side === "right"
                    ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white border-blue-300/20"
                    : "bg-slate-800 text-slate-100 border-slate-700"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          className="flex items-center gap-2 bg-slate-900 rounded-xl px-3 py-2 mb-3 shadow border border-slate-800"
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
            className="p-2 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center transition-all duration-300 shadow hover:from-blue-700 hover:to-purple-700 hover:scale-110 active:scale-95"
            aria-label="Send"
          >
            <Send size={22} />
          </button>
        </form>

        {/* Quick actions */}
        <div className="flex gap-2 justify-center pb-6">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="px-4 py-1.5 rounded-full bg-slate-800 text-slate-100 text-sm font-semibold shadow border border-slate-700 hover:bg-slate-700 transition-all duration-300 hover:scale-105 active:scale-95"
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
