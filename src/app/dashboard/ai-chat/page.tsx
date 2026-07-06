'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, User, Mic } from 'lucide-react';

import { sanitizeInput } from '@/lib/utils';

type Message = { role: 'user' | 'assistant'; content: string };

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content: 'Hello! I\'m StadiumGPT, your AI assistant for MetLife Stadium. I can help with navigation, food recommendations, accessibility info, match stats, and more. How can I help you today?',
  },
];

const suggestions = [
  'Where is the nearest restroom?',
  'How long is the food queue?',
  'Navigate to my seat Section 205',
  'What are today\'s match stats?',
];

export default function AIChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    const sanitizedText = sanitizeInput(text);
    if (!sanitizedText) return;

    setMessages((prev) => [...prev, { role: 'user', content: sanitizedText }]);
    setInput('');
    setIsTyping(true);

    // Simulated AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'Where is the nearest restroom?': 'The nearest restroom is 45 meters ahead on your right, near Section 104. Current wait time: ~2 minutes. There\'s also an accessible restroom 60 meters further at Concourse B with no wait.',
        'How long is the food queue?': 'Here are the current wait times:\n\n🍔 F&B Station 1: ~8 min (moderate)\n🍕 F&B Station 2: ~3 min (low)\n🌭 F&B Station 3: ~15 min (high)\n\nI recommend F&B Station 2 for the shortest wait. Would you like directions?',
        'Navigate to my seat Section 205': 'I\'ll guide you to Section 205! From your current location:\n\n1. Head straight for 30m\n2. Take the escalator to Level 2\n3. Turn right at the top\n4. Section 205 will be on your left\n\nEstimated walk time: 4 minutes. The route is wheelchair accessible.',
        'What are today\'s match stats?': '⚽ Match: Brazil vs Germany\n📊 Possession: Brazil 58% - 42% Germany\n⚡ Shots: 12 - 8\n🎯 On Target: 5 - 3\n🟨 Yellow Cards: 1 - 2\n\nCurrent Score: Brazil 2 - 1 Germany (67\')',
      };
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: responses[sanitizedText] || 'I\'d be happy to help with that! Let me look up the latest information for you. In the meantime, you can also ask me about navigation, food queues, match stats, or accessibility services.',
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4">
        <h1 className="text-2xl font-bold font-heading">AI Chat Assistant</h1>
        <p className="text-sm text-text-secondary mt-1">Ask StadiumGPT anything about the venue</p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 glass rounded-xl flex flex-col overflow-hidden">
        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4" aria-live="polite">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-blue-500/20 text-text-primary rounded-br-md'
                  : 'bg-white/5 text-text-primary rounded-bl-md'
              }`}>
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-text-secondary" />
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/5 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-text-secondary hover:bg-white/10 hover:text-white transition-colors border border-white/5 cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-colors" aria-label="Voice input">
              <Mic className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask StadiumGPT anything..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-sm placeholder-text-muted focus:outline-none focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/20"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="p-2.5 rounded-xl gradient-bg text-white disabled:opacity-30 transition-opacity cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
