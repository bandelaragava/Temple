import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, LogIn, UserPlus, Calendar, CreditCard, Clock, Bell, Settings, LogOut, ChevronRight, AlertCircle, Eye, EyeOff, HelpCircle, ChevronDown, Send, Phone, MessageSquare, X, Menu, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Account = () => {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot_password'>('login');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordHovered, setPasswordHovered] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [activeTab, setActiveTab] = useState('bookings');
  const [signupName, setSignupName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mainContentRef = React.useRef<HTMLDivElement>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = React.useRef<HTMLDivElement>(null);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  React.useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [activeTab]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('userData');
    const defaultNotes = [
      { id: 1, title: 'Booking Confirmed', message: 'Your Suprabhata Seva for 15th May is confirmed.', time: '2 hours ago', unread: true },
      { id: 2, title: 'Festival Alert', message: 'Annual Brahmotsavams start in 10 days! Plan your visit.', time: '1 day ago', unread: false },
      { id: 3, title: 'Sacred Reminder', message: 'Tomorrow is Ekadashi. Special rituals scheduled at 6:00 AM.', time: '3 hours ago', unread: true },
      { id: 4, title: 'App Update', message: 'New E-Hundi features added for faster offerings.', time: '2 days ago', unread: false },
    ];

    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        notifications: (parsed.notifications && parsed.notifications.length > 0) ? parsed.notifications : defaultNotes
      };
    }
    return {
      name: 'Raghava Rama',
      email: 'devotee@govindaraja.in',
      phone: '+91 98765 43210',
      idProofType: 'Aadhar',
      idProofNumber: 'XXXX-XXXX-1234',
      memberSince: 'April 2024',
      recentBookings: [
        { id: 'BK-1024', seva: 'Suprabhata Seva', date: '2026-05-15', status: 'Confirmed' },
        { id: 'BK-1025', seva: 'Tomala Seva', date: '2026-05-20', status: 'Pending' },
      ],
      donations: [
        { id: 'DN-882', amount: '₹ 5,001', purpose: 'Annadanam', date: '2026-04-10' },
        { id: 'DN-883', amount: '₹ 1,116', purpose: 'Goshala', date: '2026-04-05' },
        { id: 'DN-884', amount: '₹ 10,000', purpose: 'Temple Development', date: '2026-03-25' },
      ],
      notifications: defaultNotes
    };
  });

  // Simulated User Database
  const getUsers = () => {
    const users = localStorage.getItem('registeredUsers');
    if (users) return JSON.parse(users);
    // Initial demo user
    const initialUsers = [{
      name: 'Raghava Rama',
      email: 'devotee@govindaraja.in',
      password: 'password123'
    }];
    localStorage.setItem('registeredUsers', JSON.stringify(initialUsers));
    return initialUsers;
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const users = getUsers();

    if (authMode === 'login') {
      const user = users.find((u: any) => u.email.toLowerCase() === loginEmail.toLowerCase());

      if (!user) {
        setLoginError(t('auth_no_account_error', 'No account found with this email. Please sign up to continue.'));
        return;
      }

      if (user.password !== passwordValue) {
        setLoginError(t('auth_wrong_password', 'Incorrect password. Please try again.'));
        return;
      }

      // Login success
      const newUser = { ...userData, name: user.name, email: user.email };
      setUserData(newUser);
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(newUser));
      window.dispatchEvent(new Event('authChange'));
      setLoginError(null);
    } else if (authMode === 'forgot_password') {
      setResetSuccess(true);
    } else {
      // Signup
      if (users.some((u: any) => u.email.toLowerCase() === loginEmail.toLowerCase())) {
        setLoginError(t('auth_email_exists', 'An account already exists with this email.'));
        return;
      }

      const newUserRecord = {
        name: signupName,
        email: loginEmail,
        password: passwordValue
      };

      const updatedUsers = [...users, newUserRecord];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

      const newUser = { ...userData, name: signupName, email: loginEmail };
      setUserData(newUser);
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(newUser));
      window.dispatchEvent(new Event('authChange'));
      setLoginError(null);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event('authChange'));
    // We keep userData in localStorage for next time but isLoggedIn is false
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
                      <input
                        type="text"
                        placeholder={t('label_fullname')}
                        required
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                      />
                    </div>
                  )}
                  <div className="input-group">
                    <Mail size={18} />
                    <input
                      type="email"
                      placeholder={t('placeholder_email')}
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
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
                          onBlur={() => setPasswordFocused(false)}
                        />
                        {passwordValue.length > 0 && (
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
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
            display: flex;
            justify-content: center;
            align-items: center;
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
    <div className={`admin-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>


      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <img src="/logo.png" alt="Temple Logo" className="admin-logo-img" />
          <span>Devotee Portal</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="/" className="nav-btn home-nav-btn">
            <Home size={18} /> Back to Website
          </Link>
          <div className="sidebar-divider"></div>
          <button
            className={`nav-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => handleNavClick('bookings')}
          >
            <Calendar size={18} /> {t('nav_my_bookings')}
          </button>
          <button
            className={`nav-btn ${activeTab === 'donate' ? 'active' : ''}`}
            onClick={() => handleNavClick('donate')}
          >
            <CreditCard size={18} /> {t('nav_donate')}
          </button>
          <button
            className={`nav-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => handleNavClick('history')}
          >
            <Clock size={18} /> {t('nav_history')}
          </button>
          <button
            className={`nav-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => handleNavClick('notifications')}
          >
            <Bell size={18} /> {t('nav_notifications')}
          </button>
          <button
            className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => handleNavClick('settings')}
          >
            <Settings size={18} /> {t('nav_settings')}
          </button>
          <button
            className={`nav-btn ${activeTab === 'help' ? 'active' : ''}`}
            onClick={() => handleNavClick('help')}
          >
            <HelpCircle size={18} /> Help & Support
          </button>
          <div className="sidebar-divider"></div>
          <button className="nav-btn logout" onClick={() => { handleLogout(); setIsSidebarOpen(false); }}>
            <LogOut size={18} /> {t('nav_sign_out')}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main" ref={mainContentRef}>
        <header className="admin-header">
          <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Toggle Sidebar">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="header-title">
            <img src="/logo.png" alt="Logo" className="header-logo-img" />
            <h2>
              Sri Govindaraja Swamy Devasthanam
            </h2>
          </div>
          <div className="header-actions">
            <Link to="/" className="back-home-btn" title="Back to Main Website">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <button 
              className="header-action-btn" 
              onClick={() => setActiveTab('notifications')}
              title={t('nav_notifications')}
            >
              <Bell size={18} />
              {userData.notes && userData.notes.filter((n: any) => n.unread).length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '8px',
                  height: '8px',
                  background: 'var(--primary)',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px var(--primary)'
                }} />
              )}
            </button>
            <div
              className="admin-profile"
              ref={profileRef}
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              style={{ cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}
            >
              <div className="admin-avatar" style={{ margin: 0 }}><User size={18} /></div>

              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    className="profile-dropdown glass-card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{ position: 'absolute', top: 'calc(100% + 15px)', right: 0, zIndex: 1000 }}
                  >
                    <div className="dropdown-header">
                      <div className="user-info">
                        <p className="user-name" style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem', color: 'var(--secondary)' }}>{userData.name}</p>
                        <p className="user-role" style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Devotee Member</p>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={() => { setActiveTab('bookings'); setShowProfileDropdown(false); }}>
                      <Calendar size={16} /> {t('nav_my_bookings')}
                    </button>
                    <button className="dropdown-item" onClick={() => { setActiveTab('settings'); setShowProfileDropdown(false); }}>
                      <Settings size={16} /> {t('nav_settings')}
                    </button>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout-item" onClick={() => { handleLogout(); setShowProfileDropdown(false); }}>
                      <LogOut size={16} /> {t('nav_sign_out')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <div className="admin-content">
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
              <h2>
                {activeTab === 'bookings' ? t('nav_my_bookings') :
                  activeTab === 'donate' ? t('nav_donate') :
                    activeTab === 'history' ? t('nav_history') :
                      activeTab === 'notifications' ? t('nav_notifications') :
                        activeTab === 'help' ? 'Help & Support' :
                          t('nav_settings')}
              </h2>
              <button className="text-btn" onClick={() => alert('Feature coming soon!')}>{t('label_view_all')} <ChevronRight size={16} /></button>
            </div>

            <div className="tab-content" style={{ marginTop: '1rem' }}>
              {activeTab === 'bookings' && (
                <div className="bookings-list">
                  {userData.recentBookings.map((booking: any) => (
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
              )}
              {activeTab === 'donate' && (
                <div className="donations-list">
                  <div className="section-header-mini mb-4">
                    <h4>Recent Sacred Offerings</h4>
                    <button className="btn-secondary" onClick={() => window.location.href = '/e-hundi'}>Donate Again</button>
                  </div>
                  {userData.donations.map((donation: any) => (
                    <div key={donation.id} className="booking-item glass-card">
                      <div className="item-info">
                        <h4>{donation.purpose}</h4>
                        <span>Transaction ID: {donation.id}</span>
                      </div>
                      <div className="item-date">
                        <CreditCard size={14} />
                        {donation.amount}
                      </div>
                      <div className="item-date">
                        {donation.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'notifications' && (
                <div className="notifications-list">
                  {(userData?.notifications || []).map((note: any) => (
                    <div key={note.id} className={`notification-item glass-card ${note.unread ? 'unread' : ''}`}>
                      <div className="note-icon">
                        <Bell size={20} />
                      </div>
                      <div className="note-content">
                        <div className="note-header">
                          <h4>{note.title}</h4>
                          <span>{note.time}</span>
                        </div>
                        <p>{note.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="settings-panel glass-card">
                  <h3>{t('label_edit_profile')}</h3>
                  <div className="settings-grid">
                    <div className="input-field">
                      <label>Full Name</label>
                      <input type="text" defaultValue={userData.name} />
                    </div>
                    <div className="input-field">
                      <label>Mobile Number</label>
                      <input type="text" defaultValue={userData.phone} />
                    </div>
                    <div className="input-field">
                      <label>Email Address</label>
                      <input type="email" defaultValue={userData.email} disabled />
                    </div>
                    <div className="input-field">
                      <label>ID Proof (Aadhar/Voter ID)</label>
                      <input type="text" defaultValue={userData.idProofNumber} />
                    </div>
                  </div>
                  <button className="btn-primary mt-5" style={{ marginTop: '2rem' }} onClick={() => alert('Profile updated successfully!')}>
                    Save Changes
                  </button>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="history-list">
                  <div className="section-header-mini mb-4">
                    <h4>Past Spiritual Journeys</h4>
                  </div>
                  <div className="history-items">
                    {[
                      { seva: 'Sahasra Deepalankara Seva', date: '2024-03-12', result: 'Completed' },
                      { seva: 'Visesha Pooja', date: '2024-01-05', result: 'Completed' }
                    ].map((item, i) => (
                      <div key={i} className="history-item glass-card mb-3">
                        <div className="item-info">
                          <h4>{item.seva}</h4>
                          <p>{item.date}</p>
                        </div>
                        <span className="status-badge active">{item.result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'help' && (
                <div className="help-panel">
                  <div className="dashboard-help-grid">
                    <div className="help-content">
                      <h3>Frequently Asked Questions</h3>
                      <div className="dashboard-faq">
                        {[
                          { q: "How to download my Darshan ticket?", a: "Once confirmed, you can view and download your ticket from the 'My Bookings' tab above." },
                          { q: "ID proof verification failed?", a: "Ensure you are using the same ID proof number provided during the sacred booking process." },
                          { q: "Payment issues for E-Hundi?", a: "Wait for 15 minutes for the status to update. If it fails, the amount will be refunded by your bank within 5-7 days." }
                        ].map((item, i) => (
                          <div key={i} className="faq-box glass-card mb-3">
                            <h5 className="mb-2" style={{ color: 'var(--primary)' }}>{item.q}</h5>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="help-sidebar">
                      <div className="support-card glass-card">
                        <h4>Need Live Help?</h4>
                        <div className="support-links mt-3">
                          <div className="link-item">
                            <Phone size={16} /> <span>+91 877 1234567</span>
                          </div>
                          <div className="link-item">
                            <Mail size={16} /> <span>help@govindaraja.in</span>
                          </div>
                        </div>
                        <hr className="my-4" style={{ opacity: 0.1 }} />
                        <button className="btn-primary w-full" onClick={() => setIsChatOpen(true)}>
                          <MessageSquare size={16} /> Start Chat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Floating Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="sacred-chat-window glass-card"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
          >
            <div className="chat-header">
              <div className="chat-user">
                <div className="online-indicator"></div>
                <div>
                  <h4>Temple Sahayak</h4>
                  <span>Online | Sacred Support</span>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)}><X size={20} /></button>
            </div>
            <div className="chat-body">
              <div className="msg bot">
                <p>Namaste! I am your Temple Sahayak. How can I assist you with your sacred journey today?</p>
                <span>14:30</span>
              </div>
              <div className="msg bot">
                <p>You can ask me about Darshan slots, Seva bookings, or Donation receipts.</p>
                <span>14:31</span>
              </div>
            </div>
            <div className="chat-footer">
              <input
                type="text"
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && setChatMessage('')}
              />
              <button className="send-btn" onClick={() => setChatMessage('')}>
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .admin-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          height: 100vh;
          background: var(--bg);
          overflow: hidden;
          padding-top: 0;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 9999;
          font-family: var(--font-main);
        }

        .admin-sidebar {
          background: var(--secondary);
          color: #fff;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--accent);
          position: relative;
          overflow-y: auto; /* Allow scrolling for the sidebar items if they overflow */
        }

        .admin-sidebar::-webkit-scrollbar {
          width: 6px;
        }
        
        .admin-sidebar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.2);
        }
        
        .admin-sidebar::-webkit-scrollbar-thumb {
          background: var(--accent);
          border-radius: 10px;
        }

        .admin-sidebar::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50c0-15 12-27 27-27s27 12 27 27-12 27-27 27-27-12-27-27zM0 50c0-15 12-27 27-27s27 12 27 27-12 27-27 27-27-12-27-27z' fill='%23ffffff' fill-opacity='0.03' /%3E%3C/svg%3E");
          pointer-events: none;
        }

        .admin-logo-img {
          width: 35px;
          height: 35px;
          object-fit: contain;
          background: white;
          padding: 3px;
          border-radius: 8px;
        }

        .header-logo-img {
          width: 32px;
          height: 32px;
          object-fit: contain;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 3rem;
          color: var(--accent);
          font-family: var(--font-heading);
          z-index: 2;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          z-index: 2;
        }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          color: rgba(255,255,255,0.7);
          font-weight: 600;
          transition: all 0.3s ease;
          width: 100%;
          text-align: left;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .nav-btn:hover {
          background: rgba(255,255,255,0.1);
          color: var(--accent);
        }

        .nav-btn.active {
          background: linear-gradient(135deg, var(--primary), var(--primary-hover));
          color: #fff;
          box-shadow: 0 4px 15px rgba(255, 153, 51, 0.4);
        }

        .sidebar-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          background: var(--secondary);
          color: white;
          padding: 0.6rem;
          border-radius: 10px;
          border: 1px solid var(--accent);
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          cursor: pointer;
          flex-shrink: 0;
        }

        .sidebar-divider {
          height: 1px;
          background: rgba(255,255,255,0.1);
          margin: 2rem 0;
        }

        .nav-btn.logout {
          color: #ffcccc;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .nav-btn.logout:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .profile-dropdown {
          position: absolute;
          top: calc(100% + 15px);
          right: 0;
          width: 220px;
          background: white;
          border-radius: 20px;
          padding: 1.2rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          border: 1px solid var(--glass-border);
          z-index: 1000;
          text-align: left;
        }

        .dropdown-header {
          padding: 0 0.5rem 0.5rem 0.5rem;
        }

        .dropdown-divider {
          height: 1px;
          background: #f1f5f9;
          margin: 1rem 0;
        }

        .dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.7rem 0.8rem;
          border: none;
          background: transparent;
          color: var(--text);
          font-weight: 600;
          font-size: 0.85rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dropdown-item:hover {
          background: #f8fafc;
          color: var(--primary);
          transform: translateX(5px);
        }

        .dropdown-item.logout-item {
          color: #ef4444;
        }

        .dropdown-item.logout-item:hover {
          background: #fef2f2;
          color: #ef4444;
        }

        .admin-main {
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          overflow-x: hidden;
          background: var(--bg);
          width: 100%;
        }

        .admin-header {
          background: var(--glass);
          backdrop-filter: blur(10px);
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid var(--glass-border);
          gap: 1.5rem;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 1rem;
          min-width: 0;
          flex: 1;
        }

        .header-title h2 {
          font-family: var(--font-heading);
          color: var(--accent);
          font-size: 1.4rem;
          margin: 0;
          font-weight: 700;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }

        .back-home-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.2rem;
          background: rgba(128, 0, 0, 0.05);
          color: var(--secondary);
          border: 1px solid rgba(128, 0, 0, 0.15);
          border-radius: 30px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .back-home-btn:hover {
          background: var(--secondary);
          color: white;
          transform: translateY(-1px);
        }

        .home-nav-btn {
          color: var(--accent) !important;
          border: 1px solid rgba(255, 153, 51, 0.2);
          background: rgba(255, 153, 51, 0.05);
          margin-bottom: 1rem;
        }
        
        .home-nav-btn:hover {
          background: var(--accent) !important;
          color: var(--secondary) !important;
        }

        .header-action-btn {
          background: rgba(128, 0, 0, 0.05);
          color: var(--secondary);
          border: 1px solid rgba(128, 0, 0, 0.1);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .header-action-btn:hover {
          background: var(--secondary);
          color: white;
          transform: scale(1.05);
        }

        .admin-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 600;
        }

        .admin-avatar {
          width: 34px;
          height: 34px;
          background: var(--accent);
          color: var(--secondary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
        }

        .user-name {
          font-weight: 700;
          color: var(--secondary);
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.2;
        }

        .user-role {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin: 4px 0 0 0;
        }

        .admin-content {
          padding: 3rem;
        }

        .welcome-header {
          margin-bottom: 3rem;
        }

        .welcome-header h1 {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          margin-bottom: 0.5rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
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

        /* Notifications & Settings */
        .notification-item {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem;
          background: white;
          margin-bottom: 1rem;
          transition: var(--transition);
        }
        .notification-item.unread {
          border-left: 4px solid var(--primary);
        }
        .note-icon {
          width: 45px;
          height: 45px;
          background: var(--marble);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          flex-shrink: 0;
        }
        .note-content {
          flex: 1;
        }
        .note-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }
        .note-header h4 { font-size: 1rem; color: var(--secondary); }
        .note-header span { font-size: 0.8rem; color: var(--text-muted); }
        .note-content p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; }

        .settings-panel {
          padding: 2.5rem;
          background: white;
        }
        .settings-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .input-field label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--secondary);
          margin-bottom: 0.5rem;
        }
        .input-field input {
          width: 100%;
          padding: 0.8rem;
          border-radius: 8px;
          border: 1px solid rgba(0,0,0,0.1);
          background: var(--marble);
          outline: none;
        }
        .input-field input:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Help Dashboard */
        .dashboard-help-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 3rem;
          margin-top: 1rem;
        }
        .support-card {
          padding: 2.5rem;
          background: white;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .support-links {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 2.5rem;
          margin-top: 2rem;
        }
        .link-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.95rem;
          color: var(--secondary);
          font-weight: 600;
        }
        .faq-box {
          padding: 2rem;
          background: white;
          border: 1px solid rgba(0,0,0,0.05);
          margin-bottom: 1.5rem;
        }
        .help-content h3 {
          margin-bottom: 2rem;
          color: var(--secondary);
        }

        /* History Items */
        .history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: white;
          border: 1px solid rgba(0,0,0,0.05);
          margin-bottom: 1.5rem;
        }
        .section-header-mini {
          margin-bottom: 2.5rem;
        }

        /* Sacred Chat Window */
        .sacred-chat-window {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 360px;
          height: 500px;
          background: white;
          z-index: 2000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          border: 1px solid var(--accent);
        }
        .chat-header {
          padding: 1.5rem;
          background: #4b0000;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .chat-user {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .online-indicator {
          width: 10px;
          height: 10px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 10px #10b981;
        }
        .chat-user h4 { font-size: 1rem; margin: 0; }
        .chat-user span { font-size: 0.75rem; opacity: 0.7; }
        .chat-header button { background: none; border: none; color: white; cursor: pointer; }

        .chat-body {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;
          background: var(--marble);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .msg {
          max-width: 85%;
          padding: 1rem;
          border-radius: 15px;
          font-size: 0.9rem;
          line-height: 1.4;
          position: relative;
        }
        .msg.bot {
          background: white;
          color: var(--secondary);
          border-bottom-left-radius: 2px;
          align-self: flex-start;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .msg span {
          display: block;
          font-size: 0.7rem;
          opacity: 0.5;
          margin-top: 0.5rem;
          text-align: right;
        }

        .chat-footer {
          padding: 1rem;
          background: white;
          display: flex;
          gap: 0.5rem;
          border-top: 1px solid rgba(0,0,0,0.05);
        }
        .chat-footer input {
          flex: 1;
          padding: 0.8rem 1rem;
          border-radius: 50px;
          border: 1px solid rgba(0,0,0,0.1);
          outline: none;
          background: var(--marble);
        }
        .send-btn {
          width: 45px;
          height: 45px;
          background: var(--primary);
          color: white;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .send-btn:hover { transform: scale(1.05); }

        @media (max-width: 480px) {
          .sacred-chat-window {
            width: 100%;
            height: 100%;
            bottom: 0;
            right: 0;
            border-radius: 0;
          }
        }

        @media (max-width: 1024px) {
          .admin-layout {
            grid-template-columns: 1fr;
          }
          
          .sidebar-toggle {
            display: flex;
          }

          .admin-sidebar {
            position: fixed;
            left: -100%;
            top: 0;
            bottom: 0;
            width: 280px;
            z-index: 10000;
            transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .admin-sidebar.open {
            left: 0;
          }

          .sidebar-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(4px);
            z-index: 9999;
          }

          .admin-header {
            padding: 1.2rem 1.5rem;
            gap: 1rem;
          }
          .header-title {
            margin-left: 0;
          }
        }

        @media (max-width: 900px) {
          .dashboard-help-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .booking-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
          .history-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
          .note-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
          }
          .stats-grid { grid-template-columns: 1fr; }
          .welcome-header h1 { font-size: 1.8rem; }
          .auth-container { padding: 2rem 1.5rem; }
          .auth-header h2 { font-size: 1.6rem; }
          .settings-panel { padding: 1.5rem; }
          .settings-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .section-header { flex-wrap: wrap; gap: 0.5rem; }
          .faq-box { padding: 1.25rem; }

          .back-home-btn span {
            display: none;
          }
          .back-home-btn {
            padding: 0.5rem;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            justify-content: center;
          }

          .header-title h2 { 
            font-size: 1rem !important; 
          }
          .header-title {
            margin-left: 0;
          }
          .admin-header { height: auto; padding: 1rem; flex-direction: row; justify-content: space-between; align-items: center; gap: 0.75rem; }
          .header-actions { width: auto; justify-content: flex-end; flex-direction: row; gap: 0.5rem; }
          .admin-profile { flex-direction: row; align-items: center; text-align: right; gap: 0.5rem; }
          .admin-content { padding: 1.5rem; display: flex; flex-direction: column; align-items: center; }
        }

        @media (max-width: 480px) {
          .booking-item { padding: 1rem; }
          .stat-card { padding: 1.25rem; }
          .stat-card .value { font-size: 1.4rem; }
          .auth-container { padding: 1.5rem 1rem; }

          .admin-content { padding: 1.5rem 0.5rem; width: 100%; display: flex; flex-direction: column; align-items: center; }
          .sidebar-toggle { padding: 0.4rem; border-radius: 10px; }
          .header-title h2 { 
            font-size: 0.85rem !important; 
          }
          .admin-header { padding: 0.8rem 0.5rem; flex-direction: row; justify-content: space-between; align-items: center; }
          .nav-btn { padding: 0.8rem 1rem; font-size: 0.9rem; }
        }
      `}</style>
    </div>
  );
};

export default Account;
