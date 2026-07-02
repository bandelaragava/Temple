import React, { useState } from 'react';
import Hero from '../components/home/Hero';
import DaySchedule from '../components/home/DaySchedule';
import Almanac from '../components/home/Almanac';
import AartiScheduleBanner from '../components/home/AartiScheduleBanner';
import DailyDivineSummary from '../components/home/DailyDivineSummary';
import PopularPoojas from '../components/home/PopularPoojas';
import { motion } from 'framer-motion';
import { Info, Shield, Clock } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SectionHeading = ({ title, subtitle, centered = false }: { title: string, subtitle: string, centered?: boolean }) => (
  <div className={`section-heading ${centered ? 'centered' : ''}`}>
    <span className="subtitle">{subtitle}</span>
    <h2>{title}</h2>
    <div className="divider"></div>
    <style>{`
      .section-heading { margin-bottom: 3rem; }
      .section-heading.centered { text-align: center; }
      .subtitle { 
        background: linear-gradient(to right, var(--secondary), var(--primary), var(--accent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-transform: uppercase; 
        font-weight: 700; 
        letter-spacing: 3px; 
        font-size: 0.95rem; 
      }
      .section-heading h2 { 
        font-size: clamp(1.6rem, 4vw, 2.8rem);
        margin: 0.5rem 0;
        background: linear-gradient(135deg, #1a1a1a 0%, #4b0000 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .divider { 
        width: 120px; 
        height: 4px; 
        background: linear-gradient(to right, var(--secondary), var(--primary), var(--accent), var(--secondary));
        margin-top: 1rem;
        border-radius: 10px;
        background-size: 200% 100%;
        animation: gradient-shift 5s linear infinite;
      }
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
      }
      .centered .divider { margin: 1rem auto; }
    `}</style>
  </div>
);

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [envContent, setEnvContent] = useState(() => {
    const saved = localStorage.getItem('templeEnvContent');
    return saved ? JSON.parse(saved) : {
      videoUrl: 'https://www.youtube.com/embed/S_vT-qV96Yg',
      description: 'Experience the serene and divine environment of our sacred temple through this spiritual glimpse.'
    };
  });

  const [darshanTypes] = useState(() => {
    const saved = localStorage.getItem('darshanTypes');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'Sarva Darshan',
        timings: '06:00 AM - 11:00 PM',
        entryDetails: 'Free for all via Vaikuntam Queue',
        description: 'General darshan for all devotees.',
        liveUpdates: 'Normal Flow',
        peakRushDays: 'Weekends'
      },
    ];
  });

  const [darshanInfo] = useState(() => {
    const saved = localStorage.getItem('darshanInfo');
    return saved ? JSON.parse(saved) : 'Sarva Darshan is available for all devotees. Special entry darshan requires prior booking.';
  });

  const [festivals] = useState(() => {
    const saved = localStorage.getItem('festivals');
    let data = saved ? JSON.parse(saved) : [
      { id: 1, name: 'Annual Brahmotsavam', date: 'Oct 10', duration: '9 Days', status: 'Upcoming', imageUrl: '/assets/annual_brahmotsavam.png' },
      { id: 2, name: 'Vaikuntha Ekadashi', date: 'Jan 02', duration: '1 Day', status: 'Scheduled', imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400' },
    ];

    // Auto-update broken Unsplash URL for Brahmotsavam
    return data.map((f: any) => 
      f.name === 'Annual Brahmotsavam' && f.imageUrl.includes('unsplash.com') 
        ? { ...f, imageUrl: '/assets/annual_brahmotsavam.png' } 
        : f
    );
  });

  const [sevas] = useState(() => {
    const saved = localStorage.getItem('sevas');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Suprabhata Seva', price: '₹ 200', slots: 50, availability: 'Available' },
      { id: 2, name: 'Tomala Seva', price: '₹ 500', slots: 10, availability: 'Full' },
    ];
  });

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/embed/')) return url;
    
    let videoId = '';
    if (url.includes('youtube.com/shorts/')) {
      videoId = url.split('shorts/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div className="home-page">
      <Hero />

      <div className="container">
        <AartiScheduleBanner />
        <DailyDivineSummary />
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
                  <h4>{t('intro_tradition')}</h4>
                  <p>{t('intro_tradition_desc')}</p>
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
            <button className="btn-multi-color" onClick={() => navigate('/gallery')}>Explore Divine Gallery</button>
          </div>
        </div>
      </section>

      <Almanac />
      <DaySchedule />

      <section className="section-padding">
        <div className="container">
          <SectionHeading
            title="Divine Darshan"
            subtitle="Plan Your Visit"
            centered
          />
          <div className="darshan-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="darshan-info-main glass-card" style={{ padding: '2.5rem' }}>
              <h3 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Info size={24} /> General Guidelines
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>{darshanInfo}</p>
              <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={() => navigate('/darshan')}>View Full Details</button>
            </div>

            <div className="darshan-timings-list">
              {darshanTypes.map((type: any) => (
                <div key={type.id} className="timing-item glass-card">
                  <div className="timing-item-header">
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--secondary)' }}>{type.name}</h4>
                      <p style={{ margin: '0.5rem 0', color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '600' }}>
                        <Clock size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> {type.timings}
                      </p>
                    </div>
                    <span className="status-badge-live">
                      {type.liveUpdates || 'Live Status'}
                    </span>
                  </div>

                  <div className="darshan-details-grid">
                    <div>
                      <h5 style={{ margin: '0 0 0.5rem', color: 'var(--primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Entry Details</h5>
                      <p style={{ margin: 0, fontSize: '0.95rem' }}>{type.entryDetails}</p>
                    </div>
                    <div>
                      <h5 style={{ margin: '0 0 0.5rem', color: 'var(--primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Peak Rush</h5>
                      <p style={{ margin: 0, fontSize: '0.95rem' }}>{type.peakRushDays}</p>
                    </div>
                  </div>

                  <div className="timing-item-desc">
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{type.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="seva-list-home" style={{ marginTop: '4rem', padding: '3rem', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '2.5rem', color: 'var(--secondary)' }}>Available Sevas</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {sevas.map((seva: any) => (
                <div key={seva.id} className="seva-mini-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', borderLeft: '3px solid var(--secondary)' }}>
                  <span style={{ fontWeight: '600' }}>{seva.name}</span>
                  <span style={{ color: 'var(--secondary)', fontWeight: '700' }}>{seva.price}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <button className="btn-multi-color" onClick={() => navigate('/booking')}>Book Seva Now</button>
            </div>
          </div>
        </div>
      </section>

      <PopularPoojas />

      <section className="section-padding marble-bg">
        <div className="container">
          <SectionHeading
            title="Festival Calendar"
            subtitle="Celestial Celebrations"
            centered
          />
          <div className="festivals-row" style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '2rem', scrollbarWidth: 'none' }}>
            {festivals.map((fest: any) => (
              <div key={fest.id} className="fest-card glass-card" style={{ minWidth: '320px', padding: 0, textAlign: 'center', overflow: 'hidden' }}>
                <div style={{ height: '180px', position: 'relative' }}>
                  <img src={fest.imageUrl} alt={fest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    <span style={{ padding: '0.4rem 1rem', background: 'var(--primary)', color: 'white', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '700', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                      {fest.status}
                    </span>
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--secondary)', fontWeight: '700' }}>{fest.date}</div>
                  <h3 style={{ margin: '0.5rem 0', fontSize: '1.4rem' }}>{fest.name}</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: 0, fontSize: '0.9rem' }}>Duration: {fest.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding gallery-preview marble-bg">
        <div className="container">
          <SectionHeading
            title="Temple Environment"
            subtitle="Spiritual Sanctum"
            centered
          />
          <div className="live-preview-card">
            <div className="live-badge">LIVE</div>
            <iframe
              width="100%"
              height="100%"
              src={getEmbedUrl(envContent.videoUrl)}
              title="Temple Live Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ borderRadius: '24px' }}
            ></iframe>
            <div className="live-content">
              <h4>Virtual Experience</h4>
              <p>{envContent.description}</p>
              <button className="btn-glass" onClick={() => navigate('/darshan')}>Go to Darshan</button>
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
          padding: clamp(3rem, 6vw, 6.5rem) 0;
        }

        .marble-bg {
          background-color: transparent;
        }

        .darshan-timings-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .timing-item {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .timing-item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1.5rem;
        }

        .status-badge-live {
          padding: 0.5rem 1.2rem;
          background: rgba(255, 153, 51, 0.1);
          color: var(--secondary);
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.85rem;
          border: 1px solid rgba(255, 153, 51, 0.3);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .darshan-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          border-top: 1px solid var(--glass-border);
          padding-top: 1.5rem;
        }

        .timing-item-desc {
          background: rgba(0,0,0,0.05);
          padding: 1rem;
          border-radius: 12px;
          border-left: 4px solid var(--secondary);
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
          height: clamp(260px, 40vw, 450px);
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
          .gallery-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 250px;
          }
          .gallery-item.large {
            grid-row: span 1;
          }
        }

        @media (max-width: 768px) {
          .image-stack img { height: 380px; }
          .experience-badge { bottom: -1rem; padding: 1rem; right: 0; }
          .experience-badge .years { font-size: 1.8rem; }
          .experience-badge .text { font-size: 0.7rem; }
          .lead { font-size: 1.1rem; }
          .live-content { padding: 1.5rem; }
          .seva-list-home { padding: 2rem 1.5rem !important; }
          .timing-item { padding: 1.25rem; }
        }

        @media (max-width: 500px) {
          .timing-item-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
          .status-badge-live {
            align-self: flex-start;
          }
        }

        @media (max-width: 480px) {
          .image-stack img { height: 260px; border-radius: 20px; }
          .feature-item { gap: 1rem; }
          .feature-item .icon { width: 48px; height: 48px; flex-shrink: 0; }
          .gallery-grid { gap: 1rem; grid-auto-rows: 200px; }
          .gallery-overlay span { font-size: 1rem; }
          .live-content h4 { font-size: 1.1rem; }
          .live-content p { font-size: 0.82rem; }
          .experience-badge { position: static; margin-top: 1rem; border-radius: 12px; }
          .darshan-details-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Home;
