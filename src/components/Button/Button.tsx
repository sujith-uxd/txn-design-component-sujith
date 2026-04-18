import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The semantic intent of the button. */
  intent?: 'blue' | 'red' | 'green' | 'orange' | 'white' | 'transparent';
  /** The hierarchy level of the action. */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** The size of the button based on context density. */
  size?: 'sm' | 'md' | 'lg';
  /** Optional Font Awesome 6 icon element to place before text. */
  iconLeading?: React.ReactNode;
  /** Optional Font Awesome 6 icon element to place after text. */
  iconTrailing?: React.ReactNode;
  /** Set to true if the button contains only an icon (requires tooltip in parent). */
  iconOnly?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  intent = 'blue',
  variant = 'primary',
  size = 'md',
  iconLeading,
  iconTrailing,
  iconOnly,
  children,
  className,
  disabled,
  ...props
}, ref) => {
  // Guard rails based on design specs
  // White and Transparent only ship Primary variant
  const finalVariant = (intent === 'white' || intent === 'transparent') ? 'primary' : variant;

  const baseClass = 'txn-btn';
  const classNames = [
    baseClass,
    `${baseClass}--${intent}`,
    `${baseClass}--${finalVariant}`,
    `${baseClass}--${size}`,
    iconOnly ? `${baseClass}--icon-only` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      ref={ref}
      className={classNames} 
      disabled={disabled}
      {...props}
    >
      {iconLeading && <span className={`${baseClass}__icon-leading`}>{iconLeading}</span>}
      
      {!iconOnly && children && <span className={`${baseClass}__label`}>{children}</span>}
      
      {iconOnly && children && <span className={`${baseClass}__icon-only`}>{children}</span>}
      
      {iconTrailing && <span className={`${baseClass}__icon-trailing`}>{iconTrailing}</span>}
    </button>
  );
});

Button.displayName = 'Button';
