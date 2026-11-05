# Leo Mabuku Portfolio

An Astro portfolio for Leo Mabuku, Computer Science graduate, software developer and entrepreneur based in Lusaka, Zambia.

## Run and verify

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Node 22 is used in CI. `predev` and `prebuild` prepare the pinned, self-hosted Python runtime. The build also maintains the PDF résumé. No external runtime CDN is required.

## Design and interaction

Charcoal, warm ivory and lime form one responsive editorial system. The homepage follows the problems behind selected projects, with a chapter index, original product evidence, a runnable language and the documented hackathon story. Case studies preserve the existing media and limitations.

Native scrolling, keyboard navigation, project filters, a searchable navigation dialog and lightweight IntersectionObserver reveals are implemented in `src/scripts/experience.ts`. OS reduced-motion preferences are respected; the footer control can reduce motion for the current session. Content remains readable without JavaScript. Videos do not autoplay.

## Genuine TongaLang execution

`/playground/` runs the original Python lexer, parser and interpreter from `leomabuku/PROJECT`, pinned at `956909b5f64d9114b2796397727be4f665726703`, through Pyodide 0.27.7 in a dedicated Web Worker. The language source is unchanged. See `public/vendor/PROVENANCE.md` for upstream attribution and adapter details.

Code and input stay in the browser. The first run loads about 14 MB; regular portfolio pages do not load Python. The adapter supplies one line per `bala()` call, captures real output and bilingual diagnostics, and reports exhausted input. Stop terminates the worker. Source, input, output, recursion, iteration and execution-time limits keep the playground bounded. It does not reproduce the desktop IDE or permit package installation.

`npm test` includes actual WebAssembly execution: arithmetic, text and numeric input, blank/exhausted input, diagnostics, limits, recovery and all 17 upstream example programs.

## Content and résumé

- `src/data/*.json`: curated profile, projects, experience, education, certifications, skills, hackathons and résumé settings.
- `src/data/site.ts`: shared schema validation and exports.
- `public/images/`: original project evidence and event photographs.
- `src/pages/work/[slug].astro`: case-study template.
- `.pages.yml` at repository root: Pages CMS editing configuration.

The scheduled public repository refresh writes `src/data/repository-cache.json`. It must never overwrite curated `projects.json` or publish private data. Source links and recorded evidence remain even when a demonstration is removed.

`npm run resume` creates `public/documents/Leo-Mabuku-Resume.pdf`. An uploaded résumé takes precedence when `resume.json` selects `uploaded` mode:

```sh
npm run resume:upload -- path/to/resume.pdf
npm run resume:revert
```

The contact form validates fields and opens a pre-addressed message in the visitor's email application. The website does not send or store it.

## Browser QA

In development only, add `?qa=1` to a route and select **Audit this page** to run axe-core, inspect viewport overflow and detect broken images. The audit panel and axe-core are excluded from production. Browser extension UI is excluded from the site audit. Automated checks supplement visual, keyboard and interaction checks; they are not an accessibility certification.

## Hosting

Cloudflare Pages: build root `portfolio-site`, command `npm run build`, output `dist`, Node 22. Pushes to `master` deploy automatically. Use a dedicated branch and verify before merging.

The legacy visits endpoint remains in `functions/api/visits.ts`; the rebuilt interface does not request it. Existing historical design/QA records are retained and should not be mistaken for verification of the current rebuild.
