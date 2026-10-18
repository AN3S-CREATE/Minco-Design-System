/**
 * Typed access to design tokens.
 * Extracted from https://www.minco.co.za/ (Minco Guesthouse).
 */
import tokensJson from './tokens.json' with { type: 'json' };

export type TokenMeta = {
  brand: string | null;
  sourceUrl: string | null;
  extractedAt: string | null;
  status: 'placeholder' | 'extracted' | 'normalized';
};

export const meta = tokensJson.meta as TokenMeta;
export const tokens = tokensJson;

/** CSS custom property names mirroring tokens.css */
export const cssVars = {
  color: {
    bg: '--color-bg',
    surface: '--color-surface',
    surfaceMid: '--color-surface-mid',
    surfaceInput: '--color-surface-input',
    text: '--color-text',
    textMuted: '--color-text-muted',
    textSoft: '--color-text-soft',
    brand: '--color-brand',
    onBrand: '--color-on-brand',
    brandHover: '--color-brand-hover',
    secondary: '--color-secondary',
    onSecondary: '--color-on-secondary',
    border: '--color-border',
    link: '--color-link',
    linkHover: '--color-link-hover',
    heroOverlay: '--color-hero-overlay',
    focus: '--color-focus',
  },
  fontFamily: {
    display: '--font-family-display',
    body: '--font-family-body',
  },
  fontSize: {
    xs: '--font-size-xs',
    sm: '--font-size-sm',
    base: '--font-size-base',
    nav: '--font-size-nav',
    lg: '--font-size-lg',
    xl: '--font-size-xl',
    '2xl': '--font-size-2xl',
    '3xl': '--font-size-3xl',
    '4xl': '--font-size-4xl',
  },
  space: {
    1: '--space-1',
    2: '--space-2',
    3: '--space-3',
    4: '--space-4',
    5: '--space-5',
    6: '--space-6',
    8: '--space-8',
    10: '--space-10',
    12: '--space-12',
    16: '--space-16',
    20: '--space-20',
  },
  layout: {
    containerMax: '--container-max',
    gutter: '--gutter',
  },
} as const;

export default tokens;
