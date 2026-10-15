async function run() {
  const res = await fetch('http://localhost:3000/about');
  const text = await res.text();
  const idx = text.indexOf('id="clinic-location"');
  console.log('Index:', idx);
  if (idx !== -1) {
    console.log(text.substring(idx - 10, idx + 2500));
  }
}
run();
