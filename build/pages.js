/* ============================================================
   Protein Tadka — page content
   ============================================================ */
const MENU = require('./menu-data.js');

const CAT = {
  bowls:{ label:'Protein Chicken Bowls', id:'bowls', img:'cat-mac.webp' },
  mac:{ label:'The Tadka Mac Series', id:'mac', img:'cat-mac.webp' },
  salads:{ label:'Lean Chicken Salads', id:'salads', img:'cat-salad.webp' },
  tofu:{ label:'Protein Tofu Bowls', id:'tofu', img:'cat-tofu.webp' },
  'tofu-salads':{ label:'Protein Tofu Salads', id:'tofu-salads', img:'cat-tofu-salad.webp' }
};
const CAT_ORDER = ['bowls','mac','salads','tofu','tofu-salads'];

const money = n => '₹' + n.toLocaleString('en-IN');

function card(m){
  const kindTag = m.kind === 'veg' ? 'Pure Veg' : 'Boneless Chicken';
  return `<article class="card reveal" data-cat="${m.cat}" data-kind="${m.kind}">
    <div class="card-media">
      <img src="assets/img/${m.img}" alt="${m.name}" loading="lazy">
      <span class="card-tag ${m.kind}">${m.tag}</span>
      <span class="card-protein">${m.protein}g Protein</span>
    </div>
    <div class="card-body">
      <h3>${m.name}</h3>
      <p class="card-desc">${m.desc}</p>
      <div class="card-meta">
        <span class="meta-item">${m.kcal} kcal</span>
        <span class="meta-item">${kindTag}</span>
      </div>
      <div class="card-foot">
        <span class="price">${money(m.price)}</span>
        <button class="btn btn-dark btn-sm" data-add="${m.id}">+ Add</button>
      </div>
    </div>
  </article>`;
}

function pageHero(title, sub, crumb){
  return `<section class="page-hero">
    <div class="wrap">
      <div class="crumb"><a href="index.html">Home</a> ${crumb ? '› <span>'+crumb+'</span>' : ''}</div>
      <h1 class="h2">${title}</h1>
      ${sub ? `<p class="lead center" style="margin-inline:auto">${sub}</p>` : ''}
    </div>
  </section>`;
}

function ctaBand(title, sub, btns){
  return `<section class="section"><div class="wrap"><div class="cta-band reveal">
    <h2 class="h2">${title}</h2>
    <p class="lead" style="color:rgba(255,255,255,.8);max-width:60ch">${sub}</p>
    <div class="actions">${btns}</div>
  </div></div></section>`;
}

/* ============================ HOME ============================ */
function home(){
  const featured = ['og-power-bowl','tikka-tadka-mac','farmer-salad','punjabi-tadka-bowl'];
  const featCards = MENU.filter(m => featured.includes(m.id)).map(card).join('');

  return `
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <div class="hero-badges">
        <span class="pill pill-y">★ Rated 4.8 / 5 by 900+ athletes</span>
        <span class="pill">42–60g protein per meal</span>
      </div>
      <h1 class="display">BUILT ON <span class="y">PROTEIN.</span><br>POWERED BY <span class="y">TADKA.</span></h1>
      <p class="lead">High-protein chicken bowls, guilt-free cheese tadka mac, crisp lean salads &amp; 200g tofu power bowls. Sautéed with authentic desi spices and zero seed oils — delicious food that actually hits your macros.</p>
      <div class="hero-cta">
        <a href="menu.html" class="btn btn-primary btn-lg">Explore The Menu ${''}</a>
        <a href="meal-plans.html" class="btn btn-white btn-lg">View Meal Plans</a>
      </div>
      <div class="hero-stats">
        <div><div class="num" data-count="60" data-suffix="g">60g</div><div class="lbl">Protein, max per meal</div></div>
        <div><div class="num" data-count="24" data-suffix="+">24+</div><div class="lbl">Protein-packed dishes</div></div>
        <div><div class="num" data-count="0" data-suffix="%">0%</div><div class="lbl">Seed oils &amp; cream</div></div>
      </div>
    </div>
    <div class="hero-media">
      <div class="hero-card">
        <img src="assets/img/hero-bowl.webp" alt="High protein grilled chicken power bowl from Protein Tadka" fetchpriority="high">
      </div>
      <div class="float-chip chip-a">
        <div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'}</div>
        <div><b>45g</b><small>Protein / bowl</small></div>
      </div>
      <div class="float-chip chip-b">
        <div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>'}</div>
        <div><b>100%</b><small>Real ingredients</small></div>
      </div>
    </div>
  </div>
  <div class="marquee">
    <div class="marquee-track">
      <span>No Seed Oils</span><span>No Heavy Cream</span><span>100% Boneless Chicken</span><span>200g Fresh Tofu</span><span>Desi Tadka Fusion</span><span>Transparent Macros</span>
      <span>No Seed Oils</span><span>No Heavy Cream</span><span>100% Boneless Chicken</span><span>200g Fresh Tofu</span><span>Desi Tadka Fusion</span><span>Transparent Macros</span>
    </div>
  </div>
</section>

<section class="trust">
  <div class="wrap">
    <div class="trust-grid">
      <div class="trust-item"><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>'}</div><div><b>Zero Seed Oils</b><small>Cold-pressed cooking only</small></div></div>
      <div class="trust-item"><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>'}</div><div><b>Cooked Fresh Daily</b><small>Nothing pre-made or frozen</small></div></div>
      <div class="trust-item"><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>'}</div><div><b>Hot Delivery</b><small>35–50 mins across the city</small></div></div>
      <div class="trust-item"><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>'}</div><div><b>Macros On Every Box</b><small>Weighed to the gram</small></div></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="center" style="max-width:720px;margin:0 auto 46px">
      <span class="eyebrow center-line">Why Protein Tadka</span>
      <h2 class="h2" style="margin:18px 0">Food That Trains With You</h2>
      <p class="lead center" style="margin-inline:auto">We were tired of bland boiled-gym diets and greasy cheat meals. So we built the middle ground: real desi flavour, engineered around protein.</p>
    </div>
    <div class="steps stagger">
      <div class="step reveal"><span class="sn">01</span><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'}</div><h3>42–60g Protein Yield</h3><p>Whether you choose 100% boneless chicken breast or 200g premium tofu, every bowl delivers serious athletic fuel with fully transparent macros.</p></div>
      <div class="step reveal"><span class="sn">02</span><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>'}</div><h3>Desi Tadka Fusion</h3><p>No bland boiled gym diets. Sautéed with roasted cumin, mustard seeds, curry leaves and secret house masalas that actually satisfy your cravings.</p></div>
      <div class="step reveal"><span class="sn">03</span><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>'}</div><h3>Zero Seed Oils &amp; Zero Cream</h3><p>Clean cold-pressed oils, fresh crisp greens and creamy yogurt dressings — without any heavy cream or industrial seed oils.</p></div>
    </div>
  </div>
</section>

<section class="section" style="background:var(--cream)">
  <div class="wrap">
    <div class="split">
      <div class="split-media reveal"><img src="assets/img/cat-mac.webp" alt="High protein tadka mac and cheese"></div>
      <div>
        <span class="eyebrow">Signature Series</span>
        <h2 class="h2" style="margin:18px 0 16px">Comfort Food,<br>Re-engineered.</h2>
        <p class="lead">Our Tadka Mac Series proves that mac &amp; cheese can be a legit protein source. Rich, creamy and bold — with 50g+ of protein and zero heavy cream.</p>
        <div class="feature-list">
          <div class="feature-item"><div class="n">50g</div><div><h4>Protein per mac bowl</h4><p>Loaded with 150g of tender chicken and a high-protein cheese sauce.</p></div></div>
          <div class="feature-item"><div class="n">0g</div><div><h4>Heavy cream</h4><p>We build our creamy base from yogurt, milk solids and skill — not cream.</p></div></div>
          <div class="feature-item"><div class="n">5</div><div><h4>Flavours to obsess over</h4><p>Tandoori, Tikka, Peri Peri, Makhani and Mexican Masala.</p></div></div>
        </div>
        <a href="menu.html#mac" class="btn btn-dark" style="margin-top:28px">See The Mac Series</a>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="split">
      <div>
        <span class="eyebrow">Pure Veg. Real Protein.</span>
        <h2 class="h2" style="margin:18px 0 16px">200g Fresh Tofu,<br>Not An Afterthought.</h2>
        <p class="lead">Most "veg options" are an afterthought. Ours are the main event — 200g of fresh tofu in every bowl, marinated and golden-grilled to order, with 30–34g of clean protein.</p>
        <div class="feature-list">
          <div class="feature-item"><div class="n">10</div><div><h4>Veg dishes on the menu</h4><p>Five tofu rice bowls and five fresh tofu salads — all 100% pure veg.</p></div></div>
          <div class="feature-item"><div class="n">3–4g</div><div><h4>Fibre per salad</h4><p>Mixed greens, broccoli, edamame and roasted seeds for real gut health.</p></div></div>
        </div>
        <a href="menu.html#tofu" class="btn btn-dark" style="margin-top:28px">Explore Veg Bowls</a>
      </div>
      <div class="split-media reveal"><img src="assets/img/cat-tofu.webp" alt="High protein tofu power bowl"></div>
    </div>
  </div>
</section>

<section class="section-sm"><div class="wrap"><div class="band reveal">
  <div class="center"><div class="num" data-count="45" data-suffix="g">45g</div><div class="lbl">Avg. protein / bowl</div></div>
  <div class="center"><div class="num" data-count="900" data-suffix="+">900+</div><div class="lbl">Happy customers</div></div>
  <div class="center"><div class="num" data-count="4.8" data-suffix="/5">4.8/5</div><div class="lbl">Average rating</div></div>
  <div class="center"><div class="num" data-count="35" data-suffix="min">35min</div><div class="lbl">Fastest delivery</div></div>
</div></div></section>

<section class="section">
  <div class="wrap">
    <div class="center" style="max-width:720px;margin:0 auto 46px">
      <span class="eyebrow center-line">Bestsellers</span>
      <h2 class="h2" style="margin:18px 0">The Bowls People Reorder</h2>
      <p class="lead center" style="margin-inline:auto">Four dishes that keep showing up in the same WhatsApp thread every single week.</p>
    </div>
    <div class="menu-grid stagger">${featCards}</div>
    <div class="center" style="margin-top:40px"><a href="menu.html" class="btn btn-dark btn-lg">View Full Menu (24 Dishes)</a></div>
  </div>
</section>

<section class="section" style="background:var(--cream)">
  <div class="wrap">
    <div class="center" style="max-width:720px;margin:0 auto 46px">
      <span class="eyebrow center-line">Real Reviews</span>
      <h2 class="h2" style="margin:18px 0">What Our Regulars Say</h2>
    </div>
    <div class="quotes stagger">
      <div class="quote reveal"><div class="stars">${'★'.repeat(5)}</div><p>"I've tried every 'healthy' delivery in Hyderabad. Protein Tadka is the only one where the food tastes like actual desi cooking but still fits my macro plan. The OG Power Bowl is a weekly staple now."</p><div class="quote-by"><div class="avatar">AR</div><div><b>Aditya R.</b><small>Strength Coach, Gachibowli</small></div></div></div>
      <div class="quote reveal"><div class="stars">${'★'.repeat(5)}</div><p>"As a vegetarian, I'm used to getting the boring paneer option. The Punjabi Tadka Tofu Bowl has 33g protein and honestly tastes better than any paneer dish I've had delivered. Huge respect."</p><div class="quote-by"><div class="avatar">SN</div><div><b>Sneha N.</b><small>Marathon Runner, Manikonda</small></div></div></div>
      <div class="quote reveal"><div class="stars">${'★'.repeat(5)}</div><p>"The Tikka Tadka Mac is dangerous. It tastes like a cheat meal, but it's 52g protein with no cream. I order it after every heavy leg day and never feel sluggish. Packaging is premium too."</p><div class="quote-by"><div class="avatar">KM</div><div><b>Karthik M.</b><small>Powerlifter, Financial District</small></div></div></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="split">
      <div class="split-media reveal"><img src="assets/img/spread-flatlay.webp" alt="Protein Tadka meal spread flat lay"></div>
      <div>
        <span class="eyebrow">How It Works</span>
        <h2 class="h2" style="margin:18px 0 16px">From Craving To Doorstep<br>In Three Steps.</h2>
        <div class="feature-list">
          <div class="feature-item"><div class="n">1</div><div><h4>Pick your bowl</h4><p>Choose from chicken bowls, mac, salads or tofu. Every dish shows its exact protein and calorie count.</p></div></div>
          <div class="feature-item"><div class="n">2</div><div><h4>Customise the portion</h4><p>Go 150g or 200g chicken based on your daily target. Veg bowls always come with a full 200g of tofu.</p></div></div>
          <div class="feature-item"><div class="n">3</div><div><h4>We cook &amp; deliver hot</h4><p>Freshly sautéed to order, sealed hot and at your door in 35–50 minutes across our delivery zones.</p></div></div>
        </div>
        <a href="delivery.html" class="btn btn-dark" style="margin-top:28px">Check Delivery Areas</a>
      </div>
    </div>
  </div>
</section>

<section class="section" style="background:var(--green-50)">
  <div class="wrap">
    <div class="center" style="max-width:720px;margin:0 auto 46px">
      <span class="eyebrow center-line">Meal Plans</span>
      <h2 class="h2" style="margin:18px 0">Eat Protein On Autopilot</h2>
      <p class="lead center" style="margin-inline:auto">Stop deciding what to eat. Subscribe to a weekly or monthly protein plan and let us handle the rest — with better pricing per meal.</p>
    </div>
    <div class="plans stagger">
      <div class="plan reveal">
        <div class="plan-name">Starter Pack</div>
        <p class="plan-desc">Perfect for testing the waters.</p>
        <div class="plan-price">₹1,299<small> / 5 meals</small></div>
        <ul>
          <li>${'✓'} 5 protein meals of your choice</li>
          <li>${'✓'} Mix chicken &amp; tofu bowls</li>
          <li>${'✓'} Free delivery</li>
          <li>${'✓'} Valid for 14 days</li>
        </ul>
        <a href="meal-plans.html" class="btn btn-ghost btn-block">Choose Starter</a>
      </div>
      <div class="plan featured reveal">
        <span class="plan-badge">Most Popular</span>
        <div class="plan-name">Weekly Warrior</div>
        <p class="plan-desc">Our most-loved plan for consistent training.</p>
        <div class="plan-price">₹2,199<small> / 10 meals</small></div>
        <ul>
          <li>${'✓'} 10 protein meals</li>
          <li>${'✓'} Choose any 2 delivery days</li>
          <li>${'✓'} Free delivery + priority kitchen slot</li>
          <li>${'✓'} Save up to 18% vs. one-off orders</li>
          <li>${'✓'} Pause or swap anytime</li>
        </ul>
        <a href="meal-plans.html" class="btn btn-primary btn-block">Choose Weekly</a>
      </div>
      <div class="plan reveal">
        <div class="plan-name">Monthly Machine</div>
        <p class="plan-desc">For the ones who never skip a meal.</p>
        <div class="plan-price">₹3,999<small> / 20 meals</small></div>
        <ul>
          <li>${'✓'} 20 protein meals</li>
          <li>${'✓'} Choose any 4 delivery days</li>
          <li>${'✓'} Free delivery on every order</li>
          <li>${'✓'} Save up to 26% vs. one-off orders</li>
          <li>${'✓'} Dedicated WhatsApp concierge</li>
        </ul>
        <a href="meal-plans.html" class="btn btn-ghost btn-block">Choose Monthly</a>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="center" style="max-width:720px;margin:0 auto 40px">
      <span class="eyebrow center-line">Common Questions</span>
      <h2 class="h2" style="margin:18px 0">Before You Order</h2>
    </div>
    <div class="faq">
      <details class="faq-item"><summary>How much protein is actually in each bowl? <span class="pm">+</span></summary><div class="ans">Chicken bowls and lean salads deliver 45g protein (based on a 150g chicken portion), our mac series delivers 50–52g, and tofu bowls deliver 30–34g from a full 200g of fresh tofu. Every single item shows its exact protein count on the menu.</div></details>
      <details class="faq-item"><summary>Do you really use no seed oils or heavy cream? <span class="pm">+</span></summary><div class="ans">Correct. We cook exclusively in cold-pressed oils and build all our creamy sauces and dressings from yogurt, milk solids and house techniques — never industrial seed oils and never heavy cream. It's a core part of how we cook, not a marketing line.</div></details>
      <details class="faq-item"><summary>Where do you deliver and how long does it take? <span class="pm">+</span></summary><div class="ans">We currently deliver across Manikonda, Puppalaguda, Narsingi, Kokapet, Gachibowli and the Financial District. Typical delivery time is 35–50 minutes. Orders above ₹599 get free delivery.</div></details>
      <details class="faq-item"><summary>Can I customise a bowl to fit my macros? <span class="pm">+</span></summary><div class="ans">Absolutely. You can choose 150g or 200g chicken portions, ask for extra protein, or request less rice and more greens. Just tell us your target in the notes when you order on WhatsApp and our kitchen will build it around you.</div></details>
      <details class="faq-item"><summary>Is the food really made fresh? <span class="pm">+</span></summary><div class="ans">Yes. Nothing is pre-cooked, pre-portioned or frozen. Your bowl is sautéed to order after you place it, sealed hot and dispatched. That's why our prep window is a fixed 35–50 minutes rather than "instant".</div></details>
    </div>
    <div class="center" style="margin-top:32px"><a href="faq.html" class="btn btn-ghost">See All FAQs</a></div>
  </div>
</section>

${ctaBand(
  'Hungry Yet? Let\'s Get You Fed.',
  'Order a single bowl or lock in a weekly plan. Either way you get real desi flavour with serious protein — delivered hot to your door.',
  `<a href="menu.html" class="btn btn-primary btn-lg">Order Now</a>
   <a href="https://wa.me/${SITE_WA}" target="_blank" rel="noopener" class="btn btn-white btn-lg">Chat on WhatsApp</a>`
)}
`;
}

const SITE_WA = '919876543210';

/* ============================ MENU ============================ */
function menu(){
  const groups = CAT_ORDER.map(c => {
    const items = MENU.filter(m => m.cat === c);
    const isVeg = c === 'tofu' || c === 'tofu-salads';
    return `<section id="${CAT[c].id}" style="padding:56px 0;scroll-margin-top:90px">
      <div class="wrap">
        <div class="center" style="max-width:700px;margin:0 auto 34px">
          <span class="eyebrow center-line">${isVeg ? '100% Pure Veg' : '100% Boneless Chicken'}</span>
          <h2 class="h2" style="margin:16px 0 10px">${CAT[c].label}</h2>
          <p class="lead center" style="margin-inline:auto">${MENU_BLURB[c]}</p>
        </div>
        <div class="menu-grid stagger">${items.map(card).join('')}</div>
      </div>
    </section>`;
  }).join('');

  return `
${pageHero('The Full Menu', 'Twenty-four protein-packed dishes. Every one shows its exact protein and calorie count — no guessing, no hidden macros.', 'Menu')}

<section class="section-sm" style="background:var(--cream);border-bottom:1px solid var(--line)">
  <div class="wrap">
    <div class="filter-bar">
      <button class="filter-btn active" data-filter="all">All Dishes</button>
      <button class="filter-btn" data-filter="bowls">Chicken Bowls</button>
      <button class="filter-btn" data-filter="mac">Mac Series</button>
      <button class="filter-btn" data-filter="salads">Chicken Salads</button>
      <button class="filter-btn" data-filter="tofu">Tofu Bowls</button>
      <button class="filter-btn" data-filter="tofu-salads">Tofu Salads</button>
    </div>
    <p class="center" style="color:var(--ink-soft);font-size:.9rem;margin:0">Prices are inclusive of all taxes. Choose 150g or 200g chicken portions at checkout (₹40 extra for 200g).</p>
  </div>
</section>

<div id="menuAll">${groups}</div>

${ctaBand('Not Sure What To Pick?', 'Tell us your protein target and taste preference on WhatsApp — our kitchen will recommend the perfect bowl for you.', `<a href="https://wa.me/${SITE_WA}" target="_blank" rel="noopener" class="btn btn-primary btn-lg">Ask The Kitchen</a><a href="meal-plans.html" class="btn btn-white btn-lg">See Meal Plans</a>`)}
`;
}

const MENU_BLURB = {
  bowls:'100% boneless chicken breast, 150g & 200g portions, sautéed in house masalas. 42–60g protein per bowl.',
  mac:'High-protein comfort food with 150g cooked chicken and no heavy cream. 50–52g protein per bowl.',
  salads:'Fresh crisp greens with in-house dressings and zero seed oils. 45g protein per bowl.',
  tofu:'200g of fresh tofu in every bowl, golden-grilled and marinated. 30–34g protein, 100% pure veg.',
  'tofu-salads':'Five fresh tofu salads over crisp greens with bold dressings. 100% pure veg.'
};

/* ============================ ABOUT ============================ */
function about(){
  return `
${pageHero('Our Story', 'We started Protein Tadka because we were tired of choosing between food that tastes good and food that actually fuels you.', 'About')}

<section class="section">
  <div class="wrap">
    <div class="split">
      <div>
        <span class="eyebrow">The Origin</span>
        <h2 class="h2" style="margin:18px 0 16px">Built In A Hyderabad<br>Home Kitchen.</h2>
        <p class="lead">Protein Tadka began with a very simple frustration. Between gym-goers eating bland boiled meals and everyone else eating greasy takeout, there was a whole middle ground that nobody was serving — real, flavour-packed Indian food that also happens to be engineered around protein.</p>
        <p class="lead">So we started cooking. Not "diet food". Not "cheat food". Just proper desi cooking — roasted cumin, mustard seeds, curry leaves, house masalas — with the macros made deliberate instead of accidental. Every chicken portion is weighed. Every sauce is built to add protein rather than just fat. Every tofu bowl gets a full 200 grams, because vegetarians deserve better than a sad paneer cube.</p>
        <p class="lead">Today we cook out of a proper kitchen in Manikonda and deliver across West Hyderabad. The goal hasn't changed: feed people who train, work and live hard — without making them choose between taste and progress.</p>
      </div>
      <div class="split-media reveal"><img src="assets/img/packaging.webp" alt="Protein Tadka fresh meal packaging"></div>
    </div>
  </div>
</section>

<section class="section" style="background:var(--cream)">
  <div class="wrap">
    <div class="center" style="max-width:720px;margin:0 auto 46px">
      <span class="eyebrow center-line">What We Stand For</span>
      <h2 class="h2" style="margin:18px 0">Four Non-Negotiables</h2>
      <p class="lead center" style="margin-inline:auto">These aren't values we wrote on a wall. They're rules the kitchen actually cooks by, every single day.</p>
    </div>
    <div class="info-tiles stagger">
      <div class="tile reveal"><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>'}</div><h4>Zero Seed Oils</h4><p>We cook only in cold-pressed oils. No industrial seed oils, ever — they add calories without adding anything good.</p></div>
      <div class="tile reveal"><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>'}</div><h4>Zero Heavy Cream</h4><p>All our creamy sauces and dressings are built from yogurt and skill. Same indulgence, none of the heavy cream.</p></div>
      <div class="tile reveal"><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M7 6v14"/><path d="M17 6v14"/><path d="M5 3h14"/><path d="M12 3v3"/></svg>'}</div><h4>Weighed To The Gram</h4><p>Chicken, tofu, rice — all portioned precisely so the macros on your box are the macros in your bowl.</p></div>
      <div class="tile reveal"><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>'}</div><h4>Veg Is Not An Afterthought</h4><p>Our tofu line gets the same creativity, portioning and flavour engineering as our chicken line. Ten full dishes.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="band reveal">
      <div class="center"><div class="num" data-count="24" data-suffix="+">24</div><div class="lbl">Dishes on the menu</div></div>
      <div class="center"><div class="num" data-count="60" data-suffix="g">60</div><div class="lbl">Max protein / meal</div></div>
      <div class="center"><div class="num" data-count="2" data-suffix="">2</div><div class="lbl">Protein sources</div></div>
      <div class="center"><div class="num" data-count="0" data-suffix="">0</div><div class="lbl">Compromises</div></div>
    </div>
  </div>
</section>

<section class="section" style="background:var(--cream)">
  <div class="wrap">
    <div class="center" style="max-width:720px;margin:0 auto 40px">
      <span class="eyebrow center-line">Our Kitchen Promise</span>
      <h2 class="h2" style="margin:18px 0">What You Can Always Expect</h2>
    </div>
    <div class="faq">
      <details class="faq-item" open><summary>Cooked to order, never pre-made <span class="pm">+</span></summary><div class="ans">Your bowl starts cooking after you order. Nothing sits in a warmer or gets portioned the morning before. That's why we quote a real 35–50 minute window instead of pretending to be instant.</div></details>
      <details class="faq-item"><summary>Honest macros, printed on the box <span class="pm">+</span></summary><div class="ans">Every box arrives with its protein, calorie and macro breakdown. If the menu says 45g of protein, your bowl contains 45g of protein — we weigh every protein portion to the gram.</div></details>
      <details class="faq-item"><summary>Real ingredients you can recognise <span class="pm">+</span></summary><div class="ans">Boneless chicken breast, fresh tofu, basmati rice, real vegetables, yogurt, cold-pressed oils and whole spices. No powder-based shortcuts and no artificial "protein boosters".</div></details>
      <details class="faq-item"><summary>If it's not right, we fix it <span class="pm">+</span></summary><div class="ans">Wrong dish, cold food or a missing item? Message us on WhatsApp within 30 minutes of delivery and we'll make it right with a replacement or a credit — no arguments.</div></details>
    </div>
  </div>
</section>

${ctaBand('Come Eat With Us.', 'Whether you\'re chasing a PR or just trying to eat better without hating your food, there\'s a bowl here for you.', `<a href="menu.html" class="btn btn-primary btn-lg">Browse The Menu</a><a href="contact.html" class="btn btn-white btn-lg">Talk To Us</a>`)}
`;
}

/* ============================ NUTRITION ============================ */
function nutrition(){
  const rows = MENU.map(m => `<tr>
    <td><b>${m.name}</b></td>
    <td>${m.kind === 'veg' ? 'Tofu' : 'Chicken'}</td>
    <td><b>${m.protein}g</b></td>
    <td>${m.kcal} kcal</td>
    <td>${Math.round(m.protein*4)} kcal</td>
    <td>${money(m.price)}</td>
  </tr>`).join('');

  return `
${pageHero('Nutrition & Macros', 'Full transparency on every dish we cook. Here is exactly what you get in each bowl — protein, calories and where those calories come from.', 'Nutrition')}

<section class="section">
  <div class="wrap">
    <div class="info-tiles" style="margin-bottom:46px">
      <div class="tile reveal"><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'}</div><h4>42–60g Protein</h4><p>The protein range across our entire menu, from tofu salads at the lean end to loaded chicken mac at the top.</p></div>
      <div class="tile reveal"><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>'}</div><h4>Zero Junk Calories</h4><p>No seed oils, no heavy cream, no refined sugar in our sauces. The calories you see are calories that do something.</p></div>
      <div class="tile reveal"><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M7 6v14"/><path d="M17 6v14"/><path d="M5 3h14"/><path d="M12 3v3"/></svg>'}</div><h4>Weighed Portions</h4><p>150g or 200g chicken. 200g tofu. Fixed rice portions. The numbers below are what actually lands in your bowl.</p></div>
    </div>

    <div class="center" style="max-width:720px;margin:0 auto 34px">
      <span class="eyebrow center-line">Full Macro Table</span>
      <h2 class="h2" style="margin:16px 0">Every Dish, Every Number</h2>
      <p class="lead center" style="margin-inline:auto">Protein column shows grams at our standard portion. "Protein kcal" shows how much of each dish's energy comes from protein — a good proxy for how "lean" a dish is.</p>
    </div>

    <div class="table-wrap">
      <table class="nutri-table">
        <thead>
          <tr><th>Dish</th><th>Source</th><th>Protein</th><th>Calories</th><th>Protein kcal</th><th>Price</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <p style="color:var(--ink-soft);font-size:.85rem;margin-top:16px">* Macros are based on our standard 150g chicken portion. Choosing a 200g portion adds roughly 12–15g of protein. Veg dishes are calculated on the full 200g tofu portion.</p>
  </div>
</section>

<section class="section" style="background:var(--cream)">
  <div class="wrap">
    <div class="split">
      <div>
        <span class="eyebrow">Building Your Day</span>
        <h2 class="h2" style="margin:18px 0 16px">How To Hit Your Protein Target With Us.</h2>
        <p class="lead">Most people need between 1.6g and 2.2g of protein per kilogram of bodyweight to build and maintain muscle. Here's how Protein Tadka fits into a typical training day.</p>
        <div class="feature-list">
          <div class="feature-item"><div class="n">B</div><div><h4>Breakfast — 30–40g from your own food</h4><p>Eggs, yogurt or a shake gets you started before the kitchen even matters.</p></div></div>
          <div class="feature-item"><div class="n">L</div><div><h4>Lunch — 45g Chicken Bowl</h4><p>Our bestseller OG Power Bowl delivers 45g alongside clean rice and vegetables.</p></div></div>
          <div class="feature-item"><div class="n">D</div><div><h4>Dinner — 50–52g Mac or Salad</h4><p>Load up at night with the Tikka Tadka Mac or keep it light with The Farmer Salad at 45g.</p></div></div>
          <div class="feature-item"><div class="n">=</div><div><h4>A 140g+ protein day, easily</h4><p>Two Protein Tadka meals plus light breakfast food gets most active people where they need to be.</p></div></div>
        </div>
      </div>
      <div class="split-media reveal"><img src="assets/img/cat-salad.webp" alt="Lean high protein salad bowl with macro breakdown"></div>
    </div>
  </div>
</section>

${ctaBand('Eat To Your Numbers.', 'Pick your bowls, tell us your target, and we\'ll keep you fuelled. Meal plans make hitting protein daily almost automatic.', `<a href="meal-plans.html" class="btn btn-primary btn-lg">See Meal Plans</a><a href="menu.html" class="btn btn-white btn-lg">Browse Menu</a>`)}
`;
}

/* ============================ MEAL PLANS ============================ */
function mealPlans(){
  const plans = [
    { name:'Starter Pack', price:1299, meals:5, per:Math.round(1299/5), desc:'Perfect for testing the waters or eating clean a couple of days a week.', features:['5 protein meals of your choice','Mix chicken & tofu bowls freely','Free delivery on all 5 meals','Valid for 14 days','WhatsApp ordering support'] },
    { name:'Weekly Warrior', price:2199, meals:10, per:Math.round(2199/10), featured:true, desc:'Our most-loved plan. Built for people who train consistently and eat protein daily.', features:['10 protein meals of your choice','Choose any 2 delivery days','Free delivery + priority kitchen slot','Save up to 18% vs. one-off orders','Pause, swap or skip anytime','Dedicated WhatsApp concierge'] },
    { name:'Monthly Machine', price:3999, meals:20, per:Math.round(3999/20), desc:'For the ones who never skip a meal. Maximum value, maximum convenience.', features:['20 protein meals of your choice','Choose any 4 delivery days','Free delivery on every order','Save up to 26% vs. one-off orders','Priority customisation for macros','Monthly macro check-in with our team'] }
  ];
  const planCards = plans.map(p => `
    <div class="plan ${p.featured?'featured':''} reveal">
      ${p.featured?'<span class="plan-badge">Most Popular</span>':''}
      <div class="plan-name">${p.name}</div>
      <p class="plan-desc">${p.desc}</p>
      <div class="plan-price">${money(p.price)}<small> / ${p.meals} meals</small></div>
      <p style="font-family:var(--font-display);font-weight:700;color:${p.featured?'var(--yellow-500)':'var(--green-600)'};margin:8px 0 0">≈ ${money(p.per)} per meal</p>
      <ul>${p.features.map(f=>`<li>${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'} ${f}</li>`).join('')}</ul>
      <a href="https://wa.me/${SITE_WA}?text=${encodeURIComponent('Hi Protein Tadka! I want to subscribe to the '+p.name+' plan ('+p.meals+' meals).')}" target="_blank" rel="noopener" class="btn ${p.featured?'btn-primary':'btn-ghost'} btn-block">Choose ${p.name.split(' ')[0]}</a>
    </div>`).join('');

  return `
${pageHero('Meal Plans', 'Eat protein on autopilot. Subscribe to a weekly or monthly plan, save on every meal, and never have to decide what to eat again.', 'Meal Plans')}

<section class="section">
  <div class="wrap">
    <div class="center" style="max-width:720px;margin:0 auto 46px">
      <span class="eyebrow center-line">Choose Your Plan</span>
      <h2 class="h2" style="margin:18px 0">Simple Pricing, Serious Protein</h2>
      <p class="lead center" style="margin-inline:auto">All plans let you mix any dishes from our menu — chicken or tofu, bowls, mac or salads. No rigid menus, no locked categories.</p>
    </div>
    <div class="plans stagger">${planCards}</div>
  </div>
</section>

<section class="section" style="background:var(--cream)">
  <div class="wrap">
    <div class="center" style="max-width:720px;margin:0 auto 46px">
      <span class="eyebrow center-line">How Plans Work</span>
      <h2 class="h2" style="margin:18px 0">Dead Simple, Fully Flexible</h2>
    </div>
    <div class="steps stagger">
      <div class="step reveal"><span class="sn">01</span><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'}</div><h3>Pick A Plan</h3><p>Message us on WhatsApp with the plan you want. We set up your account and confirm your delivery days in minutes.</p></div>
      <div class="step reveal"><span class="sn">02</span><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'}</div><h3>Send Your Weekly Picks</h3><p>Every week, tell us which dishes you want and which day they should land. Mix it up as much as you like.</p></div>
      <div class="step reveal"><span class="sn">03</span><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>'}</div><h3>We Cook, You Eat</h3><p>Your meals arrive hot on schedule. Pause for holidays, swap dishes, or adjust portions anytime — no penalties.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="center" style="max-width:720px;margin:0 auto 40px">
      <span class="eyebrow center-line">Plan FAQs</span>
      <h2 class="h2" style="margin:18px 0">Questions About Subscribing</h2>
    </div>
    <div class="faq">
      <details class="faq-item" open><summary>Can I mix chicken and veg dishes in one plan? <span class="pm">+</span></summary><div class="ans">Yes, completely. Our plans are dish-agnostic — you can fill all 5, 10 or 20 meals with any combination from the full menu, chicken or tofu, at no extra cost difference beyond the dish price.</div></details>
      <details class="faq-item"><summary>Can I change my delivery days each week? <span class="pm">+</span></summary><div class="ans">Within your plan limit, yes. Weekly Warrior lets you pick 2 delivery days per week and Monthly Machine lets you pick 4 — you can change which days they are every single week.</div></details>
      <details class="faq-item"><summary>What happens if I go on holiday? <span class="pm">+</span></summary><div class="ans">Just message us and we'll pause your plan. Your remaining meals stay valid and we resume whenever you're back. There are no pause fees.</div></details>
      <details class="faq-item"><summary>Do plans expire? <span class="pm">+</span></summary><div class="ans">Meals themselves don't expire on our Weekly and Monthly plans as long as you're an active subscriber. The Starter Pack is valid for 14 days so you can try us out without a long commitment.</div></details>
      <details class="faq-item"><summary>Is there a minimum commitment? <span class="pm">+</span></summary><div class="ans">None. You can cancel, pause or switch plans at any time by messaging us on WhatsApp. There are no lock-in contracts or cancellation charges.</div></details>
    </div>
  </div>
</section>

${ctaBand('Lock In Your Protein.', 'Message us on WhatsApp with the plan you want and we\'ll have your first delivery scheduled today.', `<a href="https://wa.me/${SITE_WA}?text=${encodeURIComponent('Hi Protein Tadka! I want to start a meal plan.')}" target="_blank" rel="noopener" class="btn btn-primary btn-lg">Start A Plan On WhatsApp</a><a href="menu.html" class="btn btn-white btn-lg">Browse Menu First</a>`)}
`;
}

/* ============================ DELIVERY ============================ */
function delivery(){
  const areas = [
    ['Manikonda','12–20 min','Within our home turf. Fastest delivery zone.'],
    ['Puppalaguda','15–25 min','Regular daily slots, 11 AM and 7 PM batches.'],
    ['Narsingi','20–30 min','Free delivery on orders above ₹599.'],
    ['Kokapet','25–35 min','Neighbourhood kitchen zone for Financial District.'],
    ['Gachibowli','30–40 min','Wide coverage including DLF and Kondapur side.'],
    ['Financial District','30–45 min','Office lunch drops available on request.']
  ];
  return `
${pageHero('Delivery & Areas', 'Freshly cooked, sealed hot and at your door in 35–50 minutes. Here is exactly where we deliver and how it works.', 'Delivery')}

<section class="section">
  <div class="wrap">
    <div class="info-tiles" style="margin-bottom:50px">
      <div class="tile reveal"><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>'}</div><h4>35–50 Min Delivery</h4><p>Cooked to order, sealed hot and dispatched. Real timing, not a marketing "instant".</p></div>
      <div class="tile reveal"><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'}</div><h4>Free Above ₹599</h4><p>Orders above ₹599 ship completely free. Below that, a flat ₹39 delivery charge applies.</p></div>
      <div class="tile reveal"><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>'}</div><h4>UPI, Card or Cash</h4><p>Pay however you like — UPI, card on delivery, or cash. Simple and flexible.</p></div>
      <div class="tile reveal"><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'}</div><h4>Live WhatsApp Tracking</h4><p>We message you when your order is in the kitchen and again when it leaves for your address.</p></div>
    </div>

    <div class="center" style="max-width:720px;margin:0 auto 34px">
      <span class="eyebrow center-line">Coverage</span>
      <h2 class="h2" style="margin:16px 0">Where We Deliver</h2>
      <p class="lead center" style="margin-inline:auto">We currently serve West Hyderabad. Not sure if you're in range? Send us your pin code on WhatsApp and we'll confirm in minutes.</p>
    </div>
    <div class="table-wrap">
      <table class="nutri-table">
        <thead><tr><th>Area</th><th>Typical Time</th><th>Notes</th></tr></thead>
        <tbody>${areas.map(a=>`<tr><td><b>${a[0]}</b></td><td>${a[1]}</td><td>${a[2]}</td></tr>`).join('')}</tbody>
      </table>
    </div>
    <p style="color:var(--ink-soft);font-size:.85rem;margin-top:16px">Outside these areas? Message us anyway — for larger plan orders we can often arrange delivery or a pickup point.</p>
  </div>
</section>

<section class="section" style="background:var(--cream)">
  <div class="wrap">
    <div class="split">
      <div class="split-media reveal"><img src="assets/img/packaging.webp" alt="Protein Tadka hot sealed meal packaging for delivery"></div>
      <div>
        <span class="eyebrow">Packaging</span>
        <h2 class="h2" style="margin:18px 0 16px">Sealed Hot. Arrives Hot.</h2>
        <p class="lead">We designed our packaging around one problem: how do you get a freshly sautéed bowl across the city without it turning into a sad, steamy mess?</p>
        <div class="feature-list">
          <div class="feature-item"><div class="n">1</div><div><h4>Vent-locked seal</h4><p>Lets steam escape so greens stay crisp and fried elements stay crunchy, not soggy.</p></div></div>
          <div class="feature-item"><div class="n">2</div><div><h4>Sauce separated</h4><p>Dressings and sauces travel in their own compartment so nothing gets diluted on the way.</p></div></div>
          <div class="feature-item"><div class="n">3</div><div><h4>Macros printed on top</h4><p>Protein and calorie breakdown is on the lid, so you can log your meal in seconds.</p></div></div>
        </div>
      </div>
    </div>
  </div>
</section>

${ctaBand('Ready When You Are.', 'Check your area, pick your bowls and order on WhatsApp. We\'ll handle the rest — hot, fresh and on time.', `<a href="menu.html" class="btn btn-primary btn-lg">Order Now</a><a href="https://wa.me/${SITE_WA}" target="_blank" rel="noopener" class="btn btn-white btn-lg">Check My Area</a>`)}
`;
}

/* ============================ CONTACT ============================ */
function contact(){
  return `
${pageHero('Contact Us', 'Questions about the menu, a plan or your order? Our kitchen replies fast — usually within minutes on WhatsApp.', 'Contact')}

<section class="section">
  <div class="wrap">
    <div class="info-tiles" style="margin-bottom:50px">
      <div class="tile reveal"><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'}</div><h4>Call Us</h4><p><a href="tel:+919876543210">+91 98765 43210</a><br>Daily, 11 AM – 11:30 PM</p></div>
      <div class="tile reveal"><div class="ic">${'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>'}</div><h4>WhatsApp</h4><p><a href="https://wa.me/919876543210">Order & enquiries</a><br>Fastest way to reach the kitchen</p></div>
      <div class="tile reveal"><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>'}</div><h4>Email</h4><p><a href="mailto:hello@proteintadka.in">hello@proteintadka.in</a><br>For plans & partnerships</p></div>
      <div class="tile reveal"><div class="ic">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>'}</div><h4>Kitchen</h4><p>Plot 112, M.N Mansion, Friends Colony, Puppalaguda, Manikonda, Hyderabad 500089</p></div>
    </div>

    <div class="split" style="align-items:start">
      <div>
        <span class="eyebrow">Send A Message</span>
        <h2 class="h2" style="margin:18px 0 16px">Tell Us What You Need</h2>
        <p class="lead" style="margin-bottom:26px">Whether it's a bulk order for your gym, a custom macro plan or a question about an ingredient — drop us a line and we'll get back fast.</p>
        <form class="form-grid" onsubmit="event.preventDefault(); window.open('https://wa.me/919876543210?text='+encodeURIComponent('Name: '+this.name.value+'\nPhone: '+this.phone.value+'\nSubject: '+this.subject.value+'\n\n'+this.message.value),'_blank'); this.reset();" >
          <div class="field"><label for="cname">Your Name</label><input id="cname" name="name" required placeholder="e.g. Rahul Sharma"></div>
          <div class="field"><label for="cphone">Phone / WhatsApp</label><input id="cphone" name="phone" required placeholder="+91 ..."></div>
          <div class="field full"><label for="csubject">Subject</label>
            <select id="csubject" name="subject">
              <option>Order enquiry</option>
              <option>Meal plan subscription</option>
              <option>Bulk / corporate order</option>
              <option>Custom macro guidance</option>
              <option>Something else</option>
            </select>
          </div>
          <div class="field full"><label for="cmsg">Message</label><textarea id="cmsg" name="message" required placeholder="Tell us what you need..."></textarea></div>
          <div class="field full"><button type="submit" class="btn btn-primary btn-lg btn-block">${'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>'} Send On WhatsApp</button></div>
        </form>
      </div>
      <div>
        <span class="eyebrow">Working Hours</span>
        <h2 class="h2" style="margin:18px 0 16px">When We Cook</h2>
        <div class="table-wrap" style="margin-bottom:26px">
          <table class="nutri-table">
            <tbody>
              <tr><td><b>Monday – Friday</b></td><td>11:00 AM – 11:30 PM</td></tr>
              <tr><td><b>Saturday</b></td><td>11:00 AM – 12:00 AM</td></tr>
              <tr><td><b>Sunday</b></td><td>11:00 AM – 12:00 AM</td></tr>
              <tr><td><b>Kitchen cut-off</b></td><td>45 minutes before close</td></tr>
            </tbody>
          </table>
        </div>
        <div class="tile">
          <h4>Ordering for a group?</h4>
          <p>Planning a gym bulk order, office lunch run or event? Message us with your headcount and date and we'll build a custom quote with a bulk discount.</p>
          <a href="https://wa.me/919876543210?text=${encodeURIComponent('Hi! I want a bulk/corporate order quote.')}" target="_blank" rel="noopener" class="btn btn-dark btn-sm" style="margin-top:14px">Get A Bulk Quote</a>
        </div>
      </div>
    </div>
  </div>
</section>

${ctaBand('Let\'s Get You Fed.', 'The fastest way to order, ask or customise is always WhatsApp. Our kitchen replies in minutes.', `<a href="https://wa.me/${SITE_WA}" target="_blank" rel="noopener" class="btn btn-primary btn-lg">Message The Kitchen</a><a href="menu.html" class="btn btn-white btn-lg">Browse Menu</a>`)}
`;
}

/* ============================ FAQ ============================ */
function faq(){
  const groups = [
    { title:'Ordering & Delivery', items:[
      ['How do I place an order?','The fastest way is WhatsApp — tap any "Order Now" button, build your cart and send it through. You can also call us directly. We\'ll confirm your address and start cooking immediately.'],
      ['What is the minimum order value?','There\'s no minimum order value. Delivery is free on orders above ₹599; below that a flat ₹39 charge applies.'],
      ['How long will my order take?','Typical delivery is 35–50 minutes depending on your area and kitchen load. We cook to order, so this is real cooking time — not a pre-made heat-up.'],
      ['Can I schedule an order for later?','Yes. Just tell us your preferred delivery window on WhatsApp when you order and we\'ll time the kitchen accordingly. This is especially useful for meal plans.'],
      ['How do I track my order?','We message you twice on WhatsApp — once when your order enters the kitchen and again when it leaves for your address.']
    ]},
    { title:'Food & Ingredients', items:[
      ['What protein sources do you use?','100% boneless chicken breast and fresh tofu. No minced or processed meat, no powders, no "protein boosters".'],
      ['Is the tofu really fresh?','Yes. Every veg bowl contains a full 200g of fresh tofu, marinated and golden-grilled to order. It\'s never frozen or pre-portioned.'],
      ['Do you use any seed oils or heavy cream?','Never. We cook in cold-pressed oils only and build all creamy sauces and dressings from yogurt and milk solids. No heavy cream, no industrial seed oils.'],
      ['How spicy is the food?','Most dishes are medium. Peri Peri and Cali Fire lean hot; Afghani, Makhani and Herbed options are mild. Tell us your heat preference when ordering and we\'ll adjust.'],
      ['Can I customise ingredients?','Absolutely. You can request less rice, more greens, extra protein, no cheese, or a different sauce. Just add a note with your order.']
    ]},
    { title:'Macros & Health', items:[
      ['Are the macros accurate?','Yes. We weigh every protein portion to the gram, so the protein and calorie numbers on the menu and on your box lid are what you actually receive.'],
      ['Can I fit this into a cutting diet?','Easily. Our lean salads are 320–515 kcal with 30–45g of protein. Many customers use the Farmer and Tofu salads as their cut-phase staples.'],
      ['Is this suitable for bulking?','Very. The mac series delivers 50–52g of protein and 550–620 kcal per bowl — ideal for a surplus. Pair a chicken bowl with a mac for a high-calorie high-protein day.'],
      ['Do you have low-carb options?','Yes. All our salads are naturally lower in carbohydrate. You can also ask for less rice in any bowl, replaced with extra greens.']
    ]},
    { title:'Plans & Payments', items:[
      ['How do meal plans work?','Choose a plan (5, 10 or 20 meals), tell us your delivery days, and pick your dishes each week. You save per meal and skip the daily decision-making entirely.'],
      ['Can I pause or cancel a plan?','Yes, anytime, with no fees. Message us on WhatsApp and we\'ll pause or cancel your plan immediately.'],
      ['What payment methods do you accept?','UPI, cards on delivery, and cash. For meal plans we usually set up UPI auto-pay or manual weekly transfer — whichever suits you.'],
      ['Do you offer bulk or corporate orders?','Yes. We handle gym bulk orders, office lunch runs and events. Message us with your headcount and date for a custom quote and bulk pricing.']
    ]}
  ];
  const html = groups.map(g => `
    <div style="margin-bottom:44px">
      <h2 class="h3" style="margin-bottom:22px;color:var(--green-800)">${g.title}</h2>
      <div class="faq">
        ${g.items.map((it,i) => `<details class="faq-item"${i===0?' open':''}><summary>${it[0]} <span class="pm">+</span></summary><div class="ans">${it[1]}</div></details>`).join('')}
      </div>
    </div>`).join('');

  return `
${pageHero('Frequently Asked Questions', 'Everything you wanted to know about our food, our macros, our delivery and our plans — answered plainly.', 'FAQs')}
<section class="section"><div class="wrap" style="max-width:900px">${html}
  <div class="center" style="margin-top:20px">
    <p class="lead center" style="margin-inline:auto 0 20px">Still have a question we haven\'t answered?</p>
    <a href="contact.html" class="btn btn-dark btn-lg">Ask Us Directly</a>
  </div>
</div></section>
${ctaBand('Enough Reading. Start Eating.', 'You know the menu, the macros and the plans. Time to get a bowl in your hands.', `<a href="menu.html" class="btn btn-primary btn-lg">Order Now</a><a href="https://wa.me/${SITE_WA}" target="_blank" rel="noopener" class="btn btn-white btn-lg">Chat With Us</a>`)}
`;
}

/* ============================ ORDER ============================ */
function order(){
  const allCards = MENU.map(m => card(m)).join('');
  return `
${pageHero('Order Online', 'Build your order below, then send it straight to our kitchen on WhatsApp. Simple, fast and fully transparent.', 'Order')}

<section class="section-sm" style="background:var(--cream);border-bottom:1px solid var(--line)">
  <div class="wrap">
    <div class="filter-bar">
      <button class="filter-btn active" data-filter="all">All Dishes</button>
      <button class="filter-btn" data-filter="bowls">Chicken Bowls</button>
      <button class="filter-btn" data-filter="mac">Mac Series</button>
      <button class="filter-btn" data-filter="salads">Chicken Salads</button>
      <button class="filter-btn" data-filter="tofu">Tofu Bowls</button>
      <button class="filter-btn" data-filter="tofu-salads">Tofu Salads</button>
    </div>
    <p class="center" style="color:var(--ink-soft);font-size:.9rem;margin:0">Tap <strong>Add</strong> on any dish. Your cart is saved automatically and checkouts straight to WhatsApp.</p>
  </div>
</section>

<section class="section"><div class="wrap"><div class="menu-grid stagger">${allCards}</div></div></section>

<section class="section-sm"><div class="wrap"><div class="band reveal">
  <div class="center"><div class="num">₹199</div><div class="lbl">Starting price</div></div>
  <div class="center"><div class="num">₹39</div><div class="lbl">Delivery (free above ₹599)</div></div>
  <div class="center"><div class="num">35–50</div><div class="lbl">Minutes delivery</div></div>
  <div class="center"><div class="num">₹0</div><div class="lbl">Hidden charges</div></div>
</div></div></section>

${ctaBand('Your Cart Is Waiting.', 'Add a few bowls and check out on WhatsApp. We\'ll confirm your address and start cooking right away.', `<a href="#" data-cart-open class="btn btn-primary btn-lg">Open My Cart</a><a href="meal-plans.html" class="btn btn-white btn-lg">Save With A Plan</a>`)}
`;
}

function buildAll(buildPage, ctx){
  buildPage({ file:'index.html', title:'High Protein Meals Delivered', desc:'Protein Tadka — high-protein chicken bowls, tadka mac, lean salads & 200g tofu bowls. 42–60g protein per meal, zero seed oils, delivered hot in Hyderabad.', page:'index.html', body: home() });
  buildPage({ file:'menu.html', title:'Full Menu', desc:'Browse all 24 protein-packed dishes at Protein Tadka with exact protein and calorie counts for every bowl.', page:'menu.html', body: menu() });
  buildPage({ file:'order.html', title:'Order Online', desc:'Order high-protein meals online from Protein Tadka and check out instantly on WhatsApp.', page:'order.html', body: order() });
  buildPage({ file:'about.html', title:'Our Story', desc:'How Protein Tadka started in a Hyderabad home kitchen to serve real desi food engineered around protein.', page:'about.html', body: about() });
  buildPage({ file:'nutrition.html', title:'Nutrition & Macros', desc:'Full macro transparency for every Protein Tadka dish — protein, calories and protein-calorie ratio.', page:'nutrition.html', body: nutrition() });
  buildPage({ file:'meal-plans.html', title:'Meal Plans', desc:'Weekly and monthly high-protein meal plans from Protein Tadka. Save on every meal with flexible delivery days.', page:'meal-plans.html', body: mealPlans() });
  buildPage({ file:'delivery.html', title:'Delivery & Areas', desc:'Protein Tadka delivers across Manikonda, Gachibowli, Nandagiri and Financial District in 35–50 minutes.', page:'delivery.html', body: delivery() });
  buildPage({ file:'contact.html', title:'Contact Us', desc:'Get in touch with the Protein Tadka kitchen for orders, meal plans, bulk enquiries and custom macro guidance.', page:'contact.html', body: contact() });
  buildPage({ file:'faq.html', title:'FAQs', desc:'Answers to every question about Protein Tadka ordering, ingredients, macros, plans and payments.', page:'faq.html', body: faq() });
}

module.exports = { buildAll };
