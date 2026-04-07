import React from 'react';
import { HiCheckCircle } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '../ui';
import { content } from '../../data/content';
import { Link } from 'react-router-dom';
import { useConfig } from '../../hooks/useConfig';
import heroBg from '../../assets/hero_full_bg.png';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  const { config } = useConfig();
  
  return (
    <section id="home" className={styles.hero}>
      {/* Background Image Layer */}
      <div className={styles.bgLayer}>
        <img
          src={heroBg}
          alt="Luxury Artisan Interior"
          className={styles.bgImage}
        />
        {/* Stronger Gradient Scrim for Text Readability */}
        <div className={styles.scrim}></div>
        {/* Mobile-Specific Bottom Fade */}
        <div className={styles.mobileBottomFade}></div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.innerContent}>
          {/* Badge */}
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            <span className={styles.badgeText}>
              Direct from Vyara Factory
            </span>
          </div>

          {/* Heading */}
          <h1 className={styles.h1}>
            {content.hero.headline.split(' ').slice(0, 4).join(' ')}
            <span className={styles.h1Highlight}>
              {content.hero.headline.split(' ').slice(4).join(' ')}
            </span>
          </h1>

          {/* Subheadline */}
          <p className={styles.subheadline}>
            {content.hero.subheadline}
          </p>

          {/* CTAs */}
          <div className={styles.ctas}>
            <Button 
              as={Link}
              to={config.links.freeQuote}
              size="lg" 
              className={styles.primaryBtn}
            >
              Get Free Quote
            </Button>
            <a href={config.business.whatsapp} target="_blank" rel="noopener noreferrer">
              <Button 
                variant="outline" 
                size="lg" 
                className={styles.secondaryBtn}
              >
                <FaWhatsapp className={styles.whatsappIcon} />
                Chat on WhatsApp
              </Button>
            </a>
          </div>

          {/* Trust Signals Segment */}
          <div className={styles.trustSignals}>
            {[
              { label: '3 Locations', sub: 'Vyara, Songadh, Bardoli' },
              { label: 'Artisan Quality', sub: 'Guaranteed' },
            ].map((signal) => (
              <div key={signal.label} className={styles.signalItem}>
                <span className={styles.signalLabel}>
                  {signal.label}
                </span>
                <span className={styles.signalSub}>
                  {signal.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Artisan Badge (Bottom Right) */}
      <div className={styles.floatingBadge}>
        <div className={styles.checkIconWrapper}>
          <HiCheckCircle className="w-8 h-8" />
        </div>
        <div className={styles.badgeContent}>
          <span className={styles.badgeTitle}>
            100% Custom Joinery
          </span>
          <span className={styles.badgeSub}>
            Guaranteed Factory Direct Quality
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
