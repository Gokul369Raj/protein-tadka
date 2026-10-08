#!/usr/bin/env node
/**
 * Protein Tadka — functional / real-time behaviour test via CDP.
 * Verifies: cart add/remove/qty + totals + localStorage, menu filter/search/sort,
 * FAQ accordion, delivery area checker, contact form validation, SPA routing (no reload).
 */
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '..');
const DIST = path.join(BASE, 'app', 'dist');
const PORT = 4184;
const CDP_PORT = 9334;
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
  const types = { '.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json','.ico':'image/x-icon','.woff2':'font/woff2' };
  try { res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' }); res.end(fs.readFileSync(file)); }
  catch { res.writeHead(404); res.end('nf'); }
});
server.listen(PORT, '127.0.0.1');

const chrome = spawn(CHROME, ['--headless=new','--disable-gpu','--no-sandbox','--hide-scrollbars',
  `--remote-debugging-port=${CDP_PORT}`, `--user-data-dir=${path.join(BASE,'qa','_int_profile')}`,
  '--window-size=1280,900', 'about:blank'], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const getJSON = (url) => new Promise((res, rej) => {
  http.get(url, (r) => { let d=''; r.on('data',c=>d+=c); r.on('end',()=>{ try{res(JSON.parse(d))}catch(e){rej(e)} }); }).on('error', rej);
});

let pass = 0, fail = 0;
const results = [];
function check(name, cond, detail = '') {
  if (cond) { pass++; results.push(`  PASS  ${name}${detail ? '  — ' + detail : ''}`); }
  else { fail++; results.push(`  FAIL  ${name}${detail ? '  — ' + detail : ''}`); }
}

async function main() {
  let ver = null;
  for (let i = 0; i < 40; i++) { try { ver = await getJSON(`http://127.0.0.1:${CDP_PORT}/json/version`); break; } catch { await sleep(400); } }
  if (!ver) { console.log('CDP unavailable'); process.exit(1); }
  const t = (await getJSON(`http://127.0.0.1:${CDP_PORT}/json/list`)).find((x) => x.type === 'page');
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));

  let id = 0; const pending = new Map();
  const logs = [];
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
    if (m.method === 'Runtime.consoleAPICalled' && ['error','warning'].includes(m.params.type)) {
      logs.push(m.params.type + ': ' + (m.params.args || []).map((a) => a.value || a.description || '').join(' '));
    }
    if (m.method === 'Runtime.exceptionThrown') logs.push('EXCEPTION: ' + (m.params.exceptionDetails?.exception?.description || m.params.exceptionDetails?.text));
  };
  const send = (method, params = {}) => new Promise((res) => {
    const myId = ++id; pending.set(myId, (m) => res(m.result || m.error));
    ws.send(JSON.stringify({ id: myId, method, params }));
  });
  const ev = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r && r.exceptionDetails) return { __err: r.exceptionDetails.exception?.description || 'eval error' };
    return r && r.result ? r.result.value : undefined;
  };
  const goto = async (route) => { await send('Page.navigate', { url: `http://127.0.0.1:${PORT}${route}` }); await sleep(1300); };

  await send('Page.enable'); await send('Runtime.enable');

  // ---------- 1. ROUTING (SPA, no reload) ----------
  console.log('\n== 1. SPA ROUTING ==');
  await goto('/');
  await ev(`window.__marker = 'alive';`);
  await ev(`document.querySelector('a[href="/menu"]').click()`);
  await sleep(900);
  check('client-side nav to /menu keeps JS state (no reload)', await ev(`window.__marker === 'alive'`));
  check('URL updated to /menu', (await ev(`location.pathname`)) === '/menu', await ev(`location.pathname`));
  check('menu page rendered', await ev(`/the full menu/i.test(document.body.innerText)`));

  await ev(`document.querySelector('a[href="/meal-plans"]').click()`); await sleep(900);
  check('nav to /meal-plans', (await ev(`location.pathname`)) === '/meal-plans');
  await ev(`document.querySelector('a[href="/"]').click()`); await sleep(900);
  check('nav back to /', (await ev(`location.pathname`)) === '/');

  // ---------- 2. CART ----------
  console.log('\n== 2. CART (real-time) ==');
  await ev(`localStorage.clear()`);
  await goto('/menu');
  const before = await ev(`document.querySelectorAll('.card').length`);
  check('menu renders dish cards', before >= 20, `${before} cards`);

  await ev(`document.querySelectorAll('.card button')[0].click()`); await sleep(500);
  let count = await ev(`document.querySelector('.cart-count')?.textContent`);
  check('add-to-cart updates header badge to 1', count === '1', `badge=${count}`);
  check('cart drawer opened on add', await ev(`document.querySelector('.cart-drawer')?.classList.contains('open')`));
  check('cart line rendered in drawer', (await ev(`document.querySelectorAll('.cart-line').length`)) === 1);

  // qty +
  await ev(`document.querySelectorAll('.cart-line .qty button')[1].click()`); await sleep(400);
  check('qty + makes 2 lines qty', (await ev(`document.querySelector('.cart-line .qty span')?.textContent`)) === '2');
  let subtotal = await ev(`document.querySelectorAll('.cart-row span')[1]?.textContent`);
  check('subtotal recomputed (2x ₹269 = ₹538)', subtotal === '₹538', `subtotal=${subtotal}`);

  // free-delivery nudge below threshold
  check('free-delivery nudge shown below ₹599', await ev(`!!document.querySelector('.cart-foot')?.innerText.match(/more for free delivery/)`));

  // add a second different dish to cross the free-delivery threshold
  await ev(`document.querySelector('.cart-drawer .icon-btn').click()`); await sleep(400);
  await ev(`document.querySelectorAll('.card button')[1].click()`); await sleep(500);
  const totalTxt = await ev(`document.querySelector('.cart-row.total span:last-child')?.textContent`);
  const delTxt = await ev(`[...document.querySelectorAll('.cart-row')].map(r=>r.innerText.replace(/\\s+/g,' ')).join(' | ')`);
  check('free delivery unlocks above ₹599', /FREE/.test(delTxt), delTxt);
  check('total = 538 + 279 = ₹817', totalTxt === '₹817', `total=${totalTxt}`);

  // persistence
  const stored = await ev(`JSON.parse(localStorage.getItem('pt_cart_v2')||'[]').length`);
  check('cart persisted to localStorage', stored === 2, `${stored} items`);
  await send('Page.reload'); await sleep(1400);
  check('cart survives page reload', (await ev(`document.querySelector('.cart-count')?.textContent`)) === '3', 'badge=' + await ev(`document.querySelector('.cart-count')?.textContent`));

  // remove
  await ev(`document.querySelector('.cart-drawer')?.classList.contains('open') || document.querySelector('.head-actions .icon-btn').click()`);
  await sleep(500);
  await ev(`document.querySelectorAll('.cart-line .qty button')[0].click()`); await sleep(300);
  await ev(`document.querySelectorAll('.cart-line .qty button')[0].click()`); await sleep(300);
  check('qty 2→0 removes the line', (await ev(`document.querySelectorAll('.cart-line').length`)) === 1, `${await ev(`document.querySelectorAll('.cart-line').length`)} lines`);

  await ev(`localStorage.clear()`); await send('Page.reload'); await sleep(1200);

  // ---------- 3. MENU FILTERS / SEARCH / SORT ----------
  console.log('\n== 3. MENU FILTER / SEARCH / SORT ==');
  await goto('/menu');
  const allCards = await ev(`document.querySelectorAll('.card').length`);
  await ev(`[...document.querySelectorAll('.filter-btn')].find(b=>b.textContent.includes('Tadka Mac')).click()`); await sleep(500);
  const macCards = await ev(`document.querySelectorAll('.card').length`);
  check('category filter narrows to 5 mac dishes', macCards === 5, `${allCards} -> ${macCards}`);
  check('result count text updates', /Showing\s*5/.test(await ev(`document.querySelector('.result-count')?.innerText`)), await ev(`document.querySelector('.result-count')?.innerText`));

  await ev(`document.querySelector('.link-btn')?.click()`); await sleep(400);
  check('clear filters restores all dishes', (await ev(`document.querySelectorAll('.card').length`)) === allCards);

  await ev(`[...document.querySelectorAll('.kind-btn')].find(b=>b.textContent.includes('Pure Veg')).click()`); await sleep(500);
  const vegCards = await ev(`document.querySelectorAll('.card').length`);
  check('Pure Veg filter shows 10 dishes', vegCards === 10, `${vegCards} veg cards`);
  await ev(`[...document.querySelectorAll('.kind-btn')].find(b=>b.textContent.trim()==='All').click()`); await sleep(400);

  // search
  await ev(`(()=>{const i=document.querySelector('#menu-search');const s=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;s.call(i,'tofu');i.dispatchEvent(new Event('input',{bubbles:true}));})()`);
  await sleep(600);
  const searchCards = await ev(`document.querySelectorAll('.card').length`);
  check('search "tofu" filters results', searchCards > 0 && searchCards < allCards, `${searchCards} results`);
  await ev(`(()=>{const i=document.querySelector('#menu-search');const s=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;s.call(i,'zzzznope');i.dispatchEvent(new Event('input',{bubbles:true}));})()`);
  await sleep(600);
  check('no-match search shows empty state', await ev(`!!document.querySelector('.empty-state')`));
  await ev(`document.querySelector('.empty-state .btn')?.click()`); await sleep(400);
  check('empty-state clear button resets search', (await ev(`document.querySelectorAll('.card').length`)) === allCards);

  // sort
  await ev(`(()=>{const s=document.querySelector('#menu-sort');const set=Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype,'value').set;set.call(s,'price-asc');s.dispatchEvent(new Event('change',{bubbles:true}));})()`);
  await sleep(600);
  const firstPrice = await ev(`document.querySelector('.card .price')?.textContent`);
  check('sort price low→high puts ₹199 first', firstPrice === '₹199', `first=${firstPrice}`);

  // ---------- 4. FAQ ACCORDION ----------
  console.log('\n== 4. FAQ ACCORDION + SEARCH ==');
  await goto('/faq');
  const faqCount = await ev(`document.querySelectorAll('.faq-item').length`);
  check('FAQ renders all 18 questions', faqCount === 18, `${faqCount} items`);
  const open1 = await ev(`document.querySelectorAll('.faq-item[open]').length`);
  check('exactly one FAQ open by default', open1 === 1, `${open1} open`);
  await ev(`document.querySelectorAll('.faq-item summary')[3].click()`); await sleep(500);
  const nowOpen = await ev(`[...document.querySelectorAll('.faq-item')].findIndex(d=>d.open)`);
  check('clicking a question opens it (accordion)', nowOpen === 3, `openIndex=${nowOpen}`);
  check('only one stays open', (await ev(`document.querySelectorAll('.faq-item[open]').length`)) === 1);

  await ev(`(()=>{const i=document.querySelector('#faq-search-input');const s=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;s.call(i,'tofu');i.dispatchEvent(new Event('input',{bubbles:true}));})()`);
  await sleep(600);
  const filtered = await ev(`document.querySelectorAll('.faq-item').length`);
  check('FAQ search filters questions', filtered > 0 && filtered < 16, `${filtered} matched`);

  // ---------- 5. DELIVERY CHECKER ----------
  console.log('\n== 5. DELIVERY AREA CHECKER ==');
  await goto('/delivery');
  await ev(`(()=>{const i=document.querySelector('#zone-input');const s=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;s.call(i,'GTB Nagar');i.dispatchEvent(new Event('input',{bubbles:true}));})()`);
  await sleep(300);
  await ev(`document.querySelector('.zone-form button').click()`); await sleep(600);
  const okRes = await ev(`document.querySelector('.zone-result')?.className`);
  check('known area returns a positive result', /zone-result ok/.test(okRes || ''), okRes);
  check('positive result names the area', /GTB Nagar/.test(await ev(`document.querySelector('.zone-result')?.innerText`)));

  await ev(`(()=>{const i=document.querySelector('#zone-input');const s=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;s.call(i,'atlantis');i.dispatchEvent(new Event('input',{bubbles:true}));})()`);
  await sleep(300);
  await ev(`document.querySelector('.zone-form button').click()`); await sleep(600);
  check('unknown area returns the fallback result', /zone-result no/.test(await ev(`document.querySelector('.zone-result')?.className`)));

  // ---------- 6. CONTACT FORM ----------
  console.log('\n== 6. CONTACT FORM VALIDATION ==');
  await goto('/contact');
  await ev(`document.querySelector('.contact-card form button[type=submit]').click()`); await sleep(500);
  check('empty submit shows validation error', await ev(`!!document.querySelector('.form-error')`));
  check('no success state on invalid submit', !(await ev(`!!document.querySelector('.form-ok')`)));
  await ev(`(()=>{const set=(sel,v)=>{const i=document.querySelector(sel);const s=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;s.call(i,v);i.dispatchEvent(new Event('input',{bubbles:true}));};set('#c-name','Arjun');set('#c-phone','9876543210');const t=document.querySelector('#c-message');const ts=Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype,'value').set;ts.call(t,'Need a bulk quote');t.dispatchEvent(new Event('input',{bubbles:true}));})()`);
  await sleep(400);
  await ev(`document.querySelector('.contact-card form button[type=submit]').click()`); await sleep(600);
  check('valid submit clears error and shows confirmation', (await ev(`!!document.querySelector('.form-ok')`)) && !(await ev(`!!document.querySelector('.form-error')`)));

  // ---------- 7. 404 ----------
  console.log('\n== 7. 404 ROUTE ==');
  await goto('/definitely-not-a-page');
  check('unknown route renders 404 page', await ev(`/this bowl went missing/i.test(document.body.innerText)`));
  check('404 offers navigation back', (await ev(`document.querySelectorAll('.nf-tile').length`)) === 4);

  // ---------- 8. CONSOLE HEALTH ----------
  console.log('\n== 8. CONSOLE HEALTH ==');
  const errs = logs.filter((l) => !/DevTools|favicon|Download the React DevTools/i.test(l));
  check('no console errors/warnings across the session', errs.length === 0, errs.length ? errs.slice(0, 6).join(' ;; ') : 'clean');

  console.log('\n' + results.join('\n'));
  console.log(`\n===== ${pass} passed, ${fail} failed =====`);
  ws.close(); chrome.kill(); server.close();
  process.exit(fail ? 1 : 0);
}
main().catch((e) => { console.error(e); try { chrome.kill(); } catch {} process.exit(1); });
