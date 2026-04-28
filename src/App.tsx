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
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="app-container">
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
              <Route path="/volunteer" element={<ComingSoon title="Volunteer Opportunities" />} />
              <Route path="/contact" element={<ComingSoon title="Contact & Support" />} />
              <Route path="/faq" element={<ComingSoon title="Frequently Asked Questions" />} />
              <Route path="/privacy" element={<ComingSoon title="Privacy Policy" />} />
              <Route path="/terms" element={<ComingSoon title="Terms of Service" />} />
              <Route path="/language" element={<Language />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </main>
          <Footer />
          <FloatingActions />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
