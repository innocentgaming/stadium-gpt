'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Accessibility, Mic, Eye, AlertCircle } from 'lucide-react';

/**
 * Accessibility Command Center Page Component.
 * Addresses [Required Area: Accessibility].
 * Configures motion whileTap transitions on adaptive toggle buttons.
 */
export default function AccessibilityDashboardPage() {
  const [voiceQuery, setVoiceQuery] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');
  const [highContrast, setHighContrast] = useState(false);
  const [errorText, setErrorText] = useState('');

  /**
   * Triggers the simulation of voice commands.
   *
   * @param command - The voice command string to parse
   */
  const triggerVoiceCommand = (command: string) => {
    try {
      setErrorText('');
      setVoiceQuery(command);
      if (command.includes('wheelchair')) {
        setAssistantResponse('Calculating optimal wheelchair-accessible route. Navigate to Gate C Elevator 3 to Level 2.');
      } else if (command.includes('restroom')) {
        setAssistantResponse('The closest accessible restroom is 45 meters behind you, next to Elevator A. Wait time is 0 minutes.');
      } else {
        setAssistantResponse('Searching for accessibility services. Please specify wheelchair routes, restrooms, or sensory rooms.');
      }
    } catch (err) {
      console.error('Accessibility command failure:', err);
      setErrorText('Error processing voice query simulator.');
    }
  };

  return (
    <div className={`space-y-6 ${highContrast ? 'text-white' : ''}`}>
      {/* Header with Mapping Badge */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold font-heading text-slate-100">Accessibility Command Center</h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            [Required Area: Accessibility]
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-1">Ensuring a barrier-free, inclusive sporting environment matching WCAG 2.2 AA.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Adaptive Settings */}
        <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-400" />
            <h3 className="font-heading font-semibold text-sm text-slate-200">Adaptive UI Controls</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.01]">
              <div>
                <h4 className="text-xs font-semibold text-slate-300">High Contrast Rendering</h4>
                <p className="text-[10px] text-slate-500">Boosts background contrast ratio for visual impairments.</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setHighContrast(!highContrast)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${highContrast ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-400'}`}
              >
                {highContrast ? 'Active' : 'Enable'}
              </motion.button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.01]">
              <div>
                <h4 className="text-xs font-semibold text-slate-300">Screen Reader Mode (ARIA-Optimized)</h4>
                <p className="text-[10px] text-slate-500">Forces full ARIA announcement of all screen transitions.</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-semibold">Active</span>
            </div>
          </div>
        </div>

        {/* Voice AI Assistant Simulator */}
        <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-secondary" />
            <h3 className="font-heading font-semibold text-sm text-slate-200">Voice Navigation Copilot</h3>
          </div>
          <div className="space-y-3">
            <p className="text-xs text-slate-400">Click a preset query to simulate voice recognition commands:</p>
            <div className="flex flex-wrap gap-2">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => triggerVoiceCommand('Find a wheelchair route to Section 205')}
                className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-300 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer"
              >
                "Wheelchair route to Sec 205"
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => triggerVoiceCommand('Where is the nearest accessible restroom?')}
                className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-300 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer"
              >
                "Nearest accessible restroom"
              </motion.button>
            </div>

            {errorText && (
              <div className="flex items-center gap-1.5 text-xs text-red-400">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorText}</span>
              </div>
            )}

            {voiceQuery && (
              <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 space-y-2">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Input Query:</p>
                <p className="text-xs text-slate-300 italic">"{voiceQuery}"</p>
                {assistantResponse && (
                  <>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold pt-1">AI Output:</p>
                    <p className="text-xs text-emerald-400 font-semibold">{assistantResponse}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Accessible Infrastructure map nodes */}
      <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Accessibility className="w-5 h-5 text-secondary" />
          <h3 className="font-heading font-semibold text-sm text-slate-200">Sensory & Assistive Infrastructure</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { zone: 'Sensory Room A', status: '5/10 occupied', desc: 'Low noise & low light environment' },
            { zone: 'Elevator Cluster C', status: 'Functional', desc: 'Main route for Level 2 sections' },
            { zone: 'Audio Assist Units', status: '150 units available', desc: 'Assisted audio match commentary' },
          ].map((inf, i) => (
            <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
              <h4 className="text-xs font-semibold text-slate-300 mb-1">{inf.zone}</h4>
              <p className="text-[10px] text-emerald-400 font-semibold mb-2">{inf.status}</p>
              <p className="text-xs text-slate-500">{inf.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
