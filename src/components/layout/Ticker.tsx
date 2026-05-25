import React from 'react';
import { Bell } from 'lucide-react';

const Ticker = () => {
  const news = [
    "Annual Brahmotsavams will commence next month. Advance booking for special Darshan is now open.",
    "New E-Hundi portal launched for seamless digital offerings.",
    "Pilgrims are requested to strictly follow the traditional dress code.",
    "Free Annadanam available daily for all devotees visiting the temple."
  ];

  return (
    <div className="ticker-wrapper">
      <div className="ticker-label">
        <span>Seva News:</span>
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
          background: #4b0000;
          color: #f7ef8a;
          height: 40px;
          display: flex;
          align-items: center;
          overflow: hidden;
          position: sticky;
          top: 0;
          width: 100%;
          max-width: 100%;
          z-index: 1100;
          font-size: 0.85rem;
          font-weight: 600;
          border-bottom: 1px solid var(--accent);
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .ticker-label {
          background: #5d0000;
          color: #f7ef8a;
          padding: 0 1.2rem;
          height: 100%;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
          font-weight: 800;
          text-transform: uppercase;
          z-index: 2;
          box-shadow: 10px 0 20px rgba(0,0,0,0.3);
          font-size: 0.75rem;
          letter-spacing: 1px;
        }

        .ticker-content {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          background: #4b0000;
        }

        .ticker-track {
          display: inline-block;
          white-space: nowrap;
          padding-left: 20px;
          animation: tickerLoop 30s linear infinite;
        }

        .ticker-item {
          padding: 0 4rem;
          display: inline-block;
        }

        @keyframes tickerLoop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .ticker-wrapper:hover .ticker-track {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .ticker-label { padding: 0 0.8rem; font-size: 0.7rem; }
          .ticker-wrapper { height: 36px; }
        }
      `}</style>
    </div>
  );
};

export default Ticker;
