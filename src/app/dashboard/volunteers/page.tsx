'use client';

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { Users, CheckCircle, Clock, MapPin } from 'lucide-react';

const volunteers = [
  { name: 'Maria Garcia', role: 'Gate Guide', zone: 'Gate 7', status: 'active', tasks: 12, avatar: '👩‍🦰' },
  { name: 'David Kim', role: 'First Aid', zone: 'Medical Bay 2', status: 'active', tasks: 8, avatar: '👨‍⚕️' },
  { name: 'Aisha Mohammed', role: 'Translator', zone: 'Concourse A', status: 'active', tasks: 15, avatar: '👩‍💼' },
  { name: 'James Wilson', role: 'Accessibility', zone: 'Section 100', status: 'break', tasks: 6, avatar: '🧑‍🤝‍🧑' },
  { name: 'Yuki Tanaka', role: 'Info Desk', zone: 'Main Entrance', status: 'active', tasks: 20, avatar: '👩' },
  { name: 'Carlos Rivera', role: 'Parking', zone: 'Lot B', status: 'active', tasks: 9, avatar: '👨' },
];

const pendingTasks = [
  { task: 'Escort wheelchair user to Section 205', priority: 'high', zone: 'Gate 3', eta: '5 min' },
  { task: 'Translate announcement to Arabic', priority: 'medium', zone: 'Concourse B', eta: '2 min' },
  { task: 'Restock water at Station 7', priority: 'low', zone: 'F&B Area', eta: '10 min' },
  { task: 'Guide lost family to Info Desk', priority: 'high', zone: 'Section 300', eta: '3 min' },
];

/**
 * Volunteer Dashboard Page Component.
 * Addresses [Required Area: Multilingual Assistance / Operational Intelligence].
 */
export default function VolunteerDashboard() {
  return (
    <div className="space-y-6">
      {/* Header with Mapping Badge */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold font-heading text-slate-100">Volunteer Dashboard</h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            [Required Area: Multilingual Assistance / Operational Intelligence]
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-1">AI-powered volunteer coordination and task management</p>
      </div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {[
          { label: 'Active Volunteers', value: '18,234', icon: Users, color: '#10B981' },
          { label: 'Tasks Completed', value: '4,521', icon: CheckCircle, color: '#10B981' },
          { label: 'Pending Tasks', value: '127', icon: Clock, color: '#F59E0B' },
          { label: 'Zones Covered', value: '48/48', icon: MapPin, color: '#10B981' },
        ].map((stat) => (
          <motion.div key={stat.label} variants={staggerItem} className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 bg-white/5">
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
            </div>
            <p className="text-2xl font-bold font-heading text-slate-100">{stat.value}</p>
            <p className="text-xs text-text-muted mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Volunteers */}
        <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5">
          <h3 className="font-heading font-semibold text-sm mb-4 text-slate-200">Active Volunteers</h3>
          <div className="space-y-3">
            {volunteers.map((vol) => (
              <div key={vol.name} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.01] border border-white/5">
                <span className="text-xl">{vol.avatar}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-slate-200">{vol.name}</p>
                  <p className="text-xs text-text-muted">{vol.role} · {vol.zone}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    vol.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-secondary/10 text-secondary'
                  }`}>
                    {vol.status}
                  </span>
                  <p className="text-xs text-text-muted mt-1">{vol.tasks} tasks</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5">
          <h3 className="font-heading font-semibold text-sm mb-4 text-slate-200">Pending Tasks</h3>
          <div className="space-y-3">
            {pendingTasks.map((task, i) => (
              <div key={i} className="p-3 rounded-lg bg-white/[0.01] border border-white/5">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm text-slate-200">{task.task}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${
                    task.priority === 'high' ? 'bg-red-500/10 text-red-400' :
                    task.priority === 'medium' ? 'bg-secondary/10 text-secondary' :
                    'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {task.zone}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> ETA {task.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
