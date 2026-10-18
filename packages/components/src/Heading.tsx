import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: HeadingLevel;
  children: ReactNode;
};

const levelStyles: Record<HeadingLevel, CSSProperties> = {
  1: {
    fontSize: 'var(--font-size-4xl)',
    fontWeight: 'var(--font-weight-bold)',
    lineHeight: 'var(--line-height-tight)',
    letterSpacing: 'var(--letter-spacing-tight)',
    color: 'var(--color-brand)',
  },
  2: {
    fontSize: 'var(--font-size-3xl)',
    fontWeight: 'var(--font-weight-semibold)',
    lineHeight: 'var(--line-height-snug)',
    letterSpacing: 'var(--letter-spacing-tight)',
    color: 'var(--color-brand)',
  },
  /* h3 on site uses secondary taupe + wide tracking (section kicker) */
  3: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 'var(--font-weight-semibold)',
    lineHeight: 'var(--line-height-heading)',
    letterSpacing: 'var(--letter-spacing-wide)',
    color: 'var(--color-secondary)',
  },
  4: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 'var(--line-height-heading)',
    letterSpacing: 'var(--letter-spacing-tight)',
    color: 'var(--color-brand)',
  },
  5: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 'var(--line-height-body)',
    letterSpacing: 'var(--letter-spacing-tight)',
    color: 'var(--color-brand)',
  },
  6: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-regular)',
    lineHeight: 'var(--line-height-body)',
    letterSpacing: 'var(--letter-spacing-tight)',
    color: 'var(--color-brand)',
  },
};

/** Montserrat headings matching site h1–h6 roles. */
export function Heading({ level = 2, children, style, ...rest }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return (
    <Tag
      {...rest}
      style={{
        margin: 0,
        fontFamily: 'var(--font-family-display)',
        ...levelStyles[level],
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
