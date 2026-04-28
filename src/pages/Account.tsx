import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, LogIn, UserPlus, Calendar, CreditCard, Clock, Bell, Settings, LogOut, ChevronRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Account = () => {
  const { t } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot_password'>('login');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordHovered, setPasswordHovered] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');

  const userData = {
    name: 'Raghava Rama',
    email: 'devotee@govindaraja.in',
    memberSince: 'April 2024',
    recentBookings: [
      { id: 'BK-1024', seva: 'Suprabhata Seva', date: '2026-05-15', status: 'Confirmed' },
      { id: 'BK-1025', seva: 'Tomala Seva', date: '2026-05-20', status: 'Pending' },
    ],
    donations: [
      { id: 'DN-882', amount: '₹ 5,001', purpose: 'Annadanam', date: '2026-04-10' },
    ]
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      // Simulate no account error on login attempt
      setLoginError(t('auth_no_account'));
    } else if (authMode === 'forgot_password') {
      // Simulate sending password reset email
      setResetSuccess(true);
    } else {
      setIsLoggedIn(true);
      setLoginError(null);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="auth-page section-padding" style={{ paddingTop: '150px' }}>
        <div className="container">
          <div className="auth-container glass-card">
            <div className="auth-header">
              <h2>
                {authMode === 'login' ? t('auth_login_title') : 
                 authMode === 'signup' ? t('auth_signup_title') : 
                 t('auth_reset_title')}
              </h2>
              <p>
                {authMode === 'login' ? t('auth_login_desc') : 
                 authMode === 'signup' ? t('auth_signup_desc') : 
                 t('auth_reset_desc')}
              </p>
            </div>

            <form className="auth-form" onSubmit={handleAuth}>
              <AnimatePresence>
                {loginError && (
                  <motion.div 
                    initial={{ opacity: 0, rotateX: 35, y: -25, scale: 0.9 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateX: -35, y: -20, scale: 0.8, height: 0, marginBottom: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    style={{ 
                      marginBottom: '1rem', 
                      position: 'relative',
                      perspective: '1000px',
                      transformStyle: 'preserve-3d',
                      zIndex: 10
                    }}
                  >
                    <style>
                      {`
                        @keyframes errorPulse {
                          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
                          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
                          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
                        }
                        @keyframes scanline {
                          0% { top: -10%; opacity: 0; }
                          10% { opacity: 1; }
                          90% { opacity: 1; }
                          100% { top: 110%; opacity: 0; }
                        }
                        @keyframes shakeIcon {
                          0%, 100% { transform: translateX(0); }
                          25% { transform: translateX(-2px) rotate(-10deg); }
                          75% { transform: translateX(2px) rotate(10deg); }
                        }
                        .premium-error-card {
                          background: linear-gradient(135deg, rgba(30, 0, 0, 0.7) 0%, rgba(50, 0, 0, 0.4) 100%);
                          backdrop-filter: blur(24px);
                          -webkit-backdrop-filter: blur(24px);
                          border: 1px solid rgba(239, 68, 68, 0.4);
                          border-top: 1px solid rgba(239, 68, 68, 0.7);
                          border-radius: 12px;
                          padding: 1rem;
                          display: flex;
                          gap: 0.8rem;
                          position: relative;
                          overflow: hidden;
                          box-shadow: inset 0 0 20px rgba(239, 68, 68, 0.05), 0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(239, 68, 68, 0.15);
                        }
                        .premium-error-card::before {
                          content: '';
                          position: absolute;
                          left: 0;
                          top: 0;
                          width: 100%;
                          height: 2px;
                          background: linear-gradient(90deg, transparent, #ef4444, #ff8a8a, #ef4444, transparent);
                          animation: scanline 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                          box-shadow: 0 0 10px #ef4444, 0 0 20px #ef4444;
                          z-index: 10;
                        }
                        .premium-error-card::after {
                          content: '';
                          position: absolute;
                          top: 0; left: 0; right: 0; bottom: 0;
                          background: radial-gradient(circle at 10% 50%, rgba(239, 68, 68, 0.15) 0%, transparent 60%);
                          pointer-events: none;
                        }
                        .premium-error-icon-wrapper {
                          background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.05));
                          border: 1px solid rgba(239, 68, 68, 0.4);
                          width: 36px;
                          height: 36px;
                          border-radius: 10px;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          flex-shrink: 0;
                          animation: errorPulse 2s infinite;
                          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.2);
                        }
                        .premium-error-icon {
                          animation: shakeIcon 0.4s ease-in-out infinite alternate;
                          filter: drop-shadow(0 0 8px rgba(239, 68, 68, 1));
                        }
                        .premium-error-btn {
                          background: linear-gradient(90deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.3));
                          border: 1px solid rgba(239, 68, 68, 0.5);
                          color: #ffb3b3;
                          padding: 6px 14px;
                          border-radius: 8px;
                          font-size: 0.8rem;
                          font-weight: 600;
                          cursor: pointer;
                          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                          display: inline-flex;
                          align-items: center;
                          gap: 6px;
                          text-transform: uppercase;
                          letter-spacing: 0.5px;
                          box-shadow: 0 2px 10px rgba(239, 68, 68, 0.15);
                          position: relative;
                          overflow: hidden;
                        }
                        .premium-error-btn::before {
                          content: '';
                          position: absolute;
                          top: 0; left: -100%; width: 50%; height: 100%;
                          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                          transform: skewX(-25deg);
                          transition: 0.5s;
                        }
                        .premium-error-btn:hover::before {
                          left: 150%;
                        }
                        .premium-error-btn:hover {
                          background: linear-gradient(90deg, rgba(239, 68, 68, 0.3), rgba(239, 68, 68, 0.5));
                          transform: translateY(-2px) scale(1.02);
                          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
                          border-color: rgba(239, 68, 68, 0.9);
                          color: #ffffff;
                          text-shadow: 0 0 6px rgba(255,255,255,0.5);
                        }
                        .premium-error-btn svg {
                          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        }
                        .premium-error-btn:hover svg {
                          transform: rotate(15deg) scale(1.1);
                          filter: drop-shadow(0 0 4px rgba(255,255,255,0.8));
                        }
                      `}
                    </style>
                    <div className="premium-error-card">
                      <div className="premium-error-icon-wrapper">
                        <AlertCircle size={20} color="#ef4444" className="premium-error-icon" />
                      </div>
                      <div style={{ flex: 1, zIndex: 2 }}>
                        <p style={{ 
                          color: '#fff', 
                          fontSize: '0.85rem', 
                          lineHeight: 1.5, 
                          margin: '0 0 10px 0',
                          textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                          fontWeight: 400,
                          letterSpacing: '0.2px'
                        }}>
                          {loginError}
                        </p>
                        <button 
                          type="button"
                          className="premium-error-btn"
                          onClick={() => {
                            setAuthMode('signup');
                            setLoginError(null);
                          }}
                        >
                          <UserPlus size={14} />
                          {t('btn_register_now')}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {authMode === 'forgot_password' && resetSuccess ? (
                <div className="alert-box success" style={{ color: '#10b981', marginBottom: '1rem', padding: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
                  <p style={{ margin: 0 }}>{t('auth_reset_success')}</p>
                </div>
              ) : (
                <>
                  {authMode === 'signup' && (
                    <div className="input-group">
                      <User size={18} />
                      <input type="text" placeholder={t('label_fullname')} required />
                    </div>
                  )}
                  <div className="input-group">
                    <Mail size={18} />
                    <input type="email" placeholder={t('placeholder_email')} required />
                  </div>
                  {authMode !== 'forgot_password' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div 
                        className="input-group" 
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setPasswordHovered(true)}
                        onMouseLeave={() => setPasswordHovered(false)}
                      >
                        <Lock size={18} />
                        <input 
                          type={showPassword ? 'text' : 'password'} 
                          placeholder={t('label_password')} 
                          required 
                          value={passwordValue}
                          onChange={(e) => setPasswordValue(e.target.value)}
                          onFocus={() => setPasswordFocused(true)}
                          onBlur={() => {
                            setPasswordFocused(false);
                            setShowPassword(false); // Auto-hide password when clicking outside
                          }}
                        />
                        {passwordValue.length > 0 && (passwordFocused || passwordHovered) && (
                          <button
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault(); // Prevent input from losing focus
                              setShowPassword(!showPassword);
                            }}
                            style={{
                              position: 'absolute',
                              right: '15px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'none',
                              border: 'none',
                              color: 'var(--text-secondary)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '5px'
                            }}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        )}
                      </div>
                      {authMode === 'login' && (
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            onClick={() => {
                              setAuthMode('forgot_password');
                              setLoginError(null);
                              setResetSuccess(false);
                            }}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--primary-color)',
                              fontSize: '0.85rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              padding: '2px 4px',
                              opacity: 0.8,
                              transition: 'opacity 0.2s ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                            onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
                          >
                            {t('auth_forgot_password')}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <button type="submit" className="btn-primary w-full" style={{ marginTop: '1rem' }}>
                    {authMode === 'login' ? t('btn_enter_portal') : 
                     authMode === 'signup' ? t('btn_register_now') : 
                     t('btn_send_reset_link')}
                    {authMode !== 'forgot_password' && <LogIn size={18} style={{ marginLeft: '10px' }} />}
                  </button>
                </>
              )}
            </form>

            <div className="auth-footer" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              {authMode === 'forgot_password' ? (
                <button 
                  className="text-btn" 
                  onClick={() => {
                    setAuthMode('login');
                    setResetSuccess(false);
                  }}
                >
                  {t('auth_back_to_login')}
                </button>
              ) : (
                <button 
                  className="text-btn" 
                  onClick={() => {
                    setAuthMode(authMode === 'login' ? 'signup' : 'login');
                    setLoginError(null);
                  }}
                >
                  {authMode === 'login' ? t('auth_switch_to_signup') : t('auth_switch_to_login')}
                </button>
              )}
            </div>
          </div>
        </div>

        <style>{`
          .auth-container {
            max-width: 500px;
            margin: 0 auto;
            padding: 4rem;
            background: white;
          }

          .auth-header {
            text-align: center;
            margin-bottom: 3rem;
          }

          .auth-header h2 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            color: var(--secondary);
          }

          .auth-header p {
            color: var(--text-muted);
          }

          .auth-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .input-group {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: var(--marble);
            border-radius: 12px;
            border: 1px solid rgba(0,0,0,0.05);
          }

          .input-group input {
            flex: 1;
            border: none;
            background: transparent;
            outline: none;
            font-size: 1rem;
          }

          .w-full {
            width: 100%;
            justify-content: center;
            padding: 1.2rem;
            font-size: 1.1rem;
          }

          .auth-footer {
            margin-top: 2rem;
            text-align: center;
          }

          .auth-footer button {
            color: var(--primary);
            font-weight: 600;
            font-size: 0.9rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="dashboard-page section-padding" style={{ paddingTop: '150px' }}>
      <div className="container">
        <div className="dashboard-grid">
          {/* Sidebar */}
          <aside className="dashboard-sidebar">
            <div className="user-profile glass-card">
              <div className="avatar">
                <User size={40} />
              </div>
              <h3>{userData.name}</h3>
              <span>{t('dashboard_member_since')} {userData.memberSince}</span>
            </div>

            <nav className="dashboard-nav">
              <button className="nav-item active"><Calendar size={18} /> {t('nav_my_bookings')}</button>
              <button className="nav-item"><CreditCard size={18} /> {t('nav_donate')}</button>
              <button className="nav-item"><Clock size={18} /> {t('nav_history')}</button>
              <button className="nav-item"><Bell size={18} /> {t('nav_notifications')}</button>
              <button className="nav-item"><Settings size={18} /> {t('nav_settings')}</button>
              <button className="nav-item logout" onClick={() => setIsLoggedIn(false)}><LogOut size={18} /> {t('nav_sign_out')}</button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="dashboard-main">
            <div className="welcome-header">
              <h1>{t('dashboard_welcome')}, <span className="text-gradient">{userData.name.split(' ')[0]}</span></h1>
              <p>{t('dashboard_welcome_desc')}</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card glass-card">
                <span className="label">{t('stat_upcoming_sevas')}</span>
                <span className="value">2</span>
              </div>
              <div className="stat-card glass-card">
                <span className="label">{t('stat_total_donations')}</span>
                <span className="value">₹ 5,001</span>
              </div>
              <div className="stat-card glass-card">
                <span className="label">{t('stat_reward_points')}</span>
                <span className="value">450</span>
              </div>
            </div>

            <section className="dashboard-section">
              <div className="section-header">
                <h2>{t('nav_my_bookings')}</h2>
                <button className="text-btn">{t('label_view_all')} <ChevronRight size={16} /></button>
              </div>
              <div className="bookings-list">
                {userData.recentBookings.map(booking => (
                  <div key={booking.id} className="booking-item glass-card">
                    <div className="item-info">
                      <h4>{booking.seva}</h4>
                      <span>ID: {booking.id}</span>
                    </div>
                    <div className="item-date">
                      <Calendar size={14} />
                      {booking.date}
                    </div>
                    <div className={`item-status ${booking.status.toLowerCase()}`}>
                      {booking.status === 'Confirmed' ? t('label_confirmed') : t('label_pending')}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      <style>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 3rem;
          align-items: start;
        }

        .user-profile {
          padding: 2.5rem;
          text-align: center;
          background: white;
          margin-bottom: 2rem;
        }

        .avatar {
          width: 80px;
          height: 80px;
          background: var(--marble);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: var(--primary);
          border: 2px solid var(--primary);
        }

        .user-profile h3 {
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
          color: var(--secondary);
        }

        .user-profile span {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .dashboard-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          color: var(--text-muted);
          transition: all 0.3s ease;
          width: 100%;
        }

        .nav-item:hover, .nav-item.active {
          background: white;
          color: var(--primary);
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .nav-item.logout {
          margin-top: 2rem;
          color: #ff4444;
        }

        .nav-item.logout:hover {
          background: #fff5f5;
        }

        .welcome-header {
          margin-bottom: 3rem;
        }

        .welcome-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .stat-card {
          padding: 2rem;
          background: white;
        }

        .stat-card .label {
          font-size: 0.85rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
          display: block;
        }

        .stat-card .value {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--secondary);
        }

        .dashboard-section {
          margin-top: 3rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .section-header h2 {
          font-size: 1.5rem;
        }

        .text-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary);
          font-weight: 700;
        }

        .bookings-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .booking-item {
          padding: 1.5rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: white;
        }

        .item-info h4 {
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
        }

        .item-info span {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .item-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: var(--text);
        }

        .item-status {
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .item-status.confirmed { background: #e6fcf5; color: #0ca678; }
        .item-status.pending { background: #fff9db; color: #f08c00; }

        @media (max-width: 992px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Account;
