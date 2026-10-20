import { MAX_BODY_BYTES, validateRegistration } from "./rules.ts";
import { createRateLimiter, type RateLimiter } from "./rate-limit.ts";
import type { RegistrationStore } from "./store.ts";

export interface HandlerDeps {
  /** `null` means no approved destination is configured. */
  store: RegistrationStore | null;
  limiter?: RateLimiter;
  now?: () => Date;
}

const PRIVATE_HEADERS = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
};

const KEY_PATTERN = /^[A-Za-z0-9-]{16,64}$/;
const DONE_TTL_MS = 60 * 60 * 1000;
const DONE_MAX = 5_000;

function respond(status: number, payload: Record<string, unknown>, extra: Record<string, string> = {}) {
  return Response.json(payload, { status, headers: { ...PRIVATE_HEADERS, ...extra } });
}

function fail(status: number, code: string, message: string, extra: Record<string, unknown> = {}, headers = {}) {
  return respond(status, { ok: false, code, error: message, ...extra }, headers);
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? new URL(request.url).host;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Reads at most `max` bytes; returns null when the body is larger. */
async function readBounded(request: Request, max: number): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > max) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

async function fingerprint(value: unknown): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(value)));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Builds the POST handler. Success (201) is returned only after the store has
 * acknowledged the record with an id. Nothing from the request body is ever
 * logged; only fixed event codes are.
 */
export function createRegistrationHandler({ store, limiter, now = () => new Date() }: HandlerDeps) {
  const rateLimiter = limiter ?? createRateLimiter({ limit: 30, windowMs: 10 * 60 * 1000 });
  const completed = new Map<string, { id: string; hash: string; at: number }>();
  const inFlight = new Map<string, { hash: string; promise: Promise<{ id: string }> }>();

  return async function handle(request: Request): Promise<Response> {
    if (!sameOrigin(request)) return fail(403, "forbidden_origin", "This request was not accepted.");

    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().startsWith("application/json")) {
      return fail(415, "unsupported_media_type", "This request was not accepted.");
    }

    const limit = rateLimiter.check(clientKey(request));
    if (!limit.allowed) {
      return fail(429, "rate_limited", "Too many attempts. Please wait a moment and try again.", {}, {
        "Retry-After": String(limit.retryAfterSeconds),
      });
    }

    if (!store) {
      console.error("registration: storage not configured");
      return fail(
        503,
        "registration_unavailable",
        "Online registration isn’t available right now. Please check in with our reception team.",
      );
    }

    if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
      return fail(413, "payload_too_large", "That submission is too large.");
    }
    const text = await readBounded(request, MAX_BODY_BYTES);
    if (text === null) return fail(413, "payload_too_large", "That submission is too large.");

    let input: unknown;
    try {
      input = JSON.parse(text);
    } catch {
      return fail(400, "invalid_json", "That submission could not be read.");
    }

    const fields = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
    if (typeof fields.website === "string" && fields.website.trim()) {
      return fail(400, "invalid_request", "That submission could not be accepted.");
    }
    const idempotencyKey = fields.idempotencyKey;
    if (typeof idempotencyKey !== "string" || !KEY_PATTERN.test(idempotencyKey)) {
      return fail(400, "invalid_request", "That submission could not be accepted.");
    }

    const validated = validateRegistration(input, now());
    if (!validated.ok) {
      return fail(400, "invalid_request", "Please check the highlighted details.", { errors: validated.errors });
    }

    const record = validated.value;
    const hash = await fingerprint(record);

    const t = now().getTime();
    for (const [key, entry] of completed) {
      if (t - entry.at > DONE_TTL_MS) completed.delete(key);
      else break;
    }

    const previous = completed.get(idempotencyKey);
    if (previous) {
      return previous.hash === hash
        ? respond(201, { ok: true, id: previous.id })
        : fail(409, "idempotency_conflict", "This submission was already received.");
    }

    let pending = inFlight.get(idempotencyKey);
    if (pending && pending.hash !== hash) {
      return fail(409, "idempotency_conflict", "This submission is already being processed.");
    }
    if (!pending) {
      const promise = store.save(record, { idempotencyKey });
      pending = { hash, promise };
      inFlight.set(idempotencyKey, pending);
      promise
        .then((saved) => {
          completed.set(idempotencyKey, { id: saved.id, hash, at: t });
          if (completed.size > DONE_MAX) {
            const oldest = completed.keys().next().value;
            if (oldest !== undefined) completed.delete(oldest);
          }
        })
        .catch(() => undefined)
        .finally(() => inFlight.delete(idempotencyKey));
    }

    try {
      const saved = await pending.promise;
      return respond(201, { ok: true, id: saved.id });
    } catch {
      console.error("registration: storage failed");
      return fail(502, "storage_failed", "We couldn’t save your registration. Your answers are still here, so please try again.");
    }
  };
}
