import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  History,
  Target,
  Map as MapIcon,
  Layout,
  Heart,
  Info,
  Phone,
  Mail,
  ChevronRight,
  Sparkles,
  Building2,
  Quote,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  Landmark,
  ScrollText,
  Construction,
  HandHeart,
  Award
} from 'lucide-react';

const About = () => {
  const [activeSection, setActiveSection] = useState('history');

  useEffect(() => {
    const sections = ['history', 'blueprint', 'mission', 'donation'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-150px 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id); // Immediately set active for better UX
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const constructionList = [
    { name: "Main Temple Complex", status: "In Progress" },
    { name: "Goshala (Cow Sanctuary)", status: "Expanding" },
    { name: "Yagashala", status: "Planned" },
    { name: "Kalyan Mandapam", status: "In Progress" },
    { name: "Navagraha Mandapam", status: "Planned" },
    { name: "Ranganayaka Mandapam", status: "Planned" },
    { name: "Goda Mandapam", status: "Planned" },
    { name: "Veda Patashala", status: "Upcoming" }
  ];

  return (
    <div className="temple-portal">
      {/* Official Header Section - Matching Bhadradri Style */}
      <header className="portal-header">
        <div className="header-top">
          <div className="container portal-header-inner">
            <div className="portal-brand">
              <img src="/logo.png" alt="Devasthanam" className="portal-logo" style={{ height: '80px' }} />
              <div>
                <h1>SRI GOVINDHA RAJA SWAMY VARI DEVASTHANAM</h1>
                <p>Jagadgiri Gutta, Hyderabad - 757796 | Established: 2008</p>
              </div>
            </div>
            <div className="portal-status-badge">
              <ShieldCheck size={18} />
              <span>Official Foundation Portal</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Blueprint Layout */}
      <main className="container portal-grid">
        {/* Left Sidebar Menu - Fixed Navigation */}
        <aside className="portal-nav-aside">
          <div className="nav-card glass-card">
            <h3>Devasthanam Menu</h3>
            <div className="nav-list">
              <button className={activeSection === 'history' ? 'active' : ''} onClick={() => scrollToSection('history')}>
                <History size={18} /> About Devasthanam
              </button>
              <button className={activeSection === 'blueprint' ? 'active' : ''} onClick={() => scrollToSection('blueprint')}>
                <ScrollText size={18} /> Master Blueprint
              </button>
              <button className={activeSection === 'mission' ? 'active' : ''} onClick={() => scrollToSection('mission')}>
                <Construction size={18} /> Mission Govindham
              </button>
              <button className={activeSection === 'donation' ? 'active' : ''} onClick={() => scrollToSection('donation')}>
                <HandHeart size={18} /> Divine Offerings
              </button>
            </div>
          </div>

          <div className="portal-sidebar-info glass-card">
            <h4>Contact Details</h4>
            <div className="side-contact">
              <Phone size={14} />
              <span>8143477307 / 8686658856</span>
            </div>
            <div className="side-contact">
              <Mail size={14} />
              <span>info@govindharajaswamydevasthanam.com</span>
            </div>
          </div>
        </aside>

        {/* Scrollable Content Area */}
        <div className="portal-main-view glass-card">
          {/* History Section */}
          <motion.section id="history" className="view-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="section-header">
              <h2>Sri Govindharaja Swamy Devasthanam: An Epitome of Divine Grace and Benevolence</h2>
              <div className="title-underline"></div>
            </div>

            <div className="sacred-content">
              <p className="lead-para">
                Nestled amidst the tranquil environs of Jagadgiri Gutta, Sri Govindharaja Swamy Devasthanam emerges as a celestial abode, beckoning devotees to partake in the divine splendor and benevolence.
              </p>
              <p>
                Conceived in the divine vision of <strong>Sri Haripuri Narahari Swamy in 2008</strong>, the temple's genesis is imbued with the celestial touch of Lord Sri Lakshmi Narayana, who ordained its establishment with divine clarity and purpose.
              </p>
              <p>
                Enshrined within its hallowed sanctum is Lord Govindha, the eternal embodiment of divine grace and compassion. Devotees flock from distant corners to bask in His radiance and seek solace in His boundless love. Lord Govindha, the bestower of blessings and remover of obstacles, holds sway over the hearts and minds of His devotees, guiding them through life's myriad challenges with unwavering grace and benevolence.
              </p>
              <p>
                In reverence to the divine decree, Sri Govindharaja Swamy Devasthanam stands not merely as a temple but as a bastion of spiritual enlightenment and societal harmony. Central to the temple's ethos is its unwavering commitment to social welfare, where the resplendent halls reverberate with the joyous echoes of <strong>annadanam</strong>.
              </p>

              <div className="gallery-preview">
                <img src="/assets/MainGovindaSwami.jpg.jpeg" alt="Swamy Vari Vigraham" />
                <img src="/utsava_murthulu_procession_1777447548249.png" alt="Utsava Murthulu" />
              </div>
            </div>
          </motion.section>

          <div className="section-divider"></div>

          {/* Blueprint Section */}
          <motion.section id="blueprint" className="view-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="section-header">
              <h2>Temple Complex Master Blueprint</h2>
              <div className="title-underline"></div>
            </div>
            <p>Following the blueprint of traditional Vastu and spiritual excellence, the temple complex plan includes multi-functional mandapams and spiritual hubs.</p>

            <div className="blueprint-container">
              <img src="/temple_blueprint_plan_1777447500616.png" alt="Technical Blueprint" className="blueprint-main-img" />
              <div className="blueprint-stats">
                <div className="stat-item">
                  <span className="stat-val">Architectural Style</span>
                  <span className="stat-label">Ancient Dravidian</span>
                </div>
                <div className="stat-item">
                  <span className="stat-val">Core Vision</span>
                  <span className="stat-label">Mission Govindham</span>
                </div>
              </div>
            </div>
          </motion.section>

          <div className="section-divider"></div>

          {/* Mission Section */}
          <motion.section id="mission" className="view-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="section-header">
              <h2>Ongoing Sacred Constructions</h2>
              <div className="title-underline"></div>
            </div>
            <p>Support Sri Govindharaja Swamy Devasthanam constructions to sustain our operations and expand our services to those in need.</p>

            <img src="/temple_construction_mission_1777447566900.png" alt="Mission Construction" className="mission-main-img" />

            <div className="construction-milestones">
              {constructionList.map((item, idx) => (
                <div key={idx} className="milestone-row">
                  <Building2 size={20} />
                  <div className="milestone-info">
                    <strong>{item.name}</strong>
                    <span className={`status-tag ${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="tax-benefit-alert">
              <ShieldCheck size={24} />
              <p>All donations made towards these constructions are <strong>100% tax-exempted</strong> under section 80G of the Income Tax Act.</p>
            </div>
          </motion.section>

          <div className="section-divider"></div>

          {/* Donation Section */}
          <motion.section id="donation" className="view-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="section-header">
              <h2>Support the Mission - Bank Account Details</h2>
              <div className="title-underline"></div>
            </div>

            <div className="puranic-quote-card">
              <Quote size={24} className="q-icon" />
              <p className="telugu-verse">
                తపః పరం కృతయుగే త్రేతాయాం జ్ఞానముచ్యతే | <br />
                ద్వాపరే యజ్ఞమేవాహుః దానమేవ కలౌ యుగే ||
              </p>
              <p className="english-translation">
                "When in the age of penance, knowledge was paramount, In the Treta Yuga, sacrifice was esteemed,<br />
                In the Dvapara Yuga, they extolled only the performance of sacrifices,<br />
                But in the Kali Yuga, they say, charity to temples alone is supreme."
              </p>
              <div className="merit-highlight">
                Equivalent to donating 30 cows & performing 25 Sudarshana Yagas.
              </div>
            </div>

            <div className="bank-details-blueprint">
              <div className="bank-header-row">
                <Building size={24} />
                <h3>Official Contribution Details</h3>
              </div>
              <div className="bank-table">
                <div className="bank-row">
                  <span>Account Name</span>
                  <strong>Govindhara raja swamy devasthanam foundation</strong>
                </div>
                <div className="bank-row">
                  <span>Account Number</span>
                  <strong className="primary-text" style={{ fontSize: '1.4rem' }}>42270392915</strong>
                </div>
                <div className="bank-row">
                  <span>IFSC Code</span>
                  <strong>SBIN0014676</strong>
                </div>
                <div className="bank-row">
                  <span>Bank & Branch</span>
                  <strong>SBI, Cyber Gateway, Hi-Tech City, Hyderabad</strong>
                </div>
              </div>
              <div className="caution-footer">
                <strong>IMPORTANT:</strong> Verify accounts before transfer. Official contact: 8143477307
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <style>{`
        .temple-portal {
          
          min-height: 100vh;
          margin-top: 2rem;
          padding-bottom: 5rem;
        }

        .portal-header {
          background: var(--secondary);
          color: white;
          padding: 2.5rem 0;
          border-bottom: 3px solid var(--accent);
          position: relative;
          overflow: hidden;
        }

        .portal-header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .portal-brand {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .portal-brand h1 {
          font-size: 1.6rem;
          margin: 0;
          font-family: var(--font-heading);
          color: var(--accent);
          letter-spacing: 0.5px;
        }

        .portal-brand p {
          margin: 0.2rem 0 0;
          font-size: 0.85rem;
          opacity: 0.7;
          font-weight: 600;
        }

        .portal-status-badge {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: rgba(212, 175, 55, 0.2);
          padding: 0.6rem 1.2rem;
          border-radius: 50px;
          border: 1px solid var(--accent);
          color: var(--accent);
          font-weight: 700;
          font-size: 0.9rem;
        }

        .portal-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 3rem;
          margin-top: 3rem;
        }

        .portal-nav-aside {
          width: 100%;
          max-width: 100%;
          position: sticky;
          top: 120px;
          height: calc(100vh - 140px);
          overflow-y: auto;
          scrollbar-width: none;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          min-width: 250px; /* Added minimum width for sidebar content */
        }

        .portal-nav-aside::-webkit-scrollbar {
          display: none;
        }

        .nav-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          border-top: 4px solid var(--primary);
        }

        .nav-card h3 {
          padding: 1.2rem 1.5rem;
          margin: 0;
          background: var(--bg-offset);
          color: var(--secondary);
          font-size: 1rem;
          border-bottom: 1px solid #eee;
        }

        .nav-list {
          display: flex;
          flex-direction: column;
        }

        .nav-list button {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          text-align: left;
          font-weight: 700;
          color: var(--text-muted);
          border-bottom: 1px solid #f9f9f9;
          transition: all 0.3s;
          line-height: 1.4; /* Better line height for wrapped text */
          word-break: break-word; /* Ensure long words don't overflow */
        }

        .nav-list button svg {
          flex-shrink: 0; /* Prevent icon from shrinking */
        }

        .nav-list button:hover {
          background: #fff9f0;
          color: var(--primary);
        }

        .nav-list button.active {
          background: var(--primary);
          color: white;
        }

        .portal-sidebar-info {
          margin-top: 2rem;
          padding: 1.5rem;
          background: white;
        }

        .portal-sidebar-info h4 {
          color: var(--secondary);
          margin-bottom: 1rem;
          border-bottom: 2px solid var(--accent);
          padding-bottom: 0.5rem;
        }

        .side-contact {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 1rem;
        }

        .portal-main-view {
          padding: 4rem;
          background: white;
        }

        .section-header {
          margin-bottom: 3rem;
        }

        .section-header h2 {
          font-size: clamp(1.3rem, 3.5vw, 2rem);
          color: var(--secondary);
          font-family: var(--font-heading);
          line-height: 1.3;
          margin-bottom: 0.8rem;
          word-break: break-word;
        }

        .title-underline {
          width: 60px;
          height: 4px;
          background: var(--primary);
          border-radius: 2px;
        }

        .sacred-content p {
          font-size: 1.1rem;
          line-height: 1.9;
          margin-bottom: 1.5rem;
          color: var(--text);
          text-align: justify;
        }

        .lead-para {
          font-weight: 700;
          color: var(--secondary);
          font-size: 1.25rem !important;
        }

        .gallery-preview {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .gallery-preview img {
          width: 100%;
          max-width: 100%;
          z-index: 1200;
          height: 250px;
          object-fit: cover;
          border-radius: 12px;
          border: 1px solid var(--accent);
        }

        .blueprint-container {
          margin-top: 2rem;
          border: 2px solid var(--accent);
          padding: 1.5rem;
          border-radius: 20px;
        }

        .blueprint-main-img, .mission-main-img {
          width: 100%;
          max-width: 600px;
          display: block;
          margin: 0 auto 2rem;
          border-radius: 10px;
          border: 1px solid var(--accent);
          height: auto;
        }

        .blueprint-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 2rem;
          text-align: center;
        }

        .blueprint-stats .stat-item {
          background: #f8f9fa;
          padding: 2rem;
          border-radius: 15px;
          border: 1px solid #eee;
          transition: transform 0.3s ease;
        }

        .blueprint-stats .stat-item:hover {
          transform: translateY(-5px);
          border-color: var(--accent);
        }

        .stat-item {
          padding: 1rem;
          background: var(--bg-offset);
          border-radius: 12px;
        }

        .stat-val {
          display: block;
          font-weight: 800;
          color: var(--secondary);
          font-size: 1.1rem;
          word-break: break-word;
          white-space: normal;
        }

        .stat-label {
          display: block;
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-top: 0.3rem;
        }

        .construction-milestones {
          display: grid;
          gap: 1rem;
          margin-top: 2rem;
        }

        .milestone-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.2rem;
          background: #fdfaf3;
          border-radius: 12px;
          border: 1px solid #eee;
        }

        .milestone-info {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .status-tag {
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.3rem 1rem;
          border-radius: 50px;
          text-transform: uppercase;
        }

        .status-tag.in-progress { background: #fff7ed; color: #c2410c; }
        .status-tag.expanding { background: #f0fdf4; color: #15803d; }
        .status-tag.planned { background: #eff6ff; color: #1d4ed8; }
        .status-tag.upcoming { background: #f5f5f5; color: #737373; }

        .tax-benefit-alert {
          margin-top: 3rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem;
          background: #f0fdf4;
          border-radius: 12px;
          color: #166534;
        }

        .tax-benefit-alert p {
          margin: 0;
          font-weight: 600;
        }

        .puranic-quote-card {
          background: #fff9f0;
          padding: 3rem;
          border-radius: 20px;
          border-left: 5px solid var(--accent);
          margin-bottom: 3rem;
          position: relative;
          text-align: center;
        }

        .q-icon { color: var(--accent); opacity: 0.4; margin-bottom: 1rem; }

        .telugu-verse {
          font-size: 1.6rem !important;
          font-weight: 700;
          color: var(--secondary);
          line-height: 1.6 !important;
          margin-bottom: 1.5rem !important;
          font-family: inherit;
        }

        .english-translation {
          font-size: 1.1rem !important;
          font-style: italic;
          color: var(--text-muted);
          line-height: 1.8 !important;
          margin-bottom: 1.5rem !important;
        }

        .merit-highlight {
          font-weight: 800;
          color: var(--primary);
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
        }

        .bank-details-blueprint {
          padding: 3rem;
          border: 2px solid var(--accent);
          background: white;
          border-radius: 20px;
        }

        .bank-header-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
          color: var(--secondary);
          border-bottom: 1px solid #eee;
          padding-bottom: 1rem;
        }

        .bank-table {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .bank-row {
          display: flex;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px dashed #eee;
        }

        .bank-row span { color: var(--text-muted); font-weight: 600; }
        .bank-row strong { color: var(--secondary); text-align: right; }
        .primary-text { color: var(--primary) !important; }

        .caution-footer {
          margin-top: 2rem;
          background: #fef2f2;
          color: #991b1b;
          padding: 1rem;
          border-radius: 10px;
          text-align: center;
          font-size: 0.85rem;
        }

        .section-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, var(--accent), transparent);
          margin: 4rem 0;
          opacity: 0.5;
        }

        .view-section {
          scroll-margin-top: 120px;
        }

        /* ── Laptop (≤1200px) ── */
        @media (max-width: 1200px) {
          .portal-grid { grid-template-columns: 280px 1fr; gap: 2rem; }
          .portal-main-view { padding: 3rem; }
        }

        /* ── Tablet landscape (≤1024px) ── */
        @media (max-width: 1024px) {
          .portal-grid { grid-template-columns: 260px 1fr; gap: 1.5rem; }
          .portal-brand h1 { font-size: 1.4rem; }
          .portal-main-view { padding: 2.5rem; }
          .blueprint-stats { grid-template-columns: 1fr 1fr; gap: 1rem; }
        }

        /* ── Tablet portrait (≤900px) — single column layout ── */
        @media (max-width: 900px) {
          .portal-header-inner {
            flex-direction: column;
            text-align: center;
            align-items: center;
            gap: 1rem;
          }
          .portal-brand {
            flex-direction: column;
            align-items: center;
            gap: 0.8rem;
          }
          .portal-brand h1 { font-size: 1.25rem; }
          .portal-grid { grid-template-columns: 1fr; gap: 2rem; }
          .portal-nav-aside {
            position: static;
            height: auto;
            order: -1;
          }
          .nav-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
          }
          .nav-list button {
            padding: 0.8rem 1rem;
            font-size: 0.85rem;
            border-radius: 10px;
            border: 1px solid #eee;
            justify-content: center;
          }
          .portal-sidebar-info { display: none; }
          .portal-main-view { padding: 2.5rem; }
          .gallery-preview { grid-template-columns: 1fr 1fr; gap: 1rem; }
          .bank-row { flex-direction: column; gap: 0.3rem; }
          .bank-row strong { text-align: left; }
          .blueprint-stats { grid-template-columns: 1fr 1fr; gap: 1rem; }
          .blueprint-container { padding: 1rem; }
        }

        /* ── Mobile (≤640px) ── */
        @media (max-width: 640px) {
          .portal-header { padding: 1.5rem 0; }
          .portal-brand h1 { font-size: 1.1rem; letter-spacing: 0; }
          .portal-brand p { font-size: 0.8rem; }
          .portal-status-badge { font-size: 0.8rem; padding: 0.5rem 1rem; }
          .portal-main-view { padding: 1.5rem; }
          .section-header { margin-bottom: 1.5rem; }
          .sacred-content p { font-size: 1rem; }
          .gallery-preview { grid-template-columns: 1fr; }
          .gallery-preview img { height: 200px; }
          .blueprint-stats { grid-template-columns: 1fr; gap: 0.8rem; }
          .blueprint-stats .stat-item { padding: 1.2rem; }
          .milestone-row { gap: 1rem; padding: 1rem; }
          .milestone-info { flex-direction: column; align-items: flex-start; gap: 0.4rem; }
          .stat-item { padding: 0.8rem; }
          .stat-val { font-size: 0.9rem; }
          .nav-list { grid-template-columns: 1fr; }
          .nav-list button { justify-content: flex-start; }
          .bank-details-blueprint, .puranic-quote-card { padding: 1.5rem; }
          .telugu-verse { font-size: 1.1rem !important; }
          .section-divider { margin: 2rem 0; }
          .construction-milestones { gap: 0.8rem; }
        }

        /* ── Very small phones (≤380px) ── */
        @media (max-width: 380px) {
          .portal-brand h1 { font-size: 0.95rem; }
          .portal-main-view { padding: 1rem; }
          .blueprint-stats .stat-val { font-size: 0.85rem; }
          .milestone-row { flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
};

export default About;
