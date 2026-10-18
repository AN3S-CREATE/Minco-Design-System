import type { LabelHTMLAttributes, ReactNode } from 'react';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
};

export function Label({ children, className, ...rest }: LabelProps) {
  const classes = ['minco-label', className].filter(Boolean).join(' ');
  return (
    <label className={classes} {...rest}>
      {children}
    </label>
  );
}
