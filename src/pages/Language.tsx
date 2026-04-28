import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Language = () => {
  const navigate = useNavigate();
  const { language: selected, setLanguage, t } = useLanguage();

  const languages = [
    { id: 'en', tKey: 'lang_en', native: t('lang_native_en'), region: t('region_global') },
    { id: 'te', tKey: 'lang_te', native: t('lang_native_te'), region: t('region_telugu') },
    { id: 'ta', tKey: 'lang_ta', native: t('lang_native_ta'), region: t('region_tamil') },
    { id: 'kn', tKey: 'lang_kn', native: t('lang_native_kn'), region: t('region_kannada') },
    { id: 'hi', tKey: 'lang_hi', native: t('lang_native_hi'), region: t('region_hindi') },
    { id: 'sa', tKey: 'lang_sa', native: t('lang_native_sa'), region: t('region_spiritual') },
  ] as const;

  const handleSelect = (id: typeof languages[number]['id']) => {
    setLanguage(id);
    const selectedLang = languages.find(l => l.id === id);
    setTimeout(() => {
      alert(`${t('alert_lang_updated')} ${selectedLang?.native}.`);
      navigate('/');
    }, 300);
  };

  return (
    <div className="language-page section-padding" style={{ paddingTop: '150px' }}>
      <div className="container">
        <div className="header-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="subtitle"
          >
            {t('divine_portal')}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t('choose_language')}
          </motion.h1>
          <p className="description">{t('lang_select_desc')}</p>
        </div>

        <div className="languages-grid">
          {languages.map((lang, idx) => (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`lang-card glass-card ${selected === lang.id ? 'selected' : ''}`}
              onClick={() => handleSelect(lang.id)}
            >
              <div className="lang-main">
                <div className="lang-names">
                  <span className="native">{lang.native}</span>
                  <span className="name">{t(lang.tKey)}</span>
                </div>
                {selected === lang.id && (
                  <div className="check-icon">
                    <Check size={16} />
                  </div>
                )}
              </div>
              <div className="lang-footer">
                <span className="region">{lang.region}</span>
                <ArrowRight size={14} className="arrow" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .header-center {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .subtitle {
          color: var(--primary);
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 3px;
          font-size: 0.8rem;
        }

        h1 {
          font-size: clamp(2rem, 5vw, 3.5rem);
          margin: 0.75rem 0;
          font-family: var(--font-heading);
        }

        .description {
          color: var(--text-muted);
          font-size: 1rem;
          max-width: 500px;
          margin: 0 auto;
        }

        .languages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .lang-card {
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid var(--glass-border);
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.7);
        }

        .lang-card:hover {
          transform: translateY(-8px);
          background: white;
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          border-color: var(--primary);
        }

        .lang-card.selected {
          background: var(--marble);
          border-color: var(--primary);
          box-shadow: 0 10px 25px rgba(255, 153, 51, 0.1);
        }

        .lang-main {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .lang-names {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .native {
          font-size: 1.5rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: var(--secondary);
        }

        .name {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .check-icon {
          background: var(--primary);
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(255, 153, 51, 0.3);
        }

        .lang-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.2rem;
          border-top: 1px solid rgba(0,0,0,0.05);
        }

        .region {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .arrow {
          color: var(--primary);
          opacity: 0;
          transform: translateX(-5px);
          transition: all 0.3s ease;
        }

        .lang-card:hover .arrow {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </div>
  );
};

export default Language;
