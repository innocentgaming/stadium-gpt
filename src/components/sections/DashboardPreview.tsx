'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { fadeInUp } from '@/lib/animations';
import { AlertTriangle, Users, Car, Leaf, Activity, Bus, UtensilsCrossed } from 'lucide-react';

const widgets = [
  {
    title: 'Crowd Heatmap',
    icon: Users,
    color: '#10B981',
    content: (
      <div className="grid grid-cols-8 gap-1 mt-3">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-sm"
            style={{
              background: `rgba(16, 185, 129, ${0.1 + Math.random() * 0.8})`,
            }}
          />
        ))}
      </div>
    ),
  },
  {
    title: 'Parking Occupancy',
    icon: Car,
    color: '#10B981',
    content: (
      <div className="mt-3">
        {['Zone A', 'Zone B', 'Zone C', 'Zone D'].map((zone, i) => (
          <div key={zone} className="mb-2">
            <div className="flex justify-between text-xs text-text-secondary mb-1">
              <span>{zone}</span>
              <span>{[87, 62, 94, 45][i]}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-emerald-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${[87, 62, 94, 45][i]}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Queue Prediction',
    icon: UtensilsCrossed,
    color: '#10B981',
    content: (
      <div className="flex items-end gap-1 mt-3 h-20">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-emerald-500/40"
            style={{ height: `${20 + Math.sin(i * 0.8) * 40 + Math.random() * 30}%` }}
          />
        ))}
      </div>
    ),
  },
  {
    title: 'Live Alerts',
    icon: AlertTriangle,
    color: '#F59E0B',
    content: (
      <div className="mt-3 space-y-2">
        {[
          { text: 'High density Gate 7', level: 'warning', time: '2m ago' },
          { text: 'Medical req Sec 205', level: 'critical', time: '5m ago' },
          { text: 'Queue > 15min F&B 3', level: 'info', time: '8m ago' },
        ].map((alert, i) => (
          <div key={i} className="flex items-start gap-2 text-xs">
            <div className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${alert.level === 'critical' ? 'bg-red-500 animate-pulse' : alert.level === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
            <span className="text-text-secondary flex-1">{alert.text}</span>
            <span className="text-text-muted">{alert.time}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Medical Incidents',
    icon: Activity,
    color: '#F59E0B',
    content: (
      <div className="mt-3 text-center">
        <p className="text-3xl font-bold font-heading text-emerald-400">3</p>
        <p className="text-xs text-text-secondary mt-1">Active incidents</p>
        <div className="flex justify-center gap-3 mt-3">
          <div className="text-center">
            <p className="text-sm font-semibold text-text-primary">12</p>
            <p className="text-xs text-text-muted">Resolved</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-text-primary">2.1m</p>
            <p className="text-xs text-text-muted">Avg Response</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Transport Status',
    icon: Bus,
    color: '#10B981',
    content: (
      <div className="mt-3 space-y-2">
        {[
          { route: 'Metro Line A', status: 'On Time', ok: true },
          { route: 'Shuttle Bus 7', status: 'Delayed 5m', ok: false },
          { route: 'Metro Line B', status: 'On Time', ok: true },
        ].map((t, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">{t.route}</span>
            <span className={t.ok ? 'text-emerald-400' : 'text-secondary'}>{t.status}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Sustainability',
    icon: Leaf,
    color: '#10B981',
    content: (
      <div className="mt-3 grid grid-cols-2 gap-3">
        {[
          { label: 'Carbon', value: '-23%' },
          { label: 'Energy', value: '-18%' },
          { label: 'Water', value: '-31%' },
          { label: 'Waste', value: '-42%' },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-sm font-semibold text-emerald-400">{s.value}</p>
            <p className="text-xs text-text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    ),
  },
];

/**
 * Dashboard Preview component on the home page.
 * Uses strictly consolidated colors: Charcoal background, Emerald Green active markers, and Gold alerts.
 */
export default function DashboardPreview() {
  return (
    <section id="dashboard" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Live Command Center"
          title="AI Dashboard Preview"
          subtitle="Real-time monitoring and control of all stadium operations from a single intelligent command center."
        />

        <motion.div
          className="glass-strong rounded-2xl p-1.5 shadow-2xl shadow-black/30 bg-[#151e30]/40"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Window Chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-800" />
              <div className="w-3 h-3 rounded-full bg-slate-800" />
              <div className="w-3 h-3 rounded-full bg-slate-800" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-md bg-white/5 text-xs text-text-muted">
                StadiumGPT Command Center — MetLife Stadium
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400">Live</span>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {widgets.map((widget) => (
              <div key={widget.title} className="glass rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <widget.icon className="w-4 h-4" style={{ color: widget.color }} />
                  <span className="text-xs font-medium text-text-primary">{widget.title}</span>
                </div>
                {widget.content}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
