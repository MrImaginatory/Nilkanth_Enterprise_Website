import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Section, Button } from '../components/ui';
import Header from '../components/Header/Header';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import { content } from '../data/content';
import * as Icons from 'react-icons/hi2';
import styles from './styles/AboutPage.module.css';

interface AboutData {
  hero: {
    tag: string;
    title: string;
    sub: string;
    bgImage: string;
  };
  philosophy: {
    title: string;
    paragraphs: string[];
    values: Array<{ id: string; label: string }>;
    image: string;
  };
  timeline: {
    header: {
      title: string;
      sub: string;
    };
    events: Array<{
      date: string;
      title: string;
      desc: string;
      icon: string;
    }>;
  };
  cta: {
    title: string;
    text: string;
    buttonText: string;
  };
}

const AboutPage: React.FC = () => {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/about.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch about data:", error);
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
      <SEO {...content.seo.about} />
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

      {/* Philosophy Section */}
      <Section py="lg" bg="white">
        <Container>
          <div className={styles.philosophyGrid}>
            <div className={styles.philosophyText}>
              <h2 className={styles.sectionTitle}>{data.philosophy.title}</h2>
              {data.philosophy.paragraphs.map((p, i) => (
                <p key={i} className={styles.p}>{p}</p>
              ))}
              <div className={styles.values}>
                {data.philosophy.values.map(value => (
                  <div key={value.id} className={styles.valueItem}>
                    <span className={styles.valueNumber}>{value.id}</span>
                    <h3>{value.label}</h3>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.philosophyImageWrapper}>
              <img src={data.philosophy.image} alt="Our Workshop" className={styles.philosophyImage} />
              <div className={styles.imageOverlay}></div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Timeline Section */}
      <Section py="lg" bg="cream">
        <Container>
          <div className={styles.timelineHeader}>
            <h2 className={styles.sectionTitleCenter}>{data.timeline.header.title}</h2>
            <p className={styles.sectionSubCenter}>{data.timeline.header.sub}</p>
          </div>
          
          <div className={styles.timelineContainer}>
            <div className={styles.timelineLine}></div>
            
            {data.timeline.events.map((item, index) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
              >
                <div className={styles.timelineMarker}>
                  <div className={styles.markerPoint}>
                    {getIcon(item.icon)}
                  </div>
                </div>
                <div className={styles.timelineCard}>
                  <span className={styles.itemDate}>{item.date}</span>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDesc}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Factory CTA */}
      <Section py="lg" bg="none" className={styles.factoryCta}>
        <Container>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>{data.cta.title}</h2>
            <p className={styles.ctaText}>{data.cta.text}</p>
            <Button variant="primary" size="lg">{data.cta.buttonText}</Button>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
};

export default AboutPage;
