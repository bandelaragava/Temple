import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, User, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', tKey: 'nav_home' },
    { name: 'About', path: '/about', tKey: 'nav_about' },
    { name: 'Darshan', path: '/darshan', tKey: 'nav_darshan' },
    { name: 'Booking', path: '/booking', tKey: 'nav_booking' },
    { name: 'Gallery', path: '/gallery', tKey: 'nav_gallery' },
    { name: 'Festivals', path: '/festivals', tKey: 'nav_festivals' },
    { name: 'E-Hundi', path: '/e-hundi', tKey: 'nav_ehundi' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${location.pathname === '/' ? 'on-home' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🛕</span>
          <div className="logo-text">
            <span className="temple-name">{t('temple_name')}</span>
            <span className="temple-tag">{t('temple_tag')}</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {t(link.tKey)}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <Link to="/language" className="icon-btn" title={t('tooltip_language')}><Globe size={20} /></Link>
          <Link to="/account" className="icon-btn" title={t('tooltip_account')}><User size={20} /></Link>
          <Link to="/donate" className="btn-primary donate-btn">
            <Heart size={18} fill="currentColor" />
            <span>{t('nav_donate')}</span>
          </Link>
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/donate" className="btn-primary" onClick={() => setIsMobileMenuOpen(false)}>
              Donate Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 36px;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 0;
          transition: var(--transition);
          color: var(--text);
        }

        .navbar.on-home {
          color: white;
        }

        .navbar.scrolled, .navbar:not(.on-home) {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 1rem 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          color: var(--text);
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: inherit;
        }

        .navbar.scrolled .temple-name, .navbar:not(.on-home) .temple-name {
          color: var(--secondary);
        }

        .logo-icon {
          font-size: 2rem;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .temple-name {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 1;
        }

        .temple-tag {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: inherit;
          opacity: 0.7;
        }

        .navbar.scrolled .temple-tag, .navbar:not(.on-home) .temple-tag {
          color: var(--text-muted);
          opacity: 1;
        }

        .nav-links-desktop {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: inherit;
          font-weight: 500;
          position: relative;
          padding: 0.5rem 0;
          transition: var(--transition);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary);
          transition: var(--transition);
        }

        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .icon-btn {
          color: inherit;
          padding: 0.6rem;
          border-radius: 50%;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-btn:hover, .mobile-menu-btn:hover {
          background: var(--marble);
          color: var(--primary);
        }

        .navbar.on-home:not(.scrolled) .icon-btn:hover,
        .navbar.on-home:not(.scrolled) .mobile-menu-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .mobile-menu-btn {
          display: none;
          color: inherit;
        }

        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: white;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          color: var(--text);
        }

        @media (max-width: 992px) {
          .nav-links-desktop, .donate-btn {
            display: none;
          }
          .mobile-menu-btn {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
