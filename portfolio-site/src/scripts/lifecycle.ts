export type Cleanup = () => void;

export interface CleanupRegistry {
  add(cleanup: Cleanup): void;
  run(): void;
  readonly closed: boolean;
  readonly size: number;
}

/** Collect every listener, observer, and animation cleanup for one Astro page. */
export function createCleanupRegistry(): CleanupRegistry {
  const cleanups: Cleanup[] = [];
  let closed = false;

  return {
    add(cleanup) {
      if (closed) cleanup();
      else cleanups.push(cleanup);
    },
    run() {
      if (closed) return;
      closed = true;
      while (cleanups.length) {
        try {
          cleanups.pop()?.();
        } catch {
          // Cleanup must remain best-effort so one animation cannot block the rest.
        }
      }
    },
    get closed() {
      return closed;
    },
    get size() {
      return cleanups.length;
    },
  };
}
