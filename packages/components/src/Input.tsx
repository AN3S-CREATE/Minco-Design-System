import type { InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

/** Sharp-corner text input — brown border, #FAFAFA fill (contact form). */
export function Input({ className, type = 'text', ...rest }: InputProps) {
  const classes = ['minco-input', 'minco-focusable', className].filter(Boolean).join(' ');
  return <input type={type} className={classes} {...rest} />;
}
