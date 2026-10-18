import type { TextareaHTMLAttributes } from 'react';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

/** Sharp-corner textarea matching contact form Message field. */
export function Textarea({ className, ...rest }: TextareaProps) {
  const classes = ['minco-textarea', 'minco-focusable', className].filter(Boolean).join(' ');
  return <textarea className={classes} {...rest} />;
}
