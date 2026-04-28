import React from 'react';
import { motion } from 'framer-motion';

const ComingSoon = ({ title }: { title: string }) => {
  return (
    <div className="section-padding" style={{ paddingTop: '150px', textAlign: 'center', minHeight: '80vh' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="subtitle" style={{ color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '2px' }}>Divine Portal</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', margin: '1rem 0', fontFamily: 'var(--font-heading)' }}>{title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
            This sacred section is being meticulously crafted to meet the highest spiritual and technical standards of 2026. Join us again soon for the unveiling.
          </p>
          <div className="glass-card" style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', border: '1px dashed var(--primary)' }}>
             <span style={{ fontSize: '3rem' }}>🛠️</span>
             <span style={{ fontWeight: 600, color: 'var(--secondary)' }}>Building Excellence...</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;
