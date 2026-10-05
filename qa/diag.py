#!/usr/bin/env python3
"""Focused diagnostic: are the <=860px media queries applying? And true small-viewport test."""
import http.server, socketserver, threading, os, time, subprocess, re, json, shutil

BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DIST = os.path.join(BASE, 'app', 'dist')
QA_DIST = os.path.join(BASE, 'qa', '_diag_' + str(int(time.time())))
PORT = 4182
shutil.copytree(DIST, QA_DIST)

PROBE = """
<script>
function probe(){
  function cs(sel, prop){ var e=document.querySelector(sel); return e?getComputedStyle(e)[prop]:'MISSING'; }
  var res = {
    vw: document.documentElement.clientWidth,
    mq860: matchMedia('(max-width: 860px)').matches,
    mq640: matchMedia('(max-width: 640px)').matches,
    mq1024: matchMedia('(max-width: 1024px)').matches,
    navDisplay: cs('.nav','display'),
    burgerDisplay: cs('.burger','display'),
    topbarHideDisplay: cs('.topbar-mobile-hide','display'),
    heroStatsCols: cs('.hero-stats','gridTemplateColumns'),
    trustCols: cs('.trust-grid','gridTemplateColumns'),
    plansCols: cs('.plans','gridTemplateColumns'),
    menuToolbar: cs('.menu-toolbar','gridTemplateColumns'),
    displayFontSize: cs('.display','fontSize'),
    docScrollW: document.documentElement.scrollWidth
  };
  var d=document.createElement('div'); d.id='qa-report';
  d.textContent='QAREPORT::'+JSON.stringify(res)+'::END';
  document.body.appendChild(d);
}
if (document.readyState==='complete') setTimeout(probe,700);
else window.addEventListener('load',function(){setTimeout(probe,1000);});
</script>
"""

idx = os.path.join(QA_DIST, 'index.html')
h = open(idx, encoding='utf-8').read().replace('</body>', PROBE + '</body>')
open(idx, 'w', encoding='utf-8').write(h)

class H(http.server.SimpleHTTPRequestHandler):
    def __init__(self,*a,**kw): super().__init__(*a, directory=QA_DIST, **kw)
    def do_GET(self):
        p=self.translate_path(self.path)
        if (not os.path.exists(p) or os.path.isdir(p)) and not self.path.startswith('/assets/'):
            self.path='/index.html'
        return super().do_GET()
    def log_message(self,*a): pass

httpd=socketserver.TCPServer(('127.0.0.1',PORT),H); httpd.allow_reuse_address=True
threading.Thread(target=httpd.serve_forever,daemon=True).start(); time.sleep(0.5)

CHROME=r'C:\Program Files\Google\Chrome\Application\chrome.exe'
prof=os.path.join(BASE,'qa','_diag_profile')

for w,h,nm in [(360,780,'W360'),(390,844,'W390'),(480,900,'W480'),(600,900,'W600'),(820,900,'W820'),(900,900,'W900')]:
    url=f'http://127.0.0.1:{PORT}/menu'
    cmd=[CHROME,'--headless=new','--disable-gpu','--no-sandbox','--hide-scrollbars',
         f'--user-data-dir={prof}',f'--window-size={w},{h}','--virtual-time-budget=6000','--dump-dom',url]
    r=subprocess.run(cmd,capture_output=True,timeout=90,text=True,encoding='utf-8',errors='replace')
    hits=re.findall(r'QAREPORT::(.*?)::END', r.stdout or '')
    if not hits:
        print(f'{nm}: NO REPORT'); continue
    d=json.loads(hits[-1])
    print(f"{nm}: vw={d['vw']} scrollW={d['docScrollW']} ovf={d['docScrollW']-d['vw']} "
          f"mq860={d['mq860']} nav={d['navDisplay']} burger={d['burgerDisplay']} "
          f"topbarHide={d['topbarHideDisplay']} heroStats={d['heroStatsCols']} toolbar={d['menuToolbar']} displayFS={d['displayFontSize']}")

httpd.shutdown(); print('DONE')
