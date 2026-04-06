import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Section, Button } from '../components/ui';
import Header from '../components/Header/Header';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import { content } from '../data/content';
import { HiMapPin, HiPhone, HiEnvelope, HiClock, HiCheckCircle } from 'react-icons/hi2';
import { FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa';
import styles from './styles/ContactPage.module.css';

interface ContactData {
  hero: {
    tag: string;
    title: string;
    sub: string;
    bgImage: string;
  };
  contactInfo: {
    phones: string[];
    emails: string[];
    hours: string[];
  };
  locations: Array<{
    city: string;
    branch: string;
    ownerName: string;
    contactNumber: string;
    instagramLink: string;
    whatsappLink: string;
    facebookLink: string;
    address: string;
    mapUrl: string;
  }>;
  brandNote: {
    title: string;
    text: string;
  };
}

const ContactPage: React.FC = () => {
  const [data, setData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetch('/data/contact.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch contact data:", error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (loading || !data) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <SEO {...content.seo.contact} />
      <Header />
      
      {/* Hero Section */}
      <section 
        className={styles.hero}
        style={{ backgroundImage: `linear-gradient(rgba(10, 8, 5, 0.6), rgba(10, 8, 5, 0.8)), url(${data.hero.bgImage})` }}
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

      {/* Main Contact Section */}
      <Section py="lg" bg="white">
        <Container>
          <div className={styles.mainGrid}>
            {/* Form Column */}
            <div className={styles.formContainer}>
              {!isSubmitted ? (
                <div className={styles.formCard}>
                  <h2 className={styles.formTitle}>Send an Inquiry</h2>
                  <p className={styles.formDesc}>We'll get back to you with a direct-from-factory quote.</p>
                  
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                      <div className={styles.formField}>
                        <label>Name</label>
                        <input type="text" placeholder="Your Name" required />
                      </div>
                      <div className={styles.formField}>
                        <label>Phone</label>
                        <input type="tel" placeholder="+91 00000 00000" required />
                      </div>
                    </div>
                    <div className={styles.formField}>
                      <label>Email (Optional)</label>
                      <input type="email" placeholder="your@email.com" />
                    </div>
                    <div className={styles.formField}>
                      <label>Service Area</label>
                      <select>
                        <option>Direct Purchase (Ready-made)</option>
                        <option>Custom Furniture Design</option>
                        <option>Full Home Renovation</option>
                        <option>Commercial/Office Project</option>
                        <option>Restoration/Repair</option>
                      </select>
                    </div>
                    <div className={styles.formField}>
                      <label>Your Message</label>
                      <textarea rows={5} placeholder="Tell us what you're looking for..."></textarea>
                    </div>
                    <Button type="submit" variant="primary" size="lg" className="w-full">Submit Request</Button>
                  </form>
                </div>
              ) : (
                <div className={styles.successState}>
                  <HiCheckCircle style={{ fontSize: '4rem', color: 'var(--color-forest-green)' }} />
                  <h2>Message Received!</h2>
                  <p>Our lead designer will contact you shortly to discuss your project.</p>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                </div>
              )}
            </div>

            {/* Quick Contact Info */}
            <div className={styles.infoColumn}>
              <div className={styles.infoGroup}>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}><HiPhone /></div>
                  <div className={styles.infoText}>
                    <h3>Call Us</h3>
                    {data.contactInfo.phones.map(p => <p key={p}>{p}</p>)}
                  </div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}><HiEnvelope /></div>
                  <div className={styles.infoText}>
                    <h3>Email Support</h3>
                    {data.contactInfo.emails.map(e => <p key={e}>{e}</p>)}
                  </div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}><HiClock /></div>
                  <div className={styles.infoText}>
                    <h3>Working Hours</h3>
                    {data.contactInfo.hours.map(h => <p key={h}>{h}</p>)}
                  </div>
                </div>
              </div>

              <div className={styles.brandNote}>
                <h3>{data.brandNote.title}</h3>
                <p>{data.brandNote.text}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Interactive Maps Section */}
      <Section py="lg" bg="cream">
        <Container>
          <div className={styles.mapsHeader}>
            <span className={styles.mapsTag}>Our Presence</span>
            <h2 className={styles.mapsTitle}>Our Offices & Factory</h2>
            <p className={styles.mapsSub}>Visit our showrooms or technical workshop to see our process in action</p>
          </div>

          <div className={styles.locationsGrid}>
            {data.locations.map((loc, index) => (
              <motion.div 
                key={loc.branch}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={styles.locationBlock}
              >
                <div className={styles.mapWrap}>
                  <iframe 
                    src={loc.mapUrl}
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy"
                    title={`Nilkanth Enterprises ${loc.branch}`}
                  ></iframe>
                </div>
                <div className={styles.locDetails}>
                  <div className={styles.locIcon}><HiMapPin /></div>
                  <div className={styles.locInfo}>
                    <h3 className={styles.branchName}>{loc.branch}</h3>
                    <p className={styles.ownerName}>Manager: {loc.ownerName}</p>
                    <p className={styles.addressText}>{loc.address}</p>
                    
                    <div className={styles.locActions}>
                      <a href={`tel:${loc.contactNumber.replace(/\s/g, '')}`} className={styles.phoneLink}>
                        <HiPhone /> {loc.contactNumber}
                      </a>
                      
                      <div className={styles.socialBar}>
                        <a href={loc.whatsappLink} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} title="WhatsApp">
                          <FaWhatsapp />
                        </a>
                        <a href={loc.instagramLink} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} title="Instagram">
                          <FaInstagram />
                        </a>
                        <a href={loc.facebookLink} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} title="Facebook">
                          <FaFacebook />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
};

export default ContactPage;
