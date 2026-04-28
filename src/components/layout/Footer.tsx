import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Facebook, Twitter, Instagram, Youtube } from '../common/SocialIcons';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-top section-padding">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="f-logo">
              <span className="logo-icon">🛕</span>
              <div className="logo-text">
                <span className="temple-name">{t('temple_name')}</span>
                <span className="temple-tag">{t('temple_tag')}</span>
              </div>
            </Link>
            <p className="f-desc">{t('footer_desc')}</p>
            <div className="social-links">
              <a href="https://facebook.com/temple" target="_blank" rel="noopener noreferrer" className="social-btn"><Facebook size={20} /></a>
              <a href="https://twitter.com/temple" target="_blank" rel="noopener noreferrer" className="social-btn"><Twitter size={20} /></a>
              <a href="https://instagram.com/temple" target="_blank" rel="noopener noreferrer" className="social-btn"><Instagram size={20} /></a>
              <a href="https://youtube.com/temple" target="_blank" rel="noopener noreferrer" className="social-btn"><Youtube size={20} /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>{t('quick_links')}</h4>
            <ul>
              <li><Link to="/about">{t('nav_about')}</Link></li>
              <li><Link to="/darshan">{t('darshan_timings')}</Link></li>
              <li><Link to="/booking">{t('nav_booking')}</Link></li>
              <li><Link to="/rituals">{t('ritual_timeline')}</Link></li>
              <li><Link to="/gallery">{t('nav_gallery')}</Link></li>
              <li><Link to="/festivals">{t('nav_festivals')}</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>{t('reach_out')}</h4>
            <ul>
              <li><Link to="/donate">{t('donate_now') || t('nav_donate')}</Link></li>
              <li><Link to="/volunteer">{t('nav_volunteer')}</Link></li>
              <li><Link to="/contact">{t('nav_contact')}</Link></li>
              <li><Link to="/faq">{t('nav_faq')}</Link></li>
              <li><Link to="/privacy">{t('nav_privacy')}</Link></li>
              <li><Link to="/terms">{t('nav_terms')}</Link></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4>{t('stay_connected_footer')}</h4>
            <p>{t('newsletter_desc')}</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder={t('placeholder_email')} />
              <button type="submit" onClick={() => alert(t('alert_subscribed'))}><ArrowRight size={20} /></button>
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
          <p>&copy; {currentYear} Sri Govindha Raja Swamy Devasthanam. {t('all_rights_reserved')}.</p>
          <div className="dev-credit">
            {t('dev_credit')}
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--bg-offset);
          border-top: 1px solid var(--marble);
          margin-top: 4rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 0.8fr 1.2fr;
          gap: 4rem;
        }

        .f-logo {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: var(--secondary);
          margin-bottom: 1.5rem;
        }

        .f-desc {
          color: var(--text-muted);
          margin-bottom: 2rem;
          max-width: 300px;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-btn {
          width: 40px;
          height: 40px;
          background: var(--marble);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: var(--text);
          transition: var(--transition);
        }

        .social-btn:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-3px);
        }

        .footer-links h4, .footer-newsletter h4 {
          font-family: var(--font-main);
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: var(--text);
        }

        .footer-links ul {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: 0.75rem;
        }

        .footer-links a {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .footer-links a:hover {
          color: var(--primary);
          padding-left: 5px;
        }

        .newsletter-form {
          display: flex;
          background: white;
          padding: 0.5rem;
          border-radius: 50px;
          border: 1px solid var(--marble);
          margin-bottom: 2rem;
        }

        .newsletter-form input {
          flex: 1;
          border: none;
          padding: 0 1rem;
          outline: none;
          background: transparent;
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
        }

        .newsletter-form button:hover {
          background: var(--secondary);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .footer-bottom {
          padding: 2rem 0;
          border-top: 1px solid var(--marble);
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .bottom-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
