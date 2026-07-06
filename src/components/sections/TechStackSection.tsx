'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { techStack } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function TechStackSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Technology"
          title="Built with Best-in-Class Tech"
          subtitle="A modern, scalable architecture leveraging cutting-edge AI, cloud, and frontend technologies."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {Object.entries(techStack).map(([category, technologies]) => (
            <motion.div
              key={category}
              variants={staggerItem}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-heading font-semibold text-sm mb-4 gradient-text">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 text-xs text-text-secondary border border-white/5 hover:bg-white/10 hover:text-white hover:border-white/10 transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scrolling marquee */}
        <div className="mt-16 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          <motion.div
            className="flex gap-8 items-center"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {[...Object.values(techStack).flat(), ...Object.values(techStack).flat()].map((tech, i) => (
              <span key={`${tech}-${i}`} className="text-lg font-heading text-text-muted/30 whitespace-nowrap">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
