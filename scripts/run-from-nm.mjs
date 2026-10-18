#!/usr/bin/env node
/**
 * Run Minco workspace scripts against the complete modules tree
 * (node_modules.live / node_modules.complete), bypassing the locked thin
 * `node_modules` folder that npm would otherwise prefer for .bin shims.
 *
 * Usage: node scripts/run-from-nm.mjs <dev|build|preview|typecheck>
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { delimiter, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const candidates = [
  resolve(root, 'node_modules.live'),
  resolve(root, 'node_modules.complete'),
  // Staging copy used when D: copy was blocked; Temp may be cleaned later.
  'C:\\Users\\creat\\AppData\\Local\\Temp\\minco-npm-stage-20261017205325\\node_modules',
];
const modules = candidates.find((p) => existsSync(join(p, 'typescript', 'bin', 'tsc')));

if (!modules) {
  console.error(
    'run-from-nm: no complete modules tree found (node_modules.live / node_modules.complete)',
  );
  process.exit(1);
}
console.error(`[run-from-nm] using modules: ${modules}`);

process.env.NODE_PATH = [modules, process.env.NODE_PATH].filter(Boolean).join(delimiter);
process.env.PATH = `${join(modules, '.bin')}${delimiter}${process.env.PATH || ''}`;

const tsc = join(modules, 'typescript', 'bin', 'tsc');
const vite = join(modules, 'vite', 'bin', 'vite.js');

function run(cmdline, cwd = root) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(cmdline, {
      stdio: 'inherit',
      shell: true,
      env: process.env,
      cwd,
    });
    child.on('exit', (code, signal) => {
      if (signal) reject(new Error(`signal ${signal}`));
      else if (code) reject(Object.assign(new Error(`exit ${code}`), { code }));
      else resolvePromise();
    });
  });
}

const action = process.argv[2];
const node = process.execPath;

async function main() {
  switch (action) {
    case 'dev':
      await run(`"${node}" "${vite}"`, join(root, 'apps', 'preview'));
      break;
    case 'preview':
      await run(`"${node}" "${vite}" preview`, join(root, 'apps', 'preview'));
      break;
    case 'build':
      await run(`"${node}" "${tsc}" -p packages/tokens/tsconfig.json`);
      await run(`"${node}" "${tsc}" -p packages/components/tsconfig.json`);
      await run(`"${node}" "${tsc}" -p apps/preview/tsconfig.json --noEmit`);
      await run(`"${node}" "${vite}" build`, join(root, 'apps', 'preview'));
      break;
    case 'typecheck':
      await run(`"${node}" "${tsc}" -b --pretty false`);
      break;
    case 'build:tokens':
      await run(`"${node}" "${tsc}" -p packages/tokens/tsconfig.json`);
      break;
    default:
      console.error('Usage: node scripts/run-from-nm.mjs <dev|build|preview|typecheck|build:tokens>');
      process.exit(1);
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(err.code || 1);
});
