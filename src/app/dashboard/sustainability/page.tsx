'use client';

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { seededRandom } from '@/lib/utils';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { Leaf, Droplets, Zap, Recycle, Cloud } from 'lucide-react';

const metrics = [
  { label: 'Carbon Offset', value: 1247, unit: 'tons CO₂', target: 2000, icon: Cloud, color: '#10B981' },
  { label: 'Water Saved', value: 3400000, unit: 'liters', target: 5000000, icon: Droplets, color: '#10B981' },
  { label: 'Energy Saved', value: 2340, unit: 'MWh', target: 4000, icon: Zap, color: '#10B981' },
  { label: 'Waste Recycled', value: 78, unit: '%', target: 90, icon: Recycle, color: '#10B981' },
  { label: 'Plastic Eliminated', value: 890, unit: 'tons', target: 1200, icon: Leaf, color: '#10B981' },
];

/**
 * Sustainability Dashboard Page Component.
 * Addresses [Required Area: Sustainability].
 */
export default function SustainabilityDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header with Mapping Badge */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold font-heading text-slate-100">Sustainability Dashboard</h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            [Required Area: Sustainability]
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-1">Environmental impact tracking and optimization</p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {metrics.map((metric) => {
          const progress = Math.min((metric.value / metric.target) * 100, 100);
          return (
            <motion.div key={metric.label} variants={staggerItem} className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 text-center">
              <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center bg-white/5">
                <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
              </div>
              <p className="text-2xl font-bold font-heading" style={{ color: metric.color }}>
                <AnimatedCounter value={metric.value} />
              </p>
              <p className="text-xs text-text-muted mb-3">{metric.unit}</p>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: metric.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5 }}
                />
              </div>
              <p className="text-[10px] text-text-muted mt-1.5">{progress.toFixed(0)}% of target</p>
              <p className="text-xs font-semibold mt-1 text-slate-300">{metric.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Trend Chart */}
      <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5">
        <h3 className="font-heading font-semibold text-sm mb-4 text-slate-200">Sustainability Trend — Tournament Period</h3>
        <div className="h-48 flex items-end gap-2">
          {['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'].map((week, i) => (
            <div key={week} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className="w-full rounded-t bg-gradient-to-t from-emerald-500/60 to-emerald-400/40"
                initial={{ height: 0 }}
                animate={{ height: `${40 + i * 10 + seededRandom(i) * 15}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
              <span className="text-[10px] text-text-muted mt-1">{week}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
