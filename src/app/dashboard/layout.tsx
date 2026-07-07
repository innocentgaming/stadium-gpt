'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X, Bell, Search, ChevronDown } from 'lucide-react';
import { dashboardNavItems } from '@/lib/constants';
import MockStateWrapper from '@/components/ui/MockStateWrapper';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar — Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-surface/50">
        {/* Logo */}
        <div className="p-5 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-sm">
              Stadium<span className="gradient-text">GPT</span>
            </span>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {dashboardNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  isActive
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : 'text-text-secondary hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-xs font-bold">
              SC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Sarah Chen</p>
              <p className="text-xs text-text-muted truncate">FIFA Operations</p>
            </div>
            <ChevronDown className="w-4 h-4 text-text-muted" />
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-surface border-r border-white/5 p-4">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-heading font-bold text-sm">StadiumGPT</span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="p-1 text-text-secondary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {dashboardNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                      isActive ? 'bg-blue-500/10 text-blue-400' : 'text-text-secondary hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 sm:px-6 bg-surface/30 backdrop-blur-lg sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1 text-text-secondary">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-9 pr-4 py-1.5 rounded-lg bg-white/5 border border-white/5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 text-xs text-green-400">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              All Systems Online
            </div>
            <button className="relative p-2 text-text-secondary hover:text-white transition-colors">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main id="main-content" className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <MockStateWrapper>
            {children}
          </MockStateWrapper>
        </main>
      </div>
    </div>
  );
}
