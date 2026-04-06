import React from 'react';
import { Link } from 'react-router-dom';
import { HiRectangleGroup, HiWrenchScrewdriver, HiBuildingOffice2, HiSparkles, HiArrowRight } from 'react-icons/hi2';
import { Button, Container, Section } from '../components/ui';
import serviceImg from '../assets/service_sofa.png';
import { content } from '../data/content';
import styles from './styles/Services.module.css';

const iconMap: Record<string, React.ReactNode> = {
  HiWrenchScrewdriver: <HiWrenchScrewdriver />,
  HiRectangleGroup: <HiRectangleGroup />,
  HiBuildingOffice2: <HiBuildingOffice2 />,
  HiSparkles: <HiSparkles />,
};

const Services: React.FC = () => {
  return (
    <Section bg="white" py="lg" id="services">
      <Container>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.h2}>
              Our Specialty Services
            </h2>
            <p className={styles.subheadline}>
              From individual bespoke pieces to large-scale commercial orders, we bring the same level of artisan care to every project.
            </p>
          </div>
          <Link to="/services" className="hidden lg:flex">
            <Button variant="outline">
              View All Services
            </Button>
          </Link>
        </div>

        <div className={styles.grid}>
          {content.services.slice(0, 3).map((service, index) => (
            <div
              key={service.id}
              className={`${styles.card} ${index === 0 ? styles.featuredCard : ''}`}
            >
              <div className={styles.iconRow}>
                <div className={styles.iconWrapper}>
                  {iconMap[service.icon as string]}
                </div>
                <span className={styles.tag}>
                  {index === 0 ? "Most Popular" : index === 1 ? "Custom Focus" : "Bulk Ready"}
                </span>
              </div>

              <h3 className={styles.cardTitle}>
                {service.title}
              </h3>
              <p className={styles.cardDesc}>
                {service.shortDesc}
              </p>

              <div className={styles.ctaRow}>
                <Link
                  to={`/services#${service.id}`}
                  className={styles.ctaLink}
                >
                  Learn More
                  <HiArrowRight className={styles.arrowIcon} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Focus Image */}
        <div className={styles.caseStudy}>
          <div className={styles.caseStudyImageWrapper}>
            <img
              src={serviceImg}
              alt="Custom Furniture Design"
              className={styles.caseStudyImage}
            />
          </div>
          <div className={styles.caseStudyOverlay}>
            <div className={styles.caseStudyContent}>
              <span className={styles.caseStudyTag}>
                Featured Case Study
              </span>
              <h3 className={styles.caseStudyTitle}>
                Modern Living in Songadh: A Complete Custom Home
              </h3>
              <Link to="/services#full-renovation">
                <Button variant="primary" size="md">
                  View Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Services;
