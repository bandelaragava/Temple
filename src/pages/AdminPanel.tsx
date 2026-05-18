import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Bell,
  Eye,
  EyeOff,
  TrendingUp,
  Calendar,
  ShieldCheck,
  Search,
  ChevronRight,
  Info,
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle2,
  XCircle,
  ToggleLeft,
  ToggleRight,
  Database,
  BarChart3,
  Globe,
  Lock,
  X,
  Image,
  Clock,
  Heart,
  Ticket,
  ShoppingCart,
  Menu,
  User
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PRODUCTS } from './store/storeData';

const Admin = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('overview');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordHovered, setPasswordHovered] = useState(false);
  const mainContentRef = React.useRef<HTMLDivElement>(null);

  const notificationRef = React.useRef<HTMLDivElement>(null);
  const profileRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowAdminNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
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
  }, [activeSection]);

  // Mock Data
  const [siteContent, setSiteContent] = useState({
    tickerText: 'Annual Brahmotsavams will commence next month. Advance booking for special Darshan is now open.',
    announcement: 'New E-Hundi portal launched for seamless digital offerings.',
    emergencyNotice: 'Masks mandatory for Darshan queues.',
    darshanEnabled: true,
    bookingEnabled: true,
    donationsEnabled: true,
    templeName: 'Sri Govindaraja Swamy Devasthanam',
    contactEmail: 'contact@govindaraja.in',
    contactPhone: '+91 877 1234567',
  });

  const [bookings, setBookings] = useState([
    { id: 'BK-1024', name: 'Ananya Sharma', seva: 'Suprabhata Seva', date: '2026-05-15', slot: '05:00 AM', status: 'Pending' },
    { id: 'BK-1025', name: 'Raghava Rama', seva: 'Tomala Seva', date: '2026-05-20', slot: '06:30 AM', status: 'Confirmed' },
    { id: 'BK-1026', name: 'Srinivasa Rao', seva: 'Kalyanotsavam', date: '2026-05-22', slot: '10:00 AM', status: 'Rejected' },
  ]);

  const [donations, setDonations] = useState([
    { id: 'DN-882', name: 'Kumar Swami', amount: '₹ 5,001', type: 'Annadanam', date: '2026-04-10' },
    { id: 'DN-883', name: 'Anonymous', amount: '₹ 10,000', type: 'Goshala', date: '2026-04-11' },
    { id: 'DN-884', name: 'Laksmi Devi', amount: '₹ 1,000', type: 'General', date: '2026-04-12' },
  ]);

  const [festivals, setFestivals] = useState(() => {
    const saved = localStorage.getItem('festivals');
    let data = saved ? JSON.parse(saved) : [
      { id: 1, name: 'Annual Brahmotsavam', date: 'Oct 10', duration: '9 Days', status: 'Upcoming', imageUrl: '/assets/annual_brahmotsavam.png' },
      { id: 2, name: 'Vaikuntha Ekadashi', date: 'Jan 02', duration: '1 Day', status: 'Scheduled', imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400' },
      { id: 3, name: 'Ratha Saptami', date: 'Feb 14', duration: '1 Day', status: 'Planned', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400' },
    ];

    // Auto-update broken Unsplash URL for Brahmotsavam
    return data.map((f: any) =>
      f.name === 'Annual Brahmotsavam' && f.imageUrl.includes('unsplash.com')
        ? { ...f, imageUrl: '/assets/annual_brahmotsavam.png' }
        : f
    );
  });

  const [sevas, setSevas] = useState(() => {
    const saved = localStorage.getItem('sevas');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Suprabhata Seva', price: '₹ 200', slots: 50, availability: 'Available' },
      { id: 2, name: 'Tomala Seva', price: '₹ 500', slots: 10, availability: 'Full' },
      { id: 3, name: 'Archana', price: '₹ 100', slots: 200, availability: 'Available' },
    ];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [adminKey, setAdminKey] = useState('admin123');
  const [showAdminNotifications, setShowAdminNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [filterDate, setFilterDate] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [adminNotifications, setAdminNotifications] = useState([
    { id: 1, title: 'Critical Booking', message: 'VIP Darshan slot requested for tomorrow.', time: '5m ago', type: 'warning', unread: true },
    { id: 2, title: 'Server Status', message: 'Temple database backup completed successfully.', time: '1h ago', type: 'info', unread: false },
    { id: 3, title: 'Payment Alert', message: 'Bulk donation received from Overseas Devotee Trust.', time: '3h ago', type: 'success', unread: true },
  ]);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsSidebarOpen(false);
  };

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('registeredUsers');
    const defaultUsers = [
      { name: 'Raghava Rama', email: 'devotee@govindaraja.in', registered: '2026-04-10' },
      { name: 'Ananya Sharma', email: 'ananya@example.com', registered: '2026-04-12' },
      { name: 'Srinivasa Rao', email: 'sri@temple.in', registered: '2026-04-15' },
    ];
    return saved ? JSON.parse(saved) : defaultUsers;
  });

  // CMS State initialized from localStorage
  const [templeEnvContent, setTempleEnvContent] = useState(() => {
    const saved = localStorage.getItem('templeEnvContent');
    return saved ? JSON.parse(saved) : {
      videoUrl: 'https://www.youtube.com/embed/S_vT-qV96Yg',
      description: 'Experience the serene and divine environment of our sacred temple through this spiritual glimpse.'
    };
  });

  const [dailyRituals, setDailyRituals] = useState(() => {
    const saved = localStorage.getItem('dailyRituals');
    return saved ? JSON.parse(saved) : [
      { id: 1, time: '05:00 AM', name: 'Suprabhata Seva', desc: 'Awakening the Lord' },
      { id: 2, time: '06:30 AM', name: 'Tomala Seva', desc: 'Decorating with garlands' }
    ];
  });

  const [weeklyRituals, setWeeklyRituals] = useState(() => {
    const saved = localStorage.getItem('weeklyRituals');
    return saved ? JSON.parse(saved) : [
      { id: 'w1', day: 'Monday', seva: 'Visheshat Pooja', icon: '✨', color: '#FF9933' },
      { id: 'w2', day: 'Tuesday', seva: 'Ashtadala Seva', icon: '🌸', color: '#800000' },
      { id: 'w3', day: 'Wednesday', seva: 'Kalasabhishekam', icon: '⚱️', color: '#D4AF37' },
      { id: 'w4', day: 'Thursday', seva: 'Tiruppavada Seva', icon: '🔱', color: '#FF5E5E' },
      { id: 'w5', day: 'Friday', seva: 'Abhishekam', icon: '🌊', color: '#4A90E2' },
    ];
  });

  const [panchangam, setPanchangam] = useState(() => {
    const saved = localStorage.getItem('panchangam');
    return saved ? JSON.parse(saved) : {
      tithi: 'Ekadashi',
      nakshatram: 'Rohini',
      yogam: 'Siddha',
      karanam: 'Bava',
      sunrise: '06:12 AM',
      sunset: '06:30 PM',
      rahu: '04:30 PM - 06:00 PM',
      gulika: '03:00 PM - 04:30 PM'
    };
  });

  const [adminFestivals, setAdminFestivals] = useState(() => {
    const saved = localStorage.getItem('upcomingFestivals');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Annual Brahmotsavam', date: '2026-05-10' },
      { id: 2, name: 'Teppotsavam', date: '2026-04-20' },
    ];
  });

  const [darshanInfo, setDarshanInfo] = useState(() => {
    const saved = localStorage.getItem('darshanInfo');
    return saved ? JSON.parse(saved) : 'Sarva Darshan is available from 08:30 AM to 11:30 PM. Special entry darshan requires prior booking.';
  });

  const [darshanTypes, setDarshanTypes] = useState(() => {
    const saved = localStorage.getItem('darshanTypes');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'Sarva Darshan',
        timings: '06:00 AM - 11:00 PM',
        entryDetails: 'Free for all via Vaikuntam Queue',
        description: 'General darshan for all devotees.',
        liveUpdates: 'Normal Flow',
        peakRushDays: 'Weekends'
      },
    ];
  });

  const [galleryImages, setGalleryImages] = useState(() => {
    const saved = localStorage.getItem('galleryImages');
    return saved ? JSON.parse(saved) : [
      { id: 1, url: 'https://images.unsplash.com/photo-1600080800683-162e249fbd9c?auto=format&fit=crop&w=800', title: 'Temple Gopuram' }
    ];
  });

  const [storeProducts, setStoreProducts] = useState(() => {
    const saved = localStorage.getItem('storeProducts');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  // Generic save handler
  const saveToCMS = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
    setSaveStatus('Changes saved successfully!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleDeleteUser = (email: string) => {
    if (window.confirm('Are you sure you want to remove this devotee record?')) {
      const updated = registeredUsers.filter((u: any) => u.email !== email);
      setRegisteredUsers(updated);
      localStorage.setItem('registeredUsers', JSON.stringify(updated));
      setSaveStatus('Devotee record removed.');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    const newUser = {
      name: formData.name,
      email: formData.email,
      registered: new Date().toISOString().split('T')[0]
    };
    const updated = [...registeredUsers, newUser];
    setRegisteredUsers(updated);
    localStorage.setItem('registeredUsers', JSON.stringify(updated));
    setActiveModal(null);
    setSaveStatus('Devotee added successfully!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleAddSeva = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    const newSeva = {
      id: sevas.length + 1,
      name: formData.name,
      price: formData.price || '₹ 0',
      slots: parseInt(formData.slots || '0'),
      time: formData.time || '06:00 AM',
      availability: 'Available'
    };
    setSevas([...sevas, newSeva]);
    setActiveModal(null);
  };

  const handleAddFestival = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    const newFest = {
      id: festivals.length + 1,
      name: formData.name,
      date: formData.date || 'TBD',
      duration: '1 Day',
      status: 'Upcoming'
    };
    setFestivals([...festivals, newFest]);
    setActiveModal(null);
  };

  const filteredUsers = registeredUsers.filter((u: any) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdminLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleSaveContent = () => {
    setSaveStatus('Saving...');
    setTimeout(() => {
      setSaveStatus('Changes saved successfully!');
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1500);
  };

  const handleUpdateBookingStatus = (id: string, newStatus: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    setAdminNotifications([
      { id: Date.now(), title: 'Booking Updated', message: `Booking ${id} set to ${newStatus}.`, time: 'Just now', type: 'info', unread: true },
      ...adminNotifications
    ]);
  };

  const handleDeleteSeva = (id: number) => {
    if (window.confirm('Are you sure you want to delete this Seva?')) {
      setSevas(sevas.filter(s => s.id !== id));
    }
  };

  const handleUpdateAdminKey = (newKey: string) => {
    if (newKey.length < 6) return alert('Key must be at least 6 characters.');
    setAdminKey(newKey);
    alert('Admin Security Key updated successfully!');
  };

  const handleExportDonations = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "ID,Name,Type,Amount,Date\n"
      + donations.map(d => `${d.id},${d.name},${d.type},${d.amount},${d.date}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "temple_donations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBookings = bookings.filter(b => {
    const matchesDate = !filterDate || b.date === filterDate;
    const matchesSearch = !searchQuery || 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.seva.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDate && matchesSearch;
  });

  if (!isAdminLoggedIn) {
    return (
      <div className="admin-login-page">
        <motion.div
          className="admin-login-card glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="login-header">
            <ShieldCheck size={48} className="admin-icon" />
            <h2>Admin Sanctuary</h2>
            <p>Access the sacred controls of the divine portal</p>
          </div>
          <form onSubmit={handleAdminLogin}>
            <div
              className="input-group"
              onMouseEnter={() => setPasswordHovered(true)}
              onMouseLeave={() => setPasswordHovered(false)}
              style={{ position: 'relative' }}
            >
              <Lock size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Access Key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                required
              />
              {password.length > 0 && (
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
                    color: 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '5px',
                    zIndex: 2
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
            </div>
            {loginError && <p className="error-text">Invalid access key. Please try again.</p>}
            <button type="submit" className="btn-primary w-full">Grant Access</button>
          </form>
        </motion.div>

        <style>{`
          .admin-login-page {
            height: 85vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle at center, var(--secondary) 0%, #0c0c14 100%);
            padding: 2rem;
            position: relative;
            z-index: 10000;
          }
          .admin-login-card {
            max-width: 400px;
            width: 100%;
            padding: 3rem;
            text-align: center;
            background: rgba(128, 0, 0, 0.4);
            border: 1px solid var(--accent);
            backdrop-filter: blur(24px);
            border-radius: 24px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          }
          .login-header {
            margin-bottom: 2.5rem;
          }
          .admin-icon {
            color: var(--accent);
            margin-bottom: 1rem;
            filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.3));
          }
          .admin-login-card h2 {
            font-size: 1.8rem;
            color: #fff;
            margin-bottom: 0.5rem;
            font-family: var(--font-heading);
          }
          .admin-login-card p {
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.9rem;
          }
          .input-group {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .input-group input {
            background: transparent;
            border: none;
            color: #fff;
            outline: none;
            width: 100%;
            font-size: 1rem;
          }
          .error-text {
            color: #ff4444;
            font-size: 0.85rem;
            margin-bottom: 1rem;
          }
          .w-full {
            width: 100%;
            padding: 1rem;
            font-weight: 700;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`admin-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar Mobile Toggle */}
      <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

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
          <span>Devasthanam Admin</span>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-btn ${activeSection === 'overview' ? 'active' : ''}`}
            onClick={() => handleNavClick('overview')}
          >
            <LayoutDashboard size={18} /> Overview
          </button>
          <button
            className={`nav-btn ${activeSection === 'templeEnvironment' ? 'active' : ''}`}
            onClick={() => handleNavClick('templeEnvironment')}
          >
            <Globe size={18} /> Temple Environment
          </button>
          <button
            className={`nav-btn ${activeSection === 'dailyRitual' ? 'active' : ''}`}
            onClick={() => handleNavClick('dailyRitual')}
          >
            <Clock size={18} /> Daily Ritual
          </button>
          <button
            className={`nav-btn ${activeSection === 'panchangam' ? 'active' : ''}`}
            onClick={() => handleNavClick('panchangam')}
          >
            <Calendar size={18} /> Panchangam & Vishesham
          </button>
          <button
            className={`nav-btn ${activeSection === 'users' ? 'active' : ''}`}
            onClick={() => handleNavClick('users')}
          >
            <Users size={18} /> User Account Details
          </button>
          <button
            className={`nav-btn ${activeSection === 'darshan' ? 'active' : ''}`}
            onClick={() => handleNavClick('darshan')}
          >
            <Eye size={18} /> Darshan
          </button>
          <button
            className={`nav-btn ${activeSection === 'bookings' ? 'active' : ''}`}
            onClick={() => handleNavClick('bookings')}
          >
            <Ticket size={18} /> Booking
          </button>
          <button
            className={`nav-btn ${activeSection === 'gallery' ? 'active' : ''}`}
            onClick={() => handleNavClick('gallery')}
          >
            <Image size={18} /> Gallery
          </button>
          <button
            className={`nav-btn ${activeSection === 'festivals' ? 'active' : ''}`}
            onClick={() => handleNavClick('festivals')}
          >
            <BarChart3 size={18} /> Festivals
          </button>
          <button
            className={`nav-btn ${activeSection === 'donations' ? 'active' : ''}`}
            onClick={() => handleNavClick('donations')}
          >
            <Heart size={18} /> Donate Now
          </button>
          <button
            className={`nav-btn ${activeSection === 'sevas' ? 'active' : ''}`}
            onClick={() => handleNavClick('sevas')}
          >
            <Bell size={18} /> Seva & Darshan
          </button>
          <button
            className={`nav-btn ${activeSection === 'store' ? 'active' : ''}`}
            onClick={() => handleNavClick('store')}
          >
            <ShoppingCart size={18} /> Temple Store
          </button>
          <button
            className={`nav-btn ${activeSection === 'content' ? 'active' : ''}`}
            onClick={() => handleNavClick('content')}
          >
            <FileText size={18} /> CMS
          </button>

          <div className="sidebar-divider"></div>
          <button className="nav-btn logout" onClick={() => { setIsAdminLoggedIn(false); setIsSidebarOpen(false); }}>
            <ShieldCheck size={18} /> Exit Sanctuary
          </button>
        </nav>
      </aside>

      {/* Admin Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="admin-modal-overlay" onClick={() => setActiveModal(null)}>
            <motion.div
              className="admin-modal-card glass-card"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header-admin">
                <h3>{activeModal === 'user' ? 'Add New Devotee' : activeModal === 'seva' ? 'Create New Seva' : 'Schedule Festival'}</h3>
                <button onClick={() => setActiveModal(null)}><X size={20} /></button>
              </div>

              <form onSubmit={activeModal === 'user' ? handleAddUser : activeModal === 'seva' ? handleAddSeva : handleAddFestival}>
                <div className="modal-body-admin">
                  {activeModal === 'user' && (
                    <>
                      <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" required onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Srinivasa Rao" />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" required onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="devotee@example.com" />
                      </div>
                    </>
                  )}

                  {activeModal === 'seva' && (
                    <>
                      <div className="form-group">
                        <label>Seva Name</label>
                        <input type="text" required onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Sahasra Deepalankara" />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Price (₹)</label>
                          <input type="text" required onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="₹ 500" />
                        </div>
                        <div className="form-group">
                          <label>Daily Slots</label>
                          <input type="number" required onChange={e => setFormData({ ...formData, slots: e.target.value })} placeholder="50" />
                        </div>
                      </div>
                    </>
                  )}

                  {activeModal === 'festival' && (
                    <>
                      <div className="form-group">
                        <label>Festival Name</label>
                        <input type="text" required onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Vaikuntha Ekadashi" />
                      </div>
                      <div className="form-group">
                        <label>Start Date</label>
                        <input type="date" required onChange={e => setFormData({ ...formData, date: e.target.value })} />
                      </div>
                    </>
                  )}
                </div>
                <div className="modal-footer-admin">
                  <button type="button" className="btn-secondary" onClick={() => setActiveModal(null)}>Cancel</button>
                  <button type="submit" className="btn-primary">Confirm & Add</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {selectedBooking && (
          <div className="admin-modal-overlay" onClick={() => setSelectedBooking(null)}>
            <motion.div
              className="admin-modal-card glass-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header-admin">
                <h3>Booking Details</h3>
                <button onClick={() => setSelectedBooking(null)}><X size={20} /></button>
              </div>
              <div className="modal-body-admin">
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Reference ID</label>
                    <p>#{selectedBooking.id}</p>
                  </div>
                  <div className="detail-item">
                    <label>Devotee Name</label>
                    <p>{selectedBooking.name}</p>
                  </div>
                  <div className="detail-item">
                    <label>Seva Requested</label>
                    <p>{selectedBooking.seva}</p>
                  </div>
                  <div className="detail-item">
                    <label>Date & Slot</label>
                    <p>{selectedBooking.date} | {selectedBooking.slot}</p>
                  </div>
                  <div className="detail-item">
                    <label>Status</label>
                    <span className={`status-badge ${selectedBooking.status.toLowerCase()}`}>{selectedBooking.status}</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer-admin">
                <button className="btn-primary" onClick={() => setSelectedBooking(null)}>Close Details</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="admin-main" ref={mainContentRef}>
        <header className="admin-header">
          <div className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="/logo.png" alt="Logo" className="header-logo-img" />
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)', fontSize: '1.4rem', margin: 0, fontWeight: 700 }}>
              {siteContent.templeName}
            </h2>
          </div>
          <div className="header-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search devotees, records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="header-actions">
            <div className="notification-wrapper-admin" ref={notificationRef}>
              <button
                className="icon-btn-admin"
                onClick={() => {
                  setShowAdminNotifications(!showAdminNotifications);
                  setShowProfileDropdown(false);
                }}
              >
                <Bell size={18} />
                {adminNotifications.filter(n => n.unread).length > 0 && <span className="admin-badge"></span>}
              </button>

              <AnimatePresence>
                {showAdminNotifications && (
                  <motion.div
                    className="admin-notification-dropdown glass-card"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  >
                    <div className="admin-note-header">
                      <h3>Sacred Alerts</h3>
                      <button onClick={() => setAdminNotifications(adminNotifications.map(n => ({ ...n, unread: false })))}>Mark all read</button>
                    </div>
                    <div className="admin-note-list">
                      {adminNotifications.map(note => (
                        <div key={note.id} className={`admin-note-item ${note.unread ? 'unread' : ''}`}>
                          <div className={`admin-note-indicator ${note.type}`}></div>
                          <div className="admin-note-content">
                            <h4>{note.title}</h4>
                            <p>{note.message}</p>
                            <span>{note.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="admin-profile" ref={profileRef} onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowAdminNotifications(false);
            }} style={{ cursor: 'pointer', position: 'relative' }}>
              <div className="admin-avatar"><User size={18} /></div>
              
              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div 
                    className="profile-dropdown glass-card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="dropdown-header">
                      <div className="user-info">
                        <p className="user-name">Archaka Admin</p>
                        <p className="user-role">Temple Administrator</p>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={() => { setActiveSection('overview'); setShowProfileDropdown(false); }}>
                       <LayoutDashboard size={16} /> Dashboard
                    </button>
                    <button className="dropdown-item" onClick={() => { setActiveSection('content'); setShowProfileDropdown(false); }}>
                       <Settings size={16} /> Settings
                    </button>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout-item" onClick={() => setIsAdminLoggedIn(false)}>
                       <XCircle size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <div className="admin-content">
          <AnimatePresence mode="wait">
            {activeSection === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="stats-row">
                  <div className="stat-card-admin">
                    <div className="stat-icon users"><Users size={24} /></div>
                    <div className="stat-info">
                      <span className="label">Total Devotees</span>
                      <span className="value">{registeredUsers.length}</span>
                      <span className="trend up"><TrendingUp size={14} /> +12%</span>
                    </div>
                  </div>
                  <div className="stat-card-admin">
                    <div className="stat-icon bookings"><Calendar size={24} /></div>
                    <div className="stat-info">
                      <span className="label">Bookings Today</span>
                      <span className="value">{bookings.length + 5}</span>
                      <span className="trend up"><TrendingUp size={14} /> +8%</span>
                    </div>
                  </div>
                  <div className="stat-card-admin">
                    <div className="stat-icon donations"><Database size={24} /></div>
                    <div className="stat-info">
                      <span className="label">Total Offerings</span>
                      <span className="value">₹ 35,400</span>
                      <span className="trend up"><TrendingUp size={14} /> +15%</span>
                    </div>
                  </div>
                </div>

                <div className="dashboard-grid">
                  <div className="grid-item large glass-card">
                    <h3>Recent Activity</h3>
                    <div className="activity-list">
                      <div className="activity-item">
                        <div className="activity-icon blue"><Calendar size={14} /></div>
                        <div className="activity-text">
                          <p><strong>New Booking:</strong> Ananya Sharma booked Suprabhata Seva</p>
                          <span>2 minutes ago</span>
                        </div>
                      </div>
                      <div className="activity-item">
                        <div className="activity-icon gold"><Database size={14} /></div>
                        <div className="activity-text">
                          <p><strong>Donation Received:</strong> ₹ 5,000 from anonymous devotee</p>
                          <span>15 minutes ago</span>
                        </div>
                      </div>
                      <div className="activity-item">
                        <div className="activity-icon green"><Users size={14} /></div>
                        <div className="activity-text">
                          <p><strong>User Registered:</strong> Srinivasa Rao joined the portal</p>
                          <span>1 hour ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid-item small glass-card">
                    <h3>Quick Controls</h3>
                    <div className="quick-controls">
                      <div className="control-item">
                        <div className="control-label">
                          <Calendar size={18} />
                          <span>Darshan Booking</span>
                        </div>
                        <button
                          className={`toggle-btn ${siteContent.bookingEnabled ? 'on' : 'off'}`}
                          onClick={() => setSiteContent({ ...siteContent, bookingEnabled: !siteContent.bookingEnabled })}
                        >
                          {siteContent.bookingEnabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                        </button>
                      </div>
                      <div className="control-item">
                        <div className="control-label">
                          <Database size={18} />
                          <span>E-Hundi Access</span>
                        </div>
                        <button
                          className={`toggle-btn ${siteContent.donationsEnabled ? 'on' : 'off'}`}
                          onClick={() => setSiteContent({ ...siteContent, donationsEnabled: !siteContent.donationsEnabled })}
                        >
                          {siteContent.donationsEnabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                        </button>
                      </div>
                      <div className="control-item">
                        <div className="control-label">
                          <ShieldCheck size={18} />
                          <span>Maintenance Mode</span>
                        </div>
                        <button
                          className={`toggle-btn ${maintenanceMode ? 'on' : 'off'}`}
                          onClick={() => setMaintenanceMode(!maintenanceMode)}
                        >
                          {maintenanceMode ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                        </button>
                      </div>
                      <div className="control-item">
                        <div className="control-label">
                          <Eye size={18} />
                          <span>Live Streaming</span>
                        </div>
                        <button
                          className="toggle-btn on"
                          onClick={() => alert('Live stream control updated.')}
                        >
                          <ToggleRight size={32} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'content' && (
              <motion.div
                key="content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="content-manager"
              >
                <div className="section-header-admin">
                  <h2>Content Management</h2>
                  <button className="btn-primary" onClick={handleSaveContent}>
                    <Save size={18} /> Save All Changes
                  </button>
                </div>

                {saveStatus && (
                  <div className="save-notification">
                    <CheckCircle2 size={18} /> {saveStatus}
                  </div>
                )}

                <div className="editor-grid">
                  <div className="editor-card glass-card">
                    <label>Ticker Updates (Scroll text)</label>
                    <textarea
                      value={siteContent.tickerText}
                      onChange={(e) => setSiteContent({ ...siteContent, tickerText: e.target.value })}
                    />
                  </div>
                  <div className="editor-card glass-card">
                    <label>Main Announcement</label>
                    <textarea
                      value={siteContent.announcement}
                      onChange={(e) => setSiteContent({ ...siteContent, announcement: e.target.value })}
                    />
                  </div>
                  <div className="editor-card glass-card">
                    <label>Emergency Notice</label>
                    <input
                      type="text"
                      value={siteContent.emergencyNotice}
                      onChange={(e) => setSiteContent({ ...siteContent, emergencyNotice: e.target.value })}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="user-base"
              >
                <div className="section-header-admin">
                  <h2>Registered Devotees</h2>
                  <div className="table-actions">
                    <button className="btn-primary" onClick={() => { setFormData({}); setActiveModal('user'); }}><Plus size={18} /> Add User</button>
                  </div>
                </div>

                <div className="user-table-container glass-card">
                  <table className="user-table">
                    <thead>
                      <tr>
                        <th>Devotee Name</th>
                        <th>Email Address</th>
                        <th>Joined Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user: any, index: number) => (
                        <tr key={index}>
                          <td>
                            <div className="user-cell">
                              <div className="user-initial">{user.name[0]}</div>
                              {user.name}
                            </div>
                          </td>
                          <td>{user.email}</td>
                          <td>{user.registered || 'N/A'}</td>
                          <td><span className="status-badge active">Active</span></td>
                          <td>
                            <div className="row-actions">
                              <button title="Edit" onClick={() => alert('Edit feature is being updated for security.')}><Edit2 size={16} /></button>
                              <button
                                title="Delete"
                                className="delete"
                                onClick={() => handleDeleteUser(user.email)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Bookings Section */}
            {activeSection === 'bookings' && (
              <motion.div key="bookings" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="section-header-admin">
                  <h2>Darshan Bookings</h2>
                  <div className="date-picker-wrapper">
                    <Calendar size={18} className="picker-icon" />
                    <input
                      type="date"
                      className="admin-date-picker"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="user-table-container glass-card">
                  <table className="user-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Devotee Name</th>
                        <th>Seva Type</th>
                        <th>Date & Slot</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking, i) => (
                          <tr key={i}>
                            <td>{booking.id}</td>
                            <td>{booking.name}</td>
                            <td>{booking.seva}</td>
                            <td>{booking.date} | {booking.slot}</td>
                            <td><span className={`status-badge ${booking.status.toLowerCase()}`}>{booking.status}</span></td>
                            <td>
                              <div className="row-actions">
                                {booking.status === 'Pending' && (
                                  <>
                                    <button
                                      className="approve"
                                      onClick={() => handleUpdateBookingStatus(booking.id, 'Confirmed')}
                                      title="Approve"
                                    >
                                      <CheckCircle2 size={16} />
                                    </button>
                                    <button
                                      className="delete"
                                      onClick={() => handleUpdateBookingStatus(booking.id, 'Cancelled')}
                                      title="Reject"
                                    >
                                      <XCircle size={16} />
                                    </button>
                                  </>
                                )}
                                <button onClick={() => setSelectedBooking(booking)} title="View Details"><Eye size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                            No bookings found for the selected date.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Sevas Section */}
            {activeSection === 'sevas' && (
              <motion.div key="sevas" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="section-header-admin">
                  <h2>Seva Management</h2>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-secondary" onClick={() => saveToCMS('sevas', sevas)}>
                      <Save size={18} /> Save Sevas
                    </button>
                    <button className="btn-primary" onClick={() => setSevas([...sevas, { id: Date.now(), name: 'New Seva', price: '₹ 0', slots: 0, availability: 'Available' }])}>
                      <Plus size={18} /> Add Seva
                    </button>
                  </div>
                </div>
                {saveStatus && (
                  <div className="save-notification">
                    <CheckCircle2 size={18} /> {saveStatus}
                  </div>
                )}
                <div className="editor-grid">
                  {sevas.map((seva, index) => (
                    <div key={seva.id} className="editor-card glass-card">
                      <div className="form-group">
                        <label>Seva Name</label>
                        <input type="text" value={seva.name} onChange={e => {
                          const newS = [...sevas];
                          newS[index].name = e.target.value;
                          setSevas(newS);
                        }} />
                      </div>
                      <div className="form-group">
                        <label>Price</label>
                        <input type="text" value={seva.price} onChange={e => {
                          const newS = [...sevas];
                          newS[index].price = e.target.value;
                          setSevas(newS);
                        }} />
                      </div>
                      <div className="form-group">
                        <label>Daily Slots</label>
                        <input type="number" value={seva.slots} onChange={e => {
                          const newS = [...sevas];
                          newS[index].slots = parseInt(e.target.value);
                          setSevas(newS);
                        }} />
                      </div>
                      <button className="delete" style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }} onClick={() => setSevas(sevas.filter(s => s.id !== seva.id))}>Remove Seva</button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Donations Section */}
            {activeSection === 'donations' && (
              <motion.div key="donations" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="section-header-admin">
                  <h2>Donation Records</h2>
                  <button className="btn-primary" onClick={handleExportDonations}>Export CSV</button>
                </div>
                <div className="user-table-container glass-card">
                  <table className="user-table">
                    <thead>
                      <tr>
                        <th>Transaction ID</th>
                        <th>Devotee Name</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map((dn, i) => (
                        <tr key={i}>
                          <td>{dn.id}</td>
                          <td>{dn.name}</td>
                          <td>{dn.type}</td>
                          <td><strong>{dn.amount}</strong></td>
                          <td>{dn.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Festivals Section */}
            {activeSection === 'festivals' && (
              <motion.div key="festivals" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="section-header-admin">
                  <h2>Festival Calendar</h2>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-secondary" onClick={() => saveToCMS('festivals', festivals)}>
                      <Save size={18} /> Save Festivals
                    </button>
                    <button className="btn-primary" onClick={() => setFestivals([...festivals, { id: Date.now(), name: 'New Festival', date: 'Jan 01', duration: '1 Day', status: 'Scheduled' }])}>
                      <Plus size={18} /> Add Festival
                    </button>
                  </div>
                </div>
                {saveStatus && (
                  <div className="save-notification">
                    <CheckCircle2 size={18} /> {saveStatus}
                  </div>
                )}
                <div className="editor-grid">
                  {festivals.map((fest, index) => (
                    <div key={fest.id} className="editor-card glass-card">
                      <div className="form-group">
                        <label>Festival Name</label>
                        <input type="text" value={fest.name} onChange={e => {
                          const newF = [...festivals];
                          newF[index].name = e.target.value;
                          setFestivals(newF);
                        }} />
                      </div>
                      <div className="form-group">
                        <label>Date & Month</label>
                        <input type="text" value={fest.date} onChange={e => {
                          const newF = [...festivals];
                          newF[index].date = e.target.value;
                          setFestivals(newF);
                        }} />
                      </div>
                      <div className="form-group">
                        <label>Duration</label>
                        <input type="text" value={fest.duration} onChange={e => {
                          const newF = [...festivals];
                          newF[index].duration = e.target.value;
                          setFestivals(newF);
                        }} />
                      </div>
                      <div className="form-group">
                        <label>Image Path / URL</label>
                        <input type="text" value={fest.imageUrl} onChange={e => {
                          const newF = [...festivals];
                          newF[index].imageUrl = e.target.value;
                          setFestivals(newF);
                        }} />
                        {fest.imageUrl && (
                          <div className="preview-container mt-2" style={{ borderRadius: '8px', overflow: 'hidden', height: '100px' }}>
                            <img src={fest.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Invalid+Image+Path')} />
                          </div>
                        )}
                      </div>
                      <button className="delete" style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }} onClick={() => setFestivals(festivals.filter(f => f.id !== fest.id))}>Remove Festival</button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Settings Section */}
            {activeSection === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="section-header-admin">
                  <h2>Portal Settings</h2>
                  <button className="btn-primary" onClick={handleSaveContent}><Save size={18} /> Update Settings</button>
                </div>
                <div className="editor-grid">
                  <div className="editor-card glass-card">
                    <label>Temple Name</label>
                    <input type="text" value={siteContent.templeName} onChange={e => setSiteContent({ ...siteContent, templeName: e.target.value })} />
                  </div>
                  <div className="editor-card glass-card">
                    <label>Contact Email</label>
                    <input type="email" value={siteContent.contactEmail} onChange={e => setSiteContent({ ...siteContent, contactEmail: e.target.value })} />
                  </div>
                  <div className="editor-card glass-card">
                    <label>Change Admin Key</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      onKeyPress={(e) => e.key === 'Enter' && handleUpdateAdminKey((e.target as HTMLInputElement).value)}
                    />
                  </div>
                  <div className="editor-card glass-card">
                    <label>Maintenance Mode</label>
                    <button
                      className={`toggle-btn ${maintenanceMode ? 'on' : 'off'}`}
                      onClick={() => setMaintenanceMode(!maintenanceMode)}
                    >
                      {maintenanceMode ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Temple Environment Section */}
            {activeSection === 'templeEnvironment' && (
              <motion.div key="templeEnvironment" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="section-header-admin">
                  <h2>Temple Environment (Home Page)</h2>
                  <button className="btn-primary" onClick={() => saveToCMS('templeEnvContent', templeEnvContent)}>
                    <Save size={18} /> Save Changes
                  </button>
                </div>
                {saveStatus && (
                  <div className="save-notification">
                    <CheckCircle2 size={18} /> {saveStatus}
                  </div>
                )}
                <div className="editor-card glass-card">
                  <div className="form-group">
                    <label>Live Video Embed URL</label>
                    <input
                      type="text"
                      value={templeEnvContent.videoUrl || ''}
                      onChange={(e) => setTempleEnvContent({ ...templeEnvContent, videoUrl: e.target.value })}
                      placeholder="e.g. https://www.youtube.com/embed/..."
                    />
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>
                      <Info size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                      YouTube Shorts and standard video links will be automatically converted to embed format.
                    </p>
                  </div>
                  <div className="form-group">
                    <label>Environment Description</label>
                    <textarea
                      value={templeEnvContent.description || ''}
                      onChange={(e) => setTempleEnvContent({ ...templeEnvContent, description: e.target.value })}
                      rows={4}
                      style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px' }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Daily Ritual Section */}
            {activeSection === 'dailyRitual' && (
              <motion.div key="dailyRitual" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="section-header-admin">
                  <h2>Ritual Management</h2>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-secondary" onClick={() => saveToCMS('weeklyRituals', weeklyRituals)}>
                      <Save size={18} /> Save Weekly
                    </button>
                    <button className="btn-primary" onClick={() => saveToCMS('dailyRituals', dailyRituals)}>
                      <Save size={18} /> Save Daily
                    </button>
                  </div>
                </div>
                {saveStatus && (
                  <div className="save-notification">
                    <CheckCircle2 size={18} /> {saveStatus}
                  </div>
                )}

                <div className="admin-tabs" style={{ marginBottom: '2rem' }}>
                  <h3 style={{ borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: '0.5rem' }}>Daily Pulse</h3>
                </div>

                <div className="editor-grid">
                  {dailyRituals.map((ritual: any, index: number) => (
                    <div key={ritual.id} className="editor-card glass-card">
                      <div className="form-group">
                        <label>Ritual Time (e.g. 05:00 AM)</label>
                        <input type="text" value={ritual.time} onChange={e => {
                          const newRituals = [...dailyRituals];
                          newRituals[index].time = e.target.value;
                          setDailyRituals(newRituals);
                        }} />
                      </div>
                      <div className="form-group">
                        <label>Ritual Name</label>
                        <input type="text" value={ritual.name} onChange={e => {
                          const newRituals = [...dailyRituals];
                          newRituals[index].name = e.target.value;
                          setDailyRituals(newRituals);
                        }} />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea value={ritual.desc} onChange={e => {
                          const newRituals = [...dailyRituals];
                          newRituals[index].desc = e.target.value;
                          setDailyRituals(newRituals);
                        }} rows={2} style={{ width: '100%', background: 'rgba(0,0,0,0.1)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '0.5rem' }} />
                      </div>
                      <button className="delete" style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }} onClick={() => setDailyRituals(dailyRituals.filter((r: any) => r.id !== ritual.id))}>Remove Ritual</button>
                    </div>
                  ))}
                  <div className="editor-card glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button className="btn-secondary" onClick={() => setDailyRituals([...dailyRituals, { id: Date.now(), time: '00:00 AM', name: 'New Ritual', desc: '' }])}>
                      <Plus size={24} /> Add Daily Ritual
                    </button>
                  </div>
                </div>

                <div className="admin-tabs" style={{ margin: '3rem 0 2rem' }}>
                  <h3 style={{ borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: '0.5rem' }}>Weekly Specials</h3>
                </div>

                <div className="editor-grid">
                  {weeklyRituals.map((ritual: any, index: number) => (
                    <div key={ritual.id} className="editor-card glass-card">
                      <div className="form-group">
                        <label>Day of Week</label>
                        <input type="text" value={ritual.day} onChange={e => {
                          const newRituals = [...weeklyRituals];
                          newRituals[index].day = e.target.value;
                          setWeeklyRituals(newRituals);
                        }} />
                      </div>
                      <div className="form-group">
                        <label>Seva Name</label>
                        <input type="text" value={ritual.seva} onChange={e => {
                          const newRituals = [...weeklyRituals];
                          newRituals[index].seva = e.target.value;
                          setWeeklyRituals(newRituals);
                        }} />
                      </div>
                      <div className="form-group">
                        <label>Icon Emoji</label>
                        <input type="text" value={ritual.icon} onChange={e => {
                          const newRituals = [...weeklyRituals];
                          newRituals[index].icon = e.target.value;
                          setWeeklyRituals(newRituals);
                        }} />
                      </div>
                      <button className="delete" style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }} onClick={() => setWeeklyRituals(weeklyRituals.filter((r: any) => r.id !== ritual.id))}>Remove Weekly Seva</button>
                    </div>
                  ))}
                  <div className="editor-card glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button className="btn-secondary" onClick={() => setWeeklyRituals([...weeklyRituals, { id: Date.now(), day: 'Monday', seva: 'New Seva', icon: '✨', color: '#FF9933' }])}>
                      <Plus size={24} /> Add Weekly Seva
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Panchangam Section */}
            {activeSection === 'panchangam' && (
              <motion.div key="panchangam" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="section-header-admin">
                  <h2>Panchangam & Vishesham</h2>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-secondary" onClick={() => saveToCMS('upcomingFestivals', adminFestivals)}>
                      <Save size={18} /> Save Festivals
                    </button>
                    <button className="btn-primary" onClick={() => saveToCMS('panchangam', panchangam)}>
                      <Save size={18} /> Save Timings
                    </button>
                  </div>
                </div>
                {saveStatus && (
                  <div className="save-notification">
                    <CheckCircle2 size={18} /> {saveStatus}
                  </div>
                )}

                <div className="admin-tabs" style={{ marginBottom: '2rem' }}>
                  <h3 style={{ borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: '0.5rem' }}>Daily Panchangam</h3>
                </div>

                <div className="editor-grid">
                  <div className="editor-card glass-card">
                    <label>Today's Tithi</label>
                    <input type="text" value={panchangam.tithi} onChange={e => setPanchangam({ ...panchangam, tithi: e.target.value })} />
                  </div>
                  <div className="editor-card glass-card">
                    <label>Today's Nakshatram</label>
                    <input type="text" value={panchangam.nakshatram} onChange={e => setPanchangam({ ...panchangam, nakshatram: e.target.value })} />
                  </div>
                  <div className="editor-card glass-card">
                    <label>Today's Yogam</label>
                    <input type="text" value={panchangam.yogam} onChange={e => setPanchangam({ ...panchangam, yogam: e.target.value })} />
                  </div>
                  <div className="editor-card glass-card">
                    <label>Today's Karanam</label>
                    <input type="text" value={panchangam.karanam} onChange={e => setPanchangam({ ...panchangam, karanam: e.target.value })} />
                  </div>
                  <div className="editor-card glass-card">
                    <label>Sunrise Time</label>
                    <input type="text" value={panchangam.sunrise} onChange={e => setPanchangam({ ...panchangam, sunrise: e.target.value })} />
                  </div>
                  <div className="editor-card glass-card">
                    <label>Sunset Time</label>
                    <input type="text" value={panchangam.sunset} onChange={e => setPanchangam({ ...panchangam, sunset: e.target.value })} />
                  </div>
                  <div className="editor-card glass-card">
                    <label>Rahu Kaalam</label>
                    <input type="text" value={panchangam.rahu} onChange={e => setPanchangam({ ...panchangam, rahu: e.target.value })} />
                  </div>
                  <div className="editor-card glass-card">
                    <label>Gulika Kaalam</label>
                    <input type="text" value={panchangam.gulika} onChange={e => setPanchangam({ ...panchangam, gulika: e.target.value })} />
                  </div>
                </div>

                <div className="admin-tabs" style={{ margin: '3rem 0 2rem' }}>
                  <h3 style={{ borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: '0.5rem' }}>Upcoming Festivals (Vishesham)</h3>
                </div>

                <div className="editor-grid">
                  {adminFestivals.map((fest: any, index: number) => (
                    <div key={fest.id} className="editor-card glass-card">
                      <div className="form-group">
                        <label>Festival Name</label>
                        <input type="text" value={fest.name} onChange={e => {
                          const newFests = [...adminFestivals];
                          newFests[index].name = e.target.value;
                          setAdminFestivals(newFests);
                        }} />
                      </div>
                      <div className="form-group">
                        <label>Date (YYYY-MM-DD)</label>
                        <input type="text" value={fest.date} onChange={e => {
                          const newFests = [...adminFestivals];
                          newFests[index].date = e.target.value;
                          setAdminFestivals(newFests);
                        }} />
                      </div>
                      <button className="delete" style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }} onClick={() => setAdminFestivals(adminFestivals.filter((f: any) => f.id !== fest.id))}>Remove Festival</button>
                    </div>
                  ))}
                  <div className="editor-card glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button className="btn-secondary" onClick={() => setAdminFestivals([...adminFestivals, { id: Date.now(), name: 'New Festival', date: new Date().toISOString().split('T')[0] }])}>
                      <Plus size={24} /> Add Festival
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Darshan Section */}
            {activeSection === 'darshan' && (
              <motion.div key="darshan" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="section-header-admin">
                  <h2>Darshan Management</h2>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-secondary" onClick={() => saveToCMS('darshanTypes', darshanTypes)}>
                      <Save size={18} /> Save Timings
                    </button>
                    <button className="btn-primary" onClick={() => saveToCMS('darshanInfo', darshanInfo)}>
                      <Save size={18} /> Save Guidelines
                    </button>
                  </div>
                </div>
                {saveStatus && (
                  <div className="save-notification">
                    <CheckCircle2 size={18} /> {saveStatus}
                  </div>
                )}

                <div className="admin-tabs" style={{ marginBottom: '2rem' }}>
                  <h3 style={{ borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: '0.5rem' }}>General Guidelines</h3>
                </div>
                <div className="editor-card glass-card">
                  <label>Darshan Guidelines & Important Notes</label>
                  <textarea
                    value={darshanInfo}
                    onChange={(e) => setDarshanInfo(e.target.value)}
                    rows={4}
                    style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px' }}
                  />
                </div>

                <div className="admin-tabs" style={{ margin: '3rem 0 2rem' }}>
                  <h3 style={{ borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: '0.5rem' }}>Darshan Timings</h3>
                </div>

                <div className="editor-grid">
                  {darshanTypes.map((type: any, index: number) => (
                    <div key={type.id} className="editor-card glass-card">
                      <div className="form-group">
                        <label>Event / Seva Type</label>
                        <input type="text" value={type.name} onChange={e => {
                          const newTypes = [...darshanTypes];
                          newTypes[index].name = e.target.value;
                          setDarshanTypes(newTypes);
                        }} />
                      </div>
                      <div className="form-group">
                        <label>Timings</label>
                        <input type="text" value={type.timings} onChange={e => {
                          const newTypes = [...darshanTypes];
                          newTypes[index].timings = e.target.value;
                          setDarshanTypes(newTypes);
                        }} />
                      </div>
                      <div className="form-group">
                        <label>Entry Details</label>
                        <input type="text" value={type.entryDetails} onChange={e => {
                          const newTypes = [...darshanTypes];
                          newTypes[index].entryDetails = e.target.value;
                          setDarshanTypes(newTypes);
                        }} />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea value={type.description} onChange={e => {
                          const newTypes = [...darshanTypes];
                          newTypes[index].description = e.target.value;
                          setDarshanTypes(newTypes);
                        }} rows={2} style={{ width: '100%', background: 'rgba(0,0,0,0.1)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '0.5rem' }} />
                      </div>
                      <div className="form-group">
                        <label>Live Updates</label>
                        <input type="text" value={type.liveUpdates} onChange={e => {
                          const newTypes = [...darshanTypes];
                          newTypes[index].liveUpdates = e.target.value;
                          setDarshanTypes(newTypes);
                        }} />
                      </div>
                      <div className="form-group">
                        <label>Peak Rush Days</label>
                        <input type="text" value={type.peakRushDays} onChange={e => {
                          const newTypes = [...darshanTypes];
                          newTypes[index].peakRushDays = e.target.value;
                          setDarshanTypes(newTypes);
                        }} />
                      </div>
                      <button className="delete" style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }} onClick={() => setDarshanTypes(darshanTypes.filter((t: any) => t.id !== type.id))}>Remove Type</button>
                    </div>
                  ))}
                  <div className="editor-card glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button className="btn-secondary" onClick={() => setDarshanTypes([...darshanTypes, { id: Date.now(), name: 'New Darshan', timings: '00:00 AM - 00:00 PM', status: 'Open' }])}>
                      <Plus size={24} /> Add Darshan Type
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Gallery Section */}
            {activeSection === 'gallery' && (
              <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="section-header-admin">
                  <h2>Media Gallery</h2>
                  <button className="btn-primary" onClick={() => saveToCMS('galleryImages', galleryImages)}>
                    <Save size={18} /> Save Changes
                  </button>
                </div>
                {saveStatus && (
                  <div className="save-notification">
                    <CheckCircle2 size={18} /> {saveStatus}
                  </div>
                )}
                <div className="editor-grid">
                  {galleryImages.map((img: any, index: number) => (
                    <div key={img.id} className="editor-card glass-card">
                      <img
                        src={img.url}
                        alt={img.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=800';
                        }}
                        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}
                      />
                      <div className="form-group">
                        <label>Image Title</label>
                        <input type="text" value={img.title} onChange={e => {
                          const newImgs = [...galleryImages];
                          newImgs[index].title = e.target.value;
                          setGalleryImages(newImgs);
                        }} />
                      </div>
                      <div className="form-group">
                        <label>Image Path or URL</label>
                        <input type="text" value={img.url} placeholder="e.g. /assets/image.jpg or https://..." onChange={e => {
                          const newImgs = [...galleryImages];
                          newImgs[index].url = e.target.value;
                          setGalleryImages(newImgs);
                        }} />
                      </div>
                      <button className="delete" style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }} onClick={() => setGalleryImages(galleryImages.filter((i: any) => i.id !== img.id))}>Remove Image</button>
                    </div>
                  ))}
                  <div className="editor-card glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button className="btn-secondary" onClick={() => setGalleryImages([...galleryImages, { id: Date.now(), url: 'https://images.unsplash.com/photo-1599933568800-4b2e8d356611?auto=format&fit=crop&w=800', title: 'New Image' }])}>
                      <Plus size={24} /> Add Image
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Store Products Section */}
            {activeSection === 'store' && (
              <motion.div key="store" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="section-header-admin">
                  <h2>Store Products Management</h2>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-secondary" onClick={() => saveToCMS('storeProducts', storeProducts)}>
                      <Save size={18} /> Save Products
                    </button>
                    <button className="btn-primary" onClick={() => setStoreProducts([{
                      id: Date.now(),
                      name: 'New Product',
                      price: 0,
                      category: 'prasadam',
                      emoji: '🎁',
                      gradient: 'linear-gradient(135deg,#FF9933,#FFB366)',
                      shortDesc: 'Short description',
                      description: 'Full description',
                      inStock: true,
                      rating: 5.0,
                      reviews: 0
                    }, ...storeProducts])}>
                      <Plus size={18} /> Add Product
                    </button>
                  </div>
                </div>
                {saveStatus && (
                  <div className="save-notification">
                    <CheckCircle2 size={18} /> {saveStatus}
                  </div>
                )}
                <div className="editor-grid">
                  {storeProducts.map((product: any, index: number) => (
                    <div key={product.id} className="editor-card glass-card">
                      <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" value={product.name} onChange={e => {
                          const newProducts = [...storeProducts];
                          newProducts[index].name = e.target.value;
                          setStoreProducts(newProducts);
                        }} />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Price (₹)</label>
                          <input type="number" value={product.price} onChange={e => {
                            const newProducts = [...storeProducts];
                            newProducts[index].price = parseInt(e.target.value) || 0;
                            setStoreProducts(newProducts);
                          }} />
                        </div>
                        <div className="form-group">
                          <label>Category</label>
                          <select
                            value={product.category}
                            onChange={e => {
                              const newProducts = [...storeProducts];
                              newProducts[index].category = e.target.value;
                              setStoreProducts(newProducts);
                            }}
                            style={{ width: '100%', padding: '1rem', background: 'white', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text)' }}
                          >
                            <option value="prasadam">Prasadam</option>
                            <option value="pooja">Pooja Items</option>
                            <option value="books">Spiritual Books</option>
                            <option value="idols">Idols & Photos</option>
                            <option value="donation">Donation Kits</option>
                            <option value="special">Special Seva</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Emoji Icon</label>
                          <input type="text" value={product.emoji} onChange={e => {
                            const newProducts = [...storeProducts];
                            newProducts[index].emoji = e.target.value;
                            setStoreProducts(newProducts);
                          }} />
                        </div>
                        <div className="form-group">
                          <label>In Stock</label>
                          <select
                            value={product.inStock ? 'true' : 'false'}
                            onChange={e => {
                              const newProducts = [...storeProducts];
                              newProducts[index].inStock = e.target.value === 'true';
                              setStoreProducts(newProducts);
                            }}
                            style={{ width: '100%', padding: '1rem', background: 'white', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text)' }}
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Short Description</label>
                        <input type="text" value={product.shortDesc} onChange={e => {
                          const newProducts = [...storeProducts];
                          newProducts[index].shortDesc = e.target.value;
                          setStoreProducts(newProducts);
                        }} />
                      </div>
                      <button className="delete" style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', marginTop: '1rem' }} onClick={() => setStoreProducts(storeProducts.filter((p: any) => p.id !== product.id))}>Remove Product</button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

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
          overflow-y: auto; /* Enable scrolling for many tabs */
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
          position: fixed;
          top: 1.5rem;
          left: 1.5rem;
          z-index: 10001;
          background: var(--secondary);
          color: white;
          padding: 0.8rem;
          border-radius: 12px;
          border: 1px solid var(--accent);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
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
            padding-left: 5rem;
          }
          .header-title {
            margin-left: 1rem;
          }
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .stats-row { grid-template-columns: 1fr; gap: 1rem; text-align: center; }
          .dashboard-grid { 
            grid-template-columns: 1fr !important; 
            gap: 2rem;
            width: 100%;
          }
          .grid-item {
            width: 100%;
            padding: 1.5rem !important;
          }
          .header-search { display: none !important; }
          .header-title h2 { 
            font-size: 1rem !important; 
          }
          .grid-item h3, .admin-tabs h3 { padding-left: 0.5rem; }
          .header-title {
            margin-left: 3.5rem;
          }
          .admin-header { height: auto; padding: 1.5rem 0.5rem 1.5rem 5rem; flex-direction: row; justify-content: space-between; align-items: center; gap: 0.5rem; }
          .header-actions { width: auto; justify-content: flex-end; flex-direction: row; gap: 0.2rem; }
          .admin-profile { flex-direction: row; align-items: center; text-align: right; gap: 0.5rem; }
          .admin-content { padding: 1.5rem; display: flex; flex-direction: column; align-items: center; }
          .controls-grid { grid-template-columns: 1fr; text-align: center; }
          .editor-grid { grid-template-columns: 1fr; text-align: center; }
          .form-row { grid-template-columns: 1fr; text-align: center; }
          .details-grid { grid-template-columns: 1fr; text-align: center; }
          .user-table th, .user-table td { padding: 1rem; text-align: center; }
          .section-header-admin { flex-direction: column; gap: 1.5rem; align-items: center; text-align: center; }
          .user-table-container { width: 100%; max-width: 100vw; }
        }

        @media (max-width: 480px) {
          .admin-content { padding: 1.5rem 0.5rem; width: 100%; display: flex; flex-direction: column; align-items: center; }
          .stat-card-admin { padding: 1.5rem; gap: 1rem; flex-direction: column; align-items: center; text-align: center; }
          .grid-item { 
            padding: 1.2rem !important; 
            display: flex; 
            flex-direction: column; 
            align-items: flex-start; 
            text-align: left; 
            width: 94% !important;
            margin: 0 auto 1.5rem auto;
          }
          .control-card { padding: 1.2rem; flex-direction: column; align-items: stretch; text-align: left; gap: 1rem; }
          .sidebar-toggle { top: 1.2rem; left: 1rem; padding: 0.4rem; border-radius: 10px; }
          .header-title h2 { 
            font-size: 0.85rem !important; 
          }
          .grid-item h3, .section-header-admin h2, .admin-tabs h3 { padding-left: 0.8rem; }
          .admin-header { padding: 1.5rem 0rem 1.5rem 4.5rem; flex-direction: row; justify-content: space-between; align-items: center; }
          .user-table-container { overflow-x: auto; width: 100%; }
          .activity-item { 
            width: 94%;
            margin: 0 auto;
            background: var(--bg-offset);
            padding: 1rem;
            border-radius: 12px;
            border: 1px solid var(--glass-border);
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            text-align: left;
            gap: 0.8rem; 
          }
          .control-item { 
            width: 94%;
            margin: 0 auto;
            background: var(--bg-offset);
            padding: 1rem;
            border-radius: 12px;
            border: 1px solid var(--glass-border);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            text-align: left;
            gap: 1rem; 
          }
          .editor-card { align-items: flex-start; text-align: left; width: 94% !important; margin: 0 auto; }
          .editor-card input, .editor-card textarea { width: 100%; text-align: left; }
          .stat-info { align-items: center; }
          /* Smaller responsive buttons */
          .icon-btn-admin { padding: 0.5rem; }
          .admin-avatar { width: 32px; height: 32px; font-size: 0.8rem; }
          .btn-primary, .btn-secondary { padding: 0.6rem 1rem; font-size: 0.85rem; }
          .nav-btn { padding: 0.8rem 1rem; font-size: 0.9rem; }
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
        }

        .header-search {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: var(--bg-offset);
          padding: 0.8rem 1.5rem;
          border-radius: 100px;
          max-width: 400px;
          width: 100%;
          border: 1px solid var(--glass-border);
        }

        .header-search input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .icon-btn-admin {
          background: var(--bg-offset);
          border: none;
          padding: 0.5rem;
          border-radius: 12px;
          color: var(--secondary);
          cursor: pointer;
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

        .profile-dropdown {
          position: absolute;
          top: calc(100% + 15px);
          right: 0;
          width: 200px;
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

        .admin-content {
          padding: 3rem;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .stat-card-admin {
          background: var(--marble);
          padding: 2rem;
          border-radius: 24px;
          display: flex;
          gap: 1.5rem;
          box-shadow: var(--shadow);
          border: 1px solid var(--glass-border);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon.users { background: rgba(255, 153, 51, 0.1); color: var(--primary); }
        .stat-icon.eye { background: rgba(212, 175, 55, 0.1); color: var(--accent); }
        .stat-icon.donations { background: rgba(128, 0, 0, 0.05); color: var(--secondary); }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-info .label {
          font-size: 0.9rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .stat-info .value {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text);
        }

        .stat-info .trend {
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }

        .trend.up { color: #10b981; }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .grid-item {
          padding: 2.5rem;
          background: var(--marble);
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          box-shadow: var(--shadow);
        }

        .grid-item h3 {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          font-family: var(--font-heading);
          color: var(--secondary);
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .activity-item {
          display: flex;
          gap: 1.2rem;
          align-items: flex-start;
        }

        .activity-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .activity-icon.blue { background: rgba(255, 153, 51, 0.1); color: var(--primary); }
        .activity-icon.gold { background: rgba(212, 175, 55, 0.1); color: var(--accent); }
        .activity-icon.green { background: rgba(128, 0, 0, 0.05); color: var(--secondary); }

        .activity-text p {
          font-size: 0.95rem;
          margin: 0;
          color: var(--text);
        }

        .activity-text span {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .quick-controls {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .control-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.2rem;
          background: var(--bg-offset);
          border-radius: 16px;
          border: 1px solid var(--glass-border);
          transition: all 0.3s ease;
        }

        .control-item:hover {
          background: white;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transform: translateY(-2px);
        }

        .control-label {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--secondary);
          font-weight: 600;
          font-size: 0.95rem;
        }

        .control-label svg {
          color: var(--accent);
        }

        .toggle-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          color: #cbd5e1;
          transition: all 0.3s ease;
        }

        .toggle-btn.on { color: var(--primary); }

        .section-header-admin {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }

        .section-header-admin h2 {
          font-family: var(--font-heading);
          color: var(--secondary);
        }

        .editor-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .editor-card {
          padding: 2rem;
          background: var(--marble);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border-radius: 20px;
          border: 1px solid var(--glass-border);
        }

        .editor-card label {
          font-weight: 700;
          color: var(--secondary);
        }

        .editor-card textarea {
          min-height: 120px;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          background: var(--bg-offset);
          font-family: inherit;
          font-size: 1rem;
          resize: vertical;
        }

        .editor-card input {
          padding: 1.2rem;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          background: var(--bg-offset);
          font-size: 1rem;
        }

        .save-notification {
          background: #dcfce7;
          color: #166534;
          padding: 1rem 2rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 600;
        }

        .user-table-container {
          background: var(--marble);
          border-radius: 24px;
          overflow-x: auto;
          border: 1px solid var(--glass-border);
        }

        .user-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .user-table th {
          padding: 1.5rem 2rem;
          background: var(--bg-offset);
          color: var(--secondary);
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .user-table td {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 600;
        }

        .user-initial {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-offset);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          color: var(--secondary);
          border: 1px solid var(--accent);
        }

        .status-badge {
          padding: 0.4rem 1rem;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .status-badge.active { background: #dcfce7; color: #166534; }

        .row-actions {
          display: flex;
          gap: 1rem;
        }

        .row-actions button {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
        }

        .row-actions button:hover { color: var(--primary); }
        .row-actions button.delete:hover { color: #ef4444; }

        .controls-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .control-card {
          padding: 2.5rem;
          background: var(--marble);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          border-radius: 20px;
          border: 1px solid var(--glass-border);
        }

        .control-info h4 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: var(--secondary);
          font-family: var(--font-heading);
        }

        .control-info p {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin: 0;
        }

          /* Admin Notifications */
          .notification-wrapper-admin {
            position: relative;
          }
          .admin-badge {
            position: absolute;
            top: 2px;
            right: 2px;
            width: 10px;
            height: 10px;
            background: #ff4444;
            border-radius: 50%;
            border: 2px solid #2a0000;
          }
          .admin-notification-dropdown {
            position: absolute;
            top: 50px;
            right: 0;
            width: 320px;
            background: #2a0000;
            border: 1px solid var(--accent);
            border-radius: 12px;
            z-index: 1000;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }
          .admin-note-header {
            padding: 1.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
          .admin-note-header h3 { font-size: 1rem; color: white; margin: 0; }
          .admin-note-header button { font-size: 0.75rem; color: var(--sacred-gold); background: none; border: none; cursor: pointer; }
          
          .admin-note-list { max-height: 400px; overflow-y: auto; }
          .admin-note-item {
            padding: 1.2rem;
            display: flex;
            gap: 1rem;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            transition: background 0.3s;
          }
          .admin-note-item:hover { background: rgba(255,255,255,0.05); }
          .admin-note-item.unread { background: rgba(212, 175, 55, 0.05); }
          
          .admin-note-indicator { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
          .admin-note-indicator.warning { background: #ff9933; box-shadow: 0 0 10px #ff9933; }
          .admin-note-indicator.info { background: #3498db; }
          .admin-note-indicator.success { background: #10b981; box-shadow: 0 0 10px #10b981; }
          
          .admin-note-content h4 { font-size: 0.9rem; color: white; margin-bottom: 0.2rem; }
          .admin-note-content p { font-size: 0.8rem; color: rgba(255,255,255,0.6); line-height: 1.4; margin-bottom: 0.4rem; }
          .admin-note-content span { font-size: 0.7rem; color: rgba(255,255,255,0.4); }

          /* Admin Modals */
          .admin-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(8px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }
          .admin-modal-card {
            width: 100%;
            max-width: 500px;
            background: var(--marble);
            border: 1px solid var(--glass-border);
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 30px 60px rgba(0,0,0,0.3);
          }
          .modal-header-admin {
            padding: 2rem;
            background: rgba(0,0,0,0.03);
            border-bottom: 1px solid rgba(0,0,0,0.05);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .modal-header-admin h3 { color: var(--secondary); margin: 0; font-size: 1.4rem; }
          .modal-header-admin button { background: none; border: none; color: var(--secondary); opacity: 0.5; cursor: pointer; }
          
          .modal-body-admin { padding: 2rem; }
          .form-group { margin-bottom: 1.5rem; }
          .form-group label { display: block; color: var(--secondary); font-size: 0.85rem; margin-bottom: 0.6rem; font-weight: 600; }
          .form-group input { 
            width: 100%; 
            padding: 1rem; 
            background: white; 
            border: 1px solid var(--glass-border); 
            border-radius: 12px; 
            color: var(--text); 
            outline: none; 
            transition: border 0.3s;
          }
          .form-group input:focus { border-color: var(--primary); }
          .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
          
          .modal-footer-admin {
            padding: 1.5rem 2rem;
            background: rgba(0,0,0,0.03);
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
          }

          .details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .detail-item label {
            display: block;
            font-size: 0.75rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 0.4rem;
          }
          .detail-item p {
            font-size: 1.1rem;
            color: var(--secondary);
            font-weight: 700;
          }

          .date-picker-wrapper {
            position: relative;
            display: flex;
            align-items: center;
          }
          .picker-icon {
            position: absolute;
            left: 1rem;
            color: var(--secondary);
            pointer-events: none;
          }
          .admin-date-picker {
            padding: 0.8rem 1rem 0.8rem 3rem;
            border-radius: 12px;
            border: 1px solid var(--glass-border);
            background: white;
            color: var(--secondary);
            font-family: inherit;
            font-weight: 600;
            outline: none;
            cursor: pointer;
          }
          .admin-date-picker::-webkit-calendar-picker-indicator {
            filter: invert(0.2);
            cursor: pointer;
          }

          /* Mobile Responsiveness for Notification Dropdown on S and M Mobile */
          @media (max-width: 480px) {
            .admin-notification-dropdown {
              width: 260px !important;
              right: -50px !important;
            }
          }

      `}</style>
    </div>
  );
};

export default Admin;
