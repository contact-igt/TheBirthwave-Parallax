import type { Receipt } from "./receipt.ts";

/**
 * Hands the confirmed receipt from the registration screen to /thank-you during
 * in-app navigation. It lives in module memory only (never in any browser
 * storage, cookie or URL) and is gone after a refresh.
 */
let held: Receipt | null = null;

export const rememberReceipt = (receipt: Receipt) => {
  held = receipt;
};
export const recallReceipt = (): Receipt | null => held;
export const forgetReceipt = () => {
  held = null;
};
