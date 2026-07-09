'use client';

import { motion } from 'framer-motion';
import { MapPin, Car, UtensilsCrossed, Stethoscope } from 'lucide-react';

const mapZones = [
  { id: 'north', label: 'North Stand', x: '50%', y: '10%', density: 87, status: 'high' },
  { id: 'south', label: 'South Stand', x: '50%', y: '85%', density: 62, status: 'moderate' },
  { id: 'east', label: 'East Wing', x: '85%', y: '50%', density: 94, status: 'critical' },
  { id: 'west', label: 'West Wing', x: '15%', y: '50%', density: 45, status: 'low' },
  { id: 'field', label: 'Pitch', x: '50%', y: '50%', density: 0, status: 'field' },
];

const pois = [
  { icon: UtensilsCrossed, label: 'F&B Station 1', x: '25%', y: '25%' },
  { icon: UtensilsCrossed, label: 'F&B Station 2', x: '75%', y: '25%' },
  { icon: Stethoscope, label: 'Medical Bay', x: '20%', y: '70%' },
  { icon: Car, label: 'Parking A', x: '10%', y: '15%' },
  { icon: Car, label: 'Parking B', x: '90%', y: '15%' },
];

/**
 * Stadium Seating Map Overlay View.
 * Addresses [Required Area: Navigation].
 */
export default function StadiumMap() {
  return (
    <div className="space-y-6">
      {/* Header with Mapping Badge */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold font-heading text-slate-100">Live Stadium Map</h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            [Required Area: Navigation]
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-1">Interactive venue layout with real-time data overlay</p>
      </div>

      {/* Map Container */}
      <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5">
        <div className="relative aspect-[16/9] bg-slate-950/80 rounded-xl overflow-hidden border border-white/5">
          {/* Grid overlay */}
          <div className="absolute inset-0 grid-pattern opacity-30" />

          {/* Stadium outline */}
          <div className="absolute inset-[10%] border-2 border-white/10 rounded-[40%] flex items-center justify-center">
            <div className="w-[60%] h-[40%] border border-emerald-500/30 rounded-lg bg-emerald-500/5 flex items-center justify-center">
              <span className="text-xs text-emerald-400/50 font-heading tracking-widest">PITCH</span>
            </div>
          </div>

          {/* Density zones */}
          {mapZones.filter(z => z.status !== 'field').map((zone) => (
            <motion.div
              key={zone.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: zone.x, top: zone.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xs font-bold transition-all group-hover:scale-110 ${
                zone.status === 'critical' ? 'bg-red-500/20 text-red-400 animate-pulse border border-red-500/30' :
                zone.status === 'high' ? 'bg-secondary/20 text-secondary border border-secondary/30' :
                zone.status === 'moderate' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                'bg-emerald-500/10 text-slate-300 border border-emerald-500/20'
              }`}>
                {zone.density}%
              </div>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-text-muted whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {zone.label}
              </span>
            </motion.div>
          ))}

          {/* POIs */}
          {pois.map((poi, i) => (
            <motion.div
              key={poi.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: poi.x, top: poi.y }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <poi.icon className="w-3.5 h-3.5 text-text-secondary" />
              </div>
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-text-muted whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {poi.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          {[
            { label: 'Low', color: 'bg-emerald-500/10 border border-emerald-500/20' },
            { label: 'Moderate', color: 'bg-emerald-500/20 border border-emerald-500/30' },
            { label: 'High', color: 'bg-secondary/20 border border-secondary/30' },
            { label: 'Critical', color: 'bg-red-500/20 border border-red-500/30' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5 text-xs text-text-muted">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              {item.label}
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <MapPin className="w-3 h-3 text-emerald-400" /> POI
          </div>
        </div>
      </div>
    </div>
  );
}
