import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type StackGap = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20;
export type StackDirection = 'column' | 'row';

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  gap?: StackGap;
  direction?: StackDirection;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  children: ReactNode;
};

const gapVar = (gap: StackGap) => `var(--space-${gap})`;

/** Flex stack using spacing tokens. */
export function Stack({
  gap = 4,
  direction = 'column',
  align,
  justify,
  children,
  className,
  style,
  ...rest
}: StackProps) {
  const classes = [
    'minco-stack',
    direction === 'row' ? 'minco-stack--row' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      style={{
        gap: gapVar(gap),
        alignItems: align,
        justifyContent: justify,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
