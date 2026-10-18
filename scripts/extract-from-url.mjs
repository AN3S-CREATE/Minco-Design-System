#!/usr/bin/env node
/**
 * Website → capture scaffold for design-system extraction.
 *
 * Current behavior (no headless browser dependency yet):
 * - Validates TARGET_URL / CLI URL
 * - Creates a dated capture folder under artifacts/captures
 * - Writes a capture checklist + empty notes for manual / agent-assisted extraction
 *
 * Next upgrades (when needed): Playwright snapshot, computed-style sampling, font inventory.
 *
 * Usage:
 *   npm run extract -- https://example.com
 *   # or set TARGET_URL in .env
 */

import { mkdir, writeFile, access } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');

async function loadEnvFile() {
  const envPath = join(ROOT, '.env');
  try {
    await access(envPath);
  } catch {
    return {};
  }
  const { readFile } = await import('node:fs/promises');
  const text = await readFile(envPath, 'utf8');
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function parseArgs(argv) {
  const args = argv.slice(2).filter((a) => a !== '--');
  return { url: args[0] || null };
}

function slugFromUrl(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/[^a-z0-9.-]+/gi, '-').toLowerCase();
  } catch {
    return 'invalid-url';
  }
}

function stamp() {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
}

const CHECKLIST = `# Extraction checklist

Fill this from the live site. Prefer observed values; mark gaps instead of inventing brand.

## Inputs
- [ ] Source URL recorded in meta
- [ ] Brand name confirmed
- [ ] Tech prefs (React/vanilla, CSS vars vs Tailwind) confirmed

## Color
- [ ] Page background / canvas
- [ ] Surface / card / panel fills
- [ ] Text + muted text
- [ ] Brand / accent (+ on-brand text)
- [ ] Borders, focus rings
- [ ] Semantic colors if actually used (success/warning/error) — else note as gap

## Typography
- [ ] Display / heading font(s) + weights loaded
- [ ] Body font(s)
- [ ] Scale (xs → hero)
- [ ] Letter-spacing / line-height patterns
- [ ] Eyebrow / kicker treatments

## Spacing & layout
- [ ] Base unit (often 4px)
- [ ] Common gaps (buttons, sections)
- [ ] Container max-width + gutter
- [ ] Breakpoints

## Radius, elevation, motion
- [ ] Radius steps used on buttons / cards / inputs
- [ ] Shadows vs hairline borders
- [ ] Transition durations / easings
- [ ] prefers-reduced-motion (if any)

## Components to inventory
- [ ] Buttons (variants, heights)
- [ ] Links / nav
- [ ] Cards
- [ ] Form controls
- [ ] Badges / chips
- [ ] Header / footer patterns

## Outputs
- [ ] Update \`packages/tokens/src/tokens.css\`
- [ ] Update \`packages/tokens/src/tokens.json\` (set meta.status to \`extracted\`)
- [ ] Refresh preview: \`npm run dev\`
- [ ] Document known gaps in \`artifacts/captures/<this>/gaps.md\`
`;

async function main() {
  const env = await loadEnvFile();
  const { url: cliUrl } = parseArgs(process.argv);
  const url = cliUrl || env.TARGET_URL || process.env.TARGET_URL;
  const brand = env.BRAND_NAME || process.env.BRAND_NAME || null;
  const captureRoot = resolve(
    ROOT,
    env.CAPTURE_DIR || process.env.CAPTURE_DIR || 'artifacts/captures',
  );

  if (!url) {
    console.error(`Missing URL.

Usage:
  npm run extract -- https://example.com

Or copy .env.example → .env and set TARGET_URL.`);
    process.exit(1);
  }

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    console.error(`Invalid URL: ${url}`);
    process.exit(1);
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    console.error('URL must be http(s).');
    process.exit(1);
  }

  const folder = join(captureRoot, `${stamp()}_${slugFromUrl(url)}`);
  await mkdir(folder, { recursive: true });

  const meta = {
    sourceUrl: parsed.toString(),
    brand,
    createdAt: new Date().toISOString(),
    status: 'capture-started',
    notes: 'Automated style sampling not implemented yet. Use checklist + DevTools / agent browse.',
  };

  await writeFile(join(folder, 'meta.json'), JSON.stringify(meta, null, 2) + '\n');
  await writeFile(join(folder, 'CHECKLIST.md'), CHECKLIST);
  await writeFile(
    join(folder, 'notes.md'),
    `# Capture notes — ${parsed.hostname}

## Observed
- (add colors, fonts, spacing)

## Quotes / class strings
- (paste relevant CSS or class lists)

## Gaps
- (things the site does not define)
`,
  );
  await writeFile(
    join(folder, 'gaps.md'),
    `# Known gaps

List unobserved tokens (e.g. no light theme, no success color). Do not invent values to fill these.
`,
  );

  console.log(`Capture folder ready:
  ${folder}

Next:
  1. Open ${parsed.toString()} and fill CHECKLIST.md / notes.md
  2. Normalize into packages/tokens/src/tokens.css + tokens.json
  3. npm run audit:tokens
  4. npm run dev
`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

// silence unused import lint in some editors
void pathToFileURL;
