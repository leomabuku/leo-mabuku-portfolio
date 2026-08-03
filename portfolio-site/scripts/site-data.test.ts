import { describe, expect, it } from 'vitest';
import { projects } from '../src/data/site';

describe('curated portfolio data', () => {
  it('uses unique project slugs', () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('never exposes links for private repositories', () => {
    const privateProjects = projects.filter((project) => project.repositoryVisibility === 'private');
    privateProjects.forEach((project) => expect(project.repository).toBeNull());
  });

  it('keeps every public repository on Leo Mabuku’s GitHub account', () => {
    const repositoryUrls = projects.flatMap((project) => [
      ...(project.repository ? [project.repository] : []),
      ...(project.additionalRepositories ?? []).map((repository) => repository.url),
    ]);
    repositoryUrls.forEach((repository) => expect(repository).toMatch(/^https:\/\/github\.com\/leomabuku\//));
  });

  it('links every current project to public source', () => {
    projects.forEach((project) => {
      expect(project.repositoryVisibility).toBe('public');
      expect(project.repository).toBeTruthy();
    });
  });

  it('does not reference the deleted TongaLang repository', () => {
    expect(JSON.stringify(projects)).not.toContain('Final-year-project-TongaLang-');
  });

  it('keeps dated project updates complete and machine-readable', () => {
    projects.filter((project) => project.updatedOn).forEach((project) => {
      expect(project.updatedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(project.updateSummary?.trim().length).toBeGreaterThan(40);
    });
  });

  it('keeps project media local, described and supported', () => {
    projects.flatMap((project) => project.media ?? []).forEach((item) => {
      expect(item.src).toMatch(/^\/images\/projects\//);
      expect(['image', 'video']).toContain(item.type);
      expect(item.alt.trim().length).toBeGreaterThan(10);
      expect(item.caption.trim().length).toBeGreaterThan(20);
    });
  });
});
