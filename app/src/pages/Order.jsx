import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { Reveal, SectionHead } from '../components/UI.jsx';
import { useCart } from '../components/CartContext.jsx';
import { money, SITE, waLink } from '../data/site.js';
import { MENU, CATEGORIES } from '../data/menu.js';

const STEPS = [
  { ic: 'cart', t: 'Build your basket', p: 'Tap “Add” on any dish and it lands in your cart instantly — no page reload, no losing your place.' },
  { ic: 'whatsapp', t: 'Send it on WhatsApp', p: 'Your basket turns into a clean itemised message. One tap and it opens straight in our kitchen chat.' },
  { ic: 'truck', t: 'We cook & deliver', p: 'Confirm your address once, and we start cooking. Hot food at your door in 35–50 minutes.' },
];

export default function Order() {
  const { lines, count, subtotal, delivery, total, freeDelivery, add, setQty, remove, clear } = useCart();

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">›</span><span>Order</span>
          </nav>
          <h1 className="h2">Order In Seconds</h1>
          <p className="lead center" style={{ marginInline: 'auto' }}>
            No accounts, no checkout forms, no payment gateways that lose your food. Build your basket
            and send it to our kitchen on WhatsApp.
          </p>
        </div>
      </section>

      {/* ---- How it works ---- */}
      <section className="section-sm">
        <div className="wrap">
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

      {/* ---- Live basket ---- */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Your Basket"
            title="Live Order Summary"
            sub="Updates in real time as you add, remove or change quantities. Free delivery unlocks automatically above ₹599."
          />

          <div className="order-layout">
            <Reveal className="order-lines">
              {lines.length === 0 ? (
                <div className="empty-state">
                  <Icon name="cart" size={40} />
                  <h3>Your basket is empty</h3>
                  <p>Add a protein-packed dish and it will appear here instantly.</p>
                  <Link to="/menu" className="btn btn-dark btn-sm">Browse The Menu</Link>
                </div>
              ) : (
                lines.map((l) => (
                  <div className="order-line" key={l.id}>
                    <img src={`./assets/img/${l.item.img}`} alt={l.item.name} width="96" height="96" loading="lazy" />
                    <div className="ol-info">
                      <b>{l.item.name}</b>
                      <small>{l.item.protein}g protein · {l.item.kcal} kcal · {CATEGORIES[l.item.cat].short}</small>
                      <div className="ol-controls">
                        <div className="qty qty-lg">
                          <button onClick={() => setQty(l.id, l.qty - 1)} aria-label={`Decrease ${l.item.name}`}><Icon name="minus" size={16} /></button>
                          <span aria-live="polite">{l.qty}</span>
                          <button onClick={() => setQty(l.id, l.qty + 1)} aria-label={`Increase ${l.item.name}`}><Icon name="plus" size={16} /></button>
                        </div>
                        <span className="ol-unit">{money(l.item.price)} each</span>
                        <button className="ol-remove" onClick={() => remove(l.id)} aria-label={`Remove ${l.item.name}`}>
                          <Icon name="close" size={15} /> Remove
                        </button>
                      </div>
                    </div>
                    <div className="ol-price">{money(l.item.price * l.qty)}</div>
                  </div>
                ))
              )}
            </Reveal>

            <Reveal className="order-summary" delay={80}>
              <h3>Bill Summary</h3>
              <div className="cart-row"><span>Items ({count})</span><span>{money(subtotal)}</span></div>
              <div className="cart-row">
                <span>Delivery</span>
                <span>{subtotal === 0 ? '—' : freeDelivery ? <span style={{ color: 'var(--green-600)', fontWeight: 700 }}>FREE</span> : money(delivery)}</span>
              </div>
              {!freeDelivery && subtotal > 0 && (
                <div className="free-nudge">
                  <Icon name="truck" size={16} /> Add {money(SITE.freeDeliveryAbove - subtotal)} more for free delivery
                </div>
              )}
              <div className="cart-row total"><span>Total</span><span>{money(total)}</span></div>
              <OrderCheckout lines={lines} subtotal={subtotal} delivery={delivery} total={total} freeDelivery={freeDelivery} />
              {lines.length > 0 && (
                <button className="btn btn-ghost btn-block btn-sm" style={{ marginTop: 10 }} onClick={clear}>Clear basket</button>
              )}
              <p className="order-fine">
                UPI, cards on delivery &amp; cash accepted. Free delivery above ₹{SITE.freeDeliveryAbove} · Delivered in 35–50 mins.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Quick add ---- */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <SectionHead eyebrow="Quick Add" title="Popular Right Now" />
          <div className="quick-add">
            {MENU.slice(0, 8).map((m) => (
              <Reveal className="qa-row" key={m.id}>
                <img src={`./assets/img/${m.img}`} alt={m.name} width="64" height="64" loading="lazy" />
                <div className="qa-info">
                  <b>{m.name}</b>
                  <small>{m.protein}g protein · {m.kcal} kcal</small>
                </div>
                <span className="qa-price">{money(m.price)}</span>
                <button className="btn btn-dark btn-sm" onClick={() => add(m.id)} aria-label={`Add ${m.name} to basket`}>
                  <Icon name="plus" size={16} /> Add
                </button>
              </Reveal>
            ))}
          </div>
          <div className="center" style={{ marginTop: 32 }}>
            <Link to="/menu" className="btn btn-dark btn-lg">See All 24 Dishes</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function OrderCheckout({ lines, subtotal, delivery, total, freeDelivery }) {
  const checkout = () => {
    if (!lines.length) return;
    const items = lines.map((l) => `• ${l.qty} × ${l.item.name} — ${money(l.item.price * l.qty)}`).join('\n');
    const msg = `Hi Protein Tadka! I'd like to place an order:\n\n${items}\n\nSubtotal: ${money(subtotal)}\nDelivery: ${freeDelivery ? 'FREE' : money(delivery)}\nTotal: ${money(total)}\n\nName:\nAddress:\nPhone:`;
    window.open(waLink(msg), '_blank', 'noopener');
  };
  return (
    <button className="btn btn-primary btn-block" onClick={checkout} disabled={!lines.length} style={!lines.length ? { opacity: .5, cursor: 'not-allowed' } : undefined}>
      <Icon name="whatsapp" size={19} /> Checkout on WhatsApp
    </button>
  );
}
