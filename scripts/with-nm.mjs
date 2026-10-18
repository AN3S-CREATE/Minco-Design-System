#!/usr/bin/env node
/**
 * Run a command with NODE_PATH + PATH pointed at the complete install tree.
 * Workaround while the thin/locked `node_modules` cannot be replaced
 * (typically a file watcher / Firebase MCP holding handles on Minco).
 *
 * Prefers: node_modules.live → node_modules.complete → node_modules.__old_*
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { delimiter, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const candidates = [
  resolve(root, 'node_modules.live'),
  resolve(root, 'node_modules.complete'),
  'C:\\Users\\creat\\AppData\\Local\\Temp\\minco-npm-stage-20261017205325\\node_modules',
];
const modules = candidates.find((p) => existsSync(join(p, 'typescript', 'bin', 'tsc')));

if (!modules) {
  console.error(
    'with-nm: no complete modules tree found (expected node_modules.live / node_modules.complete)',
  );
  process.exit(1);
}

process.env.NODE_PATH = [modules, process.env.NODE_PATH].filter(Boolean).join(delimiter);
process.env.PATH = `${join(modules, '.bin')}${delimiter}${process.env.PATH || ''}`;

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/with-nm.mjs <command> [args...]');
  process.exit(1);
}

const cmdline = args.map((a) => (/\s/.test(a) ? `"${a}"` : a)).join(' ');
const child = spawn(cmdline, {
  stdio: 'inherit',
  shell: true,
  env: process.env,
  cwd: root,
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
