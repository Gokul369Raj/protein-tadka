import { useEffect, useMemo, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { Reveal, SectionHead, CtaBand, DishCard } from '../components/UI.jsx';
import { CATEGORIES, CATEGORY_ORDER, MENU } from '../data/menu.js';
import { SITE, waLink } from '../data/site.js';

export default function Menu() {
  const { hash } = useLocation();
  const [cat, setCat] = useState('all');
  const [kind, setKind] = useState('all');
  const [sort, setSort] = useState('default');
  const [q, setQ] = useState('');

  // Deep-link support: /menu#mac → select that category
  useEffect(() => {
    const id = hash.replace('#', '');
    if (CATEGORIES[id]) setCat(id);
    else if (id === 'all') setCat('all');
  }, [hash]);

  const items = useMemo(() => {
    let list = MENU.slice();
    if (cat !== 'all') list = list.filter((m) => m.cat === cat);
    if (kind !== 'all') list = list.filter((m) => m.kind === kind);
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      list = list.filter((m) => (m.name + ' ' + m.desc + ' ' + m.tag).toLowerCase().includes(s));
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'protein') list.sort((a, b) => b.protein - a.protein);
    else if (sort === 'kcal') list.sort((a, b) => a.kcal - b.kcal);
    return list;
  }, [cat, kind, sort, q]);

  const chips = [{ id: 'all', label: 'All Dishes' }, ...CATEGORY_ORDER.map((k) => ({ id: k, label: CATEGORIES[k].label }))];
  const activeCat = cat !== 'all' ? CATEGORIES[cat] : null;
  const reset = () => { setCat('all'); setKind('all'); setSort('default'); setQ(''); };
  const hasFilters = cat !== 'all' || kind !== 'all' || sort !== 'default' || q.trim() !== '';

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">›</span><span>Menu</span>
          </nav>
          <h1 className="h2">The Full Menu</h1>
          <p className="lead center" style={{ marginInline: 'auto' }}>
            24 protein-first dishes across five collections. Every item shows its exact protein and
            calorie count — no guessing, no marketing maths.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          {/* ---- Category chips ---- */}
          <div className="filter-bar" role="tablist" aria-label="Filter menu by category">
            {chips.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={cat === c.id}
                className={`filter-btn${cat === c.id ? ' active' : ''}`}
                onClick={() => setCat(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* ---- Toolbar: search + kind + sort ---- */}
          <div className="menu-toolbar">
            <label className="sr" htmlFor="menu-search">Search dishes</label>
            <input
              id="menu-search"
              type="search"
              className="menu-search"
              placeholder="Search dishes, ingredients or tags…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <div className="kind-toggle" role="group" aria-label="Filter by type">
              {[
                { id: 'all', label: 'All' },
                { id: 'chicken', label: 'Chicken' },
                { id: 'veg', label: 'Pure Veg' },
              ].map((k) => (
                <button
                  key={k.id}
                  className={`kind-btn${kind === k.id ? ' active' : ''}`}
                  aria-pressed={kind === k.id}
                  onClick={() => setKind(k.id)}
                >
                  {k.id !== 'all' && <Icon name={k.id === 'veg' ? 'leaf' : 'flame'} size={15} />} {k.label}
                </button>
              ))}
            </div>
            <label className="sr" htmlFor="menu-sort">Sort dishes</label>
            <select id="menu-sort" className="menu-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="default">Sort: Menu order</option>
              <option value="protein">Sort: Highest protein</option>
              <option value="price-asc">Sort: Price low → high</option>
              <option value="price-desc">Sort: Price high → low</option>
              <option value="kcal">Sort: Lowest calories</option>
            </select>
          </div>

          {/* ---- Active category blurb ---- */}
          {activeCat && (
            <div className="cat-note">
              <h2 className="h3">{activeCat.label}</h2>
              <p>{activeCat.blurb}</p>
            </div>
          )}

          <div className="result-count" aria-live="polite">
            Showing <strong>{items.length}</strong> {items.length === 1 ? 'dish' : 'dishes'}
            {hasFilters && (
              <button className="link-btn" onClick={reset}>Clear filters</button>
            )}
          </div>

          {/* ---- Grid ---- */}
          {items.length > 0 ? (
            <div className="menu-grid">
              {items.map((m, i) => <DishCard key={m.id} item={m} delay={(i % 4) * 70} />)}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="scale" size={40} />
              <h3>No dishes match that search</h3>
              <p>Try a different keyword, or clear the filters to see the full menu.</p>
              <button className="btn btn-dark btn-sm" onClick={reset}>Clear all filters</button>
            </div>
          )}
        </div>
      </section>

      {/* ---- Nutrition quick reference ---- */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <SectionHead
            eyebrow="At A Glance"
            title="Protein & Calorie Reference"
            sub="A quick snapshot of every dish so you can plan your day around real numbers."
          />
          <div className="table-wrap">
            <table className="nutri-table">
              <thead>
                <tr><th scope="col">Dish</th><th scope="col">Collection</th><th scope="col">Protein</th><th scope="col">Calories</th><th scope="col">Price</th></tr>
              </thead>
              <tbody>
                {MENU.map((m) => (
                  <tr key={m.id}>
                    <td><b>{m.name}</b></td>
                    <td>{CATEGORIES[m.cat].short}</td>
                    <td>{m.protein}g</td>
                    <td>{m.kcal} kcal</td>
                    <td>₹{m.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBand
        title="Can&rsquo;t Decide? We&rsquo;ll Help."
        sub="Message us your daily protein target and we&rsquo;ll build a bowl around it — extra protein, less rice, no cheese, sweeter heat level. Your call."
      >
        <a href={waLink('Hi Protein Tadka! Can you help me pick a bowl for my protein target?')} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
          <Icon name="whatsapp" size={19} /> Ask The Kitchen
        </a>
        <Link to="/meal-plans" className="btn btn-white btn-lg">Compare Meal Plans</Link>
      </CtaBand>

      <section className="section-sm">
        <div className="wrap">
          <Reveal className="info-tiles">
            <div className="tile">
              <div className="ic"><Icon name="truck" size={24} /></div>
              <h4>Free Delivery Above ₹{SITE.freeDeliveryAbove}</h4>
              <p>Below that, a flat ₹{SITE.deliveryFee} applies across all our delivery zones.</p>
            </div>
            <div className="tile">
              <div className="ic"><Icon name="clock" size={24} /></div>
              <h4>Delivered In 35–50 Mins</h4>
              <p>We cook to order, so this is real cooking time — never a pre-made heat-up.</p>
            </div>
            <div className="tile">
              <div className="ic"><Icon name="phone" size={24} /></div>
              <h4>Order By Phone</h4>
              <p>Prefer to talk? Call <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a> and we&rsquo;ll take it from there.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
