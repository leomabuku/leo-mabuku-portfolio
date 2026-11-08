/**
 * Static audit of the built site. Catches the failures a build cannot: broken
 * internal links, missing assets, duplicate ids, images without alt text,
 * unnamed controls and malformed tab wiring.
 *
 * Run after `npm run build`:  node scripts/audit-html.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = 'dist';
const problems = [];
let pageCount = 0;
let referenceCount = 0;

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const files = walk(root);
const pages = files.filter((file) => file.endsWith('.html'));
const exists = (target) => {
  const clean = decodeURIComponent(target.split('#')[0].split('?')[0]);
  const candidates = [
    join(root, clean),
    join(root, clean, 'index.html'),
    join(root, `${clean}.html`),
  ];
  return candidates.some((candidate) => existsSync(candidate) && statSync(candidate).isFile());
};

for (const page of pages) {
  pageCount += 1;
  const html = readFileSync(page, 'utf8');
  const name = relative(root, page);
  // Search-engine verification files and other static stubs are not pages.
  if (!/<body[\s>]/.test(html)) continue;

  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) problems.push(`${name}: expected 1 <h1>, found ${h1s.length}`);

  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt=/.test(tag)) problems.push(`${name}: <img> without alt — ${tag.slice(0, 90)}`);
  }

  for (const [tag] of html.matchAll(/<(?:a|button)\b[^>]*>(?:\s*)<\/(?:a|button)>/g)) {
    if (!/aria-label=/.test(tag) && !/title=/.test(tag)) {
      problems.push(`${name}: empty link or button`);
    }
  }

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  for (const id of new Set(duplicates)) problems.push(`${name}: duplicate id "${id}"`);

  const idSet = new Set(ids);
  for (const [, href] of html.matchAll(/href="(#[^"]+)"/g)) {
    referenceCount += 1;
    const id = href.slice(1);
    if (id && !idSet.has(id)) problems.push(`${name}: in-page link "${href}" has no target`);
  }
  for (const [, href] of html.matchAll(/href="(\/[^":]*)"/g)) {
    referenceCount += 1;
    if (href.startsWith('/_astro/') || exists(href)) continue;
    problems.push(`${name}: internal link "${href}" does not resolve`);
  }
  for (const [, src] of html.matchAll(/src="(\/[^"]+)"/g)) {
    referenceCount += 1;
    if (!exists(src)) problems.push(`${name}: asset "${src}" is missing`);
  }

  // Tab wiring: every aria-controls must resolve, every tab panel labelled.
  for (const [, controls] of html.matchAll(/aria-controls="([^"]+)"/g)) {
    if (!idSet.has(controls)) problems.push(`${name}: aria-controls="${controls}" has no target`);
  }
  for (const [attrs] of html.matchAll(/<[a-z]+[^>]*role="tabpanel"[^>]*>/g)) {
    if (!/aria-labelledby=/.test(attrs)) problems.push(`${name}: tabpanel without aria-labelledby`);
    if (!/\sid="/.test(attrs)) problems.push(`${name}: tabpanel without an id`);
  }
}

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s) across ${pageCount} pages`);
  for (const problem of problems.slice(0, 40)) console.error(`  - ${problem}`);
  process.exit(1);
}
console.log(`✔ ${pageCount} pages, ${referenceCount} internal references, no problems found`);
