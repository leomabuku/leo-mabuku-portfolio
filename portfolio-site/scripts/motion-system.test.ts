import { describe, expect, it, vi } from 'vitest';
import { createCleanupRegistry } from '../src/scripts/lifecycle';
import { projectMatchesFilter, selectMotionMode, shouldPlayFullIntro } from '../src/scripts/motion-mode';

describe('motion mode selection', () => {
  const capableDesktop = {
    reducedMotion: false,
    coarsePointer: false,
    viewportWidth: 1440,
    saveData: false,
    deviceMemory: 8,
  };

  it('selects the full experience for a capable desktop', () => {
    expect(selectMotionMode(capableDesktop)).toBe('full');
  });

  it('always respects reduced-motion preferences', () => {
    expect(selectMotionMode({ ...capableDesktop, reducedMotion: true })).toBe('reduced');
  });

  it.each([
    { coarsePointer: true },
    { viewportWidth: 768 },
    { saveData: true },
    { deviceMemory: 4 },
  ])('selects the lite experience for constrained signals: %o', (override) => {
    expect(selectMotionMode({ ...capableDesktop, ...override })).toBe('lite');
  });
});

describe('experience behavior contracts', () => {
  it('plays the long introduction only once and only in full mode', () => {
    expect(shouldPlayFullIntro(false, 'full')).toBe(true);
    expect(shouldPlayFullIntro(true, 'full')).toBe(false);
    expect(shouldPlayFullIntro(false, 'lite')).toBe(false);
    expect(shouldPlayFullIntro(false, 'reduced')).toBe(false);
  });

  it('matches complete project category tokens', () => {
    expect(projectMatchesFilter('android|web', 'all')).toBe(true);
    expect(projectMatchesFilter('android|web', 'web')).toBe(true);
    expect(projectMatchesFilter('programming language|systems', 'programming language')).toBe(true);
    expect(projectMatchesFilter('business tools', 'business')).toBe(false);
  });

  it('runs cleanup callbacks once in reverse registration order', () => {
    const order: number[] = [];
    const first = vi.fn(() => order.push(1));
    const second = vi.fn(() => order.push(2));
    const cleanup = createCleanupRegistry();
    cleanup.add(first);
    cleanup.add(second);
    cleanup.run();
    cleanup.run();
    expect(order).toEqual([2, 1]);
    expect(first).toHaveBeenCalledOnce();
    expect(second).toHaveBeenCalledOnce();
    expect(cleanup.closed).toBe(true);
  });
});
