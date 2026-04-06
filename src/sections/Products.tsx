import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Container, Section } from '../components/ui';
import styles from './styles/Products.module.css';

const Products: React.FC = () => {
  return (
    <Section id="products" bg="cream" py="lg">
      <Container>
        <div className={styles.ctaWrapper}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.content}
          >
            <span className={styles.tag}>Our Collection</span>
            <h2 className={styles.title}>
              Exquisite Furniture <br /> 
              <span>Built for Generations.</span>
            </h2>
            <p className={styles.description}>
              From hand-carved teak sofas to modern ergonomic office solutions, 
              explore our full range of factory-direct artisan furniture.
            </p>
            <div className={styles.actions}>
              <Link to="/products">
                <Button variant="primary" size="lg" className={styles.exploreBtn}>
                  Explore All Collections
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <div className={styles.decorativeElements}>
             <div className={styles.circle}></div>
             <div className={styles.accentLine}></div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Products;
