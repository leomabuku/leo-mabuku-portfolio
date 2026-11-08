// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { destroyLightbox, initializeLightbox } from '../src/scripts/lightbox';

const gallery = `
  <section id="one">
    <a class="photo-open" href="/a-full.jpg" data-lightbox-item data-caption="First caption">
      <img src="/a.jpg" alt="First photo" />
    </a>
    <a class="photo-open" href="/b-full.jpg" data-lightbox-item data-caption="Second caption">
      <img src="/b.jpg" alt="Second photo" />
    </a>
  </section>
  <section id="two">
    <a class="photo-open" href="/c-full.jpg" data-lightbox-item data-caption="Third caption">
      <img src="/c.jpg" alt="Only photo" />
    </a>
  </section>
`;

const click = (element: Element, init: MouseEventInit = {}) =>
  element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0, ...init }));

const viewer = () => document.querySelector<HTMLDialogElement>('dialog.lightbox');
const part = <T extends HTMLElement>(selector: string) => viewer()!.querySelector<T>(selector)!;
const fullUrl = (path: string) => new URL(path, window.location.href).href;

describe('photo viewer', () => {
  beforeEach(() => {
    document.body.innerHTML = gallery;
    document.documentElement.className = '';
    initializeLightbox();
  });

  afterEach(() => {
    destroyLightbox();
    document.body.innerHTML = '';
  });

  it('opens on a tap and shows the original file, caption and count', () => {
    const first = document.querySelector<HTMLAnchorElement>('[data-lightbox-item]')!;
    click(first);

    expect(viewer()!.hasAttribute('open')).toBe(true);
    expect(part<HTMLImageElement>('.lightbox-stage img').getAttribute('src')).toBe(fullUrl('/a.jpg'));
    expect(viewer()!.querySelector('.lightbox-caption')!.textContent).toBe('First caption');
    expect(viewer()!.querySelector('.lightbox-count')!.textContent).toBe('1 of 2');
    expect(viewer()!.querySelector<HTMLAnchorElement>('.lightbox-original')!.href).toBe(fullUrl('/a.jpg'));
  });

  it('steps through the photos in the same section only', () => {
    click(document.querySelectorAll('[data-lightbox-item]')[0]);
    click(viewer()!.querySelector('.lightbox-step--next')!);

    expect(viewer()!.querySelector('.lightbox-count')!.textContent).toBe('2 of 2');
    expect(viewer()!.querySelector('.lightbox-caption')!.textContent).toBe('Second caption');

    click(viewer()!.querySelector('.lightbox-step--next')!);
    expect(viewer()!.querySelector('.lightbox-count')!.textContent).toBe('1 of 2');

    click(viewer()!.querySelector('.lightbox-step--prev')!);
    expect(viewer()!.querySelector('.lightbox-caption')!.textContent).toBe('Second caption');
  });

  it('hides the arrows and the counter when a section has one photo', () => {
    click(document.querySelectorAll('[data-lightbox-item]')[2]);
    expect(viewer()!.querySelector<HTMLElement>('.lightbox-step--next')!.hidden).toBe(true);
    expect(viewer()!.querySelector('.lightbox-count')!.textContent).toBe('');
  });

  it('closes on the close button and returns focus to the photo that opened it', () => {
    const first = document.querySelector<HTMLAnchorElement>('[data-lightbox-item]')!;
    click(first);
    click(viewer()!.querySelector('.lightbox-close')!);

    expect(viewer()!.hasAttribute('open')).toBe(false);
    expect(document.activeElement).toBe(first);
  });

  it('lets modified clicks behave like normal links', () => {
    const first = document.querySelector<HTMLAnchorElement>('[data-lightbox-item]')!;
    click(first, { metaKey: true });
    expect(viewer()!.hasAttribute('open')).toBe(false);
  });

  it('removes the viewer on teardown', () => {
    destroyLightbox();
    expect(document.querySelector('dialog.lightbox')).toBeNull();
  });
});
