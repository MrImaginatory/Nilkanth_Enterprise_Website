import React, { useState, useEffect, useRef } from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Container, Logo } from '../components/ui';
import { Link } from 'react-router-dom';
import { content } from '../data/content';
import { useConfig } from '../hooks/useConfig';
import styles from './styles/Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { config } = useConfig();

  const [svgHtml, setSvgHtml] = useState<string>('');
  const [hasAnimated, setHasAnimated] = useState(false);
  const svgRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // Fetch SVG, strip inline dimensions, and remove padding for full-width display
  useEffect(() => {
    fetch('/NilkanthEnterprise.svg')
      .then((res) => res.text())
      .then((text) => {
        const cleaned = text
          .replace(/width="[^"]*"/, '')
          .replace(/height="[^"]*"/, '')
          .replace(/viewBox="[^"]*"/, 'viewBox="0 0 685.3 103.975"')
          .replace('<svg ', '<svg preserveAspectRatio="none" ');
        setSvgHtml(cleaned);
      });
  }, []);

  // Intersection Observer to trigger animation on scroll
  useEffect(() => {
    if (hasAnimated || !svgHtml) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Wait for DOM to render the SVG
          setTimeout(() => {
            const container = svgRef.current;
            if (!container) return;

            const path = container.querySelector('path');
            if (!path) return;

            const length = path.getTotalLength();

            path.style.strokeDasharray = `${length}`;
            path.style.strokeDashoffset = `${length}`;
            path.style.fill = 'transparent';
            path.style.transition = 'none';

            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                path.style.transition = `
                  stroke-dashoffset 1.6s cubic-bezier(0.65, 0, 0.35, 1) 0.15s,
                  fill 0.9s ease-in-out 1.5s
                `;
                path.style.strokeDashoffset = '0';
                path.style.fill = 'white';
              });
            });
          }, 100);
        }
      },
      { threshold: 0.3 }
    );

    const el = footerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [svgHtml, hasAnimated]);

  return (
    <footer ref={footerRef} className={styles.footer}>
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

        {/* Footer Logo Animation */}
        <div className={styles.footerLogoSection}>
          <div
            ref={svgRef}
            className={styles.footerLogoSvg}
            dangerouslySetInnerHTML={{ __html: svgHtml }}
          />
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
