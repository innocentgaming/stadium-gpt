'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Car, UtensilsCrossed, Stethoscope, RefreshCw, AlertTriangle, ShieldAlert, Cpu } from 'lucide-react';

interface MapZone {
  id: string;
  label: string;
  x: string;
  y: string;
  capacity: number;
}

interface ZoneMetrics {
  activeFans: number;
  density: number;
  status: string;
}

const mapZones: MapZone[] = [
  { id: 'north', label: 'North Stand', x: '50%', y: '15%', capacity: 22000 },
  { id: 'south', label: 'South Stand', x: '50%', y: '85%', capacity: 22000 },
  { id: 'east', label: 'East Wing', x: '85%', y: '50%', capacity: 18000 },
  { id: 'west', label: 'West Wing', x: '15%', y: '50%', capacity: 18000 },
];

const pois = [
  { icon: UtensilsCrossed, label: 'F&B Station 1', x: '25%', y: '25%' },
  { icon: UtensilsCrossed, label: 'F&B Station 2', x: '75%', y: '25%' },
  { icon: Stethoscope, label: 'Medical Bay', x: '20%', y: '70%' },
  { icon: Car, label: 'Parking A', x: '10%', y: '15%' },
  { icon: Car, label: 'Parking B', x: '90%', y: '15%' },
];

export default function StadiumMap() {
  const [selectedZone, setSelectedZone] = useState<MapZone | null>(null);
  const [metrics, setMetrics] = useState<ZoneMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Local state copy of zones to show live badges on the map initially
  const [liveZonesData, setLiveZonesData] = useState<Record<string, ZoneMetrics>>({
    north: { activeFans: 19140, density: 87, status: 'high' },
    south: { activeFans: 13640, density: 62, status: 'moderate' },
    east: { activeFans: 16920, density: 94, status: 'critical' },
    west: { activeFans: 8100, density: 45, status: 'low' },
  });

  const fetchZoneMetrics = async (zone: MapZone) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`/api/metrics?zone=${zone.id}`);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (data.success) {
        setMetrics(data.data);
        // Sync map indicators
        setLiveZonesData(prev => ({
          ...prev,
          [zone.id]: data.data,
        }));
      } else {
        setErrorMsg('Failed to read zone telemetry.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to establish connection to the IoT sensor array.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleZoneSelect = (zone: MapZone) => {
    setSelectedZone(zone);
    fetchZoneMetrics(zone);
  };

  return (
    <div className="space-y-6">
      {/* Header with Mapping Badge */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold font-heading text-slate-100">Live Stadium Map</h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            [Required Area: Navigation / Operational Intelligence]
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-1">Interactive Digital Twin layout with real-time IoT sensor telemetry.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2 border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5">
          <div className="relative aspect-[16/10] bg-slate-950/80 rounded-xl overflow-hidden border border-white/5">
            {/* Grid overlay */}
            <div className="absolute inset-0 grid-pattern opacity-30" />

            {/* Stadium outline */}
            <div className="absolute inset-[8%] border-2 border-white/10 rounded-[35%] flex items-center justify-center">
              <div className="w-[50%] h-[35%] border border-emerald-500/20 rounded bg-emerald-500/5 flex items-center justify-center">
                <span className="text-[10px] text-emerald-400/40 font-heading tracking-widest">PITCH</span>
              </div>
            </div>

            {/* Density zones */}
            {mapZones.map((zone) => {
              const liveMetrics = liveZonesData[zone.id];
              const isSelected = selectedZone?.id === zone.id;

              return (
                <motion.button
                  key={zone.id}
                  onClick={() => handleZoneSelect(zone)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group flex flex-col items-center focus:outline-none`}
                  style={{ left: zone.x, top: zone.y }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className={`w-14 h-14 rounded-full flex flex-col items-center justify-center text-xs font-bold transition-all border shadow-lg ${
                    isSelected ? 'ring-2 ring-emerald-400 scale-105' : ''
                  } ${
                    liveMetrics?.status === 'critical' ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse' :
                    liveMetrics?.status === 'high' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                    liveMetrics?.status === 'moderate' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                    'bg-slate-500/20 text-slate-300 border-white/10'
                  }`}>
                    <span className="text-[10px] uppercase font-semibold tracking-tighter opacity-80">{zone.id}</span>
                    <span className="text-xs font-extrabold">{liveMetrics?.density || 0}%</span>
                  </div>
                  <span className="mt-1 text-[9px] text-slate-400 bg-slate-950/80 px-1.5 py-0.5 rounded border border-white/5 font-semibold">
                    {zone.label}
                  </span>
                </motion.button>
              );
            })}

            {/* POIs */}
            {pois.map((poi, i) => (
              <motion.div
                key={poi.label}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: poi.x, top: poi.y }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <poi.icon className="w-3.5 h-3.5 text-text-secondary" />
                </div>
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-text-muted whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {poi.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            {[
              { label: 'Low (<50%)', color: 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' },
              { label: 'Moderate (50-80%)', color: 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' },
              { label: 'High (80-90%)', color: 'bg-amber-500/20 border border-amber-500/30 text-amber-400' },
              { label: 'Critical (>90%)', color: 'bg-red-500/20 border border-red-500/30 text-red-400' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 text-[10px] text-text-muted font-medium">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                {item.label}
              </div>
            ))}
            <div className="flex items-center gap-1.5 text-[10px] text-text-muted font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> POI
            </div>
          </div>
        </div>

        {/* Telemetry Details Inspector Card */}
        <div className="lg:col-span-1 border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <h3 className="font-heading font-semibold text-sm text-slate-200">IoT Stand Inspector</h3>
            </div>

            <AnimatePresence mode="wait">
              {!selectedZone ? (
                <motion.div
                  key="no-select"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-10 text-center space-y-2"
                >
                  <AlertTriangle className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs text-text-secondary">Click any seating stand on the map layout to inspect live telemetry feeds.</p>
                </motion.div>
              ) : isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-10 text-center space-y-3"
                >
                  <RefreshCw className="w-6 h-6 text-emerald-500 animate-spin mx-auto" />
                  <p className="text-xs text-text-muted">Querying edge RFID nodes...</p>
                </motion.div>
              ) : errorMsg ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs"
                >
                  {errorMsg}
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4 text-xs"
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 font-heading">{selectedZone.label}</h4>
                    <p className="text-[10px] text-text-muted mt-0.5">Seating capacity: {selectedZone.capacity.toLocaleString()} seats</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-white/[0.01] border border-white/5">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Active Fans</span>
                      <p className="text-lg font-extrabold text-slate-200 mt-1 font-heading">
                        {metrics?.activeFans.toLocaleString() || '0'}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-white/[0.01] border border-white/5">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Density</span>
                      <p className="text-lg font-extrabold text-slate-200 mt-1 font-heading">
                        {metrics?.density}%
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block mb-1">Status Alerts</span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold capitalize border ${
                      metrics?.status === 'critical' ? 'bg-red-500/15 text-red-400 border-red-500/20' :
                      metrics?.status === 'high' ? 'bg-amber-500/15 text-amber-400 border-amber-500/20' :
                      'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {metrics?.status === 'critical' && <ShieldAlert className="w-3.5 h-3.5" />}
                      {metrics?.status || 'unknown'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-white/5 mt-4 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">AI Guideline Suggestion:</span>
                    <p className="text-text-secondary leading-relaxed italic text-[11px] bg-white/5 p-2.5 rounded-lg border border-white/5">
                      {metrics?.status === 'critical'
                        ? '"Dynamic perimeter holds required. Divert incoming fans at Gate 7 North to secondary turnstiles immediately."'
                        : metrics?.status === 'high'
                        ? '"Deploy volunteer guide pairs to direct incoming stands flow. Monitor Gate queue times closely."'
                        : '"Distribution parameters are normal. Maintain default volunteer coordinates."'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-t border-white/5 pt-4 mt-6">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block mb-1">Interactive Simulation</span>
            <p className="text-[10px] text-text-muted leading-relaxed">
              Clicks send telemetry query tokens to `/api/metrics` dynamically. Live changes in operations parameters will reflect on re-inspection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
