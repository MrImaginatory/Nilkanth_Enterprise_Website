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
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceArea: 'Direct Purchase (Ready-made)',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      newErrors.name = "Please enter a valid name (letters and spaces only)";
    }
    
    if (!/^[6-9]\d{9}$/.test(rawPhone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number starting with 6-9";
    }
    
    if (formData.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!/^[a-zA-Z\s()/\-]{1,265}$/.test(formData.serviceArea)) {
      newErrors.serviceArea = "Invalid service area selected";
    }
    
    if (!/^[a-zA-Z0-9\s.,!?'"()\-]{1,512}$/.test(formData.message)) {
      newErrors.message = "Message contains invalid characters or is too long";
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

    // Clear error for this field
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
      console.error("Google Form URL not found in environment variables");
      alert("Something went wrong. Please try again later.");
      setIsSubmitting(false);
      return;
    }
    
    // Transform viewform URL to formResponse and strip query params
    const submissionUrl = GoogleFormUrl.split('?')[0].replace('/viewform', '/formResponse');
    
    const params = new URLSearchParams();
    params.append('entry.1126050585', formData.name);
    params.append('entry.1867982687', formData.phone.replace(/\s/g, ''));
    if (formData.email) params.append('entry.397973429', formData.email);
    params.append('entry.375096659', formData.serviceArea);
    params.append('entry.22648990', formData.message);

    try {
      await fetch(submissionUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Form submission failed:", error);
      alert("Submission failed. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                        <input 
                          name="name"
                          type="text" 
                          placeholder="Your Name" 
                          value={formData.name}
                          onChange={handleChange}
                          className={errors.name ? styles.inputError : ''}
                          required 
                        />
                        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                      </div>
                      <div className={styles.formField}>
                        <label>Phone</label>
                        <input 
                          name="phone"
                          type="tel" 
                          placeholder="+91 00000 00000" 
                          value={formData.phone}
                          onChange={handleChange}
                          className={errors.phone ? styles.inputError : ''}
                          required 
                        />
                        {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                      </div>
                    </div>
                    <div className={styles.formField}>
                      <label>Email (Optional)</label>
                      <input 
                        name="email"
                        type="email" 
                        placeholder="your@email.com" 
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? styles.inputError : ''}
                      />
                      {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                    </div>
                    <div className={styles.formField}>
                      <label>Service Area</label>
                      <select 
                        name="serviceArea"
                        value={formData.serviceArea}
                        onChange={handleChange}
                        aria-label="Service Area"
                      >
                        <option>Direct Purchase (Ready-made)</option>
                        <option>Custom Furniture Design</option>
                        <option>Full Home Renovation</option>
                        <option>Commercial/Office Project</option>
                        <option>Restoration/Repair</option>
                      </select>
                      {errors.serviceArea && <span className={styles.errorText}>{errors.serviceArea}</span>}
                    </div>
                    <div className={styles.formField}>
                      <label>Your Message</label>
                      <textarea 
                        name="message"
                        rows={5} 
                        placeholder="Tell us what you're looking for..."
                        value={formData.message}
                        onChange={handleChange}
                        className={errors.message ? styles.inputError : ''}
                        required
                      ></textarea>
                      {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                    </div>
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </Button>
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
