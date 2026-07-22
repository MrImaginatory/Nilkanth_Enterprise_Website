import React, { useState, useEffect } from 'react';
import { HiArrowUp } from 'react-icons/hi2';
import styles from './BackToTop.module.css';

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) {
      // Fallback: show after 600px scroll
      const handleScroll = () => setVisible(window.scrollY > 600);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${styles.btn} ${visible ? styles.visible : ''}`}
      aria-label="Back to top"
    >
      <HiArrowUp className={styles.icon} />
    </button>
  );
};

export default BackToTop;
