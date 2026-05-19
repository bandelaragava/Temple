import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="policy-page section-padding" style={{ paddingTop: '120px' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="page-header centered">
          <span className="modern-badge">Legal</span>
          <h1>Privacy <span className="text-gradient">Policy</span></h1>
          <p>Protecting the privacy and sacred information of our devotees.</p>
        </div>

        <motion.div 
          className="policy-content glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="policy-section">
            <h2>1. Divine Commitment to Privacy</h2>
            <p>At Sri Govindha Raja Swamy Devasthanam, we consider the privacy of our devotees as sacred as their devotion. This policy outlines our simple, transparent approach to managing the information you share with us while booking sevas, darshan, or contributing to the e-Hundi.</p>
          </div>

          <div className="policy-section">
            <h2>2. Information We Collect</h2>
            <p>To facilitate your spiritual journey and temple services, we securely collect minimal required information:</p>
            <ul>
              <li><strong>Personal Details:</strong> Name, Gothram, and Nakshatram (specifically for Sankalpam in Sevas).</li>
              <li><strong>Contact Information:</strong> Phone number and Email address for sending booking confirmations and temple updates.</li>
              <li><strong>Identity Proof:</strong> Required solely for verification during special darshan or accommodation check-in as per government regulations.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>3. Secure Transactions</h2>
            <p>Your online offerings, donations, and booking payments are processed through highly secure, encrypted, and bank-authorized payment gateways. The Temple does not store or process your credit card, debit card, or UPI PIN details directly.</p>
          </div>

          <div className="policy-section">
            <h2>4. Use of Devotee Information</h2>
            <p>The information collected is used exclusively for:</p>
            <ul>
              <li>Issuing your tickets and donation receipts.</li>
              <li>Performing requested rituals and Sevas in your name.</li>
              <li>Providing necessary support and responding to your queries.</li>
            </ul>
            <p>We do not sell, trade, or share any devotee data with third-party marketing organizations.</p>
          </div>

          <div className="policy-section">
            <h2>5. Contact Us</h2>
            <p>If you have any questions regarding how your data is handled, please reach out to our administration at <strong>help@govindaraja.in</strong> or visit our Support Center.</p>
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

export default PrivacyPolicy;
