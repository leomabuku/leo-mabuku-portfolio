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
