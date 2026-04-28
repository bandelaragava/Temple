import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const AartiCountdown = () => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const [isReminderSet, setIsReminderSet] = useState(false);
  const [nextAartiTime, setNextAartiTime] = useState('--:--');

  const aartiSchedule = ['06:00', '12:00', '18:30', '20:30'];

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      let nextAarti: Date | null = null;
      let selectedTimeStr = '';

      for (const timeStr of aartiSchedule) {
        const [h, m] = timeStr.split(':').map(Number);
        const aartiDate = new Date();
        aartiDate.setHours(h, m, 0, 0);

        if (aartiDate > now) {
          nextAarti = aartiDate;
          selectedTimeStr = timeStr;
          break;
        }
      }

      if (!nextAarti) {
        const [h, m] = aartiSchedule[0].split(':').map(Number);
        nextAarti = new Date();
        nextAarti.setDate(nextAarti.getDate() + 1);
        nextAarti.setHours(h, m, 0, 0);
        selectedTimeStr = aartiSchedule[0];
      }

      setNextAartiTime(selectedTimeStr);
      const diff = nextAarti.getTime() - now.getTime();
      
      if (diff > 0) {
        setTimeLeft({
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / (1000 * 60)) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTime, 1000);
    calculateTime();
    return () => clearInterval(timer);
  }, []);

  const formatNum = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="aarti-countdown glass-card">
      <div className="countdown-info">
        <div className="next-label">{t('next_scheduled')}: {nextAartiTime}</div>
        <h3>{t('next_aarti')}</h3>
        <p>{t('join_live')}</p>
      </div>
      <div className="timer">
        <div className="timer-segment">
          <motion.span key={timeLeft.h} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {formatNum(timeLeft.h)}
          </motion.span>
          <small>{timeLeft.h === 1 ? t('label_hour') : t('label_hours')}</small>
        </div>
        <div className="timer-sep">:</div>
        <div className="timer-segment">
          <motion.span key={timeLeft.m} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {formatNum(timeLeft.m)}
          </motion.span>
          <small>{timeLeft.m === 1 ? t('label_min') : t('label_mins')}</small>
        </div>
        <div className="timer-sep">:</div>
        <div className="timer-segment">
          <motion.span key={timeLeft.s} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            {formatNum(timeLeft.s)}
          </motion.span>
          <small>{timeLeft.s === 1 ? t('label_sec') : t('label_secs')}</small>
        </div>
      </div>
      <button 
        className={`btn-primary reminder-btn ${isReminderSet ? 'active' : ''}`}
        onClick={() => setIsReminderSet(!isReminderSet)}
      >
        {isReminderSet ? (
          <>
            <CheckCircle size={18} />
            <span>{t('reminder_active')}</span>
          </>
        ) : (
          <>
            <Bell size={18} />
            <span>{t('set_reminder')}</span>
          </>
        )}
      </button>

      <style>{`
        .aarti-countdown {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2rem 3rem;
          margin-top: -80px;
          position: relative;
          z-index: 10;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          color: var(--text);
          border: 1px solid var(--glass-border);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .next-label {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 0.5rem;
        }

        .countdown-info h3 {
          font-size: 1.5rem;
          margin-bottom: 0.25rem;
        }

        .countdown-info p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .timer {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .timer-segment {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 60px;
        }

        .timer-segment span {
          font-size: 2.5rem;
          font-weight: 700;
          font-family: var(--font-heading);
          color: var(--primary);
          line-height: 1;
        }

        .timer-segment small {
          text-transform: uppercase;
          font-size: 0.7rem;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin-top: 0.5rem;
        }

        .timer-sep {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary);
          padding-bottom: 1.2rem;
        }

        .reminder-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 180px;
          justify-content: center;
          cursor: pointer;
        }

        .reminder-btn.active {
          background: #4CAF50;
          border-color: #4CAF50;
          box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
        }

        @media (max-width: 900px) {
          .aarti-countdown {
            flex-direction: column;
            gap: 2rem;
            text-align: center;
            padding: 2rem;
            margin-top: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AartiCountdown;
