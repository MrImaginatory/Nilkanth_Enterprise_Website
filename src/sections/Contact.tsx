import React, { useState } from 'react';
import { HiCheckCircle, HiMapPin, HiArrowTopRightOnSquare, HiUser, HiPhone } from 'react-icons/hi2';
import { Button, Container, Section } from '../components/ui';
// import { content } from '../data/content';
import { useConfig } from '../hooks/useConfig';
import styles from './styles/Contact.module.css';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { config } = useConfig();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <Section id="contact" bg="cream-dark" py="lg">
      <Container>
        <div className={styles.flexContainer}>
          {/* Contact Form Column */}
          <div className={styles.formColumn}>
            <div className={styles.formCard}>
              {!isSubmitted ? (
                <>
                  <h2 className={styles.h2}>
                    Start Your Project
                  </h2>
                  <p className={styles.subText}>
                    Fill out the form below and our team will get back to you within 24 hours for a free consultation.
                  </p>

                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.fieldGroup}>
                      <div className={styles.formField}>
                        <label className={styles.label}>Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Nilkanth Patel"
                          className={styles.input}
                        />
                      </div>
                      <div className={styles.formField}>
                        <label className={styles.label}>Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 99000 00000"
                          className={styles.input}
                        />
                      </div>
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.label}>Service Interested In</label>
                      <select className={styles.select}>
                        <option>Custom Sofa Design</option>
                        <option>Bespoke Bedroom Furniture</option>
                        <option>Professional Sofa Repair</option>
                        <option>Office & Commercial Furniture</option>
                        <option>Other / General Inquiry</option>
                      </select>
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.label}>Message (Optional)</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your space or furniture needs..."
                        className={styles.textarea}
                      ></textarea>
                    </div>

                    <Button type="submit" variant="primary" size="lg" className={styles.submitBtn}>
                      Request Free Quote
                    </Button>
                  </form>
                </>
              ) : (
                <div className={styles.successView}>
                  <div className={styles.successIconWrapper}>
                    <HiCheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className={styles.successTitle}>Inquiry Received!</h3>
                  <p className={styles.successText}>
                    Thank you for choosing Nilkanth Enterprises. Our design expert will call you shortly.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-10"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Inquiry
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Locations Column */}
          <div className={styles.locationsColumn}>
            <span className={styles.locationTag}>
              Our Locations
            </span>
            <h2 className={styles.locationsTitle}>
              Visit Our <span>Showrooms.</span>
            </h2>

            <div className={styles.locationList}>
              {(config.business.locations.length > 0 ? config.business.locations : []).map((loc) => (
                <div
                  key={loc.city}
                  className={styles.locationCard}
                >
                  <div className={styles.locationInfo}>
                    <div className={styles.mapIconWrapper}>
                      <HiMapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={styles.cityTitle}>{loc.city}</h3>
                      <p className={styles.addressText}>
                        {loc.address}
                      </p>
                      
                      <div className={styles.tileDetails}>
                        <div className={styles.tileDetailItem}>
                          <HiUser className="w-4 h-4 text-warm-amber" />
                          <span>{loc.owner}</span>
                        </div>
                        <div className={styles.tileDetailItem}>
                          <HiPhone className="w-4 h-4 text-warm-amber" />
                          <a href={`tel:${loc.phone.replace(/\s+/g, '')}`} className={styles.tilePhoneLink}>
                            {loc.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.externalLink}
                    aria-label={`View ${loc.city} on Google Maps`}
                  >
                    <HiArrowTopRightOnSquare className="w-6 h-6" />
                  </a>
                </div>
              ))}
            </div>

            <div className={styles.socialProof}>
              <div className={styles.avatars}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={styles.avatar}></div>
                ))}
              </div>
              <p className={styles.proofText}>
                Join 500+ families who trusted us last year.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Contact;
