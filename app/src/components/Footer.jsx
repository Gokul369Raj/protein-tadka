import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { SITE, waLink } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="brand">
              <img className="brand-badge" src="/assets/img/logo-badge-256.webp" alt="" width="256" height="256" />
              <span className="brand-word">
                <span className="bw-top">Desi Fuel</span>
                <span className="bw-main">Protein Tadka</span>
                <span className="bw-sub">High Protein · Delhi</span>
              </span>
            </div>
            <p>Built on Protein. Powered by Tadka. High-protein chicken bowls, guilt-free tadka mac, crisp lean salads &amp; 200g tofu power bowls — sautéed with authentic desi spices and zero seed oils.</p>
            <div className="foot-social">
              <a href={SITE.insta} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Icon name="instagram" size={20} /></a>
              <a href={waLink('Hi Protein Tadka!')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" size={20} /></a>
              <a href="#" aria-label="Facebook"><Icon name="facebook" size={20} /></a>
              <a href="#" aria-label="X"><Icon name="x" size={20} /></a>
            </div>
          </div>

          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/menu">Full Menu</Link></li>
              <li><Link to="/meal-plans">Meal Plans</Link></li>
              <li><Link to="/nutrition">Nutrition &amp; Macros</Link></li>
              <li><Link to="/delivery">Delivery Areas</Link></li>
              <li><Link to="/about">Our Story</Link></li>
            </ul>
          </div>

          <div>
            <h4>Our Menu</h4>
            <ul>
              <li><Link to="/menu#bowls">Protein Chicken Bowls</Link></li>
              <li><Link to="/menu#mac">Tadka Mac Series</Link></li>
              <li><Link to="/menu#salads">Lean Chicken Salads</Link></li>
              <li><Link to="/menu#tofu">Tofu Bowls (Veg)</Link></li>
              <li><Link to="/menu#tofu-salads">Tofu Salads (Veg)</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4>Get In Touch</h4>
            <ul>
              <li><a href={`tel:${SITE.phoneRaw}`}><Icon name="phone" size={17} /> {SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`}><Icon name="mail" size={17} /> {SITE.email}</a></li>
              <li><span><Icon name="pin" size={17} /> {SITE.addr}</span></li>
              <li><span><Icon name="clock" size={17} /> {SITE.hours}</span></li>
            </ul>
            <a href={waLink('Hi Protein Tadka! I would like to order.')} target="_blank" rel="noopener noreferrer"
              className="btn btn-primary btn-sm" style={{ marginTop: 16 }}>
              <Icon name="whatsapp" size={18} /> Order Now
            </a>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Protein Tadka Co. All rights reserved.</span>
          <span>Made with real protein &amp; real tadka in Delhi, India.</span>
        </div>
      </div>
    </footer>
  );
}
