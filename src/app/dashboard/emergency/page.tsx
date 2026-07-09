'use client';

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { AlertTriangle, Phone, MapPin, Clock, Shield } from 'lucide-react';

const incidents = [
  { id: 'INC-001', type: 'Medical', severity: 'critical', location: 'Section 205', status: 'Active', time: '5 min ago', responder: 'Unit M-7' },
  { id: 'INC-002', type: 'Crowd Surge', severity: 'warning', location: 'Gate 7 North', status: 'Monitoring', time: '12 min ago', responder: 'Unit S-3' },
  { id: 'INC-003', type: 'Suspicious Pkg', severity: 'warning', location: 'Parking Lot 3', status: 'Investigating', time: '18 min ago', responder: 'Unit S-1' },
  { id: 'INC-004', type: 'Fall Detected', severity: 'info', location: 'Concourse B', status: 'Resolved', time: '25 min ago', responder: 'Unit M-2' },
  { id: 'INC-005', type: 'Fire Alarm', severity: 'resolved', location: 'F&B Station 5', status: 'False Alarm', time: '32 min ago', responder: 'Unit F-1' },
];

/**
 * Emergency Dashboard Page Component.
 * Addresses [Required Area: Real-Time Decision Support].
 */
export default function EmergencyDashboard() {
  return (
    <div className="space-y-6">
      {/* Header with Mapping Badge */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-heading text-slate-100">Emergency Dashboard</h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
              [Required Area: Real-Time Decision Support]
            </span>
          </div>
          <p className="text-sm text-text-secondary mt-1">Real-time incident management and response</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 text-sm font-medium hover:bg-red-500/30 transition-colors cursor-pointer">
          <Phone className="w-4 h-4" />
          Emergency Call
        </button>
      </div>

      {/* Status Overview */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {[
          { label: 'Active Incidents', value: '3', color: '#F59E0B', icon: AlertTriangle },
          { label: 'Response Units', value: '24/30', color: '#10B981', icon: Shield },
          { label: 'Avg Response Time', value: '2.1m', color: '#10B981', icon: Clock },
          { label: 'Evacuation Ready', value: '98%', color: '#10B981', icon: MapPin },
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

      {/* Incident Table */}
      <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <h3 className="font-heading font-semibold text-sm text-slate-200">Active Incidents</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-slate-500">
                <th className="text-left py-3 px-4 text-xs font-medium">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium">Type</th>
                <th className="text-left py-3 px-4 text-xs font-medium">Severity</th>
                <th className="text-left py-3 px-4 text-xs font-medium">Location</th>
                <th className="text-left py-3 px-4 text-xs font-medium">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium">Responder</th>
                <th className="text-left py-3 px-4 text-xs font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((inc) => (
                <tr key={inc.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors text-slate-300">
                  <td className="py-3 px-4 font-mono text-xs text-emerald-400">{inc.id}</td>
                  <td className="py-3 px-4">{inc.type}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                      inc.severity === 'critical' ? 'bg-red-500/10 text-red-400' :
                      inc.severity === 'warning' ? 'bg-secondary/10 text-secondary' :
                      inc.severity === 'resolved' ? 'bg-emerald-500/10 text-emerald-400' :
                      'bg-white/5 text-slate-400'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        inc.severity === 'critical' ? 'bg-red-400 animate-pulse' :
                        inc.severity === 'warning' ? 'bg-secondary' :
                        inc.severity === 'resolved' ? 'bg-emerald-400' :
                        'bg-slate-400'
                      }`} />
                      {inc.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">{inc.location}</td>
                  <td className="py-3 px-4 text-text-secondary">{inc.status}</td>
                  <td className="py-3 px-4 text-text-secondary">{inc.responder}</td>
                  <td className="py-3 px-4 text-text-muted">{inc.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
