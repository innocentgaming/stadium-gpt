'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import GradientButton from '@/components/ui/GradientButton';
import { pricingTiers } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { Check } from 'lucide-react';

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Enterprise Plans"
          title="Built for Scale"
          subtitle="Flexible deployment options for venues of every size — from single stadiums to city-wide networks."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              className={`rounded-2xl p-6 card-hover relative ${
                tier.popular
                  ? 'glass-strong border-blue-500/30 shadow-lg shadow-blue-500/10'
                  : 'glass'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium gradient-bg text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-3xl mb-3">{tier.icon}</div>
              <h3 className="font-heading font-bold text-lg mb-1">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-2xl font-bold font-heading gradient-text">{tier.price}</span>
                {tier.period && <span className="text-sm text-text-muted">{tier.period}</span>}
              </div>
              <p className="text-xs text-text-secondary mb-6 leading-relaxed">{tier.description}</p>

              <ul className="space-y-2.5 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs text-text-secondary">
                    <Check className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <GradientButton
                variant={tier.popular ? 'primary' : 'secondary'}
                size="sm"
                className="w-full"
              >
                Contact Sales
              </GradientButton>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
