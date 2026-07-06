'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { sustainabilityStats } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function SustainabilitySection() {
  return (
    <section className="py-24 sm:py-32 relative">
      {/* Green accent background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Environmental Impact"
          title="Sustainability Dashboard"
          subtitle="AI-driven optimization reducing environmental impact across all venue operations in real-time."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {sustainabilityStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="glass rounded-2xl p-6 text-center card-hover"
            >
              <div
                className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: `${stat.color}15` }}
              >
                <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
              </div>

              {/* Circular progress ring */}
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                  <motion.circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke={stat.color}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={264}
                    initial={{ strokeDashoffset: 264 }}
                    whileInView={{ strokeDashoffset: 264 * (1 - Math.min(stat.value / (stat.value * 1.3), 0.85)) }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold font-heading" style={{ color: stat.color }}>
                    <AnimatedCounter value={stat.value} />
                  </span>
                </div>
              </div>

              <p className="text-xs text-text-muted mb-1">{stat.unit}</p>
              <h3 className="font-heading font-semibold text-sm">{stat.label}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
