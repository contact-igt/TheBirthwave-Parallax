#!/usr/bin/env node
/**
 * Creates the salted scrypt hash for a STAFF_ACCOUNTS entry.
 * The password is read from stdin so it never lands in shell history:
 *
 *   printf '%s' 'the-password' | node scripts/hash-staff-password.mjs
 */
import { hashPassword } from "../src/lib/staff/auth.ts";

let input = "";
for await (const chunk of process.stdin) input += chunk;
const password = input.replace(/\r?\n$/, "");

if (password.length < 12) {
  console.error("Use a password of at least 12 characters.");
  process.exit(1);
}
console.log(hashPassword(password));
