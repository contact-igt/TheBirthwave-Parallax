async function main() {
  const targets = await fetch('http://127.0.0.1:9222/json').then(r => r.json());
  const aboutPage = targets.find(t => t.url.includes('/about'));
  if (!aboutPage) {
    console.log('No about page found');
    return;
  }
  const ws = new WebSocket(aboutPage.webSocketDebuggerUrl);
  ws.addEventListener('open', () => {
    const expr = `
      (() => {
        const elAtHeading = document.elementFromPoint(300, 250);
        const elAtButton = document.elementFromPoint(300, 480);
        const elAtPlaceholder = document.elementFromPoint(1200, 300);
        
        function describe(el) {
          if (!el) return 'null';
          return {
            tag: el.tagName,
            id: el.id,
            className: el.className ? el.className.toString() : '',
            style: el.getAttribute('style'),
            rect: el.getBoundingClientRect(),
            zIndex: window.getComputedStyle(el).zIndex,
            opacity: window.getComputedStyle(el).opacity,
            pointerEvents: window.getComputedStyle(el).pointerEvents,
            text: el.innerText ? el.innerText.slice(0, 50) : ''
          };
        }
        
        return {
          headingHit: describe(elAtHeading),
          buttonHit: describe(elAtButton),
          placeholderHit: describe(elAtPlaceholder)
        };
      })()
    `;
    const msg = {
      id: 1,
      method: 'Runtime.evaluate',
      params: {
        expression: expr,
        returnByValue: true
      }
    };
    ws.send(JSON.stringify(msg));
  });

  ws.addEventListener('message', (event) => {
    const res = JSON.parse(event.data);
    if (res.id === 1) {
      console.log('HIT TEST RESULT:\n' + JSON.stringify(res.result.result.value, null, 2));
      ws.close();
      process.exit(0);
    }
  });
}

main().catch(console.error);
