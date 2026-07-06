'use client';

import { Bell, Globe, Shield, Monitor, Volume2, Palette } from 'lucide-react';

const settingGroups = [
  {
    title: 'General',
    icon: Monitor,
    settings: [
      { label: 'Stadium Name', type: 'text', value: 'MetLife Stadium' },
      { label: 'Time Zone', type: 'select', value: 'EST (UTC-5)' },
      { label: 'Language', type: 'select', value: 'English' },
      { label: 'Dark Mode', type: 'toggle', value: true },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    settings: [
      { label: 'Critical Alerts', type: 'toggle', value: true },
      { label: 'Warning Alerts', type: 'toggle', value: true },
      { label: 'Info Notifications', type: 'toggle', value: false },
      { label: 'Email Reports', type: 'toggle', value: true },
    ],
  },
  {
    title: 'AI Configuration',
    icon: Shield,
    settings: [
      { label: 'AI Response Latency Target', type: 'select', value: '< 100ms' },
      { label: 'Auto-dispatch Medical', type: 'toggle', value: true },
      { label: 'Auto-escalate Critical', type: 'toggle', value: true },
      { label: 'CV Confidence Threshold', type: 'select', value: '85%' },
    ],
  },
  {
    title: 'Accessibility',
    icon: Globe,
    settings: [
      { label: 'Screen Reader Support', type: 'toggle', value: true },
      { label: 'High Contrast Mode', type: 'toggle', value: false },
      { label: 'Font Size', type: 'select', value: 'Medium' },
      { label: 'Reduce Animations', type: 'toggle', value: false },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold font-heading">Settings</h1>
        <p className="text-sm text-text-secondary mt-1">Configure your StadiumGPT dashboard</p>
      </div>

      {settingGroups.map((group) => (
        <div key={group.title} className="glass rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
            <group.icon className="w-4 h-4 text-blue-400" />
            <h3 className="font-heading font-semibold text-sm">{group.title}</h3>
          </div>
          <div className="divide-y divide-white/5">
            {group.settings.map((setting) => (
              <div key={setting.label} className="px-5 py-4 flex items-center justify-between">
                <span className="text-sm text-text-primary">{setting.label}</span>
                {setting.type === 'toggle' ? (
                  <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${setting.value ? 'bg-blue-500' : 'bg-white/10'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${setting.value ? 'left-5.5 translate-x-0' : 'left-0.5'}`}
                      style={{ left: setting.value ? '22px' : '2px' }}
                    />
                  </div>
                ) : setting.type === 'select' ? (
                  <span className="text-sm text-text-secondary bg-white/5 px-3 py-1 rounded-lg border border-white/5">{setting.value}</span>
                ) : (
                  <span className="text-sm text-text-secondary">{setting.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
