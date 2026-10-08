import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { Reveal, SectionHead, Counter, CtaBand } from '../components/UI.jsx';
import { MENU, CATEGORIES, CATEGORY_ORDER } from '../data/menu.js';
import { waLink } from '../data/site.js';

const PRINCIPLES = [
  { ic: 'scale', t: 'Weighed to the gram', p: 'Every protein portion is weighed. The number on the box is what you actually eat — not a rounded-up estimate.' },
  { ic: 'droplet', t: 'Cold-pressed oils only', p: 'We cook in cold-pressed groundnut and olive oil. Zero industrial seed oils, ever.' },
  { ic: 'leaf', t: 'No heavy cream', p: 'All our creamy sauces and dressings are built from yogurt and milk solids. Same richness, far better macros.' },
  { ic: 'shield', t: 'No powders or fillers', p: 'Real chicken breast, real tofu, real vegetables. No protein powders, no binders, nothing you cannot pronounce.' },
];

export default function Nutrition() {
  const [tab, setTab] = useState('bowls');
  const list = useMemo(() => MENU.filter((m) => m.cat === tab), [tab]);

  const maxProtein = Math.max(...MENU.map((m) => m.protein));
  const minKcal = Math.min(...MENU.map((m) => m.kcal));
  const vegCount = MENU.filter((m) => m.kind === 'veg').length;

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">›</span><span>Nutrition</span>
          </nav>
          <h1 className="h2">Nutrition &amp; Macros</h1>
          <p className="lead center" style={{ marginInline: 'auto' }}>
            We publish the numbers because they matter. Here is exactly what is in every bowl — the
            protein, the calories, and the rules we cook by.
          </p>
        </div>
      </section>

      {/* ---- Stats ---- */}
      <section className="section-sm">
        <div className="wrap">
          <Reveal className="band">
            <div className="center"><div className="num"><Counter value={maxProtein} suffix="g" /></div><div className="lbl">Max protein, single dish</div></div>
            <div className="center"><div className="num"><Counter value={minKcal} suffix="" /></div><div className="lbl">Lowest calorie dish</div></div>
            <div className="center"><div className="num"><Counter value={vegCount} suffix="+" /></div><div className="lbl">Pure veg dishes</div></div>
            <div className="center"><div className="num"><Counter value={0} suffix="g" /></div><div className="lbl">Added sugar</div></div>
          </Reveal>
        </div>
      </section>

      {/* ---- Principles ---- */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Our Standards"
            title="The Rules We Cook By"
            sub="Four non-negotiables that make our macros trustworthy and our food genuinely clean."
          />
          <div className="info-tiles">
            {PRINCIPLES.map((p) => (
              <Reveal className="tile" key={p.t}>
                <div className="ic"><Icon name={p.ic} size={24} /></div>
                <h4>{p.t}</h4>
                <p>{p.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Full macros table ---- */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <SectionHead eyebrow="Full Breakdown" title="Every Dish, Every Macro" />

          <div className="filter-bar" role="tablist" aria-label="Nutrition by collection">
            {CATEGORY_ORDER.map((k) => (
              <button
                key={k} role="tab" aria-selected={tab === k}
                className={`filter-btn${tab === k ? ' active' : ''}`}
                onClick={() => setTab(k)}
              >
                {CATEGORIES[k].short}
              </button>
            ))}
          </div>

          <div className="table-wrap">
            <table className="nutri-table">
              <thead>
                <tr>
                  <th scope="col">Dish</th>
                  <th scope="col">Type</th>
                  <th scope="col">Protein</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Protein density</th>
                </tr>
              </thead>
              <tbody>
                {list.map((m) => {
                  const density = Math.round((m.protein / m.kcal) * 100);
                  return (
                    <tr key={m.id}>
                      <td><b>{m.name}</b></td>
                      <td>
                        <span className={`kind-pill ${m.kind}`}>
                          <Icon name={m.kind === 'veg' ? 'leaf' : 'flame'} size={13} />
                          {m.kind === 'veg' ? 'Veg' : 'Chicken'}
                        </span>
                      </td>
                      <td><b>{m.protein}g</b></td>
                      <td>{m.kcal} kcal</td>
                      <td>
                        <div className="density">
                          <div className="density-bar"><span style={{ width: `${Math.min(density * 3, 100)}%` }} /></div>
                          <small>{density}% of kcal</small>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 16, fontSize: '.84rem', color: 'var(--ink-soft)' }}>
            Protein density = protein grams per 100 kcal. Higher is better for cutting phases.
          </p>
        </div>
      </section>

      {/* ---- Cutting vs Bulking ---- */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Eat With Intent</span>
              <h2 className="h2" style={{ margin: '18px 0 16px' }}>Cutting Or Bulking,<br />We&rsquo;ve Got A Bowl.</h2>
              <p className="lead">
                Use the menu like a toolkit. Choose lean, high-density dishes to protect muscle in a
                deficit, or stack protein-dense calories to fuel a surplus.
              </p>
              <div className="feature-list">
                {[
                  ['Cutting', 'Best picks under 350 kcal', 'Fresh Garden Tofu Salad — 30g protein, 320 kcal — and Pepper Garlic Tofu Salad for a light, high-volume meal.'],
                  ['Bulking', 'Best picks 550 kcal and above', 'Mexican Masala Mac — 51g protein, 620 kcal — or the Creamy Afghani Bowl at 595 kcal for a serious surplus.'],
                ].map(([eyebrow, h, p]) => (
                  <div className="feature-item" key={h}>
                    <div className="n">{eyebrow[0]}</div>
                    <div><h4>{h}</h4><p>{p}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <Reveal className="split-media">
              <img src="/assets/img/cat-salad.webp" alt="Lean high protein chicken salad" width="900" height="720" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Disclaimer ---- */}
      <section className="section-sm">
        <div className="wrap">
          <div className="notice">
            <Icon name="shield" size={22} />
            <div>
              <strong>A note on accuracy.</strong> Our macros are calculated from weighed raw
              ingredients and standard Indian food composition data, then adjusted for our recipes.
              They are accurate within normal kitchen variance. If you have a medical condition or a
              strict clinical target, please consult your nutritionist before subscribing.
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Need A Custom Macro Build?"
        sub="Tell us your daily target and we&rsquo;ll suggest a combination of bowls that lands you there — with the portions adjusted."
      >
        <a href={waLink('Hi Protein Tadka! I want help hitting my daily protein target.')} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
          <Icon name="whatsapp" size={19} /> Talk Macros
        </a>
        <Link to="/meal-plans" className="btn btn-white btn-lg">See Meal Plans</Link>
      </CtaBand>
    </>
  );
}
