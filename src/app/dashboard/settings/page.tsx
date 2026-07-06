'use client';

import { useState } from 'react';
import { Bell, Globe, Shield, Monitor } from 'lucide-react';

const settingGroups = [
  {
    title: 'General',
    icon: Monitor,
    settings: [
      { label: 'Stadium Name', type: 'text', defaultValue: 'MetLife Stadium' },
      { label: 'Time Zone', type: 'select', defaultValue: 'EST (UTC-5)' },
      { label: 'Language', type: 'select', defaultValue: 'English' },
      { label: 'Dark Mode', type: 'toggle', defaultValue: true },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    settings: [
      { label: 'Critical Alerts', type: 'toggle', defaultValue: true },
      { label: 'Warning Alerts', type: 'toggle', defaultValue: true },
      { label: 'Info Notifications', type: 'toggle', defaultValue: false },
      { label: 'Email Reports', type: 'toggle', defaultValue: true },
    ],
  },
  {
    title: 'AI Configuration',
    icon: Shield,
    settings: [
      { label: 'AI Response Latency Target', type: 'select', defaultValue: '< 100ms' },
      { label: 'Auto-dispatch Medical', type: 'toggle', defaultValue: true },
      { label: 'Auto-escalate Critical', type: 'toggle', defaultValue: true },
      { label: 'CV Confidence Threshold', type: 'select', defaultValue: '85%' },
    ],
  },
  {
    title: 'Accessibility',
    icon: Globe,
    settings: [
      { label: 'Screen Reader Support', type: 'toggle', defaultValue: true },
      { label: 'High Contrast Mode', type: 'toggle', defaultValue: false },
      { label: 'Font Size', type: 'select', defaultValue: 'Medium' },
      { label: 'Reduce Animations', type: 'toggle', defaultValue: false },
    ],
  },
];

export default function SettingsPage() {
  // Initialize state dynamically for all toggle settings
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'Dark Mode': true,
    'Critical Alerts': true,
    'Warning Alerts': true,
    'Info Notifications': false,
    'Email Reports': true,
    'Auto-dispatch Medical': true,
    'Auto-escalate Critical': true,
    'Screen Reader Support': true,
    'High Contrast Mode': false,
    'Reduce Animations': false,
  });

  const handleToggle = (label: string) => {
    setToggles((prev) => {
      const newValue = !prev[label];
      
      // If toggling Dark Mode, apply the CSS class to the HTML tag
      if (label === 'Dark Mode') {
        if (newValue) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }

      return {
        ...prev,
        [label]: newValue,
      };
    });
  };

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
            {group.settings.map((setting) => {
              const isToggle = setting.type === 'toggle';
              const currentValue = isToggle ? toggles[setting.label] : setting.defaultValue;

              return (
                <div key={setting.label} className="px-5 py-4 flex items-center justify-between">
                  <span className="text-sm text-text-primary">{setting.label}</span>
                  {isToggle ? (
                    <button
                      onClick={() => handleToggle(setting.label)}
                      className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-300 ${currentValue ? 'bg-blue-500' : 'bg-white/10'}`}
                      aria-label={`Toggle ${setting.label}`}
                    >
                      <div
                        className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300"
                        style={{ transform: currentValue ? 'translateX(20px)' : 'translateX(2px)' }}
                      />
                    </button>
                  ) : setting.type === 'select' ? (
                    <span className="text-sm text-text-secondary bg-white/5 px-3 py-1 rounded-lg border border-white/5">{currentValue}</span>
                  ) : (
                    <span className="text-sm text-text-secondary">{currentValue}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
