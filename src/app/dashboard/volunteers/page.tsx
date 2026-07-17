'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { filterVolunteers, filterVolunteerTasks, MockVolunteer, MockVolunteerTask } from '@/lib/services/filters';
import { Users, CheckCircle, Clock, MapPin, Search, PlusCircle, Check, Send, AlertCircle } from 'lucide-react';

const initialVolunteers: MockVolunteer[] = [
  { name: 'Maria Garcia', role: 'Gate Guide', zone: 'Gate 7', status: 'active', tasks: 12, avatar: '👩‍🦰' },
  { name: 'David Kim', role: 'First Aid', zone: 'Medical Bay 2', status: 'active', tasks: 8, avatar: '👨‍⚕️' },
  { name: 'Aisha Mohammed', role: 'Translator', zone: 'Concourse A', status: 'active', tasks: 15, avatar: '👩‍💼' },
  { name: 'James Wilson', role: 'Accessibility', zone: 'Section 100', status: 'break', tasks: 6, avatar: '🧑‍🤝‍🧑' },
  { name: 'Yuki Tanaka', role: 'Info Desk', zone: 'Main Entrance', status: 'active', tasks: 20, avatar: '👩' },
  { name: 'Carlos Rivera', role: 'Parking', zone: 'Lot B', status: 'active', tasks: 9, avatar: '👨' },
];

const initialTasks: MockVolunteerTask[] = [
  { task: 'Escort wheelchair user to Section 205', priority: 'high', zone: 'Gate 3', eta: '5 min' },
  { task: 'Translate announcement to Arabic', priority: 'medium', zone: 'Concourse B', eta: '2 min' },
  { task: 'Restock water at Station 7', priority: 'low', zone: 'F&B Area', eta: '10 min' },
  { task: 'Guide lost family to Info Desk', priority: 'high', zone: 'Section 300', eta: '3 min' },
];

export default function VolunteerDashboard() {
  const [volunteers, setVolunteers] = useState<MockVolunteer[]>(initialVolunteers);
  const [pendingTasks, setPendingTasks] = useState<MockVolunteerTask[]>(initialTasks);
  const [volSearch, setVolSearch] = useState('');
  const [taskSearch, setTaskSearch] = useState('');
  const [volStatusFilter, setVolStatusFilter] = useState('all');
  const [taskPriorityFilter, setTaskPriorityFilter] = useState('all');
  
  // Selection states for dispatch
  const [selectedTaskIdx, setSelectedTaskIdx] = useState<number | null>(null);
  const [selectedVolunteerName, setSelectedVolunteerName] = useState<string>('');
  
  // Notifications
  const [notification, setNotification] = useState<string | null>(null);

  // Computed counts
  const totalCompleted = 4521;
  const activeVolCount = volunteers.filter(v => v.status === 'active').length + 18228; // scale with static

  const handleDispatch = () => {
    if (selectedTaskIdx === null || !selectedVolunteerName) return;

    const taskToDispatch = pendingTasks[selectedTaskIdx];
    
    // Update volunteer task count
    setVolunteers(prev =>
      prev.map(v => (v.name === selectedVolunteerName ? { ...v, tasks: v.tasks + 1 } : v))
    );

    // Remove task from pending
    setPendingTasks(prev => prev.filter((_, idx) => idx !== selectedTaskIdx));

    // Show visual confirmation notification
    setNotification(`Successfully dispatched "${taskToDispatch.task}" to ${selectedVolunteerName}!`);
    setTimeout(() => setNotification(null), 4000);

    // Reset selection
    setSelectedTaskIdx(null);
    setSelectedVolunteerName('');
  };

  const filteredVolunteersList = filterVolunteers(volunteers, volSearch, volStatusFilter);
  const filteredTasksList = filterVolunteerTasks(pendingTasks, taskSearch, taskPriorityFilter);

  return (
    <div className="space-y-6">
      {/* Notification banner */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/20 text-emerald-400 backdrop-blur-md flex items-center gap-2 text-xs font-semibold shadow-lg"
          >
            <Check className="w-4 h-4" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

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
          { label: 'Active Volunteers', value: activeVolCount.toLocaleString(), icon: Users, color: '#10B981' },
          { label: 'Tasks Completed', value: totalCompleted.toLocaleString(), icon: CheckCircle, color: '#10B981' },
          { label: 'Pending Tasks', value: pendingTasks.length.toString(), icon: Clock, color: '#F59E0B' },
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
        {/* Active Volunteers List */}
        <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="font-heading font-semibold text-sm text-slate-200">Active Volunteers</h3>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search staff..."
                  value={volSearch}
                  onChange={(e) => setVolSearch(e.target.value)}
                  className="pl-8 pr-3 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-200 placeholder-text-muted focus:outline-none focus:border-emerald-500/30 w-32"
                  aria-label="Search volunteers"
                />
              </div>
              <select
                value={volStatusFilter}
                onChange={(e) => setVolStatusFilter(e.target.value)}
                className="px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-text-secondary focus:outline-none cursor-pointer"
                aria-label="Filter volunteers by status"
              >
                <option value="all" className="bg-[#0B1D3A]">All Status</option>
                <option value="active" className="bg-[#0B1D3A]">Active</option>
                <option value="break" className="bg-[#0B1D3A]">On Break</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto max-h-[360px] pr-1">
            {filteredVolunteersList.length === 0 ? (
              <div className="text-center py-10 text-xs text-text-secondary">No volunteers match filter query.</div>
            ) : (
              filteredVolunteersList.map((vol) => (
                <div
                  key={vol.name}
                  onClick={() => selectedTaskIdx !== null && vol.status === 'active' && setSelectedVolunteerName(vol.name)}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    selectedVolunteerName === vol.name
                      ? 'border-emerald-500/40 bg-emerald-500/10'
                      : selectedTaskIdx !== null && vol.status === 'active'
                      ? 'border-emerald-500/20 hover:border-emerald-500/40 cursor-pointer bg-white/[0.02]'
                      : 'border-white/5 bg-white/[0.01]'
                  }`}
                >
                  <span className="text-xl" role="img" aria-label={vol.role}>{vol.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-slate-200">{vol.name}</p>
                    <p className="text-xs text-text-muted">{vol.role} · {vol.zone}</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      vol.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {vol.status}
                    </span>
                    <p className="text-[10px] text-text-muted">{vol.tasks} tasks</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pending Tasks Panel */}
        <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-xl p-5 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="font-heading font-semibold text-sm text-slate-200">Pending Tasks</h3>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={taskSearch}
                  onChange={(e) => setTaskSearch(e.target.value)}
                  className="pl-8 pr-3 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-200 placeholder-text-muted focus:outline-none focus:border-emerald-500/30 w-32"
                  aria-label="Search tasks"
                />
              </div>
              <select
                value={taskPriorityFilter}
                onChange={(e) => setTaskPriorityFilter(e.target.value)}
                className="px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-text-secondary focus:outline-none cursor-pointer"
                aria-label="Filter tasks by priority"
              >
                <option value="all" className="bg-[#0B1D3A]">All Priority</option>
                <option value="high" className="bg-[#0B1D3A]">High</option>
                <option value="medium" className="bg-[#0B1D3A]">Medium</option>
                <option value="low" className="bg-[#0B1D3A]">Low</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto max-h-[360px] pr-1">
            {filteredTasksList.length === 0 ? (
              <div className="text-center py-10 text-xs text-text-secondary">No pending tasks matching parameters.</div>
            ) : (
              filteredTasksList.map((task) => {
                const globalIdx = pendingTasks.findIndex(t => t.task === task.task);
                const isSelected = selectedTaskIdx === globalIdx;

                return (
                  <div
                    key={task.task}
                    onClick={() => {
                      setSelectedTaskIdx(isSelected ? null : globalIdx);
                      setSelectedVolunteerName('');
                    }}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500/50 bg-[#151e30]/80 shadow-[0_0_15px_rgba(16,185,129,0.08)]'
                        : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium text-slate-200 leading-snug">{task.task}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 font-bold uppercase ${
                        task.priority === 'high' ? 'bg-red-500/10 text-red-400' :
                        task.priority === 'medium' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {task.zone}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> ETA {task.eta}</span>
                      </div>
                      {isSelected && (
                        <span className="text-[10px] text-emerald-400 font-bold animate-pulse">Select Active Guide...</span>
                      )}
                    </div>

                    {/* Expand Dispatch Action Form inside task card */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 pt-3 border-t border-white/5 space-y-2.5"
                      >
                        <div>
                          <label className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">
                            Assign Target Volunteer:
                          </label>
                          {selectedVolunteerName ? (
                            <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex justify-between items-center font-medium">
                              <span>Selected: {selectedVolunteerName}</span>
                              <button
                                onClick={(e) => { e.stopPropagation(); setSelectedVolunteerName(''); }}
                                className="text-[10px] underline cursor-pointer hover:text-white"
                              >
                                Clear
                              </button>
                            </div>
                          ) : (
                            <div className="text-[11px] text-slate-400 italic flex items-center gap-1 py-1">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                              <span>Click an active staff member on the left panel to assign.</span>
                            </div>
                          )}
                        </div>

                        <button
                          disabled={!selectedVolunteerName}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDispatch();
                          }}
                          className="w-full py-1.5 rounded bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Confirm Dispatch Assignment
                        </button>
                      </motion.div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
