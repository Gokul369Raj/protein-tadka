import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { Reveal, SectionHead, CtaBand } from '../components/UI.jsx';
import { FAQ_GROUPS } from '../data/menu.js';
import { waLink } from '../data/site.js';

export default function FAQ() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState('Ordering & Delivery-0');

  const groups = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return FAQ_GROUPS;
    return FAQ_GROUPS
      .map((g) => ({
        ...g,
        items: g.items.filter(([a, b]) => (a + ' ' + b).toLowerCase().includes(s)),
      }))
      .filter((g) => g.items.length > 0);
  }, [q]);

  const total = FAQ_GROUPS.reduce((n, g) => n + g.items.length, 0);
  const shown = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">›</span><span>FAQs</span>
          </nav>
          <h1 className="h2">Frequently Asked</h1>
          <p className="lead center" style={{ marginInline: 'auto' }}>
            {total} answers covering ordering, ingredients, macros, plans and payments. Search below or
            browse by topic.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="faq-search">
            <label className="sr" htmlFor="faq-search-input">Search FAQs</label>
            <input
              id="faq-search-input"
              type="search"
              className="menu-search"
              placeholder="Search a question — e.g. cream, tofu, pause, payment…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <p className="result-count" aria-live="polite" style={{ justifyContent: 'center' }}>
            {q ? <>Showing <strong>{shown}</strong> of {total} answers</> : <>{total} answers across {FAQ_GROUPS.length} topics</>}
          </p>

          {groups.map((g) => (
            <div className="faq-group" key={g.title}>
              <h2 className="h3">{g.title}</h2>
              <div className="faq">
                {g.items.map((it, i) => {
                  const key = `${g.title}-${i}`;
                  return (
                    <details
                      className="faq-item"
                      key={it[0]}
                      open={open === key}
                      onToggle={(e) => { if (e.currentTarget.open) setOpen(key); }}
                    >
                      <summary>{it[0]} <span className="pm">+</span></summary>
                      <div className="ans">{it[1]}</div>
                    </details>
                  );
                })}
              </div>
            </div>
          ))}

          {groups.length === 0 && (
            <div className="empty-state">
              <Icon name="phone" size={40} />
              <h3>No answer matched &ldquo;{q}&rdquo;</h3>
              <p>Message us directly and we&rsquo;ll answer within minutes during kitchen hours.</p>
              <a href={waLink('Hi Protein Tadka! I have a question: ' + q)} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm">
                <Icon name="whatsapp" size={18} /> Ask On WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <SectionHead eyebrow="Still Stuck?" title="Our Team Is One Message Away" />
          <Reveal className="cta-band">
            <h2 className="h2">Ask Us Anything</h2>
            <p className="lead" style={{ color: 'rgba(255,255,255,.8)', maxWidth: '60ch' }}>
              Allergies, macro targets, custom portions, bulk orders, delivery to a new area — if it is
              not answered above, we&rsquo;ll sort it out in chat.
            </p>
            <div className="actions">
              <a href={waLink('Hi Protein Tadka! I have a question.')} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                <Icon name="whatsapp" size={19} /> Chat With Us
              </a>
              <Link to="/contact" className="btn btn-white btn-lg">Contact Page</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Ready When You Are."
        sub="Browse the full menu, build your basket and send it through — we&rsquo;ll have it cooking in minutes."
      >
        <Link to="/menu" className="btn btn-primary btn-lg">Order Now</Link>
        <Link to="/meal-plans" className="btn btn-white btn-lg">View Meal Plans</Link>
      </CtaBand>
    </>
  );
}
