/**
 * Sanitizes user-provided text input by stripping HTML tags
 * and trimming whitespace. Used wherever untrusted text enters
 * the application (e.g. chat input, search fields).
 *
 * @param input - Raw string from user input
 * @returns Sanitized, trimmed string safe for rendering
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')   // strip HTML tags
    .replace(/[<>]/g, '')       // remove stray angle brackets
    .trim();
}

/**
 * Clamps a numeric value between min and max boundaries.
 * Prevents out-of-range values from corrupting UI state.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Formats large numbers into human-readable compact form.
 * e.g. 1200 → "1.2K", 3400000 → "3.4M"
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(num >= 10_000 ? 0 : 1) + 'K';
  return num.toLocaleString();
}

/**
 * Generates a deterministic pseudo-random number from a seed.
 * Used for "random-looking" but stable chart data that doesn't
 * cause hydration mismatches between server and client.
 */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}
