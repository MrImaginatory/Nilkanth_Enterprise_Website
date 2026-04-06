import { FaWhatsapp } from 'react-icons/fa';
import { Button, Container, Section } from '../components/ui';
import { useConfig } from '../hooks/useConfig';
import styles from './styles/FinalCTA.module.css';

const FinalCTA: React.FC = () => {
  const { config } = useConfig();

  return (
    <Section bg="forest-green" py="lg" className={styles.section}>
      {/* Abstract Background Design */}
      <div className={styles.pattern}></div>
      <div className={styles.glowOne}></div>
      <div className={styles.glowTwo}></div>

      <Container>
        <div className={styles.content}>
          <span className={styles.tag}>
            The Artisan's Promise
          </span>
          <h2 className={styles.h2}>
            Ready to Design Your <span className={styles.h2Highlight}>Legacy?</span>
          </h2>
          <p className={styles.p}>
            Join 500+ families who chose factory-direct quality last year. Let's transform your space with bespoke craftsmanship.
          </p>

          <div className={styles.btnContainer}>
            <Button 
              size="lg" 
              className={styles.primaryBtn}
              href={config.links.freeQuote}
            >
              Get Your Free Quote
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className={styles.secondaryBtn}
              href={config.links.talkToExperts}
            >
              <FaWhatsapp className={styles.whatsappIcon} />
              WhatsApp Our Expert
            </Button>
          </div>

          <p className={styles.footerText}>
            3 Locations: Songadh • Vyara • Bardoli
          </p>
        </div>
      </Container>
    </Section>
  );
};

export default FinalCTA;
