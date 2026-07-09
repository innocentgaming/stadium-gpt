'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Cpu, HardDrive } from 'lucide-react';

const mockSensors = [
  { group: 'Gate CCTV Arrays', count: 184, health: '98.4%', status: 'Active' },
  { group: 'BLE Beacons (Concourse)', count: 420, health: '100%', status: 'Active' },
  { group: 'Turnstile IoT', count: 96, health: '95.2%', status: 'Maintenance Req.' },
  { group: 'HVAC Air Intake', count: 24, health: '100%', status: 'Active' },
];

const mockMaintenance = [
  { item: 'Gate 4 North Turnstiles', risk: 'High (0.87)', scheduled: '2026-07-11', type: 'Firmware Update' },
  { item: 'Concourse level 1 Lights', risk: 'Low (0.24)', scheduled: '2026-07-15', type: 'Bulb Replacement' },
  { item: 'Field Sprinkler Valve B', risk: 'Medium (0.55)', scheduled: '2026-07-12', type: 'Pressure Check' },
];

/**
 * Operations and Digital Twin Page Component.
 * Addresses [Required Area: Operational Intelligence].
 * Configures motion whileTap transitions on digital twin telemetry controls.
 */
export default function OperationsDashboardPage() {
  const [roofOpen, setRoofOpen] = useState(false);
  const [fieldTemp, setFieldTemp] = useState(21.5);

  const toggleRoof = () => {
    try {
      const nextState = !roofOpen;
      setRoofOpen(nextState);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('roofState', nextState ? 'OPEN' : 'CLOSED');
        window.dispatchEvent(new CustomEvent('roofToggle', { detail: nextState ? 'OPEN' : 'CLOSED' }));
      }
    } catch (err) {
      console.error('Error toggling retractable roof:', err);
    }
  };

  const adjustTemp = (delta: number) => {
    try {
      setFieldTemp((prev) => {
        const newVal = Number((prev + delta).toFixed(1));
        const clampedVal = Math.min(30, Math.max(15, newVal));
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('fieldTemp', clampedVal.toString());
          window.dispatchEvent(new CustomEvent('tempChange', { detail: clampedVal }));
        }
        return clampedVal;
      });
    } catch (err) {
      console.error('Error adjusting field temperature:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Mapping Badge */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold font-heading text-slate-100">Stadium Operations & Digital Twin</h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            [Required Area: Operational Intelligence]
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-1">IoT sensor arrays, automated structural telemetry, and predictive maintenance schedules.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Digital Twin Control Panel */}
        <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <h3 className="font-heading font-semibold text-sm text-slate-200">Digital Twin Telemetry</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 rounded-lg border border-white/5 bg-white/[0.01]">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Retractable Roof</p>
              <p className="text-lg font-bold text-slate-200 font-heading mt-1">{roofOpen ? 'OPEN' : 'CLOSED'}</p>
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={toggleRoof}
                className="mt-2.5 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs text-slate-300 hover:bg-white/10 transition-colors cursor-pointer"
              >
                {roofOpen ? 'Close Roof' : 'Open Roof'}
              </motion.button>
            </div>

            <div className="p-3.5 rounded-lg border border-white/5 bg-white/[0.01]">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Field Temperature</p>
              <p className="text-lg font-bold text-slate-200 font-heading mt-1">{fieldTemp}°C</p>
              <div className="flex gap-2 mt-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustTemp(-0.5)}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-300 hover:bg-white/10 cursor-pointer"
                >
                  -
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustTemp(0.5)}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-300 hover:bg-white/10 cursor-pointer"
                >
                  +
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* IoT Telemetry Groups */}
        <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-secondary" />
            <h3 className="font-heading font-semibold text-sm text-slate-200">IoT Sensor Health</h3>
          </div>
          <div className="space-y-2">
            {mockSensors.map((sensor, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-white/5 bg-white/[0.01]">
                <div>
                  <h4 className="text-xs font-semibold text-slate-300">{sensor.group}</h4>
                  <p className="text-[10px] text-slate-500">{sensor.count} active terminals</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-semibold ${sensor.status.includes('Maint') ? 'text-red-400' : 'text-emerald-400'}`}>
                    {sensor.health} Health
                  </span>
                  <p className="text-[10px] text-slate-500">{sensor.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Predictive Maintenance */}
      <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-secondary" />
            <h3 className="font-heading font-semibold text-sm text-slate-200">Predictive Maintenance Roster</h3>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Last analysis: Just now</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-slate-500">
                <th className="text-left py-2 px-3 text-xs font-medium">Equipment Name</th>
                <th className="text-left py-2 px-3 text-xs font-medium">Failure Risk Index</th>
                <th className="text-left py-2 px-3 text-xs font-medium">Failure Category</th>
                <th className="text-left py-2 px-3 text-xs font-medium">Scheduled Date</th>
              </tr>
            </thead>
            <tbody>
              {mockMaintenance.map((maint, i) => (
                <tr key={i} className="border-b border-white/5 text-slate-300 bg-white/[0.005]">
                  <td className="py-2.5 px-3 text-xs font-semibold">{maint.item}</td>
                  <td className="py-2.5 px-3 text-xs">
                    <span className={maint.risk.includes('High') ? 'text-red-400 font-semibold' : 'text-slate-400'}>
                      {maint.risk}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-xs text-slate-400">{maint.type}</td>
                  <td className="py-2.5 px-3 text-xs text-slate-400">{maint.scheduled}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
