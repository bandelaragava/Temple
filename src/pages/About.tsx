import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Bookmark, MapPin, Phone, Mail, Landmark, Sparkles, BookOpen, Clock, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('history');

  const sidebarLinks = [
    { id: 'history', label: t('sidebar_history') },
    { id: 'ramanujacharya', label: t('sidebar_ramanuja') },
    { id: 'shrines', label: t('sidebar_shrines') },
    { id: 'rituals', label: t('sidebar_rituals') },
    { id: 'architecture', label: t('sidebar_architecture') }
  ];

  const subShrines = [
    { name: t('seva_parthasarathi_name') || "Sri Parthasarathi Swamy", desc: t('seva_parthasarathi_desc') || "The original presiding deity of the temple site before the installation of Govindara Swamy" },
    { name: t('shrine_pundarikavalli_name') || "Sri Pundarikavalli Thayar", desc: t('shrine_pundarikavalli_desc') || "A dedicated shrine for the Goddess of Lotus, representing divine compassion." },
    { name: t('shrine_andal_name') || "Sri Andal (Choodikudutha Nachiyar)", desc: t('shrine_andal_desc') || "The patron saint who offered floral garlands to the Lord." },
    { name: t('shrine_chakra_name') || "Sri Chakrathalwar", desc: t('shrine_chakra_desc') || "The deity of the divine Sudarshana Chakra, the protective weapon of Vishnu." },
    { name: t('shrine_alwars_name') || "The 12 Alwars", desc: t('shrine_alwars_desc') || "Individual shrines for the great Vaishnava saints who sang the glory of the Lord." }
  ];

  return (
    <div className="about-modern section-padding">
      <div className="container about-grid">
        {/* Sidebar */}
        <aside className="about-sidebar">
          <div className="sidebar-card glass-card">
            <h3>{t('about_directory')}</h3>
            <div className="sidebar-links">
              {sidebarLinks.map((link) => (
                <button
                  key={link.id}
                  className={`sidebar-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveSection(link.id);
                    document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                  <ChevronRight size={18} />
                  <span>{link.label}</span>
                </button>
              ))}
            </div>

            <div className="quick-info mt-4">
              <h4>{t('pilgrim_facilities')}</h4>
              <p><Heart size={14} /> {t('facility_annadanam')}</p>
              <p><Clock size={14} /> {t('facility_support')}</p>
              <p><Bookmark size={14} /> {t('facility_booking')}</p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="about-main-content">
          <div className="breadcrumb">
            <span>{t('breadcrumb_home')}</span> <ChevronRight size={14} /> <span>{t('breadcrumb_about')}</span>
          </div>

          <motion.div
            className="content-card glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="main-title">{t('temple_name')}</h1>
            <p className="subtitle-te">{t('about_main_title')}</p>

            <div className="content-image-top">
              <img src="/assets/saint.png" alt="Main Temple" />
              <div className="img-caption">{t('about_img_caption')}</div>
            </div>

            <section id="history" className="content-section">
              <h2><Landmark className="marker" /> {t('history_title')}</h2>
              <div className="drop-cap-text">
                <p>{t('history_p1')}</p>
                <p>{t('history_p2')}</p>
              </div>

              <div className="image-float-right">
                <img src="/assets/deity.png" alt="Deity" />
                <p>{t('deity_form')}</p>
              </div>

              <p>{t('history_p3')}</p>
            </section>

            <section id="ramanujacharya" className="content-section">
              <h2><BookOpen className="marker" /> {t('ramanuja_title')}</h2>
              <p>{t('ramanuja_p1')}</p>
              <p>{t('ramanuja_p2')}</p>
            </section>

            <section id="shrines" className="content-section">
              <h2><Sparkles className="marker" /> {t('shrines_title')}</h2>
              <p>{t('shrines_p1')}</p>
              <div className="bento-shrines">
                {subShrines.map((shrine, i) => (
                  <div key={i} className="shrine-card">
                    <h4>{shrine.name}</h4>
                    <p>{shrine.desc}</p>
                  </div>
                ))}
              </div>
              <p>{t('shrines_p2')}</p>
            </section>

            <section id="rituals" className="content-section">
              <h2><Clock className="marker" /> {t('rituals_title')}</h2>
              <p>{t('rituals_p1')}</p>
              <div className="quote-box">
                "{t('rituals_quote')}"
              </div>
              <p>{t('rituals_p2')}</p>
            </section>

            <section id="architecture" className="content-section">
              <h2><MapPin className="marker" /> {t('architecture_title')}</h2>
              <p>{t('architecture_p1')}</p>
              <div className="double-image-grid">
                <img src="/assets/main_govindaraja.png" alt="Main Sanctum Interior" />
                <img src="/assets/saint.png" alt="Architectural Perspective" />
              </div>
              <p>{t('architecture_p2')}</p>
            </section>
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-modern {
          background: #fdfaf3;
          margin-top: 80px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 3rem;
        }

        .about-sidebar {
          position: sticky;
          top: 120px;
          height: fit-content;
        }

        .sidebar-card {
          padding: 2rem;
          background: white;
          border-left: 5px solid var(--primary);
        }

        .sidebar-card h3 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: var(--secondary);
          border-bottom: 1px solid #eee;
          padding-bottom: 1rem;
        }

        .sidebar-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem 1rem;
          border-radius: 8px;
          text-align: left;
          color: var(--text-muted);
          transition: all 0.3s ease;
          background: none;
          cursor: pointer;
        }

        .sidebar-link:hover {
          background: var(--marble);
          color: var(--primary);
        }

        .sidebar-link.active {
          background: var(--primary);
          color: white;
        }

        .quick-info h4 {
          font-size: 1rem;
          margin: 1.5rem 0 1rem;
          color: var(--secondary);
        }

        .quick-info p {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 0.8rem;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .content-card {
          padding: 4rem;
          background: white;
          box-shadow: 0 10px 50px rgba(0,0,0,0.05);
        }

        .main-title {
          font-size: 3rem;
          color: var(--secondary);
          margin-bottom: 0.5rem;
        }

        .subtitle-te {
          font-size: 1.25rem;
          color: var(--primary);
          margin-bottom: 2.5rem;
          font-weight: 600;
        }

        .content-image-top img {
          width: 100%;
          height: 450px;
          object-fit: cover;
          border-radius: 20px;
        }

        .img-caption {
          background: var(--marble);
          padding: 1rem;
          text-align: center;
          font-size: 0.9rem;
          font-style: italic;
          color: var(--text-muted);
          margin-top: 10px;
          border-radius: 8px;
        }

        .content-section {
          margin-bottom: 4rem;
          scroll-margin-top: 140px;
        }

        .content-section h2 {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.8rem;
          color: var(--secondary);
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #eee;
          padding-bottom: 0.75rem;
        }

        .marker {
          color: var(--primary);
        }

        .drop-cap-text p:first-of-type::first-letter {
          font-size: 3.5rem;
          float: left;
          line-height: 1;
          padding-right: 10px;
          color: var(--primary);
          font-weight: 700;
          font-family: var(--font-heading);
        }

        .content-section p {
          font-size: 1.1rem;
          line-height: 1.9;
          color: var(--text);
          margin-bottom: 1.5rem;
          text-align: justify;
        }

        .image-float-right {
          float: right;
          width: 320px;
          margin-left: 2rem;
          margin-bottom: 2rem;
          padding: 1rem;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 15px;
          text-align: center;
          box-shadow: var(--shadow);
        }

        .image-float-right img {
          width: 100%;
          border-radius: 10px;
        }

        .bento-shrines {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .shrine-card {
          padding: 1.5rem;
          background: var(--marble);
          border-radius: 12px;
          border-left: 3px solid var(--primary);
        }

        .shrine-card h4 {
          color: var(--secondary);
          margin-bottom: 0.5rem;
        }

        .shrine-card p {
          font-size: 0.95rem !important;
          margin: 0 !important;
          line-height: 1.5 !important;
        }

        .quote-box {
          border-left: 4px solid var(--primary);
          padding: 1.5rem 2rem;
          background: #fff9f0;
          font-style: italic;
          font-size: 1.2rem;
          color: var(--secondary);
          margin: 2.5rem 0;
          font-weight: 500;
        }

        .double-image-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .double-image-grid img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          border-radius: 15px;
        }

        @media (max-width: 1100px) {
          .about-grid { grid-template-columns: 1fr; }
          .about-sidebar { display: none; }
          .content-card { padding: 2rem; }
          .image-float-right { float: none; width: 100%; margin-left: 0; }
        }
      `}</style>
    </div>
  );
};

export default About;
