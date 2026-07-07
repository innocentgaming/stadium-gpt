# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-07

### Added
- **Core Platform**: StadiumGPT landing page containing 13 premium, high-impact sections.
- **Command Center Dashboard**: Real-time admin views featuring:
  - Dynamic IoT simulation showing active fans, latency metrics, and safety scores.
  - Live fluctuating agent workloads.
  - Crowd density bar chart.
  - Simulated active incident response table.
  - Interactive AI Chat Assistant with suggestion buttons, voice-input support, and sanitization.
  - Live Crowd Heatmaps, Emergency Dispatch logs, and Sustainability metrics.
- **WCAG 2.2 AA Compliance**: Screen-reader announcers, focus skip links, easy keyboard focus indicators, and semantic markup.
- **Hardened Security**: Custom strict Content Security Policy (CSP) headers inside Next.js config and XSS sanitization functions.
- **Automated Testing**: Jest test suite testing core utility functions (`sanitizeInput`, `clamp`, `formatCompactNumber`, `seededRandom`) and constants data validation.
- **Repository Setup**: LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY.md, issue and pull request templates, and GitHub Actions CI workflow.

### Fixed
- **React Hydration Mismatch**: Replaced random render metrics with a deterministic seeded random function.
- **ESLint Purity Errors**: Fixed ESLint errors concerning impure Math.random calls during render, replacing them with `seededRandom`.
- **Navbar Bug**: Added appropriate links to the "Try Live Demo" buttons in the navbar.
