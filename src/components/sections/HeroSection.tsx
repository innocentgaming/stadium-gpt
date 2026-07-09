'use client';

import { motion } from 'framer-motion';
import { Play, ArrowRight, Layers, ShieldCheck, Cpu, Activity, Globe } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

const partners = [
  { name: 'FIFA Operations', type: 'Official Licensee' },
  { name: 'Adidas Sports Tech', type: 'Data Partner' },
  { name: 'Visa Payments', type: 'Concessions Integrator' },
  { name: 'Hyundai Transit', type: 'Fleet Systems' },
  { name: 'Qatar Airways', type: 'Travel Logistics' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16 bg-[#030712]">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      {/* Subtle Premium Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="text-center space-y-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={staggerItem} className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-slate-300 border border-white/10 shadow-sm backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              FIFA World Cup 2026 Operations
            </span>
          </motion.div>

          {/* Large Title */}
          <motion.h1
            variants={staggerItem}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading tracking-tight max-w-5xl mx-auto leading-[1.05] text-slate-100"
          >
            AI Operating System for{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              FIFA World Cup 2026
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={staggerItem}
            className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            StadiumGPT orchestrates stadium infrastructure, IoT sensor arrays, and crowd intelligence across 16 tournament venues. Built for volunteers, emergency responders, and stadium staff.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <GradientButton size="lg" href="/dashboard" className="shadow-lg shadow-blue-500/10">
              Access Operations Console
              <ArrowRight className="w-4 h-4" />
            </GradientButton>
            <GradientButton variant="secondary" size="lg" href="#dashboard">
              <Play className="w-4 h-4 text-slate-400" />
              Watch Technical Overview
            </GradientButton>
          </motion.div>

          {/* Live Telemetry Grid */}
          <motion.div
            variants={staggerItem}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4"
          >
            {[
              { icon: ShieldCheck, title: 'Compliance', value: 'WCAG 2.2 AA' },
              { icon: Cpu, title: 'AI Orchestrator', value: '8 LLM Agents' },
              { icon: Activity, title: 'CV Latency', value: '< 100ms' },
              { icon: Globe, title: 'Scale', value: '16 Stadiums' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-white/10 transition-colors text-left">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <stat.icon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{stat.title}</p>
                  <p className="text-sm font-bold text-slate-200 font-heading">{stat.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Animated Stadium/Dashboard Preview */}
          <motion.div
            variants={fadeInUp}
            className="relative max-w-5xl mx-auto pt-8"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-3xl rounded-3xl opacity-60" />
            <div className="relative border border-white/10 bg-slate-900/60 rounded-2xl p-1.5 shadow-2xl backdrop-blur-md">
              <div className="bg-[#0b0f19] rounded-xl overflow-hidden border border-white/5">
                {/* Browser Window Chrome */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-slate-950/80">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-800" />
                    <div className="w-3 h-3 rounded-full bg-slate-800" />
                    <div className="w-3 h-3 rounded-full bg-slate-800" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-0.5 rounded bg-white/5 text-[10px] text-slate-500 font-mono">
                      stadiumgpt.fifa.org/live
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">Operational</span>
                  </div>
                </div>

                {/* Dashboard Visualization */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Central Digital Twin Stadium Vector */}
                  <div className="md:col-span-2 relative aspect-[16/10] bg-slate-950/60 border border-white/5 rounded-xl flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 dot-pattern opacity-10" />
                    
                    {/* Simulated SVG Stadium Pitch */}
                    <div className="w-[80%] h-[70%] border border-slate-800 rounded-[50%] flex items-center justify-center relative bg-gradient-to-b from-blue-500/5 to-purple-500/5">
                      <div className="w-[60%] h-[50%] border border-slate-800/80 rounded-[50%] flex items-center justify-center">
                        <div className="w-[60%] h-[60%] border border-green-500/20 bg-green-500/5 rounded flex items-center justify-center">
                          <span className="text-[10px] text-slate-600 font-heading tracking-wider">FIELD</span>
                        </div>
                      </div>

                      {/* Hotspots */}
                      <span className="absolute top-[15%] left-[50%] -translate-x-1/2 w-3 h-3 bg-red-500/80 rounded-full animate-ping" />
                      <span className="absolute top-[15%] left-[50%] -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full" />
                      
                      <span className="absolute bottom-[20%] left-[25%] w-2 h-2 bg-yellow-500 rounded-full" />
                      <span className="absolute top-[40%] right-[15%] w-2 h-2 bg-blue-500 rounded-full" />
                    </div>

                    <div className="absolute top-3 left-3 text-[10px] text-slate-500 font-mono">
                      [V-01] METLIFE STADIUM / CV FEED
                    </div>
                  </div>

                  {/* Side Agent Feed */}
                  <div className="flex flex-col justify-between space-y-4 text-left">
                    <div className="border border-white/5 bg-white/[0.02] p-4 rounded-xl space-y-3">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Active Safety Agent</p>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <span className="text-xs font-semibold text-slate-200">GPT-4o + YOLO v8</span>
                      </div>
                      <p className="text-xs text-slate-400 italic">"Crowd flow density near North Concourse has stabilized at 68%. Suggesting auxiliary gate opening."</p>
                    </div>

                    <div className="border border-white/5 bg-white/[0.02] p-4 rounded-xl space-y-3">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">RAG Data Pipeline</p>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span className="text-xs font-semibold text-slate-200">Pinecone Database</span>
                      </div>
                      <p className="text-xs text-slate-400">12,840 operational guidelines and protocol documents indexed.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trusted By Partner Logos */}
          <motion.div variants={staggerItem} className="pt-16 border-t border-white/5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-6">
              Integrated with Core FIFA Partnerships & Systems
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
              {partners.map((partner) => (
                <div key={partner.name} className="flex flex-col items-center">
                  <span className="text-sm font-bold text-slate-300 tracking-tight font-heading">
                    {partner.name}
                  </span>
                  <span className="text-[9px] text-slate-500 tracking-wider uppercase mt-0.5">
                    {partner.type}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
