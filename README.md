# Minco

Design-system workspace for **Minco Guesthouse**, extracted from [https://www.minco.co.za/](https://www.minco.co.za/).

Tokens and React primitives follow observed brand signals (sage canvas, green primary, taupe CTAs, Montserrat + Roboto, sharp corners). Gaps (dark theme, custom focus, elevation) are documented — not invented.

**Source status:** design system library is complete under `packages/` + `apps/preview` + `docs/`.  
**Runtime status:** `npm install` / `npm run dev` / `npm run build` are **blocked** until the locked/corrupt `node_modules` tree is unlocked and replaced with a clean install (known Windows lock / exit `4294967295` hang). Do not retry install loops while a file watcher holds handles on this repo.

## Requirements

- Node.js 20+
- npm (workspaces)

## Setup (when unlock is possible)

```bash
cd d:\Work\Repositories\Development\Minco
# 1) Stop whatever locks Minco (file watcher / MCP with --dir on this repo)
# 2) Delete thin/corrupt trees: node_modules, node_modules.__*, node_modules.complete, node_modules.live (optional cleanup)
# 3) Single clean install:
npm install --no-fund --no-audit
copy .env.example .env
```

Until that succeeds, use scripts that need **no** deps:

```bash
node scripts/audit-tokens.mjs
node scripts/extract-from-url.mjs https://www.minco.co.za/
```

## Scripts

| Command | Purpose | Needs healthy node_modules? |
| --- | --- | --- |
| `node scripts/audit-tokens.mjs` | Validate token JSON/CSS shape | No |
| `npm run extract -- <url>` | Start a capture folder + checklist | No |
| `npm run dev` | Vite preview (http://localhost:5173) | **Yes — blocked until unlock** |
| `npm run build` | Build tokens, components, preview | **Yes — blocked until unlock** |
| `npm run typecheck` | TypeScript project references check | **Yes — blocked until unlock** |

## How to use (source)

```ts
import '@minco/tokens/css';
import { Button, Heading, FormField, Input } from '@minco/components';
// primitives.css is pulled in by the components barrel (or import '@minco/components/css')
```

- Tokens: `packages/tokens/src/tokens.css` + `tokens.json` (`meta.status: extracted`)
- Components: `packages/components/src/*`
- Preview UI: `apps/preview` (Montserrat + Roboto via Google Fonts in `index.html`)
- Inventory: [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md)
- Workflow: [docs/WORKFLOW.md](docs/WORKFLOW.md)
- Capture: `artifacts/captures/2026-10-17T22-56-10_www.minco.co.za/`

## Layout

```text
packages/tokens      CSS variables + tokens.json (+ typed exports)
packages/components  React primitives (Button, Heading, forms, layout…)
apps/preview         Vite showcase (source ready; run when deps work)
scripts/             extract-from-url.mjs, audit-tokens.mjs, with-nm.mjs
docs/                WORKFLOW.md, DESIGN-SYSTEM.md
artifacts/captures/  Per-URL extraction working folders
.index/              Agent/project context index
```

## Docs

- [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) — tokens, components, usage
- [docs/WORKFLOW.md](docs/WORKFLOW.md) — extraction process
