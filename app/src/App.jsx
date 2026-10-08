import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './components/CartContext.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Toast from './components/Toast.jsx';
import './styles/app.css';

// Route-level code splitting for fast first load
const Home = lazy(() => import('./pages/Home.jsx'));
const Menu = lazy(() => import('./pages/Menu.jsx'));
const Order = lazy(() => import('./pages/Order.jsx'));
const MealPlans = lazy(() => import('./pages/MealPlans.jsx'));
const Nutrition = lazy(() => import('./pages/Nutrition.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Delivery = lazy(() => import('./pages/Delivery.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const FAQ = lazy(() => import('./pages/FAQ.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function PageFallback() {
  return (
    <div className="route-load" role="status" aria-live="polite">
      <span className="ring" aria-hidden="true" />
      <span className="route-load-txt">Loading…</span>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <a href="#main" className="skip-link">Skip to main content</a>
        <Header />
        <main id="main">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/order" element={<Order />} />
              <Route path="/meal-plans" element={<MealPlans />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/about" element={<About />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              {/* Legacy .html URLs → clean routes */}
              <Route path="/index.html" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CartDrawer />
        <Toast />
      </CartProvider>
    </BrowserRouter>
  );
}
