'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { timeline } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function TimelineSection() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Roadmap"
          title="The Journey Ahead"
          subtitle="From FIFA World Cup 2026 to a global smart venue platform — our vision for the future of intelligent spaces."
        />

        <motion.div
          className="relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Vertical line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent lg:-translate-x-px" />

          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              variants={staggerItem}
              className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-6 lg:left-1/2 w-3 h-3 -translate-x-1.5 lg:-translate-x-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 z-10 mt-6">
                <div className="absolute -inset-2 rounded-full bg-blue-500/20 animate-ping" />
              </div>

              {/* Content */}
              <div className={`ml-14 lg:ml-0 lg:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8'}`}>
                <span className="text-3xl font-bold font-heading gradient-text">{item.year}</span>
                <h3 className="font-heading font-semibold text-lg mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
                  {index % 2 !== 0 && <div className="hidden lg:block" />}
                  {item.milestones.map((milestone) => (
                    <span
                      key={milestone}
                      className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/5 text-xs text-text-muted border border-white/5"
                    >
                      {milestone}
                    </span>
                  ))}
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
