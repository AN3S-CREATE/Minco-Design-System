import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type SurfaceTone = 'default' | 'secondary' | 'mid';

export type SurfaceProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'section' | 'article' | 'aside';
  tone?: SurfaceTone;
  padded?: boolean;
  children: ReactNode;
};

/**
 * Flat color panel (hosts / feature panels on site).
 * Not an elevated card — shadows are none by token design.
 */
export function Surface({
  as: Tag = 'div',
  tone = 'default',
  padded = true,
  children,
  className,
  ...rest
}: SurfaceProps) {
  const classes = [
    'minco-surface',
    tone === 'secondary' ? 'minco-surface--secondary' : null,
    tone === 'mid' ? 'minco-surface--mid' : null,
    padded ? 'minco-surface--padded' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

/** Alias — site pattern is flat panels; name Card for familiarity. */
export function Card(props: SurfaceProps) {
  return <Surface {...props} />;
}

export type CardProps = SurfaceProps;

/** Inline helper when class-based Surface is not enough. */
export function surfaceInlineStyle(tone: SurfaceTone = 'default'): CSSProperties {
  const background =
    tone === 'secondary'
      ? 'var(--color-secondary)'
      : tone === 'mid'
        ? 'var(--color-surface-mid)'
        : 'var(--color-surface)';
  return {
    background,
    color: tone === 'secondary' ? 'var(--color-on-secondary)' : 'var(--color-text)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-sm)',
  };
}
