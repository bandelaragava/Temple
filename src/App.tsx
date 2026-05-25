import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Ticker from './components/layout/Ticker';
import FloatingActions from './components/layout/FloatingActions';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Booking from './pages/Booking';
import About from './pages/About';
import Darshan from './pages/Darshan';
import Donate from './pages/Donate';
import Gallery from './pages/Gallery';
import Festivals from './pages/Festivals';
import EHundi from './pages/EHundi';
import ComingSoon from './pages/ComingSoon';
import Language from './pages/Language';
import Account from './pages/Account';
import AdminPanel from './pages/AdminPanel';
import Help from './pages/Help';
import Store from './pages/Store';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// This component ensures Google Translate re-evaluates the page on route changes
const LanguageSync = () => {
  const location = useLocation();

  useEffect(() => {
    // Small delay to allow React to render the new page
    const timer = setTimeout(() => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select && select.value !== '') {
        // Triggering the change event again forces Google Translate to re-scan the new DOM
        select.dispatchEvent(new Event('change'));
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [location]);

  return null;
};

// This component ensures the page always scrolls to the top on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    window.addEventListener('authChange', handleAuthChange);
    // Sync initially and on pathname updates
    handleAuthChange();
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, [location.pathname]);

  const isAdminPath = location.pathname === '/admin';
  const isAccountPath = location.pathname === '/account' && isLoggedIn;
  const showFooter = !isAdminPath && !isAccountPath;

  return (
    <div className="app-container">
      {/* Official Temple Banner Above Navbar */}
      <div className="official-banner">
        {/* Only the image is displayed via CSS background */}
      </div>
      <Ticker />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/darshan" element={<Darshan />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/festivals" element={<Festivals />} />
          <Route path="/e-hundi" element={<EHundi />} />
          <Route path="/rituals" element={<Darshan />} />
          <Route path="/contact" element={<Help />} />
          <Route path="/faq" element={<Help />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/language" element={<Language />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
      <FloatingActions />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <LanguageSync />
      <AppContent />
    </Router>
  );
}

export default App;
