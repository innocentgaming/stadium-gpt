'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/animations';
import {
  Users, AlertTriangle, Brain, Shield, Eye,
  TrendingUp, TrendingDown, Clock, Zap
} from 'lucide-react';
import { seededRandom } from '@/lib/utils';

const stats = [
  { label: 'Active Fans', value: '94,218', change: '+12.3%', up: true, icon: Users, color: '#3b82f6' },
  { label: 'AI Responses/min', value: '8,432', change: '+34.1%', up: true, icon: Brain, color: '#8b5cf6' },
  { label: 'Active Incidents', value: '3', change: '-23%', up: false, icon: AlertTriangle, color: '#ef4444' },
  { label: 'Avg Latency', value: '87ms', change: '-18%', up: false, icon: Zap, color: '#06b6d4' },
  { label: 'Safety Score', value: '98.7%', change: '+0.3%', up: true, icon: Shield, color: '#22c55e' },
  { label: 'CV Feeds Active', value: '847', change: '+2', up: true, icon: Eye, color: '#f59e0b' },
];

const recentAlerts = [
  { message: 'High crowd density detected at Gate 7 North', level: 'warning', time: '2 min ago', agent: 'Safety Agent' },
  { message: 'Medical assistance requested at Section 205', level: 'critical', time: '5 min ago', agent: 'Medical Agent' },
  { message: 'Queue exceeds 15min at F&B Station 3', level: 'info', time: '8 min ago', agent: 'Operations Agent' },
  { message: 'Parking Zone A reached 94% capacity', level: 'warning', time: '12 min ago', agent: 'Navigation Agent' },
  { message: 'Suspicious package alert resolved — cleared', level: 'resolved', time: '15 min ago', agent: 'Safety Agent' },
  { message: 'Power consumption optimized — saved 12 kWh', level: 'success', time: '20 min ago', agent: 'Sustainability Agent' },
];

const agentStatus = [
  { name: 'Navigation Agent', status: 'active', tasks: 1247, load: 67 },
  { name: 'Safety Agent', status: 'active', tasks: 892, load: 78 },
  { name: 'Medical Agent', status: 'active', tasks: 234, load: 42 },
  { name: 'Volunteer Agent', status: 'active', tasks: 567, load: 55 },
  { name: 'Accessibility Agent', status: 'active', tasks: 189, load: 31 },
  { name: 'Translation Agent', status: 'active', tasks: 445, load: 61 },
  { name: 'Operations Agent', status: 'active', tasks: 678, load: 72 },
  { name: 'Sustainability Agent', status: 'active', tasks: 123, load: 28 },
];

export default function CommandCenter() {
  const [liveStats, setLiveStats] = useState(stats);
  const [liveAlerts] = useState(recentAlerts);
  const [agents, setAgents] = useState(agentStatus);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live fluctuating active fans
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

      // Fluctuating agent workloads
      setAgents((prev) =>
        prev.map((agent) => {
          const loadFluc = Math.floor((Math.random() - 0.5) * 8);
          const newLoad = Math.min(100, Math.max(10, agent.load + loadFluc));
          return { ...agent, load: newLoad, tasks: agent.tasks + Math.floor(Math.random() * 3) };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">Command Center</h1>
          <p className="text-sm text-text-secondary mt-1">MetLife Stadium — Real-time Overview</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-xs text-text-secondary">
            <Clock className="w-3.5 h-3.5" />
            Last updated: Just now
          </span>
        </div>
      </div>

      {/* Stats Grid */}
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
            className="glass rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold font-heading">{stat.value}</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-text-muted">{stat.label}</p>
              <span className={`flex items-center gap-0.5 text-xs ${stat.up && stat.label !== 'Active Incidents' ? 'text-green-400' : !stat.up ? 'text-green-400' : 'text-red-400'}`}>
                {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crowd Density Chart */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="lg:col-span-2 glass rounded-xl p-5">
          <h3 className="font-heading font-semibold text-sm mb-4">Crowd Density — 24h</h3>
          <div className="h-48 flex items-end gap-1" role="img" aria-label="Bar chart showing crowd density levels over 24 hours.">
            {Array.from({ length: 48 }).map((_, i) => {
              const height = 15 + Math.sin(i * 0.3) * 30 + seededRandom(i) * 25 + (i > 20 && i < 35 ? 20 : 0);
              return (
                <div key={i} className="flex-1 group relative">
                  <div
                    className="rounded-t bg-gradient-to-t from-blue-500/70 to-purple-500/50 group-hover:from-blue-400 group-hover:to-purple-400 transition-all"
                    style={{ height: `${height}%` }}
                    aria-label={`Time slot ${i}: ${Math.round(height)}% density`}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-text-muted">
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span>
          </div>
        </motion.div>

        {/* Recent Alerts */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="glass rounded-xl p-5">
          <h3 className="font-heading font-semibold text-sm mb-4">Recent Alerts</h3>
          <div className="space-y-3" aria-live="polite">
            {liveAlerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  alert.level === 'critical' ? 'bg-red-400 animate-pulse' :
                  alert.level === 'warning' ? 'bg-amber-400' :
                  alert.level === 'success' || alert.level === 'resolved' ? 'bg-green-400' :
                  'bg-blue-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-text-primary leading-relaxed">{alert.message}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">{alert.agent} · {alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Agent Status */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="glass rounded-xl p-5">
        <h3 className="font-heading font-semibold text-sm mb-4">AI Agent Status</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent) => (
            <div key={agent.name} className="bg-white/[0.02] rounded-lg p-4 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-medium">{agent.name}</h4>
                <span className="flex items-center gap-1 text-[10px] text-green-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-text-muted mb-2">
                <span>Tasks: {agent.tasks}</span>
                <span>Load: {agent.load}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                  style={{ width: `${agent.load}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
