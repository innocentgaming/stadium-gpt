'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { cvDetections } from '@/lib/constants';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { seededRandom } from '@/lib/utils';

export default function ComputerVisionSection() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Computer Vision"
          title="AI-Powered Visual Intelligence"
          subtitle="YOLO v8 and OpenCV analyze thousands of CCTV feeds in real-time, detecting incidents before they escalate."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Simulated CCTV Grid */}
          <motion.div
            className="glass-strong rounded-2xl p-1.5"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: 'Gate 7 — North', count: 847, type: 'crowd' },
                { label: 'Concourse B', count: 12, type: 'queue' },
                { label: 'Parking Lot 3', count: 0, type: 'fire' },
                { label: 'Section 205', count: 1, type: 'suspicious' },
              ].map((feed, i) => (
                <div key={i} className="relative bg-surface rounded-lg aspect-video overflow-hidden group">
                  {/* Simulated feed background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
                    {/* Simulated people dots */}
                    {feed.type === 'crowd' && Array.from({ length: 20 }).map((_, j) => (
                      <div
                        key={j}
                        className="absolute w-2 h-3 rounded-sm border border-blue-400/60 bg-blue-400/10"
                        style={{
                          left: `${10 + seededRandom(j * 2) * 80}%`,
                          top: `${20 + seededRandom(j * 2 + 1) * 60}%`,
                        }}
                      />
                    ))}
                    {/* Queue boxes */}
                    {feed.type === 'queue' && (
                      <div className="absolute left-[20%] top-[30%] w-[60%] h-[40%] border-2 border-amber-400/60 rounded-md">
                        <span className="absolute -top-5 left-0 text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">Queue: ~12min</span>
                      </div>
                    )}
                    {/* Suspicious box */}
                    {feed.type === 'suspicious' && (
                      <div className="absolute left-[40%] top-[50%] w-8 h-6 border-2 border-red-400/80 rounded animate-pulse">
                        <span className="absolute -top-5 left-0 text-[10px] text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded whitespace-nowrap">Alert: Unattended</span>
                      </div>
                    )}
                  </div>

                  {/* Scan line */}
                  <div className="absolute inset-0 scan-line overflow-hidden" />

                  {/* Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-text-secondary">{feed.label}</span>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] text-red-400">REC</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Detection Stats */}
          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {cvDetections.map((detection) => (
              <motion.div
                key={detection.title}
                variants={staggerItem}
                className="glass rounded-xl p-5 card-hover"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-semibold text-sm">{detection.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-md" style={{ background: `${detection.color}15`, color: detection.color }}>
                    {detection.confidence}% confidence
                  </span>
                </div>
                <p className="text-xs text-text-secondary mb-3">{detection.description}</p>
                <div className="flex items-center justify-between">
                  <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden mr-4">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: detection.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${detection.confidence}%` }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <span className="text-sm font-semibold font-heading" style={{ color: detection.color }}>
                    {detection.count}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
