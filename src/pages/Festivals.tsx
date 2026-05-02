import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Bell, Users, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Festivals = () => {
  const { t } = useTranslation();
  const mainFestivals = [
    {
      title: t('fest_brahmotsavam'),
      month: t('month_may'),
      duration: t('duration_9days'),
      desc: t('fest_brahmotsavam_desc'),
      image: "/assets/hero_temple.png"
    },
    {
      title: t('fest_teppotsavam'),
      month: t('month_april'),
      duration: t('duration_5days'),
      desc: t('fest_teppotsavam_desc'),
      image: "/assets/live_darshan.png"
    },
    {
      title: t('fest_vaikuntha'),
      month: t('month_dec_jan'),
      duration: t('duration_48hrs'),
      desc: t('fest_vaikuntha_desc'),
      image: "/assets/temple_rituals.png"
    },
    {
      title: t('fest_ramanuja'),
      month: t('month_april'),
      duration: t('duration_10days'),
      desc: t('fest_ramanuja_desc'),
      image: "/assets/ramanujacharya_temple.png"
    }
  ];

  return (
    <div className="festivals-page section-padding">
      <div className="container">
        <div className="page-header centered">
          <span className="modern-badge">{t('fest_badge')}</span>
          <h1>{t('fest_title')}</h1>
          <p>{t('fest_desc')}</p>
        </div>

        <div className="festivals-grid">
          {mainFestivals.map((fest, i) => (
            <motion.div
              key={i}
              className="fest-card glass-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="fest-img">
                <img src={fest.image} alt={fest.title} />
                <div className="fest-time-pill">
                  <Calendar size={14} /> {fest.month}
                </div>
              </div>
              <div className="fest-content">
                <span className="duration">{fest.duration} {t('label_duration')}</span>
                <h3>{fest.title}</h3>
                <p>{fest.desc}</p>
                <div className="fest-meta">
                  <span><Bell size={14} /> {t('label_rituals')}</span>
                  <span><Users size={14} /> {t('label_procession')}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="location-info glass-card mt-4">
          <div className="info-flex">
            <div className="icon-circle"><MapPin size={24} /></div>
            <div>
              <h3>{t('fest_route_title')}</h3>
              <p>{t('fest_route_desc')}</p>
            </div>
            <button className="btn-secondary">View Event Map</button>
          </div>
        </div>
      </div>

      <style>{`
        .festivals-page {
          margin-top: 30px;
        }

        .festivals-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem;
          margin-bottom: 4rem;
        }

        .fest-card {
          padding: 0;
          overflow: hidden;
          transition: transform 0.4s ease;
        }

        .fest-card:hover { border-color: var(--primary); }

        .fest-img {
          height: 300px;
          position: relative;
        }

        .fest-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .fest-time-pill {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: var(--primary);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .fest-content {
          padding: 2.5rem;
        }

        .duration {
          color: var(--primary);
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .fest-content h3 {
          font-size: clamp(1.2rem, 3vw, 1.5rem);
          margin: 0.75rem 0 1rem;
          color: var(--secondary);
        }

        .fest-content p {
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .fest-meta {
          display: flex;
          gap: 1.5rem;
          border-top: 1px solid rgba(0,0,0,0.05);
          padding-top: 1.5rem;
        }

        .fest-meta span {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--secondary);
        }

        .location-info {
          padding: 2.5rem;
        }

        .info-flex {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .icon-circle {
          width: 60px;
          height: 60px;
          background: var(--marble);
          color: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-flex h3 { color: var(--secondary); margin-bottom: 0.25rem; }
        .info-flex p { color: var(--text-muted); font-size: 0.95rem; }

        @media (max-width: 900px) {
          .festivals-grid { grid-template-columns: 1fr; }
          .info-flex { flex-direction: column; text-align: center; }
          .info-flex .btn-secondary { width: 100%; }
        }

        @media (max-width: 600px) {
          .fest-img { height: 220px; }
          .fest-content { padding: 1.5rem; }
          .page-header h1 { font-size: 2rem; }
          .location-info { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default Festivals;
