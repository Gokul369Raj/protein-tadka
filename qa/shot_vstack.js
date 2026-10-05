#!/usr/bin/env node
/** Screenshot the value-stack band + a mid-page crawl. */
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const BASE = path.resolve(__dirname, '..');
const DIST = path.join(BASE, 'app', 'dist');
const OUT = path.join(BASE, 'qa', 'shots');
const PORT = 4192, CDP_PORT = 9342;
const CHROME = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
fs.mkdirSync(OUT, { recursive: true });
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join(DIST, p);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { if (!p.startsWith('/assets/')) f = path.join(DIST, 'index.html'); }
  const t = { '.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json','.woff2':'font/woff2','.mp4':'video/mp4' };
  try { res.writeHead(200, {'Content-Type': t[path.extname(f)] || 'application/octet-stream'}); res.end(fs.readFileSync(f)); }
  catch { res.writeHead(404); res.end('nf'); }
});
server.listen(PORT, '127.0.0.1');
const chrome = spawn(CHROME, ['--headless=new','--disable-gpu','--no-sandbox','--hide-scrollbars',`--remote-debugging-port=${CDP_PORT}`,`--user-data-dir=${path.join(BASE,'qa','_shot_profile')}`,'about:blank'], { stdio:'ignore' });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const getJSON = (u) => new Promise((res, rej) => http.get(u, r => { let d=''; r.on('data',c=>d+=c); r.on('end',()=>{ try{res(JSON.parse(d));}catch(e){rej(e);} }); }).on('error', rej));
async function main() {
  let ver=null; for(let i=0;i<40;i++){ try{ver=await getJSON(`http://127.0.0.1:${CDP_PORT}/json/version`);break;}catch{await sleep(400);} }
  const tg = await getJSON(`http://127.0.0.1:${CDP_PORT}/json/list`);
  const ws = new WebSocket(tg.find(t=>t.type==='page').webSocketDebuggerUrl);
  await new Promise(r=>(ws.onopen=r));
  let id=0; const pend=new Map();
  ws.onmessage=e=>{const m=JSON.parse(e.data); if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id);}};
  const send=(method,params={})=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method,params}));});
  const evalJS=async(expr)=>{const r=await send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true});return r.result?.result?.value;};
  await send('Page.enable'); await send('Runtime.enable');
  for (const v of [{n:'desktop-1440',w:1440,h:900,dpr:1},{n:'mobile-390',w:390,h:844,dpr:3}]) {
    await send('Emulation.setDeviceMetricsOverride',{width:v.w,height:v.h,deviceScaleFactor:v.dpr,mobile:v.w<700});
    await send('Page.navigate',{url:`http://127.0.0.1:${PORT}/`});
    await sleep(2200);
    const info = await evalJS(`(() => {
      const el = document.querySelector('.vstack');
      if (!el) return 'missing';
      el.scrollIntoView({block:'center'});
      return JSON.stringify({ items: el.querySelectorAll('.vstack-item').length, w: el.offsetWidth, vw: innerWidth });
    })()`);
    console.log(`  ${v.n} vstack -> ${info}`);
    await sleep(900);
    const shot = await send('Page.captureScreenshot',{format:'png'});
    fs.writeFileSync(path.join(OUT,`vstack-${v.n}.png`), Buffer.from(shot.result.data,'base64'));
    console.log(`    wrote vstack-${v.n}.png`);
  }
  chrome.kill(); server.close(); process.exit(0);
}
main().catch(e=>{console.error(e);process.exit(1);});
