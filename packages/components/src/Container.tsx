import type { HTMLAttributes, ReactNode } from 'react';

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/** Content width ~1200px with 2.5vw gutters (observed layout). */
export function Container({ children, className, ...rest }: ContainerProps) {
  const classes = ['minco-container', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
