'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface ChartPoint {
  time: string;
  density: number;
  confidence: number;
}

interface CrowdAreaChartProps {
  chartData: ChartPoint[];
}

/**
 * Recharts area visualizer showing live density metrics.
 * Configures explicit path-drawing animations for smooth transitions.
 *
 * @param chartData - Time series data points array
 */
export default function CrowdAreaChart({ chartData }: CrowdAreaChartProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="lg:col-span-2 border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5"
    >
      <h3 className="font-heading font-semibold text-sm mb-4 text-slate-200">Crowd Density Tracking</h3>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorDensity" x1="0" y1="0" x2="0" y2="1">
                {/* Emerald Green Theme Fill */}
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#475569" fontSize={11} tickLine={false} />
            <YAxis stroke="#475569" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#151e30',
                borderColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 8,
                color: '#fff',
              }}
            />
            <Area
              type="monotone"
              dataKey="density"
              name="Density (%)"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#colorDensity)"
              strokeWidth={2}
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
