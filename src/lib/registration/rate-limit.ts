/**
 * Small in-memory sliding-window limiter. It is per server instance, so on a
 * multi-instance/serverless deployment it is a courtesy brake, not a hard
 * guarantee — put an edge/WAF rate limit in front before go-live.
 */
export interface RateLimiter {
  check(key: string): { allowed: boolean; retryAfterSeconds: number };
}

interface Options {
  limit: number;
  windowMs: number;
  now?: () => number;
  maxKeys?: number;
}

export function createRateLimiter({ limit, windowMs, now = Date.now, maxKeys = 5_000 }: Options): RateLimiter {
  const hits = new Map<string, number[]>();

  return {
    check(key) {
      const t = now();
      const recent = (hits.get(key) ?? []).filter((at) => t - at < windowMs);

      if (recent.length >= limit) {
        hits.set(key, recent);
        return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((recent[0] + windowMs - t) / 1000)) };
      }

      recent.push(t);
      hits.delete(key);
      hits.set(key, recent);

      if (hits.size > maxKeys) {
        const oldest = hits.keys().next().value;
        if (oldest !== undefined) hits.delete(oldest);
      }
      return { allowed: true, retryAfterSeconds: 0 };
    },
  };
}
