'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { architectureNodes } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 sm:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="System Design"
          title="AI Architecture"
          subtitle="A multi-layered intelligent system processing millions of data points in real-time across all venue operations."
        />

        <motion.div
          className="relative flex flex-col items-center gap-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {architectureNodes.map((node, index) => (
            <motion.div key={node.id} variants={staggerItem} className="w-full max-w-md">
              {/* Connector line */}
              {index > 0 && (
                <div className="flex justify-center mb-3">
                  <div className="w-px h-8 bg-gradient-to-b from-blue-500/50 to-purple-500/50 relative">
                    <motion.div
                      className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-400 to-purple-400"
                      initial={{ height: 0 }}
                      whileInView={{ height: '100%' }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              )}

              {/* Node Card */}
              <div className="glass-strong rounded-xl p-4 flex items-center gap-4 card-hover relative group">
                {/* Glow */}
                <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500" />

                <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <node.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div className="relative">
                  <h3 className="font-heading font-semibold text-sm text-text-primary">{node.label}</h3>
                  <p className="text-xs text-text-secondary">{node.sublabel}</p>
                </div>
                {/* Pulse indicator */}
                <div className="relative ml-auto flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
