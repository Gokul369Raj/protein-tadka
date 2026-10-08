import { useEffect } from 'react';
import { useCart } from './CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';
import { money, SITE, waLink } from '../data/site.js';
import { MENU_BY_ID } from '../data/menu.js';

export default function CartDrawer() {
  const { lines, count, subtotal, delivery, total, freeDelivery, isOpen, setOpen, setQty, remove, clear } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setOpen]);

  const checkout = () => {
    if (!lines.length) return;
    const items = lines.map((l) => `• ${l.qty} × ${l.item.name} — ${money(l.item.price * l.qty)}`).join('\n');
    const msg = `Hi Protein Tadka! I'd like to place an order:\n\n${items}\n\nSubtotal: ${money(subtotal)}\nDelivery: ${freeDelivery ? 'FREE' : money(delivery)}\nTotal: ${money(total)}\n\nName:\nAddress:\nPhone:`;
    window.open(waLink(msg), '_blank', 'noopener');
  };

  return (
    <>
      <div className={`overlay${isOpen ? ' open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside
        className={`cart-drawer${isOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        <div className="cart-head">
          <h3>Your Cart {count > 0 && <span style={{ color: 'var(--green-600)', fontSize: '1rem' }}>({count})</span>}</h3>
          <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close cart">
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="cart-body">
          {lines.length === 0 ? (
            <div className="cart-empty">
              <div className="ic"><Icon name="cart" size={36} /></div>
              <p><strong>Your cart is empty</strong></p>
              <p style={{ fontSize: '.9rem' }}>Add a protein-packed meal to get started.</p>
              <button className="btn btn-dark btn-sm" style={{ marginTop: 16 }}
                onClick={() => { setOpen(false); navigate('/menu'); }}>
                Browse The Menu
              </button>
            </div>
          ) : (
            lines.map((l) => (
              <div className="cart-line" key={l.id}>
                <img src={`/assets/img/${l.item.img}`} alt={l.item.name} width="68" height="68" loading="lazy" />
                <div className="cl-info">
                  <b>{l.item.name}</b>
                  <small>{l.item.protein}g protein · {l.item.kcal} kcal</small>
                  <div className="qty">
                    <button onClick={() => setQty(l.id, l.qty - 1)} aria-label={`Decrease quantity of ${l.item.name}`}>
                      <Icon name="minus" size={15} />
                    </button>
                    <span aria-live="polite">{l.qty}</span>
                    <button onClick={() => setQty(l.id, l.qty + 1)} aria-label={`Increase quantity of ${l.item.name}`}>
                      <Icon name="plus" size={15} />
                    </button>
                  </div>
                </div>
                <div className="cl-price">{money(l.item.price * l.qty)}</div>
              </div>
            ))
          )}
        </div>

        <div className="cart-foot">
          <div className="cart-row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <div className="cart-row">
            <span>Delivery</span>
            <span>{delivery === 0 && subtotal > 0 ? <span style={{ color: 'var(--green-600)', fontWeight: 700 }}>FREE</span> : money(delivery)}</span>
          </div>
          {!freeDelivery && subtotal > 0 && subtotal < SITE.freeDeliveryAbove && (
            <div className="cart-row" style={{ fontSize: '.82rem', color: 'var(--green-700)' }}>
              <span>Add {money(SITE.freeDeliveryAbove - subtotal)} more for free delivery</span>
            </div>
          )}
          <div className="cart-row total"><span>Total</span><span>{money(total)}</span></div>
          {lines.length > 0 && (
            <>
              <button className="btn btn-primary btn-block" onClick={checkout}>
                <Icon name="whatsapp" size={19} /> Checkout on WhatsApp
              </button>
              <button className="btn btn-ghost btn-block btn-sm" style={{ marginTop: 10 }} onClick={clear}>
                Clear cart
              </button>
            </>
          )}
          <p style={{ fontSize: '.78rem', color: 'var(--ink-soft)', textAlign: 'center', margin: '12px 0 0' }}>
            Free delivery above ₹{SITE.freeDeliveryAbove} · Delivered in 35–50 mins
          </p>
        </div>
      </aside>
    </>
  );
}
