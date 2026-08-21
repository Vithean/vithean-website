/**
 * Khmer punctuation guard. Runs after every build (npm `postbuild`).
 *
 * ។ (khan) closes a thought. A Khmer reader takes it as "stop here". That is
 * right in a paragraph and wrong in a heading, on a button, or on a short line
 * the reader scans rather than reads — there it tells them to stop where they
 * should be moving on to the next thing.
 *
 * So: no ។ inside <h1>/<h2>/<h3>, a .btn, a nav or footer link, an .eyebrow,
 * a table <caption>, or a <th> — on any /km/ page.
 *
 * Where the English says "X. Y.", the Khmer joins the two fragments with — or ·
 * instead of dropping the khan and running them together.
 *
 * This checks the built HTML rather than the source, so it holds no matter
 * which file the string came from — copy.ts, ui.ts, a JSON data file or product
 * front matter.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const KHAN = '។';
const DIST = new URL('../dist/km', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

/** Elements whose text a reader scans. Each entry is [label, regex]. */
const SCANNED = [
  ['heading', /<h[123](?:\s[^>]*)?>([\s\S]*?)<\/h[123]>/g],
  ['button', /<a\b[^>]*class="[^"]*\bbtn\b[^"]*"[^>]*>([\s\S]*?)<\/a>/g],
  ['eyebrow', /<p\b[^>]*class="[^"]*\beyebrow\b[^"]*"[^>]*>([\s\S]*?)<\/p>/g],
  ['nav / footer link', /<(?:nav|footer)\b[\s\S]*?<\/(?:nav|footer)>/g],
  ['table caption', /<caption(?:\s[^>]*)?>([\s\S]*?)<\/caption>/g],
  ['table header', /<th\b[^>]*>([\s\S]*?)<\/th>/g],
];

const text = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

const errors = [];
for await (const file of walk(DIST)) {
  const html = await readFile(file, 'utf8');
  const body = html.split('<body')[1] ?? '';
  const route = '/km/' + file.slice(DIST.length + 1).replace(/\\/g, '/').replace(/index\.html$/, '');
  for (const [label, re] of SCANNED) {
    re.lastIndex = 0;
    for (const m of body.matchAll(re)) {
      const t = text(m[1] ?? m[0]);
      if (t.includes(KHAN)) {
        errors.push(`${label} contains ${KHAN} — ${route}\n        ${t.slice(0, 110)}`);
      }
    }
  }
}

if (errors.length) {
  console.error(`\n✗ Khmer punctuation check failed (${errors.length})\n`);
  console.error(`  ${KHAN} closes a thought. In a title or on a button it tells the reader to`);
  console.error('  stop where they should be moving on. Drop it, or join two fragments');
  console.error('  with — or · instead.\n');
  errors.forEach((e) => console.error(`  · ${e}`));
  console.error('');
  process.exit(1);
}
console.log(`✓ Khmer punctuation check passed — no ${KHAN} in headings, buttons, eyebrows or table headers`);
