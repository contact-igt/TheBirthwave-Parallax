import { clientKey, fail, isJson, readBounded, respond, sameOrigin } from "./http.ts";
import { createRateLimiter, type RateLimiter } from "./rate-limit.ts";
import { isValidToken, parseStatusResponse } from "./receipt.ts";
import type { StatusClient } from "./store.ts";

interface Deps {
  /** `null` until a status endpoint is approved: the waiting page then shows its fallback. */
  client: StatusClient | null;
  clinicId?: string;
  limiter?: RateLimiter;
  now?: () => Date;
}

const MAX_BODY = 1_024;

/**
 * POST /api/queue/status — a patient looks up their own waiting status with
 * the opaque receipt token (in the body, so it never appears in a URL or log).
 * Responses carry only whitelisted, validated fields: no name, phone, concern
 * or any other patient's data.
 */
export function createStatusHandler({ client, clinicId = "main", limiter, now = () => new Date() }: Deps) {
  // Tight limit: this endpoint is the only thing a token-guesser could hammer.
  const rateLimiter = limiter ?? createRateLimiter({ limit: 40, windowMs: 60_000 });

  return async function handle(request: Request): Promise<Response> {
    if (!sameOrigin(request)) return fail(403, "forbidden_origin", "This request was not accepted.");
    if (!isJson(request)) return fail(415, "unsupported_media_type", "This request was not accepted.");

    const limit = rateLimiter.check(clientKey(request));
    if (!limit.allowed) {
      return fail(429, "rate_limited", "Please wait a moment and try again.", {}, {
        "Retry-After": String(limit.retryAfterSeconds),
      });
    }

    if (!client) return fail(503, "status_unavailable", "Live status isn’t available right now.");

    const text = await readBounded(request, MAX_BODY);
    if (text === null) return fail(413, "payload_too_large", "That request is too large.");

    let token: unknown;
    try {
      token = (JSON.parse(text) as { token?: unknown }).token;
    } catch {
      return fail(400, "invalid_json", "That request could not be read.");
    }
    if (!isValidToken(token)) return fail(400, "invalid_token", "That link isn’t valid.");

    let upstream: unknown;
    try {
      upstream = await client.fetchStatus(token);
    } catch {
      console.error("status: lookup failed");
      return fail(502, "status_failed", "Live status isn’t available right now.");
    }

    const status = upstream === null ? null : parseStatusResponse(upstream, { clinicId, now: now() });
    if (!status) return fail(404, "not_found", "We couldn’t find that registration.");
    return respond(200, { ok: true, status });
  };
}
