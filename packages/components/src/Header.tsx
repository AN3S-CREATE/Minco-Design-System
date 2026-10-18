import type { HTMLAttributes, ReactNode } from 'react';
import { NavLink } from './Link';

export type HeaderNavItem = {
  href: string;
  label: string;
  current?: boolean;
};

export type HeaderProps = HTMLAttributes<HTMLElement> & {
  brand?: ReactNode;
  brandHref?: string;
  items?: HeaderNavItem[];
  children?: ReactNode;
};

/**
 * Simple header shell matching site pattern: brand + uppercase Montserrat nav.
 * Not a full marketing header clone — layout helper for DS composition.
 */
export function Header({
  brand = 'Minco',
  brandHref = '#',
  items = [],
  children,
  className,
  ...rest
}: HeaderProps) {
  const classes = ['minco-header', className].filter(Boolean).join(' ');

  return (
    <header className={classes} {...rest}>
      <a className="minco-header__brand minco-focusable" href={brandHref}>
        {brand}
      </a>
      {children ?? (
        <nav aria-label="Primary">
          <ul className="minco-header__nav">
            {items.map((item) => (
              <li key={item.href + item.label}>
                <NavLink href={item.href} aria-current={item.current ? 'page' : undefined}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
