/**
 * A simple, sliding-window in-memory rate limiter.
 * Can be instantiated with a custom window duration and maximum allowed request count.
 * Intended to secure API route handlers.
 */
export class InMemoryRateLimiter {
  private cache = new Map<string, { timestamps: number[] }>();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number, maxRequests: number) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  /**
   * Verifies if a specific key (e.g. client IP or identifier) is within allowed limits.
   * Returns true if the request is permitted, false if the rate limit is exceeded.
   */
  check(key: string): boolean {
    const now = Date.now();
    const record = this.cache.get(key) || { timestamps: [] };

    // Filter out timestamps older than the threshold window
    const windowStart = now - this.windowMs;
    record.timestamps = record.timestamps.filter((t) => t > windowStart);

    if (record.timestamps.length >= this.maxRequests) {
      return false;
    }

    record.timestamps.push(now);
    this.cache.set(key, record);
    return true;
  }

  /**
   * Resets rate limits for a specific key (useful in test runs).
   */
  reset(key: string): void {
    this.cache.delete(key);
  }
}

// Instantiate default rate limiters:
// - Chat rate limiter: Max 10 messages per 1 minute per IP
export const chatRateLimiter = new InMemoryRateLimiter(60 * 1000, 10);

// - Prediction rate limiter: Max 5 requests per 30 seconds per IP
export const predictRateLimiter = new InMemoryRateLimiter(30 * 1000, 5);
