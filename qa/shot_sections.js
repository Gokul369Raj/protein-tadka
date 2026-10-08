#!/usr/bin/env node
/**
 * Protein Tadka — focused section screenshots for visual verification.
 * Captures the home page hero + the new #making and #reviews sections
 * at desktop and mobile widths via CDP Emulation.setDeviceMetricsOverride.
 */
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '..');
const DIST = path.join(BASE, 'app', 'dist');
const OUT = path.join(BASE, 'qa', 'shots');
const PORT = 4187;
const CDP_PORT = 9337;
const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
].find((p) => fs.existsSync(p)) || 'google-chrome';

fs.mkdirSync(OUT, { recursive: true });

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(DIST, p);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    if (!p.startsWith('/assets/')) file = path.join(DIST, 'index.html');
  }
  const ext = path.extname(file);
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
    '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
    '.json': 'application/json', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.mp4': 'video/mp4' };
  try {
    const buf = fs.readFileSync(file);
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    res.end(buf);
  } catch { res.writeHead(404); res.end('nf'); }
});
server.listen(PORT, '127.0.0.1');

const prof = path.join(BASE, 'qa', '_shot_profile');
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
  `--remote-debugging-port=${CDP_PORT}`, `--user-data-dir=${prof}`, 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const getJSON = (url) => new Promise((resolve, reject) => {
  http.get(url, (r) => { let d = ''; r.on('data', (c) => (d += c)); r.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { reject(e); } }); }).on('error', reject);
});

async function main() {
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
    pending.set(myId, resolve);
    ws.send(JSON.stringify({ id: myId, method, params }));
  });

  await send('Page.enable');
  await send('Runtime.enable');

  const VIEWS = [
    { name: 'desktop-1440', w: 1440, h: 960, dpr: 1 },
    { name: 'mobile-390', w: 390, h: 844, dpr: 3 },
    { name: 'mobile-360', w: 360, h: 800, dpr: 3 },
  ];

  for (const v of VIEWS) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: v.w, height: v.h, deviceScaleFactor: v.dpr, mobile: v.w < 700,
    });
    await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/` });
    await sleep(2200);

    for (const sel of ['#making', '#reviews']) {
      const r = await send('Runtime.evaluate', {
        expression: `(() => {
          const el = document.querySelector('${sel}');
          if (!el) return 'missing';
          el.scrollIntoView({ block: 'start' });
          const y = window.scrollY;
          return JSON.stringify({ y, h: el.offsetHeight, w: el.offsetWidth });
        })()`,
        returnByValue: true,
      });
      await sleep(900);
      const val = r.result?.result?.value;
      console.log(`  ${v.name} ${sel} -> ${val}`);
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      const out = path.join(OUT, `${v.name}${sel.replace('#', '-')}.png`);
      fs.writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
      console.log(`    wrote ${path.basename(out)}`);
    }
  }

  chrome.kill();
  server.close();
  process.exit(0);
}
main().catch((e) => { console.error(e); process.exit(1); });
