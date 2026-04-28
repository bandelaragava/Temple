import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Camera } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Gallery = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');

  const galleryItems = [
    { title: "Rajagopuram at Sunset", category: "architecture", img: "/assets/hero_temple.png" },
    { title: "Celestial Bathing Ritual", category: "rituals", img: "/assets/temple_rituals.png" },
    { title: "Sanctum Interiors", category: "deity", img: "/assets/main_govindaraja.png" },
    { title: "Visesha Diparadhana", category: "rituals", img: "/assets/live_darshan.png" },
    { title: "Intricate Stone Carvings", category: "architecture", img: "/assets/saint.png" },
    { title: "Govinda Pushkarini", category: "festivals", img: "/assets/live_darshan.png" },
    { title: "Pundarikavalli Shriyai", category: "deity", img: "/assets/deity.png" },
    { title: "Processional Chariot", category: "festivals", img: "/assets/hero_temple.png" }
  ];

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      all: t('cat_all'),
      architecture: t('cat_architecture'),
      deity: t('cat_deity'),
      rituals: t('cat_rituals'),
      festivals: t('cat_festivals')
    };
    return labels[cat] || cat;
  };

  return (
    <div className="gallery-page section-padding">
      <div className="container">
        <div className="page-header centered">
          <span className="modern-badge">{t('gallery_badge')}</span>
          <h1>{t('gallery_title')}</h1>
          <p>{t('gallery_desc')}</p>
        </div>

        <div className="gallery-controls">
          <div className="filter-group">
            {['all', 'architecture', 'deity', 'rituals', 'festivals'].map(cat => (
              <button 
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
          <div className="gallery-stats">
            <Camera size={18} /> <span>{filteredItems.length} {t('label_sacred_moments')}</span>
          </div>
        </div>

        <motion.div layout className="masonry-grid">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div 
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="gallery-card glass-card"
              >
                <div className="card-media">
                  <img src={item.img} alt={item.title} />
                  <div className="card-overlay">
                    <span className="cat-badge">{getCategoryLabel(item.category)}</span>
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .gallery-page { margin-top: 100px; }

        .gallery-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          padding: 1.5rem 2.5rem;
          background: white;
          border-radius: 100px;
          box-shadow: var(--shadow);
          border: 1px solid var(--glass-border);
        }

        .filter-group {
          display: flex;
          gap: 0.5rem;
        }

        .filter-btn {
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          color: var(--text-muted);
          transition: all 0.3s ease;
        }

        .filter-btn:hover { background: var(--marble); color: var(--primary); }
        .filter-btn.active { background: var(--secondary); color: white; box-shadow: 0 4px 15px rgba(128,0,0,0.2); }

        .gallery-stats {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 1px;
        }

        .masonry-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .gallery-card {
          padding: 0;
          overflow: hidden;
          cursor: pointer;
          border-radius: 20px;
        }

        .card-media {
          position: relative;
          height: 350px;
        }

        .card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.2, 0, 0.2, 1);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .cat-badge {
          background: var(--primary);
          color: white;
          width: fit-content;
          padding: 0.2rem 0.8rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .card-overlay h3 { color: white; font-size: 1.25rem; font-weight: 600; }

        .gallery-card:hover img { transform: scale(1.1); }
        .gallery-card:hover .card-overlay { opacity: 1; }

        @media (max-width: 900px) {
          .gallery-controls { flex-direction: column; border-radius: 20px; gap: 1.5rem; }
          .filter-group { flex-wrap: wrap; justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
