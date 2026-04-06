import styles from './Section.module.css';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  bg?: 'cream' | 'white' | 'cream-dark' | 'wood-brown' | 'forest-green' | 'none';
  id?: string;
  py?: 'sm' | 'md' | 'lg' | 'none';
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  bg = 'none',
  id,
  py = 'md',
}) => {
  const sectionClasses = [
    styles.section,
    bg !== 'none' && styles[bg === 'cream-dark' ? 'creamDark' : bg === 'wood-brown' ? 'woodBrown' : bg === 'forest-green' ? 'forestGreen' : bg],
    py !== 'none' && styles[py],
    className
  ].filter(Boolean).join(' ');

  return (
    <section id={id} className={sectionClasses}>
      {children}
    </section>
  );
};

export default Section;
