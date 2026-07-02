import React from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const poojas = [
  {
    id: 1,
    title: 'Sri Maha Sudarshana Yagam',
    description: 'Attain divine protection, eliminate negative energies, and overcome obstacles in life with the powerful Sudarshana Yagam.',
    image: '/assets/sudarshana_yagam.png',
    date: 'Thursday, 2 July',
    location: 'Jagadgiri Gutta, Hyderabad',
  },
  {
    id: 2,
    title: 'Bhudevi Sametha Varaha Swamy Yagam',
    description: 'Own your dream home, resolve land-related disputes and court matters, and attract prosperity and abundance.',
    image: '/assets/varaha_swamy.png',
    date: 'Friday, 3 July',
    location: 'Jagadgiri Gutta, Hyderabad',
  },
  {
    id: 3,
    title: 'Arogya Dhanvantari Yagam',
    description: 'Seek the blessings of the divine physician for good health, longevity, and fast recovery from chronic ailments.',
    image: '/assets/dhanvantari.png',
    date: 'Sunday, 5 July',
    location: 'Jagadgiri Gutta, Hyderabad',
  },
  {
    id: 4,
    title: 'Suvarna Lakshmi Kubera Yagam',
    description: 'Attract immense wealth, clear financial debts, and ensure long-lasting business success and financial stability.',
    image: '/assets/lakshmi_kubera.png',
    date: 'Monday, 6 July',
    location: 'Jagadgiri Gutta, Hyderabad',
  },
  {
    id: 5,
    title: 'Kalyana Venkateshwara Swamy Yagam',
    description: 'Remove delays in marriage, ensure marital harmony, and seek divine blessings for a happy, prosperous family life.',
    image: '/assets/kalyana_venkateshwara.png',
    date: 'Wednesday, 8 July',
    location: 'Jagadgiri Gutta, Hyderabad',
  },
  {
    id: 6,
    title: 'Maha Aishwarya Ashtalakshmi Yagam',
    description: 'Receive the eight-fold blessings of Goddess Lakshmi for wealth, courage, offspring, knowledge, and ultimate victory.',
    image: '/assets/ashtalakshmi.png',
    date: 'Friday, 10 July',
    location: 'Jagadgiri Gutta, Hyderabad',
  }
];

// Custom Temple Outline Icon (like in the screenshot)
const TempleOutlineIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vm-icon">
    <path d="M12 2v20M8 22h8M6 18h12M4 14h16M2 10h20M12 2l-8 8h16l-8-8z" />
  </svg>
);


const PopularPoojas = () => {
  const navigate = useNavigate();

  return (
    <section className="vm-pooja-section section-padding">
      <div className="container">
        <div className="section-heading centered">
          <span className="subtitle" style={{ color: '#fff' }}>Sacred Offerings</span>
          <h2 style={{ color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Popular Poojas & Yagams</h2>
          <div className="divider" style={{ background: '#fff' }}></div>
        </div>

        <div className="vm-grid">
          {poojas.map((pooja) => (
            <div key={pooja.id} className="vm-card">
              <div className="vm-card-img-wrapper">
                <div className="online-tag">Online Puja</div>
                <img src={pooja.image} alt={pooja.title} />
              </div>
              <div className="vm-card-content">
                <h3 className="vm-card-title">{pooja.title}</h3>
                <p className="vm-card-desc">{pooja.description}</p>
                
                <div className="vm-card-meta">
                  <div className="vm-meta-item">
                    <TempleOutlineIcon />
                    <span>Sri Govindharaja Swamy Temple, {pooja.location}</span>
                  </div>
                </div>
                
                <div className="vm-btn-container">
                  <button className="vm-btn-participate" onClick={() => navigate(`/pooja/${pooja.id}`)}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .vm-pooja-section {
          background-color: #7b1113; /* Dark Maroon background for the whole section */
          background-image: radial-gradient(circle at center, #8a1518 0%, #7b1113 100%);
          padding-top: 4rem;
          padding-bottom: 5rem;
        }
        
        /* Overriding section heading for this specific dark background */
        .vm-pooja-section .section-heading h2,
        .vm-pooja-section .section-heading .subtitle {
          background: none;
          -webkit-text-fill-color: #fff;
          color: #fff;
        }

        .vm-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .vm-card {
          width: 100%;
          max-width: 380px;
          background-color: #fbf6ec; /* Cream background */
          /* Subtle mandala-like background pattern (using CSS radial gradients) */
          background-image: radial-gradient(#e8ddc8 1px, transparent 1px);
          background-size: 20px 20px;
          border-radius: 20px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }
        
        /* Inner container to give content a solid background over the pattern */
        .vm-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(251, 246, 236, 0.6) 0%, rgba(251, 246, 236, 0.95) 100%);
          z-index: 0;
        }
        
        .vm-card > * {
          position: relative;
          z-index: 1;
        }

        .vm-card-img-wrapper {
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 16 / 10;
          position: relative;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        
        .vm-card-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          transition: transform 0.5s ease;
        }
        
        .vm-card:hover .vm-card-img-wrapper img {
          transform: scale(1.05);
        }
        
        .online-tag {
          position: absolute;
          top: 12px;
          right: 12px;
          background-color: #00e676; /* Bright Green */
          color: #000;
          font-weight: 700;
          font-size: 0.75rem;
          padding: 4px 12px;
          border-radius: 99px;
          z-index: 2;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .vm-card-content {
          padding: 1.25rem 0.5rem 0.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          text-align: left;
        }
        
        .vm-card-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #7b1113; /* Dark Maroon */
          margin-bottom: 0.75rem;
          line-height: 1.3;
          font-family: 'Outfit', sans-serif;
        }
        
        .vm-card-desc {
          font-size: 0.95rem;
          color: #4a4a4a;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          font-family: 'Outfit', sans-serif;
        }
        
        .vm-card-meta {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
          margin-bottom: 1.5rem;
        }
        
        .vm-meta-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: #333;
          font-size: 0.95rem;
          font-weight: 500;
          font-family: 'Outfit', sans-serif;
        }
        
        .vm-meta-item span {
          line-height: 1.3;
        }
        
        .vm-icon {
          color: #7b1113; /* Dark Maroon icon */
          flex-shrink: 0;
          margin-top: 2px;
        }
        
        .vm-btn-container {
          margin-top: auto;
          display: flex;
          justify-content: center;
        }
        
        .vm-btn-participate {
          display: inline-block;
          padding: 0.6rem 2.5rem;
          background-color: #7b1113;
          color: #FFFFFF;
          border: none;
          border-radius: 99px; /* Pill shape */
          font-weight: 700;
          font-size: 1.05rem;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          font-family: 'Outfit', sans-serif;
          box-shadow: 0 4px 10px rgba(123, 17, 19, 0.3);
        }
        
        .vm-btn-participate:hover {
          background-color: #5a0c0e;
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .vm-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default PopularPoojas;
