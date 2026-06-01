import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Section, Button } from '../components/ui';
import Header from '../components/Header/Header';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import { useConfig } from '../hooks/useConfig';
import { Link } from 'react-router-dom';
import { content } from '../data/content';
import * as Icons from 'react-icons/hi2';
import styles from './styles/ServicesPage.module.css';

interface ServiceData {
  hero: {
    tag: string;
    title: string;
    sub: string;
    bgImage: string;
  };
  services: Array<{
    id: string;
    title: string;
    image: string;
    shortDesc: string;
    longDesc: string;
    icon: string;
    features: string[];
    process: string[];
  }>;
  trustBanner: {
    title: string;
    desc: string;
    primaryCTA: string;
    secondaryCTA: string;
  };
}

const ServicesPage: React.FC = () => {
  const { config } = useConfig();
  const [data, setData] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/services.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch services data:", error);
        setLoading(false);
      });
  }, []);

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent /> : <Icons.HiOutlineQuestionMarkCircle />;
  };

  if (loading || !data) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <SEO {...content.seo.services} />
      <Header />
      
      {/* Hero Section */}
      <section 
        className={styles.hero}
        style={{ backgroundImage: `linear-gradient(rgba(10, 8, 5, 0.7), rgba(10, 8, 5, 0.7)), url(${data.hero.bgImage})` }}
      >
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.heroContent}
          >
            <span className={styles.heroTag}>{data.hero.tag}</span>
            <h1 className={styles.heroTitle}>{data.hero.title}</h1>
            <p className={styles.heroSub}>{data.hero.sub}</p>
          </motion.div>
        </Container>
      </section>

      {/* Services Breakdown */}
      <Section py="lg" bg="cream">
        <Container>
          <div className={styles.servicesList}>
            {data.services.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${styles.serviceItem} ${index % 2 !== 0 ? styles.reverse : ''}`}
              >
                {/* Visual Side */}
                <div className={styles.serviceImageSide}>
                  <div className={styles.imageWrapper}>
                    <img src={service.image} alt={service.title} className={styles.serviceImage} />
                    <div className={styles.imageOverlay}></div>
                    <div className={styles.iconBadge}>
                       {getIcon(service.icon)}
                    </div>
                  </div>
                </div>
                
                {/* Content Side */}
                <div className={styles.serviceMainContent}>
                  <h2 className={styles.serviceTitle}>{service.title}</h2>
                  <p className={styles.serviceShort}>{service.shortDesc}</p>
                  <p className={styles.serviceLongDesc}>{service.longDesc}</p>
                  
                  <div className={styles.detailsGrid}>
                    <div className={styles.detailCol}>
                      <h3 className={styles.detailHeading}>Why Choose This</h3>
                      <ul className={styles.featureList}>
                        {service.features.map(feature => (
                          <li key={feature}>
                            <Icons.HiOutlineCheckCircle className={styles.checkIcon} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className={styles.detailCol}>
                      <h3 className={styles.detailHeading}>The Process</h3>
                      <div className={styles.processSteps}>
                        {service.process.map((step, idx) => (
                          <div key={step} className={styles.step}>
                            <span className={styles.stepNum}>{idx + 1}</span>
                            <span className={styles.stepText}>{step}</span>
                            {idx < service.process.length - 1 && (
                              <Icons.HiChevronRight className={styles.stepArrow} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={styles.serviceCTA}>
                    <Button variant="outline" size="lg" aria-label={`Learn more about ${service.title}`}>Learn More About {service.title.split(' ')[0]}</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Trust Section */}
      <Section py="lg" bg="white">
        <Container>
          <div className={styles.trustBanner}>
            <div className={styles.trustText}>
              <h2 className={styles.trustTitle}>{data.trustBanner.title}</h2>
              <p className={styles.trustDesc}>{data.trustBanner.desc}</p>
            </div>
            <div className={styles.trustActions}>
              <Button as={Link} to={config.links.freeQuote} variant="primary" size="lg" className={styles.bannerBtn}>{data.trustBanner.primaryCTA}</Button>
              <Button as="a" href={config.business.whatsapp} target="_blank" rel="noopener noreferrer" variant="outline" size="lg" className={styles.bannerBtnWhite}>{data.trustBanner.secondaryCTA}</Button>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
