'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { features } from '@/lib/constants';

export default function FeaturesSection() {
  // Define custom column and row layout modifiers for Bento grid feel
  const bentoClasses = (index: number) => {
    switch (index) {
      case 0: // AI Stadium Guide
        return 'lg:col-span-2 lg:row-span-2 border-blue-500/20 bg-blue-950/5';
      case 4: // Food Queue Prediction
        return 'lg:col-span-2 border-purple-500/20 bg-purple-950/5';
      case 7: // Emergency Response
        return 'lg:col-span-2 border-red-500/20 bg-red-950/5';
      case 11: // Accessibility Assistant
        return 'lg:col-span-2 lg:row-span-2 border-cyan-500/20 bg-cyan-950/5';
      case 15: // Sustainability Dashboard
        return 'lg:col-span-2 border-green-500/20 bg-green-950/5';
      default:
        return 'col-span-1 border-white/5 hover:border-white/10';
    }
  };

  return (
    <section id="features" className="py-24 sm:py-32 relative">
      {/* Visual cybernetic accent lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="20 AI-Powered Features"
          title="Bento Grid Venue Intelligence"
          subtitle="From navigation to sustainability, StadiumGPT delivers a complete AI-powered ecosystem for modern venue management."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map((feature, index) => {
            const extraClasses = bentoClasses(index);
            const isBig = extraClasses.includes('col-span-2') || extraClasses.includes('row-span-2');
            
            return (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className={`group relative glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-500/5 flex flex-col justify-between ${extraClasses}`}
              >
                {/* Tech corner brackets for big cards */}
                {isBig && (
                  <>
                    <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-white/20" />
                    <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-white/20" />
                    <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-white/20" />
                    <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-white/20" />
                  </>
                )}

                <div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-5 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all">
                    <feature.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-heading font-semibold text-sm mb-2 text-text-primary flex items-center gap-2">
                    {feature.title}
                    {isBig && (
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    )}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-4">
                    {feature.description}
                  </p>
                </div>

                {/* Simulated live feed indicator for bento components */}
                {isBig && (
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-text-muted mt-auto">
                    <span>AGENT STATUS: ACTIVE</span>
                    <span className="font-mono text-green-400">SYS_OK</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
