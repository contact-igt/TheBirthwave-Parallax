import type { RegistrationRecord } from "./rules.ts";

/**
 * The only way a registration leaves this server. A store must be an
 * access-restricted, clinic-approved destination; nothing here is a default.
 */
export interface RegistrationStore {
  /** Resolves with the backend's confirmation body (always includes `id`). */
  save(record: RegistrationRecord, context: { idempotencyKey: string; clinicId: string }): Promise<{ id: string }>;
}

/** Read-only lookup of a patient's own status by opaque token. */
export interface StatusClient {
  fetchStatus(token: string): Promise<unknown>;
}

type Env = Record<string, string | undefined>;
type FetchLike = (input: string | URL, init?: RequestInit) => Promise<Response>;

/** Marketing/spreadsheet hosts must never receive patient records. */
const FORBIDDEN_HOST = /(^|\.)(google\.com|googleusercontent\.com|googleapis\.com)$/i;

/**
 * Builds the HTTPS store from environment configuration, or returns `null`
 * (registrations then answer 503). Every gate must pass:
 *
 *   REGISTRATION_ENABLED=true            — set only after clinic go-live approval
 *   REGISTRATION_STORE_URL=https://…     — the approved intake endpoint
 *   REGISTRATION_STORE_ALLOWED_HOSTS=…   — comma list; URL host must be listed
 *   REGISTRATION_STORE_TOKEN=…           — bearer credential for that endpoint
 *
 * Contract: POST JSON `{ record, idempotencyKey, clinicId }` with `Authorization` and
 * `Idempotency-Key` headers; reply 200/201 `{ "ok": true, "id": "<record id>" }`.
 */
/** Applies every activation gate to one backend URL variable. */
export function approvedEndpoint(
  env: Env,
  urlVar: string,
  tokenVar = "REGISTRATION_STORE_TOKEN",
): { endpoint: URL; token: string } | null {
  if (env.REGISTRATION_ENABLED !== "true") return null;

  const token = env[tokenVar]?.trim();
  const rawUrl = env[urlVar]?.trim();
  const allowed = (env.REGISTRATION_STORE_ALLOWED_HOSTS ?? "")
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
  if (!token || !rawUrl || allowed.length === 0) return null;

  let endpoint: URL;
  try {
    endpoint = new URL(rawUrl);
  } catch {
    return null;
  }

  const host = endpoint.hostname.toLowerCase();
  if (endpoint.protocol !== "https:" || endpoint.username || endpoint.password) return null;
  if (!allowed.includes(host) || FORBIDDEN_HOST.test(host)) return null;
  return { endpoint, token };
}

export function createStoreFromEnv(env: Env = process.env, fetchImpl: FetchLike = fetch): RegistrationStore | null {
  const approved = approvedEndpoint(env, "REGISTRATION_STORE_URL");
  if (!approved) return null;
  const { endpoint, token } = approved;

  return {
    async save(record, { idempotencyKey, clinicId }) {
      const response = await fetchImpl(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify({ record, idempotencyKey, clinicId }),
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(15_000),
      });

      if (response.status !== 200 && response.status !== 201) throw new Error("store_rejected");

      let result: { ok?: unknown; id?: unknown };
      try {
        result = (await response.json()) as { ok?: unknown; id?: unknown };
      } catch {
        throw new Error("store_unreadable");
      }
      if (result.ok !== true || typeof result.id !== "string" || !result.id || result.id.length > 100) {
        throw new Error("store_unconfirmed");
      }
      return { ...(result as Record<string, unknown>), id: result.id };
    },
  };
}

/**
 * Status lookup for the waiting page. Optional: without `REGISTRATION_STATUS_URL`
 * the waiting page simply shows the safe fallback wording.
 */
export function createStatusClientFromEnv(env: Env = process.env, fetchImpl: FetchLike = fetch): StatusClient | null {
  const approved = approvedEndpoint(env, "REGISTRATION_STATUS_URL");
  if (!approved) return null;
  const { endpoint, token } = approved;

  return {
    async fetchStatus(patientToken) {
      const response = await fetchImpl(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ token: patientToken }),
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(8_000),
      });
      if (response.status === 404) return null;
      if (response.status !== 200) throw new Error("status_rejected");
      return (await response.json()) as unknown;
    },
  };
}
