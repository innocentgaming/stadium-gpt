'use client';

import { useState, useEffect } from 'react';
import { Clock, Users, Brain, AlertTriangle, Zap, Shield, Eye } from 'lucide-react';
import StatsGrid from '@/components/dashboard/StatsGrid';
import CrowdAreaChart from '@/components/dashboard/CrowdAreaChart';
import AlertsWorkloadSection from '@/components/dashboard/AlertsWorkloadSection';

// Initial stats mock setup matching constants
const initialStats = [
  { label: 'Active Fans', value: '94,218', change: '+12.3%', up: true, icon: Users, color: '#10B981' },
  { label: 'AI Responses/min', value: '8,432', change: '+34.1%', up: true, icon: Brain, color: '#10B981' },
  { label: 'Active Incidents', value: '3', change: '-23%', up: false, icon: AlertTriangle, color: '#F59E0B' },
  { label: 'Avg Latency', value: '87ms', change: '-18%', up: false, icon: Zap, color: '#10B981' },
  { label: 'Safety Score', value: '98.7%', change: '+0.3%', up: true, icon: Shield, color: '#10B981' },
  { label: 'CV Feeds Active', value: '847', change: '+2', up: true, icon: Eye, color: '#10B981' },
];

const initialAlerts = [
  { message: 'High crowd density detected at Gate 7 North', level: 'warning', time: '2 min ago', agent: 'Safety Agent' },
  { message: 'Medical assistance requested at Section 205', level: 'critical', time: '5 min ago', agent: 'Medical Agent' },
  { message: 'Queue exceeds 15min at F&B Station 3', level: 'info', time: '8 min ago', agent: 'Operations Agent' },
  { message: 'Parking Zone A reached 94% capacity', level: 'warning', time: '12 min ago', agent: 'Navigation Agent' },
];

const initialAgents = [
  { name: 'Navigation Agent', status: 'active', tasks: 1247, load: 67 },
  { name: 'Safety Agent', status: 'active', tasks: 892, load: 78 },
  { name: 'Medical Agent', status: 'active', tasks: 234, load: 42 },
  { name: 'Volunteer Agent', status: 'active', tasks: 567, load: 55 },
];

// Seeded static trend for the chart
const trendData = [
  { time: '12:00', density: 45, confidence: 98.4 },
  { time: '13:00', density: 50, confidence: 98.2 },
  { time: '14:00', density: 65, confidence: 98.7 },
  { time: '15:00', density: 85, confidence: 99.1 },
  { time: '16:00', density: 70, confidence: 98.9 },
  { time: '17:00', density: 92, confidence: 99.3 },
  { time: '18:00', density: 60, confidence: 99.0 },
];

/**
 * Command Center Dashboard Page Component.
 * Addresses [Required Area: Real-Time Decision Support] & [Required Area: Operational Intelligence].
 */
export default function CommandCenter() {
  const [liveStats, setLiveStats] = useState(initialStats);
  const [agents, setAgents] = useState(initialAgents);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live fluctuating active fans & latency stats
      try {
        setLiveStats((prev) =>
          prev.map((stat) => {
            if (stat.label === 'Active Fans') {
              const currentVal = parseInt(stat.value.replace(/,/g, ''));
              const fluctuation = Math.floor((Math.random() - 0.5) * 150);
              return { ...stat, value: (currentVal + fluctuation).toLocaleString() };
            }
            if (stat.label === 'Avg Latency') {
              const currentVal = parseInt(stat.value);
              const fluctuation = Math.floor((Math.random() - 0.5) * 6);
              return { ...stat, value: `${Math.max(40, currentVal + fluctuation)}ms` };
            }
            if (stat.label === 'AI Responses/min') {
              const currentVal = parseInt(stat.value.replace(/,/g, ''));
              const fluctuation = Math.floor((Math.random() - 0.5) * 20);
              return { ...stat, value: (currentVal + fluctuation).toLocaleString() };
            }
            return stat;
          })
        );

        // Fluctuating active workloads
        setAgents((prev) =>
          prev.map((agent) => {
            const loadFluc = Math.floor((Math.random() - 0.5) * 8);
            const newLoad = Math.min(100, Math.max(10, agent.load + loadFluc));
            return { ...agent, load: newLoad, tasks: agent.tasks + Math.floor(Math.random() * 3) };
          })
        );
      } catch (err) {
        console.error('Error updating live telemetry simulation:', err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load initial values from localStorage
    const savedRoof = window.localStorage.getItem('roofState');
    if (savedRoof === 'OPEN') {
      setLiveStats((prev) =>
        prev.map((stat) => (stat.label === 'Safety Score' ? { ...stat, value: '97.2%' } : stat))
      );
    }

    const savedTemp = window.localStorage.getItem('fieldTemp');
    if (savedTemp && Number(savedTemp) > 24) {
      setLiveStats((prev) =>
        prev.map((stat) => (stat.label === 'Avg Latency' ? { ...stat, value: '94ms' } : stat))
      );
    }

    const handleRoofToggle = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setLiveStats((prev) =>
        prev.map((stat) => {
          if (stat.label === 'Safety Score') {
            const safetyVal = customEvent.detail === 'OPEN' ? '97.2%' : '98.7%';
            return { ...stat, value: safetyVal };
          }
          return stat;
        })
      );
    };

    const handleTempChange = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      setLiveStats((prev) =>
        prev.map((stat) => {
          if (stat.label === 'Avg Latency') {
            const tempVal = customEvent.detail;
            const targetLat = tempVal > 24 ? '94ms' : '87ms';
            return { ...stat, value: targetLat };
          }
          return stat;
        })
      );
    };

    window.addEventListener('roofToggle', handleRoofToggle);
    window.addEventListener('tempChange', handleTempChange);
    return () => {
      window.removeEventListener('roofToggle', handleRoofToggle);
      window.removeEventListener('tempChange', handleTempChange);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Dashboard Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-heading text-slate-100">Command Center</h1>
            {/* Required Area Mapping Badge */}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
              [Required Area: Real-Time Decision Support]
            </span>
          </div>
          <p className="text-sm text-text-secondary mt-1">MetLife Stadium — Real-time Operations & Analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-text-secondary">
            <Clock className="w-3.5 h-3.5" />
            Live Update Stream
          </span>
        </div>
      </div>

      {/* Stats Grid Sub-component */}
      <StatsGrid liveStats={liveStats} />

      {/* Recharts Analytics Area Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CrowdAreaChart chartData={trendData} />
        <div className="lg:col-span-1 border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 flex flex-col justify-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Operational Context</span>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Telemetry tracks CCTV arrays (YOLOv8 counting), BLE beacons inside concourses, and ticketing gates. Decision recommendations are state-synchronized by LangGraph orchestrators.
          </p>
        </div>
      </div>

      {/* Alerts & Agents Workload Sub-component */}
      <AlertsWorkloadSection liveAlerts={initialAlerts} agents={agents} />
    </div>
  );
}
