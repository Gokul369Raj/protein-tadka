#!/usr/bin/env node
/**
 * Protein Tadka — functional test for the new video components.
 * Verifies: making video plays, review clips play, review quote expands,
 * videos are muted-by-default with playsInline, and posters load.
 */
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '..');
const DIST = path.join(BASE, 'app', 'dist');
const PORT = 4188;
const CDP_PORT = 9338;
const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
].find((p) => fs.existsSync(p)) || 'google-chrome';

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
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream', 'Accept-Ranges': 'bytes' });
    res.end(buf);
  } catch { res.writeHead(404); res.end('nf'); }
});
server.listen(PORT, '127.0.0.1');

const prof = path.join(BASE, 'qa', '_vid_profile');
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
  '--autoplay-policy=no-user-gesture-required',
  `--remote-debugging-port=${CDP_PORT}`, `--user-data-dir=${prof}`, 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const getJSON = (url) => new Promise((resolve, reject) => {
  http.get(url, (r) => { let d = ''; r.on('data', (c) => (d += c)); r.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { reject(e); } }); }).on('error', reject);
});

let pass = 0, fail = 0;
const results = [];
function check(name, ok, extra = '') { (ok ? pass++ : fail++); results.push(`  ${ok ? 'PASS' : 'FAIL'}  ${name}${extra ? '  — ' + extra : ''}`); }

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
  const consoleMsgs = [];
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
    if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type)) {
      consoleMsgs.push((m.params.args || []).map((a) => a.value || a.description || '').join(' '));
    }
  };
  const send = (method, params = {}) => new Promise((resolve) => {
    const myId = ++id; pending.set(myId, resolve);
    ws.send(JSON.stringify({ id: myId, method, params }));
  });
  const evalJS = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return r.result?.result?.value;
  };

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/` });
  await sleep(2500);

  // ---- MAKING VIDEO ----
  const makingExists = await evalJS(`!!document.querySelector('#making .vplayer')`);
  check('making section video player rendered', makingExists === true);

  const makingPoster = await evalJS(`(() => {
    const img = document.querySelector('#making .vplayer img');
    if (!img) return 'no-img';
    return img.getAttribute('src') || img.currentSrc || '';
  })()`);
  check('making video has poster image', typeof makingPoster === 'string' && makingPoster.includes('poster-making'), makingPoster);

  const posterLoaded = await evalJS(`(async () => {
    const img = document.querySelector('#making .vplayer img');
    if (!img) return false;
    if (img.complete && img.naturalWidth > 0) return true;
    await new Promise((r) => { img.onload = r; img.onerror = r; setTimeout(r, 3000); });
    return img.naturalWidth > 0;
  })()`);
  check('making poster image actually loads', posterLoaded === true);

  // click play
  await evalJS(`document.querySelector('#making .vplayer').scrollIntoView({block:'center'})`);
  await sleep(600);
  const clicked = await evalJS(`(() => {
    const b = document.querySelector('#making .vplayer-cover');
    if (!b) return 'no-btn';
    b.click();
    return 'clicked';
  })()`);
  check('making play button clickable', clicked === 'clicked');

  await sleep(1800);
  const makingVideoState = await evalJS(`(() => {
    const v = document.querySelector('#making .vplayer video');
    if (!v) return 'no-video';
    return JSON.stringify({ paused: v.paused, muted: v.muted, inline: v.playsInline,
      dur: isFinite(v.duration) ? Math.round(v.duration * 10) / 10 : null,
      t: Math.round(v.currentTime * 10) / 10, ready: v.readyState });
  })()`);
  check('making video element exists after play', typeof makingVideoState === 'string' && !makingVideoState.includes('no-video'), makingVideoState);
  let mv = {};
  try { mv = JSON.parse(makingVideoState); } catch {}
  check('making video is muted (browser-safe)', mv.muted === true);
  check('making video has playsInline', mv.inline === true);
  check('making video metadata loaded', typeof mv.dur === 'number' && mv.dur > 0, `duration=${mv.dur}s`);
  check('making video actually playing', mv.paused === false, `t=${mv.t}s`);

  // ---- REVIEW VIDEOS ----
  const reviewCount = await evalJS(`document.querySelectorAll('#reviews .rcard').length`);
  check('three review cards rendered', reviewCount === 3, `count=${reviewCount}`);

  const reviewBadges = await evalJS(`JSON.stringify([...document.querySelectorAll('#reviews .rcard .vplayer-badge')].map(b=>b.textContent.trim()))`);
  check('review cards show their badge labels', /\w/.test(reviewBadges || ''), reviewBadges);

  const reviewPosters = await evalJS(`JSON.stringify([...document.querySelectorAll('#reviews .rcard img')].map(i=>i.getAttribute('src')||''))`);
  check('all three review posters wired', (reviewPosters.match(/poster-/g) || []).length === 3, reviewPosters);

  // expand a review quote
  const expandBtn = await evalJS(`(() => {
    const cards = [...document.querySelectorAll('#reviews .rcard')];
    for (const c of cards) {
      const b = c.querySelector('.rcard-more');
      if (b) { b.scrollIntoView({block:'center'}); b.click(); return 'clicked'; }
    }
    return 'no-btn';
  })()`);
  check('review card has a "read full review" toggle', expandBtn === 'clicked');

  await sleep(500);
  const expanded = await evalJS(`(() => {
    const b = document.querySelector('#reviews .rcard .rcard-more');
    return b && b.getAttribute('aria-expanded') === 'true';
  })()`);
  check('clicking the toggle expands the review quote', expanded === true);

  // play a review clip
  await evalJS(`document.querySelectorAll('#reviews .rcard')[0].scrollIntoView({block:'center'})`);
  await sleep(500);
  await evalJS(`document.querySelectorAll('#reviews .rcard')[0].querySelector('.vplayer-cover').click()`);
  await sleep(1800);
  const reviewPlayState = await evalJS(`(() => {
    const v = document.querySelectorAll('#reviews .rcard')[0].querySelector('video');
    if (!v) return 'no-video';
    return JSON.stringify({ paused: v.paused, muted: v.muted, dur: isFinite(v.duration)?Math.round(v.duration*10)/10:null, t: Math.round(v.currentTime*10)/10 });
  })()`);
  check('review clip plays on tap', typeof reviewPlayState === 'string' && !reviewPlayState.includes('no-video'), reviewPlayState);
  let rv = {};
  try { rv = JSON.parse(reviewPlayState); } catch {}
  check('review clip is muted by default', rv.muted === true);
  check('review clip is actually playing', rv.paused === false, `t=${rv.t}s`);

  // ---- no console noise ----
  check('no console errors/warnings on home page', consoleMsgs.length === 0, consoleMsgs.slice(0, 3).join(' | '));

  console.log(results.join('\n'));
  console.log(`\n===== ${pass} passed, ${fail} failed =====`);
  chrome.kill();
  server.close();
  process.exit(fail ? 1 : 0);
}
main().catch((e) => { console.error(e); process.exit(1); });
