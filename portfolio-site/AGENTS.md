# Prototype Instructions

## Current rebuild decision — 5 November 2026

The user rejected the existing UI and requested a comprehensive rebuild, genuine TongaLang execution, removal of simulated demos, and browser verification. This supersedes the older cinematic/WebGL requirements below. Use one editorial design system: near-black and warm-paper sections, restrained lime, original product evidence, a framed portrait, readable case studies, and lightweight motion. Do not reinstate fake dashboards, canned program output or autoplay previews. The dedicated playground executes the unchanged pinned Python language in a self-hosted Pyodide worker. Keep source provenance and explicitly stated browser limits.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Durable design decisions

- The selected direction is a merge of the lime, portrait-led editorial concept and the structured cinematic project-system concept.
- Do not use the blue Swiss-grid concept; the user explicitly rejected it.
- Preserve near-black surfaces, warm-white serif display type, electric-lime accents, strong project evidence, and equal entrepreneur/developer positioning.
- The experience should persuade employers and clients first while still feeling like a distinctive digital art piece.
- Use a hybrid structure: an immersive, cinematic homepage leading into focused Work, case-study, About, Resume and Contact routes.
- The signature interaction is an adaptive portrait data-shift. Use full WebGL and scroll choreography only on capable desktops, with lighter mobile and reduced-motion treatments.
- Motion intensity should feel spectacular at showcase moments and remain present across the site without compromising readable proof sections.
- Keep the experience silent by default, preserve the native cursor and native scrolling, and reframe existing copy without inventing new facts.
- Hackathons and awards are first-class content: a recognition band on the homepage, records on About and Resume, and a badge linking a case study back to the event it was built at. Keep the award wording factual and certificate-backed.
- November 2026: the site was rebuilt on a "Signal" design system — fixed scroll-aware header, kinetic hero with a capability marquee, editorial project cards, sticky case-study chapters, and a single token-driven stylesheet in `src/styles/global.css`. Preserve the near-black surfaces, warm-white serif display type and electric-lime accent.
- Motion stays declarative (`data-motion`, `data-motion-stagger`, `data-count`, `data-scene`) so the full/lite/reduced contract keeps working. New sections must use those hooks rather than bespoke scripts.
- Case studies may carry optional audience, market, production-path and limitations blocks; only publish them when the claims can be backed by evidence or clearly labelled as simulation.

- Latest user direction: make the experience professional, distinctive and story-driven. Reframe copy and components when useful, preserve factual evidence, and use purposeful animation with reduced-motion support. The homepage chapter index and problem-led project introductions implement this direction.
