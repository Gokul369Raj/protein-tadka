/* ============================================================
   PROTEIN TADKA — shared app behaviour
   ============================================================ */

/* ---------- Menu data (single source of truth) ---------- */
const PT_MENU = [
  /* ---- Protein Chicken Bowls ---- */
  { id:'og-power-bowl', name:'The OG Power Bowl', cat:'bowls', kind:'chicken', tag:'Best Seller', protein:45, kcal:550, price:269, img:'bowl-og.webp',
    desc:'Grilled chicken breast, basmati rice, broccoli, bell peppers, sweet corn, carrots, pickled onions, signature sauce & fresh herbs.' },
  { id:'cali-fire-bowl', name:'Cali Fire Bowl', cat:'bowls', kind:'chicken', tag:'Hot', protein:45, kcal:570, price:279, img:'bowl-cali.webp',
    desc:'Peri-peri grilled chicken, cilantro lime rice, black beans, sweet corn, pico de gallo, lettuce, jalapeños & smoky chipotle yogurt.' },
  { id:'smoky-tandoori-bowl', name:'Smoky Tandoori Bowl', cat:'bowls', kind:'chicken', tag:'Flame', protein:45, kcal:540, price:279, img:'bowl-tandoori.webp',
    desc:'Smoky tandoori chicken, jeera rice, broccoli, grilled bell peppers, cucumber, pickled onions & mint yogurt dressing.' },
  { id:'creamy-afghani-bowl', name:'Creamy Afghani Protein Bowl', cat:'bowls', kind:'chicken', tag:'Special', protein:45, kcal:595, price:289, img:'bowl-afghani.webp',
    desc:'Creamy Afghani-marinated chicken, garlic herb rice, grilled vegetables, caramelised onions & mint yogurt sauce.' },
  { id:'seoul-bbq-bowl', name:'Seoul BBQ Bowl', cat:'bowls', kind:'chicken', tag:'Korean', protein:45, kcal:565, price:289, img:'bowl-seoul.webp',
    desc:'Korean-style BBQ chicken, sesame rice, kimchi, cucumber, edamame, carrots, sesame seeds & gochujang mayo.' },

  /* ---- Tadka Mac Series ---- */
  { id:'tandoori-fuel-mac', name:'Tandoori Fuel Mac', cat:'mac', kind:'chicken', tag:'Clean Fuel', protein:50, kcal:550, price:299, img:'mac-tandoori.webp',
    desc:'Tandoori chicken mac, no cheese, all protein. Clean, wholesome fuel with zero heavy cream.' },
  { id:'tikka-tadka-mac', name:'Tikka Tadka Cheese Mac', cat:'mac', kind:'chicken', tag:'Classic', protein:52, kcal:600, price:329, img:'mac-tikka.webp',
    desc:'Chicken tikka in a creamy cheese sauce. Classic, bold, packed with 52g protein and no heavy cream.' },
  { id:'peri-peri-mac', name:'Peri Peri Punch Mac', cat:'mac', kind:'chicken', tag:'Fiery', protein:52, kcal:590, price:329, img:'mac-peri.webp',
    desc:'Peri-peri chicken with a spicy cheesy kick. Fiery, creamy & delicious with 52g protein.' },
  { id:'makhani-melt-mac', name:'Makhani Melt Mac', cat:'mac', kind:'chicken', tag:'Premium Pick', protein:52, kcal:610, price:339, img:'mac-makhani.webp',
    desc:'Makhani sauce, melted cheese & juicy chicken. Rich, authentic taste without the guilt.' },
  { id:'mexican-masala-mac', name:'Mexican Masala Mac', cat:'mac', kind:'chicken', tag:'Fusion', protein:51, kcal:620, price:339, img:'mac-mexican.webp',
    desc:'Mexican spices, sweet corn, bell peppers & cheesy goodness loaded with 150g tender chicken.' },

  /* ---- Lean Chicken Salads ---- */
  { id:'farmer-salad', name:'The Farmer Salad', cat:'salads', kind:'chicken', tag:'Fresh & Lean', protein:45, kcal:490, price:199, img:'salad-farmer.webp',
    desc:'Mixed greens, grilled chicken breast, cucumber, cherry tomatoes, bell peppers, sweet corn, olives, onions & lemon olive oil dressing.' },
  { id:'hulk-salad', name:'The Hulk Salad', cat:'salads', kind:'chicken', tag:'Super High Protein', protein:45, kcal:510, price:209, img:'salad-hulk.webp',
    desc:'Mixed greens, creamy grilled chicken, broccoli, capsicum, cucumber, edamame & mint yogurt dressing.' },
  { id:'chicken-crunch-salad', name:'Chicken Crunch Salad', cat:'salads', kind:'chicken', tag:'Crunch', protein:45, kcal:515, price:209, img:'salad-crunch.webp',
    desc:'Mixed greens, peri-peri grilled chicken, sweet corn, bell peppers, cherry tomatoes, cucumber, crunchy seeds & vinaigrette.' },
  { id:'herbed-chicken-salad', name:'Herbed Grilled Chicken Salad', cat:'salads', kind:'chicken', tag:'Herbed', protein:45, kcal:490, price:209, img:'salad-herbed.webp',
    desc:'Mixed greens, herbed grilled chicken, carrot, grilled bell peppers, cucumber, onions & herb mayo dressing.' },

  /* ---- Tofu Bowls (Pure Veg) ---- */
  { id:'tofu-masala-bowl', name:'Tofu Masala Bowl', cat:'tofu', kind:'veg', tag:'New', protein:32, kcal:560, price:289, img:'tofu-masala.webp',
    desc:'Masala tofu, basmati rice, sautéed veggies, house masala & desi tadka sauce.' },
  { id:'punjabi-tadka-bowl', name:'Punjabi Tadka Bowl', cat:'tofu', kind:'veg', tag:'Bestseller', protein:33, kcal:575, price:289, img:'tofu-punjabi.webp',
    desc:'Tadka tofu, basmati rice, sautéed veggies, punjabi masala & in-house sauce.' },
  { id:'achari-tofu-bowl', name:'Achari Tofu Bowl', cat:'tofu', kind:'veg', tag:'Popular', protein:31, kcal:550, price:289, img:'tofu-achari.webp',
    desc:'Achari spiced tofu, basmati rice, sautéed veggies & achari masala.' },
  { id:'desi-tandoori-bowl', name:'Desi Tandoori Bowl', cat:'tofu', kind:'veg', tag:'Smoky', protein:33, kcal:545, price:289, img:'tofu-tandoori.webp',
    desc:'Tandoori tofu, basmati rice, sautéed veggies, mint chutney & in-house sauce.' },
  { id:'butter-gravy-tofu-bowl', name:'Butter Gravy Tofu Bowl', cat:'tofu', kind:'veg', tag:'Creamy', protein:30, kcal:580, price:299, img:'tofu-butter.webp',
    desc:'Creamy butter gravy tofu, basmati rice, sautéed veggies & butter gravy.' },

  /* ---- Tofu Salads (Pure Veg) ---- */
  { id:'garden-tofu-salad', name:'Fresh Garden Tofu Salad', cat:'tofu-salads', kind:'veg', tag:'Lean & Fresh', protein:30, kcal:320, price:229, img:'tsalad-garden.webp',
    desc:'Tofu, mixed greens, cucumber, tomato, sweet corn & lemon vinaigrette.' },
  { id:'herby-green-tofu-salad', name:'Herby Green Tofu Salad', cat:'tofu-salads', kind:'veg', tag:"Chef's Pick", protein:32, kcal:340, price:239, img:'tsalad-herby.webp',
    desc:'Herb-marinated tofu, mixed greens, bell peppers, broccoli & herb dressing.' },
  { id:'tofu-tikka-crunch-salad', name:'Tofu Tikka Crunch Salad', cat:'tofu-salads', kind:'veg', tag:'High Fiber', protein:31, kcal:350, price:239, img:'tsalad-tikka.webp',
    desc:'Tikka tofu, mixed greens, onions, capsicum, roasted seeds & mint dressing.' },
  { id:'tandoori-tofu-salad', name:'Tandoori Tofu Salad', cat:'tofu-salads', kind:'veg', tag:'Fitness Favourite', protein:33, kcal:345, price:239, img:'tsalad-tandoori.webp',
    desc:'Tandoori tofu, crisp greens, grilled onions, capsicum & mint yogurt dressing.' },
  { id:'pepper-garlic-tofu-salad', name:'Pepper Garlic Tofu Salad', cat:'tofu-salads', kind:'veg', tag:'Low Calorie', protein:30, kcal:330, price:229, img:'tsalad-pepper.webp',
    desc:'Pepper garlic tofu, mixed greens, broccoli, zucchini, cherry tomato & balsamic dressing.' }
];

/* ---------- Category meta ---------- */
const PT_CATS = {
  bowls:      { label:'Protein Chicken Bowls', short:'Chicken Bowls', blurb:'100% boneless chicken breast, 150g & 200g portions.' },
  mac:        { label:'The Tadka Mac Series',  short:'Mac Series',    blurb:'High-protein comfort food. No heavy cream.' },
  salads:     { label:'Lean Chicken Salads',   short:'Chicken Salads',blurb:'Fresh greens, in-house dressing, no seed oils.' },
  tofu:       { label:'Protein Tofu Bowls',    short:'Tofu Bowls',    blurb:'200g fresh tofu in every bowl. 100% pure veg.' },
  'tofu-salads':{ label:'Protein Tofu Salads', short:'Tofu Salads',   blurb:'Golden grilled marinated tofu over crisp greens.' }
};

/* ---------- Helpers ---------- */
const money = n => '₹' + n.toLocaleString('en-IN');
const $  = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];

/* ---------- SVG icon set ---------- */
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
  minus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  scale:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M7 6v14"/><path d="M17 6v14"/><path d="M5 3h14"/><path d="M12 3v3"/></svg>',
  droplet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
  award:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
  fire:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 .5-2S6 12 6 15a6 6 0 0 0 12 0c0-4-6-13-6-13Z"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  wallet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>'
};

/* ---------- Cart ---------- */
const CART_KEY = 'pt_cart_v1';
const Cart = {
  read(){ try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch(e){ return []; } },
  write(items){ localStorage.setItem(CART_KEY, JSON.stringify(items)); Cart.render(); },
  add(id, qty=1){
    const item = PT_MENU.find(m => m.id === id);
    if(!item) return;
    const items = Cart.read();
    const found = items.find(i => i.id === id);
    if(found) found.qty += qty; else items.push({ id, qty });
    Cart.write(items);
    Toast.show(`${item.name} added to cart`);
  },
  setQty(id, qty){
    let items = Cart.read();
    if(qty <= 0) items = items.filter(i => i.id !== id);
    else { const f = items.find(i=>i.id===id); if(f) f.qty = qty; }
    Cart.write(items);
  },
  count(){ return Cart.read().reduce((n,i)=>n+i.qty,0); },
  subtotal(){ return Cart.read().reduce((s,i)=>{ const m = PT_MENU.find(x=>x.id===i.id); return s + (m ? m.price*i.qty : 0); }, 0); },
  render(){
    const n = Cart.count();
    $$('.cart-count').forEach(el => { el.textContent = n; el.hidden = n === 0; });
    const body = $('#cartBody'); if(!body) return;
    const items = Cart.read();
    if(!items.length){
      body.innerHTML = `<div class="cart-empty"><div class="ic">${ICONS.cart}</div><p><strong>Your cart is empty</strong></p><p style="font-size:.9rem">Add a protein-packed meal to get started.</p></div>`;
    } else {
      body.innerHTML = items.map(i => {
        const m = PT_MENU.find(x=>x.id===i.id); if(!m) return '';
        return `<div class="cart-line">
          <img src="assets/img/${m.img}" alt="${m.name}" onerror="this.style.display='none'">
          <div class="cl-info">
            <b>${m.name}</b>
            <small>${m.protein}g protein · ${m.kcal} kcal</small>
            <div class="qty">
              <button aria-label="Decrease quantity" data-dec="${m.id}">−</button>
              <span>${i.qty}</span>
              <button aria-label="Increase quantity" data-inc="${m.id}">+</button>
            </div>
          </div>
          <div class="cl-price">${money(m.price*i.qty)}</div>
        </div>`;
      }).join('');
    }
    const sub = Cart.subtotal();
    const del = sub > 0 ? (sub >= 599 ? 0 : 39) : 0;
    const subEl = $('#cartSubtotal'), delEl = $('#cartDelivery'), totEl = $('#cartTotal');
    if(subEl) subEl.textContent = money(sub);
    if(delEl) delEl.innerHTML = del === 0 ? '<span style="color:var(--green-600);font-weight:700">FREE</span>' : money(del);
    if(totEl) totEl.textContent = money(sub + del);
    const co = $('#checkoutBtn');
    if(co) co.style.display = items.length ? '' : 'none';
  }
};

/* ---------- Toast ---------- */
const Toast = {
  t: null,
  show(msg){
    let el = $('#toast');
    if(!el){ el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; el.setAttribute('role','status'); document.body.appendChild(el); }
    el.innerHTML = ICONS.check + '<span>' + msg + '</span>';
    el.classList.add('show');
    clearTimeout(Toast.t);
    Toast.t = setTimeout(()=> el.classList.remove('show'), 2400);
  }
};

/* ---------- Menu card renderer ---------- */
function menuCard(m){
  const kindTag = m.kind === 'veg' ? 'Pure Veg' : 'Boneless Chicken';
  return `<article class="card reveal" data-cat="${m.cat}" data-kind="${m.kind}">
    <div class="card-media">
      <img src="assets/img/${m.img}" alt="${m.name}" loading="lazy" onerror="this.src='assets/img/hero-bowl.webp'">
      <span class="card-tag ${m.kind}">${m.tag}</span>
      <span class="card-protein">${m.protein}g Protein</span>
    </div>
    <div class="card-body">
      <h3>${m.name}</h3>
      <p class="card-desc">${m.desc}</p>
      <div class="card-meta">
        <span class="meta-item">${ICONS.bolt}${m.kcal} kcal</span>
        <span class="meta-item">${m.kind==='veg'?ICONS.leaf:ICONS.flame}${kindTag}</span>
      </div>
      <div class="card-foot">
        <span class="price">${money(m.price)}</span>
        <button class="btn btn-dark btn-sm" data-add="${m.id}">${ICONS.plus} Add</button>
      </div>
    </div>
  </article>`;
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  /* header scroll */
  const head = $('.site-head');
  if(head) window.addEventListener('scroll', () => head.classList.toggle('scrolled', window.scrollY > 12), { passive:true });

  /* mobile menu */
  const mm = $('#mobileMenu');
  $('#burger')?.addEventListener('click', () => mm?.classList.add('open'));
  $('#mmClose')?.addEventListener('click', () => mm?.classList.remove('open'));
  $$('#mobileMenu a').forEach(a => a.addEventListener('click', () => mm?.classList.remove('open')));

  /* cart drawer */
  const drawer = $('#cartDrawer'), ov = $('#overlay');
  const openCart = () => { drawer?.classList.add('open'); ov?.classList.add('open'); document.body.style.overflow='hidden'; };
  const closeCart = () => { drawer?.classList.remove('open'); ov?.classList.remove('open'); document.body.style.overflow=''; };
  $$('[data-cart-open]').forEach(b => b.addEventListener('click', openCart));
  $('#cartClose')?.addEventListener('click', closeCart);
  ov?.addEventListener('click', closeCart);
  document.addEventListener('keydown', e => { if(e.key === 'Escape'){ closeCart(); mm?.classList.remove('open'); } });

  /* add to cart (delegated) */
  document.addEventListener('click', e => {
    const add = e.target.closest('[data-add]');
    if(add){ Cart.add(add.dataset.add); openCart(); return; }
    const inc = e.target.closest('[data-inc]');
    if(inc){ const it = Cart.read().find(i=>i.id===inc.dataset.inc); Cart.setQty(inc.dataset.inc, (it?it.qty:0)+1); return; }
    const dec = e.target.closest('[data-dec]');
    if(dec){ const it = Cart.read().find(i=>i.id===dec.dataset.dec); Cart.setQty(dec.dataset.dec, (it?it.qty:0)-1); return; }
  });

  /* checkout */
  $('#checkoutBtn')?.addEventListener('click', async () => {
    const items = Cart.read();
    if(!items.length) return;
    const lines = items.map(i => { const m = PT_MENU.find(x=>x.id===i.id); return `• ${i.qty} × ${m.name} — ${money(m.price*i.qty)}`; }).join('\n');
    const sub = Cart.subtotal();
    const total = sub + (sub >= 599 ? 0 : 39);
    const msg = `Hi Protein Tadka! I'd like to place an order:\n\n${lines}\n\nSubtotal: ${money(sub)}\nDelivery: ${sub>=599?'FREE':'₹39'}\nTotal: ${money(total)}\n\nName:\nAddress:\nPhone:`;
    window.open('https://wa.me/919876543210?text=' + encodeURIComponent(msg), '_blank');
    Toast.show('Opening WhatsApp to confirm your order…');
  });

  Cart.render();

  /* reveal on scroll — progressive enhancement with fail-safe */
  const revealEls = $$('.reveal');
  const showAll = () => revealEls.forEach(el => el.classList.add('in'));
  try {
    if ('IntersectionObserver' in window) {
      document.documentElement.classList.add('js-anim');
      const io = new IntersectionObserver((es) => {
        es.forEach(en => { if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { threshold:.08, rootMargin:'0px 0px -30px 0px' });
      revealEls.forEach(el => io.observe(el));
      /* Safety net: if anything is still hidden after 3s (e.g. observer
         skipped during a fast scroll or in an unusual viewport), reveal it. */
      setTimeout(showAll, 3000);
      /* Also reveal immediately on any navigation/resize/print */
      window.addEventListener('beforeprint', showAll, { once:true });
    } else {
      showAll();
    }
  } catch(e) { showAll(); }
  /* stagger */
  $$('.stagger').forEach((g) => $$('.reveal', g).forEach((el,j) => el.style.transitionDelay = (j*70)+'ms'));

  /* menu filters */
  $$('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
    $$('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    $$('[data-cat]').forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
  }));

  /* animated counters (fail-safe: final value shown if observer never fires) */
  const animate = el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur = 1400; const start = performance.now();
    const step = now => {
      const p = Math.min((now - start) / dur, 1);
      const val = target * (1 - Math.pow(1 - p, 3));
      el.textContent = (target % 1 ? val.toFixed(1) : Math.round(val)) + suffix;
      if(p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const finish = el => { const t = parseFloat(el.dataset.count); el.textContent = (t % 1 ? t.toFixed(1) : t) + (el.dataset.suffix || ''); };
  const counters = $$('[data-count]');
  try {
    const cio = new IntersectionObserver(es => es.forEach(en => {
      if(en.isIntersecting){ animate(en.target); cio.unobserve(en.target); }
    }), { threshold:.4 });
    counters.forEach(el => cio.observe(el));
    setTimeout(() => counters.forEach(el => { if(el.textContent.startsWith('0')) finish(el); }), 3200);
  } catch(e) { counters.forEach(finish); }
});
