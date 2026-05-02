import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, User, Heart, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isNoteMenuOpen, setIsNoteMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('userData');
    return saved ? JSON.parse(saved) : { notifications: [] };
  });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Darshan', path: '/darshan' },
    { name: 'Booking', path: '/booking' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Festivals', path: '/festivals' },
    { name: 'E-Hundi', path: '/e-hundi' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        {/* Desktop Menu */}
        <div className="nav-links-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}

          <Link to="/language" className="icon-link"><Globe size={20} /></Link>
          
          {isLoggedIn && (
            <div 
              className="profile-container"
              onMouseEnter={() => setIsNoteMenuOpen(true)}
              onMouseLeave={() => setIsNoteMenuOpen(false)}
            >
              <button className="icon-link-btn">
                <Bell size={20} />
                {userData.notifications?.some((n: any) => n.unread) && <span className="note-dot"></span>}
              </button>
              <AnimatePresence>
                {isNoteMenuOpen && (
                  <motion.div 
                    className="profile-dropdown glass-card"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    style={{ width: '300px' }}
                  >
                    <div className="dropdown-header">
                      <span>Recent Notifications</span>
                    </div>
                    <div className="dropdown-notes">
                      {(userData.notifications || []).slice(0, 3).map((note: any) => (
                        <div key={note.id} className="note-item-mini">
                          <p>{note.message}</p>
                          <span>{note.time}</span>
                        </div>
                      ))}
                    </div>
                    <Link to="/account" className="view-all-notes" onClick={() => setIsNoteMenuOpen(false)}>
                      View All Notifications
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div 
            className="profile-container"
            onMouseEnter={() => setIsAccountMenuOpen(true)}
            onMouseLeave={() => setIsAccountMenuOpen(false)}
          >
            <Link to="/account" className="icon-link"><User size={20} /></Link>
            <AnimatePresence>
              {isAccountMenuOpen && (
                <motion.div 
                  className="profile-dropdown glass-card"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                >
                  <Link to="/account" className="dropdown-item" onClick={() => setIsAccountMenuOpen(false)}>
                    <User size={16} /> Devotee Portal
                  </Link>
                  <Link to="/admin" className="dropdown-item" onClick={() => setIsAccountMenuOpen(false)}>
                    <Heart size={16} /> Admin Sanctuary
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/donate" className="donate-btn">
            <Heart size={18} fill="currentColor" />
            <span>Donate Now</span>
          </Link>
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
            
            <div className="mobile-divider"></div>
            
            <Link to="/language" onClick={() => setIsMobileMenuOpen(false)}>
              <Globe size={18} style={{ marginRight: '8px', display: 'inline' }} /> Language
            </Link>
            
            <Link to="/account" onClick={() => setIsMobileMenuOpen(false)}>
              <User size={18} style={{ marginRight: '8px', display: 'inline' }} /> Devotee Portal
            </Link>
            
            <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
              <Heart size={18} style={{ marginRight: '8px', display: 'inline' }} /> Admin Sanctuary
            </Link>

            <Link to="/donate" className="donate-btn-mobile" onClick={() => setIsMobileMenuOpen(false)}>
              Donate Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: sticky;
          top: 40px;
          left: 0;
          width: 100%;
          max-width: 100%;
          z-index: 1200;
          background: rgba(75, 0, 0, 0.95); /* Deep Maroon with glass effect */
          backdrop-filter: blur(15px);
          transition: all 0.3s ease;
          color: white;
          border-bottom: 2px solid var(--accent);
          border-image: linear-gradient(to right, transparent, var(--sacred-gold), transparent) 1;
        }

        .navbar.scrolled {
          background: #4b0000;
          padding: 0.2rem 0;
        }

        .nav-content {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.8rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: clamp(1.2rem, 2vw, 2.8rem); /* Fluid gap: stays proportional 1024px-1920px */
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.05rem;
          position: relative;
          transition: color 0.3s ease;
          font-family: 'Outfit', sans-serif;
        }

        .nav-link:hover {
          color: #d4af37;
        }

        .nav-link.active {
          color: white;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 3px;
          background: #d4af37;
          border-radius: 2px;
        }

        .icon-link {
          color: white;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
        }

        .icon-link:hover {
          color: #d4af37;
        }

        .donate-btn {
          background: #e67e22; /* Vibrant Orange Pill Button */
          color: white;
          padding: 0.7rem 1.8rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(230, 126, 34, 0.3);
          border: none;
        }

        .donate-btn:hover {
          background: #d35400;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(230, 126, 34, 0.4);
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .nav-links-desktop {
            display: none;
          }
          .mobile-menu-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            min-width: 44px;
            min-height: 44px;
          }
          .nav-content {
            justify-content: flex-end;
            padding: 0.6rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .nav-content {
            padding: 0.5rem 0.75rem;
          }
        }

        .mobile-menu {
          background: #4b0000;
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          position: absolute;
          width: 100%;
          left: 0;
          top: 100%;
          max-height: calc(100vh - 100px);
          overflow-y: auto;
          z-index: 1199;
        }

        .mobile-menu a {
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          padding: 0.4rem 0.5rem;
        }

        .mobile-divider {
          height: 1px;
          background: rgba(255,255,255,0.1);
          margin: 0.5rem 0;
        }

        .donate-btn-mobile {
          background: #e67e22;
          color: white;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          font-weight: 700;
        }
        .profile-container {
          position: relative;
          padding: 0.5rem 0;
        }

        .profile-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: 220px;
          background: rgba(75, 0, 0, 0.98);
          border: 1px solid var(--accent);
          padding: 1rem 0;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          z-index: 1001;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.8rem 1.5rem;
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .dropdown-item:hover {
          background: rgba(212, 175, 55, 0.1);
          color: #d4af37;
        }

        .dropdown-item svg {
          color: var(--sacred-gold);
        }

        .icon-link-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.3s;
        }
        .icon-link-btn:hover { color: #d4af37; }

        .note-dot {
          position: absolute;
          top: 5px;
          right: -2px;
          width: 8px;
          height: 8px;
          background: #ff4444;
          border-radius: 50%;
          border: 2px solid #4b0000;
        }

        .dropdown-header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--sacred-gold);
        }

        .dropdown-notes {
          max-height: 250px;
          overflow-y: auto;
        }

        .note-item-mini {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .note-item-mini p {
          font-size: 0.85rem;
          line-height: 1.4;
          margin-bottom: 0.25rem;
          color: white;
        }
        .note-item-mini span {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.5);
        }

        .view-all-notes {
          display: block;
          padding: 1rem;
          text-align: center;
          font-size: 0.85rem;
          color: var(--sacred-gold);
          text-decoration: none;
          font-weight: 600;
        }
        .view-all-notes:hover { text-decoration: underline; }

        @media (max-width: 992px) {
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
