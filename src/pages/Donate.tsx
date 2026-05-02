import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Utensils, GraduationCap, Building, Smartphone, CreditCard, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Donate = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const causes = [
    {
      title: t('cause_annadanam'),
      icon: <Utensils size={32} />,
      desc: t('cause_annadanam_desc'),
      tag: t('tag_popular'),
      path: "/e-hundi"
    },
    {
      title: t('cause_vidhyadanam'),
      icon: <GraduationCap size={32} />,
      desc: t('cause_vidhyadanam_desc'),
      tag: t('tag_impactful'),
      path: "/e-hundi"
    },
    {
      title: t('cause_upkeep'),
      icon: <Building size={32} />,
      desc: t('cause_upkeep_desc'),
      tag: t('tag_essential'),
      path: "/e-hundi"
    },
    {
      title: t('cause_goshala'),
      icon: <Heart size={32} />,
      desc: t('cause_goshala_desc'),
      tag: t('tag_divine'),
      path: "/e-hundi"
    }
  ];

  return (
    <div className="donate-page section-padding">
      <div className="container">
        <div className="page-header centered">
          <span className="modern-badge">{t('donate_badge')}</span>
          <h1>{t('donate_title').split(' ')[0]} <span className="text-gradient">{t('donate_title').substring(t('donate_title').indexOf(' ') + 1)}</span></h1>
          <p>{t('donate_desc')}</p>
        </div>

        <div className="causes-grid">
          {causes.map((cause, i) => (
            <motion.div
              key={i}
              className="cause-card glass-card"
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="card-inner">
                <div className="cause-icon">{cause.icon}</div>
                <span className="cause-tag">{cause.tag}</span>
                <h3>{cause.title}</h3>
                <p>{cause.desc}</p>
                <button
                  className="btn-primary w-full"
                  onClick={() => navigate(cause.path)}
                >
                  <span>{t('nav_donate')}</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="donation-methods glass-card mt-4">
          <h2>{t('donate_secure')}</h2>
          <div className="method-grid">
            <div className="method" onClick={() => navigate('/e-hundi')} style={{ cursor: 'pointer' }}>
              <Smartphone className="m-icon" />
              <div>
                <h4>{t('method_upi')}</h4>
                <p>{t('method_upi_desc')}</p>
              </div>
            </div>
            <div className="method">
              <CreditCard className="m-icon" />
              <div>
                <h4>{t('method_card')}</h4>
                <p>{t('method_card_desc')}</p>
              </div>
            </div>
          </div>
          <div className="legal-info">
            <p>{t('donate_legal')}</p>
          </div>
        </div>
      </div>

      <style>{`
        .donate-page { margin-top: 30px; }
        
        .causes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
          padding-top: 1rem;
        }

        .cause-card {
           height: 100%;
           display: flex;
           flex-direction: column;
           border: 1px solid var(--glass-border);
           overflow: visible !important; /* Allow the icon/content to breathe */
        }

        .card-inner {
          padding: 3rem 2.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 1.5rem;
        }

        .cause-icon {
          width: 80px;
          height: 80px;
          background: var(--marble);
          color: var(--primary);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }

        .cause-tag {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .cause-card h3 { 
          color: var(--secondary); 
          font-size: 1.6rem; 
          margin: 0;
        }

        .cause-card p { 
          font-size: 0.95rem; 
          color: var(--text-muted); 
          line-height: 1.6; 
          margin-bottom: 1rem;
          min-height: 3.5rem;
          display: flex;
          align-items: center;
        }

        .btn-primary.w-full {
          width: 100%;
          justify-content: center;
          padding: 1rem;
        }

        .donation-methods {
          padding: 4rem;
        }

        .donation-methods h2 { text-align: center; margin-bottom: 3rem; color: var(--secondary); }

        .method-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .method {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 2.5rem;
          background: var(--marble);
          border-radius: 20px;
          transition: var(--transition);
          border: 1px solid transparent;
        }

        .method:hover {
          background: white;
          border-color: var(--primary);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .m-icon { width: 40px; height: 40px; color: var(--primary); }
        .method h4 { color: var(--secondary); margin-bottom: 0.25rem; font-size: 1.2rem; }
        .method p { color: var(--text-muted); font-size: 0.9rem; }

        .legal-info {
          border-top: 1px solid rgba(0,0,0,0.05);
          padding-top: 2rem;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.85rem;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .method-grid { grid-template-columns: 1fr; }
          .donation-methods { padding: 2rem 1.5rem; }
          .method { gap: 1.5rem; padding: 1.5rem; flex-direction: column; align-items: flex-start; }
          .card-inner { padding: 2rem 1.5rem; }
        }

        @media (max-width: 480px) {
          .donation-methods { padding: 1.5rem 1rem; }
          .cause-card h3 { font-size: 1.3rem; }
        }
      `}</style>
    </div>
  );
};

export default Donate;
