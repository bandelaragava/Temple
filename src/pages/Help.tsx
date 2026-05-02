import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, MessageSquare, Phone, Mail, ChevronDown, Send, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Help = () => {
  const { t } = useTranslation();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I book Special Darshan?",
      a: "You can book Special Darshan by navigating to the 'Booking' section after logging into your devotee account. Select your preferred date and time slot, provide pilgrim details, and confirm."
    },
    {
      q: "What ID proofs are accepted?",
      a: "We accept Aadhar Card, Voter ID, Passport, and Driving License. Please ensure you carry the original ID proof mentioned during booking for verification at the temple."
    },
    {
      q: "Can I cancel my booking?",
      a: "Yes, bookings can be cancelled up to 24 hours before the scheduled time through your 'My Bookings' dashboard."
    },
    {
      q: "Is Annadanam donation tax-exempt?",
      a: "Yes, all donations to the temple are eligible for tax exemption under Section 80G of the Income Tax Act."
    }
  ];

  return (
    <div className="help-page section-padding" style={{ paddingTop: '120px' }}>
      <div className="container">
        <div className="page-header centered">
          <span className="modern-badge">Support Center</span>
          <h1>How can we <span className="text-gradient">assist you</span> today?</h1>
          <p>Find answers to common questions or reach out to our sacred support team.</p>
        </div>

        <div className="help-grid">
          {/* FAQ Section */}
          <div className="faq-section">
            <h3>Frequently Asked Questions</h3>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className={`faq-item glass-card ${activeFaq === i ? 'active' : ''}`}>
                  <button className="faq-trigger" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    <ChevronDown size={20} style={{ transform: activeFaq === i ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="faq-answer"
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="contact-sidebar">
            <div className="contact-card glass-card">
              <h3>Direct Contact</h3>
              <div className="contact-methods">
                <div className="method">
                  <Phone size={20} />
                  <div>
                    <span>Call Us</span>
                    <p>+91 877 1234567</p>
                  </div>
                </div>
                <div className="method">
                  <Mail size={20} />
                  <div>
                    <span>Email Support</span>
                    <p>help@govindaraja.in</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="message-box glass-card mt-3">
              <h3>Send a Message</h3>
              <form className="mini-contact-form">
                <input type="text" placeholder="Subject" />
                <textarea placeholder="Describe your issue..."></textarea>
                <button type="button" className="btn-primary w-full" onClick={() => alert('Message Sent! We will contact you soon.')}>
                  <span>Send Message</span>
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .help-grid {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 3rem;
          margin-top: 2rem;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          padding: 0;
          overflow: hidden;
          background: white;
        }

        .faq-trigger {
          width: 100%;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 700;
          color: var(--secondary);
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .faq-answer {
          padding: 0 2rem 1.5rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .method {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .method span {
          display: block;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .method p {
          font-weight: 700;
          color: var(--secondary);
        }

        .mini-contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .mini-contact-form input, .mini-contact-form textarea {
          width: 100%;
          padding: 0.8rem;
          border-radius: 8px;
          border: 1px solid rgba(0,0,0,0.1);
          background: var(--marble);
          outline: none;
        }

        .mini-contact-form textarea {
          height: 120px;
          resize: none;
        }

        @media (max-width: 992px) {
          .help-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Help;
