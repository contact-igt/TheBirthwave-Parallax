The Birthwave – scroll video sequence

WHERE TO PUT FILES (Vercel / Vite / Next.js: the "public" folder)
  public/frames/desktop/   158 frames, 1600px wide (~13 MB total)
  public/frames/mobile/     79 frames,  900px wide (~3.3 MB total)
  public/scroll-sequence.js

THEN
  Paste the contents of scroll-sequence.html (section + style + script tag)
  near the bottom of your page.

  React/Next: put the <section> markup in a component, move the CSS to your
  stylesheet, and load scroll-sequence.js once (e.g. useEffect or next/script).

TUNING
  - Scroll length: .seq-wrap height (400vh desktop, 300vh mobile)
  - Frames only start downloading when the user is ~1.5 screens away from
    the section, so the top of the page stays fast.
  - Users with "reduce motion" turned on see one still frame instead.
