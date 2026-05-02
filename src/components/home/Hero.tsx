import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Ticket, Heart, Clock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Ticker from '../layout/Ticker';

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const quickActions = [
    { icon: <Clock size={20} />, label: t('nav_darshan') || 'Darshan', color: '#FF9933', path: '/darshan' },
    { icon: <Ticket size={20} />, label: t('nav_booking') || 'Booking', color: '#D4AF37', path: '/booking' },
    { icon: <Calendar size={20} />, label: t('nav_festivals') || 'Festivals', color: '#800000', path: '/festivals' },
    { icon: <Heart size={20} />, label: t('nav_ehundi') || 'E-Hundi', color: '#FF5E5E', path: '/donate' },
  ];

  return (
    <section className="hero-bhadradri official-portal-layout">
      {/* Marriage Card Frame */}
      <div className="card-frame-border"></div>

      <div className="hero-viewport full-width-hero">
        {/* Layer 1: Divine Rays */}
        <div className="divine-rays"></div>

        {/* Layer 2: Main Deity */}
        <div className="deity-background-layer">
          <motion.img
            src="/assets/MainGovindaSwami.jpg.jpeg"
            alt="Sri Govindha Raja Swamy"
            className="center-deity-image"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          />
        </div>

        {/* Layer 3: Split Statue Layer (Removing the Bow) */}
        <div className="statue-overlay-layer">
          <div className="hero-statue-left"></div>
          <div className="hero-statue-right"></div>

          {/* Top Om Emblem (Still needed at top of arch) */}
          <div className="om-emblem-overlay">
            <img src="/assets/Om_Gold.png" alt="Om" className="om-icon-gold" />
          </div>
        </div>
      </div>




      <style>{`
        .hero-bhadradri {
          position: relative;
          background: #4b0000 url('/assets/maroon_bg.png') center/cover no-repeat;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .official-portal-layout {
          background: #4b0000;
          position: relative;
          /* Clamp: min 480px, scales with viewport, max 680px — consistent across 1024-1920px laptops */
          height: clamp(480px, 29.4vw, 680px);
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 0;
          border: none;
        }

        .full-width-hero {
          width: 100%;
          height: 100%;
          padding: 0;
          margin: 0;
          max-width: 100% !important;
        }

        .deity-background-layer {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
          background: #4b0000;
        }

        .center-deity-image {
          height: 88%;
          width: auto;
          max-width: 52%;
          object-fit: contain;
          filter: drop-shadow(0 0 50px rgba(0,0,0,0.8));
          margin-bottom: 0;
        }

        .statue-overlay-layer {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
        }

        .hero-statue-left {
          position: absolute;
          left: 0;
          bottom: 0;
          /* Clamp width so pillars don't crowd center on narrow laptops or spread too wide on 1920p */
          width: clamp(18%, 22%, 27%);
          height: 100%;
          background: url('/assets/Frame_slide_full.png') left bottom no-repeat;
          background-size: auto 100%;
        }

        .hero-statue-right {
          position: absolute;
          right: 0;
          bottom: 0;
          width: clamp(18%, 22%, 27%);
          height: 100%;
          background: url('/assets/Frame_slide_full.png') right bottom no-repeat;
          background-size: auto 100%;
        }

        .om-emblem-overlay {
          position: absolute;
          top: 5%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 4;
        }

        .om-icon-gold {
          /* Scale Om icon with viewport for consistency */
          width: clamp(48px, 5vw, 80px);
          height: auto;
          filter: drop-shadow(0 0 10px #ffd700);
        }

        .hanging-decorations-layer {
          position: absolute;
          top: 0;
          right: 5%;
          display: flex;
          gap: 2rem;
          z-index: 5;
        }

        .ornaments-img {
          width: 100px;
          height: auto;
          filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.6));
          mix-blend-mode: screen; 
          animation: sway 5s infinite ease-in-out;
          transform-origin: top center;
        }

        .ornaments-img.delayed {
          animation-delay: 2.5s;
          width: 80px;
          margin-top: 2rem;
        }

        .marriage-card-style {
          background: #500000; 
          border: 20px solid transparent;
          border-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L100 0 L100 100 L0 100 Z' fill='none' stroke='%23ffd700' stroke-width='4'/%3E%3Ccircle cx='0' cy='0' r='10' fill='%23ffd700'/%3E%3Ccircle cx='100' cy='0' r='10' fill='%23ffd700'/%3E%3Ccircle cx='100' cy='100' r='10' fill='%23ffd700'/%3E%3Ccircle cx='0' cy='100' r='10' fill='%23ffd700'/%3E%3C/svg%3E") 30 stretch;
          box-shadow: inset 0 0 100px rgba(0,0,0,0.5);
        }

        .divine-rays {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
          animation: rotateRays 20s linear infinite;
          z-index: 1;
        }

        @keyframes rotateRays {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .gold-shimmer {
          background: linear-gradient(110deg, #d4af37 8%, #fff7d1 18%, #d4af37 33%);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }

        @keyframes shimmer {
          to { background-position-x: -200%; }
        }

        .marriage-frame {
          border-width: 15px;
          border-style: solid;
          border-image: linear-gradient(to bottom, #ffd700, #b8860b) 1;
          background: rgba(0,0,0,0.7);
        }

        .sacred-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 80%);
          pointer-events: none;
        }

        .petal {
          position: absolute;
          width: 15px;
          height: 15px;
          background: #ff69b4; /* Pink petals */
          border-radius: 50% 0 50% 50%;
          opacity: 0.6;
          animation: drift 10s linear infinite;
          z-index: 6;
        }

        .p1 { left: 10%; animation-delay: 0s; }
        .p2 { left: 50%; animation-delay: 3s; }
        .p3 { left: 80%; animation-delay: 6s; }

        @keyframes drift {
          0% { transform: translateY(-100px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(800px) rotate(720deg); opacity: 0; }
        }

        .sway-slow { animation: sway 6s infinite ease-in-out; }
        .sway-fast { animation: sway 4s infinite ease-in-out; }

        /* ── Standard laptop: 1101px – 1399px ── */
        @media (min-width: 1101px) and (max-width: 1399px) {
          .center-deity-image { max-width: 56%; height: 88%; }
          .hero-statue-left, .hero-statue-right { width: 21%; }
        }

        /* ── Wide desktop (1400px – 1919px) ── */
        @media (min-width: 1400px) and (max-width: 1919px) {
          .center-deity-image { max-width: 50%; height: 88%; }
        }

        /* ── Ultra-wide (1920px+) ── */
        @media (min-width: 1920px) {
          .center-deity-image { max-width: 44%; height: 86%; }
          .hero-statue-left, .hero-statue-right { width: 19%; }
        }

        /* ── 1024px laptop range: 901px – 1100px ── */
        @media (max-width: 1100px) and (min-width: 901px) {
          .official-portal-layout {
            height: min(42vw, calc(100vh - 255px));
            min-height: 300px;
          }
          .center-deity-image {
            /* Smaller center image — gives side statues more room */
            width: auto;
            max-width: 44%;
            height: 70%;
            object-fit: contain;
            margin-bottom: 0;
          }
          /* Wider side containers so Garuda & Hanuman are more visible */
          .hero-statue-left {
            width: 24%;
            background-size: auto 100%;
            background-position: left bottom;
          }
          .hero-statue-right {
            width: 24%;
            background-size: auto 100%;
            background-position: right bottom;
          }
          .om-icon-gold { width: 40px; }
          .divine-rays { width: 260px; height: 260px; }
        }

        /* ── Large tablet: 769px – 900px ── */
        @media (max-width: 900px) and (min-width: 769px) {
          .official-portal-layout {
            height: clamp(420px, 50vw, 480px);
          }
          .center-deity-image { max-width: 68%; height: 85%; margin-bottom: 0; }
          .hero-statue-left {
            width: 16%;
            background-size: auto 100%;
            background-position: left bottom;
          }
          .hero-statue-right {
            width: 16%;
            background-size: auto 100%;
            background-position: right bottom;
          }
          .divine-rays { display: none; }
        }

        /* ── Mobile (≤768px) ── */
        @media (max-width: 768px) {
          .official-portal-layout { 
            height: auto; 
            min-height: auto;
            width: 100%; 
            border: none; 
            margin-bottom: 0; 
            display: block;
          }
          .hero-viewport { height: auto; }
          .deity-background-layer { position: relative; height: auto; inset: auto; display: block; }
          .center-deity-image { 
            height: auto; 
            width: 100%; 
            max-width: 100%; 
            object-fit: cover; 
            margin-bottom: 0; 
            display: block;
          }
          .divine-rays { display: none; }
          .majestic-arch { display: none; }
          .ornaments-layer { display: none; }
          .hero-statue-left, .hero-statue-right { display: none; }
          .card-frame-border { border-width: 4px; }
          .om-emblem-overlay { top: 10px; }
        }

        @media (max-width: 480px) {
          .center-deity-image { width: 100%; height: auto; }
          .om-icon-gold { width: 30px; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
