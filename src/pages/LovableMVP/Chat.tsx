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
      <div className="w-full py-5 px-0 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-500 shadow text-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">💰 BudgetBuddy</h1>
      </div>
      {/* Chat area */}
      <div className="flex-1 flex flex-col max-w-lg w-full mx-auto px-2 pb-0">
        <div className="flex-1 overflow-y-auto py-8 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.side === "right" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-2xl px-4 py-3 max-w-[80%] text-base font-medium shadow-md ${
                  msg.side === "right"
                    ? "bg-gradient-to-br from-fuchsia-600 to-pink-500 text-white"
                    : "bg-slate-800 text-slate-100"
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
          className="flex items-center gap-2 bg-slate-900 rounded-xl px-3 py-2 mb-3 shadow-lg"
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
            className="p-2 rounded-full bg-gradient-to-br from-fuchsia-600 to-pink-500 hover:from-fuchsia-700 hover:to-pink-600 text-white flex items-center justify-center transition"
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
              className="px-4 py-1.5 rounded-full bg-slate-800 text-slate-100 text-sm font-semibold shadow hover:bg-slate-700 transition border border-slate-700"
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