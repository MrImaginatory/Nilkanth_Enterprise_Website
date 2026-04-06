import React from 'react';
import { HiXMark, HiHome, HiBriefcase, HiRectangleGroup, HiShieldCheck, HiChatBubbleLeftEllipsis, HiChevronRight, HiSparkles, HiSquare2Stack } from 'react-icons/hi2';
import { content } from '../../data/content';
import { Link } from 'react-router-dom';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : styles.backdropClosed}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : styles.drawerClosed}`}
      >
        <div className={styles.drawerContent}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close Menu"
          >
            <HiXMark className="w-10 h-10" />
          </button>

          {/* Logo in Menu */}
          <div className={styles.logoContainer}>
            <span className={styles.logoName}>
              {content.business.name.split(' ')[0]}
            </span>
            <span className={styles.logoTagline}>
              {content.business.name.split(' ')[1]}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className={styles.nav}>
            {content.business.navigation.map((link) => (
              <Link
                key={link.name}
                to={link.href.startsWith('#') ? `/${link.href}` : link.href}
                onClick={onClose}
                className={styles.navLink}
              >
                <div className={styles.navLinkContent}>
                  {link.name === 'Home' && <HiHome className="w-5 h-5 text-wood-brown" />}
                  {link.name === 'Services' && <HiBriefcase className="w-5 h-5 text-wood-brown" />}
                  {link.name === 'Products' && <HiRectangleGroup className="w-5 h-5 text-wood-brown" />}
                  {link.name === 'Packages' && <HiSquare2Stack className="w-5 h-5 text-wood-brown" />}
                  {link.name === 'Projects' && <HiSparkles className="w-5 h-5 text-wood-brown" />}
                  {link.name === 'About' && <HiShieldCheck className="w-5 h-5 text-wood-brown" />}
                  {link.name === 'Contact' && <HiChatBubbleLeftEllipsis className="w-5 h-5 text-wood-brown" />}
                  <span className={styles.navLinkText}>
                    {link.name}
                  </span>
                </div>
                <HiChevronRight className="w-5 h-5 text-neutral-300" />
              </Link>
            ))}
          </nav>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              3 Locations: Songadh, Vyara, Bardoli
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
