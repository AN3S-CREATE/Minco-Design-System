import type { AnchorHTMLAttributes, ReactNode } from 'react';

export type LinkVariant = 'default' | 'nav';

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: LinkVariant;
  children: ReactNode;
};

/** Anchor styles: body links (#000 → #575757) or uppercase Montserrat nav. */
export function Link({ variant = 'default', children, className, ...rest }: LinkProps) {
  const classes = [
    'minco-link',
    'minco-focusable',
    variant === 'nav' ? 'minco-link--nav' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a className={classes} {...rest}>
      {children}
    </a>
  );
}

/** Alias for nav-style links (uppercase Montserrat). */
export function NavLink(props: Omit<LinkProps, 'variant'>) {
  return <Link variant="nav" {...props} />;
}
