import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

/* ------------------------------------------------------------------
 * Splash / loading screen (markup lives in index.html so it paints
 * before any JS or CSS bundle). It is dismissed once React has painted
 * AND the page has loaded — but never later than MAX_WAIT, so the site
 * can never get stuck behind the loader.
 * ------------------------------------------------------------------ */
const splash = document.getElementById('splash');

function hideSplash() {
  if (!splash || splash.dataset.done) return;
  splash.dataset.done = '1';
  splash.classList.add('hide');
  splash.addEventListener('transitionend', () => splash.remove(), { once: true });
  setTimeout(() => splash.remove(), 900);
}

const painted = new Promise((resolve) => {
  requestAnimationFrame(() => requestAnimationFrame(resolve));
});

const minVisible = new Promise((resolve) => setTimeout(resolve, 600));

const MAX_WAIT = 2500;
const capped = new Promise((resolve) => {
  const win = document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise((r) => window.addEventListener('load', r, { once: true }));
  const fonts = document.fonts?.ready || Promise.resolve();
  Promise.race([
    Promise.all([win, fonts]),
    new Promise((r) => setTimeout(r, MAX_WAIT)),
  ]).then(resolve);
});

Promise.all([painted, minVisible, capped]).then(hideSplash);
setTimeout(hideSplash, MAX_WAIT + 600); // hard safety net
