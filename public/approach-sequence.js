// "Our Approach" slow-motion scroll sequence (The Birthwave).
// Frames: /frames2/desktop (233 × 1600px), /frames2/mobile (118 × 900px).
// Slow-mo feel comes from EASE: the shown frame glides toward the scroll target instead of jumping,
// and neighbouring frames are cross-faded so motion looks continuous.
(function () {
  const wrap = document.getElementById('approach-wrap');
  const canvas = document.getElementById('approach-canvas');
  if (!wrap || !canvas) return;
  const ctx = canvas.getContext('2d');

  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const FOLDER = isMobile ? '/frames2/mobile' : '/frames2/desktop';
  const COUNT = isMobile ? 118 : 233;
  const EASE = 0.08;          // lower = slower, dreamier glide (0.05–0.12)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const src = (i) => `${FOLDER}/f_${String(i + 1).padStart(4, '0')}.webp`;
  const frames = new Array(COUNT);
  const ok = (i) => frames[i] && frames[i].complete && frames[i].naturalWidth;
  let shown = 0, target = 0, lastDrawn = -1, running = false, started = false;

  function progress() {
    const r = wrap.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
  }

  function paint(img, alpha) {
    const s = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth * s, h = img.naturalHeight * s;
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    ctx.globalAlpha = 1;
  }

  function draw(force) {
    let a = Math.floor(shown);
    const t = shown - a;
    while (a > 0 && !ok(a)) a--;
    if (!ok(a)) return;
    const key = Math.round(shown * 20); // redraw only when visibly changed
    if (!force && key === lastDrawn) return;
    lastDrawn = key;
    paint(frames[a], 1);
    const b = a + 1;
    if (t > 0.01 && b < COUNT && ok(b)) paint(frames[b], t); // cross-fade to next frame
  }

  function tick() {
    target = progress() * (COUNT - 1);
    shown += (target - shown) * EASE;
    if (Math.abs(target - shown) < 0.01) shown = target;
    draw(false);
    wrap.style.setProperty('--p', (shown / (COUNT - 1)).toFixed(4)); // for text fades in CSS
    if (shown !== target) requestAnimationFrame(tick); else running = false;
  }
  function kick() { if (!running) { running = true; requestAnimationFrame(tick); } }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    draw(true);
  }

  function load() {
    if (started) return;
    started = true;
    for (let i = 0; i < COUNT; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.src = src(i);
      if (i === 0) img.onload = () => { resize(); kick(); };
      frames[i] = img;
    }
  }

  if (reduceMotion) {
    const img = new Image();
    img.onload = () => { frames[0] = img; resize(); };
    img.src = src(COUNT - 1); // final, fully revealed room
    wrap.classList.add('approach-static');
    return;
  }

  new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) { load(); obs.disconnect(); }
  }, { rootMargin: '150% 0px' }).observe(wrap);

  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', resize);
})();
