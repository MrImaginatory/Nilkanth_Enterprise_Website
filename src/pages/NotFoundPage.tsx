import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container, Button } from '../components/ui';
import Header from '../components/Header/Header';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import styles from './styles/NotFoundPage.module.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundWrapper}>
      <SEO title="404 Page Not Found | Nilkanth Enterprises" description="Oops! This piece of the puzzle is missing. Return to the Nilkanth Enterprises homepage to explore our custom furniture and woodworking solutions." />
      <Header />

      <main className={styles.mainContent}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.contentContainer}
          >
            <div className={styles.illustrationContainer}>
              <span className={styles.errorLabel}>404</span>
              <motion.img
                src="/assets/images/404.webp"
                alt="404 - Not Found"
                className={styles.illustration}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              />
            </div>

            <h1 className={styles.title}>Oops! This piece of the puzzle is missing.</h1>
            <p className={styles.description}>
              We couldn't find the page you're looking for. It might have been moved, deleted,
              or perhaps it never existed in the first place—just like a chair without legs!
            </p>

            <div className={styles.ctaContainer}>
              <Button as={Link} to="/" variant="primary" size="lg">
                Back to the Showroom
              </Button>
              <Button as={Link} to="/contact" variant="outline" size="lg">
                Report an Issue
              </Button>
            </div>
          </motion.div>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
