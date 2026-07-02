import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, CheckCircle, ChevronDown, ChevronUp, ShieldCheck, Heart } from 'lucide-react';

const poojasData: Record<string, any> = {
  "1": {
    title: 'Sri Maha Sudarshana Yagam',
    teluguTitle: 'శ్రీ మహా సుదర్శన యాగం',
    description: 'Attain divine protection, eliminate negative energies, and overcome obstacles in life with the powerful Sudarshana Yagam.',
    image: '/assets/sudarshana_yagam.png',
    date: 'Thursday, 2 July',
    time: '09:00 AM - 01:00 PM',
    location: 'Jagadgiri Gutta, Hyderabad',
    about: 'Sri Maha Sudarshana Yagam is a highly powerful and sacred fire ritual dedicated to Lord Sudarshana, the personification of the divine weapon (Chakra) of Lord Vishnu. This Yagam is performed to destroy negative energies, evil forces, and planetary doshas that hinder progress and peace in one\'s life.',
    benefits: [
      'Eliminates negative energies and evil eye (Drishti).',
      'Provides protection from enemies and unseen dangers.',
      'Resolves severe health issues and chronic diseases.',
      'Brings victory, success, and prosperity in business.',
      'Removes obstacles and paves the way for spiritual growth.'
    ],
    rituals: [
      'Sudarshana Maha Mantra Japa',
      'Sudarshana Homa with 108 Ahutis',
      'Purnahuti and Ashirvachanam'
    ],
    packages: [
      { name: 'Individual Sankalpam', price: '₹ 1,116', desc: 'Sankalpam will be performed on your name and gotra.' },
      { name: 'Family Sankalpam', price: '₹ 2,516', desc: 'Sankalpam for you and up to 4 family members.' },
      { name: 'Maha Sponsor', price: '₹ 11,116', desc: 'Includes special vastram offering and silver coin prasadam.' }
    ],
    faqs: [
      { q: 'Can I participate online?', a: 'Yes, online participation is available. A live link will be shared after booking.' },
      { q: 'Will I receive prasadam?', a: 'Yes, sacred prasadam (Raksha, Kumkum, and Akshata) will be sent to your address.' }
    ]
  },
  "2": {
    title: 'Bhudevi Sametha Varaha Swamy Yagam',
    teluguTitle: 'భూదేవి సమేత వరాహ స్వామి యాగం',
    description: 'Own your dream home, resolve land-related disputes and court matters, and attract prosperity and abundance.',
    image: '/assets/varaha_swamy.png',
    date: 'Friday, 3 July',
    time: '08:30 AM - 12:30 PM',
    location: 'Jagadgiri Gutta, Hyderabad',
    about: 'Lord Varaha, the third avatar of Lord Vishnu, rescued Goddess Bhudevi (Mother Earth) from the cosmic ocean. This sacred Yagam is exclusively performed for solving all land, property, and real estate related issues. It clears the path for constructing or purchasing a new house without obstacles.',
    benefits: [
      'Quick resolution of pending property disputes and court cases.',
      'Removes Vastu doshas and negative influences on land.',
      'Fulfills the dream of purchasing your own home or property.',
      'Brings stability, peace, and abundance to the family.',
      'Guides children towards the right path and successful future.'
    ],
    rituals: [
      'Varaha Moola Mantra Homam',
      'Bhudevi Sahita Archana',
      'Kshetrapalaka Puja and Purnahuti'
    ],
    packages: [
      { name: 'Basic Sankalpam', price: '₹ 1,516', desc: 'Individual sankalpam for resolving property issues.' },
      { name: 'Gruha Sankalpam', price: '₹ 3,116', desc: 'Family sankalpam for new house construction/purchase.' },
      { name: 'Maha Yagam Sponsor', price: '₹ 15,116', desc: 'Includes Vastu Yantra energized in the homam.' }
    ],
    faqs: [
      { q: 'Do I need to be physically present?', a: 'Physical presence is highly beneficial, but online participation yields the exact same spiritual benefits.' },
      { q: 'What details are required?', a: 'You need to provide your Name, Gotra, Nakshatra, and Rashi during booking.' }
    ]
  },
  "3": {
    title: 'Arogya Dhanvantari Yagam',
    teluguTitle: 'ఆరోగ్య ధన్వంతరి యాగం',
    description: 'Seek the blessings of the divine physician for good health, longevity, and fast recovery from chronic ailments.',
    image: '/assets/dhanvantari.png',
    date: 'Sunday, 5 July',
    time: '07:00 AM - 11:00 AM',
    location: 'Jagadgiri Gutta, Hyderabad',
    about: 'Lord Dhanvantari is the God of Ayurvedic medicine and healing. Arogya Dhanvantari Yagam is an exceptionally potent Vedic ritual performed to seek divine intervention for curing severe, undiagnosed, or chronic health conditions. The sacred herbal offerings in this homam purify the atmosphere and the body\'s aura.',
    benefits: [
      'Speeds up recovery from surgeries and chronic illnesses.',
      'Enhances physical, mental, and emotional well-being.',
      'Provides a protective shield against seasonal and severe diseases.',
      'Improves longevity and vitality of elders in the family.',
      'Removes fear of death (Apamrityu Dosha) and instills positivity.'
    ],
    rituals: [
      'Dhanvantari Maha Mantra chanting',
      'Homam with 108 specific medicinal herbs (Oushadhis)',
      'Distribution of Amrita Kalasha Prasadam'
    ],
    packages: [
      { name: 'Arogya Sankalpam', price: '₹ 1,216', desc: 'For individual health and recovery.' },
      { name: 'Kutumba Sankalpam', price: '₹ 2,716', desc: 'For the overall health and well-being of the whole family.' },
      { name: 'Maha Sponsor', price: '₹ 11,516', desc: 'Includes Dhanvantari energized copper yantra.' }
    ],
    faqs: [
      { q: 'Can I perform this for someone else?', a: 'Yes, you can provide their details (Name, Gotra) and the sankalpam will be done on their behalf.' },
      { q: 'What is the prasadam?', a: 'Sacred ash (Bhasma) and energized Raksha thread will be couriered.' }
    ]
  },
  "4": {
    title: 'Suvarna Lakshmi Kubera Yagam',
    teluguTitle: 'సువర్ణ లక్ష్మీ కుబేర యాగం',
    description: 'Attract immense wealth, clear financial debts, and ensure long-lasting business success and financial stability.',
    image: '/assets/lakshmi_kubera.png',
    date: 'Monday, 6 July',
    time: '06:00 AM - 10:00 AM',
    location: 'Jagadgiri Gutta, Hyderabad',
    about: 'This grand Yagam invokes the combined blessings of Goddess Mahalakshmi (the Goddess of Wealth) and Lord Kubera (the Banker of Heaven). It is highly recommended for business owners, entrepreneurs, and anyone facing severe financial blockages, heavy debts, or losses in their professional life.',
    benefits: [
      'Attracts sudden financial gains and new income opportunities.',
      'Clears long-standing debts and financial blockages.',
      'Ensures continuous growth and immense profit in businesses.',
      'Brings the grace of Ashta Lakshmis into your home.',
      'Prevents unnecessary expenditure and protects accumulated wealth.'
    ],
    rituals: [
      'Lakshmi Kubera Mantra Japa',
      'Sri Sukta Homam with Lotus flowers',
      'Swarna (Gold) Pushpa Archana'
    ],
    packages: [
      { name: 'Dhana Sankalpam', price: '₹ 2,116', desc: 'Basic sankalpam for individuals seeking financial growth.' },
      { name: 'Vyapara Sankalpam', price: '₹ 5,116', desc: 'Ideal for business owners and shops. Includes special Kubera coin.' },
      { name: 'Maha Yagam Sponsor', price: '₹ 21,116', desc: 'Grand sponsor package with energized Lakshmi Kubera idol.' }
    ],
    faqs: [
      { q: 'What should business owners provide?', a: 'Provide your name, gotra, and your business name for the Vyapara Sankalpam.' },
      { q: 'How long does the prasadam take to arrive?', a: 'Prasadam usually reaches within 7-10 working days via Speed Post.' }
    ]
  },
  "5": {
    title: 'Kalyana Venkateshwara Swamy Yagam',
    teluguTitle: 'కళ్యాణ వెంకటేశ్వర స్వామి యాగం',
    description: 'Remove delays in marriage, ensure marital harmony, and seek divine blessings for a happy, prosperous family life.',
    image: '/assets/kalyana_venkateshwara.png',
    date: 'Wednesday, 8 July',
    time: '09:00 AM - 01:30 PM',
    location: 'Jagadgiri Gutta, Hyderabad',
    about: 'Kalyana Venkateshwara Swamy Yagam is a celestial ritual celebrating the divine marriage of Lord Venkateshwara and Goddess Padmavathi. Performing or participating in this Yagam is believed to be the ultimate remedy for Kuja Dosha, Kalasarpa Dosha, and other astrological alignments causing delays or troubles in marriage.',
    benefits: [
      'Removes all doshas causing delays in finding a suitable life partner.',
      'Ensures a happy, peaceful, and long-lasting married life.',
      'Resolves conflicts and misunderstandings between couples.',
      'Blesses childless couples with healthy progeny (Santhana Prapti).',
      'Brings overall harmony and joy to the entire family.'
    ],
    rituals: [
      'Kalyana Utsavam',
      'Venkateshwara Moola Mantra Homam',
      'Mangalya Dharana and Ashirvachanam'
    ],
    packages: [
      { name: 'Vivaha Prapti Sankalpam', price: '₹ 1,116', desc: 'For unmarried individuals seeking a good alliance.' },
      { name: 'Dampatya Sankalpam', price: '₹ 2,516', desc: 'For married couples seeking harmony and peace.' },
      { name: 'Kalyanam Sponsor', price: '₹ 11,116', desc: 'Includes special vastram offering to the deities.' }
    ],
    faqs: [
      { q: 'Can parents participate on behalf of their children?', a: 'Yes, parents can take the sankalpam using their children\'s Name and Gotra.' },
      { q: 'Is physical presence mandatory?', a: 'No, but if you are attending in person, traditional dress code is mandatory.' }
    ]
  },
  "6": {
    title: 'Maha Aishwarya Ashtalakshmi Yagam',
    teluguTitle: 'మహా ఐశ్వర్య అష్టలక్ష్మి యాగం',
    description: 'Receive the eight-fold blessings of Goddess Lakshmi for wealth, courage, offspring, knowledge, and ultimate victory.',
    image: '/assets/ashtalakshmi.png',
    date: 'Friday, 10 July',
    time: '08:00 AM - 01:00 PM',
    location: 'Jagadgiri Gutta, Hyderabad',
    about: 'This supreme Yagam invokes the eight manifestations of Goddess Lakshmi (Ashtalakshmi) – representing Wealth, Courage, Offspring, Knowledge, Victory, Food, Prosperity, and Power. It is a grand celestial event that completely transforms the aura of the participants, showering them with unlimited abundance in all aspects of life.',
    benefits: [
      'Brings all-round success, name, and fame.',
      'Blesses the family with abundance of food (Dhanya) and wealth (Dhana).',
      'Grants immense courage (Dhairya) to face life\'s toughest challenges.',
      'Ensures success in education (Vidya) and competitive exams.',
      'Removes all forms of poverty, sorrow, and misfortune instantly.'
    ],
    rituals: [
      'Ashtalakshmi Avahana and Archana',
      'Kamalatmika Homam with 1008 Lotus flowers',
      'Maha Purnahuti and Kanya Puja'
    ],
    packages: [
      { name: 'Ashtalakshmi Sankalpam', price: '₹ 3,116', desc: 'Comprehensive sankalpam for overall well-being and wealth.' },
      { name: 'Maha Yagam Sponsor', price: '₹ 25,116', desc: 'Grand sponsor. Includes an energized silver Ashtalakshmi coin.' }
    ],
    faqs: [
      { q: 'Will I receive the silver coin prasadam?', a: 'Yes, if you select the Maha Yagam Sponsor package, it will be sent to you.' },
      { q: 'Can I view the Yagam live?', a: 'Yes, all registered devotees will receive a private YouTube live stream link.' }
    ]
  }
};

const FAQItem = ({ faq }: { faq: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">
        <h5>{faq.q}</h5>
        {isOpen ? <ChevronUp size={20} className="faq-icon" /> : <ChevronDown size={20} className="faq-icon" />}
      </div>
      {isOpen && <div className="faq-answer"><p>{faq.a}</p></div>}
    </div>
  );
};

const PoojaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pooja = poojasData[id as string];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!pooja) {
    return (
      <div className="section-padding text-center" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Pooja details not found.</h2>
        <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/')}>Return to Home</button>
      </div>
    );
  }

  return (
    <div className="pooja-details-page">
      {/* Hero Section */}
      <div className="pd-hero" style={{ backgroundImage: `url(${pooja.image})` }}>
        <div className="pd-hero-overlay">
          <div className="container pd-hero-content">
            <span className="online-badge"><ShieldCheck size={16} /> Online Puja Available</span>
            <h1 className="pd-title">{pooja.title}</h1>
            <h2 className="pd-telugu">{pooja.teluguTitle}</h2>
          </div>
        </div>
      </div>

      <div className="pd-main-wrapper">
        <div className="container">
          <div className="pd-layout-grid">
            
            {/* Left Content Area */}
            <div className="pd-content-area">
              
              <div className="pd-meta-banner">
                <div className="meta-block">
                  <Calendar className="meta-icon" />
                  <div>
                    <span className="meta-label">Date</span>
                    <span className="meta-value">{pooja.date}</span>
                  </div>
                </div>
                <div className="meta-separator"></div>
                <div className="meta-block">
                  <Clock className="meta-icon" />
                  <div>
                    <span className="meta-label">Time</span>
                    <span className="meta-value">{pooja.time}</span>
                  </div>
                </div>
                <div className="meta-separator"></div>
                <div className="meta-block">
                  <MapPin className="meta-icon" />
                  <div>
                    <span className="meta-label">Location</span>
                    <span className="meta-value">{pooja.location}</span>
                  </div>
                </div>
              </div>

              <section className="pd-section">
                <h3 className="section-title">About this Yagam</h3>
                <div className="title-underline"></div>
                <p className="pd-text">{pooja.about}</p>
              </section>

              <section className="pd-section">
                <h3 className="section-title">Key Benefits</h3>
                <div className="title-underline"></div>
                <ul className="pd-benefits-list">
                  {pooja.benefits.map((benefit: string, idx: number) => (
                    <li key={idx}>
                      <CheckCircle size={22} className="benefit-icon" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="pd-section">
                <h3 className="section-title">Ritual Timeline</h3>
                <div className="title-underline"></div>
                <div className="timeline-container">
                  {pooja.rituals.map((ritual: string, idx: number) => (
                    <div className="timeline-item" key={idx}>
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">{ritual}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="pd-section">
                <h3 className="section-title">Frequently Asked Questions</h3>
                <div className="title-underline"></div>
                <div className="faqs-container">
                  {pooja.faqs.map((faq: any, idx: number) => (
                    <FAQItem key={idx} faq={faq} />
                  ))}
                </div>
              </section>

            </div>

            {/* Right Sticky Sidebar */}
            <div className="pd-sidebar-area">
              <div className="booking-card sticky-card">
                <h3 className="booking-title">Select a Package</h3>
                <p className="booking-subtitle">Choose how you want to participate in this divine yagam.</p>
                
                <div className="package-list">
                  {pooja.packages.map((pkg: any, idx: number) => (
                    <div className="package-item" key={idx}>
                      <div className="pkg-header">
                        <h4 className="pkg-name">{pkg.name}</h4>
                        <span className="pkg-price">{pkg.price}</span>
                      </div>
                      <p className="pkg-desc">{pkg.desc}</p>
                      <button className="btn-book-pkg" onClick={() => navigate('/booking')}>
                        Select & Book
                      </button>
                    </div>
                  ))}
                </div>

                <div className="booking-trust">
                  <Heart size={16} className="trust-icon" />
                  <span>100% Secure & Authentic Rituals</span>
                </div>
              </div>
            </div>

          </div>

          {/* Horizontally Scrollable Remaining Poojas Section */}
          <div className="pd-remaining-section">
            <h3 className="section-title">Explore Other Sacred Poojas & Yagams</h3>
            <div className="title-underline"></div>
            <div className="pd-scroll-container">
              {Object.entries(poojasData)
                .filter(([key]) => key !== id)
                .map(([key, item]) => (
                  <div key={key} className="pd-mini-card" onClick={() => navigate(`/pooja/${key}`)}>
                    <div className="pd-mini-img-wrapper">
                      <div className="online-tag-mini">Online Puja</div>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="pd-mini-content">
                      <h4 className="pd-mini-title">{item.title}</h4>
                      <p className="pd-mini-desc">{item.description}</p>
                      <button className="btn-mini-book" style={{ marginTop: 'auto' }} onClick={(e) => { e.stopPropagation(); navigate(`/pooja/${key}`); }}>
                        View Details & Book
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pooja-details-page {
          background-color: #FAF6EE; /* VedaMandir style off-white */
          min-height: 100vh;
          font-family: 'Outfit', sans-serif;
        }

        /* Hero Banner */
        .pd-hero {
          height: 50vh;
          min-height: 400px;
          background-size: cover;
          background-position: center 20%;
          position: relative;
        }

        .pd-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(123, 17, 19, 0.95), rgba(123, 17, 19, 0.4));
          display: flex;
          align-items: flex-end;
          padding-bottom: 4rem;
        }

        .pd-hero-content {
          text-align: left;
          color: white;
        }

        .online-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #00e676;
          color: #000;
          font-weight: 700;
          padding: 0.4rem 1rem;
          border-radius: 99px;
          margin-bottom: 1rem;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .pd-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          margin: 0 0 0.5rem 0;
          line-height: 1.2;
          text-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }

        .pd-telugu {
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          font-weight: 500;
          color: #FFD700; /* Gold */
          margin: 0;
          font-family: 'Noto Sans Telugu', sans-serif;
        }

        /* Main Content Layout */
        .pd-main-wrapper {
          padding: 4rem 0;
        }

        .pd-layout-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        /* Left Area */
        .pd-meta-banner {
          display: flex;
          justify-content: space-between;
          background-color: #ffffff;
          padding: 1.5rem 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          margin-bottom: 3rem;
          margin-top: -7rem;
          position: relative;
          z-index: 10;
        }

        .meta-block {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .meta-icon {
          color: #FF5722;
          width: 28px;
          height: 28px;
        }

        .meta-label {
          display: block;
          font-size: 0.85rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.2rem;
        }

        .meta-value {
          display: block;
          font-weight: 700;
          color: #333;
          font-size: 1.05rem;
        }

        .meta-separator {
          width: 1px;
          background-color: #eee;
        }

        .pd-section {
          margin-bottom: 3.5rem;
        }

        .section-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #7b1113;
          margin: 0 0 0.5rem 0;
        }

        .title-underline {
          width: 60px;
          height: 4px;
          background-color: #FF5722;
          border-radius: 4px;
          margin-bottom: 1.5rem;
        }

        .pd-text {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #4a4a4a;
        }

        .pd-benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .pd-benefits-list li {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          font-size: 1.1rem;
          color: #333;
          line-height: 1.5;
          background: #fff;
          padding: 1.25rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.03);
          border-left: 4px solid #FF5722;
        }

        .benefit-icon {
          color: #FF5722;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Timeline */
        .timeline-container {
          position: relative;
          padding-left: 1.5rem;
        }

        .timeline-container::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background-color: #f0e6d2;
        }

        .timeline-item {
          position: relative;
          padding-bottom: 2rem;
        }

        .timeline-item:last-child {
          padding-bottom: 0;
        }

        .timeline-dot {
          position: absolute;
          left: -1.85rem;
          top: 4px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #FF5722;
          border: 4px solid #FAF6EE;
        }

        .timeline-content {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          background: #fff;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.03);
        }

        /* FAQs */
        .faqs-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.03);
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
        }

        .faq-question {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .faq-question h5 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
        }

        .faq-icon {
          color: #FF5722;
        }

        .faq-answer {
          padding: 0 1.5rem 1.5rem 1.5rem;
          color: #555;
          font-size: 1rem;
          line-height: 1.6;
        }

        /* Right Sticky Sidebar */
        .sticky-card {
          position: sticky;
          top: 100px;
        }

        .booking-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          border-top: 6px solid #7b1113;
        }

        .booking-title {
          font-size: 1.5rem;
          color: #7b1113;
          margin: 0 0 0.5rem 0;
          font-weight: 700;
        }

        .booking-subtitle {
          color: #666;
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }

        .package-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .package-item {
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .package-item:hover {
          border-color: #7b1113;
          box-shadow: 0 4px 15px rgba(123, 17, 19, 0.08);
          background-color: #fffafb;
        }

        .pkg-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .pkg-name {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 700;
          color: #333;
        }

        .pkg-price {
          font-weight: 800;
          color: #FF5722;
          font-size: 1.2rem;
        }

        .pkg-desc {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 1.25rem;
          line-height: 1.4;
        }

        .btn-book-pkg {
          width: 100%;
          padding: 0.8rem;
          background-color: #7b1113;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .btn-book-pkg:hover {
          background-color: #FF5722;
        }

        .booking-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
          color: #888;
          font-size: 0.85rem;
        }

        .trust-icon {
          color: #00e676;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .pd-layout-grid {
            grid-template-columns: 1fr;
          }
          .pd-meta-banner {
            flex-direction: column;
            gap: 1.5rem;
            align-items: flex-start;
          }
          .meta-separator {
            width: 100%;
            height: 1px;
          }
        }

        /* Remaining Poojas Scrollable Section */
        .pd-remaining-section {
          margin-top: 5rem;
          padding-top: 3rem;
          border-top: 2px dashed #e8ddc8;
        }

        .pd-scroll-container {
          display: flex;
          gap: 1.75rem;
          overflow-x: auto;
          padding-bottom: 2rem;
          padding-top: 0.5rem;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: #7b1113 #FAF6EE;
        }

        .pd-scroll-container::-webkit-scrollbar {
          height: 8px;
        }

        .pd-scroll-container::-webkit-scrollbar-track {
          background: #f0e6d2;
          border-radius: 10px;
        }

        .pd-scroll-container::-webkit-scrollbar-thumb {
          background: #7b1113;
          border-radius: 10px;
        }

        .pd-mini-card {
          min-width: 300px;
          max-width: 320px;
          flex-shrink: 0;
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .pd-mini-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(123, 17, 19, 0.12);
        }

        .pd-mini-img-wrapper {
          width: 100%;
          aspect-ratio: 16 / 10;
          position: relative;
          overflow: hidden;
        }

        .pd-mini-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          transition: transform 0.5s ease;
        }

        .pd-mini-card:hover .pd-mini-img-wrapper img {
          transform: scale(1.06);
        }

        .online-tag-mini {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #00e676;
          color: #000;
          font-weight: 700;
          font-size: 0.7rem;
          padding: 3px 10px;
          border-radius: 99px;
          z-index: 2;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .pd-mini-content {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          text-align: left;
        }

        .pd-mini-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #7b1113;
          margin: 0 0 0.5rem 0;
          line-height: 1.3;
          font-family: 'Outfit', sans-serif;
        }

        .pd-mini-desc {
          font-size: 0.88rem;
          color: #555;
          line-height: 1.4;
          margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .pd-mini-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #444;
          font-size: 0.88rem;
          font-weight: 500;
          margin-bottom: 1.25rem;
          margin-top: auto;
        }

        .meta-icon-mini {
          color: #FF5722;
          flex-shrink: 0;
        }

        .btn-mini-book {
          width: 100%;
          padding: 0.6rem 1rem;
          background-color: #7b1113;
          color: white;
          border: none;
          border-radius: 99px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          font-family: 'Outfit', sans-serif;
        }

        .btn-mini-book:hover {
          background-color: #5a0c0e;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .pd-hero {
            height: 40vh;
          }
          .pd-title {
            font-size: 1.8rem;
          }
          .pd-telugu {
            font-size: 1.2rem;
          }
          .pd-meta-banner {
            margin-top: -3rem;
            padding: 1.25rem;
          }
          .package-item {
            padding: 1.25rem;
          }
          .pd-mini-card {
            min-width: 270px;
            max-width: 280px;
          }
        }
      `}</style>
    </div>
  );
};

export default PoojaDetails;
