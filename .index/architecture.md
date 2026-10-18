# Architecture — Minco

## Purpose

Extract and maintain a **design system** from the live Minco Guesthouse site (https://www.minco.co.za/) into reusable tokens and React primitives.

## Components

```text
┌─────────────────┐     capture      ┌──────────────────┐
│  minco.co.za    │ ───────────────► │ artifacts/captures│
└─────────────────┘                  └────────┬─────────┘
                                              │ normalize
                                              ▼
┌─────────────────┐   CSS vars/JSON  ┌──────────────────┐
│  apps/preview   │ ◄─────────────── │ packages/tokens  │
│  (Vite + React) │                  └────────┬─────────┘
└────────▲────────┘                           │ consumed by
         │                                    ▼
         │                           ┌──────────────────┐
         └───────────────────────────│ packages/components│
                                     └──────────────────┘
```

## Data flow

1. `npm run extract` creates a dated capture folder with checklist/notes.
2. Agent/human observes the site and fills notes; gaps are documented, not invented.
3. Values live in `tokens.css` + `tokens.json` (`meta.status`: `extracted`).
4. Components style via CSS variables (`primitives.css` + React wrappers).
5. Preview app showcases tokens/components; Google Fonts load Montserrat + Roboto.

## Brand signals (extracted)

- Canvas sage `#DDEBE3`, text brown `#4B3B26`, primary green `#5B8C4A`, secondary taupe `#C0BAA1`.
- Display: Montserrat; body: Roboto; sharp corners; default CTAs are taupe (secondary), not green.
- Layout: ~1200px container, `2.5vw` gutters; no chrome shadows.

## Constraints

- Node 20+, npm workspaces.
- Observe-only — no invented brand; gaps live in capture `gaps.md` and `docs/DESIGN-SYSTEM.md`.
- **Runtime:** preview/build blocked until locked/corrupt `node_modules` unlocked + clean `npm install`. Source + `audit-tokens` remain valid without deps.
- Optional later: Playwright sampling, Style Dictionary, Storybook.
