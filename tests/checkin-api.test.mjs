import assert from "node:assert/strict";
import test from "node:test";
import { createFakeBackend } from "./support/fake-backend.mjs";

const { createRegistrationHandler } = await import(new URL("../src/lib/registration/handler.ts", import.meta.url).href);
const { createStatusHandler } = await import(new URL("../src/lib/registration/status-handler.ts", import.meta.url).href);
const { createStoreFromEnv, createStatusClientFromEnv } = await import(new URL("../src/lib/registration/store.ts", import.meta.url).href);
const { createRateLimiter } = await import(new URL("../src/lib/registration/rate-limit.ts", import.meta.url).href);

const ORIGIN = "http://localhost:3000";
const env = (backend) => ({
  REGISTRATION_ENABLED: "true",
  REGISTRATION_STORE_URL: "https://backend.test/intake",
  REGISTRATION_STATUS_URL: "https://backend.test/status",
  REGISTRATION_STORE_ALLOWED_HOSTS: "backend.test",
  REGISTRATION_STORE_TOKEN: backend.bearer,
});

const payload = (n, over = {}) => ({
  idempotencyKey: `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`,
  fullName: `Priya Raman${n}`.replace(/\d/g, ""),
  dobDay: "14", dobMonth: "03", dobYear: "1993", gender: "female",
  phone: "9876543210", altPhone: "", email: "",
  addressLine1: "12 Lake View Road", addressLine2: "", city: "Chennai", state: "Tamil Nadu", pin: "600020",
  concerns: ["pregnancy"], sources: ["google_maps"], sourceOther: "",
  consent: true, signatureMethod: "typed", signatureData: "", signatureTyped: "Priya Raman", website: "",
  ...over,
});

const post = (body, headers = {}, path = "/api/registrations") =>
  new Request(`${ORIGIN}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: ORIGIN, "x-forwarded-for": "203.0.113.7", ...headers },
    body: JSON.stringify(body),
  });

function setup(opts = {}) {
  let clock = new Date(opts.start ?? "2026-10-20T08:00:00Z");
  const backend = createFakeBackend({ now: () => clock, ...opts });
  const e = env(backend);
  const store = createStoreFromEnv(e, backend.fetch);
  const client = createStatusClientFromEnv(e, backend.fetch);
  const mk = () => createRegistrationHandler({ store, now: () => clock, clinicId: "main" });
  return { backend, store, client, mk, handler: mk(), setClock: (d) => (clock = new Date(d)), now: () => clock };
}

test("registrations get consecutive real daily numbers from the backend", async () => {
  const { handler } = setup();
  const a = await (await handler(post(payload(1)))).json();
  const b = await (await handler(post(payload(2)))).json();
  assert.equal(a.sequence, 1);
  assert.equal(b.sequence, 2);
  assert.equal(b.dayTotal, 2);
  assert.match(a.id, /^BW-20261020-0001$/);
  assert.match(a.token, /^[A-Za-z0-9_-]{22,}$/);
  assert.equal(a.clinicDate, "2026-10-20");
});

test("concurrent submissions never share or skip a number", async () => {
  const { handler } = setup();
  const responses = await Promise.all(Array.from({ length: 25 }, (_, i) => handler(post(payload(i + 1), { "x-forwarded-for": `10.0.0.${i}` }))));
  const seqs = (await Promise.all(responses.map((r) => r.json()))).map((j) => j.sequence).sort((x, y) => x - y);
  assert.deepEqual(seqs, Array.from({ length: 25 }, (_, i) => i + 1));
});

test("retries and refreshes cannot create duplicate registrations or inflate the count", async () => {
  const { backend, mk, handler } = setup();
  const first = await (await handler(post(payload(1)))).json();
  const parallel = await Promise.all(Array.from({ length: 5 }, () => handler(post(payload(1)))));
  for (const res of parallel) assert.equal((await res.json()).sequence, first.sequence);
  // a different server instance (empty in-memory cache) replays the same key: the BACKEND de-duplicates
  const fresh = mk();
  const replay = await (await fresh(post(payload(1)))).json();
  assert.equal(replay.sequence, 1);
  assert.equal(replay.id, first.id);
  const next = await (await fresh(post(payload(2)))).json();
  assert.equal(next.sequence, 2, "retries did not consume numbers");
  assert.equal(next.dayTotal, 2);
  assert.ok(backend.calls.save >= 3);
});

test("numbering restarts at local (IST) midnight, not UTC midnight", async () => {
  const { handler, setClock } = setup({ start: "2026-10-20T18:20:00Z" }); // 23:50 IST on the 20th
  const late = await (await handler(post(payload(1)))).json();
  assert.equal(late.clinicDate, "2026-10-20");
  assert.equal(late.sequence, 1);
  setClock("2026-10-20T18:31:00Z"); // 00:01 IST on the 21st (still 20 Oct in UTC)
  const early = await (await handler(post(payload(2)))).json();
  assert.equal(early.clinicDate, "2026-10-21");
  assert.equal(early.sequence, 1, "day sequence reset at IST midnight");
  assert.match(early.id, /^BW-20261021-0001$/);
});

test("a number the backend computed for another day is never shown as today's", async () => {
  const { backend, store } = setup();
  const stale = createRegistrationHandler({
    store: { save: async (r, c) => ({ ...(await store.save(r, c)), clinicDate: "2026-10-19", checkedInAt: "2026-10-19T08:00:00Z" }) },
    now: () => new Date("2026-10-20T08:00:00Z"),
  });
  const res = await stale(post(payload(1)));
  assert.equal(res.status, 201);
  const json = await res.json();
  assert.equal(json.sequence, undefined);
  assert.ok(json.id, "the confirmed reference is still shown");
  assert.equal(backend.calls.save, 1);
});

test("the browser response never contains submitted personal data", async () => {
  const { handler } = setup();
  const text = await (await handler(post(payload(1)))).text();
  for (const secret of ["Priya", "9876543210", "Lake View", "600020", "pregnancy", "google_maps"]) {
    assert.equal(text.includes(secret), false, secret);
  }
});

test("a backend that returns no confirmation id is a failure, not a success", async () => {
  const handler = createRegistrationHandler({
    store: { save: async () => ({ ok: true }) },
    now: () => new Date("2026-10-20T08:00:00Z"),
  });
  const res = await handler(post(payload(1)));
  assert.equal(res.status, 502);
  assert.equal((await res.json()).ok, false);
});

// ------------------------------------------------------------------- status

const staff = async (ctx, id, state) => {
  const res = await ctx.backend.handle("/admin", { action: "update", id, state }, `Bearer ${ctx.backend.bearer}`);
  assert.equal(res.status, 200);
};

const statusReq = (token, headers = {}) => post({ token }, headers, "/api/queue/status");

async function registered(opts) {
  const ctx = setup(opts);
  const receipt = await (await ctx.handler(post(payload(1)))).json();
  const status = createStatusHandler({ client: ctx.client, now: ctx.now });
  return { ...ctx, receipt, status };
}

test("status returns the patient's own validated record and nothing else", async () => {
  const { receipt, status } = await registered();
  const res = await status(statusReq(receipt.token));
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("cache-control"), "no-store");
  const { status: s } = await res.json();
  assert.equal(s.reference, receipt.id);
  assert.equal(s.state, "registered");
  assert.equal(s.queue, undefined, "no live queue data without staff confirmation");
  assert.deepEqual(Object.keys(s).sort(), ["checkedInAt", "clinicDate", "dayTotal", "reference", "sequence", "state", "updatedAt"]);
});

test("queue position is real and separate from the registration number", async () => {
  const ctx = setup({ queueLive: true, estimate: { min: 15, max: 30 } });
  const tokens = [];
  for (let i = 1; i <= 4; i += 1) tokens.push((await (await ctx.handler(post(payload(i)))).json()).token);
  const status = createStatusHandler({ client: ctx.client, now: ctx.now });
  // staff mark patient #4 waiting, others still only registered
  await staff(ctx, "BW-20261020-0004", "waiting");
  const s4 = (await (await status(statusReq(tokens[3]))).json()).status;
  assert.equal(s4.sequence, 4);
  assert.equal(s4.queue.ahead, 3, "3 earlier patients are still active");
  // staff move #1 and #2 on; ahead drops but registration number stays 4
  for (const id of ["BW-20261020-0001", "BW-20261020-0002"]) await staff(ctx, id, "completed");
  const again = (await (await status(statusReq(tokens[3]))).json()).status;
  assert.equal(again.sequence, 4);
  assert.equal(again.queue.ahead, 1);
  assert.deepEqual(again.queue.estimateMinutes, { min: 15, max: 30 });
});

test("without a live, staff-confirmed queue no position or estimate is produced", async () => {
  const ctx = setup({ queueLive: false });
  const r = await (await ctx.handler(post(payload(1)))).json();
  await staff(ctx, r.id, "waiting");
  const status = createStatusHandler({ client: ctx.client, now: ctx.now });
  const s = (await (await status(statusReq(r.token))).json()).status;
  assert.equal(s.state, "waiting");
  assert.equal(s.queue, undefined);
});

test("status refuses bad, unknown and forged tokens and is origin-checked", async () => {
  const { status, receipt } = await registered();
  assert.equal((await status(statusReq("short"))).status, 400);
  assert.equal((await status(statusReq(12345))).status, 400);
  assert.equal((await status(statusReq("A".repeat(32)))).status, 404);
  assert.equal((await status(statusReq(receipt.token, { origin: "https://evil.example" }))).status, 403);
  const text = await (await status(statusReq("A".repeat(32)))).text();
  assert.equal(text.includes("A".repeat(32)), false, "token is never echoed");
  const notJson = new Request(`${ORIGIN}/api/queue/status`, { method: "POST", headers: { "content-type": "text/plain", origin: ORIGIN }, body: "{}" });
  assert.equal((await status(notJson)).status, 415);
});

test("token guessing is rate limited", async () => {
  const { client, now } = setup();
  const status = createStatusHandler({ client, now, limiter: createRateLimiter({ limit: 3, windowMs: 60_000, now: () => 0 }) });
  for (let i = 0; i < 3; i += 1) assert.equal((await status(statusReq("B".repeat(30)))).status, 404);
  const blocked = await status(statusReq("B".repeat(30)));
  assert.equal(blocked.status, 429);
  assert.ok(Number(blocked.headers.get("retry-after")) > 0);
});

test("status is unavailable (not faked) when no status endpoint is configured", async () => {
  const ctx = setup();
  const none = createStatusClientFromEnv({ ...env(ctx.backend), REGISTRATION_STATUS_URL: "" }, ctx.backend.fetch);
  assert.equal(none, null);
  const res = await createStatusHandler({ client: null })(statusReq("C".repeat(30)));
  assert.equal(res.status, 503);
  assert.equal((await res.json()).code, "status_unavailable");
});

test("status lookups log nothing identifying", async () => {
  const seen = [];
  const original = { log: console.log, error: console.error, warn: console.warn };
  for (const k of Object.keys(original)) console[k] = (...a) => seen.push(a.join(" "));
  try {
    const token = "D".repeat(30);
    await createStatusHandler({ client: { fetchStatus: async () => { throw new Error(token); } } })(statusReq(token));
  } finally {
    Object.assign(console, original);
  }
  assert.equal(seen.join("\n").includes("D".repeat(30)), false);
});
