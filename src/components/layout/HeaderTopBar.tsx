'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Search, Bell } from 'lucide-react';

interface HeaderTopBarProps {
  setSidebarOpen: (open: boolean) => void;
}

/**
 * Top Header component of the dashboard control center.
 * Renders system status, global search ingress, and mobile menu toggles.
 * Features shaking notification bell alert simulator and tap scale-down button interactions.
 *
 * @param setSidebarOpen - Callback triggers the mobile sidebar slide
 */
export default function HeaderTopBar({ setSidebarOpen }: HeaderTopBarProps) {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    // Simulate periodic alerts shaking the bell every 14 seconds
    const interval = setInterval(() => {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 500);
      return () => clearTimeout(timer);
    }, 14000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 sm:px-6 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger with tap scale */}
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-1 text-text-secondary hover:text-white transition-colors"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </motion.button>

        {/* Global Search Input */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search operational console..."
            className="w-64 pl-9 pr-4 py-1.5 rounded-lg bg-white/5 border border-white/5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-emerald-500/30 focus:ring-1 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Status Indicator with continuous subtle pulse */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-xs text-emerald-400 font-semibold select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          All Systems Online
        </div>

        {/* Notifications Icon with tap scale and shake alert animation */}
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsShaking(true)}
          onAnimationComplete={() => setIsShaking(false)}
          className="relative p-2 text-text-secondary hover:text-white transition-colors cursor-pointer"
          aria-label="View system notifications"
        >
          <motion.div
            animate={isShaking ? { rotate: [0, -14, 12, -10, 8, -4, 0] } : {}}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Bell className="w-4.5 h-4.5" />
          </motion.div>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        </motion.button>
      </div>
    </header>
  );
}
