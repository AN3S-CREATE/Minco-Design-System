#!/usr/bin/env node
/**
 * Lightweight token audit:
 * - Ensures tokens.json meta + required groups exist
 * - Warns when still in placeholder status
 * - Checks tokens.css defines expected custom properties
 */

import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const JSON_PATH = join(ROOT, 'packages/tokens/src/tokens.json');
const CSS_PATH = join(ROOT, 'packages/tokens/src/tokens.css');

const REQUIRED_GROUPS = ['color', 'fontFamily', 'fontSize', 'space', 'radius', 'shadow', 'motion', 'layout'];
const REQUIRED_CSS_VARS = [
  '--color-bg',
  '--color-surface',
  '--color-text',
  '--color-text-muted',
  '--color-brand',
  '--color-on-brand',
  '--color-border',
  '--font-family-display',
  '--font-family-body',
  '--space-4',
  '--radius-md',
  '--shadow-sm',
  '--duration-fast',
  '--container-max',
];

function fail(msg) {
  console.error(`✗ ${msg}`);
}

function warn(msg) {
  console.warn(`! ${msg}`);
}

function ok(msg) {
  console.log(`✓ ${msg}`);
}

async function main() {
  let errors = 0;
  let warnings = 0;

  const raw = await readFile(JSON_PATH, 'utf8');
  let json;
  try {
    json = JSON.parse(raw);
  } catch (e) {
    fail(`tokens.json is not valid JSON: ${e.message}`);
    process.exit(1);
  }

  if (!json.meta) {
    fail('tokens.json missing meta');
    errors++;
  } else {
    ok(`meta.status = ${json.meta.status}`);
    if (json.meta.status === 'placeholder') {
      warn('Tokens are still placeholders — run extract + normalize before shipping UI');
      warnings++;
    }
    if (!json.meta.sourceUrl) {
      warn('meta.sourceUrl is empty — set after extraction');
      warnings++;
    }
  }

  for (const g of REQUIRED_GROUPS) {
    if (!json[g] || typeof json[g] !== 'object') {
      fail(`Missing token group: ${g}`);
      errors++;
    } else {
      ok(`group ${g} present`);
    }
  }

  const css = await readFile(CSS_PATH, 'utf8');
  for (const v of REQUIRED_CSS_VARS) {
    if (!css.includes(v)) {
      fail(`tokens.css missing ${v}`);
      errors++;
    }
  }
  if (errors === 0) ok('required CSS variables present');

  console.log('');
  console.log(`Audit complete: ${errors} error(s), ${warnings} warning(s)`);
  process.exit(errors > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
