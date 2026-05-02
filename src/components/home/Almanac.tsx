import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Star, Bell, Calendar as CalendarIcon, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Almanac = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language || 'en';
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Update date automatically if it's currently showing "today"
  useEffect(() => {
    const isToday = (date: Date) => {
      const today = new Date();
      return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
    };

    if (isToday(selectedDate)) {
      const timer = setInterval(() => {
        const now = new Date();
        if (now.getDate() !== selectedDate.getDate()) {
          setSelectedDate(now);
        }
      }, 60000);
      return () => clearInterval(timer);
    }
  }, [selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setSelectedDate(new Date(e.target.value));
    }
  };

  const resetToToday = () => {
    setSelectedDate(new Date());
  };

  const getPanchangamData = (date: Date) => {
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    
    const isToday = new Date().toDateString() === date.toDateString();
    const cmsData = isToday ? localStorage.getItem('panchangam') : null;
    const parsed = cmsData ? JSON.parse(cmsData) : null;

    return [
      { label: t('label_tithi'), value: parsed?.tithi || t(`tithi_${dayOfYear % 30}`), icon: <Moon size={18} /> },
      { label: t('label_nakshatram'), value: parsed?.nakshatram || t(`nakshatra_${dayOfYear % 27}`), icon: <Star size={18} /> },
      { label: t('label_yogam'), value: parsed?.yogam || t(`yogam_${dayOfYear % 27}`), icon: <Sun size={18} /> },
      { label: t('label_karanam'), value: parsed?.karanam || t(`karanam_${dayOfYear % 11}`), icon: <Bell size={18} /> },
    ];
  };

  const getTimings = (date: Date) => {
    const day = date.getDay();
    const rahu = ['04:30 PM - 06:00 PM', '07:30 AM - 09:00 AM', '03:00 PM - 04:30 PM', '12:00 PM - 01:30 PM', '01:30 PM - 03:00 PM', '10:30 AM - 12:00 PM', '09:00 AM - 10:30 AM'];
    const gulika = ['03:00 PM - 04:30 PM', '01:30 PM - 03:00 PM', '12:00 PM - 01:30 PM', '10:30 AM - 12:00 PM', '09:00 AM - 10:30 AM', '07:30 AM - 09:00 AM', '06:00 AM - 07:30 AM'];
    
    const month = date.getMonth();
    const sunriseTimes = ['06:40 AM', '06:30 AM', '06:15 AM', '06:05 AM', '05:55 AM', '05:50 AM', '05:55 AM', '06:05 AM', '06:15 AM', '06:20 AM', '06:30 AM', '06:40 AM'];
    const sunsetTimes = ['06:00 PM', '06:15 PM', '06:30 PM', '06:45 PM', '07:00 PM', '07:10 PM', '07:05 PM', '06:50 PM', '06:30 PM', '06:10 PM', '05:55 PM', '05:50 PM'];

    const isToday = new Date().toDateString() === date.toDateString();
    const cmsData = isToday ? localStorage.getItem('panchangam') : null;
    const parsed = cmsData ? JSON.parse(cmsData) : null;

    return [
      { label: t('label_sunrise'), value: parsed?.sunrise || sunriseTimes[month] },
      { label: t('label_sunset'), value: parsed?.sunset || sunsetTimes[month] },
      { label: t('label_rahu'), value: parsed?.rahu || rahu[day] },
      { label: t('label_gulika'), value: parsed?.gulika || gulika[day] },
    ];
  };

  const cmsFestivals = localStorage.getItem('upcomingFestivals');
  const allFestivals = cmsFestivals ? JSON.parse(cmsFestivals) : [
    { date: '2026-04-14', name: t('fest_tamil_new_year') },
    { date: '2026-04-23', name: t('fest_hanuman_jayanti') },
    { date: '2026-04-26', name: t('fest_ekadashi') },
    { date: '2026-05-01', name: 'May Day Seva' },
    { date: '2026-05-05', name: t('fest_narasimha') },
    { date: '2026-05-14', name: t('fest_purnima') },
    { date: '2026-05-19', name: 'Narada Jayanti' },
    { date: '2026-05-22', name: 'Shani Jayanti' },
    { date: '2026-06-01', name: 'Ganga Dussehra' },
    { date: '2026-06-21', name: t('fest_ekadashi') },
    { date: '2026-07-10', name: 'Guru Purnima' },
    { date: '2026-08-16', name: 'Aadi Perukku' },
    { date: '2026-08-28', name: 'Varalakshmi Vratam' },
    { date: '2026-09-04', name: 'Sri Krishna Janmashtami' },
  ];

  const upcomingFestivals = allFestivals
    .filter(f => new Date(f.date) >= new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()))
    .slice(0, 3);

  const formattedDay = selectedDate.getDate();
  const formattedMonth = selectedDate.toLocaleString(locale, { month: 'long' }).toUpperCase();
  const formattedYear = selectedDate.getFullYear();
  const formattedDayName = selectedDate.toLocaleString(locale, { weekday: 'long' });

  return (
    <section className="almanac-section section-padding">
      <div className="container">
        <div className="almanac-grid">
          {/* Main Info Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="almanac-main glass-card"
          >
            <div className="almanac-header">
              <div 
                className="date-badge" 
                onClick={() => dateInputRef.current?.showPicker()}
                title="Click to change date"
              >
                <span className="day-num">{formattedDay}</span>
                <div className="month-year">
                  <span>{formattedMonth}</span>
                  <span>{formattedYear}</span>
                </div>
                <input 
                  type="date" 
                  ref={dateInputRef}
                  className="hidden-date-input"
                  onChange={handleDateChange}
                  value={selectedDate.toISOString().split('T')[0]}
                />
                <CalendarIcon className="calendar-trigger-icon" size={16} />
              </div>
              <div className="day-info-wrap">
                <div className="day-name">{formattedDayName}</div>
                {new Date().toDateString() !== selectedDate.toDateString() && (
                  <button className="reset-today" onClick={resetToToday} title="Back to Today">
                    <RotateCcw size={14} />
                    <span>{t('label_today')}</span>
                  </button>
                )}
              </div>
            </div>
            
            <div className="panchangam-list">
              {getPanchangamData(selectedDate).map((item, idx) => (
                <div key={idx} className="panchangam-item">
                  <span className="icon-wrap">{item.icon}</span>
                  <div className="item-details">
                    <span className="label">{item.label}</span>
                    <motion.span 
                      key={`${item.label}-${selectedDate.toDateString()}`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="value"
                    >
                      {item.value}
                    </motion.span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Timings and Festivals */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="almanac-details"
          >
            <div className="details-header">
              <span className="modern-badge">{t('almanac_title')}</span>
              <h2>{t('panchangam_vishesha').split('&')[0]} <span className="text-gradient">& {t('panchangam_vishesha').split('&')[1]}</span></h2>
            </div>

            <div className="timings-grid">
              {getTimings(selectedDate).map((time, idx) => (
                <div key={idx} className="time-card glass-card">
                  <span className="label">{time.label}</span>
                  <motion.span 
                    key={`${time.label}-${selectedDate.toDateString()}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="value"
                  >
                    {time.value}
                  </motion.span>
                </div>
              ))}
            </div>

            <div className="festivals-card glass-card">
              <div className="fest-header">
                <Bell className="bell-icon" size={20} />
                <h3>{t('upcoming_festivals')}</h3>
              </div>
              <div className="fest-list">
                {upcomingFestivals.length > 0 ? (
                  upcomingFestivals.map((fest, idx) => (
                    <div key={idx} className="fest-item">
                      <span className="fest-date">
                        {new Date(fest.date).toLocaleString('default', { month: 'short', day: '2-digit' })}
                      </span>
                      <span className="fest-name">{fest.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="fest-item no-fest">
                    No major festivals in the next few days
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .almanac-section {
          position: relative;
        }

        .almanac-grid {
          display: grid;
          grid-template-columns: minmax(300px, 400px) 1fr;
          gap: 3rem;
          align-items: start;
        }

        .almanac-main {
          padding: 3rem;
          background: linear-gradient(135deg, rgba(128, 0, 0, 0.95), rgba(80, 0, 0, 0.95));
          color: white;
          border-color: var(--accent);
          position: relative;
          overflow: hidden;
        }

        .almanac-main::after {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,153,51,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .almanac-header {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .date-badge {
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          transition: all 0.3s ease;
          position: relative;
          background: rgba(255,255,255,0.05);
        }

        .date-badge:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-2px);
        }

        .hidden-date-input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
          width: 0;
          height: 0;
        }

        .calendar-trigger-icon {
          opacity: 0.5;
          margin-left: 0.5rem;
        }

        .day-num {
          font-size: 4rem;
          font-weight: 800;
          font-family: var(--font-heading);
          line-height: 1;
          color: var(--primary);
        }

        .month-year {
          display: flex;
          flex-direction: column;
          font-weight: 700;
          letter-spacing: 2px;
          font-size: 0.9rem;
        }

        .day-info-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .day-name {
          font-size: 1.5rem;
          font-weight: 400;
          font-family: var(--font-heading);
          font-style: italic;
          opacity: 0.9;
        }

        .reset-today {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
          background: rgba(255,153,51,0.1);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          transition: all 0.3s ease;
          width: fit-content;
        }

        .reset-today:hover {
          background: var(--primary);
          color: white;
        }

        .panchangam-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .panchangam-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .icon-wrap {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(255, 153, 51, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .item-details {
          display: flex;
          flex-direction: column;
        }

        .item-details .label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.7;
          margin-bottom: 0.25rem;
        }

        .item-details .value {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .details-header {
          margin-bottom: 3rem;
        }

        .details-header h2 {
          font-size: clamp(1.5rem, 3.5vw, 2.5rem);
          margin-top: 1rem;
        }

        .timings-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .time-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .time-card .label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .time-card .value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--secondary);
        }

        .festivals-card {
          padding: 2rem;
          background: var(--bg);
          border: 1px solid rgba(0,0,0,0.05);
        }

        .fest-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          color: var(--primary);
        }

        .fest-list {
          display: grid;
          gap: 1rem;
        }

        .fest-item {
          display: flex;
          justify-content: space-between;
          padding: 1rem;
          background: var(--marble);
          border-radius: 12px;
          font-weight: 600;
        }

        .fest-date {
          color: var(--primary);
        }

        .no-fest {
          justify-content: center;
          font-style: italic;
          opacity: 0.7;
          font-weight: 400;
        }

        @media (max-width: 992px) {
          .almanac-grid { grid-template-columns: 1fr; gap: 2rem; }
          .almanac-main { width: 100%; padding: 2.5rem; }
        }

        @media (max-width: 768px) {
          .almanac-header { flex-direction: column; gap: 1rem; text-align: center; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1.5rem; }
          .panchangam-list { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
          .timings-grid { grid-template-columns: 1fr; gap: 1rem; }
        }

        @media (max-width: 480px) {
          .panchangam-list { grid-template-columns: 1fr; }
          .day-num { font-size: 3rem; }
          .month-year { font-size: 0.75rem; }
          .day-name { font-size: 1.2rem; display: block !important; }
          .almanac-main { padding: 1.5rem; }
          .festivals-card { padding: 1.25rem; }
          .fest-item { flex-direction: column; gap: 0.25rem; }
        }
      `}</style>
    </section>
  );
};

export default Almanac;
