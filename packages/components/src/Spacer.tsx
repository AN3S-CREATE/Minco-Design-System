import type { CSSProperties, HTMLAttributes } from 'react';

export type SpacerSize = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20;
export type SpacerAxis = 'block' | 'inline' | 'both';

export type SpacerProps = HTMLAttributes<HTMLSpanElement> & {
  size?: SpacerSize;
  axis?: SpacerAxis;
};

/** Invisible spacing helper (site uses ~10px / 50px spacer blocks). */
export function Spacer({ size = 4, axis = 'block', style, ...rest }: SpacerProps) {
  const token = `var(--space-${size})`;
  const dims: CSSProperties =
    axis === 'inline'
      ? { display: 'inline-block', width: token, height: 1 }
      : axis === 'both'
        ? { display: 'block', width: token, height: token }
        : { display: 'block', width: '100%', height: token };

  return (
    <span
      aria-hidden="true"
      style={{ flexShrink: 0, ...dims, ...style }}
      {...rest}
    />
  );
}
