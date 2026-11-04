/**
 * Shared between the résumé generator and its drift test.
 * Produces a stable hash of every input the generated PDF depends on, so a
 * résumé that no longer matches the site data fails CI instead of shipping.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const RESUME_INPUTS = [
  'profile',
  'experience',
  'education',
  'certifications',
  'skillGroups',
  'hackathons',
  'projects',
  'resume',
];

export function readData(dataDir) {
  return Object.fromEntries(
    RESUME_INPUTS.map((name) => [
      name,
      JSON.parse(fs.readFileSync(path.join(dataDir, `${name}.json`), 'utf8')),
    ]),
  );
}

export function computeDataHash(dataDir) {
  const canonical = JSON.stringify(readData(dataDir));
  return crypto.createHash('sha256').update(canonical).digest('hex');
}
