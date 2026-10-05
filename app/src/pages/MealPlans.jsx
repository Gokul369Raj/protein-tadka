import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { Reveal, SectionHead, CtaBand } from '../components/UI.jsx';
import { PLANS } from '../data/menu.js';
import { money, waLink } from '../data/site.js';

const PERKS = [
  { ic: 'wallet', t: 'Better per-meal price', p: 'The more meals you commit to, the lower your cost per bowl — up to 26% cheaper than ordering one-off.' },
  { ic: 'scale', t: 'Macros dialled in', p: 'Tell us your daily protein and calorie target and we tune portions across your whole plan.' },
  { ic: 'clock', t: 'Pause or skip anytime', p: 'Travelling, sick, or eating out? Message us and we pause your plan with zero fees.' },
  { ic: 'users', t: 'Dedicated concierge', p: 'One WhatsApp thread with our team who knows your order, your goals and your spice level.' },
];

const COMPARE = [
  ['Cost per meal', '₹259', '₹219', '₹199'],
  ['Meals included', '5', '10', '20'],
  ['Free delivery', 'On all 5', 'On all 10', 'On all 20'],
  ['Delivery days', 'Choose 1', 'Choose 2', 'Choose 4'],
  ['Menu flexibility', 'Mix freely', 'Mix freely', 'Mix freely'],
  ['Pause / skip', 'Yes', 'Yes', 'Yes'],
  ['Macro check-in', '—', '—', 'Monthly'],
  ['Savings vs one-off', '—', 'Up to 18%', 'Up to 26%'],
];

export default function MealPlans() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">›</span><span>Meal Plans</span>
          </nav>
          <h1 className="h2">Protein On Autopilot</h1>
          <p className="lead center" style={{ marginInline: 'auto' }}>
            Stop deciding what to eat five times a week. Pick a plan, choose your dishes each week, and
            let our kitchen keep your protein topped up — at a better price per meal.
          </p>
        </div>
      </section>

      {/* ---- Plans ---- */}
      <section className="section">
        <div className="wrap">
          <div className="plans">
            {PLANS.map((p, i) => (
              <Reveal className={`plan${p.featured ? ' featured' : ''}`} key={p.id} delay={i * 90}>
                {p.featured && <span className="plan-badge">Most Popular</span>}
                <div className="plan-name">{p.name}</div>
                <p className="plan-desc">{p.desc}</p>
                <div className="plan-price">{money(p.price)}<small> / {p.meals} meals</small></div>
                <div className="plan-per">{money(p.per)} per meal</div>
                <ul>
                  {p.features.map((f) => (
                    <li key={f}><Icon name="check" size={18} /> {f}</li>
                  ))}
                </ul>
                <a
                  href={waLink(`Hi Protein Tadka! I'd like to start the ${p.name} (${p.meals} meals — ${money(p.price)}). Can you set me up?`)}
                  target="_blank" rel="noopener noreferrer"
                  className={p.featured ? 'btn btn-primary btn-block' : 'btn btn-ghost btn-block'}
                >
                  <Icon name="whatsapp" size={19} /> Start {p.name.split(' ')[0]} Plan
                </a>
              </Reveal>
            ))}
          </div>
          <p className="center" style={{ marginTop: 26, color: 'var(--ink-soft)', fontSize: '.9rem' }}>
            Plans are flexible and fee-free to pause. Mix chicken &amp; tofu dishes freely in any plan.
          </p>        </div>
      </section>

      {/* ---- Perks ---- */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <SectionHead eyebrow="Why Subscribe" title="What You Actually Get" />
          <div className="info-tiles">
            {PERKS.map((p) => (
              <Reveal className="tile" key={p.t}>
                <div className="ic"><Icon name={p.ic} size={24} /></div>
                <h4>{p.t}</h4>
                <p>{p.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Compare ---- */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Side By Side" title="Compare The Plans" />
          <div className="table-wrap">
            <table className="nutri-table">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Starter Pack</th>
                  <th scope="col">Weekly Warrior</th>
                  <th scope="col">Monthly Machine</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row[0]}>
                    <td><b>{row[0]}</b></td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---- How it works ---- */}
      <section className="section" style={{ background: 'var(--green-50)' }}>
        <div className="wrap">
          <SectionHead eyebrow="The Process" title="How Plans Work" />
          <div className="steps">
            {[
              ['bolt', 'Pick a plan', 'Choose 5, 10 or 20 meals. Tell us your goals and we will recommend a starting mix.'],
              ['sparkle', 'Build each week', 'Every week, send us your dish list on WhatsApp. Swap freely — chicken, veg or a mix.'],
              ['truck', 'We deliver & repeat', 'Hot meals land on your chosen days. We keep the same thread open for changes.'],
            ].map(([ic, t, p], i) => (
              <Reveal className="step" key={t} delay={i * 90}>
                <span className="sn">{String(i + 1).padStart(2, '0')}</span>
                <div className="ic"><Icon name={ic} size={27} /></div>
                <h3>{t}</h3>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Plan Questions" title="Things People Ask" />
          <div className="faq">
            {[
              ['Can I mix chicken and veg dishes in one plan?', 'Yes, absolutely. Any plan lets you pick from the full 24-dish menu — chicken bowls, mac, lean salads and tofu bowls all draw from the same meal credits.'],
              ['What if I miss a delivery day?', 'Message us before your slot and we will move that meal to another day within the plan validity. No penalty.'],
              ['How is the plan billed?', 'UPI auto-pay or a manual weekly transfer — whichever suits you. The Starter Pack is a one-time payment, Weekly and Monthly can be set up on recurring UPI.'],
              ['Do you do corporate or gym bulk plans?', 'Yes. We handle gyms, offices, hostels and events. Send us your headcount and delivery schedule for custom bulk pricing.'],
            ].map((it, i) => (
              <details className="faq-item" key={it[0]} open={i === 0}>
                <summary>{it[0]} <span className="pm">+</span></summary>
                <div className="ans">{it[1]}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not Sure Which Plan Fits?"
        sub="Tell us how many days a week you train and we&rsquo;ll recommend the plan that hits your protein target without overspending."
      >
        <a href={waLink('Hi Protein Tadka! Help me choose a meal plan please.')} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
          <Icon name="whatsapp" size={19} /> Get A Recommendation
        </a>
        <Link to="/menu" className="btn btn-white btn-lg">Browse The Menu</Link>
      </CtaBand>
    </>
  );
}
