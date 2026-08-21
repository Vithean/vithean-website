/**
 * Content guards. Runs before every build (npm `prebuild`), so a bad commit
 * fails locally and in CI rather than shipping.
 *
 *   1. Slugs are ASCII.        A Khmer slug percent-encodes to a ~500-character
 *                              URL and breaks in practice. Titles may be in any
 *                              language; filenames may not.
 *   2. Journals balance.       Every product page carries a real double-entry
 *                              journal. Accountants check the arithmetic, so
 *                              the build does too.
 *   3. Reports tie.            Rows sum to the total, and each margin % matches
 *                              its own row.
 *   4. Both languages present. Every { en, km } pair has a non-empty km.
 *   5. SVG stylesheets are clean.  An inlined SVG stylesheet is not parsed as
 *                              raw text, so a literal start-tag inside it —
 *                              even in a comment — opens a second element and
 *                              swallows every shape after it. The figure then
 *                              renders as an empty box, silently, in both
 *                              locales. This shipped once already.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const errors = [];
const fail = (m) => errors.push(m);

const num = (s) => Number(String(s).replace(/[,%]/g, '') || 0);
const near = (a, b, t = 0.005) => Math.abs(a - b) < t;

/* ── 1. slugs ──────────────────────────────────────────────────────── */
const SLUG_OK = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
for (const dir of ['news', 'products', 'legal']) {
  const files = await readdir(join(ROOT, 'src/content', dir));
  for (const f of files.filter((x) => x.endsWith('.md'))) {
    const slug = f.replace(/\.md$/, '');
    if (!SLUG_OK.test(slug)) {
      fail(`slug is not ASCII kebab-case: src/content/${dir}/${f}\n` +
           `        Titles may be in any language; filenames may not. Use English words or a number.`);
    }
  }
}

/* ── 2 & 3. product journals and reports ───────────────────────────── */
const prodDir = join(ROOT, 'src/content/products');
for (const f of (await readdir(prodDir)).filter((x) => x.endsWith('.md'))) {
  const src = await readFile(join(prodDir, f), 'utf8');
  const grab = (key) => {
    const m = src.match(new RegExp(`^${key}: (\\{.*\\})$`, 'm'));
    return m ? JSON.parse(m[1]) : null;
  };

  const j = grab('posts');
  if (j) {
    const dr = j.lines.reduce((a, l) => a + num(l.dr), 0);
    const cr = j.lines.reduce((a, l) => a + num(l.cr), 0);
    if (!near(dr, cr)) fail(`journal does not balance in ${f}: Dr ${dr} vs Cr ${cr}`);
    if (!near(dr, num(j.total.dr))) fail(`journal total.dr wrong in ${f}: ${j.total.dr} vs ${dr}`);
    if (!near(cr, num(j.total.cr))) fail(`journal total.cr wrong in ${f}: ${j.total.cr} vs ${cr}`);
  }

  const r = grab('report');
  if (r) {
    const col = (i) => r.rows.reduce((a, row) => a + num(row[i]), 0);
    [1, 2, 3].forEach((i) => {
      if (!near(col(i), num(r.total[i])))
        fail(`report column ${i} does not sum in ${f}: ${col(i)} vs total ${r.total[i]}`);
    });
    r.rows.forEach((row) => {
      if (!near(num(row[1]) - num(row[2]), num(row[3])))
        fail(`report row does not tie in ${f}: ${row[0]}`);
      if (Math.abs((num(row[3]) / num(row[1])) * 100 - num(row[4])) > 0.06)
        fail(`report margin % wrong in ${f}: ${row[0]} shows ${row[4]}`);
    });
  }
}

/* ── 4. every { en, km } pair is filled ────────────────────────────── */
const walk = (o, path, file) => {
  if (Array.isArray(o)) return o.forEach((v, i) => walk(v, `${path}[${i}]`, file));
  if (o && typeof o === 'object') {
    if ('en' in o && 'km' in o && !o.km) fail(`missing Khmer: ${file} ${path}`);
    for (const [k, v] of Object.entries(o)) {
      if (k.startsWith('$')) continue;           // $example blocks are templates
      walk(v, `${path}.${k}`, file);
    }
  }
};
for (const f of ['plans.json', 'promotions.json', 'company.json', 'testimonials.json', 'support.json',
                 'partners.json']) {
  walk(JSON.parse(await readFile(join(ROOT, 'src/data', f), 'utf8')), '', f);
}

/* ── 4b. a partner logo path must point at a file that exists ──────── */
{
  const { partners } = JSON.parse(await readFile(join(ROOT, 'src/data/partners.json'), 'utf8'));
  for (const p of partners) {
    if (!p.logo) continue;              // null means "artwork not obtained yet"
    const rel = p.logo.replace(/^\//, '');
    try {
      await readFile(join(ROOT, 'public', rel));
    } catch {
      fail(`partner logo file is missing: ${p.id} points at ${p.logo}
` +
           `        Put the file in public/${rel}, or set logo to null until you have it.`);
    }
  }
}

/* ── 5. no start-tag inside an inlined SVG stylesheet ──────────────── */
const svgDir = join(ROOT, 'src/assets/diagrams');
for (const f of (await readdir(svgDir)).filter((x) => x.endsWith('.svg'))) {
  const src = await readFile(join(svgDir, f), 'utf8');
  const open = src.indexOf('<style');
  if (open === -1) continue;
  const close = src.indexOf('</style>', open);
  if (src.slice(open + 6, close).includes('<style')) {
    fail(`nested style start-tag inside the SVG stylesheet: src/assets/diagrams/${f}
` +
         `        The figure will render as an empty box. Describe it in words instead.`);
  }
}

/* ── report ────────────────────────────────────────────────────────── */
if (errors.length) {
  console.error(`\n✗ content check failed (${errors.length})\n`);
  errors.forEach((e) => console.error(`  · ${e}`));
  console.error('');
  process.exit(1);
}
console.log('✓ content check passed — slugs ASCII, journals balance, reports tie, km filled, svg figures intact');
