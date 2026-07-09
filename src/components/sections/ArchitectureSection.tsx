'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { architectureNodes } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { ArrowRight } from 'lucide-react';

export default function ArchitectureSection() {
  // Let's divide the nodes into layers to represent a logical data flow
  // 1. Edge Layer (Users, Mobile App, IoT Sensors, Computer Vision)
  // 2. Routing & Processing Layer (API Gateway, AI Agents)
  // 3. Cognitive & LLM Layer (LLM Layer, RAG Pipeline)
  // 4. Data & Analytics Layer (Vector Database, Analytics Dashboard)
  const edgeLayer = architectureNodes.filter(n => ['users', 'mobile', 'iot', 'vision'].includes(n.id));
  const routingLayer = architectureNodes.filter(n => ['gateway', 'agents'].includes(n.id));
  const cognitiveLayer = architectureNodes.filter(n => ['llm', 'rag'].includes(n.id));
  const dataLayer = architectureNodes.filter(n => ['vector', 'analytics'].includes(n.id));

  const layers = [
    { name: '1. Ingestion & Edge', nodes: edgeLayer },
    { name: '2. Gateway & Orchestration', nodes: routingLayer },
    { name: '3. LLM & Context Retrieval', nodes: cognitiveLayer },
    { name: '4. Storage & Dashboard Output', nodes: dataLayer },
  ];

  return (
    <section id="architecture" className="py-24 sm:py-32 relative bg-[#030712]">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="System Topology"
          title="Multi-Layered AI Infrastructure"
          subtitle="How StadiumGPT processes high-throughput IoT telemetries, computer vision feeds, and natural language requests in real-time."
        />

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {layers.map((layer, lIndex) => (
            <motion.div
              key={layer.name}
              variants={staggerItem}
              className="relative space-y-4"
            >
              {/* Layer Title */}
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">{layer.name}</h4>
                {lIndex < 3 && (
                  <ArrowRight className="hidden lg:block w-4 h-4 text-slate-700 absolute -right-6 top-1/2 -translate-y-1/2 z-20" />
                )}
              </div>

              {/* Node List */}
              <div className="flex flex-col gap-4">
                {layer.nodes.map((node) => (
                  <div
                    key={node.id}
                    className="relative p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 group"
                  >
                    {/* Hover subtle glow */}
                    <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:via-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none" />

                    <div className="flex items-center gap-3.5 relative z-10">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                        <node.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-200 font-heading">{node.label}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{node.sublabel}</p>
                      </div>
                      {/* Active Status Dot */}
                      <span className="ml-auto w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
