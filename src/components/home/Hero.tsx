import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Ticket, Heart, Clock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const quickActions = [
    { icon: <Clock size={20} />, label: t('nav_darshan') || 'Darshan', color: '#FF9933', path: '/darshan' },
    { icon: <Ticket size={20} />, label: t('nav_booking') || 'Booking', color: '#D4AF37', path: '/booking' },
    { icon: <Calendar size={20} />, label: t('nav_festivals') || 'Festivals', color: '#800000', path: '/festivals' },
    { icon: <Heart size={20} />, label: t('nav_ehundi') || 'E-Hundi', color: '#FF5E5E', path: '/donate' },
  ];

  return (
    <section className="hero">
      <div className="hero-video-bg">
        {/* Placeholder for high-res temple video/image */}
        <div className="hero-overlay"></div>
        <img
          src="/assets/hero_temple.png"
          alt="Temple"
          className="hero-media"
        />
      </div>

      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <span className="hero-badge">
            <Shield size={14} />
            {t('hero_badge')}
          </span>
          <h1>{t('hero_title')}</h1>
          <p className="lead" style={{ color: 'rgba(255, 255, 255, 0.85)', fontWeight: 300 }}>
            {t('hero_subtitle')}
          </p>

          <div className="hero-btns">
            <button className="btn-primary lg" onClick={() => navigate('/darshan')}>{t('nav_darshan')} 🎥</button>
            <button className="btn-secondary" onClick={() => navigate('/booking')}>{t('btn_explore')}</button>
          </div>
        </motion.div>

        <motion.div
          className="quick-actions-grid"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {quickActions.map((action, index) => (
            <div 
              key={index} 
              className="quick-action-card glass-card"
              onClick={() => navigate(action.path)}
            >
              <div className="action-icon" style={{ backgroundColor: action.color }}>
                {action.icon}
              </div>
              <span>{action.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          color: white;
          overflow: hidden;
        }

        .hero-video-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        .hero-media {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.1);
          animation: slowZoom 20s infinite alternate;
        }

        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2));
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-text h1 {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }

        .hero-text p {
          font-size: 1.2rem;
          max-width: 600px;
          margin-bottom: 2.5rem;
          opacity: 0.9;
        }

        .hero-badge {
          display: inline-block;
          padding: 0.5rem 1.25rem;
          background: rgba(255, 153, 51, 0.2);
          border: 1px solid var(--primary);
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: var(--primary);
        }

        .hero-btns {
          display: flex;
          gap: 1.5rem;
        }

        .btn-secondary {
          border: 2px solid white;
          color: white;
          padding: 0.8rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          transition: var(--transition);
        }

        .btn-secondary:hover {
          background: white;
          color: black;
        }

        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 380px;
          margin-left: auto;
        }

        .quick-action-card {
          padding: 1.3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          text-align: center;
          transition: var(--transition);
          cursor: pointer;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(12px);
          border-radius: 16px;
        }

        .quick-action-card span {
          font-size: 0.85rem;
          font-weight: 500;
        }

        .quick-action-card:hover {
          transform: translateY(-5px) scale(1.02);
          background: white;
          box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }

        .quick-action-card:hover span {
          color: var(--secondary);
          font-weight: 600;
        }

        .action-icon {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }

        .mouse {
          width: 26px;
          height: 42px;
          border: 2px solid white;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          padding-top: 8px;
        }

        .wheel {
          width: 4px;
          height: 8px;
          background: white;
          border-radius: 2px;
          animation: scrollDown 2s infinite;
        }

        @keyframes scrollDown {
          0% { opacity: 0; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(6px); }
          100% { opacity: 0; transform: translateY(12px); }
        }

        @media (max-width: 992px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-text {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-btns {
            justify-content: center;
          }
          .quick-actions-grid {
            margin-top: 3rem;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
