import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, ShieldCheck, Heart, Info, Landmark, Copy, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const EHundi = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const vpa = "devasthanam@upi";

  const handleCopy = () => {
    navigator.clipboard.writeText(vpa);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="ehundi-page section-padding">
      <div className="container">
        <div className="page-header centered">
          <span className="modern-badge">{t('hundi_badge')}</span>
          <h1>{t('hundi_title')}</h1>
          <p>{t('hundi_desc')}</p>
        </div>

        <div className="ehundi-grid">
          {/* QR Section */}
          <motion.div
            className="qr-section glass-card"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="qr-container">
              <div className="qr-box">
                <div className="qr-image-wrap">
                  {/* Detailed SVG Placeholder for QR */}
                  <div className="qr-graphic">
                    <svg viewBox="0 0 100 100" className="qr-svg">
                      <rect width="100" height="100" fill="white" />
                      <path d="M10 10h30v30h-30zM15 15v20h20v-20zM22 22h6v6h-6zM60 10h30v30h-30zM65 15v20h20v-20zM72 22h6v6h-6zM10 60h30v30h-30zM15 65v20h20v-20zM22 72h6v6h-6z" fill="#1A1A1A" />
                      <path d="M45 10h10v10h-10zM10 45h10v10h-10zM45 45h10v10h-10zM60 45h40v10h-40zM45 60h10v40h-10zM60 60h10v10h-10zM80 60h20v10h-20zM60 80h10v20h-10zM80 80h20v20h-20z" fill="#1A1A1A" />
                    </svg>
                    <div className="upi-center-logo">UPI</div>
                  </div>
                  <p className="scan-text">{t('hundi_scan')}</p>
                </div>
              </div>
              <div className="qr-info">
                <h3>{t('hundi_direct')}</h3>
                <p>{t('hundi_direct_desc')}</p>
                <div className="vpa-box">
                  <div className="vpa-text">
                    <span className="vpa-label">{t('vpa_label')}:</span>
                    <span className="vpa-value">{vpa}</span>
                  </div>
                  <button className="btn-copy" onClick={handleCopy}>
                    {copied ? <Check size={16} color="#1e7e34" /> : <Copy size={16} />}
                    <span>{copied ? t('copied') : t('copy')}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            className="hundi-info"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="info-item glass-card mb-3">
              <ShieldCheck className="icon-gold" />
              <div>
                <h4>{t('hundi_secure')}</h4>
                <p>{t('hundi_secure_desc')}</p>
              </div>
            </div>

            <div className="info-item glass-card mb-3">
              <Landmark className="icon-gold" />
              <div>
                <h4>{t('hundi_spiritual')}</h4>
                <p>{t('hundi_spiritual_desc')}</p>
              </div>
            </div>

            <div className="info-item glass-card">
              <Heart className="icon-gold" />
              <div>
                <h4>{t('hundi_tax')}</h4>
                <p>{t('hundi_tax_desc')}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="hundi-faq-section mt-5 glass-card">
          <h2><Info size={24} /> {t('hundi_faq')}</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h5>{t('faq_q1')}</h5>
              <p>{t('faq_a1')}</p>
            </div>
            <div className="faq-item">
              <h5>{t('faq_q2')}</h5>
              <p>{t('faq_a2')}</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ehundi-page {
          margin-top: 30px;
          min-height: 80vh;
        }

        .centered { text-align: center; }

        .ehundi-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-top: 2rem;
        }

        .qr-section {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: white;
        }

        .qr-image-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .qr-graphic {
          width: 220px;
          height: 220px;
          padding: 15px;
          background: white;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          position: relative;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .qr-svg {
          width: 100%;
          height: 100%;
        }

        .upi-center-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 900;
          font-size: 0.7rem;
          color: #1A1A1A;
          border: 1px solid #eee;
        }

        .scan-text {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .vpa-box {
          margin-top: 1.5rem;
          background: var(--marble);
          padding: 1.25rem;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px dashed var(--primary);
        }

        .vpa-text { display: flex; gap: 0.5rem; }
        .vpa-label { color: var(--text-muted); font-size: 0.9rem; }
        .vpa-value { font-family: monospace; font-weight: 700; color: var(--secondary); font-size: 1.1rem; }
        
        .btn-copy { 
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid #eee;
          font-weight: 700; 
          font-size: 0.85rem;
          color: var(--primary);
          transition: all 0.3s ease;
        }

        .btn-copy:hover {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .info-item {
          display: flex;
          gap: 1.5rem;
          padding: 2rem;
        }

        .icon-gold { width: 32px; height: 32px; color: var(--accent); flex-shrink: 0; }
        .info-item h4 { margin-bottom: 0.5rem; color: var(--secondary); }
        .info-item p { font-size: 0.95rem; color: var(--text-muted); }

        .mb-3 { margin-bottom: 1.5rem; }

        .hundi-faq-section {
          padding: 3rem;
        }
        
        .hundi-faq-section h2 { 
          display: flex; 
          align-items: center; 
          gap: 1rem; 
          margin-bottom: 2rem;
          color: var(--secondary);
        }

        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        .faq-item h5 { font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--primary); }

        @media (max-width: 900px) {
          .ehundi-grid, .faq-grid { grid-template-columns: 1fr; }
          .qr-section { padding: 2rem; }
        }

        @media (max-width: 600px) {
          .vpa-box {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          .qr-section, .hundi-faq-section {
             padding: 1.5rem;
          }
          .vpa-value {
             font-size: 1rem;
             word-break: break-all;
          }
          .qr-graphic {
            width: 180px;
            height: 180px;
          }
          .info-item { padding: 1.5rem; gap: 1rem; }
        }

        @media (max-width: 400px) {
          .qr-graphic { width: 150px; height: 150px; }
          .vpa-text { flex-direction: column; gap: 0.25rem; }
          .btn-copy { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default EHundi;
