import React, { useState } from 'react';
import { HiCheckCircle, HiMapPin, HiArrowTopRightOnSquare, HiUser, HiPhone } from 'react-icons/hi2';
import { Button, Container, Section } from '../components/ui';
// import { content } from '../data/content';
import { useConfig } from '../hooks/useConfig';
import styles from './styles/Contact.module.css';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Custom Furniture Design',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { config } = useConfig();

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '').substring(0, 10);
    const match = cleaned.match(/^(\d{5})(\d{0,5})$/);
    if (match) {
      return !match[2] ? match[1] : `${match[1]} ${match[2]}`;
    }
    return cleaned;
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const rawPhone = formData.phone.replace(/\s/g, '');
    
    if (!/^[a-zA-Z\s]{1,265}$/.test(formData.name)) {
      newErrors.name = "Please enter a valid name";
    }
    
    if (!/^[6-9]\d{9}$/.test(rawPhone)) {
      newErrors.phone = "Invalid 10-digit phone number";
    }
    
    if (formData.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!/^[a-zA-Z0-9\s.,!?'"()\-]{1,512}$/.test(formData.message)) {
      newErrors.message = "Message too long or has invalid characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const formatted = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    const GoogleFormUrl = import.meta.env.VITE_API_GOOGLE_FORM_UNSHORTEN_LINK;
    
    if (!GoogleFormUrl) {
      console.error("Google Form URL missing");
      setIsSubmitting(false);
      return;
    }
    
    const submissionUrl = GoogleFormUrl.split('?')[0].replace('/viewform', '/formResponse');
    const params = new URLSearchParams();
    params.append('entry.1126050585', formData.name);
    params.append('entry.1867982687', formData.phone.replace(/\s/g, ''));
    if (formData.email) params.append('entry.397973429', formData.email);
    params.append('entry.375096659', `Visit Request: ${formData.interest}`);
    params.append('entry.22648990', formData.message);

    try {
      await fetch(submissionUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
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
                    Book a Factory Visit
                  </h2>
                  <p className={styles.subText}>
                    Experience our artisan craftsmanship first-hand at our Vyara technical workshop.
                  </p>

                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.fieldGroup}>
                      <div className={styles.formField}>
                        <label className={styles.label}>Name</label>
                        <input
                          name="name"
                          type="text"
                          required
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                        />
                        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                      </div>
                      <div className={styles.formField}>
                        <label className={styles.label}>Phone</label>
                        <input
                          name="phone"
                          type="tel"
                          required
                          placeholder="10-digit Mobile"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                        />
                        {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                      </div>
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.label}>Email</label>
                      <input
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      />
                      {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.label}>Interested in</label>
                      <select
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className={styles.select}
                        aria-label="Service of Interest"
                      >
                        <option>Custom Sofa Design</option>
                        <option>Bespoke Bedroom Furniture</option>
                        <option>Professional Sofa Repair</option>
                        <option>Office & Commercial Furniture</option>
                        <option>Turnkey Home Interiors</option>
                        <option>Other / General Inquiry</option>
                      </select>
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.label}>Message</label>
                      <textarea
                        name="message"
                        rows={3}
                        required
                        placeholder="Let us know when you'd like to visit or what you're looking for..."
                        value={formData.message}
                        onChange={handleChange}
                        className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                      ></textarea>
                      {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className={styles.submitBtn}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className={styles.spinner}></div>
                          Submitting...
                        </>
                      ) : (
                        'Request Factory Visit'
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                <div className={styles.successView}>
                  <div className={styles.successIconWrapper}>
                    <HiCheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className={styles.successTitle}>Inquiry Sent!</h3>
                  <p className={styles.successText}>
                    Thank you for booking a factory visit. Our manager will call you shortly to confirm your slot.
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
