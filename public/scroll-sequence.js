// Scroll-driven image sequence for The Birthwave clinic video.
// Frames live in /frames/desktop (158 × 1600px) and /frames/mobile (79 × 900px).
(function () {
  const wrap = document.getElementById('seq-wrap');
  const canvas = document.getElementById('seq-canvas');
  if (!wrap || !canvas) return;
  const ctx = canvas.getContext('2d');

  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const FOLDER = isMobile ? '/frames/mobile' : '/frames/desktop';
  const COUNT = isMobile ? 79 : 158;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const src = (i) => `${FOLDER}/f_${String(i + 1).padStart(4, '0')}.webp`;
  const frames = new Array(COUNT);
  let current = -1;
  let started = false;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    current = -1; // force redraw
    draw();
  }

  // "object-fit: cover" for canvas
  function paint(img) {
    const s = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth * s, h = img.naturalHeight * s;
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
  }

  function progress() {
    const r = wrap.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
  }

  function draw() {
    let i = Math.round(progress() * (COUNT - 1));
    // If the target frame hasn't loaded yet, show the nearest earlier one
    while (i > 0 && !(frames[i] && frames[i].complete && frames[i].naturalWidth)) i--;
    const img = frames[i];
    if (i === current || !img || !img.complete || !img.naturalWidth) return;
    current = i;
    paint(img);
  }

  function load() {
    if (started) return;
    started = true;
    // Load first frame first so something shows immediately, then the rest
    for (let i = 0; i < COUNT; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.src = src(i);
      if (i === 0) img.onload = resize;
      frames[i] = img;
    }
  }

  if (reduceMotion) {
    // Just show a single still frame
    const img = new Image();
    img.onload = () => { frames[0] = img; resize(); };
    img.src = src(Math.floor(COUNT / 2));
    wrap.classList.add('seq-static');
    return;
  }

  // Start downloading only when the section is ~1.5 screens away
  new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) { load(); obs.disconnect(); }
  }, { rootMargin: '150% 0px' }).observe(wrap);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { draw(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', resize);
})();
