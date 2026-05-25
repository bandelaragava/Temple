import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DaySchedule = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('daily');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute to check "Live" status
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const cmsRituals = localStorage.getItem('dailyRituals');
  const parsedRituals = cmsRituals ? JSON.parse(cmsRituals).map((r: any) => ({
    id: r.id, start: r.time.split(' - ')[0] || r.time, end: r.time.split(' - ')[1] || '23:59', seva: r.name, desc: r.desc || ''
  })) : null;

  const cmsWeekly = localStorage.getItem('weeklyRituals');
  const parsedWeekly = cmsWeekly ? JSON.parse(cmsWeekly) : null;

  const scheduleData = {
    daily: parsedRituals || [
      { id: 1, start: '03:00', end: '03:30', seva: t('seva_suprabhata'), desc: t('seva_suprabhata_desc') },
      { id: 2, start: '03:30', end: '04:30', seva: t('seva_tomala'), desc: t('seva_tomala_desc') },
      { id: 3, start: '04:30', end: '05:00', seva: t('seva_koluva'), desc: t('seva_koluva_desc') },
      { id: 4, start: '05:00', end: '06:00', seva: t('seva_sahasra'), desc: t('seva_sahasra_desc') },
      { id: 5, start: '06:00', end: '11:00', seva: t('seva_darshan'), desc: t('seva_darshan_desc') },
      { id: 6, start: '11:00', end: '12:00', seva: t('seva_pooja'), desc: t('seva_pooja_desc') },
      { id: 7, start: '16:00', end: '19:00', seva: t('seva_evening'), desc: t('seva_evening_desc') },
      { id: 8, start: '19:00', end: '20:00', seva: t('seva_deepa'), desc: t('seva_deepa_desc') },
      { id: 9, start: '20:00', end: '21:00', seva: t('seva_ekanta'), desc: t('seva_ekanta_desc') },
    ],
    weekly: parsedWeekly || [
      { id: 'w1', day: t('day_monday'), seva: t('seva_vishesat'), icon: '✨', color: '#FF9933' },
      { id: 'w2', day: t('day_tuesday'), seva: t('seva_ashtadala'), icon: '🌸', color: '#800000' },
      { id: 'w3', day: t('day_wednesday'), seva: t('seva_kalasa'), icon: '⚱️', color: '#D4AF37' },
      { id: 'w4', day: t('day_thursday'), seva: t('seva_tiruppavada'), icon: '🔱', color: '#FF5E5E' },
      { id: 'w5', day: t('day_friday'), seva: t('seva_moola'), icon: '🌊', color: '#4A90E2' },
    ]
  };

  const isLive = (startStr: string, endStr: string) => {
    const [startH, startM] = startStr.split(':').map(Number);
    const [endH, endM] = endStr.split(':').map(Number);
    const currentH = currentTime.getHours();
    const currentM = currentTime.getMinutes();

    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;
    const currentTotal = currentH * 60 + currentM;

    return currentTotal >= startTotal && currentTotal < endTotal;
  };

  const formatTime = (timeStr: string) => {
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${ampm}`;
  };

  return (
    <section className="day-schedule section-padding">
      <div className="container">
        <div className="schedule-header-premium">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="modern-badge"
          >
            {t('almanac_title')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t('ritual_timeline').split(' ')[0]} <span className="text-gradient">{t('ritual_timeline').split(' ')[1]}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t('stay_connected')}
          </motion.p>
        </div>

        <div className="schedule-controls">
          <div className="tab-pill">
            <button
              className={`tab-pill-item ${activeTab === 'daily' ? 'active' : ''}`}
              onClick={() => setActiveTab('daily')}
            >
              {t('daily_pulse')}
            </button>
            <button
              className={`tab-pill-item ${activeTab === 'weekly' ? 'active' : ''}`}
              onClick={() => setActiveTab('weekly')}
            >
              {t('weekly_special')}
            </button>
          </div>
        </div>

        <div className="schedule-viewport">
          <AnimatePresence mode="wait">
            {activeTab === 'daily' ? (
              <motion.div
                key="daily"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bento-grid"
              >
                {scheduleData.daily.map((item, index) => {
                  const live = isLive(item.start, item.end);
                  return (
                    <motion.div
                      key={item.id}
                      className={`bento-item glass-card ${live ? 'is-live-bento' : ''}`}
                      whileHover={{ y: -10, scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="bento-top">
                        <div className="card-time">
                          <Clock size={14} />
                          <span>{formatTime(item.start)}</span>
                        </div>
                        {live && <div className="live-dot-pulse"></div>}
                      </div>
                      <h3>{item.seva}</h3>
                      <p className="bento-desc">{item.desc}</p>
                      <div className="bento-footer">
                        <button className="btn-details" onClick={() => navigate('/darshan')}>{t('explore_ritual')}</button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="weekly"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bento-grid"
              >
                {scheduleData.weekly.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="bento-item glass-card"
                    whileHover={{ y: -10, scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="bento-top">
                      <span className="bento-icon" style={{ background: `${item.color}20`, color: item.color }}>
                        {item.icon}
                      </span>
                      <span className="bento-day">{item.day}</span>
                    </div>
                    <h3>{item.seva}</h3>
                    <div className="bento-footer">
                      <button className="btn-book-action" onClick={() => navigate('/booking')}>{t('secure_slot')}</button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .day-schedule {
          background: transparent;
          position: relative;
          z-index: 1;
        }

        .schedule-header-premium {
          text-align: center;
          margin-bottom: 4rem;
        }

        .modern-badge {
          display: inline-block;
          padding: 0.4rem 1.2rem;
          background: var(--marble);
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--secondary);
          margin-bottom: 1rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .schedule-header-premium h2 {
          font-size: clamp(2rem, 5vw, 3.5rem);
          margin-bottom: 1.5rem;
        }

        .schedule-header-premium p {
          color: var(--text-muted);
          max-width: 700px;
          margin: 0 auto;
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          line-height: 1.8;
        }

        .schedule-controls {
          display: flex;
          justify-content: center;
          margin-bottom: 5rem;
        }

        .tab-pill {
          background: var(--bg);
          padding: 0.5rem;
          border-radius: 100px;
          display: flex;
          gap: 0.5rem;
          box-shadow: var(--shadow);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(10px);
        }

        .tab-pill-item {
          padding: 0.8rem 2rem;
          border-radius: 100px;
          font-weight: 600;
          color: var(--text-muted);
          transition: all 0.3s ease;
        }

        .tab-pill-item.active {
          background: var(--secondary);
          color: white;
          box-shadow: 0 5px 15px rgba(128, 0, 0, 0.2);
        }

        /* Timeline Layout */
        .timeline-container {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          padding: 2rem 0;
        }

        .timeline-spine {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, transparent, var(--marble) 10%, var(--marble) 90%, transparent);
          transform: translateX(-50%);
        }

        .timeline-item {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 4rem;
          position: relative;
          width: 100%;
        }

        .timeline-item:nth-child(even) { flex-direction: row-reverse; }

        .timeline-marker {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }

        .marker-dot {
          width: 20px;
          height: 20px;
          background: white;
          border: 4px solid var(--primary);
          border-radius: 50%;
          position: relative;
        }

        .dot-pulse {
          position: absolute;
          inset: -8px;
          background: var(--primary);
          border-radius: 50%;
          opacity: 0.3;
          animation: pulseMarker 2s infinite;
        }

        @keyframes pulseMarker {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(2.5); opacity: 0; }
        }

        .timeline-card {
          width: 42%;
          padding: 2.5rem;
          position: relative;
          transition: transform 0.4s ease;
        }

        .timeline-item.is-live .timeline-card {
          border-color: var(--primary);
          background: rgba(255, 153, 51, 0.05);
          box-shadow: 0 20px 50px rgba(255, 153, 51, 0.1);
        }

        .live-pill {
          position: absolute;
          top: -12px;
          left: 2rem;
          background: var(--primary);
          color: white;
          padding: 0.2rem 0.8rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .card-time {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary);
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .timeline-card h3 {
          font-size: 1.4rem;
          margin-bottom: 0.75rem;
          color: var(--secondary);
        }

        .timeline-card p {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .btn-details {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--secondary);
          border-bottom: 2px solid var(--marble);
          padding-bottom: 2px;
          transition: border-color 0.3s ease;
        }

        .btn-details:hover {
          border-color: var(--primary);
        }

        /* Bento Grid Layout */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .bento-item {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: var(--bg);
          backdrop-filter: blur(10px);
        }

        .bento-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .bento-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .bento-day {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .bento-item h3 {
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
        }

        .btn-book-action {
          width: 100%;
          padding: 0.8rem;
          background: var(--marble);
          color: var(--secondary);
          border-radius: 8px;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .bento-item:hover .btn-book-action {
          background: var(--secondary);
          color: white;
          box-shadow: 0 5px 15px rgba(128, 0, 0, 0.2);
        }

        .is-live-bento {
          border: 2px solid var(--primary) !important;
          background: rgba(255, 153, 51, 0.05);
        }

        .live-dot-pulse {
          width: 10px;
          height: 10px;
          background: var(--primary);
          border-radius: 50%;
          position: relative;
        }

        .live-dot-pulse::after {
          content: '';
          position: absolute;
          inset: -4px;
          background: var(--primary);
          border-radius: 50%;
          opacity: 0.4;
          animation: pulseMarker 1.5s infinite;
        }

        .bento-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.4;
          margin-bottom: 0.75rem;
          flex-grow: 1;
        }

        @media (max-width: 900px) {
          .timeline-spine { left: 30px; }
          .timeline-item { justify-content: flex-start; padding-left: 70px; }
          .timeline-item:nth-child(even) { flex-direction: row; }
          .timeline-marker { left: 30px; }
          .timeline-card { width: 100%; }
          .schedule-controls { margin-bottom: 3rem; }
        }

        @media (max-width: 768px) {
          .bento-grid { grid-template-columns: 1fr !important; gap: 1.25rem; }
          .bento-item { padding: 1.25rem; }
          .schedule-header-premium { margin-bottom: 2.5rem; }
          .tab-pill-item { padding: 0.6rem 1.4rem; font-size: 0.85rem; }
          .schedule-controls { margin-bottom: 2rem; }
        }
      `}</style>
    </section>
  );
};

export default DaySchedule;
