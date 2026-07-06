'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

const initialZones = [
  { name: 'North Stand', density: 87, capacity: 22000, current: 19140, status: 'high' },
  { name: 'South Stand', density: 62, capacity: 22000, current: 13640, status: 'moderate' },
  { name: 'East Wing', density: 94, capacity: 18000, current: 16920, status: 'critical' },
  { name: 'West Wing', density: 45, capacity: 18000, current: 8100, status: 'low' },
  { name: 'Concourse A', density: 73, capacity: 5000, current: 3650, status: 'moderate' },
  { name: 'Concourse B', density: 81, capacity: 5000, current: 4050, status: 'high' },
];

export default function CrowdAnalytics() {
  const [zones, setZones] = useState(initialZones);

  useEffect(() => {
    const interval = setInterval(() => {
      setZones((prev) =>
        prev.map((zone) => {
          const change = Math.floor((Math.random() - 0.5) * 80);
          const newCurrent = Math.max(0, Math.min(zone.capacity, zone.current + change));
          const newDensity = Math.round((newCurrent / zone.capacity) * 100);
          let newStatus = 'low';
          if (newDensity > 90) newStatus = 'critical';
          else if (newDensity > 80) newStatus = 'high';
          else if (newDensity > 50) newStatus = 'moderate';
          return { ...zone, current: newCurrent, density: newDensity, status: newStatus };
        })
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Crowd Analytics</h1>
        <p className="text-sm text-text-secondary mt-1">Real-time crowd density and flow analysis</p>
      </div>

      {/* Heatmap Grid */}
      <div className="glass rounded-xl p-5">
        <h3 className="font-heading font-semibold text-sm mb-4">Stadium Heatmap</h3>
        <div className="grid grid-cols-12 gap-1 aspect-[2/1]">
          {Array.from({ length: 96 }).map((_, i) => {
            const intensity = Math.random();
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.01 }}
                className="rounded-sm cursor-pointer hover:ring-1 hover:ring-white/30 transition-all"
                style={{
                  background: intensity > 0.8
                    ? 'rgba(239, 68, 68, 0.7)'
                    : intensity > 0.6
                    ? 'rgba(245, 158, 11, 0.6)'
                    : intensity > 0.3
                    ? 'rgba(59, 130, 246, 0.5)'
                    : 'rgba(59, 130, 246, 0.15)',
                }}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <div className="w-3 h-3 rounded-sm bg-blue-500/20" /> Low
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <div className="w-3 h-3 rounded-sm bg-blue-500/50" /> Moderate
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <div className="w-3 h-3 rounded-sm bg-amber-500/60" /> High
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <div className="w-3 h-3 rounded-sm bg-red-500/70" /> Critical
          </div>
        </div>
      </div>

      {/* Zone Stats */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {zones.map((zone) => (
          <motion.div key={zone.name} variants={staggerItem} className="glass rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-heading font-semibold text-sm">{zone.name}</h4>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                zone.status === 'critical' ? 'bg-red-500/10 text-red-400' :
                zone.status === 'high' ? 'bg-amber-500/10 text-amber-400' :
                zone.status === 'moderate' ? 'bg-blue-500/10 text-blue-400' :
                'bg-green-500/10 text-green-400'
              }`}>
                {zone.density}%
              </span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-2">
              <motion.div
                className={`h-full rounded-full ${
                  zone.status === 'critical' ? 'bg-red-500' :
                  zone.status === 'high' ? 'bg-amber-500' :
                  zone.status === 'moderate' ? 'bg-blue-500' :
                  'bg-green-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${zone.density}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <p className="text-xs text-text-muted">
              {zone.current.toLocaleString()} / {zone.capacity.toLocaleString()} capacity
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
