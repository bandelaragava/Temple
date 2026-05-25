import React from 'react';
import { usePanchangam } from '../../hooks/usePanchangam';
import { Calendar, Sun, Clock, Sparkles, Compass } from 'lucide-react';
import { festivalTranslationTe } from '../../utils/festivalTranslations';

const DailyDivineSummary = () => {
  const today = new Date();
  const live = usePanchangam(today);

  // Fallback festival list for today
  const allFestivals = [
    { date: '2026-04-14', name: 'తమిళ నూతన సంవత్సరం' },
    { date: '2026-04-23', name: 'శ్రీ హనుమత్ జయంతి' },
    { date: '2026-04-26', name: 'ఏకాదశి' },
    { date: '2026-05-01', name: 'మే డే సేవ' },
    { date: '2026-05-05', name: 'నరసింహ జయంతి' },
    { date: '2026-05-14', name: 'వైశాఖ పౌర్ణమి' },
    { date: '2026-05-19', name: 'నారద జయంతి' },
    { date: '2026-05-22', name: 'శని జయంతి' },
    { date: '2026-06-01', name: 'గంగా దసరా' },
    { date: '2026-06-21', name: 'ఏకాదశి' },
    { date: '2026-07-10', name: 'గురు పౌర్ణమి' },
    { date: '2026-08-16', name: 'ఆడి పెరుక్కు' },
    { date: '2026-08-28', name: 'వరలక్ష్మీ వ్రతం' },
    { date: '2026-09-04', name: 'శ్రీ కృష్ణ జన్మాష్టమి' },
  ];

  const getFestivalName = () => {
    let rawName = '';
    if (live.festivals && live.festivals.length > 0) {
      rawName = live.festivals[0];
    } else {
      const dateKey = today.toISOString().split('T')[0];
      const match = allFestivals.find(f => f.date === dateKey);
      if (match) rawName = match.name;
    }
    
    if (!rawName) {
      return 'నిత్య పూజలు & అర్చన';
    }

    const lowerName = rawName.toLowerCase().trim();
    
    if (festivalTranslationTe[lowerName]) return festivalTranslationTe[lowerName];
    for (const [key, value] of Object.entries(festivalTranslationTe)) {
      if (lowerName.includes(key)) return value;
    }
    return rawName;
  };

  const formattedDate = live.gregorianDateString || `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

  if (live.loading) {
    return (
      <div className="divine-summary-loading glass-card">
        <span className="summary-spinner"></span>
        <p>నేటి దివ్య పంచాంగ వివరాలను లోడ్ చేస్తోంది...</p>
        <style>{`
          .divine-summary-loading {
            padding: 2rem;
            text-align: center;
            color: #E2C275;
            margin-bottom: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
          .summary-spinner {
            width: 24px;
            height: 24px;
            border: 3px solid rgba(226, 194, 117, 0.2);
            border-top: 3px solid #D4AF37;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="divine-summary-container glass-card">
      <div className="summary-header">
        <div className="header-left">
          <Calendar className="gold-icon" size={22} />
          <span className="gregorian-date">నేటి తేదీ: {formattedDate}</span>
        </div>
        <div className="header-right">
          <span className="telugu-day">{live.monthDayVaraHeaderTe}</span>
          <span className="sanskrit-day">{live.sanskritVaraHeaderTe}</span>
        </div>
      </div>

      <div className="summary-body">
        <div className="summary-grid">
          <div className="summary-item">
            <span className="item-label">సంవత్సరం</span>
            <span className="item-value">{live.samvatsaraNameTe || '—'}</span>
          </div>
          <div className="summary-item">
            <span className="item-label">మాసం</span>
            <span className="item-value">{live.masaNameTe || '—'}</span>
          </div>
          <div className="summary-item">
            <span className="item-label">ఋతువు</span>
            <span className="item-value">{live.rituNameTe || '—'}</span>
          </div>
          <div className="summary-item">
            <span className="item-label">అయనం</span>
            <span className="item-value">{live.ayanaNameTe || '—'}</span>
          </div>
        </div>

        <div className="summary-row timing-row">
          <div className="row-icon-container">
            <Clock size={20} className="gold-icon" />
          </div>
          <div className="row-content">
            <span className="row-label">శుభ సమయాలు (అభిజిత్ & గౌరీ కాలాలు)</span>
            <span className="row-value auspicious">{live.auspiciousTimingsTe || '—'}</span>
          </div>
        </div>

        <div className="summary-row festival-row">
          <div className="row-icon-container">
            <Sparkles size={20} className="gold-icon" />
          </div>
          <div className="row-content">
            <span className="row-label">నేటి పండుగ / విశేషం</span>
            <span className="row-value festival">{getFestivalName()}</span>
          </div>
        </div>
      </div>

      <style>{`
        .divine-summary-container {
          position: relative;
          background: linear-gradient(135deg, rgba(40, 0, 0, 0.75) 0%, rgba(20, 0, 0, 0.85) 100%);
          border: 1.5px solid rgba(212, 175, 55, 0.35);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 2.5rem;
          color: white;
        }

        .divine-summary-container::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          padding: 1px;
          background: linear-gradient(to bottom right, rgba(212, 175, 55, 0.4), transparent, rgba(212, 175, 55, 0.2));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .summary-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          padding-bottom: 0.75rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .gold-icon {
          color: #D4AF37;
          filter: drop-shadow(0 0 4px rgba(212, 175, 55, 0.3));
        }

        .gregorian-date {
          font-weight: 700;
          color: #E2C275;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .telugu-day {
          background: rgba(212, 175, 55, 0.15);
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: #FFD700;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 700;
        }

        .sanskrit-day {
          color: #FFAA88;
          font-size: 0.85rem;
          font-weight: 600;
          font-style: italic;
        }

        .summary-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
        }

        .summary-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          align-items: center;
          text-align: center;
        }

        .item-label {
          font-size: 0.7rem;
          color: #E2C275;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .item-value {
          font-size: 0.88rem;
          font-weight: 700;
          color: white;
        }

        .summary-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 0.75rem 1rem;
          border-radius: 10px;
        }

        .row-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(212, 175, 55, 0.08);
          border: 1.5px solid rgba(212, 175, 55, 0.2);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .row-content {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .row-label {
          font-size: 0.75rem;
          color: #E2C275;
          font-weight: 600;
        }

        .row-value {
          font-size: 0.92rem;
          font-weight: 700;
          color: white;
        }

        .row-value.auspicious {
          color: #90FF90;
        }

        .row-value.festival {
          color: #FFD700;
        }

        @media (max-width: 768px) {
          .summary-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .divine-summary-container {
            padding: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .summary-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .header-right {
            width: 100%;
            justify-content: space-between;
          }
          .summary-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default DailyDivineSummary;
