import React from 'react';
import { Bell } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Ticker = () => {
  const { t } = useLanguage();
  const news = [
    t('news_1'),
    t('news_2'),
    t('news_3'),
    t('news_4')
  ];

  return (
    <div className="ticker-wrapper">
      <div className="ticker-label">
        <Bell size={14} fill="currentColor" />
        <span>{t('ticker_label')}</span>
      </div>
      <div className="ticker-content">
        <div className="ticker-track">
          {news.map((item, index) => (
            <span key={index} className="ticker-item">{item}</span>
          ))}
          {/* Duplicate for seamless infinite loop */}
          {news.map((item, index) => (
            <span key={`dup-${index}`} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>

      <style>{`
        .ticker-wrapper {
          background: var(--secondary);
          color: white;
          height: 36px;
          display: flex;
          align-items: center;
          overflow: hidden;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1001;
          font-size: 0.8rem;
          font-weight: 600;
          border-bottom: 2px solid var(--accent);
        }

        .ticker-label {
          background: var(--accent);
          color: var(--secondary);
          height: 100%;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 1.25rem;
          position: relative;
          z-index: 2;
          box-shadow: 10px 0 20px rgba(0,0,0,0.2);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .ticker-content {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          position: relative;
        }

        .ticker-track {
          display: inline-block;
          padding-left: 100%;
          animation: tickerLoop 40s linear infinite;
        }

        .ticker-item {
          padding: 0 3rem;
          display: inline-block;
        }

        @keyframes tickerLoop {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        .ticker-wrapper:hover .ticker-track {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Ticker;
