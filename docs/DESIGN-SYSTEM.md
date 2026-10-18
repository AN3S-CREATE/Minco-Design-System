# Minco Guesthouse design system

Extracted from [https://www.minco.co.za/](https://www.minco.co.za/) (observe-only).  
Capture folder: `artifacts/captures/2026-10-17T22-56-10_www.minco.co.za/`.

## Packages

| Package | Role |
| --- | --- |
| `@minco/tokens` | CSS custom properties (`tokens.css`) + `tokens.json` + typed `cssVars` |
| `@minco/components` | Accessible React primitives styled with CSS variables only |
| `@minco/preview` | Vite showcase (`npm run dev`) |

```ts
import '@minco/tokens/css';
import { Button, Heading, FormField, Input } from '@minco/components';
```

Also import component interaction CSS via the barrel (`@minco/components` imports `primitives.css`), or `@minco/components/css`.

## Tokens

Status: `meta.status = "extracted"`. Keep `tokens.css` and `tokens.json` in sync.

### Color (observed)

| Token | Value | Notes |
| --- | --- | --- |
| `--color-bg` | `#DDEBE3` | Page canvas |
| `--color-surface` | `#F0F2F1` | Light panel |
| `--color-surface-mid` | `#CACCCB` | Mid panel |
| `--color-surface-input` | `#FAFAFA` | Inputs |
| `--color-text` | `#4B3B26` | Body |
| `--color-text-muted` | `#7A7C7B` | Caption |
| `--color-text-soft` | `#9A9C9B` | Form helper |
| `--color-brand` | `#5B8C4A` | Primary green |
| `--color-on-brand` | `#DDEBE3` | On primary |
| `--color-brand-hover` | `#456B38` | Primary hover |
| `--color-secondary` | `#C0BAA1` | Taupe CTAs / h3 |
| `--color-on-secondary` | `#4B3B26` | On taupe |
| `--color-border` | `#4B3B26` | Inputs |
| `--color-link` / `--color-link-hover` | `#000` / `#575757` | Anchors |
| `--color-hero-overlay` | `rgba(0,0,0,0.33)` | Hero |
| `--color-focus` | `#5B8C4A` | **Stand-in** — site has no custom focus |

### Typography

- **Display:** Montserrat (headings, nav)
- **Body:** Roboto (body, buttons)
- Scale: `--font-size-base` (16px) → `--font-size-4xl` (h1 `2.4rem`)
- h3 uses `--color-secondary` + `--letter-spacing-wide`
- Declared body weight 200; loaded face is 400 — tokens use `--font-weight-regular: 400`

### Space / layout / motion / radius

- Space: `--space-1` … `--space-20` (section spacers ~50px → `--space-20`)
- Container: `--container-max: 75rem`, `--gutter: 2.5vw`
- Breakpoints recorded: `575px`, `975px`
- Radius: **0** on chrome
- Shadows: **none**
- Motion: `300ms ease-in-out` (`--duration-base`)

### Documented gaps (do not invent)

- No dark theme
- No custom focus ring on site (primitives use a labeled `:focus-visible` proposal)
- No elevation / shadow system
- No badge/chip pattern on the marketing page
- Outline button exists in framework CSS but unused in live CTAs
- Semantic success/danger / orange editor chrome are not guest-facing brand

## Components

| Component | Pattern |
| --- | --- |
| `Button` | Default **secondary** taupe; `primary` green; `outline` (framework-only) |
| `Heading` | h1–h6 Montserrat roles |
| `Text` | Roboto body; tones default/muted/soft/brand/secondary |
| `Link` / `NavLink` | Body link colors; uppercase Montserrat nav |
| `Input` / `Textarea` / `Label` / `FormField` | Sharp form controls |
| `Surface` / `Card` | Flat panels (default / mid / secondary) |
| `Container` / `Stack` / `Spacer` | Layout helpers |
| `Header` | Brand + nav shell |

Badge/Chip was **not** observed — omitted intentionally.

## Preview

Preview **source** lives in `apps/preview` (brand hero + token/component sections; Google Fonts in `index.html`).

```bash
node scripts/audit-tokens.mjs   # works without node_modules
```

`npm run dev` / `npm run build` require a healthy install. They are **blocked** while `node_modules` is locked/corrupt (known hang / exit `4294967295`). After unlock: delete bad trees → one clean `npm install --no-fund --no-audit` → `npm run dev` → http://localhost:5173.

## Workflow

See [WORKFLOW.md](./WORKFLOW.md) for capture → normalize → audit → primitives.
