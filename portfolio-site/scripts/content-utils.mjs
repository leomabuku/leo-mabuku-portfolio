import { createHash } from 'node:crypto';

export const PORTFOLIO_REPOS = [
  'PROJECT',
  'SubTrackBH',
  'CBU-FIND',
  'CBU-FIND-WEB',
  'ZamTrivia1',
  'SERC-Mini-OS-system',
  'LifeHarmonyTracker',
  'leo-mabuku-portfolio',
];

const EXCLUDED_REPOS = new Set(['ZamTrivia', 'serc_mini_os']);

export function chooseFeatured(repos) {
  const approved = new Set(PORTFOLIO_REPOS);
  const clean = repos.filter(r => !r.fork && !r.archived && !EXCLUDED_REPOS.has(r.name));
  const selected = clean.filter(r => approved.has(r.name) || r.topics?.includes('portfolio'));
  return selected.sort((a, b) => {
    const aIndex = PORTFOLIO_REPOS.indexOf(a.name);
    const bIndex = PORTFOLIO_REPOS.indexOf(b.name);
    if (aIndex !== -1 || bIndex !== -1) return (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) - (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex);
    return a.name.localeCompare(b.name);
  });
}
export function contentHash(value) { return createHash('sha256').update(JSON.stringify(value)).digest('hex'); }
export function safeSummary({ cached, description, generated }) { return generated?.trim() || cached?.trim() || description?.trim() || 'A public software project by Leo Mabuku.'; }
export function validateProfile(value) {
  if (!value || typeof value !== 'object') throw new Error('Profile must be an object');
  for (const key of ['name','title','location','email']) if (typeof value[key] !== 'string' || !value[key].trim()) throw new Error(`Missing profile field: ${key}`);
  return value;
}
