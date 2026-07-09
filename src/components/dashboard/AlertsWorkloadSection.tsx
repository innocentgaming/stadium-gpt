'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

interface AlertItem {
  message: string;
  level: string;
  time: string;
  agent: string;
}

interface AgentItem {
  name: string;
  status: string;
  tasks: number;
  load: number;
}

interface AlertsWorkloadSectionProps {
  liveAlerts: AlertItem[];
  agents: AgentItem[];
}

/**
 * Component combining recent alerts feeds and active AI Agent workloads in grid alignments.
 *
 * @param liveAlerts - Recent logged alerts
 * @param agents - AI Agents current load status
 */
export default function AlertsWorkloadSection({
  liveAlerts,
  agents,
}: AlertsWorkloadSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recent Alerts Feed */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="lg:col-span-1 border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5"
      >
        <h3 className="font-heading font-semibold text-sm mb-4 text-slate-200">Recent Alerts</h3>
        <div className="space-y-3" aria-live="polite">
          {liveAlerts.slice(0, 4).map((alert, i) => (
            <div key={i} className="flex items-start gap-3 border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
              <div
                className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  alert.level === 'critical' ? 'bg-red-500 animate-pulse' :
                  alert.level === 'warning' ? 'bg-amber-500' :
                  'bg-emerald-500'
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-300 leading-relaxed">{alert.message}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {alert.agent} · {alert.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI Agents Active Load Status */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="lg:col-span-2 border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5"
      >
        <h3 className="font-heading font-semibold text-sm mb-4 text-slate-200">AI Agent Workload</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {agents.map((agent) => (
            <div key={agent.name} className="bg-white/[0.01] rounded-lg p-4 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-slate-200">{agent.name}</h4>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Tasks: {agent.tasks}</span>
                <span>Load: {agent.load}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
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
