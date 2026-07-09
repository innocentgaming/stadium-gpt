'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Train, Clock } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const transitStatus = [
  { mode: 'Metro Line A (Blue)', status: 'Operational', eta: '3 min', color: 'text-emerald-400' },
  { mode: 'Metro Line B (Green)', status: 'Operational', eta: '5 min', color: 'text-emerald-400' },
  { mode: 'Shuttle Link 7', status: 'Delayed (Accident)', eta: '12 min', color: 'text-red-400' },
  { mode: 'Rideshare Zone C', status: 'High Wait', eta: '15 min', color: 'text-secondary' },
];

const parkingStatus = [
  { zone: 'Lot A (North)', total: 1200, occupied: 1140, ev: 12, handicap: 35 },
  { zone: 'Lot B (South)', total: 800, occupied: 560, ev: 20, handicap: 12 },
  { zone: 'Lot C (Reserved)', total: 500, occupied: 490, ev: 8, handicap: 24 },
];

// Seeded traffic prediction data
const trafficData = [
  { time: '14:00', delay: 10 },
  { time: '15:00', delay: 25 },
  { time: '16:00', delay: 45 },
  { time: '17:00', delay: 80 },
  { time: '18:00', delay: 35 },
  { time: '19:00', delay: 15 },
];

/**
 * Transportation and Transit Page Component.
 * Addresses [Required Area: Transportation].
 * Configures tactile tap scaling on interactive grid elements and smooth Recharts animations.
 */
export default function TransportationPage() {
  const [selectedZone, setSelectedZone] = useState('Lot A (North)');

  return (
    <div className="space-y-6">
      {/* Header with Mapping Badge */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold font-heading text-slate-100">Transportation & Transit Control</h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            [Required Area: Transportation]
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-1">Real-time terminal logistics, parking lot density, and metro statuses.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transit Status */}
        <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Train className="w-5 h-5 text-emerald-400" />
            <h3 className="font-heading font-semibold text-sm text-slate-200">Public Transit Logistics</h3>
          </div>
          <div className="space-y-3">
            {transitStatus.map((transit, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.01]">
                <div>
                  <h4 className="text-xs font-semibold text-slate-300">{transit.mode}</h4>
                  <p className="text-[10px] text-slate-500">ETA to Gate: {transit.eta}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-semibold ${transit.color}`}>
                    {transit.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Parking Lots with click tap animations */}
        <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-secondary" />
            <h3 className="font-heading font-semibold text-sm text-slate-200">Parking Grid Status</h3>
          </div>
          <div className="space-y-3">
            {parkingStatus.map((lot, i) => {
              const occupancy = Math.round((lot.occupied / lot.total) * 100);
              return (
                <motion.div
                  key={i}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedZone(lot.zone)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedZone === lot.zone ? 'border-emerald-500/30 bg-emerald-500/[0.03]' : 'border-white/5 bg-white/[0.01]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-semibold text-slate-300">{lot.zone}</h4>
                    <span className="text-xs text-slate-400 font-mono">{occupancy}% full</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full ${occupancy > 90 ? 'bg-red-400' : 'bg-emerald-400'}`}
                      style={{ width: `${occupancy}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>EV Slots: {lot.ev}</span>
                    <span>Accessibility Spots: {lot.handicap}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Traffic Congestion Prediction with smooth Bar animations */}
      <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-secondary" />
          <h3 className="font-heading font-semibold text-sm text-slate-200">AI Traffic Congestion Prediction (Delays in Mins)</h3>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trafficData}>
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
              <Bar
                dataKey="delay"
                name="Delay (min)"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
                isAnimationActive={true}
                animationDuration={800}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
