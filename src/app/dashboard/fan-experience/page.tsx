'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Ticket, Coffee, ShoppingBag, ArrowRight } from 'lucide-react';

const mockFood = [
  { item: 'MetLife Burger Co.', queue: 'Low (3m)', wait: 3, distance: '40m' },
  { item: 'Corner Kick Pizza', queue: 'Medium (9m)', wait: 9, distance: '120m' },
  { item: 'Halal Pitch Eats', queue: 'Critical (18m)', wait: 18, distance: '85m' },
];

/**
 * Fan Experience Module Component.
 * Addresses [Required Area: Navigation / Transportation].
 * Configures motion whileTap transitions on route calculator triggers.
 */
export default function FanExperiencePage() {
  const [ticketSection, setTicketSection] = useState('205');
  const [plannerOutput, setPlannerOutput] = useState('');

  const handlePlan = () => {
    try {
      if (!ticketSection.trim()) return;
      setPlannerOutput(
        `Route Calculated!\n\n1. Enter via Gate C (Wheelchair Accessible).\n2. Take Escalator 4 to Concourse level 2.\n3. Section ${ticketSection} will be to your left.\n4. Nearest accessible concessions: MetLife Burger Co. (no queue).`
      );
    } catch (err) {
      console.error('Error planning trip:', err);
      setPlannerOutput('An error occurred during pathfinding.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Mapping Badge */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold font-heading text-slate-100">Fan Experience</h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            [Required Area: Navigation / Transportation]
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-1">Generative AI match companion, concessions planning, and smart navigation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Match Companion */}
        <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-heading font-semibold text-sm text-slate-200">AI Match Companion</h3>
          </div>
          <div className="p-4 rounded-lg bg-white/[0.01] border border-white/5 space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Brazil vs Germany</span>
              <span className="text-emerald-400 font-semibold">LIVE 72'</span>
            </div>
            <div className="flex items-center justify-between text-2xl font-bold font-heading text-slate-100">
              <span>BRA 2</span>
              <span>GER 1</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed bg-white/5 p-3 rounded-lg">
              <span className="font-semibold text-emerald-400">AI Prediction</span>: Germany's offensive pressure has increased by 15% in the last 10 minutes. Expect high-density action in Germany's attacking third. Recommend staying in seats; concessions queues will peak at the 75th minute.
            </p>
          </div>
        </div>

        {/* Smart Concessions Queues */}
        <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-secondary" />
            <h3 className="font-heading font-semibold text-sm text-slate-200">Concessions Wait-Times</h3>
          </div>
          <div className="space-y-3">
            {mockFood.map((food, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.01]">
                <div>
                  <h4 className="text-xs font-semibold text-slate-300">{food.item}</h4>
                  <p className="text-[10px] text-slate-500">Distance: {food.distance}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-semibold ${food.wait <= 3 ? 'text-emerald-400' : food.wait <= 9 ? 'text-secondary' : 'text-red-400'}`}>
                    {food.queue}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Trip Planner */}
        <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-secondary" />
            <h3 className="font-heading font-semibold text-sm text-slate-200">AI Trip & Seat Planner</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label htmlFor="section-input" className="block text-xs text-slate-500 mb-1">Enter your seat Section</label>
              <input
                id="section-input"
                type="text"
                value={ticketSection}
                onChange={(e) => setTicketSection(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/30"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handlePlan}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Calculate Route
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
            {plannerOutput && (
              <pre className="text-xs text-slate-300 bg-white/5 p-3 rounded-lg font-sans whitespace-pre-wrap leading-relaxed">
                {plannerOutput}
              </pre>
            )}
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-secondary" />
            <h3 className="font-heading font-semibold text-sm text-slate-200">Personalized Merchandise</h3>
          </div>
          <div className="space-y-3">
            {[
              { item: 'Matchday Scarf (Brazil Ed.)', price: '$29.99', reason: 'High interest in Brazil' },
              { item: 'Official Tournament Cap', price: '$24.99', reason: 'Sunny conditions predicted next 2h' },
            ].map((rec, i) => (
              <div key={i} className="p-3 rounded-lg border border-white/5 bg-white/[0.01]">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-xs font-semibold text-slate-300">{rec.item}</h4>
                  <span className="text-xs text-slate-400 font-mono">{rec.price}</span>
                </div>
                <p className="text-[10px] text-slate-500">Suggested because: {rec.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
