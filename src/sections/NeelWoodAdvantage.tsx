import React from 'react';
import { HiSparkles, HiHomeModern, HiBolt, HiWrenchScrewdriver } from 'react-icons/hi2';
import { Container, Section } from '../components/ui';
import { content } from '../data/content';
import factoryDetail from '../assets/factory_detail.png';
import styles from './styles/NeelWoodAdvantage.module.css';

const NeelWoodAdvantage: React.FC = () => {
  return (
    <Section bg="cream-dark" py="lg">
      <Container>
        <div className={styles.flexContainer}>
          {/* Visual Left */}
          <div className={styles.visualSide}>
            <div className={styles.imageWrapper}>
              <div className={styles.imageContainer}>
                <img
                  src={factoryDetail}
                  alt="Furniture Quality Detail"
                  className={styles.image}
                />
                <div className={styles.gradientOverlay}></div>
              </div>

              {/* Floating Quote */}
              <div className={styles.floatingQuote}>
                <p className={styles.quoteText}>
                  "Every joint we carve is a promise of quality to our customers."
                </p>
                <span className={styles.quoteAuthor}>
                  - Neel Wood Team
                </span>
              </div>
            </div>
          </div>

          {/* Content Right */}
          <div className={styles.contentSide}>
            <h2 className={styles.h2}>
              {content.advantage.title}
            </h2>

            <div className={styles.grid}>
              {content.advantage.items.map((item) => (
                <div
                  key={item.title}
                  className={styles.advantageCard}
                >
                  <div className={styles.iconWrapper}>
                    {item.title === 'Quality You Can Trust' && <HiSparkles />}
                    {item.title === 'Factory-Direct Savings' && <HiHomeModern />}
                    {item.title === 'Faster Turnaround' && <HiBolt />}
                    {item.title === 'Unmatched Customization' && <HiWrenchScrewdriver />}
                  </div>
                  <h3 className={styles.advantageTitle}>
                    {item.title}
                  </h3>
                  <p className={styles.advantageDesc}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.boxOut}>
              <p className={styles.boxOutText}>
                Our in-house production at Neel Wood factory in Vyara means you get factory-direct quality without retail markup. We control every step of the process.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default NeelWoodAdvantage;
