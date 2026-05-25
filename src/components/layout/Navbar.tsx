import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, User, Heart, Bell, ShoppingBag, Calendar, Info, Sparkles, Image, Phone, Coins, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Custom Gopuram (Temple) Icon SVG
const TempleIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="gold-icon">
    <path d="M12 2L9 5h6l-3-3zm-3 4h6v3H9V6zm-1.5 4h9v3h-9v-3zm-2 4h13v3H5.5v-3zM4 19h16v3H4v-3zm6 3h4v-3h-4v3z" />
  </svg>
);

// Custom Diya (Lamp) Icon SVG
const DiyaIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="gold-icon">
    <path d="M12 2C13 4.5 13 6 12 7.5C11 6 11 4.5 12 2Z" fill="#FFA500" />
    <path d="M3 12C3 17 7 19 12 19C17 19 21 17 21 12C21 11.5 20.5 11 20 11H4C3.5 11 3 11.5 3 12Z" />
    <path d="M10 19L9 22H15L14 19H10Z" />
  </svg>
);

// Custom Folded Hands (Namaste) Icon SVG
const FoldedHandsIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="gold-icon">
    <path d="M12.01 2.25c-.27 0-.54.1-.75.31L7.15 6.67c-.4.4-.64.96-.64 1.55v4.54c0 .3.06.6.18.88l2.91 6.82c.31.73 1.14 1.07 1.87.76.73-.31 1.07-1.14.76-1.87l-2.31-5.4v-.11l4.02 4.02c.49.49 1.28.49 1.77 0 .49-.49.49-1.28 0-1.77l-3.32-3.32h-.11l3.52 3.52c.49.49 1.28.49 1.77 0 .49-.49.49-1.28 0-1.77l-3.31-3.31h-.11l2.81 2.81c.49.49 1.28.49 1.77 0 .49-.49.49-1.28 0-1.77l-3.51-3.51c-.13-.13-.25-.28-.35-.44l-2.07-3.46c-.23-.39-.65-.63-1.1-.63z" fill="#D4AF37" />
  </svg>
);

// Corner Ornament SVG for the corners of the navbar
const CornerOrnament = ({ style }: { style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '38px', height: '38px', position: 'absolute', pointerEvents: 'none', zIndex: 5, ...style }}
  >
    <path
      d="M 6 6 L 90 6 M 6 6 L 6 90"
      stroke="#D4AF37"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M 12 12 L 40 12 M 12 12 L 12 40"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M 6 6 C 25 25, 30 45, 12 45 C 12 45, 35 35, 45 12 C 45 12, 25 25, 25 6"
      stroke="#D4AF37"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M 6 25 C 16 25, 25 16, 25 6"
      stroke="#D4AF37"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="3.5" fill="#D4AF37" />
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isNoteMenuOpen, setIsNoteMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('userData');
    return saved ? JSON.parse(saved) : { notifications: [] };
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hash-based smooth scrolling handler on load or path changes
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const hash = location.hash;
      let targetSelector = '';
      if (hash === '#panchangam') targetSelector = '.almanac-section';
      if (hash === '#live-aarti') targetSelector = '.live-preview-card';

      if (targetSelector) {
        setTimeout(() => {
          const el = document.querySelector(targetSelector);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, [location]);

  const handleScrollToSection = (e: React.MouseEvent, targetSelector: string, hash: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.querySelector(targetSelector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Allow default router Link behavior, which will navigate to / and the hash effect will scroll
    }
  };

  const primaryLinks = [
    {
      name: "Home",
      path: "/",
      icon: <TempleIcon size={24} />,
      line1: "Main",
      line2: "Home"
    },
    {
      name: "About Temple",
      path: "/about",
      icon: <Info size={24} className="gold-icon" />,
      line1: "About",
      line2: "Temple"
    },
    {
      name: "Today's Panchangam",
      path: "/#panchangam",
      onClick: (e: React.MouseEvent) => handleScrollToSection(e, '.almanac-section', '#panchangam'),
      icon: <Calendar size={24} className="gold-icon" />,
      line1: "Today's",
      line2: "Panchangam"
    },
    {
      name: "Book Darshan",
      path: "/booking",
      icon: <TempleIcon size={24} />,
      line1: "Book",
      line2: "Darshan"
    },
    {
      name: "Sevas & Pujas",
      path: "/booking",
      icon: <FoldedHandsIcon size={24} />,
      line1: "Sevas &",
      line2: "Pujas"
    },
    {
      name: "Devotion E-Hundi",
      path: "/e-hundi",
      icon: <Coins size={24} className="gold-icon" />,
      line1: "Devotion",
      line2: "E-Hundi"
    }
  ];

  const secondaryLinks = [
    { name: "Upcoming Festivals", path: "/festivals", icon: <Sparkles size={18} /> },
    { name: "Photo Gallery", path: "/gallery", icon: <Image size={18} /> },
    {
      name: "Watch Live Aarti",
      path: "/#live-aarti",
      onClick: (e: React.MouseEvent) => handleScrollToSection(e, '.live-preview-card', '#live-aarti'),
      icon: <DiyaIcon size={18} />
    },
    { name: "Temple Store", path: "/store", icon: <ShoppingBag size={18} /> },
    { name: "Contact Us", path: "/contact", icon: <Phone size={18} /> }
  ];

  return (
    <nav className={`navbar-card-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-card">
        {/* Four Corner Ornaments */}
        <CornerOrnament style={{ top: '6px', left: '6px' }} />
        <CornerOrnament style={{ top: '6px', right: '6px', transform: 'scaleX(-1)' }} />
        <CornerOrnament style={{ bottom: '6px', left: '6px', transform: 'scaleY(-1)' }} />
        <CornerOrnament style={{ bottom: '6px', right: '6px', transform: 'scale(-1)' }} />

        <div className="nav-card-content">
          {/* Logo Only (Name Removed) */}
          <Link to="/" className="nav-brand-container">
            <img src="/assets/Om_Gold.png" alt="Om" className="nav-brand-logo" />
          </Link>

          <div className="navbar-divider"></div>

          {/* Desktop Links */}
          <div className="nav-links-desktop-container">
            {primaryLinks.map((link, idx) => (
              <React.Fragment key={idx}>
                {link.onClick ? (
                  <a href={link.path} onClick={link.onClick} className="nav-card-item">
                    <div className="nav-item-icon">{link.icon}</div>
                    <div className="nav-item-text">
                      <span className="text-line1">{link.line1}</span>
                      <span className="text-line2">{link.line2}</span>
                    </div>
                  </a>
                ) : (
                  <Link to={link.path} className="nav-card-item">
                    <div className="nav-item-icon">{link.icon}</div>
                    <div className="nav-item-text">
                      <span className="text-line1">{link.line1}</span>
                      <span className="text-line2">{link.line2}</span>
                    </div>
                  </Link>
                )}
                <div className="navbar-divider"></div>
              </React.Fragment>
            ))}

            {/* Devotee Portal Dropdown */}
            <div
              className="nav-card-dropdown-trigger"
              onMouseEnter={() => setIsAccountMenuOpen(true)}
              onMouseLeave={() => setIsAccountMenuOpen(false)}
            >
              <div className="nav-card-item">
                <div className="nav-item-icon"><User size={24} className="gold-icon" /></div>
                <div className="nav-item-text">
                  <span className="text-line1">Devotee</span>
                  <span className="text-line2">Portal <ChevronDown size={12} style={{ display: 'inline' }} /></span>
                </div>
              </div>

              <AnimatePresence>
                {isAccountMenuOpen && (
                  <motion.div
                    className="nav-card-dropdown glass-card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <Link to="/account" className="dropdown-card-item" onClick={() => setIsAccountMenuOpen(false)}>
                      <User size={16} /> Devotee Portal
                    </Link>
                    <Link to="/admin" className="dropdown-card-item" onClick={() => setIsAccountMenuOpen(false)}>
                      <Heart size={16} /> Admin Sanctuary
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="navbar-divider"></div>

            {/* More Links Dropdown */}
            <div
              className="nav-card-dropdown-trigger"
              onMouseEnter={() => setIsMoreMenuOpen(true)}
              onMouseLeave={() => setIsMoreMenuOpen(false)}
            >
              <div className="nav-card-item">
                <div className="nav-item-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="gold-icon">
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </div>
                <div className="nav-item-text">
                  <span className="text-line1">Discover</span>
                  <span className="text-line2">More <ChevronDown size={12} style={{ display: 'inline' }} /></span>
                </div>
              </div>

              <AnimatePresence>
                {isMoreMenuOpen && (
                  <motion.div
                    className="nav-card-dropdown glass-card more-dropdown"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    {secondaryLinks.map((subLink, subIdx) =>
                      subLink.onClick ? (
                        <a
                          key={subIdx}
                          href={subLink.path}
                          onClick={(e) => {
                            subLink.onClick(e);
                            setIsMoreMenuOpen(false);
                          }}
                          className="dropdown-card-item"
                        >
                          {subLink.icon} {subLink.name}
                        </a>
                      ) : (
                        <Link
                          key={subIdx}
                          to={subLink.path}
                          className="dropdown-card-item"
                          onClick={() => setIsMoreMenuOpen(false)}
                        >
                          {subLink.icon} {subLink.name}
                        </Link>
                      )
                    )}
                    <Link to="/language" className="dropdown-card-item" onClick={() => setIsMoreMenuOpen(false)}>
                      <Globe size={18} /> Choose Language
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Choose Language Link */}
            <>
              <div className="navbar-divider"></div>
              <Link to="/language" className="nav-card-item language-btn" title="Choose Language">
                <img src="/languageLogo.png" alt="Choose Language" className="nav-language-logo-img" />
              </Link>
            </>

            <div className="navbar-divider"></div>

            {/* Donate Orange Pill Button */}
            <Link to="/donate" className="nav-donate-pill">
              <Heart size={18} fill="currentColor" />
              <span>Donate</span>
            </Link>
          </div>

          {/* Mobile Menu Action */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-card-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mobile-drawer-header">Menu</div>
            <div className="mobile-drawer-links">
              {/* Primary list */}
              {primaryLinks.map((link, idx) => (
                <React.Fragment key={idx}>
                  {link.onClick ? (
                    <a
                      href={link.path}
                      onClick={(e) => {
                        link.onClick(e);
                        setIsMobileMenuOpen(false);
                      }}
                      className="mobile-drawer-link-item"
                    >
                      {link.icon} <span>{link.name}</span>
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="mobile-drawer-link-item"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.icon} <span>{link.name}</span>
                    </Link>
                  )}
                </React.Fragment>
              ))}

              <div className="mobile-drawer-divider"></div>

              {/* Devotee and Admin Portal */}
              <Link to="/account" className="mobile-drawer-link-item" onClick={() => setIsMobileMenuOpen(false)}>
                <User size={22} className="gold-icon" /> <span>Devotee Portal</span>
              </Link>
              <Link to="/admin" className="mobile-drawer-link-item" onClick={() => setIsMobileMenuOpen(false)}>
                <Heart size={22} className="gold-icon" /> <span>Admin Sanctuary</span>
              </Link>

              <div className="mobile-drawer-divider"></div>

              {/* Secondary links */}
              {secondaryLinks.map((subLink, idx) =>
                subLink.onClick ? (
                  <a
                    key={idx}
                    href={subLink.path}
                    onClick={(e) => {
                      subLink.onClick(e);
                      setIsMobileMenuOpen(false);
                    }}
                    className="mobile-drawer-link-item"
                  >
                    {subLink.icon} <span>{subLink.name}</span>
                  </a>
                ) : (
                  <Link
                    key={idx}
                    to={subLink.path}
                    className="mobile-drawer-link-item"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {subLink.icon} <span>{subLink.name}</span>
                  </Link>
                )
              )}

              <Link to="/language" className="mobile-drawer-link-item" onClick={() => setIsMobileMenuOpen(false)}>
                <img src="/languageLogo.png" alt="Choose Language" className="nav-language-logo-img" style={{ width: '22px', height: '22px' }} /> <span>Choose Language</span>
              </Link>

              <div className="mobile-drawer-divider"></div>

              {/* Donate button */}
              <Link to="/donate" className="mobile-drawer-donate-btn" onClick={() => setIsMobileMenuOpen(false)}>
                <Heart size={18} fill="currentColor" /> Donate
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar-card-wrapper {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1200;
          padding: 0;
          box-sizing: border-box;
          transition: all 0.3s ease;
        }

        .navbar-card-wrapper.scrolled {
          top: 0;
        }

        .navbar-card {
          position: relative;
          background: linear-gradient(to bottom, rgba(139, 0, 0, 0.95), rgba(90, 0, 0, 0.98)), url('/assets/maroon_bg.png') center/cover no-repeat;
          border-top: 3px solid #D4AF37;
          border-bottom: 3px solid #D4AF37;
          border-left: none;
          border-right: none;
          border-radius: 0;
          padding: 0.6rem 2rem;
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 100%;
          margin: 0;
          box-sizing: border-box;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.45);
        }

        .nav-card-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          z-index: 10;
        }

        .nav-brand-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .nav-brand-container:hover {
          transform: scale(1.02);
        }

        .nav-brand-logo {
          width: 32px;
          height: 32px;
          object-fit: contain;
        }

        .nav-brand-text {
          display: flex;
          flex-direction: column;
          font-family: 'Outfit', sans-serif;
          line-height: 1.1;
        }

        .brand-main {
          font-size: 1rem;
          font-weight: 700;
          color: #FFD700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .brand-sub {
          font-size: 0.75rem;
          font-weight: 500;
          color: #E2C275;
          text-transform: capitalize;
        }

        .nav-links-desktop-container {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-grow: 1;
          flex-wrap: wrap;
        }

        .nav-card-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: transparent;
          border: none;
          color: #D4AF37;
          text-decoration: none;
          cursor: pointer;
          padding: 0.5rem 1.1rem;
          transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);
          text-align: left;
          border-radius: 8px;
        }

        .nav-card-item:hover {
          transform: translateY(-2px);
          filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.6));
          background: rgba(255, 255, 255, 0.04);
        }

        .nav-item-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .nav-card-item:hover .nav-item-icon {
          transform: scale(1.08);
        }

        .nav-item-text {
          display: flex;
          flex-direction: column;
          font-family: 'Outfit', sans-serif;
          line-height: 1.2;
        }

        .text-line1 {
          font-size: 0.72rem;
          font-weight: 500;
          color: #E2C275;
          text-transform: capitalize;
          opacity: 0.95;
        }

        .text-line2 {
          font-size: 0.92rem;
          font-weight: 700;
          color: #FFD700;
          text-transform: capitalize;
        }

        .navbar-divider {
          width: 1px;
          height: 32px;
          background: linear-gradient(to bottom, transparent, #D4AF37, transparent);
          opacity: 0.55;
          margin: 0 0.5rem;
          flex-shrink: 0;
        }

        .nav-card-dropdown-trigger {
          position: relative;
        }

        .nav-card-dropdown {
          position: absolute;
          top: 105%;
          right: 0;
          width: 210px;
          background: linear-gradient(to bottom, rgba(110, 0, 0, 0.98), rgba(65, 0, 0, 0.98));
          border: 1.5px solid #D4AF37;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          padding: 0.5rem 0;
          z-index: 1001;
        }

        .more-dropdown {
          width: 230px;
        }

        .dropdown-card-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.7rem 1.2rem;
          color: #E2C275;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          font-family: 'Outfit', sans-serif;
          transition: all 0.25s ease;
        }

        .dropdown-card-item:hover {
          background: rgba(212, 175, 55, 0.1);
          color: #FFD700;
          padding-left: 1.5rem;
        }

        .dropdown-card-item svg {
          color: #D4AF37;
        }

        .notification-btn {
          position: relative;
          padding: 0.5rem;
        }

        .note-dot-card {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 8px;
          height: 8px;
          background: #ff4444;
          border-radius: 50%;
          border: 1.5px solid #4b0000;
        }

        .notification-dropdown {
          width: 280px;
          padding: 0.75rem 0;
        }

        .dropdown-card-header {
          padding: 0.5rem 1rem;
          font-weight: 700;
          font-size: 0.85rem;
          color: #FFD700;
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          font-family: 'Outfit', sans-serif;
        }

        .dropdown-card-notes {
          max-height: 200px;
          overflow-y: auto;
        }

        .note-item-card {
          padding: 0.7rem 1rem;
          border-bottom: 1px solid rgba(212, 175, 55, 0.08);
        }

        .note-item-card p {
          font-size: 0.8rem;
          margin-bottom: 0.2rem;
          color: #E2C275;
          line-height: 1.35;
        }

        .note-item-card span {
          font-size: 0.7rem;
          color: rgba(226, 194, 117, 0.5);
        }

        .view-notes-btn {
          display: block;
          padding: 0.5rem;
          text-align: center;
          font-size: 0.8rem;
          color: #FFD700;
          text-decoration: none;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
        }

        .view-notes-btn:hover {
          text-decoration: underline;
        }

        .nav-language-logo-img {
          height: 38px;
          width: auto;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 1px 4px rgba(0,0,0,0.15));
          transition: filter 0.25s ease, transform 0.25s ease;
        }

        .language-btn {
          padding: 0.3rem 0.6rem !important;
          gap: 0 !important;
          min-width: unset !important;
          background: transparent !important;
          border: none !important;
          overflow: hidden !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .language-btn:hover {
          background: rgba(212, 175, 55, 0.08) !important;
          border-radius: 10px !important;
        }

        .language-btn:hover .nav-language-logo-img {
          filter: drop-shadow(0 2px 8px rgba(212, 175, 55, 0.4));
          transform: scale(1.05);
        }

        .nav-donate-pill {
          background: #e67e22;
          color: white;
          padding: 0.5rem 1.2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(230, 126, 34, 0.25);
          border: none;
          font-size: 0.9rem;
          margin-left: auto;
        }

        .nav-donate-pill:hover {
          background: #d35400;
          transform: translateY(-1.5px);
          box-shadow: 0 6px 20px rgba(230, 126, 34, 0.35);
        }

        .mobile-hamburger-btn {
          display: none;
          background: none;
          border: none;
          color: #D4AF37;
          cursor: pointer;
        }

        /* Mobile Drawer */
        .mobile-card-drawer {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: linear-gradient(to bottom, rgba(110, 0, 0, 0.98), rgba(65, 0, 0, 0.99)), url('/assets/maroon_bg.png') center/cover no-repeat;
          border-bottom: 3px solid #D4AF37;
          border-top: 1px solid rgba(212, 175, 55, 0.3);
          border-left: none;
          border-right: none;
          border-radius: 0 0 16px 16px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
          padding: 1.5rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          z-index: 1199;
          max-height: calc(100vh - 120px);
          overflow-y: auto;
        }

        .mobile-drawer-header {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #FFD700;
          border-bottom: 1.5px solid #D4AF37;
          padding-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .mobile-drawer-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-drawer-link-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          color: #E2C275;
          text-decoration: none;
          font-size: 1.05rem;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          transition: all 0.25s ease;
        }

        .mobile-drawer-link-item:hover {
          background: rgba(212, 175, 55, 0.1);
          color: #FFD700;
          padding-left: 1rem;
        }

        .mobile-drawer-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #D4AF37, transparent);
          margin: 0.5rem 0;
          opacity: 0.4;
        }

        .mobile-drawer-donate-btn {
          background: #e67e22;
          color: white;
          padding: 0.85rem;
          border-radius: 50px;
          text-align: center;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(230, 126, 34, 0.3);
          transition: all 0.3s;
        }

        .mobile-drawer-donate-btn:hover {
          background: #d35400;
        }

        /* Large desktop sizing - scale down text if container squeezes */
        @media (max-width: 1300px) {
          .nav-card-item {
            padding: 0.5rem 0.6rem;
            gap: 0.5rem;
          }
          .text-line2 {
            font-size: 0.82rem;
          }
          .text-line1 {
            font-size: 0.65rem;
          }
        }

        @media (max-width: 1100px) {
          .nav-brand-text {
            display: none;
          }
          .navbar-divider:first-of-type {
            display: none;
          }
        }

        @media (max-width: 992px) {
          .nav-links-desktop-container {
            display: none;
          }
          .navbar-divider {
            display: none;
          }
          .mobile-hamburger-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            min-width: 44px;
            min-height: 44px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
