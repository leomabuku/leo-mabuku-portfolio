# leo-mabuku-portfolio

Personal portfolio website for Leo Mabuku, built with Astro and TypeScript.

## Repository structure

- `portfolio-site/` — Astro application source, content, assets, and scripts
- `.github/workflows/` — automation workflows (including content refresh)

## Tech stack

- Astro 5
- TypeScript
- GSAP
- Three.js
- Vitest

## Getting started

From the repository root:

```sh
cd portfolio-site
npm install
npm run dev
```

## Quality checks

```sh
cd portfolio-site
npm test
npm run build
```

## Helpful scripts

- `npm run dev` — start local dev server
- `npm run check` — run Astro type/content checks
- `npm test` — run test suite
- `npm run build` — type-check and build production output
- `npm run refresh` — refresh portfolio content cache data

## Deployment

The site is deployed from `portfolio-site/` to Cloudflare Pages.
