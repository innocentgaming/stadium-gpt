'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';
import { AlertTriangle, Database } from 'lucide-react';

interface MockStateWrapperProps {
  children: ReactNode;
  emptyTitle?: string;
  emptyMessage?: string;
  errorMessage?: string;
}

function StateLoader({ children, emptyTitle, emptyMessage, errorMessage }: MockStateWrapperProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const state = searchParams.get('state') || 'success';

  const resetState = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('state', 'success');
    router.push(`${pathname}?${params.toString()}`);
  };

  if (state === 'loading') {
    return (
      <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Loading dashboard telemetry...">
        <div className="h-8 bg-white/5 rounded-lg w-1/4 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="glass rounded-xl p-6 h-64 bg-white/[0.01]" />
            <div className="glass rounded-xl p-6 h-48 bg-white/[0.01]" />
          </div>
          <div className="glass rounded-xl p-6 h-[26rem] bg-white/[0.01]" />
        </div>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div
        role="alert"
        className="glass rounded-xl p-8 text-center max-w-md mx-auto my-12 border-red-500/20"
      >
        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-400" />
        </div>
        <h3 className="font-heading font-semibold text-lg mb-2">Telemetry Pipeline Error</h3>
        <p className="text-sm text-text-secondary mb-6">
          {errorMessage || 'Failed to sync with edge IoT gateway. Please check sensor status.'}
        </p>
        <button
          onClick={resetState}
          className="px-5 py-2.5 rounded-xl bg-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/30 transition-colors cursor-pointer focus:ring-2 focus:ring-blue-500/50"
        >
          Re-establish Sync
        </button>
      </div>
    );
  }

  if (state === 'empty') {
    return (
      <div className="glass rounded-xl p-12 text-center max-w-md mx-auto my-12 border-white/5">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
          <Database className="w-6 h-6 text-text-muted" />
        </div>
        <h3 className="font-heading font-semibold text-lg mb-2">
          {emptyTitle || 'No Records Found'}
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          {emptyMessage || 'No active telemetry data matches the selected filter parameters.'}
        </p>
        <button
          onClick={resetState}
          className="px-5 py-2.5 rounded-xl bg-white/5 text-text-primary text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

export default function MockStateWrapper(props: MockStateWrapperProps) {
  return (
    <Suspense fallback={
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-white/5 rounded-lg w-1/4 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="glass rounded-xl p-6 h-64 bg-white/[0.01]" />
          </div>
        </div>
      </div>
    }>
      <StateLoader {...props} />
    </Suspense>
  );
}
