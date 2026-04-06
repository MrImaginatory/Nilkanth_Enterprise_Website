import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Section, Button } from '../components/ui';
import Header from '../components/Header/Header';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import { content } from '../data/content';
import { HiMapPin, HiTag } from 'react-icons/hi2';
import styles from './styles/ProjectsPage.module.css';

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  description: string;
  tags: string[];
}

interface ProjectsData {
  hero: {
    tag: string;
    title: string;
    sub: string;
    bgImage: string;
  };
  projects: Project[];
}

const ProjectsPage: React.FC = () => {
  const [data, setData] = useState<ProjectsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch projects data:", error);
        setLoading(false);
      });
  }, []);

  const categories = data ? ['All', ...Array.from(new Set(data.projects.map(p => p.category)))] : [];

  const filteredProjects = data?.projects.filter(p =>
    activeCategory === 'All' || p.category === activeCategory
  ) || [];

  if (loading || !data) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <SEO {...content.seo.projects} />
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

      {/* Filter Bar */}
      <Section py="md" bg="white">
        <Container>
          <div className={styles.filterBar}>
            <div className={styles.categories}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Gallery */}
          <div className={styles.galleryGrid}>
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={styles.projectCard}
                >
                  <div className={styles.imageBox}>
                    <img src={project.image} alt={project.title} />
                    <div className={styles.overlay}>
                      <div className={styles.overlayContent}>
                        <span className={styles.locBadge}>
                          <HiMapPin /> {project.location}
                        </span>
                        <h3>{project.title}</h3>
                        <div className={styles.tags}>
                          {project.tags.map(tag => (
                            <span key={tag} className={styles.projectTag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.cardDetails}>
                    <div className={styles.categoryInfo}>
                      <HiTag /> {project.category}
                    </div>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardDesc}>{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section py="lg" bg="cream">
        <Container>
          <div className={styles.ctaBox}>
            <h2>Do you have a custom project in mind?</h2>
            <p>Our artisans are ready to bring your specific vision to life with precision and care.</p>
            <Button variant="primary" size="lg">Start Your Custom Project</Button>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
