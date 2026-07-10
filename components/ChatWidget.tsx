"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Bisnu's AI Assistant. Ask me anything about his DevOps skills or experience!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    setInput("");
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(1) // skip the initial greeting
        })
      });

      const data = await res.json();
      
      if (data.success) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. " + (data.message || "") }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Oops, something went wrong connecting to my brain!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: -1000, right: 0, top: -800, bottom: 0 }}
      dragMomentum={false}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end justify-end"
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="button"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="p-4 rounded-full bg-accent text-black shadow-lg shadow-accent/20 cursor-grab active:cursor-grabbing"
          >
            <MessageSquare size={24} />
          </motion.button>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] glass rounded-2xl flex flex-col overflow-hidden border border-white/10 shadow-2xl origin-bottom-right"
          >
            {/* Header */}
            <div className="bg-black/50 p-4 flex justify-between items-center border-b border-white/10 cursor-grab active:cursor-grabbing">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                <h3 className="font-bold">AI Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col chat-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`max-w-[85%] rounded-2xl px-4 py-2 ${msg.role === 'user' ? 'bg-accent text-black self-end rounded-br-sm' : 'bg-white/10 text-white self-start rounded-bl-sm'}`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              ))}
              {isLoading && (
                <div className="bg-white/10 text-white self-start rounded-bl-sm rounded-2xl px-4 py-3 flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto chat-scrollbar whitespace-nowrap">
                <button onClick={() => handleSend("Tell me about your CI/CD experience")} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-gray-300 transition-colors shrink-0">
                  🚀 CI/CD Experience
                </button>
                <button onClick={() => handleSend("What is your tech stack?")} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-gray-300 transition-colors shrink-0">
                  💻 Tech Stack
                </button>
                <button onClick={() => handleSend("Tell me about the EduTrade project")} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-gray-300 transition-colors shrink-0">
                  🛒 EduTrade Project
                </button>
              </div>
            )}

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 bg-black/30 border-t border-white/10 flex gap-2 cursor-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-500"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="p-2 bg-white/10 rounded-xl hover:bg-accent hover:text-black transition-colors disabled:opacity-50 disabled:hover:bg-white/10 disabled:hover:text-white"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
