# Website → design system workflow

Minco extracts a design system from the live site ([https://www.minco.co.za/](https://www.minco.co.za/)). First capture is complete; tokens status is `extracted`. See [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) for the inventory.

## Principles

1. **Observe first.** Record what the site actually uses (CSS, computed styles, markup).
2. **Name gaps.** If the site has no dark theme, success color, or focus style — say so. Do not invent brand to fill holes.
3. **Tokens before components.** Normalize color, type, space, radius, elevation, motion — then build primitives, then composites.
4. **One source of truth.** CSS custom properties in `packages/tokens/src/tokens.css` drive UI; `tokens.json` mirrors them for tooling.

## End-to-end path

```text
Target URL
    → capture folder (npm run extract)
    → notes / checklist / screenshots
    → normalize into tokens.css + tokens.json
    → audit (npm run audit:tokens)
    → refine primitives in packages/components
    → verify in apps/preview (npm run dev)
```

### 1. Provide inputs

| Input | Why |
| --- | --- |
| **Website URL** | Source of truth for extraction |
| **Brand name** | Metadata / docs labeling |
| **Tech prefs** (optional) | React (default), vanilla CSS, Tailwind mapping, Storybook later, etc. |

Copy `.env.example` → `.env` and set `TARGET_URL` / `BRAND_NAME`, or pass the URL on the CLI.

### 2. Start a capture

```bash
npm run extract -- https://example.com
```

Creates `artifacts/captures/<timestamp>_<host>/` with `meta.json`, `CHECKLIST.md`, `notes.md`, `gaps.md`.

### 3. Capture brand signals

Color, typography, spacing, radius/elevation/motion, and a component inventory — observe; mark gaps.

### 4. Normalize into tokens

Update `packages/tokens/src/tokens.css` and `tokens.json` (`meta.status`: `extracted` or `normalized`). Prefer variables over hard-coded hex in components.

### 5. Build primitives → composites

1. Primitives: Button, Text, Heading, Input, Link, etc. (token-only styles)
2. Composites: Card/Surface, Header, FormField — only after patterns are observed
3. Preview continuously with `npm run dev`

Current Minco inventory is listed in [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md).

### 6. Audit & document gaps

```bash
npm run audit:tokens
```

Keep a living `gaps.md` in the capture folder. Intentional DS extensions (e.g. `:focus-visible` proposal, `prefers-reduced-motion`) must be labeled as such.

## What not to do

- Do not invent a fake brand palette “to look complete”
- Do not add semantic colors the site never uses without labeling them as proposals
- Do not commit secrets or scraped personal contact details into shared files

## Optional later

- Style Dictionary build pipeline
- Storybook instead of / beside Vite preview
- Playwright extractor for fonts + computed styles
- Figma Tokens / DTCG export polish
