// Ship It Friday — entry program (Node 22, stdlib only).
// Writes one original one-line git commit message to /output/entry.txt.
// The commit message: a docs change that adds "never deploy on Fridays" to the
// README — and ships itself to prod on a Friday, breaking its own rule in the
// same line.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  "docs: added 'never deploy on Fridays' to the README — shipping this to prod on a Friday";

// Writes exactly the line, no trailing newline: the gate counts characters
// (1-159 per this competition's sealed scorer), so the file is 87 characters
// / 89 bytes, byte-identical every run.
// Self-check: the line must stay a single line — a commit message with a
// newline in it would fail the gate, so refuse one here instead of writing it.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
if (LINE.length < 1 || LINE.length > 159) {
  throw new Error(`line must be 1-159 characters, got ${LINE.length}`);
}
if (LINE.includes('\n')) {
  throw new Error('line must be a single line');
}
writeFileSync(join(outDir, 'entry.txt'), LINE, 'utf8');
