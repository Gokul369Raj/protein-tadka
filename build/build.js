/* ============================================================
   Protein Tadka — static site generator
   Generates all HTML pages from shared shell + page content.
   ============================================================ */
const fs = require('fs');
const path = require('path');

const SITE = { name:'Protein Tadka', phone:'+91 98765 43210', wa:'919876543210',
  email:'hello@proteintadka.in', addr:'Plot 112, M.N Mansion, Friends Colony, Puppalaguda, Manikonda, Hyderabad 500089',
  insta:'https://www.instagram.com/proteintadkaco', hours:'Mon–Sun · 11:00 AM – 11:30 PM' };

const ICONS = {
  cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
  menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  flame:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
  leaf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
  bolt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
  truck:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  whatsapp:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>',
  instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
  facebook:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.29l13.32 17.41Z"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  scale:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M7 6v14"/><path d="M17 6v14"/><path d="M5 3h14"/><path d="M12 3v3"/></svg>',
  droplet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
  award:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
  fire:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 .5-2S6 12 6 15a6 6 0 0 0 12 0c0-4-6-13-6-13Z"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  wallet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>'
};

const NAV = [
  { href:'index.html', label:'Home' },
  { href:'menu.html', label:'Menu' },
  { href:'meal-plans.html', label:'Meal Plans' },
  { href:'nutrition.html', label:'Nutrition' },
  { href:'about.html', label:'About' },
  { href:'delivery.html', label:'Delivery' },
  { href:'contact.html', label:'Contact' }
];

function head(title, desc, page){
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | Protein Tadka — Built on Protein. Powered by Tadka.</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#06251B">
<link rel="icon" type="image/png" href="assets/img/logo.png">
<link rel="apple-touch-icon" href="assets/img/logo.png">
<meta property="og:title" content="${title} | Protein Tadka">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:image" content="assets/img/hero-bowl.webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
<script>window.PT_PAGE='${page||''}';</script>
</head>
<body>`;
}

function header(page){
  const nav = NAV.map(n => `<a href="${n.href}"${n.href===page?' class="active"':''}>${n.label}</a>`).join('');
  const mnav = NAV.map(n => `<a href="${n.href}">${n.label}<span>→</span></a>`).join('');
  return `
<div class="topbar">
  <div class="wrap">
    <div class="topbar-ticker topbar-scroll">
      <span><i class="dot"></i> Now delivering across Manikonda &amp; Gachibowli</span>
      <span class="topbar-mobile-hide">${ICONS.truck} Free delivery on orders above ₹599</span>
    </div>
    <div class="topbar-ticker topbar-mobile-hide">
      <span>${ICONS.clock} ${SITE.hours}</span>
      <span>${ICONS.phone} <strong>${SITE.phone}</strong></span>
    </div>
  </div>
</div>

<header class="site-head">
  <div class="wrap head-inner">
    <a href="index.html" class="brand" aria-label="Protein Tadka home">
      <img src="assets/img/logo.png" alt="Protein Tadka">
    </a>
    <nav class="nav" aria-label="Main">
      <a href="index.html"${page==='index.html'?' class="active"':''}>Home</a>
      <div class="has-drop">
        <a href="menu.html"${page==='menu.html'?' class="active"':''}>Menu ▾</a>
        <div class="drop">
          <a href="menu.html#bowls">Protein Chicken Bowls <small>150g / 200g · 42–60g protein</small></a>
          <a href="menu.html#mac">The Tadka Mac Series <small>50–52g protein · no heavy cream</small></a>
          <a href="menu.html#salads">Lean Chicken Salads <small>Fresh greens · no seed oils</small></a>
          <a href="menu.html#tofu">Protein Tofu Bowls <small>200g tofu · 100% pure veg</small></a>
          <a href="menu.html#tofu-salads">Tofu Salads <small>Golden grilled marinated tofu</small></a>
        </div>
      </div>
      <a href="meal-plans.html"${page==='meal-plans.html'?' class="active"':''}>Meal Plans</a>
      <a href="nutrition.html"${page==='nutrition.html'?' class="active"':''}>Nutrition</a>
      <div class="has-drop">
        <a href="about.html"${page==='about.html'?' class="active"':''}>About ▾</a>
        <div class="drop">
          <a href="about.html">Our Story <small>Why we started Protein Tadka</small></a>
          <a href="delivery.html">Delivery &amp; Areas <small>Where we deliver</small></a>
          <a href="faq.html">FAQs <small>Everything you asked</small></a>
          <a href="contact.html">Contact Us <small>Talk to the kitchen</small></a>
        </div>
      </div>
    </nav>
    <div class="head-actions">
      <button class="icon-btn" data-cart-open aria-label="Open cart">
        ${ICONS.cart}
        <span class="cart-count" hidden>0</span>
      </button>
      <a href="menu.html" class="btn btn-primary btn-sm btn-desk">Order Now</a>
      <button class="icon-btn burger" id="burger" aria-label="Open menu" aria-expanded="false">${ICONS.menu}</button>
    </div>
  </div>
</header>

<div class="mobile-menu" id="mobileMenu">
  <div class="mm-top">
    <img src="assets/img/logo.png" alt="Protein Tadka">
    <button class="icon-btn" id="mmClose" aria-label="Close menu" style="background:rgba(255,255,255,.1);color:#fff">${ICONS.close}</button>
  </div>
  <nav>${mnav}</nav>
  <div class="mm-foot">
    <a href="tel:${SITE.phone.replace(/\s/g,'')}" class="btn btn-white btn-block">${ICONS.phone} Call ${SITE.phone}</a>
    <a href="https://wa.me/${SITE.wa}" target="_blank" rel="noopener" class="btn btn-primary btn-block">${ICONS.whatsapp} Order on WhatsApp</a>
  </div>
</div>`;
}

function cartDrawer(){
  return `
<div class="overlay" id="overlay"></div>
<aside class="cart-drawer" id="cartDrawer" aria-label="Shopping cart">
  <div class="cart-head">
    <h3>Your Cart</h3>
    <button class="icon-btn" id="cartClose" aria-label="Close cart">${ICONS.close}</button>
  </div>
  <div class="cart-body" id="cartBody"></div>
  <div class="cart-foot">
    <div class="cart-row"><span>Subtotal</span><span id="cartSubtotal">₹0</span></div>
    <div class="cart-row"><span>Delivery</span><span id="cartDelivery">₹0</span></div>
    <div class="cart-row total"><span>Total</span><span id="cartTotal">₹0</span></div>
    <button class="btn btn-primary btn-block" id="checkoutBtn">${ICONS.whatsapp} Checkout on WhatsApp</button>
    <p style="font-size:.78rem;color:var(--ink-soft);text-align:center;margin:12px 0 0">Free delivery above ₹599 · Delivered in 35–50 mins</p>
  </div>
</aside>`;
}

function footer(){
  return `
<footer class="site-foot">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <img src="assets/img/logo.png" alt="Protein Tadka">
        <p>Built on Protein. Powered by Tadka. High-protein chicken bowls, guilt-free tadka mac, crisp lean salads &amp; 200g tofu power bowls — sautéed with authentic desi spices and zero seed oils.</p>
        <div class="foot-social">
          <a href="${SITE.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.instagram}</a>
          <a href="https://wa.me/${SITE.wa}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICONS.whatsapp}</a>
          <a href="#" aria-label="Facebook">${ICONS.facebook}</a>
          <a href="#" aria-label="X">${ICONS.x}</a>
        </div>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>
          <li><a href="menu.html">Full Menu</a></li>
          <li><a href="meal-plans.html">Meal Plans</a></li>
          <li><a href="nutrition.html">Nutrition &amp; Macros</a></li>
          <li><a href="delivery.html">Delivery Areas</a></li>
          <li><a href="about.html">Our Story</a></li>
        </ul>
      </div>
      <div>
        <h4>Our Menu</h4>
        <ul>
          <li><a href="menu.html#bowls">Protein Chicken Bowls</a></li>
          <li><a href="menu.html#mac">Tadka Mac Series</a></li>
          <li><a href="menu.html#salads">Lean Chicken Salads</a></li>
          <li><a href="menu.html#tofu">Tofu Bowls (Veg)</a></li>
          <li><a href="menu.html#tofu-salads">Tofu Salads (Veg)</a></li>
          <li><a href="faq.html">FAQs</a></li>
        </ul>
      </div>
      <div>
        <h4>Get In Touch</h4>
        <ul>
          <li><a href="tel:${SITE.phone.replace(/\s/g,'')}">${ICONS.phone} ${SITE.phone}</a></li>
          <li><a href="mailto:${SITE.email}">${ICONS.mail} ${SITE.email}</a></li>
          <li>${ICONS.pin} ${SITE.addr}</li>
          <li>${ICONS.clock} ${SITE.hours}</li>
        </ul>
        <a href="https://wa.me/${SITE.wa}" target="_blank" rel="noopener" class="btn btn-primary btn-sm" style="margin-top:16px">${ICONS.whatsapp} Order Now</a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© ${new Date().getFullYear()} Protein Tadka Co. All rights reserved.</span>
      <span>Made with real protein &amp; real tadka in Hyderabad, India.</span>
    </div>
  </div>
</footer>
<script src="assets/js/app.js"></script>
</body>
</html>`;
}

function open(page, extra=''){ return head('', '', page) + extra; }

/* ---------- Page shells ---------- */
function buildPage({ file, title, desc, page, body }){
  const html = head(title, desc, page) + header(page) + cartDrawer() + body + footer();
  fs.writeFileSync(path.join('site', file), html);
  console.log('  ✓', file);
}

module.exports = { buildPage, SITE, ICONS, NAV, head, header, footer, cartDrawer };

if (require.main === module) {
  const { buildAll } = require('./pages.js');
  console.log('Building Protein Tadka site…');
  buildAll(buildPage, { SITE, ICONS });
  console.log('Done.');
}
