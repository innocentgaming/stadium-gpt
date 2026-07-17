'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, X, LucideIcon } from 'lucide-react';

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface SidebarMobileOverlayProps {
  pathname: string;
  navItems: NavItem[];
  setSidebarOpen: (open: boolean) => void;
}

/**
 * Mobile navigation overlay drawer.
 * Renders the sliding drawer for small screen widths.
 * Uses layoutId to slide active background indicator between items.
 *
 * @param pathname - Current route path
 * @param navItems - Navigation links array
 * @param setSidebarOpen - Callback to close/open the sidebar
 */
export default function SidebarMobileOverlay({
  pathname,
  navItems,
  setSidebarOpen,
}: SidebarMobileOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const focusableSelectors = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]';
    const focusableElements = Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
    if (focusableElements.length === 0) return;

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Focus the first element on mount
    firstFocusable.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
        return;
      }

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setSidebarOpen]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 lg:hidden">
      {/* Dimmed backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setSidebarOpen(false)}
      />
      
      {/* Sliding Panel */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation drawer"
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute left-0 top-0 bottom-0 w-64 bg-[#0B1D3A] border-r border-white/5 p-4 flex flex-col z-10"
      >
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-sm text-slate-100">StadiumGPT</span>
          </Link>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(false)}
            className="p-1 text-text-secondary cursor-pointer focus:ring-2 focus:ring-emerald-500/50 rounded"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Links list */}
        <nav className="space-y-1 overflow-y-auto flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors duration-200 z-10 ${
                  isActive
                    ? 'text-emerald-400 font-semibold'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarIndicatorMobile"
                    className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <div className="absolute inset-0 bg-white/0 rounded-xl hover:bg-white/5 transition-colors duration-200 -z-10" />
                )}
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </motion.aside>
    </div>
  );
}
