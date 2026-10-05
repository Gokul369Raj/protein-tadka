#!/usr/bin/env python3
"""Measure horizontal overflow per element using Chrome headless --dump-dom with an injected probe."""
import http.server, socketserver, threading, os, time, subprocess, re, json, shutil

BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DIST = os.path.join(BASE, 'app', 'dist')
OUT = os.path.join(BASE, 'qa')
PORT = 4181

# fresh copy of dist with probe injected (unique dir per run; never delete)
QA_DIST = os.path.join(BASE, 'qa', '_dist_' + str(int(time.time())))
shutil.copytree(DIST, QA_DIST)

PROBE = """
<script>
window.__qa = null;
function probe(){
  var vw = document.documentElement.clientWidth;
  var bad = [];
  var all = document.querySelectorAll('body *');
  for (var i=0;i<all.length;i++){
    var el = all[i];
    var r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    var st = getComputedStyle(el);
    if (st.position === 'fixed') continue;
    if (r.right > vw + 1 || r.left < -1) {
      bad.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : String(el.className||'')).slice(0,70),
        left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width),
        text: (el.textContent||'').trim().slice(0,40)
      });
    }
  }
  var res = {
    vw: vw,
    docScrollW: document.documentElement.scrollWidth,
    bodyScrollW: document.body.scrollWidth,
    overflow: document.documentElement.scrollWidth - vw,
    count: bad.length,
    worst: bad.slice(0, 14)
  };
  var d = document.createElement('div');
  d.id = 'qa-report';
  d.textContent = 'QAREPORT::' + JSON.stringify(res) + '::END';
  document.body.appendChild(d);
}
if (document.readyState === 'complete') setTimeout(probe, 600);
else window.addEventListener('load', function(){ setTimeout(probe, 900); });
</script>
"""

idx = os.path.join(QA_DIST, 'index.html')
html = open(idx, encoding='utf-8').read()
html = html.replace('</body>', PROBE + '</body>')
open(idx, 'w', encoding='utf-8').write(html)

class H(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw): super().__init__(*a, directory=QA_DIST, **kw)
    def do_GET(self):
        p = self.translate_path(self.path)
        if (not os.path.exists(p) or os.path.isdir(p)) and not self.path.startswith('/assets/'):
            self.path = '/index.html'
        return super().do_GET()
    def log_message(self, *a): pass

httpd = socketserver.TCPServer(('127.0.0.1', PORT), H)
httpd.allow_reuse_address = True
threading.Thread(target=httpd.serve_forever, daemon=True).start()
time.sleep(0.5)

CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
if not os.path.exists(CHROME):
    CHROME = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
prof = os.path.join(OUT, '_probe_profile')

def measure(route, w, h):
    url = f'http://127.0.0.1:{PORT}/{route}'
    cmd = [CHROME, '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
           f'--user-data-dir={prof}', f'--window-size={w},{h}',
           '--virtual-time-budget=6000', '--dump-dom', url]
    try:
        r = subprocess.run(cmd, capture_output=True, timeout=90, text=True, encoding='utf-8', errors='replace')
        hits = re.findall(r'QAREPORT::(.*?)::END', r.stdout or '')
        if not hits:
            return {'error': 'no report', 'stdout_len': len(r.stdout or '')}
        return json.loads(hits[-1])
    except Exception as e:
        return {'error': str(e)}

ROUTES = ['', 'menu', 'order', 'meal-plans', 'nutrition', 'about', 'delivery', 'contact', 'faq']
for w, h, nm in [(390, 844, 'MOBILE-390'), (768, 1024, 'TABLET-768'), (1024, 900, 'LAPTOP-1024'), (1440, 950, 'DESKTOP-1440')]:
    print(f'\n===== {nm} =====')
    for r in ROUTES:
        res = measure(r, w, h)
        if 'error' in res:
            print(f'  {r or "home":12s} ERROR {res}')
            continue
        flag = 'OK ' if res.get('overflow', 0) <= 1 else 'OVERFLOW'
        print(f'  {flag} {r or "home":12s} vw={res.get("vw")} scrollW={res.get("docScrollW")} overflow={res.get("overflow")} badEls={res.get("count")}')
        for b in res.get('worst', []):
            print(f'        - <{b["tag"]} class="{b["cls"]}"> L{b["left"]} R{b["right"]} w{b["w"]} :: {b["text"]!r}')

httpd.shutdown()
print('\nDONE')
