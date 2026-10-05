import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { Reveal, SectionHead } from '../components/UI.jsx';
import { SITE, waLink } from '../data/site.js';

const TOPICS = ['General enquiry', 'Place an order', 'Meal plan help', 'Bulk / corporate order', 'Feedback or complaint', 'Partnership'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', topic: TOPICS[0], message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError('Please fill in your name, phone number and message.');
      return;
    }
    setError('');
    const msg = `Hi Protein Tadka!\n\nName: ${form.name}\nPhone: ${form.phone}\nTopic: ${form.topic}\n\n${form.message}`;
    window.open(waLink(msg), '_blank', 'noopener');
    setSent(true);
  };

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">›</span><span>Contact</span>
          </nav>
          <h1 className="h2">Talk To The Kitchen</h1>
          <p className="lead center" style={{ marginInline: 'auto' }}>
            Order, ask about macros, request a custom build or send feedback — a real person from our
            team replies, usually within minutes during kitchen hours.
          </p>
        </div>
      </section>

      {/* ---- Quick contact tiles ---- */}
      <section className="section-sm">
        <div className="wrap">
          <Reveal className="info-tiles">
            <div className="tile">
              <div className="ic"><Icon name="whatsapp" size={24} /></div>
              <h4>WhatsApp (fastest)</h4>
              <p>Orders, changes and quick questions.</p>
              <a href={waLink('Hi Protein Tadka!')} target="_blank" rel="noopener noreferrer">Open chat →</a>
            </div>
            <div className="tile">
              <div className="ic"><Icon name="phone" size={24} /></div>
              <h4>Call Us</h4>
              <p>Speak to the kitchen directly.</p>
              <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a>
            </div>
            <div className="tile">
              <div className="ic"><Icon name="mail" size={24} /></div>
              <h4>Email</h4>
              <p>For bulk quotes and partnerships.</p>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
            <div className="tile">
              <div className="ic"><Icon name="instagram" size={24} /></div>
              <h4>Instagram</h4>
              <p>Daily specials &amp; behind the scenes.</p>
              <a href={SITE.insta} target="_blank" rel="noopener noreferrer">{SITE.instaHandle}</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Form + info ---- */}
      <section className="section">
        <div className="wrap">
          <div className="contact-layout">
            <Reveal className="contact-card">
              <h2 className="h3" style={{ marginBottom: 8 }}>Send Us A Message</h2>
              <p style={{ color: 'var(--ink-soft)', fontSize: '.94rem', marginBottom: 24 }}>
                Fill this in and it opens WhatsApp with your message pre-filled — no waiting on an inbox.
              </p>

              <form className="form-grid" onSubmit={submit} noValidate>
                <div className="field">
                  <label htmlFor="c-name">Your name</label>
                  <input id="c-name" type="text" value={form.name} onChange={set('name')} placeholder="e.g. Arjun Reddy" autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="c-phone">Phone number</label>
                  <input id="c-phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" autoComplete="tel" />
                </div>
                <div className="field full">
                  <label htmlFor="c-topic">What is this about?</label>
                  <select id="c-topic" value={form.topic} onChange={set('topic')}>
                    {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="field full">
                  <label htmlFor="c-message">Your message</label>
                  <textarea id="c-message" value={form.message} onChange={set('message')} placeholder="Tell us what you need — your address, your protein target, or your question." />
                </div>
                {error && <p className="form-error" role="alert">{error}</p>}
                {sent && !error && (
                  <p className="form-ok" role="status">
                    <Icon name="check" size={17} /> WhatsApp should have opened with your message. If not, tap the chat button below.
                  </p>
                )}
                <div className="field full">
                  <button type="submit" className="btn btn-primary btn-lg">
                    <Icon name="whatsapp" size={19} /> Send Via WhatsApp
                  </button>
                </div>
              </form>
            </Reveal>

            <Reveal className="contact-side" delay={80}>
              <div className="tile">
                <div className="ic"><Icon name="pin" size={24} /></div>
                <h4>Kitchen Address</h4>
                <p>{SITE.addr}</p>
              </div>
              <div className="tile">
                <div className="ic"><Icon name="clock" size={24} /></div>
                <h4>Opening Hours</h4>
                <p>{SITE.hours}</p>
              </div>
              <div className="tile">
                <div className="ic"><Icon name="truck" size={24} /></div>
                <h4>Delivery Areas</h4>
                <p>GTB Nagar, Hudson Lane, Model Town, Kamla Nagar, Punjabi Bagh &amp; Connaught Place.</p>
                <Link to="/delivery">Check your area →</Link>
              </div>
              <div className="tile">
                <div className="ic"><Icon name="bolt" size={24} /></div>
                <h4>Average Reply Time</h4>
                <p>Under 10 minutes during kitchen hours. Orders are prioritised.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Bulk banner ---- */}
      <section className="section" style={{ background: 'var(--green-50)' }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Big Order?"
            title="Gyms, Offices &amp; Events"
            sub="We handle bulk drops for corporate lunches, gym communities, hostels and events. Tell us the headcount and the date."
          />
          <div className="center">
            <a href={waLink('Hi Protein Tadka! I need a quote for a bulk order.')} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-lg">
              <Icon name="whatsapp" size={19} /> Request A Bulk Quote
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
