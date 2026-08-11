export type MotionMode = 'full' | 'lite' | 'reduced';

export interface MotionSignals {
  reducedMotion: boolean;
  coarsePointer: boolean;
  viewportWidth: number;
  saveData: boolean;
  deviceMemory?: number;
}

/** Resolve the richest safe experience from user preferences and device hints. */
export function selectMotionMode(signals: MotionSignals): MotionMode {
  if (signals.reducedMotion) return 'reduced';
  if (
    signals.coarsePointer ||
    signals.viewportWidth < 900 ||
    signals.saveData ||
    (typeof signals.deviceMemory === 'number' && signals.deviceMemory < 6)
  ) return 'lite';
  return 'full';
}

/** Read browser capabilities once so every interaction shares the same mode. */
export function readMotionSignals(): MotionSignals {
  const navigatorWithHints = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };

  return {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    coarsePointer: window.matchMedia('(pointer: coarse)').matches,
    viewportWidth: window.innerWidth,
    saveData: Boolean(navigatorWithHints.connection?.saveData),
    deviceMemory: navigatorWithHints.deviceMemory,
  };
}

/** The long introduction is a session-only enhancement for full-motion devices. */
export function shouldPlayFullIntro(seen: boolean, mode: MotionMode): boolean {
  return !seen && mode === 'full';
}

/** Match the normalized pipe-delimited category contract used by project cards. */
export function projectMatchesFilter(categories: string, filter: string): boolean {
  return filter === 'all' || categories.toLowerCase().split('|').includes(filter.toLowerCase());
}
