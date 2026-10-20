import { clientKey, fail, isJson, readBounded, respond, sameOrigin } from "../registration/http.ts";
import { createRateLimiter, type RateLimiter } from "../registration/rate-limit.ts";
import { QUEUE_STATES, type QueueState } from "../registration/receipt.ts";
import { registrationDateIST } from "../registration/rules.ts";
import type { AdminClient } from "./admin.ts";
import {
  SESSION_COOKIE,
  hashPassword,
  readSessionCookie,
  signSession,
  verifyPassword,
  verifySession,
  type StaffConfig,
  type StaffRole,
} from "./auth.ts";

interface Deps {
  config: StaffConfig | null;
  admin: AdminClient | null;
  clinicId: string;
  now?: () => Date;
  loginLimiter?: RateLimiter;
}

/** Clinicians can progress a patient but cannot rewind check-in states. */
const ROLE_STATES: Record<StaffRole, readonly QueueState[]> = {
  reception: QUEUE_STATES,
  clinician: ["called", "in_consultation", "completed"],
};

const cookieAttributes = "Path=/; HttpOnly; Secure; SameSite=Strict";
let dummyHash: string | undefined;

export function createStaffHandlers({ config, admin, clinicId, now = () => new Date(), loginLimiter }: Deps) {
  const limiter = loginLimiter ?? createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });
  const unavailable = () => fail(503, "staff_unavailable", "The staff console isn’t available.");
  const unauthorised = () => fail(401, "unauthorized", "Please sign in.");

  const session = (request: Request) =>
    config ? verifySession(readSessionCookie(request), config.secret, now()) : null;

  async function login(request: Request): Promise<Response> {
    if (!config || !admin) return unavailable();
    if (!sameOrigin(request)) return fail(403, "forbidden_origin", "This request was not accepted.");
    if (!isJson(request)) return fail(415, "unsupported_media_type", "This request was not accepted.");
    const attempt = limiter.check(clientKey(request));
    if (!attempt.allowed) {
      return fail(429, "rate_limited", "Too many attempts. Please wait and try again.", {}, {
        "Retry-After": String(attempt.retryAfterSeconds),
      });
    }

    const text = await readBounded(request, 1_024);
    let body: { username?: unknown; password?: unknown } = {};
    try {
      body = text ? (JSON.parse(text) as typeof body) : {};
    } catch {
      return fail(400, "invalid_json", "That request could not be read.");
    }
    const username = typeof body.username === "string" ? body.username.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    const account = config.accounts.find((a) => a.username === username);
    // Always spend the same hashing time so unknown usernames can't be told apart.
    dummyHash ??= hashPassword("not-a-real-account");
    const valid = verifyPassword(password, account?.passwordHash ?? dummyHash) && Boolean(account);
    if (!valid || !account) return fail(401, "invalid_credentials", "Those details weren’t recognised.");

    const cookie = signSession({ username: account.username, role: account.role }, config.secret, now(), config.sessionSeconds);
    return respond(200, { ok: true, role: account.role }, {
      "Set-Cookie": `${SESSION_COOKIE}=${cookie}; ${cookieAttributes}; Max-Age=${config.sessionSeconds}`,
    });
  }

  async function logout(request: Request): Promise<Response> {
    if (!config) return unavailable();
    if (!sameOrigin(request)) return fail(403, "forbidden_origin", "This request was not accepted.");
    return respond(200, { ok: true }, { "Set-Cookie": `${SESSION_COOKIE}=; ${cookieAttributes}; Max-Age=0` });
  }

  async function listQueue(request: Request): Promise<Response> {
    if (!config || !admin) return unavailable();
    const who = session(request);
    if (!who) return unauthorised();
    const clinicDate = registrationDateIST(now());
    try {
      const entries = await admin.list(clinicId, clinicDate);
      return respond(200, { ok: true, clinicDate, role: who.role, entries });
    } catch {
      console.error("staff: queue lookup failed");
      return fail(502, "queue_failed", "The queue couldn’t be loaded. Please try again.");
    }
  }

  async function updateQueue(request: Request): Promise<Response> {
    if (!config || !admin) return unavailable();
    if (!sameOrigin(request)) return fail(403, "forbidden_origin", "This request was not accepted.");
    if (!isJson(request)) return fail(415, "unsupported_media_type", "This request was not accepted.");
    const who = session(request);
    if (!who) return unauthorised();

    const text = await readBounded(request, 1_024);
    let body: { id?: unknown; state?: unknown } = {};
    try {
      body = text ? (JSON.parse(text) as typeof body) : {};
    } catch {
      return fail(400, "invalid_json", "That request could not be read.");
    }
    const { id, state } = body;
    if (typeof id !== "string" || !/^[A-Za-z0-9_.-]{1,100}$/.test(id) || !QUEUE_STATES.includes(state as QueueState)) {
      return fail(400, "invalid_request", "That update wasn’t valid.");
    }
    if (!ROLE_STATES[who.role].includes(state as QueueState)) {
      return fail(403, "forbidden_state", "Your role can’t set that status.");
    }

    try {
      const entry = await admin.update(id, state as QueueState);
      return entry ? respond(200, { ok: true, entry }) : fail(404, "not_found", "That patient wasn’t found.");
    } catch {
      console.error("staff: queue update failed");
      return fail(502, "queue_failed", "The update didn’t save. Please try again.");
    }
  }

  return { login, logout, listQueue, updateQueue };
}
