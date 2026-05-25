import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  Star,
  Bell,
  Calendar as CalendarIcon,
  RotateCcw,
  Share2,
  X,
  Copy,
  Download,
  MessageCircle,
  Check,
  Loader2,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePanchangam } from '../../hooks/usePanchangam';
import { festivalTranslationTe } from '../../utils/festivalTranslations';
import html2canvas from 'html2canvas';

const Almanac = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language || 'en';
  
  const isTe = true;
  const sectionLocale = 'te-IN';

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  
  const dateInputRef = useRef<HTMLInputElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  // Update date automatically if it's currently showing "today"
  useEffect(() => {
    const isToday = (date: Date) => {
      const today = new Date();
      return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
    };

    if (isToday(selectedDate)) {
      const timer = setInterval(() => {
        const now = new Date();
        if (now.getDate() !== selectedDate.getDate()) {
          setSelectedDate(now);
        }
      }, 60000);
      return () => clearInterval(timer);
    }
  }, [selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setSelectedDate(new Date(e.target.value));
    }
  };

  const changeDate = (offset: number) => {
    const next = new Date(selectedDate);
    next.setDate(selectedDate.getDate() + offset);
    setSelectedDate(next);
  };

  const resetToToday = () => {
    setSelectedDate(new Date());
  };

  // ── Live Panchangam from Swiss Ephemeris hook ──────────────────────────
  const live = usePanchangam(selectedDate);

  // Extract current festival name
  // Extract current festival name
  const getFestivalName = () => {
    let rawName = '';
    if (live.festivals && live.festivals.length > 0) {
      rawName = live.festivals[0];
    } else {
      // Fallback list of festivals for showcase if none returned from library
      const dateKey = selectedDate.toISOString().split('T')[0];
      const match = allFestivals.find(f => f.date === dateKey);
      if (match) rawName = match.name;
    }
    
    if (!rawName) {
      return isTe ? 'నిత్య పూజలు & అర్చన' : t('fest_daily_rituals');
    }

    if (isTe) {
      const lowerName = rawName.toLowerCase().trim();
      
      if (festivalTranslationTe[lowerName]) {
        return festivalTranslationTe[lowerName];
      }

      for (const [key, value] of Object.entries(festivalTranslationTe)) {
        if (lowerName.includes(key)) {
          return value;
        }
      }
    }

    return rawName;
  };

  // Static festival list
  const allFestivals = [
    { date: '2026-04-14', name: t('fest_tamil_new_year') },
    { date: '2026-04-23', name: t('fest_hanuman_jayanti') },
    { date: '2026-04-26', name: t('fest_ekadashi') },
    { date: '2026-05-01', name: t('fest_may_day') },
    { date: '2026-05-05', name: t('fest_narasimha') },
    { date: '2026-05-14', name: t('fest_purnima') },
    { date: '2026-05-19', name: t('fest_narada_jayanti') },
    { date: '2026-05-22', name: t('fest_biodiversity_shani') },
    { date: '2026-06-01', name: t('fest_ganga_dussehra') },
    { date: '2026-06-21', name: t('fest_ekadashi') },
    { date: '2026-07-10', name: t('fest_guru_purnima') },
    { date: '2026-08-16', name: t('fest_aadi_perukku') },
    { date: '2026-08-28', name: t('fest_varalakshmi_vratam') },
    { date: '2026-09-04', name: t('fest_krishna_janmashtami') },
  ];

  const formattedDay = selectedDate.getDate();
  const formattedMonth = selectedDate.toLocaleString(sectionLocale, { month: 'long' }).toUpperCase();
  const formattedYear = selectedDate.getFullYear();
  const formattedDayName = selectedDate.toLocaleString(sectionLocale, { weekday: 'long' });

  // ── Capture the HIDDEN export poster as a high-quality PNG blob ──────────
  const captureCard = async (): Promise<Blob | null> => {
    const target = exportRef.current;
    if (!target) return null;
    setIsCapturing(true);
    try {
      const canvas = await html2canvas(target, {
        scale: 2.5,            // Higher resolution for sharing
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#7B0000',
        logging: false,
        width: target.offsetWidth,
        height: target.offsetHeight,
        windowWidth: target.offsetWidth,
        windowHeight: target.offsetHeight,
      });
      return await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
    } finally {
      setIsCapturing(false);
    }
  };



  // ── System Share (Other Apps) ─────────────────────────────────────────────
  const handleSystemShare = async () => {
    const blob = await captureCard();
    if (!blob) return;
    const dateStr = selectedDate.toISOString().split('T')[0];
    const file = new File([blob], `Govindharaja_Panchangam_${dateStr}.png`, { type: 'image/png' });

    // Official production website URL config
    const productionDomain = 'https://srigovindharajaswamytemple.com';
    const shareUrl = window.location.origin.includes('localhost')
      ? `${productionDomain}/#panchangam`
      : `${window.location.origin}/#panchangam`;

    const shareTextTe = `🛕 *శ్రీ గోవిందరాజస్వామి దేవస్థానం, జగద్గిరిగుట్ట, హైదరాబాద్* 🛕
📅 *తేదీ:* ${live.gregorianDateString}
✨ *పంచాంగ వివరాలు:*
  • *సంవత్సరం:* ${live.samvatsaraNameTe}
  • *మాసం:* ${live.masaNameTe}
  • *తిథి:* ${live.tithiTe}
  • *నక్షత్రం:* ${live.nakshatraTe}
  • *యోగం:* ${live.yogaTe}
  • *కరణం:* ${live.karanaTe}

🔗 *మరింత సమాచారం కోసం:* ${shareUrl}`;

    const shareTextEn = `🛕 *SRI GOVINDHA RAJA SWAMY DEVASTHANAM, Jagadgiri Gutta, Hyderabad* 🛕
📅 *Date:* ${live.gregorianDateString}
✨ *Panchangam Details:*
  • *Samvatsara:* Sri ${live.samvatsaraName} Samvatsara
  • *Masa:* ${live.masa} Masa
  • *Tithi:* ${live.tithi}
  • *Nakshatra:* ${live.nakshatra}
  • *Yoga:* ${live.yoga}
  • *Karana:* ${live.karana}

🔗 *For More Details:* ${shareUrl}`;

    const text = isTe ? shareTextTe : shareTextEn;

    if (navigator.share) {
      try {
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: isTe ? 'శ్రీ గోవిందరాజస్వామి దేవస్థానం పంచాంగం' : 'Sri Govindharaja Swamy Temple Panchangam',
            text: text,
          });
        } else {
          await navigator.share({
            title: isTe ? 'శ్రీ గోవిందరాజస్వామి దేవస్థానం పంచాంగం' : 'Sri Govindharaja Swamy Temple Panchangam',
            text: text,
          });
        }
      } catch (e) {
        console.log('Share cancelled or failed', e);
      }
    } else {
      // Fallback: Copy link and alert
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert(isTe ? 'షేర్ చేయడానికి లింక్ కాపీ చేయబడింది!' : 'Link copied to clipboard for sharing!');
      } catch (err) {
        alert(isTe ? 'లింక్ కాపీ చేయడం విఫలమైంది.' : 'Failed to copy link.');
      }
    }
  };

  // ── Copy the poster image to clipboard ───────────────────────────────────
  const handleCopyLink = async () => {
    const blob = await captureCard();
    if (!blob) return;
    const productionDomain = 'https://srigovindharajaswamytemple.com';
    const shareUrl = window.location.origin.includes('localhost')
      ? `${productionDomain}/#panchangam`
      : `${window.location.origin}/#panchangam`;

    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // ── Download the rendered poster as a PNG file ───────────────────────────
  const handleDownloadImage = async () => {
    const blob = await captureCard();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `Govindharaja_Panchangam_${selectedDate.toISOString().split('T')[0]}.png`;
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <section className="almanac-section section-padding" id="panchangam">
      <div className="container">
        
        {/* Title Header */}
        <div className="details-header text-center" style={{ marginBottom: '2.5rem' }}>
          <span className="modern-badge" style={{ background: 'var(--primary)', color: 'white', display: 'inline-block', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', boxShadow: '0 2px 10px rgba(255, 153, 51, 0.2)' }}>
            {t('almanac_title')}
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #4b0000 0%, #800000 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginTop: '0.5rem',
            letterSpacing: '0.5px'
          }}>
            {t('panchangam_vishesha')}
          </h2>
          <div className="divider" style={{
            width: '120px',
            height: '4px',
            background: 'linear-gradient(to right, var(--secondary), var(--primary), var(--accent), var(--secondary))',
            margin: '1rem auto 0',
            borderRadius: '10px',
            backgroundSize: '200% 100%',
            animation: 'gradient-shift 5s linear infinite'
          }}></div>
        </div>

        {/* Date Selector and Controller bar */}
        <div className="almanac-date-bar glass-card">
          <button className="date-nav-btn" onClick={() => changeDate(-1)} title={t('title_prev_day')}>
            <ChevronLeft size={24} />
          </button>
          
          <div
            className="date-display-badge"
            onClick={() => dateInputRef.current?.showPicker()}
            title={t('title_change_date')}
          >
            <CalendarIcon className="calendar-icon" size={20} />
            <span className="date-text">
              {isTe ? live.gregorianDateString : `${formattedDay} ${selectedDate.toLocaleString(sectionLocale, { month: 'long' })} ${formattedYear}`}
            </span>
            <span className="day-text">
              ({isTe ? selectedDate.toLocaleString('te-IN', { weekday: 'long' }) : formattedDayName})
            </span>
            <input
              type="date"
              ref={dateInputRef}
              className="hidden-date-input"
              onChange={handleDateChange}
              value={selectedDate.toISOString().split('T')[0]}
            />
          </div>

          <button className="date-nav-btn" onClick={() => changeDate(1)} title={t('title_next_day')}>
            <ChevronRight size={24} />
          </button>

          <div className="date-actions-quick">
            {new Date().toDateString() !== selectedDate.toDateString() && (
              <button className="reset-today-btn" onClick={resetToToday}>
                <RotateCcw size={16} />
                <span>{t('label_today')}</span>
              </button>
            )}
            <button className="share-trigger-btn" onClick={() => setIsShareOpen(true)}>
              <Share2 size={16} />
              <span>{t('label_share')}</span>
            </button>
          </div>
        </div>

        {live.loading ? (
          <div className="panchang-loading-state">
            <Loader2 size={40} className="panchang-spinner" />
            <p>{t('label_calculating')}</p>
          </div>
        ) : live.error ? (
          <div className="panchang-error">{live.error}</div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="almanac-panel-grid"
          >
            
            {/* LEFT PANEL: Traditional Hindu Calendar Details */}
            <div className="almanac-panel left-panel glass-card">
              {/* Regional Vedic Header */}
              <div className="vedic-header-panel">
                <div className="vedic-date-row">
                  <span className="vedic-month-day">
                    {isTe ? live.monthDayVaraHeaderTe : `${selectedDate.toLocaleString('en-IN', { month: 'long' })} - ${formattedDayName}`}
                  </span>
                  <span className="vedic-sanskrit-vara">
                    {isTe ? live.sanskritVaraHeaderTe : live.sanskritVaraHeaderEn}
                  </span>
                </div>
                <div className="vedic-details-strip">
                  <span className="strip-item">{isTe ? live.samvatsaraNameTe : `Sri ${live.samvatsaraName} Samvatsara`}</span>
                  <span className="strip-item">{isTe ? live.masaNameTe : `${live.masa} Masa`}</span>
                  <span className="strip-item">{isTe ? live.rituNameTe : `${live.rituName} Rutu`}</span>
                  <span className="strip-item">{isTe ? live.ayanaNameTe : `${live.ayanaName} Ayanam`}</span>
                </div>
              </div>

              {/* Core Limbs (Tithi, Nakshatram, Yoga, Karanam) */}
              <div className="core-limbs-list">
                <div className="limb-item">
                  <span className="limb-icon"><Moon size={20} /></span>
                  <div className="limb-details">
                    <span className="limb-label">{isTe ? 'తిథి' : t('label_tithi')}</span>
                    <span className="limb-value">{isTe ? live.tithiTe : live.tithi}</span>
                  </div>
                </div>

                <div className="limb-item">
                  <span className="limb-icon"><Star size={20} /></span>
                  <div className="limb-details">
                    <span className="limb-label">{isTe ? 'నక్షత్రం' : t('label_nakshatram')}</span>
                    <span className="limb-value">{isTe ? live.nakshatraTe : live.nakshatra}</span>
                  </div>
                </div>

                <div className="limb-item">
                  <span className="limb-icon"><Sun size={20} /></span>
                  <div className="limb-details">
                    <span className="limb-label">{isTe ? 'యోగం' : t('label_yogam')}</span>
                    <span className="limb-value">{isTe ? live.yogaTe : live.yoga}</span>
                  </div>
                </div>

                <div className="limb-item">
                  <span className="limb-icon"><Bell size={20} /></span>
                  <div className="limb-details">
                    <span className="limb-label">{isTe ? 'కరణం' : t('label_karanam')}</span>
                    <span className="limb-value">{isTe ? live.karanaTe : live.karana}</span>
                  </div>
                </div>
              </div>

              {/* Sun & Moon Timings */}
              <div className="sun-moon-grid">
                <div className="timing-box">
                  <Sun size={18} className="text-amber-400" />
                  <span className="lbl">{isTe ? 'సూర్యోదయం' : t('label_sunrise')}</span>
                  <span className="val">{isTe ? live.sunriseTe : live.sunrise}</span>
                </div>
                <div className="timing-box">
                  <Sun size={18} className="text-orange-500" />
                  <span className="lbl">{isTe ? 'సూర్యాస్తమయం' : t('label_sunset')}</span>
                  <span className="val">{isTe ? live.sunsetTe : live.sunset}</span>
                </div>
                <div className="timing-box">
                  <Moon size={18} className="text-blue-300" />
                  <span className="lbl">{isTe ? 'చంద్రోదయం' : t('label_moonrise')}</span>
                  <span className="val">{isTe ? live.moonriseTe : live.moonrise}</span>
                </div>
                <div className="timing-box">
                  <Moon size={18} className="text-indigo-400" />
                  <span className="lbl">{isTe ? 'చంద్రాస్తమయం' : t('label_moonset')}</span>
                  <span className="val">{isTe ? live.moonsetTe : live.moonset}</span>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL: Auspicious timings & Festivals */}
            <div className="almanac-panel right-panel glass-card">
              
              {/* Festival Box */}
              <div className="festival-spotlight-box">
                <div className="deity-frame">
                  <img src="/deity-avatar.png" alt="Deity" className="deity-thumbnail" onError={(e) => {
                    // Fallback to placeholder emoji/icon if avatar not found
                    (e.target as HTMLElement).style.display = 'none';
                  }} />
                  <Bell size={24} className="bell-glow" />
                </div>
                <div className="fest-content-box">
                  <span className="fest-label-badge">{isTe ? 'నేటి పండుగ / విశేషం' : t('label_today_festival')}</span>
                  <h3 className="fest-title-text">{getFestivalName()}</h3>
                </div>
              </div>

              {/* Auspicious & Ritual Timings List */}
              <div className="auspicious-timings-section">
                
                <div className="timing-row-item">
                  <span className="title-col text-green-400">{isTe ? 'శుభ సమయాలు' : t('label_auspicious')}</span>
                  <span className="val-col">{isTe ? live.auspiciousTimingsTe : live.auspiciousTimings}</span>
                </div>

                <div className="timing-row-item">
                  <span className="title-col text-amber-300">{isTe ? 'శ్రద్ధ తిథి' : t('label_shraddha_tithi')}</span>
                  <span className="val-col">{isTe ? live.shraddhaTithiTe : live.shraddhaTithi}</span>
                </div>

                <div className="timing-row-item inauspicious-item">
                  <span className="title-col text-red-400">{isTe ? 'రాహుకాలం' : t('label_rahu_kalam')}</span>
                  <span className="val-col font-mono">{isTe ? live.rahuKalamTe : live.rahuKalam}</span>
                </div>

                 <div className="timing-row-item inauspicious-item">
                  <span className="title-col text-red-400">{isTe ? 'యమగండం' : t('label_yamagandam')}</span>
                  <span className="val-col font-mono">{isTe ? live.yamagandaKalamTe : live.yamagandaKalam}</span>
                </div>

                <div className="timing-row-item inauspicious-item">
                  <span className="title-col text-red-400">{isTe ? 'దుర్ముహూర్తం' : t('label_durmuhurtham')}</span>
                  <span className="val-col font-mono">{isTe ? live.durmuhurthamTe : live.durmuhurtham}</span>
                </div>

                <div className="timing-row-item">
                  <span className="title-col text-purple-300">{isTe ? 'వర్జ్యం' : t('label_varjyam')}</span>
                  <span className="val-col font-mono">{isTe ? live.varjyamTe : live.varjyam}</span>
                </div>

                <div className="timing-row-item">
                  <span className="title-col text-teal-300">{isTe ? 'అమృత ఘడియలు' : t('label_amrita_gadiyalu')}</span>
                  <span className="val-col font-mono">{isTe ? live.amritaGadiyaluTe : live.amritaGadiyalu}</span>
                </div>

              </div>

            </div>

          </motion.div>
        )}
      </div>

      {/* Share Modal Popup */}
      <AnimatePresence>
        {isShareOpen && (
          <div className="panchangam-share-overlay" onClick={() => setIsShareOpen(false)}>
            <motion.div
              className="panchangam-share-modal-card glass-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{isTe ? 'నేటి పంచాంగం షేర్ చేయండి' : 'Share Daily Panchangam'}</h3>
                <button className="close-modal-btn" onClick={() => setIsShareOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              {/* Visual Poster Preview representing the downloaded format */}
              <div className="share-poster-preview">
                <div className="poster-inner" ref={posterRef}>
                  
                  {/* Decorative corners */}
                  <div className="poster-corner top-left"></div>
                  <div className="poster-corner top-right"></div>
                  <div className="poster-corner bottom-left"></div>
                  <div className="poster-corner bottom-right"></div>

                  <div className="poster-logo-container">
                    <img
                      src="/panchangam-banner.png"
                      alt="Sri Govindharaja Swamy Temple - Today's Panchangam"
                      className="poster-banner-img"
                    />
                  </div>

                  <div className="poster-divider"></div>

                  {/* Poster Header */}
                  <div className="poster-date">
                    <span className="p-date-gregorian" style={{ fontSize: '14px', fontWeight: '800', color: '#FFD700', display: 'block', marginBottom: '5px' }}>
                      {isTe ? `తేదీ: ${live.gregorianDateString}` : `Date: ${live.gregorianDateString}`}
                    </span>
                    <span className="p-date-main">
                      {isTe ? live.monthDayVaraHeaderTe : `${formattedDay} ${selectedDate.toLocaleString(sectionLocale, { month: 'long' })} ${formattedYear}`}
                    </span>
                    <span className="p-date-sanskrit">
                      {isTe ? live.sanskritVaraHeaderTe : live.sanskritVaraHeaderEn}
                    </span>
                    <span className="p-date-sub">
                      {isTe ? live.samvatsaraNameTe : `Sri ${live.samvatsaraName} Samvatsara`} | {isTe ? live.masaNameTe : `${live.masa} Masa`}
                    </span>
                  </div>

                  {/* Poster Data Rows (Matching the exact list of values) */}
                  <div className="poster-data-grid">
                    <div className="poster-data-row">
                      <span className="p-label">{isTe ? 'తిథి' : t('label_tithi')}</span>
                      <span className="p-value">{isTe ? live.tithiTe : live.tithi}</span>
                    </div>
                    <div className="poster-data-row">
                      <span className="p-label">{isTe ? 'నక్షత్రం' : t('label_nakshatram')}</span>
                      <span className="p-value">{isTe ? live.nakshatraTe : live.nakshatra}</span>
                    </div>
                    <div className="poster-data-row">
                      <span className="p-label">{isTe ? 'యోగం' : t('label_yogam')}</span>
                      <span className="p-value">{isTe ? live.yogaTe : live.yoga}</span>
                    </div>
                    <div className="poster-data-row">
                      <span className="p-label">{isTe ? 'కరణం' : t('label_karanam')}</span>
                      <span className="p-value">{isTe ? live.karanaTe : live.karana}</span>
                    </div>

                    <div className="poster-timings-divider">⚡ {isTe ? 'శుభ & అశుభ సమయాలు' : t('label_poster_divider')}</div>

                    <div className="poster-data-row">
                      <span className="p-label">{isTe ? 'శుభ సమయాలు' : t('label_auspicious')}</span>
                      <span className="p-value timing-val-good">{isTe ? live.auspiciousTimingsTe : live.auspiciousTimings}</span>
                    </div>
                    <div className="poster-data-row">
                      <span className="p-label">{isTe ? 'రాహుకాలం' : t('label_rahu_kalam')}</span>
                      <span className="p-value timing-val-bad">{isTe ? live.rahuKalamTe : live.rahuKalam}</span>
                    </div>
                    <div className="poster-data-row">
                      <span className="p-label">{isTe ? 'దుర్ముహూర్తం' : t('label_durmuhurtham')}</span>
                      <span className="p-value timing-val-bad">{isTe ? live.durmuhurthamTe : live.durmuhurtham}</span>
                    </div>
                    <div className="poster-data-row">
                      <span className="p-label">{isTe ? 'సూర్యోదయం / సూర్యాస్తమయం' : `${t('label_sunrise')} / ${t('label_sunset')}`}</span>
                      <span className="p-value">
                        {isTe ? `${live.sunriseTe} / ${live.sunsetTe}` : `${live.sunrise} / ${live.sunset}`}
                      </span>
                    </div>
                  </div>

                  <div className="poster-footer">
                    🛕 {isTe ? 'శ్రీ గోవిందరాజస్వామి దేవస్థానం, జగద్గిరిగుట్ట, హైదరాబాద్' : 'SRI GOVINDHA RAJA SWAMY DEVASTHANAM, Jagadgiri Gutta, Hyderabad'}
                  </div>
                </div>
              </div>

              {/* Action Sheet buttons */}
              <div className="share-options-container">
                <button
                  className="share-opt-btn system"
                  onClick={handleSystemShare}
                  disabled={isCapturing}
                  title={isTe ? 'పంచాంగం కార్డును షేర్ చేయండి' : 'Share Panchangam card'}
                >
                  {isCapturing
                    ? <Loader2 size={18} className="btn-spinner" />
                    : <Share2 size={18} />}
                  <span>{isTe ? 'షేర్ చేయండి' : 'Share'}</span>
                </button>
                <button
                  className="share-opt-btn copy"
                  onClick={handleCopyLink}
                  disabled={isCapturing}
                  title={isTe ? 'లింక్ లేదా చిత్రాన్ని కాపీ చేయండి' : 'Copy link or image'}
                >
                  {isCapturing
                    ? <Loader2 size={18} className="btn-spinner" />
                    : copied ? <Check size={18} /> : <Copy size={18} />}
                  <span>{copied ? (isTe ? 'కాపీ చేయబడింది' : 'Copied') : (isTe ? 'లింక్ కాపీ' : 'Copy Link')}</span>
                </button>
                <button
                  className="share-opt-btn download"
                  onClick={handleDownloadImage}
                  disabled={isCapturing}
                  title={isTe ? 'పంచాంగం కార్డు డౌన్‌లోడ్ చేయండి' : 'Download Panchangam card'}
                >
                  {isCapturing
                    ? <Loader2 size={18} className="btn-spinner" />
                    : <Download size={18} />}
                  <span>{isTe ? 'డౌన్‌లోడ్' : 'Download'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Hidden export poster — captured by html2canvas ─────────────── */}
      {/* Rendered off-screen with solid inline styles for pixel-perfect high resolution export */}
      <div
        ref={exportRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: '-9999px',
          width: '560px',
          zIndex: -1,
          pointerEvents: 'none',
          fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Georgia', serif",
          background: 'linear-gradient(160deg, #600000 0%, #300000 70%, #1a0000 100%)',
          border: '4px solid #D4AF37',
          borderRadius: '16px',
          padding: '24px 24px 20px',
          boxSizing: 'border-box',
          color: '#FFFFFF',
          boxShadow: '0 20px 40px rgba(0,0,0,0.9)',
        }}
      >
        {/* Banner image replaces text header */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <img
            src="/panchangam-banner.png"
            alt="Sri Govindharaja Swamy Temple - Today's Panchangam"
            crossOrigin="anonymous"
            style={{ width: '100%', maxWidth: '512px', height: 'auto', objectFit: 'contain', borderRadius: '8px' }}
          />
        </div>

        {/* Date Headers */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFAA55', marginBottom: '5px', letterSpacing: '0.5px' }}>
            {isTe ? `తేదీ: ${live.gregorianDateString}` : `Date: ${live.gregorianDateString}`}
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFD700', letterSpacing: '0.5px' }}>
            {isTe ? live.monthDayVaraHeaderTe : `${formattedDay} ${selectedDate.toLocaleString('en-IN', { month: 'long' })} ${formattedYear}`}
          </div>
          <div style={{ fontSize: '13px', color: '#E2C275', marginTop: '4px', fontStyle: 'italic', letterSpacing: '1px' }}>
            {isTe ? live.sanskritVaraHeaderTe : live.sanskritVaraHeaderEn}
          </div>
          <div style={{ fontSize: '11px', color: '#FFFFFF', opacity: 0.85, marginTop: '5px', letterSpacing: '0.3px', background: 'rgba(255,255,255,0.06)', display: 'inline-block', padding: '3px 10px', borderRadius: '20px' }}>
            {isTe ? live.samvatsaraNameTe : `Sri ${live.samvatsaraName} Samvatsara`} | {isTe ? live.masaNameTe : `${live.masa} Masa`}
          </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(212, 175, 55, 0.4)', marginBottom: '14px' }} />

        {/* Main Content: Double Column Layout like the provided reference image! */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '14px' }}>
          
          {/* Left Column: Core Limbs */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.15)', padding: '10px 12px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#E2C275', textTransform: 'uppercase', marginBottom: '2px' }}>
                {isTe ? 'తిథి' : t('label_tithi')}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>
                {live.tithiTe}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.15)', padding: '10px 12px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#E2C275', textTransform: 'uppercase', marginBottom: '2px' }}>
                {isTe ? 'నక్షత్రం' : t('label_nakshatram')}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>
                {live.nakshatraTe}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.15)', padding: '10px 12px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#E2C275', textTransform: 'uppercase', marginBottom: '2px' }}>
                {isTe ? 'యోగం' : t('label_yogam')}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>
                {live.yogaTe}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.15)', padding: '10px 12px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#E2C275', textTransform: 'uppercase', marginBottom: '2px' }}>
                {isTe ? 'కరణం' : t('label_karanam')}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>
                {live.karanaTe}
              </div>
            </div>
          </div>

          {/* Right Column: Timings & Festival */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            {/* Festival Spotlight */}
            <div style={{ background: 'rgba(255,153,51,0.08)', borderRadius: '8px', border: '1px solid rgba(255,153,51,0.3)', padding: '10px 12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ fontSize: '20px' }}>🔔</div>
              <div>
                <div style={{ fontSize: '8px', fontWeight: 700, color: '#FFAA88', textTransform: 'uppercase' }}>
                  {isTe ? 'నేటి పండుగ / విశేషం' : t('label_today_festival')}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#FFD700', marginTop: '2px' }}>
                  {getFestivalName()}
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.15)', padding: '8px 12px' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, color: '#90FF90', textTransform: 'uppercase', marginBottom: '2px' }}>
                {isTe ? 'శుభ సమయాలు' : t('label_auspicious')}
              </div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#FFFFFF' }}>
                {isTe ? live.auspiciousTimingsTe : live.auspiciousTimings}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.15)', padding: '8px 12px' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, color: '#FFAA88', textTransform: 'uppercase', marginBottom: '2px' }}>
                {isTe ? 'శ్రద్ధ తిథి' : t('label_shraddha_tithi')}
              </div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#FFFFFF' }}>
                {isTe ? live.shraddhaTithiTe : live.shraddhaTithi}
              </div>
            </div>

            <div style={{ background: 'rgba(255,80,50,0.06)', borderRadius: '8px', border: '1px solid rgba(255,80,50,0.2)', padding: '8px 12px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '8px', fontWeight: 700, color: '#FFAAAA', textTransform: 'uppercase' }}>
                  {isTe ? 'రాహుకాలం' : t('label_rahu_kalam')}
                </div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#FFAAAA', marginTop: '2px' }}>
                  {isTe ? live.rahuKalamTe : live.rahuKalam}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '8px', fontWeight: 700, color: '#FFAAAA', textTransform: 'uppercase' }}>
                  {isTe ? 'దుర్ముహూర్తం' : t('label_durmuhurtham')}
                </div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#FFAAAA', marginTop: '2px' }}>
                  {isTe ? live.durmuhurthamTe : live.durmuhurtham}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sunrise/Sunset and Moonrise/Moonset row */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: '8px', color: '#E2C275', textTransform: 'uppercase' }}>{isTe ? 'సూర్యోదయం' : t('label_sunrise')}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#FFD700', marginTop: '2px' }}>{isTe ? live.sunriseTe : live.sunrise}</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: '8px', color: '#E2C275', textTransform: 'uppercase' }}>{isTe ? 'సూర్యాస్తమయం' : t('label_sunset')}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#FFD700', marginTop: '2px' }}>{isTe ? live.sunsetTe : live.sunset}</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: '8px', color: '#E2C275', textTransform: 'uppercase' }}>{isTe ? 'చంద్రోదయం' : t('label_moonrise')}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#FFD700', marginTop: '2px' }}>{isTe ? live.moonriseTe : live.moonrise}</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: '8px', color: '#E2C275', textTransform: 'uppercase' }}>{isTe ? 'చంద్రాస్తమయం' : t('label_moonset')}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#FFD700', marginTop: '2px' }}>{isTe ? live.moonsetTe : live.moonset}</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.4)', paddingTop: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.5px' }}>
            {isTe ? 'శ్రీ గోవిందరాజస్వామి దేవస్థానం, జగద్గిరిగుట్ట, హైదరాబాద్' : 'SRI GOVINDHA RAJA SWAMY DEVASTHANAM, Jagadgiri Gutta, Hyderabad'}
          </div>
          <div style={{ fontSize: '8px', color: '#E2C275', opacity: 0.8, marginTop: '2px' }}>
            {isTe ? 'భక్తి • సమృద్ధి • శాంతి' : t('label_poster_subfooter')}
          </div>
        </div>
      </div>

      <style>{`
        .almanac-section {
          position: relative;
        }

        /* Date selector bar */
        .almanac-date-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          margin-bottom: 2.5rem;
          background: linear-gradient(135deg, rgba(80, 0, 0, 0.85), rgba(40, 0, 0, 0.9));
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: 16px;
        }

        .date-nav-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #D4AF37;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .date-nav-btn:hover {
          background: #D4AF37;
          color: #4A0000;
          transform: scale(1.05);
        }

        .date-display-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 1.5rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .date-display-badge:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: #D4AF37;
        }

        .date-display-badge .calendar-icon {
          color: #D4AF37;
        }

        .date-display-badge .date-text {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: white;
        }

        .date-display-badge .day-text {
          font-size: 0.9rem;
          color: #E2C275;
          font-style: italic;
        }

        .hidden-date-input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
          width: 0;
          height: 0;
        }

        .date-actions-quick {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .reset-today-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: #D4AF37;
          background: rgba(212, 175, 55, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.2);
          padding: 0.45rem 1rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .reset-today-btn:hover {
          background: #D4AF37;
          color: #4A0000;
        }

        .share-trigger-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: white;
          background: var(--primary);
          border: none;
          padding: 0.5rem 1.2rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(230, 57, 70, 0.3);
        }

        .share-trigger-btn:hover {
          background: #f25c66;
          transform: translateY(-1px);
        }

        /* Panel layout: Double Panel */
        .almanac-panel-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: start;
        }

        .almanac-panel {
          padding: 2.5rem;
          background: linear-gradient(135deg, rgba(100, 0, 0, 0.9), rgba(50, 0, 0, 0.95));
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 20px;
          color: white;
        }

        /* Vedic regional header */
        .vedic-header-panel {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 1.5rem;
          margin-bottom: 2rem;
        }

        .vedic-date-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.75rem;
        }

        .vedic-month-day {
          font-family: var(--font-heading);
          font-size: 1.45rem;
          font-weight: 800;
          color: #FFD700;
        }

        .vedic-sanskrit-vara {
          font-size: 1rem;
          color: #E2C275;
          font-style: italic;
          font-weight: 600;
        }

        .vedic-details-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 0.75rem;
        }

        .strip-item {
          font-size: 0.78rem;
          font-weight: 700;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.25);
          color: #FDF1D6;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
        }

        /* Core Limbs List */
        .core-limbs-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .limb-item {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .limb-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .limb-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(212, 175, 55, 0.12);
          border: 1px solid rgba(212, 175, 55, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #D4AF37;
          flex-shrink: 0;
        }

        .limb-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .limb-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #E2C275;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .limb-value {
          font-size: 1.05rem;
          font-weight: 600;
          color: white;
          line-height: 1.4;
        }

        /* Sun & Moon timings grid */
        .sun-moon-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .timing-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .timing-box .lbl {
          font-size: 0.7rem;
          color: #E2C275;
          text-transform: uppercase;
          margin: 0.25rem 0 0.15rem 0;
        }

        .timing-box .val {
          font-size: 1rem;
          font-weight: 700;
          color: white;
        }

        /* Festival spotlight box */
        .festival-spotlight-box {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(212, 175, 55, 0.02));
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 2rem;
        }

        .deity-frame {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(212, 175, 55, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-shrink: 0;
        }

        .deity-thumbnail {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .bell-glow {
          color: #FFD700;
          filter: drop-shadow(0 0 4px rgba(255,215,0,0.6));
        }

        .fest-content-box {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .fest-label-badge {
          font-size: 0.7rem;
          font-weight: 800;
          color: #FFAA88;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .fest-title-text {
          font-size: 1.15rem;
          font-weight: 800;
          color: #FFD700;
          line-height: 1.3;
        }

        /* Auspicious list timings */
        .auspicious-timings-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .timing-row-item {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          gap: 1.5rem;
        }

        .timing-row-item .title-col {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          flex-shrink: 0;
        }

        .timing-row-item .val-col {
          font-size: 0.95rem;
          font-weight: 600;
          text-align: right;
          color: #FFFFFF;
        }

        .inauspicious-item {
          background: rgba(255, 80, 50, 0.03);
          border-color: rgba(255, 80, 50, 0.1);
        }

        /* Share Modal & Poster */
        .panchangam-share-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(6px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .panchangam-share-modal-card {
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          background: linear-gradient(135deg, #4A0000, #2D0000);
          border: 2px solid #D4AF37;
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.8);
          color: white;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          padding-bottom: 0.5rem;
        }

        .modal-header h3 {
          color: #D4AF37;
          font-size: 1.2rem;
          margin: 0;
        }

        .close-modal-btn {
          background: transparent;
          border: none;
          color: #D4AF37;
          cursor: pointer;
        }

        .share-poster-preview {
          background: linear-gradient(to bottom, #500000, #250000);
          border: 3px double #D4AF37;
          border-radius: 12px;
          padding: 1rem;
          position: relative;
          margin-bottom: 1.25rem;
        }

        .poster-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .poster-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid #D4AF37;
          pointer-events: none;
        }

        .poster-corner.top-left { top: 6px; left: 6px; border-right: none; border-bottom: none; }
        .poster-corner.top-right { top: 6px; right: 6px; border-left: none; border-bottom: none; }
        .poster-corner.bottom-left { bottom: 6px; left: 6px; border-right: none; border-top: none; }
        .poster-corner.bottom-right { bottom: 6px; right: 6px; border-left: none; border-top: none; }

        .poster-logo-container {
          width: 100%;
          max-width: 320px;
          margin-bottom: 0.5rem;
        }

        .poster-banner-img {
          width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 6px;
        }

        .poster-divider {
          width: 60%;
          height: 1px;
          background: rgba(212, 175, 55, 0.35);
          margin: 0.5rem 0;
        }

        .poster-date {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.15rem;
          margin-bottom: 0.75rem;
        }

        .p-date-main {
          font-size: 1.15rem;
          font-weight: 800;
          color: #FFD700;
        }

        .p-date-sanskrit {
          font-size: 0.85rem;
          color: #E2C275;
          font-style: italic;
        }

        .p-date-sub {
          font-size: 0.75rem;
          color: #FFFFFF;
          opacity: 0.9;
        }

        .poster-data-grid {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: 8px;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-bottom: 0.5rem;
        }

        .poster-data-row {
          display: flex;
          justify-content: space-between;
          padding: 0.2rem 0.4rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .poster-data-row:last-child {
          border-bottom: none;
        }

        .poster-data-row .p-label {
          font-size: 0.7rem;
          color: #E2C275;
          text-transform: uppercase;
        }

        .poster-data-row .p-value {
          font-size: 0.8rem;
          font-weight: 700;
          color: white;
          text-align: right;
        }

        .poster-timings-divider {
          text-align: center;
          font-size: 0.6rem;
          font-weight: 800;
          color: #FFAA88;
          text-transform: uppercase;
          padding: 0.25rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 0.2rem;
        }

        .timing-val-good {
          color: #90FF90 !important;
        }

        .timing-val-bad {
          color: #FFAAAA !important;
        }

        .poster-footer {
          font-size: 0.65rem;
          color: #E2C275;
          margin-top: 0.25rem;
          text-align: center;
        }

        .share-options-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }

        .share-opt-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.6rem;
          border-radius: 8px;
          border: none;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          color: white;
        }

        .share-opt-btn.system { background: #3498db; }
        .share-opt-btn.copy { background: #34495e; }
        .share-opt-btn.download { background: #e67e22; }

        .share-opt-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .panchang-loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 0;
          color: white;
          gap: 1rem;
        }

        .panchang-spinner {
          animation: spin 1s linear infinite;
          color: #D4AF37;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* Media Queries for responsiveness */
        @media (max-width: 992px) {
          .almanac-panel-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .almanac-date-bar {
            flex-direction: column;
            gap: 1rem;
            padding: 1.25rem;
          }
          
          .date-display-badge {
            width: 100%;
            justify-content: center;
          }

          .date-actions-quick {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .almanac-panel {
            padding: 1.5rem;
          }

          .vedic-month-day {
            font-size: 1.25rem;
          }

          .vedic-sanskrit-vara {
            font-size: 0.85rem;
          }

          .limb-value {
            font-size: 0.95rem;
          }

          .timing-row-item {
            flex-direction: column;
            gap: 0.25rem;
            align-items: flex-start;
          }

          .timing-row-item .val-col {
            text-align: left;
            font-size: 0.85rem;
          }

          .share-options-container {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.35rem;
          }

          .share-opt-btn {
            padding: 0.5rem 0.25rem;
            font-size: 0.72rem;
            gap: 0.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Almanac;
