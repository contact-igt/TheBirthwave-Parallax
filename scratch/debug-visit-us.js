const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/about", { waitUntil: "networkidle" });

  const section = await page.$("#clinic-location");
  if (!section) {
    console.log("Section #clinic-location not found!");
    await browser.close();
    return;
  }

  const html = await section.innerHTML();
  console.log("=== INNER HTML OF #clinic-location ===");
  console.log(html);

  const debugInfo = await page.evaluate(() => {
    const sec = document.getElementById("clinic-location");
    const h2 = document.getElementById("clinic-strip-heading");
    const leftCol = h2 ? h2.parentElement : null;
    const card = sec ? sec.querySelector(".rounded-3xl") : null;

    return {
      sec: sec ? {
        tagName: sec.tagName,
        className: sec.className,
        rect: sec.getBoundingClientRect(),
        style: window.getComputedStyle(sec).cssText
      } : null,
      card: card ? {
        className: card.className,
        rect: card.getBoundingClientRect(),
        bgColor: window.getComputedStyle(card).backgroundColor,
        width: window.getComputedStyle(card).width,
        height: window.getComputedStyle(card).height,
      } : null,
      leftCol: leftCol ? {
        className: leftCol.className,
        rect: leftCol.getBoundingClientRect(),
        display: window.getComputedStyle(leftCol).display,
        visibility: window.getComputedStyle(leftCol).visibility,
        opacity: window.getComputedStyle(leftCol).opacity,
        width: window.getComputedStyle(leftCol).width,
        height: window.getComputedStyle(leftCol).height,
        color: window.getComputedStyle(leftCol).color,
      } : null,
      h2: h2 ? {
        text: h2.textContent,
        rect: h2.getBoundingClientRect(),
        display: window.getComputedStyle(h2).display,
        visibility: window.getComputedStyle(h2).visibility,
        opacity: window.getComputedStyle(h2).opacity,
        color: window.getComputedStyle(h2).color,
      } : null
    };
  });

  console.log("=== DEBUG INFO ===");
  console.log(JSON.stringify(debugInfo, null, 2));

  await section.screenshot({ path: "scratch/clinic-location-element.png" });
  console.log("Saved scratch/clinic-location-element.png");

  await browser.close();
})();
