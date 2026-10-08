import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { Reveal, SectionHead, Counter, CtaBand } from '../components/UI.jsx';
import { SITE, waLink } from '../data/site.js';

const VALUES = [
  { ic: 'scale', t: 'Transparency First', p: 'Every dish shows its macros. Every sauce tells you what is in it. No vague "healthy" claims — just numbers you can act on.' },
  { ic: 'flame', t: 'Flavour Is Not Optional', p: 'Eating clean should not mean eating sad. We roast, temper and marinate so you actually crave the food that fuels you.' },
  { ic: 'leaf', t: 'Veg Is Not A Side Note', p: 'Our tofu bowls get the same care, portions and kitchen time as the chicken. Ten veg dishes, all built to be ordered on purpose.' },
  { ic: 'heart', t: 'Built For Regulars', p: 'We operate as a neighbourhood kitchen, not an algorithm. If you order weekly, we know your spice level and portion split.' },
];

const TIMELINE = [
  ['The Frustration', 'Our founders were training hard and eating badly — either bland boiled chicken from "diet" kitchens or greasy biryani that wrecked the macros.', 'bolt'],
  ['The Experiment', 'We started cooking chicken breast the way our families cook — tempered with mustard seeds, curry leaves and roasted masala — and weighed every portion.', 'flame'],
  ['The Kitchen', 'Word spread through Delhi gyms. What began as meal prep for friends became a full kitchen in GTB Nagar with a fixed 24-dish menu.', 'shield'],
  ['Today', '900+ regulars across GTB Nagar and North Delhi, a clean-label promise, and a menu that refuses to compromise between taste and macros.', 'award'],
];

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">›</span><span>Our Story</span>
          </nav>
          <h1 className="h2">Our Story</h1>
          <p className="lead center" style={{ marginInline: 'auto' }}>
            Protein Tadka started because eating for performance in India meant choosing between bland
            food and bad macros. We refused to accept that trade-off.
          </p>
        </div>
      </section>

      {/* ---- Intro split ---- */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <Reveal className="split-media">
              <img src="/assets/img/packaging.webp" alt="Protein Tadka premium packaging" width="900" height="720" loading="lazy" />
            </Reveal>
            <div>
              <span className="eyebrow">Built In Delhi</span>
              <h2 className="h2" style={{ margin: '18px 0 16px' }}>Real Food.<br />Real Protein.<br />Real Tadka.</h2>
              <p className="lead">
                We are a kitchen, not a brand exercise. Every bowl that leaves our door is sautéed to
                order in small batches, using the same tempering techniques you would find in a home
                kitchen — just with a nutrition label attached.
              </p>
              <p style={{ color: 'var(--ink-soft)' }}>
                No seed oils. No heavy cream. No protein powders masking a lack of real ingredients.
                Just 100% boneless chicken breast, fresh 200g tofu portions, crisp vegetables, and
                house-made sauces we are happy to explain in detail.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 28 }}>
                <Link to="/menu" className="btn btn-dark">See The Menu</Link>
                <a href={SITE.insta} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <Icon name="instagram" size={19} /> Follow Our Kitchen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Stats ---- */}
      <section className="section-sm">
        <div className="wrap">
          <Reveal className="band">
            <div className="center"><div className="num"><Counter value={24} suffix="+" /></div><div className="lbl">Dishes on the menu</div></div>
            <div className="center"><div className="num"><Counter value={900} suffix="+" /></div><div className="lbl">Regular customers</div></div>
            <div className="center"><div className="num"><Counter value={200} suffix="g" /></div><div className="lbl">Tofu per veg bowl</div></div>
            <div className="center"><div className="num"><Counter value={0} suffix="" /></div><div className="lbl">Seed oils used</div></div>
          </Reveal>
        </div>
      </section>

      {/* ---- Values ---- */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <SectionHead eyebrow="What We Stand For" title="Four Things We Won&rsquo;t Compromise" />
          <div className="info-tiles">
            {VALUES.map((v) => (
              <Reveal className="tile" key={v.t}>
                <div className="ic"><Icon name={v.ic} size={24} /></div>
                <h4>{v.t}</h4>
                <p>{v.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Timeline ---- */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="How We Got Here" title="From Frustration To Kitchen" />
          <div className="timeline">
            {TIMELINE.map(([t, p, ic], i) => (
              <Reveal className="tl-item" key={t} delay={i * 80}>
                <div className="tl-marker"><Icon name={ic} size={22} /></div>
                <div className="tl-body">
                  <span className="tl-step">Chapter {String(i + 1).padStart(2, '0')}</span>
                  <h3>{t}</h3>
                  <p>{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Kitchen standards ---- */}
      <section className="section" style={{ background: 'var(--green-50)' }}>
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Inside The Kitchen</span>
              <h2 className="h2" style={{ margin: '18px 0 16px' }}>How We Actually Cook</h2>
              <div className="feature-list">
                {[
                  ['Prep', 'Everything is portioned daily', 'Chicken is trimmed and portioned in 150g and 200g weights every morning. Tofu is pressed and marinated fresh — never frozen.'],
                  ['Cook', 'Sautéed to order, in small batches', 'Your bowl starts cooking after you order. Masalas are tempered fresh, vegetables are grilled, and nothing sits under a heat lamp.'],
                  ['Pack', 'Sealed hot, labelled with macros', 'Each box is sealed hot and labelled with the dish name, protein and calorie count so you can log it without thinking.'],
                ].map(([n, h, p]) => (
                  <div className="feature-item" key={h}>
                    <div className="n">{n[0]}</div>
                    <div><h4>{h}</h4><p>{p}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <Reveal className="split-media">
              <img src="/assets/img/spread-flatlay.webp" alt="Prepared protein meals ready for delivery" width="900" height="720" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Visit ---- */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Come Say Hi" title="Find Our Kitchen" />
          <div className="info-tiles">
            <div className="tile">
              <div className="ic"><Icon name="pin" size={24} /></div>
              <h4>Our Address</h4>
              <p>{SITE.addr}</p>
            </div>
            <div className="tile">
              <div className="ic"><Icon name="clock" size={24} /></div>
              <h4>Kitchen Hours</h4>
              <p>{SITE.hours}</p>
            </div>
            <div className="tile">
              <div className="ic"><Icon name="phone" size={24} /></div>
              <h4>Call Or WhatsApp</h4>
              <p><a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a><br /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            </div>
            <div className="tile">
              <div className="ic"><Icon name="instagram" size={24} /></div>
              <h4>Follow The Daily Menu</h4>
              <p><a href={SITE.insta} target="_blank" rel="noopener noreferrer">{SITE.instaHandle}</a> — daily specials &amp; behind-the-scenes.</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Your Next Meal Is A Message Away."
        sub="Order a single bowl to try us out, or start a plan and make protein the easiest part of your day."
      >
        <Link to="/menu" className="btn btn-primary btn-lg">Start Ordering</Link>
        <a href={waLink('Hi Protein Tadka! I read your story and would like to order.')} target="_blank" rel="noopener noreferrer" className="btn btn-white btn-lg">
          <Icon name="whatsapp" size={19} /> Chat With Us
        </a>
      </CtaBand>
    </>
  );
}
