import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Container, Logo } from '../components/ui';
import { Link } from 'react-router-dom';
import { content } from '../data/content';
import { useConfig } from '../hooks/useConfig';
import styles from './styles/Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { config } = useConfig();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.brandName}>
              <Logo size={42} color="white" />
              <div className={styles.brandText}>
                <span className={styles.brandMain}>
                  {content.business.name.split(' ')[0]}
                </span>
                <span className={styles.brandSub}>
                  {content.business.name.split(' ')[1]}
                </span>
              </div>
            </div>
            <p className={styles.brandDesc}>
              Songadh's premier custom furniture experts since 2024. Factory-direct quality, artisan craftsmanship, and unbeatable value for your home and office.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h3 className={styles.linkTitle}>Quick Links</h3>
            <ul className={styles.linksList}>
              {content.business.navigation.map(link => (
                <li key={link.name}>
                  <Link to={link.href} className={styles.footerLink}>
                    <span className={styles.linkDot}></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className={styles.linksSection}>
            <h3 className={styles.linkTitle}>Our Branches</h3>
            <ul className={styles.linksList}>
              {content.business.locations.map((loc, index) => (
                <li key={loc.branch || index} className={styles.locationItem}>
                  <span className={styles.cityLabel}>{loc.city}</span>
                  <span className={styles.addressText}>{loc.address}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className={styles.linksSection}>
            <h3 className={styles.linkTitle}>Get In Touch</h3>
            <div className={styles.contactInfo}>
              <a href={`tel:${config.business.mobile.replace(/\s+/g, '')}`} className={styles.phoneLink}>
                {config.business.mobile}
              </a>
              <p className={styles.phoneLabel}>Primary Contact</p>
            </div>

            <div className={styles.socials}>
              <a href={config.business.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Facebook">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href={config.business.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href={config.business.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="WhatsApp">
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} {content.business.name}. All Rights Reserved.
            <span className="mx-2 hidden md:inline">|</span>
            Designed for Modern Artisan Homes.
          </p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Privacy Policy</a>
            <a href="#" className={styles.legalLink}>Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
