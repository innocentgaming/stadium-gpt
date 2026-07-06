'use client';

/**
 * Skip-to-content link — appears on keyboard focus (Tab), allowing
 * screen reader and keyboard users to bypass the navigation and jump
 * straight to the main content. Required for WCAG 2.2 AA compliance.
 */
export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:gradient-bg focus:text-white focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none"
    >
      Skip to main content
    </a>
  );
}
