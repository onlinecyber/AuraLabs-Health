"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bot, 
  Send, 
  Sparkles, 
  Activity, 
  FileText,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hi John! I'm your AuraLabs AI Health Assistant. I can help you analyze your symptoms or summarize your lab reports. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsTyping(true);

    // Mock API Call delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: "Based on the symptoms you described, this could be indicative of a mild viral infection or seasonal allergies. I recommend staying hydrated. For peace of mind, a Complete Blood Count (CBC) test would be helpful to rule out any infections."
      }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-h-[800px]">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Health Assistant</h1>
          <p className="text-sm text-muted-foreground">Powered by AuraLabs Intelligence</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white dark:bg-black rounded-t-3xl border-t border-l border-r border-border shadow-sm flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-transparent dark:from-purple-900/5 pointer-events-none" />
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10">
          {/* Disclaimer */}
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900/50 rounded-2xl p-4 flex gap-3 text-orange-800 dark:text-orange-300 mx-auto max-w-2xl text-sm">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <p>
              <strong>Medical Disclaimer:</strong> This AI assistant is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician.
            </p>
          </div>

          {messages.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center ${
                msg.role === 'user' 
                  ? 'bg-primary text-primary-foreground font-bold' 
                  : 'bg-gradient-to-tr from-purple-500 to-indigo-500 text-white'
              }`}>
                {msg.role === 'user' ? 'JD' : <Bot className="h-5 w-5" />}
              </div>
              
              <div className={`p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                  : 'bg-slate-100 dark:bg-zinc-900 text-foreground rounded-tl-sm border border-border'
              }`}>
                <p className="leading-relaxed text-sm md:text-base">{msg.content}</p>
                
                {msg.role === 'ai' && idx > 0 && (
                  <div className="mt-4 pt-4 border-t border-border/50 flex gap-2">
                    <Link href="/checkout">
                      <Button variant="outline" size="sm" className="bg-white dark:bg-black rounded-lg text-xs h-8">
                        <Activity className="mr-1.5 h-3.5 w-3.5 text-primary" /> Book CBC Test
                      </Button>
                    </Link>
                    <Link href="/doctor">
                      <Button variant="outline" size="sm" className="bg-white dark:bg-black rounded-lg text-xs h-8">
                        <FileText className="mr-1.5 h-3.5 w-3.5 text-primary" /> Talk to Doctor
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 max-w-[85%]"
            >
              <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-zinc-900 rounded-tl-sm border border-border flex items-center gap-1.5">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-black border-t border-border z-10">
          <div className="flex gap-3 max-w-4xl mx-auto">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Describe your symptoms or ask about a test..." 
              className="flex-1 h-14 px-6 rounded-2xl border border-border bg-slate-50 dark:bg-zinc-900 outline-none focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner"
            />
            <Button 
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-md shadow-purple-500/20 flex-shrink-0"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
