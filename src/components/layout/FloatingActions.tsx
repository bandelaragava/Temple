import React, { useState, useEffect } from 'react';
import { Calendar, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const FloatingActions = () => {
  const { t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="floating-actions">
      <Link to="/booking" className="fab fab-booking">
        <Calendar size={24} />
        <span className="fab-text">{t('fab_quick_booking')}</span>
      </Link>
      
      <button 
        className={`fab fab-scroll ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
      >
        <ChevronUp size={24} />
      </button>

      <style>{`
        .floating-actions {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 999;
        }

        .fab {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transition: var(--transition);
          position: relative;
          cursor: pointer;
        }

        .fab-booking {
          background: var(--secondary);
          width: auto;
          padding: 0 1.5rem;
          border-radius: 50px;
          gap: 0.75rem;
        }

        .fab-booking:hover {
          transform: scale(1.05) translateY(-5px);
          background: #A00000;
        }

        .fab-text {
          font-weight: 700;
          font-size: 0.9rem;
          white-space: nowrap;
        }

        .fab-scroll {
          background: var(--accent);
          color: var(--secondary);
          width: 50px;
          height: 50px;
          opacity: 0;
          pointer-events: none;
          transform: translateY(20px);
        }

        .fab-scroll.visible {
          opacity: 1;
          pointer-events: all;
          transform: translateY(0);
        }

        .fab-scroll:hover {
          transform: scale(1.1);
          background: #E5C352;
        }

        @media (max-width: 768px) {
          .fab-text { display: none; }
          .fab-booking { width: 56px; padding: 0; border-radius: 50%; }
        }
      `}</style>
    </div>
  );
};

export default FloatingActions;
