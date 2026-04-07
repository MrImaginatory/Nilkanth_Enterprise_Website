import React, { useState, useEffect } from 'react';
import { HiBars3, HiXMark, HiPhone } from 'react-icons/hi2';
import { Button, Container, Logo } from '../ui';
import { content } from '../../data/content';
import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import { useConfig } from '../../hooks/useConfig';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { config } = useConfig();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <Container>
        <nav className={styles.nav}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <Logo size={32} color="var(--color-wood-brown)" />
            <div className={styles.logoText}>
              <span className={styles.logoName}>
                {content.business.name.split(' ')[0]}
              </span>
              <span className={styles.logoTagline}>
                {content.business.name.split(' ')[1]}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            <div className={styles.navLinks}>
              {content.business.navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.href.startsWith('#') ? `/${link.href}` : link.href}
                  className={styles.navLink}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className={styles.desktopContact}>
              <div className={styles.phoneInfo}>
                <HiPhone className="w-4 h-4 text-warm-amber" />
                <span className={styles.phoneNumber}>{config.business.mobile}</span>
              </div>
              <Link to={config.links.freeQuote}>
                <Button variant="primary" size="sm" className="shadow-none">
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>

          <div className={styles.mobileToggle}>
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className={styles.menuButton}
              aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMobileMenuOpen ? (
                <HiXMark className="w-10 h-10" />
              ) : (
                <HiBars3 className="w-10 h-10" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
