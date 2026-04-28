import Hero from '../components/home/Hero';
import DaySchedule from '../components/home/DaySchedule';
import Almanac from '../components/home/Almanac';
import AartiCountdown from '../components/home/AartiCountdown';
import { motion } from 'framer-motion';
import { Info, Shield } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const SectionHeading = ({ title, subtitle, centered = false }: { title: string, subtitle: string, centered?: boolean }) => (
  <div className={`section-heading ${centered ? 'centered' : ''}`}>
    <span className="subtitle">{subtitle}</span>
    <h2>{title}</h2>
    <div className="divider"></div>
    <style>{`
      .section-heading { margin-bottom: 3rem; }
      .section-heading.centered { text-align: center; }
      .subtitle { 
        color: var(--primary); 
        text-transform: uppercase; 
        font-weight: 600; 
        letter-spacing: 2px; 
        font-size: 0.9rem; 
      }
      .section-heading h2 { font-size: 2.5rem; margin: 0.5rem 0; }
      .divider { 
        width: 80px; 
        height: 4px; 
        background: var(--primary); 
        margin-top: 1rem;
        border-radius: 2px;
      }
      .centered .divider { margin: 1rem auto; }
    `}</style>
  </div>
);

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Hero />

      <div className="container">
        <AartiCountdown />
      </div>

      <section className="section-padding temple-intro">
        <div className="container grid-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="intro-image"
          >
            <div className="image-stack">
              <img src="/assets/main_govindaraja.png" alt="Main Deity" />
              <div className="experience-badge glass-card">
                <span className="years">1000+</span>
                <span className="text">{t('intro_heritage_years')}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="intro-text"
          >
            <SectionHeading
              title={t('intro_title')}
              subtitle={t('intro_subtitle')}
            />
            <p className="lead">{t('intro_p1')}</p>
            <p>{t('intro_p2')}</p>

            <div className="intro-features">
              <div className="feature-item">
                <div className="icon"><Shield size={24} /></div>
                <div>
                  <h4>{t('intro_sanctity')}</h4>
                  <p>{t('intro_sanctity_desc')}</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="icon"><Info size={24} /></div>
                <div>
                  <h4>{t('intro_knowledge')}</h4>
                  <p>{t('intro_knowledge_desc')}</p>
                </div>
              </div>
            </div>

            <button className="btn-primary" onClick={() => navigate('/about')}>{t('intro_learn_history')}</button>
          </motion.div>
        </div>
      </section>

      <section className="section-padding gallery-preview">
        <div className="container">
          <SectionHeading
            title="Divine Gallery"
            subtitle="Spiritual Glimpses"
            centered
          />
          <div className="gallery-grid">
            <motion.div whileHover={{ scale: 1.05 }} className="gallery-item large">
              <img src="/assets/hero_temple.png" alt="Gopuram" />
              <div className="gallery-overlay"><span>Temple Architecture</span></div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="gallery-item">
              <img src="/assets/temple_rituals.png" alt="Rituals" />
              <div className="gallery-overlay"><span>Daily Rituals</span></div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="gallery-item">
              <img src="/assets/main_deity.png" alt="Sanctum" />
              <div className="gallery-overlay"><span>Main Sanctum</span></div>
            </motion.div>
          </div>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <button className="btn-secondary" onClick={() => navigate('/gallery')}>View Full Gallery</button>
          </div>
        </div>
      </section>

      <Almanac />
      <DaySchedule />

      <section className="section-padding gallery-preview marble-bg">
        <div className="container">
          <SectionHeading
            title="Temple Environment"
            subtitle="Spiritual Sanctum"
            centered
          />
          <div className="live-preview-card">
            <div className="live-badge">LIVE</div>
            <img src="/assets/live_darshan.png" alt="Live" />
            <div className="live-content">
              <h4>Virtual Darshan</h4>
              <p>Join the evening aarti from anywhere in the world.</p>
              <button className="btn-glass" onClick={() => navigate('/darshan')}>Watch Now</button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        /* Previous styles... */
        
        .gallery-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-auto-rows: 300px;
          gap: 1.5rem;
        }

        .gallery-item {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          height: 100%;
        }

        .gallery-item.large {
          grid-row: span 2;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          display: block;
          transition: transform 0.8s cubic-bezier(0.2, 0, 0.2, 1);
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          padding: 2rem;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          color: white;
          opacity: 0;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .gallery-overlay span {
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: 1px;
          border-bottom: 2px solid var(--primary);
          padding-bottom: 0.5rem;
        }

        .gallery-item:hover .gallery-overlay { opacity: 1; }
        .gallery-item:hover img { transform: scale(1.1); }

        .temple-intro {
          padding: 6.5rem 0;
        }

        .marble-bg {
          background-color: transparent;
        }

        .timings-card {
          padding: 3rem;
        }

        .timings-card h3 {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          color: var(--secondary);
        }

        .timings-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .time-row {
          display: flex;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .live-preview-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          height: 400px;
        }

        .live-preview-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .live-badge {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          background: #ff0000;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .live-badge::before {
          content: '';
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        .live-content {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 3rem;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
          color: white;
        }

        .btn-glass {
          margin-top: 1.5rem;
          padding: 0.75rem 1.5rem;
          border: 1px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(5px);
          color: white;
          border-radius: 50px;
          font-weight: 600;
        }

        .intro-image {
          display: flex;
          justify-content: center;
        }

        .image-stack {
          position: relative;
          padding-bottom: 2rem;
        }

        .image-stack img {
          width: 100%;
          height: 650px;
          object-fit: cover;
          object-position: center 20%;
          border-radius: 30px;
          box-shadow: 20px 20px 60px rgba(0,0,0,0.1);
        }

        .experience-badge {
          position: absolute;
          bottom: 0;
          right: -2rem;
          padding: 2rem;
          background: var(--secondary);
          color: white;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .experience-badge .years {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1;
        }

        .experience-badge .text {
          font-size: 0.8rem;
          max-width: 100px;
          opacity: 0.9;
        }

        .lead {
          font-size: 1.25rem;
          color: var(--text);
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        .intro-text p {
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        .intro-features {
          display: grid;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .feature-item {
          display: flex;
          gap: 1.5rem;
        }

        .feature-item .icon {
          width: 60px;
          height: 60px;
          background: var(--marble);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          flex-shrink: 0;
        }

        .feature-item h4 {
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
        }

        @media (max-width: 992px) {
          .grid-2 {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .experience-badge {
            right: 0;
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
