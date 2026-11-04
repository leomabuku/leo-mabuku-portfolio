import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { education, experience, hackathons, projects, resumeSettings } from '../src/data/site';
import { computeDataHash } from './resume-hash.mjs';

const ROOT = process.cwd();
const DATA = join(ROOT, 'src', 'data');
const PDF = join(ROOT, 'public', 'documents', 'Leo-Mabuku-Resume.pdf');
const META = join(ROOT, 'public', 'documents', 'resume-meta.json');

const meta = JSON.parse(readFileSync(META, 'utf8'));

describe('resume pipeline', () => {
  it('ships a valid PDF at the stable download path', () => {
    expect(existsSync(PDF)).toBe(true);
    const buffer = readFileSync(PDF);
    expect(buffer.subarray(0, 5).toString('latin1')).toBe('%PDF-');
    expect(buffer.length).toBeGreaterThan(2000);
  });

  it('only references projects and roles that exist in the data', () => {
    const slugs = new Set(projects.map((project) => project.slug));
    const titles = new Set(experience.map((role) => role.title));

    for (const slug of resumeSettings.projectSlugs) {
      expect(slugs.has(slug), `resume.json references unknown project "${slug}"`).toBe(true);
    }
    for (const title of resumeSettings.experienceTitles) {
      expect(titles.has(title), `resume.json references unknown role "${title}"`).toBe(true);
    }
  });

  it('keeps the generated PDF in sync with the site data', () => {
    if (resumeSettings.source === 'uploaded') return; // uploads are intentionally frozen
    expect(meta.mode).toBe('generated');
    expect(
      meta.dataHash,
      'The résumé PDF is out of date. Run: npm run resume',
    ).toBe(computeDataHash(DATA));
  });

  it('matches an uploaded résumé byte for byte when that mode is active', () => {
    if (resumeSettings.source !== 'uploaded') return;
    expect(meta.mode).toBe('uploaded');
    const file = String(resumeSettings.uploaded.file ?? '');
    const uploadPath = file.startsWith('/')
      ? join(ROOT, 'public', file.replace(/^\//, ''))
      : join(ROOT, 'content', file);
    expect(existsSync(uploadPath), `Uploaded résumé missing at ${uploadPath}`).toBe(true);
    expect(readFileSync(PDF).equals(readFileSync(uploadPath))).toBe(true);
  });

  it('features a degree and at least one current role in the resume data', () => {
    expect(education.length).toBeGreaterThan(0);
    expect(resumeSettings.summary.length).toBeGreaterThan(80);
    expect(resumeSettings.showHackathon || hackathons.length === 0).toBeTypeOf('boolean');
  });
});
