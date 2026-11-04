# UI directions — four ways to rebuild the portfolio

Generated as reference, not as final comps. Each file is a 1600×1000 mockup of the same page (home), so they are directly comparable. Pick one and I will rebuild the whole site against it — every page, the motion system, and the case-study template.

| File | Direction | What it optimises for |
|---|---|---|
| `01-editorial-evidence.png` | **Editorial evidence** | Credibility. Reads like a printed annual report or a design magazine. |
| `02-signal-instrument.png` | **Signal instrument** | Technical authority. Telemetry, mono labels, live counters, status chips. |
| `03-product-launch.png` | **Product launch** | Premium product marketing. Phone mockups, gradients, metric badges. |
| `04-blueprint-technical.png` | **Technical blueprint** | Engineering precision. Drawing-sheet frames, annotations, schematic diagrams. |

---

## 01 · Editorial evidence — *recommended*

Warm paper (`#f4f1ea`), enormous black serif, hairline grid, numbered case-study index with small thumbnails, one lime accent used sparingly for the active state and underlines.

**Why it fits you:** you are applying for a content and communications role while also being a developer. This is the only direction that makes the site itself read as *editorial judgement* — typography, hierarchy, an index of evidence — which is exactly the skill a marketing lead screens for. It also makes the eight projects the hero rather than the animation.

**Risk:** light-mode serif portfolios can look like a template if the typography is not tightly controlled. Mitigation: keep Cormorant for display only, DM Sans at small sizes, and preserve the strict grid so nothing floats.

**Cost to build:** medium. New tokens (light palette), new home layout, new project index component, case-study template restyled. The existing motion system carries over with less parallax.

---

## 02 · Signal instrument

Near-black, lime `#c7f000`, split hero with a live telemetry panel, mono ticker, dark project cards with status chips and data readouts.

**Why it fits you:** it is the direction your current site is already closest to, and it makes SubTrack BH and SmartWater feel like operating systems rather than student projects. Great for engineering recruiters.

**Risk:** it is your current brand — "fresh rebuild" would be an evolution, not a change. It also drifts away from the communications role you are applying for: instrument panels are impressive to engineers and slightly cold to a marketing lead.

**Cost to build:** low-to-medium. Mostly an evolution of the existing tokens and components.

---

## 03 · Product launch

Charcoal-to-indigo gradient, glowing phone mockups, frosted cards, metric badges, big sans headline and a lime pill CTA.

**Why it fits you:** you have real app screens (SubTrack BH, SmartWater, CBU-FIND, ZamTrivia). This shows them best, and it feels like a commercial product rather than a student portfolio.

**Risk:** metric badges invite invented numbers — you would have to show only true ones (37 subscribers, top six, 147 tests), which undercuts the aesthetic that depends on a grid of stats. It also ages fastest: this look is everywhere in SaaS landing pages.

**Cost to build:** medium. Needs screenshot staging, glow/lighting work and careful performance control on mobile.

---

## 04 · Technical blueprint

Cool grey paper, fine grid, navy ink, burnt-orange callouts, annotation arrows, drawing-sheet frames with title blocks, schematic hero diagram.

**Why it fits you:** it makes the systems thinking literal, and nobody else in Lusaka has a portfolio that looks like a drawing set. It would make an interviewer stop scrolling.

**Risk:** highest execution difficulty — annotation lines, dimension arrows and title blocks are easy to make look like decoration if they do not encode real information. Also heavier to maintain as projects change.

**Cost to build:** high. Custom SVG frames, per-project diagrams, print-like layout rules.

---

## Recommendation

**01 (editorial evidence) as the base, with 02's discipline inside the case studies.** Concretely:

- Light paper home, editorial index of all eight projects, serif display, hairline rules, lime accent only for state and links.
- Case-study pages keep a dark, instrument-like evidence band — the screenshots, telemetry details and status chips from direction 02 — so the proof still feels technical.
- Notes section inherits the editorial styling directly; it is the writing sample you are applying with.
- Motion reduces to: staggered reveals, a slow marquee, hover states, view transitions. No scroll-jacking, no heavy WebGL.

That gives you a genuinely fresh look, a stronger marketing story, and keeps the engineering credibility in the place that matters: the case studies.

Say which number you want and I will build it end to end — tokens, home, work index, case-study template, about, résumé, notes, contact, plus a visual QA pass on the dev server.
