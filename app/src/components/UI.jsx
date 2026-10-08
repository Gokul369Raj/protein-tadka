import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { money } from '../data/site.js';
import { useCart } from './CartContext.jsx';

/* ---------------- Reveal on scroll (fail-safe) ---------------- */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setShown(true); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    io.observe(el);
    // Fail-safe: never leave content hidden
    const t = setTimeout(() => setShown(true), 2200);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${shown ? ' in' : ''} ${className}`.trim()}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------------- Animated counter (fail-safe) ---------------- */
export function Counter({ value, suffix = '', decimals = 0, duration = 1400, className = '' }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value); // show real value immediately

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') return;
    let raf;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const v = value * (1 - Math.pow(1 - p, 3));
          setDisplay(v);
          if (p < 1) raf = requestAnimationFrame(step);
          else setDisplay(value);
        };
        raf = requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, duration]);

  const shown = decimals > 0 ? Number(display).toFixed(decimals) : Math.round(display);
  return <span ref={ref} className={className}>{shown}{suffix}</span>;
}

/* ---------------- Page hero ---------------- */
export function PageHero({ title, sub, crumb }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <nav className="crumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumb && <><span aria-hidden="true">›</span><span>{crumb}</span></>}
        </nav>
        <h1 className="h2">{title}</h1>
        {sub && <p className="lead center" style={{ marginInline: 'auto' }}>{sub}</p>}
      </div>
    </section>
  );
}

/* ---------------- Section heading ---------------- */
export function SectionHead({ eyebrow, title, sub, center = true, children }) {
  return (
    <div className={center ? 'center' : ''} style={center ? { maxWidth: 720, margin: '0 auto 46px' } : undefined}>
      {eyebrow && <span className={`eyebrow${center ? ' center-line' : ''}`}>{eyebrow}</span>}
      <h2 className="h2" style={{ margin: '18px 0' }}>{title}</h2>
      {sub && <p className={`lead${center ? ' center' : ''}`} style={center ? { marginInline: 'auto' } : undefined}>{sub}</p>}
      {children}
    </div>
  );
}

/* ---------------- CTA band ---------------- */
export function CtaBand({ title, sub, children }) {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="cta-band">
          <h2 className="h2">{title}</h2>
          <p className="lead" style={{ color: 'rgba(255,255,255,.8)', maxWidth: '60ch' }}>{sub}</p>
          <div className="actions">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Stars ---------------- */
export function Stars({ count = 5 }) {
  return (
    <div className="stars" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => <Icon key={i} name="star" size={19} />)}
    </div>
  );
}

/* ---------------- Dish card ---------------- */
export function DishCard({ item, delay = 0 }) {
  const { add } = useCart();
  const kindLabel = item.kind === 'veg' ? 'Pure Veg' : 'Boneless Chicken';
  return (
    <Reveal as="article" className="card" delay={delay} data-cat={item.cat} data-kind={item.kind}>
      <div className="card-media">
        <img src={`/assets/img/${item.img}`} alt={item.name} loading="lazy" width="900" height="900" />
        <span className={`card-tag ${item.kind}`}>{item.tag}</span>
        <span className="card-protein">{item.protein}g Protein</span>
      </div>
      <div className="card-body">
        <h3>{item.name}</h3>
        <p className="card-desc">{item.desc}</p>
        <div className="card-meta">
          <span className="meta-item"><Icon name="bolt" size={15} /> {item.kcal} kcal</span>
          <span className="meta-item"><Icon name={item.kind === 'veg' ? 'leaf' : 'flame'} size={15} /> {kindLabel}</span>
        </div>
        <div className="card-foot">
          <span className="price">{money(item.price)}</span>
          <button className="btn btn-dark btn-sm" onClick={() => add(item.id)} aria-label={`Add ${item.name} to cart`}>
            <Icon name="plus" size={17} /> Add
          </button>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------- Stat band ---------------- */
export function StatBand({ stats }) {
  return (
    <section className="section-sm">
      <div className="wrap">
        <Reveal className="band">
          {stats.map((s) => (
            <div className="center" key={s.label}>
              <div className="num"><Counter value={s.value} suffix={s.suffix} decimals={s.decimals || 0} /></div>
              <div className="lbl">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
