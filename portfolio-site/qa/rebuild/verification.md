# Rebuild verification — 5 November 2026

Branch: `codex/portfolio-rebuild`. Base: `0b3022c`.

## Inspected before implementation

- Portfolio tracked source, content, media inventory, build scripts and workflows; existing PR history through #17. PR #17 was open and inspected, not merged.
- Actual `leomabuku/PROJECT` source at `956909b5f64d9114b2796397727be4f665726703`: lexer, parser, AST, interpreter, native functions, diagnostics, examples and tests.
- Original live portfolio in Chrome, including the simulated lab.

## Verified

- All 179 upstream Python tests passed in the separate source checkout.
- All 35 portfolio tests pass. Eight runtime tests execute actual Pyodide, including all 17 original TongaLang examples.
- Astro check: zero errors, warnings or hints. Production build: 17 routes.
- Built HTML check: 656 internal references, no missing files or anchor targets (includes generated auxiliary HTML).
- Chrome browser audits covered all 17 routes at 1366px and 390px. Detected contrast and nested-landmark issues were corrected and rechecked. Narrow-screen overflow in the long LifeHarmonyTracker cover title was corrected and rechecked after fonts loaded.
- Additional 320px checks: playground and TongaLang case study, no page overflow or axe violations.
- Visual inspection: homepage, work listing, about, contact, résumé, notes, article, all eight case studies and 404; desktop and mobile templates inspected. Original evidence remains.
- Mobile navigation opens and closes after navigation; Systems filter returns one matching project. Chapter anchors navigate and active story state updates.
- Quick navigation filters pages/projects and displays an empty state. Native modal and Escape behavior exercised; explicit focus restoration added.
- Contact required-field validation focuses the empty name field. Contact uses the visitor's email application, with a mailto fallback when JavaScript is unavailable. No test email was sent.
- Résumé PDF downloaded through the browser successfully.
- Playground: arbitrary arithmetic produced 84; mobile arithmetic produced 50; `bala()` with Zambia/34 produced greeting and 42. Production preview with Leo/92 produced greeting and 100. Division by zero produced TL-R103 with source line and bilingual guidance. Exhausted input produced a clear error. Reset, clear, keyboard run, Stop during loading, and successful rerun were exercised.
- Runtime source/limits disclosure opens. CBU-FIND external application opens to a real sign-in screen; link now explicitly says an account is required. No account was created or private data accessed.
- OS reduced motion is active in the test browser and content remains readable. Full/lite/reduced selection and cleanup are also unit-tested. Full-motion appearance has not been verified on a separate physical device.

## Performance scope

The shared production interaction bundle is 5.17 kB (2.01 kB gzip); Astro's client router is 15.36 kB (5.28 kB gzip). Neither Three.js nor GSAP is loaded by the rebuilt interface. The portrait is a 57,770-byte WebP. Python (~14 MB) loads only when Run is pressed. The local production browser sample confirmed zero runtime requests on the homepage. A warm local load measured 580 ms and CLS 0.00105; this is a diagnostic sample, not a field-performance or throttled-mobile benchmark. LCP was unavailable in that sample and is not reported as a passing score.

## Boundaries

Automated axe results are not an accessibility certification. Browser testing used Chrome on this Windows machine with viewport emulation, not physical iOS/Android devices or a screen reader. Account-protected project workflows were not exercised. Existing project achievements and implementation status were preserved, not independently re-certified. The playground requires JavaScript/WebAssembly and downloads Python on first use; it is not the desktop IDE.

Screenshots in this directory show the actual local running experience. Historical QA files elsewhere predate this rebuild.
