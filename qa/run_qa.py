#!/usr/bin/env python3
"""Protein Tadka SPA QA — static server with SPA fallback + Chrome headless screenshots."""
import http.server, socketserver, threading, os, sys, functools, json, subprocess, time, shutil

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'app', 'dist'))
OUT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'qa'))
PORT = 4180

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)
    def do_GET(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path) or os.path.isdir(path):
            if not self.path.startswith('/assets/'):
                self.path = '/index.html'
        return super().do_GET()
    def log_message(self, *a):
        pass

os.makedirs(OUT, exist_ok=True)

httpd = socketserver.TCPServer(('127.0.0.1', PORT), SPAHandler)
httpd.allow_reuse_address = True
t = threading.Thread(target=httpd.serve_forever, daemon=True)
t.start()
time.sleep(0.6)
print(f'server up on {PORT}, root={ROOT}')

CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
if not os.path.exists(CHROME):
    CHROME = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

ROUTES = ['', 'menu', 'order', 'meal-plans', 'nutrition', 'about', 'delivery', 'contact', 'faq', 'nope']
VIEWPORTS = [(390, 844, 'mobile'), (768, 1024, 'tablet'), (1024, 900, 'laptop'), (1440, 950, 'desktop')]

prof = os.path.join(OUT, '_chrome_profile')

def shot(route, w, h, name, extra=None):
    url = f'http://127.0.0.1:{PORT}/{route}'
    out = os.path.join(OUT, f'{name}.png')
    cmd = [CHROME, '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
           f'--user-data-dir={prof}', f'--window-size={w},{h}',
           '--virtual-time-budget=5000', '--force-device-scale-factor=1',
           f'--screenshot={out}', url]
    if extra:
        cmd = cmd[:-1] + extra + [url]
    try:
        subprocess.run(cmd, capture_output=True, timeout=90)
        ok = os.path.exists(out) and os.path.getsize(out) > 1000
        print(f'  {"OK " if ok else "FAIL"} {name}.png  ({os.path.getsize(out) if os.path.exists(out) else 0} bytes)')
        return ok
    except Exception as e:
        print(f'  ERR {name}: {e}')
        return False

print('\n-- Route sweep (desktop) --')
for r in ROUTES:
    shot(r, 1440, 950, f'route-{r or "home"}')

print('\n-- Breakpoint sweep (home) --')
for (w, h, nm) in VIEWPORTS:
    shot('', w, h, f'bp-home-{nm}')

print('\n-- Breakpoint sweep (menu) --')
for (w, h, nm) in VIEWPORTS:
    shot('menu', w, h, f'bp-menu-{nm}')

print('\n-- Breakpoint sweep (order) --')
for (w, h, nm) in VIEWPORTS:
    shot('order', w, h, f'bp-order-{nm}')

print('\n-- Mobile inner pages --')
for r in ['meal-plans', 'nutrition', 'about', 'delivery', 'contact', 'faq']:
    shot(r, 390, 844, f'm-{r}')

httpd.shutdown()
print('\nDONE')
