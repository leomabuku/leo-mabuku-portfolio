import { createCleanupRegistry, type CleanupRegistry } from "./lifecycle";
import { destroyHeroLab, initializeHeroLab } from "./hero-lab";
import { destroyLightbox, initializeLightbox } from "./lightbox";
import {
  projectMatchesFilter,
  readMotionSignals,
  selectMotionMode,
} from "./motion-mode";
let registry: CleanupRegistry | undefined;
export function destroyExperience() {
  destroyHeroLab();
  destroyLightbox();
  registry?.run();
  registry = undefined;
}
export function initExperience() {
  destroyExperience();
  registry = createCleanupRegistry();
  // These own their own listeners, so they start here and tear down through
  // destroyExperience rather than through the registry below.
  initializeHeroLab();
  initializeLightbox();
  const controller = new AbortController();
  registry.add(() => controller.abort());
  const listen = (el: EventTarget, event: string, handler: EventListener) =>
    el.addEventListener(event, handler, { signal: controller.signal });
  const showcaseTabs = Array.from(
    document.querySelectorAll<HTMLButtonElement>("[data-showcase-tab]"),
  );
  const showcasePanels = Array.from(
    document.querySelectorAll<HTMLElement>("[data-showcase-panel]"),
  );
  const activateShowcase = (index: number, moveFocus = false) => {
    showcaseTabs.forEach((tab, position) => {
      const selected = position === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && moveFocus) tab.focus();
    });
    showcasePanels.forEach((panel, position) => {
      const selected = position === index;
      panel.hidden = !selected;
      if (!selected) return;
      panel.classList.remove("is-entering");
      void panel.offsetWidth;
      panel.classList.add("is-entering");
    });
  };
  showcaseTabs.forEach((tab, index) => {
    listen(tab, "click", () => activateShowcase(index));
    listen(tab, "keydown", (event) => {
      const key = (event as KeyboardEvent).key;
      const last = showcaseTabs.length - 1;
      let next = -1;
      if (key === "ArrowRight" || key === "ArrowDown") next = index === last ? 0 : index + 1;
      if (key === "ArrowLeft" || key === "ArrowUp") next = index === 0 ? last : index - 1;
      if (key === "Home") next = 0;
      if (key === "End") next = last;
      if (next < 0) return;
      event.preventDefault();
      activateShowcase(next, true);
    });
  });

  document
    .querySelectorAll<HTMLElement>("[data-showcase-panel]")
    .forEach((panel) => {
      const image = panel.querySelector<HTMLImageElement>("[data-showcase-image]");
      const caption = panel.querySelector<HTMLElement>("[data-showcase-caption]");
      const thumbs = Array.from(
        panel.querySelectorAll<HTMLButtonElement>("[data-showcase-thumb]"),
      );
      thumbs.forEach((thumb) => {
        listen(thumb, "click", () => {
          if (!image) return;
          const nextSource = thumb.dataset.src ?? "";
          if (!nextSource) return;
          image.src = nextSource;
          image.alt = thumb.dataset.alt ?? "";
          if (caption) caption.textContent = thumb.dataset.caption ?? "";
          const link = panel.querySelector<HTMLAnchorElement>("[data-showcase-link]");
          if (link) {
            link.href = nextSource;
            link.dataset.caption = thumb.dataset.caption ?? "";
          }
          thumbs.forEach((item) =>
            item.setAttribute("aria-pressed", String(item === thumb)),
          );
        });
      });
    });
  let motionOverride = false;
  try {
    motionOverride = sessionStorage.getItem("reduce-motion") === "true";
  } catch {
    /* Storage can be unavailable. */
  }
  const motionButton = document.querySelector<HTMLButtonElement>(
    "[data-motion-toggle]",
  );
  const syncMotion = () => {
    const mode = motionOverride
      ? "reduced"
      : selectMotionMode(readMotionSignals());
    document.documentElement.dataset.motionMode = mode;
    document.body.dataset.motionMode = mode;
    if (motionButton) {
      motionButton.setAttribute("aria-pressed", String(motionOverride));
      motionButton.textContent = motionOverride
        ? "Motion: reduced"
        : "Reduce motion";
    }
  };
  if (motionButton)
    listen(motionButton, "click", () => {
      motionOverride = !motionOverride;
      try {
        sessionStorage.setItem("reduce-motion", String(motionOverride));
      } catch {}
      syncMotion();
    });
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  listen(media, "change", syncMotion);
  syncMotion();
  const menu = document.querySelector<HTMLButtonElement>(".menu-toggle");
  const nav = document.querySelector<HTMLElement>("#primary-nav");
  const closeMenu = () => {
    menu?.setAttribute("aria-expanded", "false");
    menu?.setAttribute("aria-label", "Open navigation");
    nav?.classList.remove("open");
  };
  if (menu && nav) {
    listen(menu, "click", () => {
      const open = menu.getAttribute("aria-expanded") !== "true";
      menu.setAttribute("aria-expanded", String(open));
      menu.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation",
      );
      nav.classList.toggle("open", open);
    });
    nav
      .querySelectorAll("a")
      .forEach((link) => listen(link, "click", closeMenu));
    listen(document, "keydown", (event) => {
      if (
        (event as KeyboardEvent).key === "Escape" &&
        menu.getAttribute("aria-expanded") === "true"
      ) {
        closeMenu();
        menu.focus();
      }
    });
    listen(document, "click", (event) => {
      if (!(event.target as Element).closest(".site-header")) closeMenu();
    });
  }
  const dialog = document.querySelector<HTMLDialogElement>(
    "[data-command-palette]",
  );
  const search = dialog?.querySelector<HTMLInputElement>(
    "[data-command-search]",
  );
  let previousFocus: HTMLElement | null = null;
  if (dialog && search) {
    const items = Array.from(
      dialog.querySelectorAll<HTMLElement>("[data-command-item]"),
    );
    const empty = dialog.querySelector<HTMLElement>("[data-command-empty]");
    const close = () => {
      dialog.close();
      previousFocus?.focus();
    };
    const open = () => {
      previousFocus = document.activeElement as HTMLElement;
      search.value = "";
      items.forEach((item) => (item.hidden = false));
      if (empty) empty.hidden = true;
      dialog.showModal();
      search.focus();
    };
    document
      .querySelectorAll("[data-command-open]")
      .forEach((button) => listen(button, "click", open));
    const closeButton = dialog.querySelector("[data-command-close]");
    if (closeButton) listen(closeButton, "click", close);
    listen(search, "input", () => {
      let count = 0;
      items.forEach((item) => {
        item.hidden = !(item.dataset.search ?? "").includes(
          search.value.trim().toLowerCase(),
        );
        if (!item.hidden) count++;
      });
      if (empty) empty.hidden = count > 0;
    });
    listen(dialog, "click", (event) => {
      if (event.target === dialog) close();
    });
    listen(dialog, "cancel", (event) => {
      event.preventDefault();
      close();
    });
    dialog
      .querySelectorAll("a")
      .forEach((a) => listen(a, "click", () => dialog.close()));
    listen(document, "keydown", (event) => {
      const key = event as KeyboardEvent;
      if ((key.ctrlKey || key.metaKey) && key.key.toLowerCase() === "k") {
        key.preventDefault();
        dialog.open ? close() : open();
      }
    });
    registry.add(() => {
      if (dialog.open) dialog.close();
    });
  }
  const buttons = Array.from(
    document.querySelectorAll<HTMLButtonElement>("[data-filter]"),
  );
  const cards = Array.from(
    document.querySelectorAll<HTMLElement>("[data-project-card]"),
  );
  buttons.forEach((button) =>
    listen(button, "click", () => {
      const filter = button.dataset.filter ?? "all";
      let count = 0;
      buttons.forEach((b) => {
        const active = b === button;
        b.classList.toggle("active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      cards.forEach((card) => {
        card.hidden = !projectMatchesFilter(
          card.dataset.categories ?? "",
          filter,
        );
        if (!card.hidden) count++;
      });
      const result = document.querySelector(".filter-result");
      if (result)
        result.textContent =
          filter === "all"
            ? `Showing all ${count} projects`
            : `Showing ${count} ${button.textContent} project${count === 1 ? "" : "s"}`;
      const empty = document.querySelector<HTMLElement>(".empty-state");
      if (empty) empty.hidden = count > 0;
    }),
  );
  const form = document.querySelector<HTMLFormElement>(".contact-form");
  if (form)
    listen(form, "submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const body = `Hello Leo,\n\n${data.get("message")}\n\nFrom: ${data.get("name")} (${data.get("email")})`;
      const status = form.querySelector(".form-status");
      if (status)
        status.textContent =
          "Your email application should now open. Review the message there before sending.";
      window.location.href = `mailto:leokmabuku@gmail.com?subject=${encodeURIComponent(String(data.get("subject")))}&body=${encodeURIComponent(body)}`;
    });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-motion]")
      .forEach((el) => observer.observe(el));
    registry.add(() => observer.disconnect());
    const chapters = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const link = document.querySelector(
            `[data-case-link="${entry.target.id}"]`,
          );
          link?.classList.toggle("active", entry.isIntersecting);
        }),
      { rootMargin: "-20% 0px -45% 0px" },
    );
    document
      .querySelectorAll("[data-case-section]")
      .forEach((el) => chapters.observe(el));
    registry.add(() => chapters.disconnect());
    const story = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          document
            .querySelectorAll<HTMLAnchorElement>("[data-story-link]")
            .forEach((link) => {
              const current = link.dataset.storyLink === entry.target.id;
              link.classList.toggle("active", current);
              if (current) link.setAttribute("aria-current", "location");
              else link.removeAttribute("aria-current");
            });
        });
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("[data-story-section]")
      .forEach((el) => story.observe(el));
    registry.add(() => story.disconnect());
  }
}
