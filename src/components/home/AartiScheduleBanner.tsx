import React, { useState, useEffect } from 'react';
import { Clock, Bell, CheckCircle } from 'lucide-react';

// Custom Diya (Lamp) Icon SVG
const DiyaIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="gold-icon">
    <path d="M12 2C13 4.5 13 6 12 7.5C11 6 11 4.5 12 2Z" fill="#FFA500" />
    <path d="M3 12C3 17 7 19 12 19C17 19 21 17 21 12C21 11.5 20.5 11 20 11H4C3.5 11 3 11.5 3 12Z" />
    <path d="M10 19L9 22H15L14 19H10Z" />
  </svg>
);

// Corner Ornament SVG for the corners of the banner
const CornerOrnament = ({ style }: { style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '40px', height: '40px', position: 'absolute', pointerEvents: 'none', zIndex: 5, ...style }}
  >
    <path
      d="M 6 6 L 90 6 M 6 6 L 6 90"
      stroke="#D4AF37"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M 12 12 L 50 12 M 12 12 L 12 50"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M 6 6 C 25 25, 30 45, 12 45 C 12 45, 35 35, 45 12 C 45 12, 25 25, 25 6"
      stroke="#D4AF37"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M 6 25 C 16 25, 25 16, 25 6"
      stroke="#D4AF37"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="3" fill="#D4AF37" />
  </svg>
);

const AartiScheduleBanner = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const [isReminderSet, setIsReminderSet] = useState(false);
  const [nextAartiTime, setNextAartiTime] = useState('--:--');

  const aartiSchedule = ['06:00', '12:00', '18:30', '20:30'];

  const getAartiName = (timeStr: string) => {
    switch (timeStr) {
      case '06:00': return 'Suprabhata Aarti';
      case '12:00': return 'Noon Aarti';
      case '18:30': return 'Next Aarti (Evening)';
      case '20:30': return 'Ekantha Aarti';
      default: return 'Next Aarti';
    }
  };

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

  const bannerItems = [
    {
      icon: <Clock size={28} className="gold-icon" />,
      line1: "Next Scheduled",
      line2: nextAartiTime,
    },
    {
      icon: <DiyaIcon />,
      line1: "Next Aarti",
      line2: getAartiName(nextAartiTime),
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gold-icon">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      line1: "Time Remaining",
      line2: `${formatNum(timeLeft.h)}:${formatNum(timeLeft.m)}:${formatNum(timeLeft.s)}`,
    },
  ];

  return (
    <div className="aarti-schedule-banner-wrapper">
      <div className="aarti-schedule-banner">
        {/* Four Corner Ornaments */}
        <CornerOrnament style={{ top: '6px', left: '6px' }} />
        <CornerOrnament style={{ top: '6px', right: '6px', transform: 'scaleX(-1)' }} />
        <CornerOrnament style={{ bottom: '6px', left: '6px', transform: 'scaleY(-1)' }} />
        <CornerOrnament style={{ bottom: '6px', right: '6px', transform: 'scale(-1)' }} />

        {/* Banner Details */}
        <div className="schedule-banner-items">
          {bannerItems.map((item, index) => (
            <React.Fragment key={index}>
              <div className="schedule-banner-item">
                <div className="schedule-icon-container">
                  {item.icon}
                </div>
                <div className="schedule-text">
                  <span className="schedule-line1">{item.line1}</span>
                  <span className="schedule-line2">{item.line2}</span>
                </div>
              </div>
              <div className="schedule-banner-divider"></div>
            </React.Fragment>
          ))}

          {/* Interactive Reminder Action */}
          <button
            className={`schedule-reminder-btn ${isReminderSet ? 'active' : ''}`}
            onClick={() => setIsReminderSet(!isReminderSet)}
          >
            <div className="schedule-icon-container">
              {isReminderSet ? <CheckCircle size={26} /> : <Bell size={26} />}
            </div>
            <div className="schedule-text">
              <span className="schedule-line1">Reminder Status</span>
              <span className="schedule-line2">{isReminderSet ? "Reminder Active" : "Set Reminder"}</span>
            </div>
          </button>
        </div>
      </div>

      <style>{`
        .aarti-schedule-banner-wrapper {
          position: relative;
          z-index: 100;
          margin-top: -3.5rem;
          margin-bottom: 3.5rem;
          width: 100%;
          padding: 0;
          box-sizing: border-box;
        }

        .aarti-schedule-banner {
          position: relative;
          background: linear-gradient(to bottom, rgba(139, 0, 0, 0.95), rgba(90, 0, 0, 0.98)), url('/assets/maroon_bg.png') center/cover no-repeat;
          border: 2.5px solid #D4AF37;
          border-radius: 16px;
          padding: 1.25rem 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 90px;
          box-sizing: border-box;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
        }

        .schedule-banner-items {
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 100%;
          z-index: 10;
        }

        .schedule-banner-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #D4AF37;
          flex: 1;
          justify-content: center;
          min-width: 0;
        }

        .schedule-reminder-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: transparent;
          border: none;
          color: #D4AF37;
          cursor: pointer;
          padding: 0.5rem 1rem;
          transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);
          text-align: left;
          flex: 1;
          justify-content: center;
          border-radius: 8px;
          min-width: 0;
        }

        .schedule-reminder-btn:hover {
          transform: translateY(-2px);
          filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.6));
          background: rgba(255, 255, 255, 0.05);
        }

        .schedule-reminder-btn.active {
          color: #4CAF50;
        }

        .schedule-reminder-btn.active .schedule-line2 {
          color: #4CAF50;
        }

        .schedule-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .schedule-text {
          display: flex;
          flex-direction: column;
          font-family: 'Outfit', 'Inter', sans-serif;
          line-height: 1.2;
          min-width: 0;
        }

        .schedule-line1 {
          font-size: 0.8rem;
          font-weight: 500;
          color: #E2C275;
          text-transform: capitalize;
          opacity: 0.9;
        }

        .schedule-line2 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #FFD700;
          text-transform: capitalize;
          letter-spacing: 0.5px;
        }

        .schedule-banner-divider {
          width: 1px;
          height: 35px;
          background: linear-gradient(to bottom, transparent, #D4AF37, transparent);
          opacity: 0.5;
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .aarti-schedule-banner-wrapper {
            margin-top: 1.5rem;
            margin-bottom: 2rem;
            padding: 0 1rem;
          }
          .aarti-schedule-banner {
            padding: 2.25rem 1.25rem;
          }
          .schedule-banner-items {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.25rem 0.5rem;
          }
          .schedule-banner-divider {
            display: none;
          }
          .schedule-banner-item, .schedule-reminder-btn {
            justify-content: flex-start;
            padding: 0.25rem 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .aarti-schedule-banner-wrapper {
            margin-top: 1rem;
            margin-bottom: 1.5rem;
            padding: 0 0.5rem;
          }
          .schedule-line2 {
            font-size: 0.9rem;
          }
          .schedule-line1 {
            font-size: 0.72rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AartiScheduleBanner;
