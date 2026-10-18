# File inventory — Minco

Status: `Active` | `Deprecated` | `Dead` | `Experimental` | `Generated`

| Path | Purpose | Status |
| --- | --- | --- |
| `Minco.code-workspace` | Cursor/VS Code workspace stub | Active |
| `package.json` | npm workspaces root scripts | Active |
| `package-lock.json` | Lockfile (after install) | Generated |
| `tsconfig.json` / `tsconfig.base.json` | TS project references + shared options | Active |
| `.gitignore` | Ignore node_modules, dist, .env, captures scratch | Active |
| `.env.example` | TARGET_URL / BRAND_NAME / CAPTURE_DIR | Active |
| `.npmrc` | Project-local npm cache (`.npm-cache`) to avoid global lock contention | Active |
| `README.md` | Setup, scripts; documents npm unlock blocker for preview/build | Active |
| `REPO_ANALYSIS_MEMORY.md` | Cross-session analysis state | Active |
| `docs/WORKFLOW.md` | Website → tokens → components process | Active |
| `docs/DESIGN-SYSTEM.md` | Token + component inventory and usage | Active |
| `scripts/extract-from-url.mjs` | Start capture folder + checklist | Active |
| `scripts/audit-tokens.mjs` | Validate tokens.json / tokens.css | Active |
| `scripts/with-nm.mjs` | Run commands against node_modules.live/complete | Active |
| `packages/tokens/` | CSS vars + JSON tokens + typed exports | Active |
| `packages/tokens/src/tokens.css` | Observed Minco Guesthouse CSS custom properties | Active |
| `packages/tokens/src/tokens.json` | DTCG-ish token document (`meta.status: extracted`) | Active |
| `packages/components/` | React primitives (token CSS variables only) | Active |
| `packages/components/src/primitives.css` | Button/link/form/surface/layout + focus-visible proposal | Active |
| `packages/components/src/Button.tsx` | Primary green / secondary taupe / outline | Active |
| `packages/components/src/Text.tsx` | Body text tones | Active |
| `packages/components/src/Heading.tsx` | Montserrat h1–h6 roles | Active |
| `packages/components/src/Link.tsx` | Body + NavLink | Active |
| `packages/components/src/Input.tsx` / `Textarea.tsx` / `Label.tsx` / `FormField.tsx` | Form primitives | Active |
| `packages/components/src/Card.tsx` | Surface / Card flat panels | Active |
| `packages/components/src/Container.tsx` / `Stack.tsx` / `Spacer.tsx` | Layout helpers | Active |
| `packages/components/src/Header.tsx` | Brand + nav shell | Active |
| `packages/components/src/index.ts` | Public exports (+ CSS side-effect import) | Active |
| `apps/preview/` | Vite preview surface | Active |
| `apps/preview/index.html` | Google Fonts Montserrat + Roboto | Active |
| `apps/preview/src/App.tsx` | Brand hero + token/component showcase | Active |
| `artifacts/captures/` | Per-URL extraction working folders | Active |
| `artifacts/captures/2026-10-17T22-56-10_www.minco.co.za/` | First live extraction from https://www.minco.co.za/ | Active |
| `.index/` | This context index | Active |
