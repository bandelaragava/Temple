import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <div className="policy-page section-padding" style={{ paddingTop: '120px' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="page-header centered">
          <span className="modern-badge">Legal</span>
          <h1>Terms & <span className="text-gradient">Conditions</span></h1>
          <p>Guidelines for utilizing our digital temple services respectfully.</p>
        </div>

        <motion.div 
          className="policy-content glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="policy-section">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing the Sri Govindha Raja Swamy Devasthanam official portal and booking our services online, you respectfully agree to abide by these Terms & Conditions. These terms ensure a harmonious experience for all devotees.</p>
          </div>

          <div className="policy-section">
            <h2>2. Online Bookings (Darshan & Sevas)</h2>
            <p>All online bookings are subject to availability and temple schedules. Please note:</p>
            <ul>
              <li><strong>Verification:</strong> Devotees must carry the original ID proof submitted during the online booking process. Failure to produce the ID may result in denial of entry.</li>
              <li><strong>Reporting Time:</strong> Kindly report at the designated queue complex at least 30 minutes prior to your allocated slot.</li>
              <li><strong>Dress Code:</strong> Traditional Indian attire is strictly mandated for all Sevas and Special Darshan (e.g., Dhoti/Kurta for men; Saree/Half-Saree/Chudidhar with Dupatta for women).</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>3. Donations and e-Hundi</h2>
            <p>All contributions made through the e-Hundi and Annadanam portals are deeply appreciated. Please be advised that donations are voluntary, non-refundable, and cannot be cancelled or disputed once successfully processed.</p>
          </div>

          <div className="policy-section">
            <h2>4. Cancellations & Modifications</h2>
            <p>Booking modifications or cancellations are only permitted if initiated up to 24 hours prior to the scheduled time, subject to availability. The temple administration reserves the right to cancel or alter any seva/darshan timings due to special rituals, eclipses, or administrative reasons, in which case alternate arrangements or refunds may be processed.</p>
          </div>

          <div className="policy-section">
            <h2>5. Devotee Conduct</h2>
            <p>The temple is a sacred space of worship. We expect all devotees to maintain silence, decorum, and spiritual discipline within the temple premises. Mobile phones, cameras, and electronic gadgets are strictly prohibited inside the sanctum sanctorum.</p>
          </div>
        </motion.div>
      </div>

      <style>{`
        .policy-content {
          padding: 3rem 4rem;
          margin-top: 2rem;
          background: var(--glass);
        }

        .policy-section {
          margin-bottom: 2.5rem;
        }

        .policy-section:last-child {
          margin-bottom: 0;
        }

        .policy-section h2 {
          color: var(--secondary);
          font-size: 1.5rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .policy-section p {
          color: var(--text-muted);
          line-height: 1.8;
          font-size: 1.05rem;
          margin-bottom: 1rem;
        }

        .policy-section ul {
          list-style-type: none;
          padding-left: 0;
        }

        .policy-section ul li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.8rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .policy-section ul li::before {
          content: '•';
          color: var(--primary);
          font-size: 1.5rem;
          position: absolute;
          left: 0;
          top: -4px;
        }

        .policy-section strong {
          color: var(--text);
        }

        @media (max-width: 768px) {
          .policy-content {
            padding: 2rem;
          }
          
          .policy-section h2 {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TermsOfService;
