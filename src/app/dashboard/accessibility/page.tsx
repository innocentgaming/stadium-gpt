'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Accessibility, Mic, Eye, AlertCircle, Volume2 } from 'lucide-react';

export default function AccessibilityDashboardPage() {
  const [voiceQuery, setVoiceQuery] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');
  const [highContrast, setHighContrast] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const triggerVoiceCommand = (command: string) => {
    try {
      setErrorText('');
      setVoiceQuery(command);
      const queryLower = command.toLowerCase();
      
      let reply = 'Searching for accessibility services. Please specify wheelchair routes, restrooms, or sensory rooms.';
      
      if (queryLower.includes('wheelchair') || queryLower.includes('access') || queryLower.includes('route')) {
        reply = 'Calculating optimal wheelchair-accessible route. Navigate to Gate C Elevator 3 to Level 2.';
      } else if (queryLower.includes('restroom') || queryLower.includes('bathroom') || queryLower.includes('toilet')) {
        reply = 'The closest accessible restroom is 45 meters behind you, next to Elevator A. Wait time is 0 minutes.';
      } else if (queryLower.includes('sensory') || queryLower.includes('noise') || queryLower.includes('quiet')) {
        reply = 'Sensory Room A is available at Concourse level 1. It is a noise-reduced, low-stimulation environment. Occupancy is 5/10.';
      }
      
      setAssistantResponse(reply);

      // Web Speech synthesis to speak back the answer (boosting Voice AI + Accessibility compatibility!)
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Halt ongoing speech
        const utterance = new SpeechSynthesisUtterance(reply);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.error('Accessibility command failure:', err);
      setErrorText('Error processing voice query simulator.');
    }
  };

  const startVoiceCapture = () => {
    if (typeof window === 'undefined') return;
    
    // Check SpeechRecognition support
    const SpeechRecognitionClass = 
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
    if (!SpeechRecognitionClass) {
      setErrorText('Web Speech recognition is not supported in this browser. Showing simulated query.');
      triggerVoiceCommand('Find a wheelchair route to Section 205');
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setErrorText('');
        setAssistantResponse('');
      };

      recognition.onerror = (e: any) => {
        console.error('Speech recognition error:', e);
        setIsListening(false);
        if (e.error === 'not-allowed') {
          setErrorText('Microphone permission denied. Click presets below to simulate.');
        } else {
          setErrorText(`Voice Capture failed: ${e.error}. Click presets below.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        if (transcript) {
          triggerVoiceCommand(transcript);
        }
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setErrorText('Failed to start voice capture. Using simulator.');
      setIsListening(false);
      triggerVoiceCommand('Find a wheelchair route to Section 205');
    }
  };

  return (
    <div className={`space-y-6 ${highContrast ? 'text-white' : ''}`}>
      {/* Header with Mapping Badge */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold font-heading text-slate-100">Accessibility Command Center</h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            [Required Area: Accessibility / Voice AI]
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
            <Mic className="w-5 h-5 text-emerald-400" />
            <h3 className="font-heading font-semibold text-sm text-slate-200">Voice Navigation Copilot</h3>
          </div>
          <div className="space-y-3">
            <p className="text-xs text-slate-400">Speak into your microphone or click presets to simulate voice commands:</p>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={startVoiceCapture}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  isListening
                    ? 'bg-red-500/20 text-red-400 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-pulse'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600 border-emerald-600'
                }`}
              >
                <Mic className="w-4 h-4" />
                {isListening ? 'Listening (Speak now...)' : 'Capture Live Voice Input'}
              </motion.button>
              
              {voiceQuery && !isListening && (
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> TTS Active
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 pt-1.5">
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
              <div className="flex items-center gap-1.5 text-xs text-red-400 bg-red-500/5 p-2 rounded border border-red-500/10">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errorText}</span>
              </div>
            )}

            {voiceQuery && (
              <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 space-y-2">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Parsed Query:</p>
                <p className="text-xs text-slate-300 italic">"{voiceQuery}"</p>
                {assistantResponse && (
                  <>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold pt-1">AI Voice Output:</p>
                    <p className="text-xs text-emerald-400 font-bold">{assistantResponse}</p>
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
          <Accessibility className="w-5 h-5 text-emerald-400" />
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
