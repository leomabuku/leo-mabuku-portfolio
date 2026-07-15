import { describe, expect, it } from 'vitest';
import { projects } from '../src/data/site';

describe('curated portfolio data', () => {
  it('uses unique project slugs', () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('never exposes links for private repositories', () => {
    const privateProjects = projects.filter((project) => project.repositoryVisibility === 'private');
    expect(privateProjects.length).toBeGreaterThan(0);
    privateProjects.forEach((project) => expect(project.repository).toBeNull());
  });

  it('keeps every public repository on Leo Mabuku’s GitHub account', () => {
    projects.filter((project) => project.repository).forEach((project) => {
      expect(project.repository).toMatch(/^https:\/\/github\.com\/leomabuku\//);
    });
  });

  it('does not reference the deleted TongaLang repository', () => {
    expect(JSON.stringify(projects)).not.toContain('Final-year-project-TongaLang-');
  });
});
