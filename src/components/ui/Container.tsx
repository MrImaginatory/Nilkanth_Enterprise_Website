import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  large?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  large = false,
}) => {
  const containerClasses = [
    styles.container,
    large ? styles.large : styles.medium,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};

export default Container;
