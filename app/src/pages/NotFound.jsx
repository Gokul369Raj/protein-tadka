import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { MENU } from '../data/menu.js';
import { money } from '../data/site.js';

const SUGGESTED = MENU.slice(0, 4);

export default function NotFound() {
  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 70 }}>
        <div className="wrap">
          <div className="nf-code" aria-hidden="true">404</div>
          <h1 className="h2">This Bowl Went Missing</h1>
          <p className="lead center" style={{ marginInline: 'auto' }}>
            The page you were looking for is not on the menu. It may have moved, or the link might be
            slightly off. Let&rsquo;s get you back to the food.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 26 }}>
            <Link to="/" className="btn btn-primary btn-lg">Back To Home</Link>
            <Link to="/menu" className="btn btn-white btn-lg">Browse The Menu</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="h3 center" style={{ marginBottom: 30 }}>Popular Places To Go</h2>
          <div className="info-tiles">
            {[
              ['/menu', 'Full Menu', 'All 24 protein dishes with prices and macros.', 'flame'],
              ['/meal-plans', 'Meal Plans', 'Save up to 26% per meal with a plan.', 'wallet'],
              ['/nutrition', 'Nutrition', 'The full macro breakdown of every dish.', 'scale'],
              ['/delivery', 'Delivery Areas', 'Check whether we deliver to you.', 'truck'],
            ].map(([to, t, p, ic]) => (
              <Link className="tile nf-tile" to={to} key={to}>
                <div className="ic"><Icon name={ic} size={24} /></div>
                <h4>{t}</h4>
                <p>{p}</p>
                <span className="nf-go">Go <Icon name="arrowRight" size={15} /></span>
              </Link>
            ))}
          </div>

          <h2 className="h3 center" style={{ margin: '56px 0 30px' }}>Or Start With A Bestseller</h2>
          <div className="quick-add">
            {SUGGESTED.map((m) => (
              <Link className="qa-row nf-qa" to="/menu" key={m.id}>
                <img src={`./assets/img/${m.img}`} alt={m.name} width="64" height="64" loading="lazy" />
                <div className="qa-info">
                  <b>{m.name}</b>
                  <small>{m.protein}g protein · {m.kcal} kcal</small>
                </div>
                <span className="qa-price">{money(m.price)}</span>
                <Icon name="arrowRight" size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
