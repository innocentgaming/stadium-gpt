'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  change: string;
  up: boolean;
  icon: LucideIcon;
  color: string;
}

interface StatsGridProps {
  liveStats: StatItem[];
}

/**
 * Animated counter that parses numbers out of formatted strings (e.g. "94,218", "87ms", "98.7%")
 * and counts up/transitions smoothly during mounts and value fluctuations.
 */
function StatsCounter({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState(() => {
    const nonDigits = value.replace(/[0-9.,]/g, '');
    return `0${nonDigits}`;
  });
  const prevValueRef = useRef(`0${value.replace(/[0-9.,]/g, '')}`);

  useEffect(() => {
    const prev = prevValueRef.current;
    prevValueRef.current = value;

    const prevDigits = prev.replace(/[^0-9.]/g, '');
    const newDigits = value.replace(/[^0-9.]/g, '');

    const startNum = parseFloat(prevDigits) || 0;
    const endNum = parseFloat(newDigits) || 0;

    if (startNum === endNum) {
      setDisplayValue(value);
      return;
    }

    const nonDigits = value.replace(/[0-9.,]/g, '');
    const hasComma = value.includes(',');

    let startTime = performance.now();
    const duration = 750; // ms transition speed
    let frameId: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: easeOutQuad
      const ease = progress * (2 - progress);
      const current = startNum + (endNum - startNum) * ease;
      const rounded = Math.floor(current);

      const formatted = hasComma ? rounded.toLocaleString() : rounded.toString();
      setDisplayValue(`${formatted}${nonDigits}`);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [value]);

  return <span>{displayValue}</span>;
}

/**
 * Grid of dashboard metric cards.
 * Uses Framer Motion for staggered fade-in, dynamic count-ups, and hover elevations.
 *
 * @param liveStats - Array of metrics objects
 */
export default function StatsGrid({ liveStats }: StatsGridProps) {
  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {liveStats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={staggerItem}
          whileHover={{ scale: 1.02, y: -2, borderColor: 'rgba(30, 138, 95, 0.3)' }}
          className="group relative border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 transition-all duration-200 hover:shadow-[0_0_20px_rgba(30,138,95,0.05)] cursor-pointer"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{stat.label}</span>
            <stat.icon className="w-4 h-4 transition-colors" style={{ color: stat.color }} />
          </div>
          
          {/* Main Numeric Metric with Count-Up animation */}
          <h3 className="text-3xl font-extrabold font-heading text-slate-100 mt-4 tracking-tight">
            <StatsCounter value={stat.value} />
          </h3>

          {/* Change Indicator Badges */}
          <div className="flex items-center gap-1.5 mt-3">
            <span className={`flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded ${
              stat.up && stat.label !== 'Active Incidents'
                ? 'bg-emerald-500/10 text-emerald-400'
                : !stat.up
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-red-500/10 text-red-400'
            }`}>
              {stat.up ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
              {stat.change}
            </span>
            <span className="text-[9px] text-slate-600 font-semibold uppercase tracking-wider">vs last hour</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
