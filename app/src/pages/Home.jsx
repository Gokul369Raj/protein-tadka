import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { Reveal, Counter, SectionHead, DishCard } from '../components/UI.jsx';
import { VideoPlayer, ReviewCard } from '../components/Video.jsx';
import { useCart } from '../components/CartContext.jsx';
import { SITE, waLink, money } from '../data/site.js';
import { MENU, MENU_BY_ID, PLANS, TESTIMONIALS, FAQ_GROUPS, MAKING_VIDEO, REVIEW_VIDEOS } from '../data/menu.js';

const FEATURED = ['og-power-bowl', 'tikka-tadka-mac', 'farmer-salad', 'punjabi-tadka-bowl'];
const MARQUEE = ['No Seed Oils', 'No Heavy Cream', '100% Boneless Chicken', '200g Fresh Tofu', 'Desi Tadka Fusion', 'Macros On Every Lid'];

const TRUST = [
  { ic: 'shield', b: 'Zero Seed Oils', s: 'Cold-pressed cooking only' },
  { ic: 'flame', b: 'Cooked Fresh Daily', s: 'Nothing pre-made or frozen' },
  { ic: 'truck', b: 'Hot Delivery', s: '35–50 mins across the city' },
  { ic: 'award', b: 'Macros On Every Box', s: 'Weighed to the gram' },
];

const STEPS = [
  { ic: 'bolt', t: '42–60g Protein Yield', p: 'Whether you choose 100% boneless chicken breast or 200g premium tofu, every bowl delivers serious athletic fuel with fully transparent macros.' },
  { ic: 'fire', t: 'Desi Tadka Fusion', p: 'No bland boiled gym diets. Sautéed with roasted cumin, mustard seeds, curry leaves and secret house masalas that actually satisfy your cravings.' },
  { ic: 'leaf', t: 'Zero Seed Oils & Zero Cream', p: 'Clean cold-pressed oils, fresh crisp greens and creamy yogurt dressings — without any heavy cream or industrial seed oils.' },
];

const HOME_FAQ = FAQ_GROUPS[0].items.slice(0, 2).concat(FAQ_GROUPS[1].items.slice(0, 1)).concat([
  ["Where do you deliver and how long does it take?", 'We currently deliver across GTB Nagar, Hudson Lane, Model Town, Kamla Nagar, Punjabi Bagh and Connaught Place. Typical delivery time is 35–50 minutes. Orders above ₹599 get free delivery.'],
  ['Can I customise a bowl to fit my macros?', 'Absolutely. You can choose 150g or 200g chicken portions, ask for extra protein, or request less rice and more greens. Just tell us your target in the notes when you order on WhatsApp and our kitchen will build it around you.'],
]);

export default function Home() {
  const { setOpen } = useCart();
  const featured = FEATURED.map((id) => MENU_BY_ID[id]).filter(Boolean);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="hero-badges">
              <span className="pill pill-flame"><Icon name="star" size={14} /> Rated 4.8 / 5 by 900+ athletes</span>
              <span className="pill">42–60g protein per meal</span>
            </div>
            <h1 className="display">
              BUILT ON <span className="y">PROTEIN.</span><br />POWERED BY <span className="y">TADKA.</span>
            </h1>
            <p className="lead">
              High-protein chicken bowls, guilt-free cheese tadka mac, crisp lean salads &amp; 200g tofu
              power bowls. Sautéed with authentic desi spices and zero seed oils — delicious food that
              actually hits your macros.
            </p>
            <div className="hero-cta">
              <Link to="/menu" className="btn btn-flame btn-lg">
                Order Now <Icon name="arrowRight" size={19} />
              </Link>
              <Link to="/meal-plans" className="btn btn-white btn-lg">View Meal Plans</Link>
            </div>
            <div className="hero-stats">
              <div>
                <div className="num"><Counter value={60} suffix="g" /></div>
                <div className="lbl">Protein, max per meal</div>
              </div>
              <div>
                <div className="num"><Counter value={24} suffix="+" /></div>
                <div className="lbl">Protein-packed dishes</div>
              </div>
              <div>
                <div className="num"><Counter value={0} suffix="%" /></div>
                <div className="lbl">Seed oils &amp; cream</div>
              </div>
            </div>
          </div>

          <div className="hero-media">
            <div className="hero-card">
              <img
                src="/assets/img/hero-bowl.webp"
                alt="High protein grilled chicken power bowl from Protein Tadka"
                width="900" height="1125" fetchPriority="high"
              />
            </div>
            <div className="float-chip chip-a">
              <div className="ic"><Icon name="bolt" size={20} /></div>
              <div><b>60g+</b><small>Protein / bowl</small></div>
            </div>
            <div className="float-chip chip-b">
              <div className="ic"><Icon name="leaf" size={20} /></div>
              <div><b>100%</b><small>Real ingredients</small></div>
            </div>
          </div>
        </div>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i}>{m}</span>)}
          </div>
        </div>
      </section>

      {/* ---------------- TRUST ---------------- */}
      <section className="trust">
        <div className="wrap">
          <div className="trust-grid">
            {TRUST.map((t) => (
              <div className="trust-item" key={t.b}>
                <div className="ic"><Icon name={t.ic} size={21} /></div>
                <div><b>{t.b}</b><small>{t.s}</small></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- WHY ---------------- */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Why Protein Tadka"
            title="Food That Trains With You"
            sub="We were tired of bland boiled-gym diets and greasy cheat meals. So we built the middle ground: real desi flavour, engineered around protein."
          />
          <div className="steps">
            {STEPS.map((s, i) => (
              <Reveal className="step" key={s.t} delay={i * 90}>
                <span className="sn">{String(i + 1).padStart(2, '0')}</span>
                <div className="ic"><Icon name={s.ic} size={27} /></div>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- MAKING VIDEO ---------------- */}
      <section className="section" id="making" style={{ background: 'var(--green-900)', color: '#fff' }}>
        <div className="wrap">
          <div className="making">
            <Reveal className="making-media">
              <VideoPlayer
                src={MAKING_VIDEO.src}
                poster={MAKING_VIDEO.poster}
                badge={MAKING_VIDEO.badge}
                caption={MAKING_VIDEO.caption}
                ratio="9 / 16"
              />
            </Reveal>
            <div>
              <span className="eyebrow" style={{ color: 'var(--flame-400)' }}>{MAKING_VIDEO.eyebrow}</span>
              <h2 className="h2" style={{ color: '#fff', margin: '18px 0 16px' }}>{MAKING_VIDEO.title}</h2>
              <p className="lead" style={{ color: 'rgba(255,255,255,.8)' }}>{MAKING_VIDEO.lead}</p>

              <div className="making-stats">
                {MAKING_VIDEO.stats.map(([n, l]) => (
                  <div key={l}>
                    <div className="num" style={{ color: 'var(--flame-400)' }}>{n}</div>
                    <div className="lbl" style={{ color: 'rgba(255,255,255,.65)' }}>{l}</div>
                  </div>
                ))}
              </div>

              <div className="making-steps">
                {MAKING_VIDEO.steps.map(([t, p], i) => (
                  <Reveal className="making-step" key={t} delay={i * 70}>
                    <span className="n">{i + 1}</span>
                    <div>
                      <h4 style={{ color: '#fff' }}>{t}</h4>
                      <p style={{ color: 'rgba(255,255,255,.68)' }}>{p}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Link to="/menu" className="btn btn-flame" style={{ marginTop: 30 }}>
                Build Your Bowl <Icon name="arrowRight" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CUSTOMER REVIEW VIDEOS ---------------- */}
      <section className="section" id="reviews">
        <div className="wrap">
          <SectionHead
            eyebrow="Real Customers, Real Plates"
            title="Straight From Our Regulars"
            sub="Not paid influencers. These are customers who filmed themselves — in the gym, in the changing room, and at a full community event we catered."
          />
          <div className="reviews">
            {REVIEW_VIDEOS.map((r, i) => (
              <Reveal key={r.id} delay={i * 90}>
                <ReviewCard item={r} index={i} />
              </Reveal>
            ))}
          </div>
          <div className="center" style={{ marginTop: 40 }}>
            <a href={SITE.insta} target="_blank" rel="noopener noreferrer" className="btn btn-flame-ghost">
              <Icon name="instagram" size={19} /> More On Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- MAC SERIES ---------------- */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <div className="split">
            <Reveal className="split-media">
              <img src="/assets/img/cat-mac.webp" alt="High protein tadka mac and cheese" width="900" height="720" loading="lazy" />
            </Reveal>
            <div>
              <span className="eyebrow">Signature Series</span>
              <h2 className="h2" style={{ margin: '18px 0 16px' }}>Comfort Food,<br />Re-engineered.</h2>
              <p className="lead">
                Our Tadka Mac Series proves that mac &amp; cheese can be a legit protein source. Rich,
                creamy and bold — with 50g+ of protein and zero heavy cream.
              </p>
              <div className="feature-list">
                {[
                  ['50g', 'Protein per mac bowl', 'Loaded with 150g of tender chicken and a high-protein cheese sauce.'],
                  ['0g', 'Heavy cream', 'We build our creamy base from yogurt, milk solids and skill — not cream.'],
                  ['5', 'Flavours to obsess over', 'Tandoori, Tikka, Peri Peri, Makhani and Mexican Masala.'],
                ].map(([n, h, p]) => (
                  <div className="feature-item" key={h}>
                    <div className="n">{n}</div>
                    <div><h4>{h}</h4><p>{p}</p></div>
                  </div>
                ))}
              </div>
              <Link to="/menu#mac" className="btn btn-dark" style={{ marginTop: 28 }}>See The Mac Series</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TOFU ---------------- */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Pure Veg. Real Protein.</span>
              <h2 className="h2" style={{ margin: '18px 0 16px' }}>200g Fresh Tofu,<br />Not An Afterthought.</h2>
              <p className="lead">
                Most &ldquo;veg options&rdquo; are an afterthought. Ours are the main event — 200g of fresh tofu in
                every bowl, marinated and golden-grilled to order, with 30–34g of clean protein.
              </p>
              <div className="feature-list">
                {[
                  ['10', 'Veg dishes on the menu', 'Five tofu rice bowls and five fresh tofu salads — all 100% pure veg.'],
                  ['3–4g', 'Fibre per salad', 'Mixed greens, broccoli, edamame and roasted seeds for real gut health.'],
                ].map(([n, h, p]) => (
                  <div className="feature-item" key={h}>
                    <div className="n">{n}</div>
                    <div><h4>{h}</h4><p>{p}</p></div>
                  </div>
                ))}
              </div>
              <Link to="/menu#tofu" className="btn btn-dark" style={{ marginTop: 28 }}>Explore Veg Bowls</Link>
            </div>
            <Reveal className="split-media">
              <img src="/assets/img/cat-tofu.webp" alt="High protein tofu power bowl" width="900" height="720" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- VALUE STACK ---------------- */}
      <section className="section-sm">
        <div className="wrap">
          <Reveal className="vstack">
            <div className="vstack-item"><div className="vn"><Counter value={45} suffix="g" /></div><div className="vl">Avg. protein per bowl</div></div>
            <div className="vstack-item"><div className="vn"><Counter value={900} suffix="+" /></div><div className="vl">Happy customers</div></div>
            <div className="vstack-item"><div className="vn"><Counter value={4.8} decimals={1} /><em>/5</em></div><div className="vl">Average rating</div></div>
            <div className="vstack-item"><div className="vn"><Counter value={35} /><em>min</em></div><div className="vl">Fastest delivery</div></div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- BESTSELLERS ---------------- */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Bestsellers"
            title="The Bowls People Reorder"
            sub="Four dishes that keep showing up in the same WhatsApp thread every single week."
          />
          <div className="menu-grid">
            {featured.map((m, i) => <DishCard key={m.id} item={m} delay={i * 80} />)}
          </div>
          <div className="center" style={{ marginTop: 40 }}>
            <Link to="/menu" className="btn btn-dark btn-lg">View Full Menu (24 Dishes)</Link>
          </div>
        </div>
      </section>

      {/* ---------------- WRITTEN REVIEWS ---------------- */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <SectionHead eyebrow="More Feedback" title="What Our Regulars Say" />
          <div className="quotes">
            {TESTIMONIALS.map((t, i) => (
              <Reveal className="quote" key={t.name} delay={i * 90}>
                <div className="stars" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, k) => <Icon key={k} name="star" size={19} />)}
                </div>
                <p>&ldquo;{t.quote}&rdquo;</p>
                <div className="quote-by">
                  <div className="avatar">{t.initials}</div>
                  <div><b>{t.name}</b><small>{t.role}</small></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <Reveal className="split-media">
              <img src="/assets/img/spread-flatlay.webp" alt="Protein Tadka meal spread flat lay" width="900" height="720" loading="lazy" />
            </Reveal>
            <div>
              <span className="eyebrow">How It Works</span>
              <h2 className="h2" style={{ margin: '18px 0 16px' }}>From Craving To Doorstep<br />In Three Steps.</h2>
              <div className="feature-list">
                {[
                  ['1', 'Pick your bowl', 'Choose from chicken bowls, mac, salads or tofu. Every dish shows its exact protein and calorie count.'],
                  ['2', 'Customise the portion', 'Go 150g or 200g chicken based on your daily target. Veg bowls always come with a full 200g of tofu.'],
                  ['3', 'We cook & deliver hot', 'Freshly sautéed to order, sealed hot and at your door in 35–50 minutes across our delivery zones.'],
                ].map(([n, h, p]) => (
                  <div className="feature-item" key={h}>
                    <div className="n">{n}</div>
                    <div><h4>{h}</h4><p>{p}</p></div>
                  </div>
                ))}
              </div>
              <Link to="/delivery" className="btn btn-dark" style={{ marginTop: 28 }}>Check Delivery Areas</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PLANS ---------------- */}
      <section className="section" style={{ background: 'var(--green-50)' }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Meal Plans"
            title="Eat Protein On Autopilot"
            sub="Stop deciding what to eat. Subscribe to a weekly or monthly protein plan and let us handle the rest — with better pricing per meal."
          />
          <div className="plans">
            {PLANS.map((p, i) => (
              <Reveal className={`plan${p.featured ? ' featured' : ''}`} key={p.id} delay={i * 90}>
                {p.featured && <span className="plan-badge">Most Popular</span>}
                <div className="plan-name">{p.name}</div>
                <p className="plan-desc">{p.desc}</p>
                <div className="plan-price">{money(p.price)}<small> / {p.meals} meals</small></div>
                <ul>
                  {p.features.slice(0, 5).map((f) => (
                    <li key={f}><Icon name="check" size={18} /> {f}</li>
                  ))}
                </ul>
                <Link to="/meal-plans" className={p.featured ? 'btn btn-flame btn-block' : 'btn btn-ghost btn-block'}>
                  Choose {p.name.split(' ')[0]}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Common Questions" title="Before You Order" />
          <div className="faq">
            {HOME_FAQ.map((it, i) => (
              <details className="faq-item" key={it[0]} open={i === 0}>
                <summary>{it[0]} <span className="pm">+</span></summary>
                <div className="ans">{it[1]}</div>
              </details>
            ))}
          </div>
          <div className="center" style={{ marginTop: 32 }}>
            <Link to="/faq" className="btn btn-ghost">See All FAQs</Link>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="section">
        <div className="wrap">
          <Reveal className="cta-band">
            <h2 className="h2">Hungry Yet? Let&rsquo;s Get You Fed.</h2>
            <p className="lead" style={{ color: 'rgba(255,255,255,.8)', maxWidth: '60ch' }}>
              Order a single bowl or lock in a weekly plan. Either way you get real desi flavour with
              serious protein — delivered hot to your door.
            </p>
            <div className="actions">
              <button className="btn btn-flame btn-lg" onClick={() => setOpen(true)}>Order Now</button>
              <a href={waLink('Hi Protein Tadka! I would like to order.')} target="_blank" rel="noopener noreferrer" className="btn btn-white btn-lg">
                <Icon name="whatsapp" size={19} /> Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
