'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown, LucideIcon } from 'lucide-react';

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface SidebarDesktopProps {
  pathname: string;
  navItems: NavItem[];
}

/**
 * Desktop sidebar component.
 * Renders the primary navigation options on wide viewports.
 * Uses layoutId to slide active background indicator between items.
 *
 * @param pathname - Current active route path
 * @param navItems - List of navigation configs
 */
export default function SidebarDesktop({ pathname, navItems }: SidebarDesktopProps) {
  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-slate-950/80">
      {/* Brand Logo */}
      <div className="p-5 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-heading font-bold text-sm text-slate-100">
            Stadium<span className="text-secondary">GPT</span>
          </span>
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors duration-200 z-10 ${
                isActive
                  ? 'text-emerald-400 font-semibold'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSidebarIndicator"
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

      {/* User Info Bar */}
      <div className="p-4 border-t border-white/5 bg-slate-900/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold font-heading">
            SC
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">Sarah Chen</p>
            <p className="text-xs text-text-muted truncate">FIFA Operations</p>
          </div>
          <ChevronDown className="w-4 h-4 text-text-muted animate-pulse" />
        </div>
      </div>
    </aside>
  );
}
