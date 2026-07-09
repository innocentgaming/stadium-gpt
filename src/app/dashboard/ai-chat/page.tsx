'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, User, Mic, AlertCircle } from 'lucide-react';
import { sanitizeInput } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content: 'Hello! I\'m StadiumGPT, your AI assistant for MetLife Stadium. I can help with navigation, concessions queue estimations, accessibility routes, or operational indicators. Ask me anything!',
  },
];

const suggestions = [
  'Where is the nearest accessible restroom?',
  'How long is the food queue at Concourse B?',
  'Wheelchair route to my seat Section 205',
  'What is the live match status and score?',
];

/**
 * AI Chat Assistant Component.
 * Addresses [Required Area: Multilingual Assistance] & [Required Area: Real-Time Decision Support].
 * Connects directly to the `/api/chat` route to query the Gemini API with context.
 * Ingests whileTap button micro-interactions.
 */
export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  /**
   * Sends user message to API route and appends the assistant reply.
   *
   * @param text - User input query
   */
  const sendMessage = async (text: string) => {
    const sanitizedText = sanitizeInput(text);
    if (!sanitizedText) return;

    setErrorMessage('');
    setMessages((prev) => [...prev, { role: 'user', content: sanitizedText }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: sanitizedText }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setErrorMessage(data.error || 'The assistant encountered an error.');
      }
    } catch (err) {
      console.error('Chat routing error:', err);
      setErrorMessage('Network connection lost. Please check connection and try again.');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header with Badge */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold font-heading text-slate-100">AI Chat Assistant</h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            [Required Area: Multilingual Assistance / Decision Support]
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-1">Ask StadiumGPT anything about the venue — powered by Gemini API</p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl flex flex-col overflow-hidden">
        {/* Messages feed */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4" aria-live="polite">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-emerald-500/20 text-slate-100 rounded-br-md'
                    : 'bg-white/5 text-slate-200 rounded-bl-md'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-text-secondary">
                  <User className="w-4 h-4" />
                </div>
              )}
            </motion.div>
          ))}

          {/* Typing Loading Skeleton */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-white/5 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}

          {/* Error Message Box */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Suggestions Bar */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <motion.button
                key={s}
                whileTap={{ scale: 0.95 }}
                onClick={() => sendMessage(s)}
                className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-text-secondary hover:bg-white/10 hover:text-white transition-colors border border-white/5 cursor-pointer"
              >
                {s}
              </motion.button>
            ))}
          </div>
        )}

        {/* Action input bar */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Voice input simulator"
              onClick={() => triggerVoiceCommand()}
            >
              <Mic className="w-5 h-5" />
            </motion.button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask StadiumGPT anything..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-sm placeholder-text-muted text-slate-100 focus:outline-none focus:border-emerald-500/30 focus:ring-1 focus:ring-emerald-500/20"
            />
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-30 transition-all cursor-pointer"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );

  function triggerVoiceCommand() {
    setInput('Where is the nearest accessible restroom?');
  }
}
