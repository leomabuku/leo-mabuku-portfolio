/**
 * Photo viewer.
 *
 * Every evidence photo is a real link to the file, so it still opens with
 * JavaScript off. With JavaScript on, a tap opens a native modal dialog that
 * shows the original frame uncropped, steps through the images in the same
 * section, and restores focus where it came from.
 */

type Item = HTMLAnchorElement;

let cleanup: (() => void) | undefined;

export function destroyLightbox() {
  cleanup?.();
  cleanup = undefined;
}

export function initializeLightbox() {
  const items = Array.from(document.querySelectorAll<Item>('[data-lightbox-item]'));
  if (!items.length) return;
  destroyLightbox();

  const controller = new AbortController();
  const signal = controller.signal;

  // Group by the section the photo lives in, so arrows never wander across the page.
  const groups = new Map<Element, Item[]>();
  for (const item of items) {
    const host = item.closest('section, [data-lightbox-group]') ?? document.body;
    const list = groups.get(host) ?? [];
    list.push(item);
    groups.set(host, list);
  }

  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Photo viewer');

  const bar = document.createElement('div');
  bar.className = 'lightbox-bar';

  const count = document.createElement('p');
  count.className = 'lightbox-count';
  count.setAttribute('aria-live', 'polite');

  const tools = document.createElement('div');
  tools.className = 'lightbox-tools';

  const original = document.createElement('a');
  original.className = 'lightbox-original';
  original.target = '_blank';
  original.rel = 'noreferrer';
  original.textContent = 'Open original ↗';

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'lightbox-close';
  close.setAttribute('aria-label', 'Close photo viewer');
  close.textContent = '✕';

  tools.append(original, close);
  bar.append(count, tools);

  const stage = document.createElement('div');
  stage.className = 'lightbox-stage';

  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'lightbox-step lightbox-step--prev';
  prev.setAttribute('aria-label', 'Previous photo');
  prev.textContent = '‹';

  const image = document.createElement('img');
  image.alt = '';
  image.decoding = 'async';

  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'lightbox-step lightbox-step--next';
  next.setAttribute('aria-label', 'Next photo');
  next.textContent = '›';

  const note = document.createElement('p');
  note.className = 'lightbox-note';
  note.textContent = 'Loading the full-size image…';

  stage.append(prev, image, next);

  const caption = document.createElement('p');
  caption.className = 'lightbox-caption';

  dialog.append(bar, stage, note, caption);
  document.body.append(dialog);

  let current: Item[] = [];
  let index = 0;
  let opener: HTMLElement | null = null;

  const photoOf = (item: Item) =>
    item.querySelector<HTMLImageElement>('img') ?? null;

  const sourceOf = (item: Item) => {
    const photo = photoOf(item);
    const source = photo?.currentSrc || photo?.src || item.getAttribute('href') || '';
    return source;
  };

  const captionOf = (item: Item) =>
    item.dataset.caption ?? photoOf(item)?.alt ?? '';

  const show = (position: number) => {
    index = (position + current.length) % current.length;
    const item = current[index];
    const source = sourceOf(item);

    dialog.dataset.loading = 'true';
    note.hidden = false;
    note.textContent = 'Loading the full-size image…';
    image.removeAttribute('src');
    image.alt = photoOf(item)?.alt ?? '';
    image.src = source;

    original.href = source;
    caption.textContent = captionOf(item);
    count.textContent = current.length > 1 ? `${index + 1} of ${current.length}` : '';

    const multiple = current.length > 1;
    prev.hidden = !multiple;
    next.hidden = !multiple;
  };

  image.addEventListener(
    'load',
    () => {
      dialog.dataset.loading = 'false';
      note.hidden = true;
    },
    { signal },
  );

  image.addEventListener(
    'error',
    () => {
      dialog.dataset.loading = 'false';
      note.hidden = false;
      note.textContent = 'That image could not be loaded. Try “Open original”.';
    },
    { signal },
  );

  const open = (item: Item) => {
    current = groups.get(item.closest('section, [data-lightbox-group]') ?? document.body) ?? [item];
    opener = item;
    show(current.indexOf(item));
    document.documentElement.classList.add('lightbox-open');
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    close.focus();
  };

  const closeViewer = () => {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    document.documentElement.classList.remove('lightbox-open');
    image.removeAttribute('src');
    opener?.focus();
  };

  items.forEach((item) => {
    item.addEventListener(
      'click',
      (event) => {
        // Let modified clicks (new tab, download) behave like normal links.
        const click = event as MouseEvent;
        if (click.metaKey || click.ctrlKey || click.shiftKey || click.altKey || click.button !== 0) return;
        event.preventDefault();
        open(item);
      },
      { signal },
    );
  });

  close.addEventListener('click', closeViewer, { signal });
  prev.addEventListener('click', () => show(index - 1), { signal });
  next.addEventListener('click', () => show(index + 1), { signal });

  dialog.addEventListener(
    'click',
    (event) => {
      if (event.target === dialog) closeViewer();
    },
    { signal },
  );

  dialog.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        show(index - 1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        show(index + 1);
      }
    },
    { signal },
  );

  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('lightbox-open');
  }, { signal });

  cleanup = () => {
    controller.abort();
    dialog.remove();
    document.documentElement.classList.remove('lightbox-open');
  };
}
