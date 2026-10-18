# Key decisions — Minco

## 2026-10-17 — npm workspaces + CSS variables + React/Vite scaffold

- **Context:** Repo empty except workspace file; Node/npm available; no pnpm/yarn.
- **Decision:** Scaffold `@minco/tokens`, `@minco/components`, `@minco/preview` with placeholder tokens and extraction scripts.
- **Alternatives considered:** Single-package vanilla CSS only; Storybook-first; Style Dictionary pipeline day one.
- **Rationale:** Fast readiness for website→DS workflow; matches common React delivery; preview without Storybook weight.
- **Status:** Accepted

## 2026-10-17 — Capture checklist before automated scraping

- **Context:** No target URL yet; headless browser not required for readiness.
- **Decision:** `extract-from-url.mjs` creates folders + checklist; defer Playwright.
- **Rationale:** Avoid fake automation; keep install light; upgrade when URL is known.
- **Status:** Accepted

## 2026-10-18 — First extraction from minco.co.za (observe-only)

- **Context:** Target URL https://www.minco.co.za/; brand Minco Guesthouse.
- **Decision:** Map Webador theme roles into tokens: bg `#DDEBE3`, text `#4B3B26`, brand `#5B8C4A`, secondary `#C0BAA1`; fonts Montserrat + Roboto; radius 0; Button default variant = secondary (matches live CTAs).
- **Alternatives considered:** Inventing a fuller palette (dark mode, semantic colors, elevation); treating primary green as default CTA.
- **Rationale:** Live “Send Enquiry” / “Download brochure” use taupe secondary; semantic/orange colors are framework or editor-only; no dark theme on site.
- **Status:** Accepted

## 2026-10-18 — Full DS primitives + documented focus proposal

- **Context:** Extraction complete; need a usable component library and preview without inventing brand.
- **Decision:** Ship complete token groups (surfaces, link, brand-hover, type scale, breakpoints) and React primitives (Button, Heading, Text, Link/NavLink, form controls, Surface/Card, Container/Stack/Spacer, Header). Add labeled `:focus-visible` using `--color-focus` for a11y. Omit Badge/Chip (not observed). Keep `meta.status: extracted`.
- **Alternatives considered:** Inventing elevation/dark theme; cloning full marketing pages; skipping focus styles entirely.
- **Rationale:** Library quality over site clone; gaps stay explicit; preview proves tokens visually.
- **Status:** Accepted

## 2026-10-18 — Stop npm/tsc/vite retries; ship DS as source

- **Context:** Locked/corrupt `node_modules` causes hangs (exit `4294967295`); with-nm / install loops unreliable.
- **Decision:** Treat design system as source-complete; only require `node scripts/audit-tokens.mjs` for validation; document unlock + clean install before preview/build.
- **Rationale:** Avoid wasted install loops; agents can continue from source without healthy Vite.
- **Status:** Accepted
