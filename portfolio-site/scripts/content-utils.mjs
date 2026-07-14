import { createHash } from 'node:crypto';

export const FALLBACK_REPOS = ['Final-year-project-TongaLang-', 'SERC-Mini-OS-system', 'LifeHarmonyTracker', 'ZamTrivia1'];
export function chooseFeatured(repos) {
  const clean = repos.filter(r => !r.fork && !r.archived && !/^ZamTrivia[.]*$/.test(r.name));
  const tagged = clean.filter(r => r.topics?.includes('portfolio'));
  const selected = tagged.length ? tagged : clean.filter(r => FALLBACK_REPOS.includes(r.name));
  return selected.sort((a,b) => FALLBACK_REPOS.indexOf(a.name) - FALLBACK_REPOS.indexOf(b.name));
}
export function contentHash(value) { return createHash('sha256').update(JSON.stringify(value)).digest('hex'); }
export function safeSummary({ cached, description, generated }) { return generated?.trim() || cached?.trim() || description?.trim() || 'A public software project by Leo Mabuku.'; }
export function validateProfile(value) {
  if (!value || typeof value !== 'object') throw new Error('Profile must be an object');
  for (const key of ['name','title','location','email']) if (typeof value[key] !== 'string' || !value[key].trim()) throw new Error(`Missing profile field: ${key}`);
  return value;
}
