
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'buddy';
  content: string;
  timestamp: Date;
  type?: 'tip' | 'expense' | 'pod' | 'normal';
}

interface ChatInterfaceProps {
  initialMessages?: Message[];
  onSendMessage?: (message: string) => void;
}

const ChatInterface = ({ initialMessages = [], onSendMessage }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Generate buddy response
    setTimeout(() => {
      const buddyResponse = generateBuddyResponse(inputValue);
      const buddyMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'buddy',
        content: buddyResponse.content,
        timestamp: new Date(),
        type: buddyResponse.type,
      };
      setMessages(prev => [...prev, buddyMessage]);
    }, 1000);

    setInputValue('');
    onSendMessage?.(inputValue);
  };

  const generateBuddyResponse = (userInput: string): { content: string; type: 'tip' | 'expense' | 'pod' | 'normal' } => {
    const input = userInput.toLowerCase();
    
    // Expense logging responses
    if (input.includes('paid') || input.includes('spent') || input.includes('€')) {
      const responses = [
        "💸 rip to ur wallet bestie! but at least we're tracking it like the financial queens we are! ✨",
        "🤑 money said 'bye felicia' faster than a tiktok trend! logged tho! ✅",
        "💰 ur cash just went on vacation... without u! 😭 but don't worry i got u covered!",
        "🏦 oop there it goes! no crying we're just building that financial awareness baby! 💅"
      ];
      return {
        content: responses[Math.floor(Math.random() * responses.length)],
        type: 'expense'
      };
    }

    // Budget pod responses
    if (input.includes('split') || input.includes('@')) {
      const responses = [
        "👥 group chat drama incoming! splitting this bill like we split the last pizza! ⚖️",
        "💸 sending guilt trip notifications to ur friends rn! they better pay up! 😈",
        "🎯 split mode activated! time to see who's really ur ride or die when money's involved! 💀",
        "👨‍⚖️ dividing this expense with the precision of a perfectly curated instagram feed! ⏰"
      ];
      return {
        content: responses[Math.floor(Math.random() * responses.length)],
        type: 'pod'
      };
    }

    // Income responses
    if (input.includes('income') || input.includes('earned') || input.includes('salary')) {
      const responses = [
        "💰 periodt! money in the bank! now don't spend it all on overpriced coffee! ☕️",
        "🎉 we love to see it! ur bank account is serving main character energy! 💃",
        "💵 income alert! time to do a lil happy dance! just don't go too crazy bestie! 🕺",
        "🤑 fresh funds! remember: we're being financially responsible AND cute! 💅"
      ];
      return {
        content: responses[Math.floor(Math.random() * responses.length)],
        type: 'normal'
      };
    }

    // General responses
    const generalResponses = [
      "🤔 ooh spill the tea! what financial drama we dealing with today? 💭",
      "😄 i'm here for it! what money moves we making bestie? 🔥",
      "👂 listening! what's the financial vibe check today? 💫",
      "💡 sensing some money questions! speak ur truth financial queen! 👑",
      "🎯 ready to help u make better choices than my last dating decisions! 🤖✨"
    ];
    
    return {
      content: generalResponses[Math.floor(Math.random() * generalResponses.length)],
      type: 'normal'
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex message-enter ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-5 py-4 rounded-xl font-inter font-medium text-sm leading-relaxed professional-shadow ${
                message.sender === 'user'
                  ? 'professional-gradient text-white'
                  : message.type === 'expense'
                  ? 'bg-red-900/20 text-red-200 border border-red-700/30'
                  : message.type === 'pod'
                  ? 'bg-blue-900/20 text-blue-200 border border-blue-700/30'
                  : 'bg-slate-800 text-slate-100 border border-slate-700'
              }`}
            >
              {message.sender === 'buddy' && (
                <div className="flex items-center mb-3">
                  <div className="w-7 h-7 professional-gradient rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                    B
                  </div>
                  <span className="text-xs font-semibold text-slate-400 font-inter">budgetbuddy</span>
                </div>
              )}
              <p className="whitespace-pre-wrap text-slate-100">{message.content}</p>
              <p className={`text-xs mt-3 font-medium ${
                message.sender === 'user' ? 'text-white/70' : 'text-slate-400'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-slate-800/50 backdrop-blur-md border-t border-slate-700">
        <div className="flex items-end space-x-4">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="type ur message bestie... ✨"
              className="w-full px-5 py-4 bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-400 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 font-inter font-medium professional-shadow transition-all duration-200"
              rows={1}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="professional-gradient hover:opacity-90 text-white rounded-xl px-6 py-4 h-auto professional-shadow transition-all duration-200 hover:professional-lift-shadow active:button-press font-inter font-semibold"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputValue('show my balance')}
            className="text-sm bg-slate-700 text-slate-200 border-slate-600 rounded-full px-4 py-2 hover:bg-slate-600 hover:professional-lift-shadow active:button-press font-inter font-medium transition-all duration-200"
          >
            💰 balance check
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputValue('gimme an earn tip')}
            className="text-sm bg-slate-700 text-slate-200 border-slate-600 rounded-full px-4 py-2 hover:bg-slate-600 hover:professional-lift-shadow active:button-press font-inter font-medium transition-all duration-200"
          >
            🚀 earn tip
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputValue('paid €20 lunch')}
            className="text-sm bg-slate-700 text-slate-200 border-slate-600 rounded-full px-4 py-2 hover:bg-slate-600 hover:professional-lift-shadow active:button-press font-inter font-medium transition-all duration-200"
          >
            💸 log expense
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
