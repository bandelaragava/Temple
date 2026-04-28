import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Ticket, Home as HomeIcon, Gift, CheckCircle, ArrowRight, ArrowLeft, Users, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Booking = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(23);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const bookingTypes = [
    { id: 'pooja', icon: <Ticket size={32} />, title: t('nav_booking') || 'Seva & Pooja', desc: t('seva_booking_desc') || 'Arjitha Seva, Abhishekam, Archana', color: '#FF9933' },
    { id: 'darshan', icon: <Users size={32} />, title: t('nav_darshan') || 'Special Darshan', desc: t('darshan_booking_desc') || 'VIP & Scheduled Darshan Slots', color: '#D4AF37' },
    { id: 'stay', icon: <HomeIcon size={32} />, title: t('label_stay') || 'Accommodation', desc: t('stay_booking_desc') || 'Guest Houses & Cottages Booking', color: '#800000' },
    { id: 'prasadam', icon: <Gift size={32} />, title: t('label_prasadam') || 'Online Prasadam', desc: t('prasadam_booking_desc') || 'Order Prasadam for home delivery', color: '#FF5E5E' },
  ];

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="booking-selection">
            <div className="booking-header">
              <h2>{t('booking_selection_title')}</h2>
              <p>{t('booking_selection_desc')}</p>
            </div>
            <div className="booking-grid">
              {bookingTypes.map((type) => (
                <motion.div 
                  key={type.id}
                  className={`type-card glass-card ${selectedType === type.id ? 'active' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSelectedType(type.id);
                    setStep(2);
                  }}
                >
                  <div className="type-icon" style={{ backgroundColor: type.color }}>
                    {type.icon}
                  </div>
                  <h3>{type.title}</h3>
                  <p>{type.desc}</p>
                  {selectedType === type.id && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="check-mark">
                      <CheckCircle fill="var(--primary)" color="white" size={24} />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="booking-details">
             <div className="booking-header">
              <h2>{t('booking_details_title')}</h2>
              <p style={{ color: 'var(--text-muted)' }}>{t('booking_details_desc')}</p>
            </div>
            <div className="details-form glass-card">
              <div className="form-group">
                <label><Calendar size={18} /> {t('label_select_date')}</label>
                <div className="date-slots">
                  {[20, 21, 22, 23, 24, 25, 26].map(d => (
                    <div 
                      key={d} 
                      className={`date-slot ${selectedDate === d ? 'selected' : ''} ${d < 23 ? 'disabled' : ''}`}
                      onClick={() => d >= 23 && setSelectedDate(d)}
                    >
                      <span className="day">{t('day_short_mon') || 'Mon'}</span>
                      <span className="date">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label><Clock size={18} /> {t('label_available_slots')}</label>
                <div className="time-slots">
                   <button 
                     className={`slot-btn ${selectedSlot === 'morning' ? 'active' : ''}`}
                     onClick={() => { setSelectedSlot('morning'); setStep(3); }}
                   >06:00 AM - 08:00 AM</button>
                   <button 
                     className={`slot-btn ${selectedSlot === 'late-morning' ? 'active' : ''}`}
                     onClick={() => { setSelectedSlot('late-morning'); setStep(3); }}
                   >08:30 AM - 10:30 AM</button>
                   <button 
                     className={`slot-btn ${selectedSlot === 'noon' ? 'active' : ''}`}
                     onClick={() => { setSelectedSlot('noon'); setStep(3); }}
                   >11:00 AM - 01:00 PM</button>
                   <button className="slot-btn disabled">04:00 PM - 06:00 PM ({t('label_full') || 'Full'})</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="booking-summary text-center">
            <div className="success-icon">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ duration: 0.5 }}>
                <CheckCircle size={80} color="var(--primary)" />
              </motion.div>
            </div>
            <h2>{t('booking_summary_title')}</h2>
            <p className="summary-desc">{t('booking_summary_desc')}</p>
            <div className="summary-card glass-card">
              <div className="summary-row"><span>{t('service_type')}:</span> <strong>{t('seva_suprabhata')}</strong></div>
              <div className="summary-row"><span>{t('label_tithi')}:</span> <strong>23 April 2026</strong></div>
              <div className="summary-row"><span>{t('table_timing')}:</span> <strong>08:30 AM</strong></div>
              <div className="summary-row total"><span>{t('total_contribution')}:</span> <strong>₹501.00</strong></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="booking-page section-padding">
      <div className="container">
        <div className="stepper">
          <div className={`step-item ${step >= 1 ? 'active' : ''}`}>{t('step_selection')}</div>
          <div className="step-divider"></div>
          <div className={`step-item ${step >= 2 ? 'active' : ''}`}>{t('step_details')}</div>
          <div className="step-divider"></div>
          <div className={`step-item ${step >= 3 ? 'active' : ''}`}>{t('step_confirm')}</div>
        </div>

        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="booking-content"
        >
          {renderStep()}
        </motion.div>

        <div className="booking-footer">
          {step > 1 && (
            <button className="btn-secondary" onClick={() => setStep(step - 1)}>
              <ArrowLeft size={20} /> {t('btn_back')}
            </button>
          )}
          {step === 3 && (
            <button 
              className="btn-primary" 
              onClick={() => alert(t('alert_payment_redirect'))}
            >
              {t('btn_proceed')} <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>

      <style>{`
        .booking-page {
          min-height: 80vh;
          background: linear-gradient(to bottom, var(--marble), white);
          padding-top: 120px;
        }

        .stepper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4rem;
          gap: 1rem;
        }

        .step-item {
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          background: var(--marble);
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .step-item.active {
          background: var(--primary);
          color: white;
        }

        .step-divider {
          width: 50px;
          height: 2px;
          background: var(--marble);
        }

        .booking-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .booking-header h2 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .booking-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .type-card {
          padding: 2.5rem;
          text-align: center;
          cursor: pointer;
          position: relative;
          border: 2px solid transparent;
        }

        .type-card.active {
          border-color: var(--primary);
          background: white;
        }

        .type-icon {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 1.5rem;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .type-card h3 {
          margin-bottom: 0.5rem;
          font-size: 1.25rem;
        }

        .type-card p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .check-mark {
          position: absolute;
          top: 1rem;
          right: 1rem;
        }

        .details-form {
          max-width: 800px;
          margin: 0 auto 4rem;
          padding: 3rem;
        }

        .form-group {
          margin-bottom: 2.5rem;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
          color: var(--secondary);
        }

        .date-slots {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 1rem;
        }

        .date-slot {
          min-width: 80px;
          padding: 1rem;
          border-radius: 15px;
          background: white;
          border: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--text);
        }

        .date-slot.selected {
          background: var(--primary);
          color: white;
        }

        .date-slot.disabled {
          opacity: 0.3;
          cursor: not-allowed;
          background: #f0f0f0;
          pointer-events: none;
        }

        .date-slot .day { font-size: 0.8rem; opacity: 0.8; }
        .date-slot .date { font-size: 1.25rem; font-weight: 700; }

        .time-slots {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .slot-btn {
          padding: 1rem;
          border-radius: 10px;
          border: 1px solid var(--glass-border);
          background: white;
          color: var(--text);
          text-align: center;
          font-weight: 500;
          transition: var(--transition);
        }

        .slot-btn:not(.disabled):not(.active):hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .slot-btn.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .slot-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: #eee;
        }

        .summary-card {
          max-width: 500px;
          margin: 2rem auto 4rem;
          padding: 2rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 1rem 0;
          border-bottom: 1px dashed var(--marble);
        }

        .summary-row.total {
          border-bottom: none;
          margin-top: 1rem;
          font-size: 1.25rem;
          color: var(--primary);
        }

        .booking-footer {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
        }

        .text-center { text-align: center; }
        .summary-desc { color: var(--text-muted); margin-bottom: 2rem; }
        .success-icon { margin-bottom: 2rem; display: flex; justify-content: center; }
      `}</style>
    </div>
  );
};

export default Booking;
