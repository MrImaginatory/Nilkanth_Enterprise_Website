import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  href?: string;
}

type ButtonProps<T extends React.ElementType> = BaseButtonProps & {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

const Button = <T extends React.ElementType = 'button'>({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  href,
  as,
  ...props
}: ButtonProps<T>) => {
  const Component = as || (href ? 'a' : 'button');
  
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  if (href && !as) {
    return (
      <a
        href={href}
        className={buttonClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <Component
      className={buttonClasses}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
