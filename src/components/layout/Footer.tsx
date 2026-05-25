import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Facebook, Twitter, Instagram, Youtube } from '../common/SocialIcons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-top section-padding">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="f-logo">
              <span className="logo-icon">🛕</span>
              <div className="logo-text">
                <span className="temple-name">Sri Govindha Raja Swami Temple</span>
                <span className="temple-tag">The Divine Heart of Tirupati</span>
              </div>
            </Link>
            <p className="f-desc">Sri Govindha Raja Swamy Devasthanam stands as a beacon of spiritual solace and cultural heritage in Hyderabad. Dedicated to preserving ancient Vedic traditions and fostering social harmony.</p>
            <div className="social-links">
              <a href="https://facebook.com/temple" target="_blank" rel="noopener noreferrer" className="social-btn"><Facebook size={20} /></a>
              <a href="https://twitter.com/temple" target="_blank" rel="noopener noreferrer" className="social-btn"><Twitter size={20} /></a>
              <a href="https://instagram.com/temple" target="_blank" rel="noopener noreferrer" className="social-btn"><Instagram size={20} /></a>
              <a href="https://youtube.com/temple" target="_blank" rel="noopener noreferrer" className="social-btn"><Youtube size={20} /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Temple</Link></li>
              <li><Link to="/darshan">Darshan Timings</Link></li>
              <li><Link to="/booking">Book Darshan</Link></li>
              <li><Link to="/rituals">Rituals & Timeline</Link></li>
              <li><Link to="/gallery">Photo Gallery</Link></li>
              <li><Link to="/festivals">Upcoming Festivals</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Reach Out</h4>
            <ul>
              <li><Link to="/donate">Donate Now</Link></li>
              <li><Link to="/store">Temple Store</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4>Stay Connected</h4>
            <p>Subscribe to our newsletter for daily updates and festival schedules.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" />
              <button type="submit" onClick={() => alert("Thank you for subscribing!")}><ArrowRight size={20} /></button>
            </form>
            <div className="contact-info">
              <div className="info-item">
                <Phone size={18} />
                <span>+91 1234 567 890</span>
              </div>
              <div className="info-item">
                <Mail size={18} />
                <span>info@templeexample.in</span>
              </div>
              <div className="info-item">
                <MapPin size={18} />
                <span>Main Road, Temple City, HYD.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-content">
          <p>© {currentYear} Sri Govindha Raja Swami Temple. All Rights Reserved.</p>
          <span className="bottom-separator"></span>
          <div className="dev-credit">
            Developed by{' '}
            <a
              href="https://www.futureinvosolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="dev-credit-link"
            >
              Future Invo Solutions
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: #4b0000;
          border-top: 3px solid var(--accent);
          border-image: linear-gradient(to right, transparent, var(--accent), var(--sacred-gold), var(--accent), transparent) 1;
          margin-top: 4rem;
          position: relative;
          color: white;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 0.8fr 1.2fr;
          gap: 4rem;
          text-align: center; /* Center all text globally */
        }

        .f-logo {
          display: flex;
          align-items: center;
          justify-content: center; /* Center logo */
          gap: 0.8rem;
          color: var(--accent);
          margin-bottom: 1.5rem;
          text-decoration: none;
        }

        .f-desc {
          color: rgba(255, 255, 255, 0.8);
          margin: 0 auto 2rem; /* Center description block */
          max-width: 300px;
        }

        .social-links {
          display: flex;
          justify-content: center; /* Center social icons */
          gap: 1rem;
        }

        .social-btn {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: white;
          transition: var(--transition);
        }

        .social-btn:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-3px);
        }

        .footer-links h4, .footer-newsletter h4 {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: var(--accent);
          letter-spacing: 0.5px;
          text-align: center; /* Explicitly center headings */
        }
        
        .footer-newsletter p {
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1rem;
        }

        .footer-links ul {
          list-style: none;
          padding: 0;
        }

        .footer-links li {
          margin-bottom: 0.8rem;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          text-decoration: none;
          transition: var(--transition);
          display: inline-block;
        }

        .footer-links a:hover {
          color: var(--primary);
          transform: translateY(-2px); /* Switched from padding-left to vertical lift for centered layout */
        }

        .newsletter-form {
          display: flex;
          background: rgba(255,255,255,0.05);
          padding: 0.4rem;
          border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 2rem;
          margin-top: 1rem;
          max-width: 300px;
          margin-left: auto;
          margin-right: auto; /* Center the form input */
        }

        .newsletter-form input {
          flex: 1;
          border: none;
          padding: 0 1rem;
          outline: none;
          background: transparent;
          color: white;
          text-align: center; /* Center input placeholder text */
        }
        
        .newsletter-form input::placeholder {
          color: rgba(255,255,255,0.5);
        }

        .newsletter-form button {
          background: var(--primary);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          border: none;
          cursor: pointer;
        }

        .newsletter-form button:hover {
          background: var(--primary-hover);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center; /* Center contact list */
        }

        .info-item {
          display: flex;
          align-items: center;
          justify-content: center; /* Center icon + text */
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
        }

        .footer-bottom {
          padding: 1.5rem 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          background: rgba(0,0,0,0.2);
        }

        .bottom-content {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: nowrap;
          gap: 15rem;
        }

        .bottom-content p {
          white-space: nowrap;
          margin: 0;
          flex-shrink: 0;
        }

        .bottom-separator {
          color: rgba(255, 255, 255, 0.3);
          font-size: 1rem;
          flex-shrink: 0;
          user-select: none;
        }

        .dev-credit {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.3px;
        }

        .dev-credit-link {
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease, text-shadow 0.2s ease;
        }

        .dev-credit-link:hover {
          color: #FFD700;
          text-shadow: 0 0 8px rgba(212, 175, 55, 0.5);
          text-decoration: underline;
        }

        /* Responsive Breakpoints */
        
        /* Tablet Landscape & Small Laptop */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
        }

        /* Tablet Portrait */
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .bottom-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          .footer-brand {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .social-links {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .footer-top { padding: 2.5rem 0 !important; }
          .social-btn { width: 44px; height: 44px; }
          .newsletter-form { max-width: 100%; }
          .footer-links h4, .footer-newsletter h4 { font-size: 1.1rem; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
