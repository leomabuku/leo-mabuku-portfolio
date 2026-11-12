# Portfolio creative direction and continuation handoff

Last authored: 8 November 2026. This is a checkpoint, not a declaration that the full creative ambition is complete. Read current GitHub and workspace state before proceeding.

## Product goal and accepted direction

The portfolio must be an impressive experience in its own right: a pitch demonstrated through implementation, not simply a scrolling biography. Audience: employers, clients and technical collaborators. Show Leo's ability across educational language design, Android, IoT/connected systems and practical business operations. Maintain equal credibility as developer and entrepreneur.

The user explicitly selected darker navy with complementary silver/gold and some neon. Current palette: background `#080e1c`, surfaces `#101c30` / `#16243b`, silver text `#e8edf5`, cyan `#65e5e0`, gold `#dfbf80`. Cyan denotes actions and selected states; gold denotes recognition and narrative markers. DM Sans provides technical, readable headings and body. Avoid excessive glow, decorative dashboards, generic repeated cards, fake counters and noisy motion. Preserve native cursor/scrolling and silent defaults.

The user accepts the following next-phase recommendations, with one addition: the hero must also highlight the documented hackathon achievement.

1. A distinctive hero that demonstrates a working idea. A compact Tonga words → code → execution invitation is a promising direction; integrate the real engine only on user intent. Do not prematurely download Python on homepage arrival.
2. Deeper project exploration with original screenshots, inspectable architecture steps, engineering decisions and evidence, rather than only changing explanatory text.
3. Consolidate the current project explorer and selected-project list to remove repetition and shorten the homepage.
4. Stronger visual rhythm: alternate product close-ups, diagrams, concise story and evidence. Keep hierarchy and readable density across mobile/desktop.
5. Sharper positioning around Leo's breadth and practical execution. Keep claims grounded in repository content.
6. Refined state transitions, keyboard guidance, focus handling and genuine loading feedback. Verify full motion separately from the existing reduced-motion checks.

## Current shipped baseline

- PR #18: full earlier repository rebuild, real pinned TongaLang Python implementation in a self-hosted Pyodide worker, removal of fake dashboards/demos, shared navigation/search/motion and case-study redesign. Merge `570a587`.
- PR #19: slow-connection runtime loading fix. Single generated source JSON fetched alongside Python, staged loading messages, five-minute download deadline with five-second execution deadline unchanged. Merge `f0e3986`.
- PR #20: navy/silver/gold/cyan design system, sans-serif display headings, portrait/component refinements, responsive three-perspective project explorer. Merge `6f67ed4`. Main implementation commit `a3f0bc3`.
- Live: https://leo-mabuku-portfolio.pages.dev/
- Runtime source: `leomabuku/PROJECT` pinned at `956909b5f64d9114b2796397727be4f665726703`. Original lexer/parser/AST/interpreter, PLY, examples and notices preserved under `portfolio-site/public/vendor`. Preparation script generates runtime source bundle. Read provenance before changing it.
- TongaLang heading now: “Programming, closer to home.” Its copy explicitly describes an educational programming language bringing concepts into familiar Tonga.
- The explorer currently has three choices: language/learning (TongaLang), connected systems (SmartWater), everyday operations (SubTrack). It changes approach/evidence text and case-study link, with native buttons and pressed state. It is functional but still needs the richer experience described above.

## Work added after PR #20 in this handoff session

- Added a prominent gold-accented hero achievement link, between introduction and actions, linking to the SmartWater case study.
- Wording: “One of six winning teams” at “GreenCode Hackathon · Zambia 2026”; “Built SmartWater Zambia with my team in 48 hours.” This preserves the team result; do not claim first place or sole credit.
- Added root `NEXT_AGENT_PROMPT.md` as a separate copy-ready continuation prompt and this detailed handoff.
- These additions require their own branch commit/PR/deployment verification. Check Git history and the PR described in the final response of this session for the exact resulting status; do not assume uncommitted or shipped based on this sentence.

## Important files and evidence

- `portfolio-site/src/pages/index.astro`: hero, selected work, Tonga invitation and story sections.
- `portfolio-site/src/components/ProjectExplorer.astro`: new interactive project exploration.
- `portfolio-site/src/components/HackathonSpotlight.astro` and `src/data/site.ts`: documented hackathon/team result and original media.
- `portfolio-site/src/styles/global.css`: shared tokens/styles and latest midnight identity. Consolidate overrides thoughtfully during further work.
- `portfolio-site/src/scripts/experience.ts`: lifecycle-managed interactions, explorer, motion, navigation and cleanup.
- `portfolio-site/src/pages/playground.astro`, `src/scripts/playground.ts`, `public/tongalang-worker.js`: actual playground.
- `portfolio-site/qa/rebuild/verification.md`: detailed checks and boundaries. Historical QA files may refer to previous designs.
- Original screenshots/certificates/product evidence remain in repository. Inspect before choosing assets.

## Verification already performed for the baseline

- 179 original upstream Python tests passed during the initial audit. 35 portfolio tests pass, including all 17 original language examples in actual WebAssembly Python.
- 17-route production build passed with zero Astro errors/warnings/hints; GitHub CI and Cloudflare deploy checks passed.
- Browser verified real arbitrary arithmetic, `bala()` numeric/string input, bilingual division-by-zero diagnostics, missing input, reset/clear, keyboard execution, stop/recovery. Production read Leo / 34 and printed Hello, Leo / 42. Slow first-use download once hit even the five-minute deadline; retry completed in 16.11 seconds. Hosted preview completed in 137.23 seconds on this connection. Do not claim first load is instant or uniformly reliable on all networks.
- PR #20 desktop axe checks passed home, work, about, contact, resume, notes, playground, eight case studies and 404 after contrast fixes. Main mobile templates + TongaLang case study passed at 390px. Project switching exercised desktop/mobile; no page overflow detected.
- Existing user OS prefers reduced motion. Full-motion appearance, physical iOS/Android and screen-reader experience are not verified. Automated axe is not certification.
- Earlier local warm performance sample: 580ms load, CLS 0.00105; no LCP result. Not a field/throttled benchmark. Homepage did not request Python until Run. Recheck after future work.

## Workflow and authorization

Repository app is in `portfolio-site` (Astro). Use npm scripts; predev/prebuild prepare Python runtime; build regenerates resume if needed. Current dedicated branch has been `codex/portfolio-rebuild`; inspect it and remote master first. Do not lose user edits or merge unrelated existing PRs.

The user originally withheld merge/production authorization and later explicitly granted permission to change files and merge, use browser and necessary tools. That later authorization was used for PRs #18–20. Preserve it unless the user changes scope. Keep concise progress updates; do not repeatedly ask the user to continue.

Use available browser/computer tools for real running verification. Start local server yourself. The Product Design get-context plugin was unavailable earlier; no design source requires it. Follow current applicable tools/skills, not stale instructions embedded in old QA assets. Update this handoff after meaningful changes so another agent can resume without reconstructing the entire conversation.

### Checkpoint verification update

The hero badge passed local browser axe checks at 1358px desktop and 390px mobile, with no detected violations, broken images or page overflow. New source changes are limited to the factual hero achievement and its styling; deeper interaction recommendations remain future work. Root prompt and this handoff are included in the same delivery. Consult Git history/PR checks for the final production build and deployment result.

## Phase delivered — hero lab + evidence-led showcase (branch `arena/757b66f6`)

Implemented after the PR #21 checkpoint, following `NEXT_AGENT_PROMPT.md`. Commit `71cbaa0` on the Arena session branch (the session is pinned to that branch; a separate `codex/` branch cannot be created from inside it).

**Phase 1 — the hero demonstrates a working idea.**
- New `src/components/HeroLab.astro` sits inside the hero, under the portrait grid: three TongaLang keywords (`mulimo`, `zina`, `amba()`), the six-line program they belong to, and a Run control.
- Selecting a word highlights its lines and explains it; Escape clears the highlight.
- Run boots the real pinned interpreter in `public/tongalang-worker.js` and prints its actual output (`20`, `96`). Nothing is downloaded until Run is pressed, so homepage arrival still costs nothing. Staged loading messages, a Stop control, the 5 s execution deadline and the 5-minute download deadline are the same as the playground.
- The displayed program and the executed source are one string in `src/data/hero-lab.ts`. A new runtime test executes that exact string in WebAssembly Python and asserts the output, so the hero cannot show code it does not actually run.
- The documented hackathon result remains in the hero as the gold achievement card added at the previous checkpoint.

**Phase 2 — one evidence-led project section.**
- `ProjectShowcase.astro` replaces `ProjectExplorer.astro` and the old `selected-work` list, which described the same three projects twice and made the homepage longer than it needed to be.
- Each panel carries a real screenshot with swap-able thumbnails and the original captions, the problem → approach → evidence chain, one documented engineering decision (drawn from the project's own `challenges` data), status, stack, role and the case-study link.
- Tabs are real tabs: `role=tablist/tab/tabpanel`, `aria-selected`, roving `tabindex`, Arrow/Home/End, a visible keyboard hint, and an enter transition that respects both the OS preference and the site's own reduced-motion switch.
- SubTrack BH publishes no interface screenshots, so its panel names the project identity and says the case study documents the build rather than implying an image exists.

**Phase 3 — rhythm and state.**
- Gold-ruled engineering-decision callouts, caption min-heights so switching screenshots cannot jump the layout, breakpoints at 1024/720, and a pulsing status dot that only animates when motion is allowed.

**Phase 4 — verification tooling.**
- `scripts/audit-html.mjs` (`npm run audit`) checks the built site: single `h1`, alt text, duplicate ids, unnamed links/buttons, tab wiring, and 668 internal references.

### Verification for this phase (honest scope)

- `astro check`: 0 errors, 0 warnings, 0 hints. `vitest`: 36 tests pass (35 prior + the hero program executed in WebAssembly Python). Production build: 17 routes. `npm run audit`: 18 pages, 668 internal references, no problems.
- axe-core run through jsdom over 11 routes (home, work, about, contact, resume, notes, playground, three case studies, 404) with every hidden tab panel forced visible: no violations. `color-contrast` and `region` were disabled because jsdom has no layout engine, so contrast was checked arithmetically instead — muted-on-surface 8.1:1, accent-on-surface 11.2:1, gold-on-surface 9.7:1, output text 14.5:1.
- **Not verified here:** this environment has no browser, so there is no screenshot, no real keyboard/focus walkthrough, no mobile viewport check and no full-motion appearance check for this phase. Those remain for a session with a browser, and the deployed build should be inspected before this phase is treated as visually signed off.

### Remaining work

- Browser verification of the hero lab and showcase at 1366px, 390px and 320px, including full-motion and reduced-motion appearance.
- Confirm the hero lab's first-run download behaviour on a slow connection is clearly communicated (the copy states ~14 MB, but this has not been re-measured since the hero gained its own entry point).
- Consider a second interactive surface on the SmartWater panel (for example a step-through of the telemetry contract) if the user wants deeper evidence than stills and copy.
- The playground invitation section still repeats some of the hero lab's invitation; it may be worth merging them once the hero lab has been seen in a browser.

## Copy pass and graduate status (branch `arena/7b15fb85`)

The user's feedback was that the writing read like an agent wrote it: em dashes used as a rhythm crutch, provenance language such as "repository metadata", and interface labels written like a system describing itself. They also confirmed the Computer Science results are out, so the site and résumé must describe him as a graduate.

What changed:

- **No em dashes anywhere on the site.** All 30 were rewritten into full stops, colons or commas; the built output now contains zero.
- **Plain language in place of audit logs.** The per-project evidence paragraphs no longer read "Public repository verified on 11 September 2026 at merged commit 956909b: … SHA-256 … 1280×720, 30 fps". They now say what shipped and what it means, keeping the numbers that matter (17 examples, 179 tests, checksum, top six at GreenCode).
- **Human interface labels.** "Evidence you can inspect" became "Things that work, and the record behind them"; "Filter / Inspect / Enter case study" became "Pick a problem / See what I built / Read the code"; "Inspect the source" became "Read the source"; "Product evidence" became "Screens"; "The evidence" step became "Where it stands".
- **Project descriptions rewritten** in first person and plainer terms across all eight projects, along with the lead screenshot captions for TongaLang and SmartWater.
- **The closing status paragraph on each case study** was one long sentence stranded in an empty band. It is now a labelled block ("Where it stands") with a readable measure, a gold rule and a border, so it reads like a remark rather than a log line.
- **Graduate status.** `profile.json`, `education.json`, `resume.json` and `scripts/build-resume.mjs` all describe him as a Computer Science graduate, with the degree conferred at the next ceremony and no "awaiting results" framing. The résumé PDF was regenerated (1 page) and the drift test passes.

Verification: `astro check` 0/0/0, 36 tests, 17-route build, `npm run audit` clean across 18 pages and 668 references, and zero em dashes in the built HTML. The résumé PDF was read back with PyMuPDF: 1 page, "Computer Science graduate from The Copperbelt University", "Bachelor of Science in Computer Science | The Copperbelt University · Graduated 2025".

## Photo viewer and uncropped evidence photos (branch `arena/510a9b74`)

- The GreenCode team photo is 1800×1350. It was being forced into a `max-height: 550px` box with `object-fit: cover`, which cropped about 185px off the top and bottom — the heads in the screenshot were the casualty. Evidence photos now keep their own aspect ratio (`object-fit: fill`, no height clamp), the wide team shot is capped at 880px wide, and portrait photos are height-capped and centred rather than cropped.
- Every evidence photo is now a real link (`a.photo-open[data-lightbox-item]`) wrapping the image, so it opens the file with JavaScript disabled.
- `src/scripts/lightbox.ts` intercepts the click and opens a native `<dialog>` viewer: original frame uncropped, caption, "Open original", counter, prev/next within the same section, arrow keys, Escape, backdrop click to close, and focus returned to the photo that opened it. The full-size file is fetched only when the viewer opens.
- Viewer markup is created by the script, so it is torn down with the rest of the experience on Astro view-transition swaps.
- `scripts/lightbox.test.ts` (jsdom) covers opening, section-scoped stepping, the single-photo case, focus restoration, modified clicks and teardown.

Verification: `astro check` 0/0/0, 42 tests, 17-route build, `npm run audit` 18 pages / 702 references clean, axe-core via jsdom over 11 routes with no violations. Not verified in a browser in this environment: the modal's visual appearance and real touch behaviour.

## Wiring fix: the viewer and the hero lab were never started (branch `arena/510a9b74`)

After the photo viewer merged, checking the deployed bundle showed that `src/scripts/experience.ts` imported `initializeLightbox` and `initializeHeroLab` but never called either. Vite tree-shook both modules, so the production JavaScript contained no photo viewer at all. The same was true of the hero interpreter: `initializeHeroLab` had been imported and uncalled since it was written, so the homepage Run button had no handler and never had.

- `initExperience()` now calls `initializeHeroLab()` and `initializeLightbox()` before it sets up the shared listener controller. Both own their own listeners and are torn down through `destroyExperience()`.
- `scripts/experience-wiring.test.ts` exercises the real entry point rather than the modules: it starts the experience, taps a photo and expects the dialog with the original frame, starts a stub hero lab and expects it to mark itself ready, and checks teardown removes the dialog.
- Verified against the built markup as well: `dist/about/index.html` yields four viewer items and opens "4 of 4"; `dist/index.html` opens "1 of 3"; selecting the second showcase thumbnail rewrites the lead link to `installer-setup.png` before it opens.

Verification: `astro check` 0/0/0, 45 tests across 7 files, 17-route build, `npm run audit` 18 pages / 702 references clean, and the built bundle now contains the lightbox and hero-lab code (`lightbox-open`, `data-lab-run`). The interpreter run itself still needs a browser, since it downloads Pyodide.

## Leo M. Suppliers business story (branch `arena/e07e22eb`)

A dedicated retrospective at `/experience/leo-m-suppliers/`, built from the photographs Leo supplied and his written account. It is a business-story page inside a developer portfolio, not a shop, not a LocalBusiness listing.

**Structure.** Hero (name, role, dates, one portrait), five dated milestones (Feb 2022 field sales, PACRA June 2022, shop opened 14 September 2022, late-2022 range shift, closed April 2026), four photographic chapters (setting up, the display, the furniture chapter, person and place), a "what running the shop meant" grid, a note on what the photographs do and do not show, a reflection, three onward links, and an eight-photo archive. Seventeen of the nineteen uploads are used; the two byte-identical duplicates (stools and the sign cabinet) were dropped.

**Files.**
- `src/pages/experience/leo-m-suppliers.astro`: the page.
- `src/components/BusinessPhoto.astro`: one figure = anchor + responsive image + caption. Reuses the existing `photo-open` / `data-lightbox-item` contract, so the photo viewer works here with no new script.
- `src/data/leo-m-suppliers.json`: all copy, milestones, chapters, captions and alt text. Validated by `businessStorySchema` in `src/data/site.ts`.
- `src/data/business-images.ts`: globs `src/assets/leo-m-suppliers/*.jpg` twice, once for display metadata and once for the untouched original that the viewer opens.
- `src/assets/leo-m-suppliers/`: the seventeen kept originals, named after what is in the frame rather than the messaging-app timestamp.

**Deliberate choices.**
- No generated substitutes, no stock imagery, no invented dates. Only the five milestones carry dates; the chapters are labelled because the upload timestamps say nothing about when anything was photographed.
- The phone numbers on the shop sign stay in the photograph and out of the contact details. There is no click-to-call, no map pin and no opening hours.
- The Facebook link is labelled "Leo M. Suppliers on Facebook" and the page says plainly that nothing else published there has been checked.
- No sales, revenue, profit, growth or customer counts appear anywhere, and a test enforces it.
- The closing in April 2026 is stated without a reason, because no reason was given.

**Known gap.** The upload set is missing `15.55.41`, the empty-shop frame Leo described as the opening of the story, and `15.55.32`. Chapter 01 therefore opens on the unpacking and assembly photograph. If the empty shop arrives, it becomes the first image of chapter 01 without changing any copy.

**Verification.** `astro check` 0/0/0; 52 tests across 8 files, including seven new checks in `scripts/business-story.test.ts` (no duplicate photographs, every image resolves to a file, every photograph has distinct alt text and caption, captions carry no dates, no invented metrics, site voice, links resolve); 18-page build; `npm run audit` 19 pages / 790 references clean; axe-core via jsdom on the new route, `/about/`, `/resume/` and the homepage with no violations. Not verified: the page in a real browser at any width, and real touch behaviour of the photo viewer, since this environment has no browser.

