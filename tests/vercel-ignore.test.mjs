import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const script = fileURLToPath(new URL("../scripts/vercel-ignore-build.sh", import.meta.url));
const run = (env) => spawnSync("bash", [script], { env: { PATH: process.env.PATH, ...env }, encoding: "utf8" }).status;
const SKIP = 0;
const BUILD = 1;

test("the public website project never builds the check-in branch", () => {
  assert.equal(run({ VERCEL_GIT_COMMIT_REF: "registration-form", VERCEL_PROJECT_PRODUCTION_URL: "www.thebirthwave.in" }), SKIP);
  assert.equal(run({ VERCEL_GIT_COMMIT_REF: "registration-form" }), SKIP);
});

test("the public website project still builds its own branches", () => {
  for (const branch of ["main", "dev", "feature/x"]) {
    assert.equal(run({ VERCEL_GIT_COMMIT_REF: branch, VERCEL_PROJECT_PRODUCTION_URL: "www.thebirthwave.in" }), BUILD, branch);
  }
});

test("the check-in project builds only the check-in branch", () => {
  assert.equal(run({ VERCEL_GIT_COMMIT_REF: "registration-form", CLINIC_APP: "checkin" }), BUILD);
  assert.equal(run({ VERCEL_GIT_COMMIT_REF: "registration-form", VERCEL_PROJECT_PRODUCTION_URL: "checkin.thebirthwave.in" }), BUILD);
  assert.equal(run({ VERCEL_GIT_COMMIT_REF: "main", CLINIC_APP: "checkin" }), SKIP);
  assert.equal(run({ VERCEL_GIT_COMMIT_REF: "dev", VERCEL_PROJECT_PRODUCTION_URL: "checkin.thebirthwave.in" }), SKIP);
});
