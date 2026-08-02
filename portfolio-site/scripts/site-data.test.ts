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
});
