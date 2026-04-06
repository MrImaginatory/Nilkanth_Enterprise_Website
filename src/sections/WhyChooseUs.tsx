import React from 'react';
import { HiUserGroup, HiShieldCheck, HiBolt } from 'react-icons/hi2';
import { Container, Section, Button } from '../components/ui';
import styles from './styles/WhyChooseUs.module.css';

const WhyChooseUs: React.FC = () => {
  const stats = [
    { label: "Factory Direct", sub: "Quality Guarantee" },
    { label: "3 Locations", sub: "Songadh, Vyara, Bardoli" },
    { label: "10,000+", sub: "Custom Pieces Delivered" },
    { label: "10 Year", sub: "Refined Frame Warranty" },
  ];

  const trustPoints = [
    {
      title: "Direct Owner Consultation",
      desc: "Work directly with our founders to bring your design vision to life.",
      icon: (
        <HiUserGroup className="w-10 h-10" />
      )
    },
    {
      title: "Transparency in Materials",
      desc: "We use only 100% teak wood and high-density foam (32-40 Density). No shortcuts.",
      icon: (
        <HiShieldCheck className="w-10 h-10" />
      )
    },
    {
      title: "Hassle-Free Post-Sales",
      desc: "Our local presence means we are just a call away for any adjustments or repairs.",
      icon: (
        <HiBolt className="w-10 h-10" />
      )
    }
  ];

  return (
    <Section id="about" bg="wood-brown" py="lg" className={styles.section}>
      {/* Decorative Accents */}
      <div className={styles.accent}></div>

      <Container>
        <div className={styles.flexContainer}>
          {/* Heritage Content */}
          <div className={styles.heritageContent}>
            <span className={styles.heritageTag}>
              Why Nilkanth Enterprises
            </span>
            <h2 className={styles.h2}>
              "We Don't Just Build Furniture; <span className={styles.h2Highlight}>We Create Your Legacy.</span>"
            </h2>
            <p className={styles.p}>
              Since 2024, Nilkanth Enterprises has been the trusted name for custom furniture in Songadh and surrounding areas. Our factory-first approach ensures that quality is never compromised for profit.
            </p>

            <div className={styles.statsGrid}>
              {stats.map(stat => (
                <div key={stat.label} className={styles.statItem}>
                  <span className={styles.statLabel}>{stat.label}</span>
                  <span className={styles.statSub}>{stat.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Points Grid */}
          <div className={styles.trustPointsList}>
            {trustPoints.map(point => (
              <div
                key={point.title}
                className={styles.trustItem}
              >
                <div className={styles.iconWrapper}>
                  {point.icon}
                </div>
                <div>
                  <h3 className={styles.trustTitle}>
                    {point.title}
                  </h3>
                  <p className={styles.trustDesc}>
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}

            <div className={styles.ctaWrapper}>
              <Button variant="primary" size="lg" className={styles.ctaBtn}>
                Book a Free Site Visit
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default WhyChooseUs;
