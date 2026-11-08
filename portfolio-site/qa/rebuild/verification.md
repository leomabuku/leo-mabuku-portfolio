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

## Production follow-up — 8 November 2026

PR #18 merged as `570a587` and Cloudflare deployed it successfully. The new homepage was verified in Edge. The production first-run check exposed a 90-second download timeout on the current connection. Direct asset measurements returned HTTP 200 with correct MIME types but took 104 seconds for the standard library and 109 seconds for WebAssembly. The hosted preview had previously completed input execution in 50.58 seconds.

The follow-up bundles the unchanged language source into one JSON request, downloads it alongside Python, reports loading stages, and allows five minutes for downloading. The five-second program execution limit is unchanged. All 35 tests pass against the generated source bundle, including all 17 original programs.

## Midnight rebrand — 8 November 2026

Applied navy/silver/cyan/gold identity, sans-serif headings and a responsive three-perspective project explorer. Updated TongaLang introduction to its educational Tonga-language purpose. Browser-tested desktop switching and mobile switching at 390px, with no page overflow. Desktop axe checks passed homepage, work, about, contact, resume, notes, playground, all eight case studies and 404. Mobile axe checks passed homepage, work, about, contact, resume, notes, playground and TongaLang case study. Fixed cyan-background text and project-cover metadata contrast regressions. Existing 35 tests and 17-route production build pass. Reduced-motion mode active during browser testing. Full-motion appearance and physical-device testing remain outside this pass. Development axe dependency is prebundled to avoid a stale dynamic import after Vite reoptimization.

### Hero/handoff checkpoint validation

The hero achievement addition was browser-checked at 1358px and 390px: axe reported zero violations, zero broken images and no page overflow on both. Screenshot captured outside repository. Dedicated handoff files added at root NEXT_AGENT_PROMPT.md and docs/CREATIVE_DIRECTION_AND_HANDOFF.md. No new runtime behavior changed in this checkpoint.

## Hero lab + consolidated showcase — 8 November 2026

Branch `arena/757b66f6-leo-mabuku-portfolio`, commit `71cbaa0`.

- The homepage hero now carries the real interpreter behind an explicit Run control; the exact program shown is executed by `scripts/playground-runtime.test.mjs` in WebAssembly Python (output `20` / `96`).
- `ProjectExplorer` and the old selected-project list were replaced by `ProjectShowcase`; both previous sections described the same three projects.
- `astro check` 0/0/0 · `vitest` 36 tests · 17-route production build · `npm run audit` 18 pages and 668 internal references clean.
- axe-core via jsdom over 11 routes with all tab panels forced visible: no violations. `color-contrast` and `region` were disabled (no layout engine in jsdom); contrast verified arithmetically instead (muted 8.1:1, accent 11.2:1, gold 9.7:1, output text 14.5:1).
- Boundaries: this pass had no browser. No screenshots, no physical-device or screen-reader checks, no full-motion appearance check and no viewport screenshots were produced for this phase. Treat visual sign-off as outstanding until a browser session confirms it.
