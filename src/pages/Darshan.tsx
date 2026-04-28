import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Info, Shield, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Darshan = () => {
  const { t } = useLanguage();
  const darshanTimings = [
    { type: t('seva_suprabhata'), time: '05:00 AM - 05:30 AM', entry: 'Paid Seva', tEntry: t('entry_paid') || 'Paid Seva', desc: t('seva_suprabhata_desc') },
    { type: t('seva_viswaroopa') || 'Viswaroopa Darshanam', time: '05:30 AM - 06:30 AM', entry: 'Free', tEntry: t('entry_free') || 'Free', desc: t('seva_viswaroopa_desc') || 'The first public darshan of the day.' },
    { type: t('seva_tomala'), time: '06:30 AM - 07:30 AM', entry: 'Paid Seva', tEntry: t('entry_paid') || 'Paid Seva', desc: t('seva_tomala_desc') },
    { type: t('seva_sahasra'), time: '07:30 AM - 08:30 AM', entry: 'Paid Seva', tEntry: t('entry_paid') || 'Paid Seva', desc: t('seva_sahasra_desc') },
    { type: t('seva_darshan'), time: '09:30 AM - 12:30 PM', entry: 'Free', tEntry: t('entry_free') || 'Free', desc: t('seva_darshan_desc') },
    { type: t('label_break') || 'Afternoon Break', time: '12:30 PM - 04:00 PM', entry: 'Closed', tEntry: t('entry_closed') || 'Closed', desc: t('break_desc') || 'Temple closed for Naivedyam and rest.' },
    { type: t('seva_evening'), time: '04:00 PM - 08:00 PM', entry: 'Free', tEntry: t('entry_free') || 'Free', desc: t('seva_evening_desc') },
    { type: t('seva_ekanta'), time: '09:00 PM', entry: 'Closing', tEntry: t('entry_closing') || 'Closing', desc: t('seva_ekanta_desc') }
  ];

  return (
    <div className="darshan-page section-padding">
      <div className="container">
        <div className="page-header centered">
          <span className="modern-badge">{t('darshan_badge')}</span>
          <h1>{t('darshan_title')}</h1>
          <p>{t('darshan_desc')}</p>
        </div>

        <div className="timings-container glass-card">
          <div className="timings-table-header">
            <div className="col">{t('table_type')}</div>
            <div className="col">{t('table_timing')}</div>
            <div className="col">{t('table_entry')}</div>
            <div className="col hide-mobile">{t('table_desc')}</div>
          </div>
          <div className="timings-rows">
            {darshanTimings.map((d, i) => (
              <motion.div
                key={i}
                className="timing-row"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="col type"><strong>{d.type}</strong></div>
                <div className="col time"><Clock size={14} /> {d.time}</div>
                <div className="col entry">
                  <span className={`entry-pill ${d.entry.toLowerCase().replace(' ', '-')}`}>{d.tEntry}</span>
                </div>
                <div className="col desc hide-mobile">{d.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="info-grid mt-4">
          <div className="info-card glass-card">
            <Shield className="icon-p" />
            <h4>{t('info_dress_code')}</h4>
            <p>{t('info_dress_desc')}</p>
          </div>
          <div className="info-card glass-card">
            <Calendar className="icon-p" />
            <h4>{t('info_peak_days')}</h4>
            <p>{t('info_peak_desc')}</p>
          </div>
          <div className="info-card glass-card">
            <Info className="icon-p" />
            <h4>{t('info_special')}</h4>
            <p>{t('info_special_desc')}</p>
          </div>
        </div>
      </div>

      <style>{`
        .darshan-page {
          margin-top: 100px;
          min-height: 80vh;
        }

        .page-header {
          margin-bottom: 4rem;
        }

        .page-header h1 {
          font-size: 3.5rem;
          margin-top: 1rem;
        }

        .centered { text-align: center; }

        .timings-container {
          padding: 0;
          overflow: hidden;
          border: 1px solid var(--glass-border);
        }

        .timings-table-header {
          display: grid;
          grid-template-columns: 1fr 1.2fr 0.8fr 2fr;
          background: var(--secondary);
          color: white;
          padding: 1.5rem 2rem;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 1px;
        }

        .timing-row {
          display: grid;
          grid-template-columns: 1fr 1.2fr 0.8fr 2fr;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          align-items: center;
          transition: background 0.3s ease;
        }

        .timing-row:hover {
          background: #fdfaf3;
        }

        .col.time {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary);
          font-weight: 600;
        }

        .entry-pill {
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 700;
          display: inline-block;
          text-align: center;
          min-width: 100px;
        }

        .entry-pill.free { background: #e6f6ec; color: #1e7e34; }
        .entry-pill.paid { background: #fff3cd; color: #856404; }
        .entry-pill.closed { background: #f8d7da; color: #721c24; }
        .entry-pill.closing { background: #e2e3e5; color: #383d41; }

        .col.desc {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .info-card {
          padding: 2.5rem;
          text-align: center;
        }

        .icon-p {
          width: 48px;
          height: 48px;
          color: var(--primary);
          margin-bottom: 1.5rem;
          background: var(--marble);
          padding: 10px;
          border-radius: 12px;
        }

        .info-card h4 {
          margin-bottom: 1rem;
          color: var(--secondary);
        }

        @media (max-width: 900px) {
          .timings-table-header, .timing-row {
            grid-template-columns: 1.5fr 1.5fr 1fr;
          }
          .hide-mobile { display: none; }
          .info-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Darshan;
