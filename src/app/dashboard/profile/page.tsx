'use client';

import { Mail, MapPin, Shield, Calendar, Award, Clock } from 'lucide-react';

export default function ProfilePage() {
  const stats = [
    { label: 'Role', value: 'Admin', icon: Shield },
    { label: 'Joined', value: 'Jan 2026', icon: Calendar },
    { label: 'Sessions', value: '342', icon: Clock },
    { label: 'Actions', value: '12.4K', icon: Award },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold font-heading">Profile</h1>
        <p className="text-sm text-text-secondary mt-1">Your StadiumGPT account</p>
      </div>

      {/* Profile Card */}
      <div className="glass rounded-xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center text-2xl font-bold font-heading">
            SC
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold font-heading">Dr. Sarah Chen</h2>
            <p className="text-sm text-text-secondary mt-0.5">Head of Technology, FIFA Operations</p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="flex items-center gap-1.5 text-xs text-text-muted">
                <Mail className="w-3.5 h-3.5" /> sarah.chen@fifa.org
              </span>
              <span className="flex items-center gap-1.5 text-xs text-text-muted">
                <MapPin className="w-3.5 h-3.5" /> Zurich, Switzerland
              </span>
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm text-text-secondary hover:bg-white/10 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-4 text-center">
            <stat.icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
            <p className="text-lg font-bold font-heading">{stat.value}</p>
            <p className="text-xs text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Operations & AI Accreditation */}
      <div className="glass rounded-xl p-5">
        <h3 className="font-heading font-semibold text-sm mb-4">FIFA Accreditation & AI Clearance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
            <h4 className="text-xs font-semibold text-blue-400">Accredited Zones</h4>
            <div className="flex flex-wrap gap-1.5">
              {['Command Center', 'Safety Control', 'Medical Bay', 'F&B Areas', 'Media Center'].map((zone) => (
                <span key={zone} className="text-[10px] px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {zone}
                </span>
              ))}
            </div>
          </div>
          <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
            <h4 className="text-xs font-semibold text-purple-400">Language Proficiencies</h4>
            <div className="flex flex-wrap gap-1.5">
              {['English (Native)', 'German (C1)', 'Mandarin (Fluent)', 'Arabic (Basic)'].map((lang) => (
                <span key={lang} className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass rounded-xl p-5">
        <h3 className="font-heading font-semibold text-sm mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Resolved incident INC-2026-0147', time: '2 hours ago' },
            { action: 'Updated crowd density thresholds', time: '5 hours ago' },
            { action: 'Deployed new CV model (v3.2.1)', time: '1 day ago' },
            { action: 'Generated sustainability report', time: '2 days ago' },
            { action: 'Configured Translation Agent for Arabic', time: '3 days ago' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
              <span className="text-text-primary flex-1">{activity.action}</span>
              <span className="text-xs text-text-muted">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
