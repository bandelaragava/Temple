import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Image, Phone } from 'lucide-react';

// Custom Gopuram (Temple) Icon SVG
const TempleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="gold-icon">
    <path d="M12 2L9 5h6l-3-3zm-3 4h6v3H9V6zm-1.5 4h9v3h-9v-3zm-2 4h13v3H5.5v-3zM4 19h16v3H4v-3zm6 3h4v-3h-4v3z" />
  </svg>
);

// Custom Diya (Lamp) Icon SVG
const DiyaIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="gold-icon">
    <path d="M12 2C13 4.5 13 6 12 7.5C11 6 11 4.5 12 2Z" fill="#FFA500" />
    <path d="M3 12C3 17 7 19 12 19C17 19 21 17 21 12C21 11.5 20.5 11 20 11H4C3.5 11 3 11.5 3 12Z" />
    <path d="M10 19L9 22H15L14 19H10Z" />
  </svg>
);

// Custom Folded Hands (Namaste) Icon SVG
const FoldedHandsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="gold-icon">
    <path d="M12.01 2.25c-.27 0-.54.1-.75.31L7.15 6.67c-.4.4-.64.96-.64 1.55v4.54c0 .3.06.6.18.88l2.91 6.82c.31.73 1.14 1.07 1.87.76.73-.31 1.07-1.14.76-1.87l-2.31-5.4v-.11l4.02 4.02c.49.49 1.28.49 1.77 0 .49-.49.49-1.28 0-1.77l-3.32-3.32h-.11l3.52 3.52c.49.49 1.28.49 1.77 0 .49-.49.49-1.28 0-1.77l-3.31-3.31h-.11l2.81 2.81c.49.49 1.28.49 1.77 0 .49-.49.49-1.28 0-1.77l-3.51-3.51c-.13-.13-.25-.28-.35-.44l-2.07-3.46c-.23-.39-.65-.63-1.1-.63z" fill="#D4AF37" />
  </svg>
);

// Corner Ornament SVG for the corners of the banner
const CornerOrnament = ({ style }: { style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '45px', height: '45px', position: 'absolute', pointerEvents: 'none', zIndex: 5, ...style }}
  >
    {/* Ornate corner borders and flourish */}
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

const QuickActionsBanner = () => {
  const navigate = useNavigate();

  const handlePanchangamClick = () => {
    const el = document.querySelector('.almanac-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLiveAartiClick = () => {
    const el = document.querySelector('.live-preview-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/darshan');
    }
  };

  const actions = [
    {
      icon: <Calendar size={28} className="gold-icon" />,
      line1: "Today's",
      line2: "Panchangam",
      onClick: handlePanchangamClick,
    },
    {
      icon: <TempleIcon />,
      line1: "Book",
      line2: "Darshan",
      onClick: () => navigate('/booking'),
    },
    {
      icon: <DiyaIcon />,
      line1: "Watch",
      line2: "Live Aarti",
      onClick: handleLiveAartiClick,
    },
    {
      icon: <FoldedHandsIcon />,
      line1: "Sevas &",
      line2: "Pujas",
      onClick: () => navigate('/booking'),
    },
    {
      icon: <Image size={28} className="gold-icon" />,
      line1: "Photo",
      line2: "Gallery",
      onClick: () => navigate('/gallery'),
    },
    {
      icon: <Phone size={28} className="gold-icon" />,
      line1: "Contact",
      line2: "Us",
      onClick: () => navigate('/contact'),
    },
  ];

  return (
    <div className="quick-actions-banner-wrapper">
      <div className="quick-actions-banner">
        {/* Four Corner Ornaments */}
        <CornerOrnament style={{ top: '6px', left: '6px' }} />
        <CornerOrnament style={{ top: '6px', right: '6px', transform: 'scaleX(-1)' }} />
        <CornerOrnament style={{ bottom: '6px', left: '6px', transform: 'scaleY(-1)' }} />
        <CornerOrnament style={{ bottom: '6px', right: '6px', transform: 'scale(-1)' }} />

        {/* Buttons List */}
        <div className="banner-items">
          {actions.map((act, index) => (
            <React.Fragment key={index}>
              <button className="banner-item" onClick={act.onClick}>
                <div className="banner-icon-container">
                  {act.icon}
                </div>
                <div className="banner-text">
                  <span className="banner-line1">{act.line1}</span>
                  <span className="banner-line2">{act.line2}</span>
                </div>
              </button>
              {index < actions.length - 1 && <div className="banner-divider"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        .quick-actions-banner-wrapper {
          width: 100%;
          padding: 0;
          margin-top: -3.5rem; /* Shift upwards to overlap the Hero */
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 10;
          box-sizing: border-box;
        }

        .quick-actions-banner {
          position: relative;
          background: linear-gradient(to bottom, rgba(139, 0, 0, 0.92), rgba(90, 0, 0, 0.98)), url('/assets/maroon_bg.png') center/cover no-repeat;
          border: 2.5px solid #D4AF37;
          border-radius: 16px;
          padding: 1.25rem 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 90px;
          box-sizing: border-box;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .banner-items {
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 100%;
          max-width: 1200px;
          flex-wrap: nowrap;
          z-index: 10;
        }

        .banner-item {
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
          min-width: 0;
        }

        .banner-item:hover {
          transform: translateY(-3px);
          filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
        }

        .banner-item:active {
          transform: translateY(-1px);
        }

        .banner-icon-container {
          color: #D4AF37;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .banner-item:hover .banner-icon-container {
          transform: scale(1.1);
        }

        .banner-text {
          display: flex;
          flex-direction: column;
          font-family: 'Outfit', 'Inter', sans-serif;
          line-height: 1.2;
          min-width: 0;
        }

        .banner-line1 {
          font-size: 0.85rem;
          font-weight: 500;
          color: #E2C275;
          text-transform: capitalize;
          opacity: 0.9;
        }

        .banner-line2 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #FFD700;
          text-transform: capitalize;
          letter-spacing: 0.5px;
        }

        .banner-divider {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, #D4AF37, transparent);
          opacity: 0.6;
          flex-shrink: 0;
        }

        @media (max-width: 1024px) {
          .quick-actions-banner {
            padding: 1.5rem 1rem;
          }
          .banner-line1 {
            font-size: 0.75rem;
          }
          .banner-line2 {
            font-size: 0.95rem;
          }
          .banner-item {
            gap: 0.5rem;
            padding: 0.25rem 0.5rem;
          }
        }

        @media (max-width: 768px) {
          .banner-items {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1rem 0.5rem;
          }
          .banner-divider {
            display: none;
          }
          .banner-item {
            justify-content: flex-start;
            padding: 0.5rem;
          }
          .quick-actions-banner {
            min-height: auto;
            padding: 2.5rem 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .banner-items {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .banner-line2 {
            font-size: 0.9rem;
          }
          .banner-line1 {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
};

export default QuickActionsBanner;
