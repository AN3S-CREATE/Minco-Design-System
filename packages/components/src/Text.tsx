import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type TextTone = 'default' | 'muted' | 'soft' | 'brand' | 'secondary';
export type TextAs = 'p' | 'span' | 'label' | 'div';
export type TextSize = 'xs' | 'sm' | 'base' | 'lg';

export type TextProps = HTMLAttributes<HTMLElement> & {
  as?: TextAs;
  tone?: TextTone;
  size?: TextSize;
  children: ReactNode;
};

const toneColor: Record<TextTone, string> = {
  default: 'var(--color-text)',
  muted: 'var(--color-text-muted)',
  soft: 'var(--color-text-soft)',
  brand: 'var(--color-brand)',
  secondary: 'var(--color-secondary)',
};

const sizeVar: Record<TextSize, string> = {
  xs: 'var(--font-size-xs)',
  sm: 'var(--font-size-sm)',
  base: 'var(--font-size-base)',
  lg: 'var(--font-size-lg)',
};

/** Body/label text bound to Minco token CSS variables (Roboto / brown text). */
export function Text({
  as: Tag = 'p',
  tone = 'default',
  size = 'base',
  children,
  style,
  ...rest
}: TextProps) {
  return (
    <Tag
      {...rest}
      style={
        {
          margin: 0,
          fontFamily: 'var(--font-family-body)',
          fontSize: sizeVar[size],
          fontWeight: 'var(--font-weight-regular)',
          lineHeight: 'var(--line-height-body)',
          color: toneColor[tone],
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
