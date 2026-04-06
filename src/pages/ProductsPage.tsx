import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Section, Button } from '../components/ui';
import Header from '../components/Header/Header';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import { content } from '../data/content';
import { HiFunnel, HiMagnifyingGlass, HiXMark, HiCheckBadge } from 'react-icons/hi2';
import styles from './styles/ProductsPage.module.css';

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: string;
  features: string[];
  description: string;
}

interface ProductsData {
  hero: {
    tag: string;
    title: string;
    sub: string;
    bgImage: string;
  };
  products: Product[];
}

const ProductsPage: React.FC = () => {
  const [data, setData] = useState<ProductsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        const response = await fetch('/data/products.json');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = data ? ['All', ...Array.from(new Set(data.products.map(p => p.category)))] : [];

  const filteredProducts = data?.products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  if (loading || !data) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.spinner}></div>
        <p>Unlocking Artisan Designs...</p>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <SEO {...content.seo.products} />
      <Header />

      <section 
        className={styles.hero}
        style={{ backgroundImage: `linear-gradient(rgba(10, 8, 5, 0.7), rgba(10, 8, 5, 0.8)), url(${data.hero.bgImage})` }}
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

      <Section py="md" bg="cream">
        <Container>
          {/* Controls Bar */}
          <div className={styles.controlsBar}>
            <div className={styles.searchWrapper}>
              <HiMagnifyingGlass className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search furniture collections..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.filterGroup}>
              <HiFunnel className={styles.filterIcon} />
              <div className={styles.categoryChips}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`${styles.chip} ${activeCategory === cat ? styles.activeChip : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={styles.gridContainer}>
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className={styles.grid}
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={styles.productCard}
                  >
                    <div className={styles.imageBox}>
                      <img src={product.image} alt={product.name} className={styles.productImage} />
                      <div className={styles.categoryBadge}>{product.category}</div>
                    </div>

                    <div className={styles.cardInfo}>
                      <div className={styles.contentWrap}>
                        <h3 className={styles.productName}>{product.name}</h3>
                        <p className={styles.productDesc}>{product.description}</p>

                        <div className={styles.featureTags}>
                          {product.features.map(f => (
                            <span key={f} className={styles.tag}>
                              <HiCheckBadge className={styles.checkIcon} /> {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.cardFooter}>
                        <div className={styles.priceInfo}>
                          <span className={styles.priceLabel}>Factory Price</span>
                          <span className={styles.priceValue}>{product.price}</span>
                        </div>
                        <Button variant="primary" size="md" className={styles.detailsBtn}>Request Quote</Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <div className={styles.noResults}>
                <HiXMark className={styles.noResultsIcon} />
                <h3>No pieces found</h3>
                <p>Try adjusting your search or category filter.</p>
                <Button variant="outline" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
