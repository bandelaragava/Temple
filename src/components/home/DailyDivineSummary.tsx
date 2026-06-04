import React from 'react';
import { usePanchangam } from '../../hooks/usePanchangam';
import { Calendar, Sun, Clock, Sparkles, Compass, Moon, Award, Bell } from 'lucide-react';
import { festivalTranslationTe } from '../../utils/festivalTranslations';

const DailyDivineSummary = () => {
  const today = new Date();
  const live = usePanchangam(today);

  const getFestivalName = () => {
    let rawName = '';
    if (live.festivals && live.festivals.length > 0) {
      rawName = live.festivals[0];
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

  // Parse auspicious timings to render individual pills
  const renderAuspiciousTimings = () => {
    if (!live.auspiciousTimingsTe || live.auspiciousTimingsTe === '—') {
      return <span className="no-timings">శుభ సమయాలు అందుబాటులో లేవు</span>;
    }

    const slots = live.auspiciousTimingsTe.split(',').map(s => s.trim()).filter(Boolean);
    return slots.map((slot, index) => (
      <div key={index} className="auspicious-pill">
        <Clock size={12} className="pill-icon" />
        <span>{slot}</span>
      </div>
    ));
  };

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
            background: linear-gradient(135deg, rgba(80, 0, 0, 0.95), rgba(40, 0, 0, 0.98));
            border: 2px solid #D4AF37;
            border-radius: 24px;
          }
          .summary-spinner {
            width: 32px;
            height: 32px;
            border: 3.5px solid rgba(212, 175, 55, 0.2);
            border-top: 3.5px solid #D4AF37;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="divine-summary-wrapper">
      {/* Decorative Traditional Toran Leaf Header */}
      <div className="toran-header">
        <svg viewBox="0 0 1200 30" className="toran-svg" preserveAspectRatio="none">
          <path d="M 0 0 C 30 15, 70 15, 100 0 C 130 15, 170 15, 200 0 C 230 15, 270 15, 300 0 C 330 15, 370 15, 400 0 C 430 15, 470 15, 500 0 C 530 15, 570 15, 600 0 C 630 15, 670 15, 700 0 C 730 15, 770 15, 800 0 C 830 15, 870 15, 900 0 C 930 15, 970 15, 1000 0 C 1030 15, 1070 15, 1100 0 C 1130 15, 1170 15, 1200 0 L 1200 30 L 0 30 Z" fill="rgba(212, 175, 55, 0.05)" />
          <path d="M 0 0 C 30 15, 70 15, 100 0 C 130 15, 170 15, 200 0 C 230 15, 270 15, 300 0 C 330 15, 370 15, 400 0 C 430 15, 470 15, 500 0 C 530 15, 570 15, 600 0 C 630 15, 670 15, 700 0 C 730 15, 770 15, 800 0 C 830 15, 870 15, 900 0 C 930 15, 970 15, 1000 0 C 1030 15, 1070 15, 1100 0 C 1130 15, 1170 15, 1200 0" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
          {/* Leaves detailing */}
          {[50, 150, 250, 350, 450, 550, 650, 750, 850, 950, 1050, 1150].map((cx, i) => (
            <g key={i}>
              <path d={`M ${cx} 8 C ${cx - 8} 18, ${cx - 8} 24, ${cx} 27 C ${cx + 8} 24, ${cx + 8} 18, ${cx} 8 Z`} fill="#FF9933" opacity="0.8" />
              <circle cx={cx} cy="8" r="2" fill="#D4AF37" />
            </g>
          ))}
        </svg>
      </div>

      <div className="divine-summary-card">
        {/* Subtle background sacred symbol watermark */}
        <div className="sacred-watermark">🕉️</div>

        {/* Decorative corner motifs */}
        <div className="corner-decor top-left"></div>
        <div className="corner-decor top-right"></div>
        <div className="corner-decor bottom-left"></div>
        <div className="corner-decor bottom-right"></div>

        <div className="card-inner">
          <div className="main-content-layout">

            {/* LEFT COLUMN: Date & Day + Vedic Attributes Grid */}
            <div className="layout-col left-col">
              {/* Top Row: Date, Telugu Day & Sanskrit Day */}
              <div className="summary-hero-header">
                <div className="date-badge-container">
                  <div className="gregorian-calendar-plate">
                    <div className="plate-top">
                      <Calendar size={11} className="calendar-plate-icon" />
                      <span>నేటి తేదీ</span>
                    </div>
                    <div className="plate-body">
                      <span className="date-number">{formattedDate.split('-')[0]}</span>
                      <span className="date-month-year">{formattedDate.split('-')[1]}-{formattedDate.split('-')[2]}</span>
                    </div>
                  </div>
                </div>

                <div className="day-headings">
                  <span className="divine-tagline">✨ శ్రీ గోవిందరాజస్వామి అనుగ్రహంతో.. ✨</span>
                  <div className="days-flex-row">
                    <span className="telugu-day-badge">{live.monthDayVaraHeaderTe}</span>
                    <span className="sanskrit-day-text">({live.sanskritVaraHeaderTe})</span>
                  </div>
                </div>
              </div>

              <div className="gold-accent-line"></div>

              {/* Attributes Grid (2x2 Layout for compactness) */}
              <div className="panchangam-attributes-grid">
                <div className="attribute-card">
                  <div className="attribute-icon-wrapper samvatsara">
                    <Award size={18} className="attr-icon" />
                  </div>
                  <div className="attribute-details">
                    <span className="attribute-label">సంవత్సరం</span>
                    <span className="attribute-value">{live.samvatsaraNameTe || '—'}</span>
                  </div>
                </div>

                <div className="attribute-card">
                  <div className="attribute-icon-wrapper masa">
                    <Moon size={18} className="attr-icon" />
                  </div>
                  <div className="attribute-details">
                    <span className="attribute-label">మాసం</span>
                    <span className="attribute-value">{live.masaNameTe || '—'}</span>
                  </div>
                </div>

                <div className="attribute-card">
                  <div className="attribute-icon-wrapper ritu">
                    <Sun size={18} className="attr-icon" />
                  </div>
                  <div className="attribute-details">
                    <span className="attribute-label">ఋతువు</span>
                    <span className="attribute-value">{live.rituNameTe || '—'}</span>
                  </div>
                </div>

                <div className="attribute-card">
                  <div className="attribute-icon-wrapper ayana">
                    <Compass size={18} className="attr-icon" />
                  </div>
                  <div className="attribute-details">
                    <span className="attribute-label">అయనం</span>
                    <span className="attribute-value">{live.ayanaNameTe || '—'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Auspicious Timings + Festival Spotlight */}
            <div className="layout-col right-col">
              {/* Auspicious Timings Section */}
              <div className="timings-showcase-box">
                <div className="timings-header-row">
                  <Clock size={16} className="gold-icon animate-pulse" />
                  <h4>శుభ సమయాలు <span className="subtitle-brackets">(అభిజిత్ & గౌరీ కాలాలు)</span></h4>
                </div>
                <div className="auspicious-pills-container">
                  {renderAuspiciousTimings()}
                </div>
              </div>

              {/* Festival / Speciality Section */}
              <div className="festival-spotlight-card">
                <div className="fest-bell-container">
                  <Bell size={22} className="swinging-bell" />
                  <div className="bell-glow-effect"></div>
                </div>
                <div className="fest-details">
                  <span className="fest-badge">నేటి పండుగ / విశేషం</span>
                  <h3 className="fest-title">{getFestivalName()}</h3>
                </div>
                <div className="sparkles-decor">
                  <Sparkles size={18} className="sparkles-icon" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .divine-summary-wrapper {
          width: 100%;
          margin: 0.15rem 0 1.5rem 0;
          position: relative;
        }

        .toran-header {
          width: 100%;
          height: 24px;
          position: relative;
          z-index: 10;
          margin-bottom: -12px;
        }

        .toran-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .divine-summary-card {
          position: relative;
          background: linear-gradient(135deg, #3a0000 0%, #200000 50%, #150000 100%);
          border: 2px solid #D4AF37;
          border-radius: 20px;
          padding: 1.25rem 1.75rem;
          color: white;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), inset 0 0 25px rgba(212, 175, 55, 0.15);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .divine-summary-card:hover {
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5), inset 0 0 35px rgba(212, 175, 55, 0.25);
          border-color: #F7EF8A;
          transform: translateY(-1px);
        }

        /* Sacred Watermark */
        .sacred-watermark {
          position: absolute;
          right: 5%;
          top: 20%;
          font-size: 12rem;
          color: rgba(212, 175, 55, 0.025);
          font-family: serif;
          pointer-events: none;
          user-select: none;
          z-index: 1;
        }

        /* Decorative Corner Elements */
        .corner-decor {
          position: absolute;
          width: 24px;
          height: 24px;
          border: 1.5px solid rgba(212, 175, 55, 0.4);
          pointer-events: none;
          z-index: 3;
          transition: all 0.3s ease;
        }

        .divine-summary-card:hover .corner-decor {
          border-color: #F7EF8A;
        }

        .corner-decor.top-left {
          top: 8px;
          left: 8px;
          border-right: none;
          border-bottom: none;
        }

        .corner-decor.top-left::before {
          content: '';
          position: absolute;
          top: 3px;
          left: 3px;
          width: 5px;
          height: 5px;
          background: #D4AF37;
          border-radius: 50%;
        }

        .corner-decor.top-right {
          top: 8px;
          right: 8px;
          border-left: none;
          border-bottom: none;
        }

        .corner-decor.top-right::before {
          content: '';
          position: absolute;
          top: 3px;
          right: 3px;
          width: 5px;
          height: 5px;
          background: #D4AF37;
          border-radius: 50%;
        }

        .corner-decor.bottom-left {
          bottom: 8px;
          left: 8px;
          border-right: none;
          border-top: none;
        }

        .corner-decor.bottom-left::before {
          content: '';
          position: absolute;
          bottom: 3px;
          left: 3px;
          width: 5px;
          height: 5px;
          background: #D4AF37;
          border-radius: 50%;
        }

        .corner-decor.bottom-right {
          bottom: 8px;
          right: 8px;
          border-left: none;
          border-top: none;
        }

        .corner-decor.bottom-right::before {
          content: '';
          position: absolute;
          bottom: 3px;
          right: 3px;
          width: 5px;
          height: 5px;
          background: #D4AF37;
          border-radius: 50%;
        }

        .card-inner {
          position: relative;
          z-index: 2;
        }

        /* 2-Column Main Layout for Height Reduction */
        .main-content-layout {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 1.5rem;
          align-items: stretch;
        }

        .layout-col {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          justify-content: space-between;
        }

        /* Hero Header Section */
        .summary-hero-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        /* Gregorian Calendar Plate */
        .gregorian-calendar-plate {
          width: 90px;
          background: #FDF5E6;
          border-radius: 10px;
          box-shadow: 0 6px 12px rgba(0,0,0,0.25);
          border: 1.5px solid #D4AF37;
          overflow: hidden;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .divine-summary-card:hover .gregorian-calendar-plate {
          transform: rotate(-2deg) scale(1.03);
        }

        .plate-top {
          background: linear-gradient(135deg, #B02B2B, #800000);
          color: white;
          padding: 0.25rem 0.4rem;
          font-size: 0.65rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.2rem;
          letter-spacing: 0.3px;
          text-transform: uppercase;
        }

        .calendar-plate-icon {
          color: #F7EF8A;
        }

        .plate-body {
          padding: 0.35rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #FEF9E5;
        }

        .date-number {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: #800000;
          line-height: 1;
        }

        .date-month-year {
          font-size: 0.68rem;
          font-weight: 700;
          color: #666666;
          margin-top: 0.1rem;
        }

        /* Day Headings */
        .day-headings {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .divine-tagline {
          font-size: 0.78rem;
          color: #F7EF8A;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }

        .days-flex-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .telugu-day-badge {
          background: linear-gradient(135deg, #FF9933 0%, #FFB366 100%);
          color: #4A0000;
          padding: 0.3rem 0.85rem;
          border-radius: 50px;
          font-size: 0.95rem;
          font-weight: 800;
          box-shadow: 0 3px 10px rgba(255, 153, 51, 0.2);
          letter-spacing: 0.3px;
          border: 1px solid #F7EF8A;
        }

        .sanskrit-day-text {
          color: #E2C275;
          font-size: 0.95rem;
          font-weight: 700;
          font-family: var(--font-heading);
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        /* Gold Accent Line Divider */
        .gold-accent-line {
          height: 1px;
          width: 100%;
          background: linear-gradient(to right, transparent 5%, #D4AF37 50%, transparent 95%);
          margin: 0.15rem 0;
        }

        /* Attributes Grid Styling (2x2 Compact Grid) */
        .panchangam-attributes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .attribute-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(212, 175, 55, 0.15);
          padding: 0.65rem 0.85rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          backdrop-filter: blur(10px);
        }

        .attribute-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: #D4AF37;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
        }

        .attribute-icon-wrapper {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .attribute-icon-wrapper.samvatsara {
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.25);
          color: #D4AF37;
        }

        .attribute-icon-wrapper.masa {
          background: rgba(52, 152, 219, 0.1);
          border: 1px solid rgba(52, 152, 219, 0.25);
          color: #5dade2;
        }

        .attribute-icon-wrapper.ritu {
          background: rgba(230, 126, 34, 0.1);
          border: 1px solid rgba(230, 126, 34, 0.25);
          color: #eb984e;
        }

        .attribute-icon-wrapper.ayana {
          background: rgba(155, 89, 182, 0.1);
          border: 1px solid rgba(155, 89, 182, 0.25);
          color: #bb8fce;
        }

        .attr-icon {
          filter: drop-shadow(0 0 2px currentColor);
        }

        .attribute-details {
          display: flex;
          flex-direction: column;
          gap: 0.05rem;
        }

        .attribute-label {
          font-size: 0.68rem;
          color: #E2C275;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          font-weight: 700;
        }

        .attribute-value {
          font-size: clamp(0.78rem, 1.6vw, 0.88rem);
          font-weight: 700;
          color: white;
          letter-spacing: 0.2px;
          line-height: 1.3;
        }

        /* Auspicious Timings Showcase Box */
        .timings-showcase-box {
          background: rgba(16, 185, 129, 0.02);
          border: 1px solid rgba(16, 185, 129, 0.18);
          padding: 0.85rem 1.15rem;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          box-shadow: inset 0 0 10px rgba(16, 185, 129, 0.04);
          height: 100%;
          justify-content: center;
        }

        .timings-header-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .timings-header-row h4 {
          margin: 0;
          font-size: 0.9rem;
          color: #2ecc71;
          font-weight: 800;
          letter-spacing: 0.3px;
        }

        .subtitle-brackets {
          color: #E2C275;
          font-size: 0.78rem;
          font-weight: 600;
        }

        .auspicious-pills-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.45rem;
        }

        .auspicious-pill {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 0.3rem 0.65rem;
          border-radius: 30px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #a3e4d7;
          transition: all 0.2s ease;
          cursor: default;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .auspicious-pill:hover {
          background: rgba(16, 185, 129, 0.18);
          border-color: #2ecc71;
          transform: translateY(-1px);
        }

        .pill-icon {
          color: #2ecc71;
          flex-shrink: 0;
        }

        .no-timings {
          color: #E2C275;
          font-size: 0.85rem;
          font-style: italic;
          grid-column: span 2;
        }

        /* Festival Spotlight Card */
        .festival-spotlight-card {
          position: relative;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(255, 153, 51, 0.06) 100%);
          border: 1.5px solid #D4AF37;
          border-radius: 14px;
          padding: 0.85rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .festival-spotlight-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(255,153,51,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .fest-bell-container {
          position: relative;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .swinging-bell {
          color: #FFD700;
          filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.6));
          transform-origin: top center;
          animation: swing 3s ease-in-out infinite;
          z-index: 2;
        }

        .bell-glow-effect {
          position: absolute;
          width: 28px;
          height: 28px;
          background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulseGlow 2s ease-in-out infinite;
          z-index: 1;
        }

        .fest-details {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          flex-grow: 1;
          position: relative;
          z-index: 2;
        }

        .fest-badge {
          font-size: 0.68rem;
          font-weight: 800;
          color: #FFAA88;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .fest-title {
          font-size: 1.2rem;
          font-weight: 900;
          margin: 0;
          background: linear-gradient(to right, #FFF099, #FFD700, #FF9933);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 1px 3px rgba(0,0,0,0.2);
          letter-spacing: 0.3px;
        }

        .sparkles-decor {
          flex-shrink: 0;
          position: relative;
          z-index: 2;
        }

        .sparkles-icon {
          color: #FFD700;
          filter: drop-shadow(0 0 3px rgba(255, 215, 0, 0.4));
          animation: sparkleSpin 4s linear infinite;
        }

        /* Animations */
        @keyframes swing {
          0%, 100% { transform: rotate(0); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-12deg); }
          60% { transform: rotate(8deg); }
          80% { transform: rotate(-5deg); }
        }

        @keyframes pulseGlow {
          0%, 100% { transform: scale(0.9); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }

        @keyframes sparkleSpin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.15); }
          100% { transform: rotate(360deg) scale(1); }
        }

        
        /* Responsive Layouts */
        @media (max-width: 992px) {
          .main-content-layout {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          
          .layout-col {
            justify-content: flex-start;
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .divine-summary-card {
            padding: 1.25rem;
          }

          .telugu-day-badge {
            font-size: 0.9rem;
            padding: 0.25rem 0.75rem;
          }

          .sanskrit-day-text {
            font-size: 0.9rem;
          }

          .fest-title {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 540px) {
          .summary-hero-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
          
          .day-headings {
            width: 100%;
          }

          .days-flex-row {
            justify-content: flex-start;
            width: 100%;
          }

          .panchangam-attributes-grid {
            grid-template-columns: 1fr;
            gap: 0.65rem;
          }

          .auspicious-pills-container {
            grid-template-columns: 1fr;
          }

          .festival-spotlight-card {
            padding: 0.75rem 1rem;
            gap: 1rem;
          }

          .fest-title {
            font-size: 1.05rem;
          }

          .sparkles-decor {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default DailyDivineSummary;
