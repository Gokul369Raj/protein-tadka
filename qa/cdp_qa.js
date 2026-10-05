#!/usr/bin/env node
/**
 * Protein Tadka — true mobile-width QA via Chrome DevTools Protocol.
 * Uses Node's built-in WebSocket (Node 22+) + Emulation.setDeviceMetricsOverride,
 * so we can test real 320/360/390/414 px viewports that Chrome's --window-size clamps away.
 */
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '..');
const DIST = path.join(BASE, 'app', 'dist');
const OUT = path.join(BASE, 'qa', 'mobile');
const PORT = 4183;
const CDP_PORT = 9333;
const CHROME = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

fs.mkdirSync(OUT, { recursive: true });

// ---- static server with SPA fallback ----
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(DIST, p);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    if (!p.startsWith('/assets/')) file = path.join(DIST, 'index.html');
  }
  const ext = path.extname(file);
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
    '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
    '.json': 'application/json', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
  try {
    const buf = fs.readFileSync(file);
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    res.end(buf);
  } catch { res.writeHead(404); res.end('nf'); }
});
server.listen(PORT, '127.0.0.1');

// ---- chrome ----
const prof = path.join(BASE, 'qa', '_cdp_profile');
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
  `--remote-debugging-port=${CDP_PORT}`, `--user-data-dir=${prof}`, 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const getJSON = (url) => new Promise((resolve, reject) => {
  http.get(url, (r) => { let d = ''; r.on('data', (c) => (d += c)); r.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { reject(e); } }); }).on('error', reject);
});

async function main() {
  // wait for CDP
  let ver = null;
  for (let i = 0; i < 40; i++) {
    try { ver = await getJSON(`http://127.0.0.1:${CDP_PORT}/json/version`); break; } catch { await sleep(400); }
  }
  if (!ver) { console.log('CDP never came up'); process.exit(1); }

  const targets = await getJSON(`http://127.0.0.1:${CDP_PORT}/json/list`);
  const page = targets.find((t) => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));

  let id = 0;
  const pending = new Map();
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  };
  const send = (method, params = {}) => new Promise((resolve) => {
    const myId = ++id;
    pending.set(myId, (m) => resolve(m.result || m.error));
    ws.send(JSON.stringify({ id: myId, method, params }));
  });

  await send('Page.enable');
  await send('Runtime.enable');

  const PROBE = `(() => {
    const vw = document.documentElement.clientWidth;
    const bad = [];
    document.querySelectorAll('body *').forEach(el => {
      const r = el.getBoundingClientRect();
      if (!r.width && !r.height) return;
      const st = getComputedStyle(el);
      if (st.position === 'fixed' || st.visibility === 'hidden' || st.display === 'none') return;
      if (el.closest('.mobile-menu') || el.closest('.cart-drawer')) return;
      if (r.right > vw + 1 || r.left < -1) {
        const c = (el.className && el.className.baseVal !== undefined) ? el.className.baseVal : String(el.className || '');
        bad.push({ tag: el.tagName.toLowerCase(), cls: c.slice(0,60), l: Math.round(r.left), r: Math.round(r.right), w: Math.round(r.width), t: (el.textContent||'').trim().slice(0,34) });
      }
    });
    const cs = (s,p) => { const e = document.querySelector(s); return e ? getComputedStyle(e)[p] : 'MISSING'; };
    return JSON.stringify({
      vw,
      scrollW: document.documentElement.scrollWidth,
      overflow: document.documentElement.scrollWidth - vw,
      bad: bad.slice(0, 30),
      badCount: bad.length,
      navDisplay: cs('.nav','display'),
      burger: cs('.burger','display'),
      topbarHide: cs('.topbar-mobile-hide','display'),
      displayFS: cs('.display','fontSize'),
      h1FS: cs('.hero h1','fontSize'),
      heroStatsCols: cs('.hero-stats','gridTemplateColumns'),
      trustCols: cs('.trust-grid','gridTemplateColumns'),
      plansCols: cs('.plans','gridTemplateColumns'),
      footCols: cs('.foot-grid','gridTemplateColumns'),
      toolbarCols: cs('.menu-toolbar','gridTemplateColumns'),
      orderLayout: cs('.order-layout','gridTemplateColumns'),
      contactLayout: cs('.contact-layout','gridTemplateColumns')
    });
  })()`;

  const ROUTES = ['/', '/menu', '/order', '/meal-plans', '/nutrition', '/about', '/delivery', '/contact', '/faq', '/definitely-not-a-page'];
  const ONLY = process.env.ONLY_VP;
  const ALL_VPS = [
    { w: 320, h: 720, n: '320-se' },
    { w: 360, h: 800, n: '360-android' },
    { w: 390, h: 844, n: '390-iphone' },
    { w: 414, h: 896, n: '414-plus' },
    { w: 768, h: 1024, n: '768-tablet' },
    { w: 1024, h: 900, n: '1024-laptop' },
    { w: 1440, h: 950, n: '1440-desktop' },
  ];
  const VPS = ONLY ? ALL_VPS.filter((v) => v.n === ONLY) : ALL_VPS;

  let fails = 0;
  for (const vp of VPS) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.w, height: vp.h, deviceScaleFactor: 1, mobile: vp.w < 768,
    });
    console.log(`\n===== ${vp.n} (${vp.w}px) =====`);
    for (const route of ROUTES) {
      await send('Page.navigate', { url: `http://127.0.0.1:${PORT}${route}` });
      await sleep(1100);
      const r = await send('Runtime.evaluate', { expression: PROBE, returnByValue: true });
      let d;
      try { d = JSON.parse(r.result.value); } catch { console.log(`  ERR ${route}`); continue; }
      const ok = d.overflow <= 1;
      if (!ok) fails++;
      console.log(`  ${ok ? 'OK ' : 'OVF'} ${route.padEnd(24)} vw=${d.vw} scrollW=${d.scrollW} ovf=${d.overflow} bad=${d.badCount}`);
      if (!ok) d.bad.forEach((b) => console.log(`        - <${b.tag} class="${b.cls}"> L${b.l} R${b.r} w${b.w} :: ${JSON.stringify(b.t)}`));
    }
    // structural snapshot on the home page
    await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/` });
    await sleep(1100);
    const rr = await send('Runtime.evaluate', { expression: PROBE, returnByValue: true });
    const dd = JSON.parse(rr.result.value);
    console.log(`  [layout] nav=${dd.navDisplay} burger=${dd.burger} topbarHide=${dd.topbarHide} h1=${dd.h1FS} heroStats=${dd.heroStatsCols}`);
    console.log(`  [layout] trust=${dd.trustCols} plans=${dd.plansCols} foot=${dd.footCols}`);

    // screenshot home at this viewport
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    if (shot && shot.data) fs.writeFileSync(path.join(OUT, `${vp.n}-home.png`), Buffer.from(shot.data, 'base64'));
  }

  // screenshot a few inner pages at 390
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  for (const [route, nm] of [['/menu','menu'],['/order','order'],['/meal-plans','meal-plans'],['/nutrition','nutrition'],['/about','about'],['/delivery','delivery'],['/contact','contact'],['/faq','faq'],['/definitely-not-a-page','404']]) {
    await send('Page.navigate', { url: `http://127.0.0.1:${PORT}${route}` });
    await sleep(1100);
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    if (shot && shot.data) fs.writeFileSync(path.join(OUT, `390-${nm}.png`), Buffer.from(shot.data, 'base64'));
  }

  console.log(`\nTOTAL OVERFLOW FAILURES: ${fails}`);
  ws.close(); chrome.kill(); server.close();
  process.exit(0);
}

main().catch((e) => { console.error(e); try { chrome.kill(); } catch {} process.exit(1); });
