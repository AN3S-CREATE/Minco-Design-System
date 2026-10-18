# Repository Analysis State — Minco

## Current Analysis Phase & Progress
Phase 3 — Full design system **source complete** (2026-10-18). Tokens + primitives + preview + docs shipped from minco.co.za extraction. `node scripts/audit-tokens.mjs` → **0 errors, 0 warnings**. `npm install` / `dev` / `build` / `tsc` **blocked** (locked/corrupt node_modules; do not retry install loops).

## Key Architectural Insights Discovered
- Insight 1: Stack = npm workspaces + TypeScript + CSS custom properties + React 19 primitives + Vite preview.
- Insight 2: Live site Webador theme: bg `#DDEBE3`, text `#4B3B26`, primary `#5B8C4A`, secondary `#C0BAA1`; default CTAs are taupe secondary.
- Insight 3: Sharp corners, no chrome shadows, Montserrat / Roboto; focus/dark/elevation are gaps (focus-visible is a labeled DS proposal).
- Insight 4: Package exports point at `src/` so Vite can consume without dist once deps work.
- Insight 5: Environment blocker is thin/locked `node_modules` — source work must not depend on install/build succeeding.

## Files Deeply Reviewed
- `packages/tokens/src/tokens.css` / `tokens.json` / `index.ts`
- `packages/components/src/*` (full primitive set + `primitives.css`)
- `apps/preview/src/App.tsx`, `index.html`, `vite.config.ts`
- `docs/DESIGN-SYSTEM.md`, `docs/WORKFLOW.md`, `README.md`
- `artifacts/captures/2026-10-17T22-56-10_www.minco.co.za/*`

## Open Questions & Areas Needing Investigation
- Q1: Prefer Storybook later, or stay on Vite preview?
- Q2: Need Tailwind/shadcn mapping, or CSS-variables-only?
- Q3: When unlock clears — clean up leftover `node_modules.*` trees?

## Decisions Made & Rationale
- Decision: Observe-only tokens; Button default = secondary taupe; omit Badge/Chip; keep `meta.status: extracted`.
- Decision: Stop npm/tsc/vite retries; treat DS as source-complete until clean install.
  Rationale: Known lock hangs (exit 4294967295); install loops waste time.

## Next Immediate Steps
1. Unlock repo handles → delete corrupt `node_modules*` → one clean `npm install --no-fund --no-audit`.
2. Then `npm run dev` for visual check; optional `npm run build`.
3. Commit when user asks.

## Patterns & Recurring Issues Noticed
- Recurring Issue: npm / node_modules lock contention on Windows — prefer `audit-tokens` / extract (no deps).
- Pattern: Capture notes + gaps.md gate invented brand.

## Session Log
- [2026-10-17] Scaffold + .index + memory.
- [2026-10-18] First extraction from minco.co.za; tokens extracted.
- [2026-10-18] Full DS source shipped; audit clean; build/preview blocked; README documents unlock path.
