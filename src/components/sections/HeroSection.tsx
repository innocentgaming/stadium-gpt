'use client';

import { motion } from 'framer-motion';
import { Play, ArrowRight, Layers } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={staggerItem} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              FIFA World Cup 2026 — Live
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={staggerItem}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tight max-w-5xl mx-auto leading-[1.1] mb-6"
          >
            The AI Operating System for{' '}
            <span className="gradient-text">FIFA World Cup</span>{' '}
            Stadiums
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={staggerItem}
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            StadiumGPT powers 16 World Cup venues with 8 AI agents, real-time computer vision,
            and intelligent crowd management — serving 100K+ fans per match.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <GradientButton size="lg" href="/dashboard">
              Try Live Demo
              <ArrowRight className="w-4 h-4" />
            </GradientButton>
            <GradientButton variant="secondary" size="lg" href="#dashboard">
              <Play className="w-4 h-4" />
              Watch Demo
            </GradientButton>
            <GradientButton variant="outline" size="lg" href="#architecture">
              <Layers className="w-4 h-4" />
              View Architecture
            </GradientButton>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            variants={fadeInUp}
            className="relative max-w-5xl mx-auto"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl rounded-3xl" />
            <div className="relative glass-strong rounded-2xl p-1.5 shadow-2xl shadow-black/50">
              <div className="bg-surface rounded-xl overflow-hidden">
                {/* Window Chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 rounded-md bg-white/5 text-xs text-text-muted">
                      stadiumgpt.ai/command-center
                    </div>
                  </div>
                </div>
                {/* Dashboard Content */}
                <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Active Fans', value: '94,218', change: '+12%', color: 'text-blue-400' },
                    { label: 'AI Responses', value: '2.3M', change: '+34%', color: 'text-purple-400' },
                    { label: 'Incidents Prevented', value: '47', change: '-23%', color: 'text-green-400' },
                    { label: 'Avg Response', value: '0.3s', change: '-18%', color: 'text-cyan-400' },
                  ].map((stat) => (
                    <div key={stat.label} className="glass rounded-xl p-4">
                      <p className="text-xs text-text-muted mb-1">{stat.label}</p>
                      <p className={`text-2xl font-bold font-heading ${stat.color}`}>{stat.value}</p>
                      <p className="text-xs text-green-400 mt-1">{stat.change}</p>
                    </div>
                  ))}
                </div>
                {/* Mini Chart Area */}
                <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 glass rounded-xl p-4 h-40 relative overflow-hidden">
                    <p className="text-xs text-text-muted mb-2">Crowd Density — Real-time</p>
                    <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end gap-1 px-4 pb-4">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t opacity-60"
                          style={{ height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 30}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="glass rounded-xl p-4 h-40">
                    <p className="text-xs text-text-muted mb-2">AI Agents Active</p>
                    <div className="flex flex-col gap-2 mt-3">
                      {['Navigation', 'Safety', 'Medical', 'Volunteer'].map((agent) => (
                        <div key={agent} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-xs text-text-secondary">{agent}</span>
                          <span className="ml-auto text-xs text-green-400">Online</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            variants={staggerItem}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {[
              { value: '16', label: 'Stadiums' },
              { value: '8', label: 'AI Agents' },
              { value: '40+', label: 'Languages' },
              { value: '<100ms', label: 'Latency' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold font-heading gradient-text">{stat.value}</p>
                <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
