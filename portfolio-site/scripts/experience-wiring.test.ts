// @vitest-environment jsdom
/**
 * The photo viewer and the hero interpreter only exist if `initExperience`
 * actually starts them. Importing a module is not the same as running it, so
 * this test goes through the real entry point that BaseLayout calls.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { destroyExperience, initExperience } from '../src/scripts/experience';

const gallery = `
  <section id="evidence">
    <a class="photo-open" href="/a-full.jpg" data-lightbox-item data-caption="First caption">
      <img src="/a.jpg" alt="First photo" />
    </a>
    <a class="photo-open" href="/b-full.jpg" data-lightbox-item data-caption="Second caption">
      <img src="/b.jpg" alt="Second photo" />
    </a>
  </section>
`;

const mediaQuery = (query: string) =>
  ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList;

describe('experience wiring', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', mediaQuery);
    document.body.innerHTML = gallery;
    document.documentElement.className = '';
  });

  afterEach(() => {
    destroyExperience();
    document.body.innerHTML = '';
    vi.unstubAllGlobals();
  });

  it('starts the photo viewer, so a tap opens the original frame', () => {
    initExperience();

    const dialog = document.querySelector<HTMLDialogElement>('dialog.lightbox');
    expect(dialog).not.toBeNull();

    document
      .querySelector<HTMLAnchorElement>('[data-lightbox-item]')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));

    expect(dialog!.hasAttribute('open')).toBe(true);
    expect(dialog!.querySelector<HTMLImageElement>('.lightbox-stage img')!.getAttribute('src')).toBe(
      new URL('/a.jpg', window.location.href).href,
    );
    expect(dialog!.querySelector('.lightbox-caption')!.textContent).toBe('First caption');
  });

  it('starts the hero interpreter when the homepage has one', () => {
    document.body.innerHTML = `
      <div data-hero-lab>
        <button type="button" data-lab-word="mulimo">mulimo</button>
        <button type="button" data-lab-run>Run</button>
        <button type="button" data-lab-stop>Stop</button>
        <pre data-lab-output></pre>
        <p data-lab-status></p>
        <p data-lab-time></p>
        <p data-lab-meaning></p>
      </div>
    `;
    const lab = document.querySelector<HTMLElement>('[data-hero-lab]')!;

    initExperience();

    // The lab marks itself ready only when it has been started by the entry point.
    expect(lab.dataset.ready).toBe('true');
  });

  it('removes the viewer again on teardown', () => {
    initExperience();
    expect(document.querySelector('dialog.lightbox')).not.toBeNull();

    destroyExperience();
    expect(document.querySelector('dialog.lightbox')).toBeNull();
  });
});
