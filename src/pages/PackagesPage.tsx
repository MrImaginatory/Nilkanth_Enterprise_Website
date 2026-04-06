import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../sections/Footer';
import Packages from '../sections/Packages';
import SEO from '../components/SEO';
import { content } from '../data/content';
import styles from './styles/PackagesPage.module.css';

const PackagesPage: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <SEO {...content.seo.packages} />
      <Header />
      <main className={styles.mainContent}>
        <Packages />
      </main>
      <Footer />
    </div>
  );
};

export default PackagesPage;
