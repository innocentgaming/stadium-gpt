'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { agents } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function AgentsSection() {
  return (
    <section id="agents" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Multi-Agent System"
          title="8 Specialized AI Agents"
          subtitle="Each agent is a domain expert, powered by state-of-the-art LLMs and orchestrated through LangGraph for seamless collaboration."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {agents.map((agent) => (
            <motion.div
              key={agent.title}
              variants={staggerItem}
              className="group glass rounded-2xl p-6 card-hover relative overflow-hidden"
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${agent.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} bg-opacity-20 flex items-center justify-center mb-4`} style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))` }}>
                <agent.icon className="w-6 h-6 text-white/80" />
              </div>

              <h3 className="font-heading font-semibold mb-2">{agent.title}</h3>
              <p className="text-sm text-text-secondary mb-4 leading-relaxed">{agent.description}</p>

              {/* Model badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 text-xs text-text-muted mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {agent.model}
              </div>

              {/* Responsibilities */}
              <ul className="space-y-1.5">
                {agent.responsibilities.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-text-secondary">
                    <div className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
