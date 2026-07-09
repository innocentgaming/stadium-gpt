'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { dashboardNavItems } from '@/lib/constants';
import MockStateWrapper from '@/components/ui/MockStateWrapper';
import SidebarDesktop from '@/components/layout/SidebarDesktop';
import SidebarMobileOverlay from '@/components/layout/SidebarMobileOverlay';
import HeaderTopBar from '@/components/layout/HeaderTopBar';

/**
 * Dashboard Shell Layout.
 * Integrates desktop, mobile overlay sidebars and top navigation bar.
 * Injects route-based fade-in page transitions.
 *
 * @param children - Active dashboard page contents
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background flex text-text-primary">
      {/* Desktop Sidebar */}
      <SidebarDesktop pathname={pathname} navItems={dashboardNavItems} />

      {/* Mobile Drawer Sidebar */}
      {sidebarOpen && (
        <SidebarMobileOverlay
          pathname={pathname}
          navItems={dashboardNavItems}
          setSidebarOpen={setSidebarOpen}
        />
      )}

      {/* Main Panel Ingress */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0B1D3A]">
        {/* Header toolbar */}
        <HeaderTopBar setSidebarOpen={setSidebarOpen} />

        {/* Viewport content */}
        <main id="main-content" className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <MockStateWrapper>{children}</MockStateWrapper>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
