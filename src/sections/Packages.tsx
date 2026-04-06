import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Section, Button } from '../components/ui';
import styles from './styles/Packages.module.css';

interface PackageItem {
  name: string;
  price: number;
}

interface Category {
  name: string;
  items: PackageItem[];
}

interface FurniturePackage {
  id: string;
  title: string;
  description: string;
  categories: Category[];
  totalPrice: number;
  salePrice: number;
  image: string;
}

const Packages: React.FC = () => {
  const [packages, setPackages] = useState<FurniturePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/data/packages.json');
        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }
        const data = await response.json();
        setPackages(data);
        if (data.length > 0) {
          setSelectedPackage(data[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <Section py="lg">
        <Container>
          <div className={styles.loading}>Loading packages...</div>
        </Container>
      </Section>
    );
  }

  if (error) {
    return (
      <Section py="lg">
        <Container>
          <div className={styles.error}>{error}</div>
        </Container>
      </Section>
    );
  }

  const currentPackage = packages.find(p => p.id === selectedPackage) || packages[0];

  return (
    <Section id="home-furnishing-packages" py="lg" bg="white">
      <Container>
        <div className={styles.header}>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.tag}
          >
            Exclusive Offers
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={styles.title}
          >
            Complete Home Furnishing <span>Packages</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={styles.subtitle}
          >
            Transform your living space with our curated furniture bundles designed for premium comfort and style.
          </motion.p>
        </div>

        <div className={styles.packageSwitcher}>
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              className={`${styles.switchBtn} ${selectedPackage === pkg.id ? styles.active : ''}`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {currentPackage && (
            <motion.div 
              key={currentPackage.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className={styles.packageCard}
            >
              <div className={styles.imageSection}>
                <img src={currentPackage.image} alt={currentPackage.title} className={styles.image} />
                <div className={styles.priceTag}>
                  <span className={styles.discount}>
                    save ₹{(currentPackage.totalPrice - currentPackage.salePrice).toLocaleString()}
                  </span>
                  <div className={styles.salePrice}>₹{currentPackage.salePrice.toLocaleString()}</div>
                  <div className={styles.originalPrice}>₹{currentPackage.totalPrice.toLocaleString()}</div>
                </div>
              </div>

              <div className={styles.detailsSection}>
                <h3 className={styles.packageTitle}>{currentPackage.title}</h3>
                <p className={styles.packageDesc}>{currentPackage.description}</p>
                
                <div className={styles.categoriesContainer}>
                  {currentPackage.categories.map((category, catIdx) => (
                    <div key={catIdx} className={styles.categoryBlock}>
                      <h4 className={styles.categoryName}>{category.name}</h4>
                      <div className={styles.itemsTableWrapper}>
                        <table className={styles.itemsTable}>
                          <thead>
                            <tr>
                              <th>Item</th>
                              <th className={styles.priceCol}>Price (₹)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {category.items.map((item, idx) => (
                              <tr key={idx}>
                                <td>{item.name}</td>
                                <td className={styles.priceCol}>₹{item.price.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                  
                  <div className={styles.summaryBlock}>
                    <div className={styles.summaryRow}>
                      <span>Total Value:</span>
                      <span className={styles.totalValue}>₹{currentPackage.totalPrice.toLocaleString()}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span>Package Discount:</span>
                      <span className={styles.discountValue}>
                        -₹{(currentPackage.totalPrice - currentPackage.salePrice).toLocaleString()}
                      </span>
                    </div>
                    <div className={`${styles.summaryRow} ${styles.finalPriceRow}`}>
                      <span>Special Offer Price:</span>
                      <span className={styles.salePriceValue}>₹{currentPackage.salePrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.actions}>
                  <Button variant="primary" size="lg" className={styles.ctaBtn}>
                    Book This Package
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
};

export default Packages;
