import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import { SITE, waLink } from '../data/site.js';
import { CATEGORIES, CATEGORY_ORDER } from '../data/menu.js';
import { useCart } from './CartContext.jsx';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/menu', label: 'Menu' },
  { to: '/meal-plans', label: 'Meal Plans' },
  { to: '/nutrition', label: 'Nutrition' },
  { to: '/about', label: 'About', children: [
      { to: '/about', label: 'Our Story', small: 'Why we started Protein Tadka' },
      { to: '/delivery', label: 'Delivery & Areas', small: 'Where we deliver' },
      { to: '/faq', label: 'FAQs', small: 'Everything you asked' },
      { to: '/contact', label: 'Contact Us', small: 'Talk to the kitchen' },
  ]},
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, setOpen } = useCart();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <div className="topbar-ticker topbar-scroll">
            <span><i className="dot" aria-hidden="true" /> Now delivering across {SITE.areas}</span>
            <span className="topbar-mobile-hide"><Icon name="truck" size={15} /> Free delivery on orders above ₹{SITE.freeDeliveryAbove}</span>
          </div>
          <div className="topbar-ticker topbar-mobile-hide">
            <span><Icon name="clock" size={15} /> {SITE.hours}</span>
            <span><Icon name="phone" size={15} /> <strong>{SITE.phone}</strong></span>
          </div>
        </div>
      </div>

      <header className={`site-head${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap head-inner">
          <Link to="/" className="brand" aria-label="Protein Tadka Co. home">
            <img className="brand-badge" src="/assets/img/logo-badge-256.webp" alt="" width="256" height="256" />
            <span className="brand-word">
              <span className="bw-top">Desi Fuel</span>
              <span className="bw-main">Protein Tadka</span>
              <span className="bw-sub">High Protein · Delhi</span>
            </span>
          </Link>
          <nav className="nav" aria-label="Main navigation">
            {NAV.map((n) => n.children ? (
              <div className="has-drop" key={n.to}>
                <NavLink to={n.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                  {n.label} <span aria-hidden="true">▾</span>
                </NavLink>
                <div className="drop">
                  {n.children.map((c) => (
                    <Link key={c.to} to={c.to}>{c.label}<small>{c.small}</small></Link>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => (isActive ? 'active' : '')}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="head-actions">
            <button className="icon-btn" onClick={() => setOpen(true)} aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}>
              <Icon name="cart" size={21} />
              {count > 0 && <span className="cart-count">{count}</span>}
            </button>
            <Link to="/menu" className="btn btn-primary btn-sm btn-desk">Order Now</Link>
            <button
              className="icon-btn burger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Icon name="menu" size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* KFC-style deal strip — the bold offer bar that sits under the nav */}
      <aside className="dealbar" aria-label="Current offers">
        <div className="wrap dealbar-inner">
          <span className="dealbar-lead"><Icon name="fire" size={17} /> Today&rsquo;s Deals</span>
          <ul className="dealbar-list">
            <li><b>FREE delivery</b> on orders above ₹{SITE.freeDeliveryAbove}</li>
            <li><b>FIRST ORDER</b> — flat 15% off with code <em>TADKA15</em></li>
            <li><b>6-MEAL</b> weekly plans from ₹1,499</li>
          </ul>
          <Link to="/meal-plans" className="dealbar-cta">
            See All Deals <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </aside>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`} id="mobileMenu" aria-hidden={!mobileOpen}>
        <div className="mm-top">
          <div className="brand">
            <img className="brand-badge" src="/assets/img/logo-badge-256.webp" alt="" width="256" height="256" />
            <span className="brand-word">
              <span className="bw-top">Desi Fuel</span>
              <span className="bw-main" style={{ color: '#fff' }}>Protein Tadka</span>
            </span>
          </div>
          <button className="icon-btn" onClick={() => setMobileOpen(false)} aria-label="Close menu"
            style={{ background: 'rgba(255,255,255,.1)', color: '#fff' }}>
            <Icon name="close" size={20} />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} onClick={() => setMobileOpen(false)}>
              {n.label}<span aria-hidden="true">→</span>
            </NavLink>
          ))}
          <NavLink to="/delivery" onClick={() => setMobileOpen(false)}>Delivery<span aria-hidden="true">→</span></NavLink>
          <NavLink to="/faq" onClick={() => setMobileOpen(false)}>FAQs<span aria-hidden="true">→</span></NavLink>
          <NavLink to="/contact" onClick={() => setMobileOpen(false)}>Contact<span aria-hidden="true">→</span></NavLink>
        </nav>
        <div className="mm-foot">
          <a href={`tel:${SITE.phoneRaw}`} className="btn btn-white btn-block"><Icon name="phone" size={19} /> Call {SITE.phone}</a>
          <a href={waLink('Hi Protein Tadka! I would like to order.')} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-block">
            <Icon name="whatsapp" size={19} /> Order on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

// Small helper exported for reuse in the Menu mega-dropdown
export const menuCategories = CATEGORY_ORDER.map((k) => CATEGORIES[k]);
