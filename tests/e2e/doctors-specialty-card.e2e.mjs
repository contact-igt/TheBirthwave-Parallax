import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3120";
const SPECIALTY = "Natural Birth & VBAC Specialist · Holistic Fertility Coach";
const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
];

const browser = await chromium.launch({ channel: "chrome", headless: true });

try {
  for (const viewport of VIEWPORTS) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: "reduce",
    });

    await page.goto(`${BASE}/doctors`, { waitUntil: "domcontentloaded" });

    const specialty = page
      .locator("p:visible", { hasText: "SPECIALISES IN" })
      .first()
      .locator("..")
      .getByText(SPECIALTY, { exact: true });
    await specialty.scrollIntoViewIfNeeded();

    const layout = await specialty.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        textOverflow: style.textOverflow,
        whiteSpace: style.whiteSpace,
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
        clientHeight: element.clientHeight,
        scrollHeight: element.scrollHeight,
      };
    });

    assert.notEqual(layout.textOverflow, "ellipsis", `${viewport.name}: specialty must not use an ellipsis`);
    assert.notEqual(layout.whiteSpace, "nowrap", `${viewport.name}: specialty must be allowed to wrap`);
    assert.ok(
      layout.scrollWidth <= layout.clientWidth + 1 && layout.scrollHeight <= layout.clientHeight + 1,
      `${viewport.name}: full specialty text must fit inside its visible box (${JSON.stringify(layout)})`,
    );

    await page.close();
  }
} finally {
  await browser.close();
}
