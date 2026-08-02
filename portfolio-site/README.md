# Leo Mabuku Portfolio

Professional Astro portfolio for Leo Mabuku: a fourth-year Computer Science student, software developer and entrepreneur in Kitwe, Zambia.

## Stack

- Astro and TypeScript
- Scoped/static CSS with Fontsource and Phosphor icons
- Vitest for content-refresh utilities
- GitHub Actions for scheduled public-repository refreshes
- Cloudflare Pages for static hosting

## Local development

```sh
npm install
npm run dev
```

Quality checks:

```sh
npm test
npm run build
```

## Content locations

- `src/data/site.ts` — professional profile, skills, education, experience and full case studies
- `src/data/projects.json` — generated public-repository cache used by the refresh workflow
- `src/pages/` — Home, Work, About, Resume and Contact routes
- `src/pages/work/[slug].astro` — static project case-study routes
- `public/images/projects/` — approved project evidence and screenshots

To add or update a project, edit its record in `src/data/site.ts`. Never add private source, subscriber records, credentials or unapproved client information. Public repository metadata may be refreshed independently without overriding the curated case-study content.

## Resume

The Resume page is complete and print-friendly. Visitors can use **Print or save as PDF** while the final approved downloadable file is still outstanding. When it is ready, save it as `public/documents/Leo-Mabuku-Resume.pdf` and add the download action to `src/pages/resume.astro`.

## Contact details

Approved public contact information lives in `src/data/site.ts`. The contact form creates a pre-addressed message in the visitor’s email application; it does not store or transmit form data through the site.

## Cloudflare Pages

- Build root: `portfolio-site`
- Build command: `npm run build`
- Output directory: `dist`
- Node version: `22`
- Production URL: `https://leo-mabuku-portfolio.pages.dev`

Pushes to `master` deploy automatically through the existing Cloudflare Pages connection.

## Public repository refresh

The repositories used by the current case studies are explicitly included in `scripts/content-utils.mjs`, so they continue to refresh even when a GitHub topic is missing. Apply the `portfolio` topic to any new public repository that should become eligible for automated refresh. Forks, archived repositories and known empty or duplicate repositories remain excluded. The workflow must never fetch or publish private source, subscriber records or credentials.

See `PORTFOLIO_CONTENT_CHECKLIST.md` for remaining launch items.
