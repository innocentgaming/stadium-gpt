'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { accessibilityFeatures } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function AccessibilitySection() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="WCAG 2.2 AA Compliant"
          title="Accessible for Everyone"
          subtitle="Inclusive design at every level — ensuring every fan, regardless of ability, has an extraordinary World Cup experience."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {accessibilityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              className={`glass rounded-2xl p-6 card-hover ${index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-heading font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
