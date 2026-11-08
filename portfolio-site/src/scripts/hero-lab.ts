/**
 * Hero lab — Tonga word exploration plus the real interpreter.
 *
 * The worker and the pinned Python sources are only requested when the visitor
 * presses Run, so arriving on the homepage costs nothing. Same worker protocol
 * as the full playground (`public/tongalang-worker.js`).
 */

import { heroProgram } from '../data/hero-lab';

let cleanup: (() => void) | undefined;

export function destroyHeroLab() {
  cleanup?.();
  cleanup = undefined;
}

export function initializeHeroLab() {
  const root = document.querySelector<HTMLElement>('[data-hero-lab]');
  if (!root || root.dataset.ready) return;
  destroyHeroLab();
  root.dataset.ready = 'true';

  const controller = new AbortController();
  const query = <T extends HTMLElement>(selector: string) => root.querySelector<T>(selector);
  const words = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-lab-word]'));
  const lines = Array.from(root.querySelectorAll<HTMLElement>('[data-lab-line]'));
  const meaning = query<HTMLElement>('[data-lab-meaning]');
  const run = query<HTMLButtonElement>('[data-lab-run]');
  const stop = query<HTMLButtonElement>('[data-lab-stop]');
  const output = query<HTMLElement>('[data-lab-output]');
  const status = query<HTMLElement>('[data-lab-status]');
  const time = query<HTMLElement>('[data-lab-time]');
  if (!meaning || !run || !stop || !output || !status || !time) return;

  let worker: Worker | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let started = 0;
  let busy = false;

  const setStatus = (message: string, tone: 'active' | 'quiet' = 'active') => {
    status.textContent = message;
    status.dataset.tone = tone;
  };

  const clearHighlight = () => {
    lines.forEach((line) => line.classList.remove('is-lit'));
    words.forEach((word) => word.setAttribute('aria-pressed', 'false'));
    meaning.textContent = meaning.dataset.labDefault ?? '';
  };

  const highlight = (word: HTMLButtonElement) => {
    const indexes = (word.dataset.labLines ?? '')
      .split(',')
      .map((value) => Number.parseInt(value, 10))
      .filter((value) => Number.isFinite(value));
    const selected = word.getAttribute('aria-pressed') === 'true';
    clearHighlight();
    if (selected) return;
    lines.forEach((line, index) => line.classList.toggle('is-lit', indexes.includes(index)));
    word.setAttribute('aria-pressed', 'true');
    if (word.dataset.labNote) meaning.textContent = word.dataset.labNote;
  };

  const setBusy = (value: boolean) => {
    busy = value;
    run.disabled = value;
    stop.hidden = !value;
    root.setAttribute('aria-busy', String(value));
  };

  const terminate = () => {
    clearTimeout(timer);
    worker?.terminate();
    worker = undefined;
  };

  const finish = (message: string, tone: 'active' | 'quiet' = 'quiet') => {
    clearTimeout(timer);
    setBusy(false);
    setStatus(message, tone);
    time.textContent = `${((performance.now() - started) / 1000).toFixed(1)} s`;
  };

  const fail = (message: string) => {
    terminate();
    output.textContent = message;
    output.dataset.error = 'true';
    finish('Runtime unavailable. Press run to try again.', 'quiet');
  };

  const on = (element: HTMLElement, event: string, handler: EventListener) => {
    element.addEventListener(event, handler, { signal: controller.signal });
  };

  words.forEach((word) => {
    on(word, 'click', () => highlight(word));
  });

  on(root, 'keydown', (event) => {
    if ((event as KeyboardEvent).key === 'Escape') clearHighlight();
  });

  on(run, 'click', () => {
    if (busy) return;
    started = performance.now();
    setBusy(true);
    time.textContent = '';
    output.dataset.error = 'false';
    output.textContent = 'Preparing the interpreter…';
    setStatus(
      worker
        ? 'Preparing your program…'
        : 'First run downloads about 14 MB of Python. On a slow connection this can take minutes; Stop is available.',
    );

    try {
      if (!worker) {
        worker = new Worker('/tongalang-worker.js');
        worker.onerror = () =>
          fail('The Python worker could not start. Check your connection and run again.');
        worker.onmessage = ({ data }) => {
          if (data.type === 'loading') {
            setStatus(data.message);
          } else if (data.type === 'running') {
            clearTimeout(timer);
            setStatus('Running the interpreter…');
            timer = setTimeout(() => {
              terminate();
              output.textContent =
                'Execution exceeded the five-second limit. Simplify the program and try again.';
              output.dataset.error = 'true';
              finish('Execution stopped: time limit.');
            }, 5000);
          } else if (data.type === 'result') {
            output.textContent = data.ok
              ? data.output || 'Program completed with no output.'
              : `${data.output}${data.output ? '\n' : ''}${data.error}`;
            output.dataset.error = String(!data.ok);
            finish(data.ok ? 'Execution completed. That is the real interpreter.' : `Program error · ${data.code}`);
          } else if (data.type === 'failure') {
            fail(`Could not load the runtime. ${data.error}`);
          }
        };
      }
      timer = setTimeout(
        () => fail('The runtime download timed out. Check your connection and run again.'),
        300000,
      );
      worker.postMessage({ source: heroProgram, input: '' });
    } catch (error) {
      fail(error instanceof Error ? error.message : String(error));
    }
  });

  on(stop, 'click', () => {
    terminate();
    output.textContent = 'Execution stopped. Nothing else was sent to the runtime.';
    output.dataset.error = 'false';
    finish('Stopped. Press run to start again.', 'quiet');
    run.focus();
  });

  cleanup = () => {
    terminate();
    controller.abort();
    delete root.dataset.ready;
  };
}
