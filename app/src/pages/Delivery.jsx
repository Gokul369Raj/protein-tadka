import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { Reveal, SectionHead, CtaBand } from '../components/UI.jsx';
import { DELIVERY_AREAS } from '../data/menu.js';
import { SITE, waLink } from '../data/site.js';

const ZONES = DELIVERY_AREAS.map(([name, eta, note], i) => ({ name, eta, note, id: i }));

const INCLUDED = [
  { ic: 'truck', t: 'Hot, sealed packaging', p: 'Every order travels in insulated, sealed boxes labelled with its macros so it arrives hot and trackable.' },
  { ic: 'clock', t: 'Two WhatsApp updates', p: 'We message you when your order enters the kitchen and again when it leaves for your address.' },
  { ic: 'wallet', t: 'Free above ₹599', p: 'Below that a flat ₹39 applies. Meal plan deliveries are always free, every single time.' },
  { ic: 'shield', t: 'Careful handling', p: 'Veg and non-veg are packed separately with sealed lids — no cross-contamination, ever.' },
];

export default function Delivery() {
  const [pin, setPin] = useState('');
  const [checked, setChecked] = useState(null);

  const check = (e) => {
    e.preventDefault();
    const v = pin.trim().toLowerCase();
    if (!v) return;
    const hit = ZONES.find((z) => z.name.toLowerCase().includes(v) || v.includes(z.name.toLowerCase().split(' ')[0]));
    setChecked(hit || 'none');
  };

  const result = useMemo(() => {
    if (!checked) return null;
    if (checked === 'none') return { ok: false };
    return { ok: true, zone: checked };
  }, [checked]);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">›</span><span>Delivery</span>
          </nav>
          <h1 className="h2">Delivery &amp; Areas</h1>
          <p className="lead center" style={{ marginInline: 'auto' }}>
            We deliver hot, freshly cooked bowls across GTB Nagar and the surrounding north
            Delhi belt — typically in 35–50 minutes.
          </p>
        </div>
      </section>

      {/* ---- Area checker ---- */}
      <section className="section-sm">
        <div className="wrap">
          <Reveal className="zone-check">
            <h2 className="h3">Do We Deliver To You?</h2>
            <p>Type your area or locality name to check the estimated delivery window.</p>
            <form className="zone-form" onSubmit={check}>
              <label className="sr" htmlFor="zone-input">Your area</label>
              <input
                id="zone-input"
                className="menu-search"
                placeholder="e.g. GTB Nagar, Model Town, Kamla Nagar…"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
              <button type="submit" className="btn btn-dark">Check Area</button>
            </form>

            {result && (
              <div className={`zone-result${result.ok ? ' ok' : ' no'}`} role="status" aria-live="polite">
                {result.ok ? (
                  <>
                    <Icon name="check" size={20} />
                    <div>
                      <b>Yes — we deliver to {result.zone.name}.</b>
                      <small>Estimated window: {result.zone.eta}. {result.zone.note}</small>
                    </div>
                  </>
                ) : (
                  <>
                    <Icon name="phone" size={20} />
                    <div>
                      <b>We&rsquo;re not sure about that one.</b>
                      <small>Message us on WhatsApp with your exact location and we&rsquo;ll confirm in minutes.</small>
                    </div>
                  </>
                )}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---- Zones table ---- */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Coverage" title="Our Delivery Zones" sub="Six core zones with live estimated windows based on typical kitchen load." />
          <div className="table-wrap">
            <table className="nutri-table">
              <thead>
                <tr><th scope="col">Area</th><th scope="col">Estimated delivery</th><th scope="col">Good to know</th></tr>
              </thead>
              <tbody>
                {ZONES.map((z) => (
                  <tr key={z.name}>
                    <td><b>{z.name}</b></td>
                    <td><span className="kind-pill chicken"><Icon name="clock" size={13} /> {z.eta}</span></td>
                    <td>{z.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---- Charges ---- */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Charges &amp; Timing</span>
              <h2 className="h2" style={{ margin: '18px 0 16px' }}>Simple Pricing,<br />No Surprises.</h2>
              <p className="lead">
                One flat delivery fee, one free-delivery threshold, and honest delivery windows. Meal
                plan deliveries are always free.
              </p>
              <div className="feature-list">
                {[
                  ['₹39', 'Flat delivery fee', 'Applies to any one-off order below ₹599, anywhere in our zones.'],
                  ['FREE', 'Above ₹599', `Any order of ${SITE.freeDeliveryAbove} rupees or more ships free. Most two-bowl orders qualify.`],
                  ['FREE', 'All meal plans', 'Starter, Weekly and Monthly plan deliveries are free on every single order.'],
                ].map(([n, h, p]) => (
                  <div className="feature-item" key={h}>
                    <div className="n" style={{ fontSize: n.length > 3 ? '.9rem' : undefined }}>{n}</div>
                    <div><h4>{h}</h4><p>{p}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <Reveal className="split-media">
              <img src="./assets/img/packaging.webp" alt="Insulated Protein Tadka delivery packaging" width="900" height="720" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- What's included ---- */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Every Order" title="What Comes With Your Delivery" />
          <div className="info-tiles">
            {INCLUDED.map((i) => (
              <Reveal className="tile" key={i.t}>
                <div className="ic"><Icon name={i.ic} size={24} /></div>
                <h4>{i.t}</h4>
                <p>{i.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Bulk ---- */}
      <section className="section" style={{ background: 'var(--green-50)' }}>
        <div className="wrap">
          <div className="notice" style={{ background: '#fff', border: '1px solid var(--line)', alignItems: 'center' }}>
            <Icon name="users" size={26} />
            <div style={{ flex: 1 }}>
              <strong>Bulk, office &amp; gym orders.</strong> Ordering for a team, a gym or an event? Send
              us your headcount, date and delivery window and we&rsquo;ll handle staggered drops with a
              custom quote.
            </div>
            <a href={waLink('Hi Protein Tadka! I want to place a bulk/office order.')} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm">
              <Icon name="whatsapp" size={18} /> Get A Quote
            </a>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready For Hot Protein At Your Door?"
        sub="Build your basket and send it through WhatsApp — we&rsquo;ll confirm your area and start cooking immediately."
      >
        <Link to="/menu" className="btn btn-primary btn-lg">Order Now</Link>
        <a href={`tel:${SITE.phoneRaw}`} className="btn btn-white btn-lg"><Icon name="phone" size={19} /> Call {SITE.phone}</a>
      </CtaBand>
    </>
  );
}
