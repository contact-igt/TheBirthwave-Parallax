/**
 * A TEST DOUBLE for the clinic's protected backend. It follows the contract in
 * docs/checkin-backend-contract.md (atomic per-day numbering keyed by clinic +
 * Asia/Kolkata date, unique idempotency keys, staff-confirmed queue) so the app
 * can be exercised end to end. Nothing here ships in the application.
 */
import { randomBytes } from "node:crypto";
import { createServer } from "node:https";

const IST = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" });
export const istDate = (d) => {
  const p = Object.fromEntries(IST.formatToParts(d).map((x) => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day}`;
};

const ACTIVE = new Set(["registered", "checked_in", "waiting"]);
export const STATES = ["registered", "checked_in", "waiting", "called", "in_consultation", "completed"];

export function createFakeBackend({ now = () => new Date(), queueLive = false, estimate = null, bearer = "backend-secret" } = {}) {
  let failNext = 0;
  const byKey = new Map();
  const byToken = new Map();
  const byId = new Map();
  const counters = new Map();
  let order = 0;
  const calls = { save: 0, status: 0, admin: 0 };

  const ok = (json, status = 200) => ({ status, json });
  const authed = (auth) => auth === `Bearer ${bearer}`;

  async function save(body) {
    calls.save += 1;
    await new Promise((resolve) => setImmediate(resolve)); // let concurrent requests interleave
    if (failNext > 0) {
      failNext -= 1;
      return { status: 500, json: { ok: false } };
    }
    // --- atomic section (a single SQL transaction in a real backend) ---
    const existing = byKey.get(body.idempotencyKey);
    if (existing) return ok(receiptOf(existing), 201);
    const clinicId = body.clinicId;
    const clinicDate = istDate(now());
    const key = `${clinicId}|${clinicDate}`;
    const sequence = (counters.get(key) ?? 0) + 1;
    counters.set(key, sequence);
    const entry = {
      id: `BW-${clinicDate.replaceAll("-", "")}-${String(sequence).padStart(4, "0")}`,
      token: randomBytes(24).toString("base64url"),
      sequence,
      clinicId,
      clinicDate,
      checkedInAt: now().toISOString(),
      state: "registered",
      displayName: String(body.record.fullName).split(" ")[0],
      order: (order += 1),
      updatedAt: now().toISOString(),
    };
    byKey.set(body.idempotencyKey, entry);
    byToken.set(entry.token, entry);
    byId.set(entry.id, entry);
    return ok(receiptOf(entry), 201);
  }

  const receiptOf = (e) => ({
    ok: true,
    id: e.id,
    token: e.token,
    sequence: e.sequence,
    dayTotal: counters.get(`${e.clinicId}|${e.clinicDate}`),
    checkedInAt: e.checkedInAt,
    clinicDate: e.clinicDate,
    clinicId: e.clinicId,
  });

  function status(body) {
    calls.status += 1;
    const e = byToken.get(body.token);
    if (!e) return { status: 404, json: { ok: false } };
    const s = {
      reference: e.id,
      sequence: e.sequence,
      dayTotal: counters.get(`${e.clinicId}|${e.clinicDate}`),
      checkedInAt: e.checkedInAt,
      clinicDate: e.clinicDate,
      clinicId: e.clinicId,
      state: e.state,
      updatedAt: e.updatedAt,
    };
    if (queueLive && e.state === "waiting") {
      const ahead = [...byId.values()].filter(
        (o) => o.clinicId === e.clinicId && o.clinicDate === e.clinicDate && ACTIVE.has(o.state) && o.order < e.order,
      ).length;
      s.queue = { live: true, confirmedByStaff: true, ahead, updatedAt: now().toISOString(), ...(estimate ? { estimateMinutes: estimate } : {}) };
    }
    return ok({ ok: true, status: s });
  }

  function admin(body) {
    calls.admin += 1;
    if (body.action === "list") {
      const entries = [...byId.values()]
        .filter((e) => e.clinicId === body.clinicId && e.clinicDate === body.clinicDate)
        .sort((a, b) => a.order - b.order)
        .map(({ id, sequence, displayName, state, checkedInAt, updatedAt }) => ({ id, reference: id, sequence, displayName, state, checkedInAt, updatedAt }));
      return ok({ ok: true, entries });
    }
    if (body.action === "update") {
      const e = byId.get(body.id);
      if (!e || !STATES.includes(body.state)) return { status: 400, json: { ok: false } };
      e.state = body.state;
      e.updatedAt = now().toISOString();
      const { id, sequence, displayName, state, checkedInAt, updatedAt } = e;
      return ok({ ok: true, entry: { id, reference: id, sequence, displayName, state, checkedInAt, updatedAt } });
    }
    return { status: 400, json: { ok: false } };
  }

  async function handle(path, body, auth) {
    if (!authed(auth)) return { status: 401, json: { ok: false } };
    if (path === "/intake") return save(body);
    if (path === "/status") return status(body);
    if (path === "/admin") return admin(body);
    return { status: 404, json: { ok: false } };
  }

  return {
    calls,
    handle,
    /** Make the next N save calls fail (simulates the storage system being down). */
    failNext: (n = 1) => {
      failNext = n;
    },
    /** Everything the backend has stored (test inspection only). */
    snapshot: () => [...byId.values()].map(({ id, sequence, clinicId, clinicDate, state, displayName }) => ({ id, sequence, clinicId, clinicDate, state, displayName })),
    bearer,
    /** Drop-in `fetch` for createStoreFromEnv / createStatusClientFromEnv. */
    fetch: async (url, init) => {
      const { status: code, json } = await handle(new URL(String(url)).pathname, JSON.parse(init.body), init.headers.Authorization);
      return new Response(JSON.stringify(json), { status: code, headers: { "content-type": "application/json" } });
    },
    /** Real HTTPS server (self-signed) for browser end-to-end runs. */
    listen: (port, { key, cert }) =>
      new Promise((resolve) => {
        const server = createServer({ key, cert }, (req, res) => {
          let raw = "";
          req.on("data", (c) => (raw += c));
          req.on("end", async () => {
            const { status: code, json } = await handle(req.url, raw ? JSON.parse(raw) : {}, req.headers.authorization);
            res.writeHead(code, { "content-type": "application/json" });
            res.end(JSON.stringify(json));
          });
        }).listen(port, "127.0.0.1", () => resolve(server));
      }),
  };
}
