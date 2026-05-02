import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Ticket, Home as HomeIcon, Gift, CheckCircle, ArrowRight, ArrowLeft, Users, Clock, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Booking = () => {
  const { t } = useTranslation();
  const [isLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [step, setStep] = useState(1);

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [step]);

  if (!isLoggedIn) {
    return (
      <div className="booking-page section-padding" style={{ paddingTop: '150px', textAlign: 'center' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '4rem', maxWidth: '600px', margin: '0 auto' }}>
            <Lock size={60} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h2>{t('auth_required_title', 'Sacred Access Required')}</h2>
            <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
              {t('auth_required_desc', 'Please sign in to your devotee account to book Darshan or Arjitha Sevas.')}
            </p>
            <a href="/account" className="btn-primary" style={{ display: 'inline-flex' }}>
              {t('btn_sign_in_now', 'Sign In to Portal')}
            </a>
          </div>
        </div>
      </div>
    );
  }

  const [selectedType, setSelectedType] = useState(null);
  const today = new Date();
  const currentDay = today.getDate();
  const [selectedDate, setSelectedDate] = useState(currentDay);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [idError, setIdError] = useState('');
  const [pilgrimName, setPilgrimName] = useState('');

  // Verhoeff Algorithm for Aadhar Checksum
  const verhoeffTable = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
  ];
  const pTable = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
  ];
  const invTable = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

  const validateAadhar = (aadhar: string) => {
    let c = 0;
    const invertedArray = aadhar.split('').map(Number).reverse();
    for (let i = 0; i < invertedArray.length; i++) {
      c = verhoeffTable[c][pTable[i % 8][invertedArray[i]]];
    }
    return c === 0;
  };

  const validateID = (type: string, value: string) => {
    setIdNumber(value);
    if (!value) {
      setIdError('ID Number is required');
      return;
    }

    switch (type) {
      case 'Aadhar Card':
        if (!/^\d{12}$/.test(value)) {
          setIdError('Aadhar must be exactly 12 digits');
        } else if (!validateAadhar(value)) {
          setIdError('This is not a valid Aadhar number (Checksum failed)');
        } else {
          setIdError('');
        }
        break;
      case 'Voter ID':
        // Standard Voter ID format: 3 letters followed by 7 digits
        if (!/^[A-Z]{3}[0-9]{7}$/.test(value)) {
          setIdError('Invalid Voter ID format (e.g., ABC1234567)');
        } else {
          setIdError('');
        }
        break;
      case 'Passport':
        if (!/^[A-Z][0-9]{7}$/.test(value)) {
          setIdError('Invalid Passport format (e.g., A1234567)');
        } else {
          setIdError('');
        }
        break;
      case 'Driving License':
        // Standard DL format: State Code (2) + RTO Code (2) + Year (4) + 7 digits
        if (!/^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/.test(value)) {
          setIdError('Invalid DL format (e.g., TS0920241234567)');
        } else {
          setIdError('');
        }
        break;
      default:
        setIdError('');
    }
  };

  const bookingTypes = [
    { id: 'pooja', icon: <Ticket size={32} />, title: t('nav_booking') || 'Seva & Pooja', desc: t('seva_booking_desc') || 'Arjitha Seva, Abhishekam, Archana', color: '#FF9933' },
    { id: 'darshan', icon: <Users size={32} />, title: t('nav_darshan') || 'Special Darshan', desc: t('darshan_booking_desc') || 'VIP & Scheduled Darshan Slots', color: '#D4AF37' },
    { id: 'stay', icon: <HomeIcon size={32} />, title: t('label_stay') || 'Accommodation', desc: t('stay_booking_desc') || 'Guest Houses & Cottages Booking', color: '#800000' },
    { id: 'prasadam', icon: <Gift size={32} />, title: t('label_prasadam') || 'Online Prasadam', desc: t('prasadam_booking_desc') || 'Order Prasadam for home delivery', color: '#FF5E5E' },
  ];

  const renderStep = () => {
    switch (step) {
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
              {/* Pilgrim Info Form */}
              <div className="pilgrim-info-grid">
                <div className="form-group">
                  <label>{t('label_fullname')}</label>
                  <input 
                    type="text" 
                    placeholder="Enter full name" 
                    className="form-input"
                    value={pilgrimName}
                    onChange={(e) => setPilgrimName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input type="number" placeholder="Age" className="form-input" />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select className="form-input">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>ID Proof Type</label>
                  <select 
                    className="form-input" 
                    value={idType} 
                    onChange={(e) => {
                      setIdType(e.target.value);
                      setIdNumber('');
                      setIdError('');
                    }}
                  >
                    <option value="">Select ID Proof</option>
                    <option value="Aadhar Card">Aadhar Card</option>
                    <option value="Voter ID">Voter ID</option>
                    <option value="Passport">Passport</option>
                    <option value="Driving License">Driving License</option>
                  </select>
                </div>
              </div>

              <AnimatePresence>
                {idType && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="form-group"
                    style={{ overflow: 'hidden' }}
                  >
                    <label>Enter {idType} Number</label>
                    <input 
                      type="text" 
                      placeholder={`Enter ${idType} number`} 
                      className={`form-input ${idError ? 'error' : idNumber ? 'success' : ''}`}
                      value={idNumber}
                      onChange={(e) => validateID(idType, e.target.value)}
                    />
                    {idError && <span className="error-text">{idError}</span>}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="form-group">
                <label><Calendar size={18} /> {t('label_select_date')}</label>
                <div className="date-slots">
                  {Array.from({ length: 15 }, (_, i) => {
                    const date = new Date();
                    date.setDate(today.getDate() + i);
                    const d = date.getDate();
                    const dayName = date.toLocaleString('default', { weekday: 'short' });
                    return (
                      <div
                        key={`${d}-${i}`}
                        className={`date-slot ${selectedDate === d ? 'selected' : ''}`}
                        onClick={() => setSelectedDate(d)}
                      >
                        <span className="day">{dayName}</span>
                        <span className="date">{d}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="form-group">
                <label><Clock size={18} /> {t('label_available_slots')}</label>
                <div className="time-slots">
                  <button
                    className={`slot-btn ${selectedSlot === 'morning' ? 'active' : ''}`}
                    onClick={() => { setSelectedSlot('morning'); }}
                  >06:00 AM - 08:00 AM</button>
                  <button
                    className={`slot-btn ${selectedSlot === 'late-morning' ? 'active' : ''}`}
                    onClick={() => { setSelectedSlot('late-morning'); }}
                  >08:30 AM - 10:30 AM</button>
                  <button
                    className={`slot-btn ${selectedSlot === 'noon' ? 'active' : ''}`}
                    onClick={() => { setSelectedSlot('noon'); }}
                  >11:00 AM - 01:00 PM</button>
                  <button className="slot-btn disabled">04:00 PM - 06:00 PM ({t('label_full') || 'Full'})</button>
                </div>
              </div>
              
              <div className="form-actions">
                 <button 
                   className="btn-primary" 
                   onClick={() => selectedSlot && idType && idNumber && !idError && pilgrimName && setStep(3)}
                   disabled={!selectedSlot || !idType || !idNumber || !!idError || !pilgrimName}
                 >
                   Continue to Summary <ArrowRight size={20} />
                 </button>
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
              <div className="summary-row"><span>{t('label_fullname')}:</span> <strong>{pilgrimName}</strong></div>
              <div className="summary-row">
                <span>{t('service_type')}:</span> 
                <strong>{bookingTypes.find(t => t.id === selectedType)?.title || t('nav_booking')}</strong>
              </div>
              <div className="summary-row"><span>{t('label_tithi')}:</span> <strong>{selectedDate} {today.toLocaleString('default', { month: 'long' })} {today.getFullYear()}</strong></div>
              <div className="summary-row">
                <span>{t('table_timing')}:</span> 
                <strong>
                  {selectedSlot === 'morning' ? '06:00 AM' : 
                   selectedSlot === 'late-morning' ? '08:30 AM' : 
                   selectedSlot === 'noon' ? '11:00 AM' : '08:30 AM'}
                </strong>
              </div>
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
          padding-top: 4rem;
        }

        .stepper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          gap: 1rem;
        }

        .step-item {
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
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
          margin-bottom: 1.5rem;
        }

        .booking-header h2 {
          font-size: clamp(1.4rem, 4vw, 2.5rem);
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
          margin: 0 auto 2rem;
          padding: 1.5rem 2rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--secondary);
          font-size: 0.9rem;
        }

        .date-slots {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 0.75rem;
          scrollbar-width: thin;
          scrollbar-color: var(--primary) transparent;
        }

        .date-slots::-webkit-scrollbar {
          height: 4px;
        }

        .date-slots::-webkit-scrollbar-track {
          background: transparent;
        }

        .date-slots::-webkit-scrollbar-thumb {
          background: var(--marble);
          border-radius: 10px;
        }

        .date-slots::-webkit-scrollbar-thumb:hover {
          background: var(--primary);
        }

        .pilgrim-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .form-input {
          width: 100%;
          padding: 0.6rem 0.8rem;
          border-radius: 8px;
          border: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.5);
          font-family: inherit;
          font-size: 0.9rem;
          transition: var(--transition);
        }

        .form-actions {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }

        .form-actions .btn-primary {
          min-width: 250px;
          justify-content: center;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary);
          background: white;
          box-shadow: 0 0 0 4px rgba(255, 153, 51, 0.1);
        }

        .form-input.error {
          border-color: #ff4d4d;
          background: #fffafa;
        }

        .form-input.success {
          border-color: #2ecc71;
          background: #fafffa;
        }

        .error-text {
          color: #ff4d4d;
          font-size: 0.85rem;
          margin-top: 0.5rem;
          display: block;
          font-weight: 500;
        }

        .time-slots {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .date-slot {
          min-width: 60px;
          padding: 0.3rem 0.5rem;
          border-radius: 10px;
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

        .date-slot .day { font-size: 0.65rem; font-weight: 500; opacity: 0.8; }
        .date-slot .date { font-size: 1rem; font-weight: 700; line-height: 1; margin-top: 2px; }

        .slot-btn {
          padding: 0.6rem 1rem;
          border-radius: 8px;
          border: 1px solid var(--glass-border);
          background: white;
          color: var(--text);
          text-align: center;
          font-weight: 500;
          font-size: 0.85rem;
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

        @media (max-width: 768px) {
          .pilgrim-info-grid {
            grid-template-columns: 1fr;
          }
          .time-slots {
            grid-template-columns: 1fr;
          }
          .stepper {
            gap: 0.5rem;
            flex-wrap: wrap;
            justify-content: center;
          }
          .step-item {
            font-size: 0.8rem;
            padding: 0.4rem 1rem;
          }
          .step-divider {
            width: 20px;
            height: 2px;
          }
          .booking-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }
          .form-actions .btn-primary, .booking-footer button {
             width: 100%;
          }
          .details-form, .summary-card {
            padding: 1.5rem 1rem;
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .booking-grid { grid-template-columns: 1fr; }
          .type-card { padding: 1.5rem; }
          .date-slots { gap: 0.5rem; }
          .date-slot { min-width: 52px; }
        }
      `}</style>
    </div>
  );
};

export default Booking;
