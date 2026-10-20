import assert from "node:assert/strict";
import test from "node:test";

const { createRegistrationHandler } = await import(
  new URL("../src/lib/registration/handler.ts", import.meta.url).href
);
const { createStoreFromEnv } = await import(new URL("../src/lib/registration/store.ts", import.meta.url).href);
const { createRateLimiter } = await import(new URL("../src/lib/registration/rate-limit.ts", import.meta.url).href);

const NOW = new Date("2026-10-20T08:00:00Z");
const ORIGIN = "http://localhost:3000";

const body = (over = {}) => ({
  idempotencyKey: "11111111-2222-4333-8444-555555555555",
  fullName: "Priya Raman",
  dobDay: "14",
  dobMonth: "03",
  dobYear: "1993",
  gender: "female",
  phone: "9876543210",
  altPhone: "",
  email: "",
  addressLine1: "12, Lake View Road",
  addressLine2: "",
  city: "Chennai",
  state: "Tamil Nadu",
  pin: "600020",
  concerns: ["pregnancy"],
  sources: ["google_maps"],
  sourceOther: "",
  consent: true,
  signatureMethod: "typed",
  signatureData: "",
  signatureTyped: "Priya Raman",
  website: "",
  ...over,
});

function req(payload, { headers = {}, raw } = {}) {
  return new Request(`${ORIGIN}/api/registrations`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: ORIGIN,
      "x-forwarded-for": "203.0.113.7",
      ...headers,
    },
    body: raw ?? JSON.stringify(payload),
  });
}

function memoryStore() {
  const saved = [];
  return {
    saved,
    async save(record, ctx) {
      saved.push({ record, ctx });
      return { id: `BW-${saved.length}` };
    },
  };
}

function handlerWith(store, extra = {}) {
  return createRegistrationHandler({ store, now: () => NOW, ...extra });
}

test("201 only after the store confirms, with privacy headers", async () => {
  const store = memoryStore();
  const res = await handlerWith(store)(req(body()));
  assert.equal(res.status, 201);
  assert.deepEqual(await res.json(), { ok: true, id: "BW-1" });
  assert.equal(res.headers.get("cache-control"), "no-store");
  assert.equal(res.headers.get("x-robots-tag"), "noindex, nofollow, noarchive");
  assert.equal(store.saved.length, 1);
  assert.equal(store.saved[0].record.phone, "+919876543210");
  assert.equal(store.saved[0].record.registrationDate, "2026-10-20");
  assert.equal(store.saved[0].ctx.idempotencyKey, "11111111-2222-4333-8444-555555555555");
  assert.equal("website" in store.saved[0].record, false);
});

test("503 and no success when no approved store is configured", async () => {
  const res = await handlerWith(null)(req(body()));
  assert.equal(res.status, 503);
  const json = await res.json();
  assert.equal(json.ok, false);
  assert.equal(json.code, "registration_unavailable");
  assert.equal(res.headers.get("cache-control"), "no-store");
});

test("a failing store is a 502, never a success, and can be retried with the same key", async () => {
  let fail = true;
  const store = {
    calls: 0,
    async save() {
      this.calls += 1;
      if (fail) throw new Error("down");
      return { id: "BW-OK" };
    },
  };
  const handler = handlerWith(store);
  const first = await handler(req(body()));
  assert.equal(first.status, 502);
  assert.equal((await first.json()).ok, false);
  fail = false;
  const retry = await handler(req(body()));
  assert.equal(retry.status, 201);
  assert.equal(store.calls, 2);
});

test("the same idempotency key is stored once, even when sent concurrently", async () => {
  const store = memoryStore();
  const handler = handlerWith(store);
  const [a, b] = await Promise.all([handler(req(body())), handler(req(body()))]);
  const again = await handler(req(body()));
  assert.equal(a.status, 201);
  assert.equal(b.status, 201);
  assert.equal(again.status, 201);
  assert.equal(store.saved.length, 1);
  assert.equal((await again.json()).id, "BW-1");
});

test("validation errors return field messages but never echo values", async () => {
  const res = await handlerWith(memoryStore())(req(body({ fullName: "", pin: "12" })));
  assert.equal(res.status, 400);
  const text = await res.text();
  const json = JSON.parse(text);
  assert.equal(json.code, "invalid_request");
  assert.ok(json.errors.fullName && json.errors.pin);
  assert.equal(text.includes("Lake View"), false);
});

test("missing or malformed idempotency key is rejected", async () => {
  const handler = handlerWith(memoryStore());
  assert.equal((await handler(req(body({ idempotencyKey: "" })))).status, 400);
  assert.equal((await handler(req(body({ idempotencyKey: "short" })))).status, 400);
});

test("honeypot submissions are rejected, not stored", async () => {
  const store = memoryStore();
  const res = await handlerWith(store)(req(body({ website: "http://spam.example" })));
  assert.equal(res.status, 400);
  assert.equal(store.saved.length, 0);
});

test("content type, origin, size and JSON are enforced", async () => {
  const handler = handlerWith(memoryStore());
  assert.equal((await handler(req(body(), { headers: { "content-type": "text/plain" } }))).status, 415);
  assert.equal((await handler(req(body(), { headers: { origin: "https://evil.example" } }))).status, 403);
  const noOrigin = new Request(`${ORIGIN}/api/registrations`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body()),
  });
  assert.equal((await handler(noOrigin)).status, 403);
  assert.equal((await handler(req(null, { raw: "{not json" }))).status, 400);
  const big = JSON.stringify(body({ signatureTyped: "x".repeat(400_000) }));
  assert.equal((await handler(req(null, { raw: big }))).status, 413);
  const lying = req(null, { raw: big, headers: { "content-length": "100" } });
  assert.equal((await handler(lying)).status, 413, "actual bytes read are bounded, not just the header");
});

test("rate limiting returns 429 with Retry-After", async () => {
  const limiter = createRateLimiter({ limit: 2, windowMs: 60_000, now: () => 0 });
  const handler = handlerWith(memoryStore(), { limiter });
  const k = (n) => body({ idempotencyKey: `aaaaaaaa-bbbb-4ccc-8ddd-00000000000${n}` });
  assert.equal((await handler(req(k(1)))).status, 201);
  assert.equal((await handler(req(k(2)))).status, 201);
  const blocked = await handler(req(k(3)));
  assert.equal(blocked.status, 429);
  assert.ok(Number(blocked.headers.get("retry-after")) > 0);
  const other = await handler(req(k(4), { headers: { "x-forwarded-for": "198.51.100.9" } }));
  assert.equal(other.status, 201);
});

test("nothing from the submission is written to the console", async () => {
  const seen = [];
  const original = { log: console.log, error: console.error, warn: console.warn, info: console.info };
  for (const k of Object.keys(original)) console[k] = (...a) => seen.push(a.join(" "));
  try {
    const failing = { async save() { throw new Error("Priya Raman 9876543210"); } };
    await handlerWith(failing)(req(body()));
    await handlerWith(memoryStore())(req(body({ fullName: "" })));
  } finally {
    Object.assign(console, original);
  }
  assert.equal(seen.join("\n").match(/Priya|9876543210|Lake View|600020/), null);
});

// --- store activation gates --------------------------------------------------

const goodEnv = {
  REGISTRATION_ENABLED: "true",
  REGISTRATION_STORE_URL: "https://records.birthwave-clinic.example/api/intake",
  REGISTRATION_STORE_ALLOWED_HOSTS: "records.birthwave-clinic.example",
  REGISTRATION_STORE_TOKEN: "t0ken",
};

test("store stays off unless every activation gate is satisfied", () => {
  assert.equal(createStoreFromEnv({}), null);
  assert.equal(createStoreFromEnv({ ...goodEnv, REGISTRATION_ENABLED: "false" }), null);
  assert.equal(createStoreFromEnv({ ...goodEnv, REGISTRATION_STORE_TOKEN: "" }), null);
  assert.equal(createStoreFromEnv({ ...goodEnv, REGISTRATION_STORE_URL: "" }), null);
  assert.equal(createStoreFromEnv({ ...goodEnv, REGISTRATION_STORE_ALLOWED_HOSTS: "other.example" }), null);
  assert.equal(
    createStoreFromEnv({ ...goodEnv, REGISTRATION_STORE_URL: "http://records.birthwave-clinic.example/x" }),
    null,
    "https only",
  );
  assert.ok(createStoreFromEnv(goodEnv));
});

test("Google Apps Script / Sheets destinations are refused", () => {
  for (const host of ["script.google.com", "docs.google.com", "sheets.google.com", "script.googleusercontent.com"]) {
    assert.equal(
      createStoreFromEnv({
        ...goodEnv,
        REGISTRATION_STORE_URL: `https://${host}/macros/s/abc/exec`,
        REGISTRATION_STORE_ALLOWED_HOSTS: host,
      }),
      null,
      host,
    );
  }
});

test("store posts with bearer token + idempotency key and requires an id back", async () => {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({ url: String(url), init });
    return new Response(JSON.stringify({ ok: true, id: "EHR-42" }), { status: 201 });
  };
  const store = createStoreFromEnv(goodEnv, fetchImpl);
  const result = await store.save({ fullName: "x" }, { idempotencyKey: "k".repeat(20) });
  assert.deepEqual(result, { id: "EHR-42" });
  assert.equal(calls[0].init.headers.Authorization, "Bearer t0ken");
  assert.equal(calls[0].init.headers["Idempotency-Key"], "k".repeat(20));
  assert.equal(calls[0].init.redirect, "error");
  assert.equal(calls[0].init.cache, "no-store");

  for (const reply of [
    () => new Response("{}", { status: 200 }),
    () => new Response(JSON.stringify({ ok: true }), { status: 200 }),
    () => new Response("oops", { status: 200 }),
    () => new Response(JSON.stringify({ ok: true, id: "x" }), { status: 500 }),
  ]) {
    const bad = createStoreFromEnv(goodEnv, async () => reply());
    await assert.rejects(() => bad.save({}, { idempotencyKey: "k".repeat(20) }));
  }
});
