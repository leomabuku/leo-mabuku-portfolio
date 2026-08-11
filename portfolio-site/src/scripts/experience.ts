import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createCleanupRegistry, type CleanupRegistry } from './lifecycle';
import { projectMatchesFilter, readMotionSignals, selectMotionMode, shouldPlayFullIntro, type MotionMode } from './motion-mode';
import type { PortraitSceneController } from './portrait-scene';

let registry: CleanupRegistry | undefined;
let animationContext: gsap.Context | undefined;
let portraitScene: PortraitSceneController | undefined;
let generation = 0;

function listen<K extends keyof DocumentEventMap>(
  target: Document,
  event: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: AddEventListenerOptions,
) {
  target.addEventListener(event, handler as EventListener, options);
  registry?.add(() => target.removeEventListener(event, handler as EventListener, options));
}

function listenElement<K extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  event: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions,
) {
  target.addEventListener(event, handler as EventListener, options);
  registry?.add(() => target.removeEventListener(event, handler as EventListener, options));
}

function safeSessionValue(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function setSessionValue(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Private browsing can block storage; the experience still works without it.
  }
}

function initializeNavigation() {
  const button = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const nav = document.querySelector<HTMLElement>('.site-header nav');
  if (!button || !nav) return;

  const closeMenu = () => {
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  };
  const toggleMenu = () => {
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    button.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('open', !open);
    document.body.classList.toggle('menu-open', !open);
  };
  listenElement(button, 'click', toggleMenu);
  nav.querySelectorAll<HTMLElement>('a').forEach((link) => listenElement(link, 'click', closeMenu));
  listen(document, 'keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  registry?.add(closeMenu);
}

function initializeCommandPalette() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-command-palette]');
  const openButtons = document.querySelectorAll<HTMLButtonElement>('[data-command-open]');
  const closeButton = dialog?.querySelector<HTMLButtonElement>('[data-command-close]');
  const search = dialog?.querySelector<HTMLInputElement>('[data-command-search]');
  const items = Array.from(dialog?.querySelectorAll<HTMLElement>('[data-command-item]') ?? []);
  const empty = dialog?.querySelector<HTMLElement>('[data-command-empty]');
  if (!dialog || !search) return;

  const reset = () => {
    search.value = '';
    items.forEach((item) => { item.hidden = false; });
    if (empty) empty.hidden = true;
  };
  const open = () => {
    reset();
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    requestAnimationFrame(() => search.focus());
  };
  const close = () => {
    if (dialog.open && typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  };
  const filter = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    items.forEach((item) => {
      const show = !query || (item.dataset.search ?? '').includes(query);
      item.hidden = !show;
      if (show) visible += 1;
    });
    if (empty) empty.hidden = visible !== 0;
  };

  openButtons.forEach((button) => listenElement(button, 'click', open));
  if (closeButton) listenElement(closeButton, 'click', close);
  listenElement(search, 'input', filter);
  dialog.querySelectorAll<HTMLElement>('a').forEach((link) => listenElement(link, 'click', close));
  listenElement(dialog, 'click', (event) => {
    if (event.target === dialog) close();
  });
  listen(document, 'keydown', (event) => {
    if (event.key === 'Escape' && dialog.open) {
      event.preventDefault();
      close();
      return;
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      dialog.open ? close() : open();
    }
  });
  registry?.add(close);
}

function initializeContactForm() {
  const form = document.querySelector<HTMLFormElement>('.contact-form');
  if (!form) return;
  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const body = `Hello Leo,\n\n${data.get('message')}\n\nFrom: ${data.get('name')} (${data.get('email')})`;
    window.location.href = `mailto:leokmabuku@gmail.com?subject=${encodeURIComponent(String(data.get('subject')))}&body=${encodeURIComponent(body)}`;
    const status = form.querySelector<HTMLElement>('.form-status');
    if (status) status.textContent = 'Your email application should now be opening.';
  };
  form.addEventListener('submit', handleSubmit);
  registry?.add(() => form.removeEventListener('submit', handleSubmit));

  form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea').forEach((field) => {
    const parent = field.closest<HTMLElement>('label');
    if (!parent) return;
    const focus = () => parent.classList.add('field-active');
    const blur = () => {
      parent.classList.remove('field-active');
      parent.classList.toggle('field-complete', Boolean(field.value.trim()));
    };
    field.addEventListener('focus', focus);
    field.addEventListener('blur', blur);
    registry?.add(() => {
      field.removeEventListener('focus', focus);
      field.removeEventListener('blur', blur);
    });
  });
}

function initializePointerSurfaces(mode: MotionMode) {
  if (mode !== 'full') return;

  document.querySelectorAll<HTMLElement>('[data-project-card]').forEach((card) => {
    const move = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty('--pointer-x', `${x * 100}%`);
      card.style.setProperty('--pointer-y', `${y * 100}%`);
      card.style.setProperty('--tilt-x', `${(0.5 - y) * 4}deg`);
      card.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`);
    };
    const reset = () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    };
    listenElement(card, 'pointermove', move, { passive: true });
    listenElement(card, 'pointerleave', reset);
    registry?.add(reset);
  });

  const contact = document.querySelector<HTMLElement>('.contact-page');
  if (contact) {
    const move = (event: PointerEvent) => {
      const rect = contact.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      contact.style.setProperty('--contact-x', `${48 + (x * 4)}%`);
      contact.style.setProperty('--contact-y', `${48 + (y * 4)}%`);
    };
    listenElement(contact, 'pointermove', move, { passive: true });
  }
}

function initializeProjectPreviews() {
  document.querySelectorAll<HTMLElement>('[data-project-card]').forEach((card) => {
    const video = card.querySelector<HTMLVideoElement>('[data-project-preview]');
    if (!video) return;
    video.muted = true;
    const play = () => {
      card.classList.add('preview-active');
      void video.play().catch(() => undefined);
    };
    const pause = () => {
      card.classList.remove('preview-active');
      video.pause();
      video.currentTime = 0;
    };
    listenElement(card, 'pointerenter', play);
    listenElement(card, 'pointerleave', pause);
    listenElement(card, 'focusin', play);
    listenElement(card, 'focusout', pause);
    registry?.add(pause);
  });
}

function initializeFilters(mode: MotionMode) {
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-project-card]'));
  const result = document.querySelector<HTMLElement>('.filter-result');
  const empty = document.querySelector<HTMLElement>('.empty-state');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((button) => {
    const activate = () => {
      const filter = button.dataset.filter || 'all';
      const state = mode === 'reduced' ? undefined : Flip.getState(cards);
      let visible = 0;
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      cards.forEach((card) => {
        const show = projectMatchesFilter(card.dataset.categories ?? '', filter);
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (result) result.textContent = filter === 'all'
        ? `Showing all ${visible} projects`
        : `Showing ${visible} ${button.textContent?.trim()} project${visible === 1 ? '' : 's'}`;
      if (empty) empty.hidden = visible !== 0;
      if (state) {
        Flip.from(state, {
          duration: mode === 'full' ? 0.72 : 0.4,
          ease: 'power3.inOut',
          absolute: true,
          onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.38 }),
          onLeave: (elements) => gsap.to(elements, { opacity: 0, y: -16, duration: 0.24 }),
        });
      }
    };
    listenElement(button, 'click', activate);
  });
}

function initializeIntroduction(mode: MotionMode) {
  const intro = document.querySelector<HTMLElement>('[data-intro-sequence]');
  if (!intro) return;
  const seen = safeSessionValue('leo-portfolio-intro-seen') === '1';
  const fullIntro = shouldPlayFullIntro(seen, mode);
  intro.hidden = false;
  intro.classList.add('intro-active');

  const timeline = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      intro.hidden = true;
      intro.classList.remove('intro-active');
    },
  });
  if (fullIntro) {
    setSessionValue('leo-portfolio-intro-seen', '1');
    timeline
      .fromTo('[data-intro-mark] span', { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.12, duration: 0.5 })
      .fromTo('[data-intro-line]', { scaleX: 0 }, { scaleX: 1, duration: 0.48 }, '-=0.2')
      .to('[data-intro-mark]', { letterSpacing: '0.42em', duration: 0.35 }, '-=0.18')
      .to(intro, { opacity: 0, duration: 0.42, delay: 0.08 });
  } else {
    timeline.fromTo(intro, { opacity: 1 }, { opacity: 0, duration: mode === 'reduced' ? 0.01 : 0.22 });
  }
}

function initializeMotion(mode: MotionMode) {
  gsap.registerPlugin(ScrollTrigger, Flip);
  document.documentElement.classList.add('motion-ready');
  registry?.add(() => document.documentElement.classList.remove('motion-ready'));

  initializeIntroduction(mode);
  if (mode === 'reduced') return;

  animationContext = gsap.context(() => {
    const duration = mode === 'full' ? 0.92 : 0.56;
    ScrollTrigger.batch('[data-motion]', {
      start: 'top 88%',
      once: true,
      onEnter: (elements) => gsap.fromTo(elements, {
        opacity: 0,
        y: mode === 'full' ? 54 : 24,
        clipPath: 'inset(0 0 12% 0)',
      }, {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0 0 0% 0)',
        duration,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,clipPath',
      }),
    });

    document.querySelectorAll<HTMLElement>('[data-motion-stagger]').forEach((group) => {
      gsap.fromTo(Array.from(group.children), { opacity: 0, y: 28 }, {
        opacity: 1,
        y: 0,
        duration: mode === 'full' ? 0.72 : 0.48,
        stagger: mode === 'full' ? 0.1 : 0.055,
        ease: 'power3.out',
        scrollTrigger: { trigger: group, start: 'top 84%', once: true },
      });
    });

    document.querySelectorAll<HTMLElement>('[data-count]').forEach((element) => {
      const target = Number(element.dataset.count);
      if (!Number.isFinite(target)) return;
      const counter = { value: 0 };
      gsap.to(counter, {
        value: target,
        duration: mode === 'full' ? 1.5 : 0.8,
        ease: 'power2.out',
        snap: { value: 1 },
        scrollTrigger: { trigger: element, start: 'top 90%', once: true },
        onUpdate: () => { element.textContent = String(counter.value); },
      });
    });

    const rail = document.querySelector<HTMLElement>('[data-experience-progress]');
    if (rail) {
      gsap.set(rail, { scaleY: 0, transformOrigin: 'top' });
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => gsap.set(rail, { scaleY: self.progress }),
      });
    }

    const hero = document.querySelector<HTMLElement>('[data-home-hero]');
    if (hero && mode === 'full') {
      const copy = hero.querySelector<HTMLElement>('.hero-copy');
      const image = hero.querySelector<HTMLElement>('.hero-image');
      const role = hero.querySelector<HTMLElement>('.role');
      const signal = hero.querySelector<HTMLElement>('[data-hero-signal]');
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top-=2',
          end: '+=62%',
          scrub: 0.75,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => portraitScene?.setProgress(self.progress),
        },
      });
      timeline
        .to(copy, { yPercent: -8, opacity: 0.58, ease: 'none' }, 0)
        .to(image, { scale: 1.035, ease: 'none' }, 0)
        .to(role, { letterSpacing: '0.2em', ease: 'none' }, 0)
        .to(signal, { scaleX: 1, ease: 'none' }, 0);
    }

    const strip = document.querySelector<HTMLElement>('.credibility-strip');
    if (strip && mode === 'full') {
      gsap.fromTo(strip.children, { xPercent: 12 }, {
        xPercent: -12,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: { trigger: strip, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }

    const pipeline = document.querySelector<HTMLElement>('.architecture ol');
    if (pipeline) {
      gsap.fromTo(Array.from(pipeline.children), { opacity: 0.25, y: 20 }, {
        opacity: 1,
        y: 0,
        stagger: 0.16,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: { trigger: pipeline, start: 'top 80%', once: true },
      });
    }

    document.querySelectorAll<HTMLElement>('[data-case-section]').forEach((section) => {
      const id = section.id;
      const link = document.querySelector<HTMLElement>(`[data-case-link="${id}"]`);
      if (!link) return;
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => link.classList.toggle('active', self.isActive),
      });
    });
  }, document.body);

  registry?.add(() => {
    animationContext?.revert();
    animationContext = undefined;
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  });
}

async function initializePortrait(mode: MotionMode, currentGeneration: number) {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-portrait-canvas]');
  const image = document.querySelector<HTMLImageElement>('[data-portrait-image]');
  if (!canvas || !image || mode !== 'full') return;
  try {
    const { createPortraitScene } = await import('./portrait-scene');
    if (currentGeneration !== generation) return;
    portraitScene = await createPortraitScene(canvas, image.currentSrc || image.src);
    if (currentGeneration !== generation) portraitScene.destroy();
  } catch {
    canvas.classList.add('portrait-canvas--failed');
  }
}

/** Tear down the current route before Astro swaps DOM or starts it again. */
export function destroyExperience() {
  generation += 1;
  portraitScene?.destroy();
  portraitScene = undefined;
  registry?.run();
  registry = undefined;
  animationContext?.revert();
  animationContext = undefined;
}

/** Initialize every declarative interaction for the currently rendered route. */
export function initExperience() {
  destroyExperience();
  const currentGeneration = generation;
  registry = createCleanupRegistry();
  const mode = selectMotionMode(readMotionSignals());
  document.documentElement.dataset.motionMode = mode;
  document.body.dataset.motionMode = mode;

  initializeNavigation();
  initializeCommandPalette();
  initializeContactForm();
  initializeProjectPreviews();
  initializePointerSurfaces(mode);
  initializeMotion(mode);
  initializeFilters(mode);
  void initializePortrait(mode, currentGeneration);

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh, { once: true });
  registry?.add(() => window.removeEventListener('load', refresh));
}
