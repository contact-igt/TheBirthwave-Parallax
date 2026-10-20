import type { Receipt } from "./receipt.ts";

/**
 * Hands the confirmed receipt from the registration screen to /thank-you during
 * navigation. Uses module memory + ephemeral sessionStorage handoff so that
 * window.location transitions reliably display the receipt immediately.
 * No patient personal data (names, diagnosis, phone) is stored here.
 */
let held: Receipt | null = null;
const KEY = "bw_receipt_handoff";

export const rememberReceipt = (receipt: Receipt) => {
  held = receipt;
  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.setItem(KEY, JSON.stringify(receipt));
    } catch {
      // Storage unavailable or disabled
    }
  }
};

export const recallReceipt = (): Receipt | null => {
  if (held) return held;
  if (typeof window !== "undefined") {
    try {
      const raw = window.sessionStorage.getItem(KEY);
      if (raw) {
        window.sessionStorage.removeItem(KEY);
        held = JSON.parse(raw);
        return held;
      }
    } catch {
      // Storage unavailable or disabled
    }
  }
  return null;
};

export const forgetReceipt = () => {
  held = null;
  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.removeItem(KEY);
    } catch {
      // Storage unavailable or disabled
    }
  }
};
