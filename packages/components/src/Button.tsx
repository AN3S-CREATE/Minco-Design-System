import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

/**
 * Minco button — sharp corners, uppercase Roboto.
 * Default variant is secondary (taupe) to match live CTAs on minco.co.za.
 */
export function Button({
  variant = 'secondary',
  size = 'md',
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [
    'minco-btn',
    'minco-focusable',
    `minco-btn--${variant}`,
    `minco-btn--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
