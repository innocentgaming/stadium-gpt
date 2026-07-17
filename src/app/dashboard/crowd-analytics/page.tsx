'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { seededRandom } from '@/lib/utils';
import { Brain, RefreshCw, AlertCircle, Eye, ShieldAlert, Cpu, Circle } from 'lucide-react';

interface ZoneState {
  name: string;
  density: number;
  capacity: number;
  current: number;
  status: string;
}

interface PredictionItem {
  zone: string;
  predictedDensity: number;
  risk: 'low' | 'moderate' | 'high' | 'critical';
  recommendation: string;
}

interface DetectionsLog {
  timestamp: string;
  message: string;
  confidence: number;
}

const initialZones: ZoneState[] = [
  { name: 'North Stand', density: 87, capacity: 22000, current: 19140, status: 'high' },
  { name: 'South Stand', density: 62, capacity: 22000, current: 13640, status: 'moderate' },
  { name: 'East Wing', density: 94, capacity: 18000, current: 16920, status: 'critical' },
  { name: 'West Wing', density: 45, capacity: 18000, current: 8100, status: 'low' },
  { name: 'Concourse A', density: 73, capacity: 5000, current: 3650, status: 'moderate' },
  { name: 'Concourse B', density: 81, capacity: 5000, current: 4050, status: 'high' },
];

export default function CrowdAnalytics() {
  const [zones, setZones] = useState<ZoneState[]>(initialZones);
  const [predictions, setPredictions] = useState<PredictionItem[]>([]);
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [cooldown, setCooldown] = useState(0);

  // Edge AI CCTV Simulator state
  const [showBoxes, setShowBoxes] = useState(true);
  const [thermalMode, setThermalMode] = useState(false);
  const [logsList, setLogsList] = useState<DetectionsLog[]>([
    { timestamp: '14:24:02', message: 'Person detected Section 205', confidence: 98.4 },
    { timestamp: '14:24:05', message: 'Gate 7 North inflow surge detected', confidence: 92.1 },
    { timestamp: '14:24:08', message: 'Sensory Room A entry logged', confidence: 89.7 },
  ]);

  const fetchPrediction = async (currentZones: ZoneState[]) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentZones),
      });

      if (!res.ok) {
        throw new Error(`Failed with server status ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        setPredictions(data.predictions);
        setAdvice(data.generalAdvice);
      } else {
        setErrorMsg(data.error || 'Prediction engine returned an error.');
      }
    } catch (err) {
      console.error('Failed to compute crowd forecast:', err);
      setErrorMsg('Failed to establish connection to the AI predictive telemetry.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualForecast = () => {
    if (cooldown > 0) return;
    fetchPrediction(zones);
    setCooldown(3);
  };

  useEffect(() => {
    if (cooldown === 0) return;
    const t = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  useEffect(() => {
    // Initial fetch
    fetchPrediction(initialZones);

    const interval = setInterval(() => {
      try {
        setZones((prev) => {
          const next = prev.map((zone, idx) => {
            const seedVal = zone.current + idx;
            const change = Math.floor((seededRandom(seedVal) - 0.5) * 80);
            const newCurrent = Math.max(0, Math.min(zone.capacity, zone.current + change));
            const newDensity = Math.round((newCurrent / zone.capacity) * 100);
            let newStatus = 'low';
            if (newDensity > 90) newStatus = 'critical';
            else if (newDensity > 80) newStatus = 'high';
            else if (newDensity > 50) newStatus = 'moderate';
            return { ...zone, current: newCurrent, density: newDensity, status: newStatus };
          });
          // Update prediction list automatically on telemetry change
          fetchPrediction(next);
          return next;
        });

        // Add a mock CCTV Edge detection log
        setLogsList(prev => {
          const nowStr = new Date().toTimeString().split(' ')[0];
          const newLog = {
            timestamp: nowStr,
            message: 'YOLOv8 Gate 7 North: stand density fluctuating',
            confidence: Math.round(90 + Math.random() * 9),
          };
          return [newLog, ...prev.slice(0, 4)];
        });
      } catch (err) {
        console.error('Error simulating crowd fluctuation:', err);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header with Mapping Badge */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold font-heading text-slate-100">Crowd Analytics & Edge AI</h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            [Required Area: Crowd Management / Computer Vision]
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-1">Real-time crowd density, YOLOv8 visual feeds, and flow forecast analysis</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Heatmap Grid */}
        <div className="xl:col-span-2 border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5">
          <h3 className="font-heading font-semibold text-sm mb-4 text-slate-200">Stadium Heatmap (96 Section Array)</h3>
          <div className="grid grid-cols-12 gap-1 aspect-[2/1]">
            {Array.from({ length: 96 }).map((_, i) => {
              const intensity = seededRandom(i);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.005 }}
                  className="rounded-sm cursor-pointer hover:ring-1 hover:ring-white/30 transition-all"
                  style={{
                    background: intensity > 0.8
                      ? 'rgba(245, 158, 11, 0.8)' // Gold (Critical/Warning)
                      : intensity > 0.6
                      ? 'rgba(245, 158, 11, 0.45)' // Gold (High)
                      : intensity > 0.3
                      ? 'rgba(16, 185, 129, 0.5)' // Emerald (Moderate)
                      : 'rgba(16, 185, 129, 0.15)', // Light Emerald
                  }}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <div className="w-3 h-3 rounded-sm bg-emerald-500/20" /> Low
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <div className="w-3 h-3 rounded-sm bg-emerald-500/50" /> Moderate
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <div className="w-3 h-3 rounded-sm bg-secondary/60" /> High
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <div className="w-3 h-3 rounded-sm bg-red-500/70" /> Critical
            </div>
          </div>
        </div>

        {/* Edge AI CCTV Stream Simulator */}
        <div className="xl:col-span-1 border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <h3 className="font-heading font-semibold text-sm text-slate-200">Edge AI Stream</h3>
              </div>
              <span className="flex items-center gap-1 text-[10px] text-red-500 font-bold uppercase">
                <Circle className="w-2 h-2 fill-red-500 animate-pulse" /> Live CV
              </span>
            </div>

            {/* Video viewport simulation */}
            <div className={`relative aspect-video rounded-lg overflow-hidden border border-white/10 transition-colors duration-300 ${
              thermalMode ? 'bg-gradient-to-tr from-blue-900 via-yellow-700 to-red-800' : 'bg-slate-900'
            }`}>
              {/* Scanline grid overlay */}
              <div className="absolute inset-0 scan-line opacity-20 pointer-events-none" />

              {/* Bounding Boxes overlay */}
              {showBoxes && (
                <>
                  <div className="absolute left-[15%] top-[25%] w-[30%] h-[40%] border border-red-500/60 rounded bg-red-500/5">
                    <span className="absolute -top-4 left-0 text-[8px] text-red-400 bg-red-500/20 px-1 py-0.2 rounded font-mono font-bold">
                      Crowd Cluster: 94.2%
                    </span>
                  </div>
                  <div className="absolute left-[55%] top-[10%] w-[12%] h-[30%] border border-emerald-400/80 rounded bg-emerald-400/5">
                    <span className="absolute -top-4 left-0 text-[8px] text-emerald-400 bg-emerald-500/20 px-1 py-0.2 rounded font-mono font-bold">
                      Person: 98%
                    </span>
                  </div>
                  <div className="absolute left-[70%] top-[45%] w-[15%] h-[35%] border border-emerald-400/80 rounded bg-emerald-400/5">
                    <span className="absolute -top-4 left-0 text-[8px] text-emerald-400 bg-emerald-500/20 px-1 py-0.2 rounded font-mono font-bold">
                      Person: 95%
                    </span>
                  </div>
                </>
              )}

              {/* Timestamp label */}
              <div className="absolute bottom-2 left-2 text-[9px] text-slate-300 bg-black/60 px-1.5 py-0.5 rounded font-mono">
                GATE 7 NORTH FEED · YOLOv8
              </div>
            </div>

            {/* Control Toggles */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowBoxes(!showBoxes)}
                className={`flex-1 py-1.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                  showBoxes
                    ? 'bg-emerald-500/25 text-emerald-400 border-emerald-500/30'
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                }`}
              >
                YOLOv8 Bounding Boxes
              </button>
              <button
                onClick={() => setThermalMode(!thermalMode)}
                className={`flex-1 py-1.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                  thermalMode
                    ? 'bg-emerald-500/25 text-emerald-400 border-emerald-500/30'
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                }`}
              >
                Thermal Heat Flow
              </button>
            </div>

            {/* Live edge detection logs */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Computer Vision Telemetry logs:</span>
              <div className="bg-black/40 border border-white/5 rounded-lg p-2.5 max-h-[96px] overflow-y-auto space-y-1 pr-1">
                {logsList.map((log, idx) => (
                  <div key={idx} className="flex justify-between text-[9px] font-mono text-slate-400">
                    <span className="truncate flex-1">[{log.timestamp}] {log.message}</span>
                    <span className="text-emerald-500 ml-2 font-bold">{log.confidence}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Predictive Forecast Panel */}
      <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-emerald-400" />
            <h3 className="font-heading font-semibold text-sm text-slate-200">AI Crowd & Gate Flow Recommendations</h3>
          </div>
          <button
            onClick={handleManualForecast}
            disabled={isLoading || cooldown > 0}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-300 hover:bg-white/10 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            {cooldown > 0 ? `Wait ${cooldown}s` : 'Forecast'}
          </button>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-2 py-4">
            <div className="h-4 bg-white/5 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-white/5 rounded animate-pulse w-5/6" />
            <div className="h-4 bg-white/5 rounded animate-pulse w-2/3" />
          </div>
        ) : (
          <>
            {advice && (
              <p className="text-xs text-slate-300 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                <span className="font-semibold text-emerald-400">AI Advice</span>: {advice}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {predictions.map((p) => (
                <div key={p.zone} className="p-3 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-slate-200">{p.zone}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold capitalize ${
                      p.risk === 'critical' ? 'bg-red-500/10 text-red-400' :
                      p.risk === 'high' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
                      p.risk === 'moderate' ? 'bg-emerald-500/10 text-emerald-400' :
                      'bg-white/5 text-slate-400'
                    }`}>
                      {p.risk} ({p.predictedDensity}%)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 italic">"{p.recommendation}"</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Zone Stats */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {zones.map((zone) => (
          <motion.div key={zone.name} variants={staggerItem} className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-heading font-semibold text-sm text-slate-300">{zone.name}</h4>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                zone.status === 'critical' ? 'bg-red-500/10 text-red-400' :
                zone.status === 'high' ? 'bg-secondary/10 text-secondary' :
                zone.status === 'moderate' ? 'bg-emerald-500/10 text-emerald-400' :
                'bg-emerald-500/5 text-slate-400'
              }`}>
                {zone.density}%
              </span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-2">
              <motion.div
                className={`h-full rounded-full ${
                  zone.status === 'critical' ? 'bg-red-500' :
                  zone.status === 'high' ? 'bg-secondary' :
                  zone.status === 'moderate' ? 'bg-emerald-500' :
                  'bg-emerald-600/40'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${zone.density}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <p className="text-xs text-text-secondary">
              {zone.current.toLocaleString()} / {zone.capacity.toLocaleString()} capacity
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
