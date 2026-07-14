# Leo Mabuku Portfolio

Astro portfolio for Leo Mabuku, designed for static deployment to Cloudflare Pages.

## Local development

```sh
npm install
npm run dev
```

## Cloudflare Pages

- Repository root: this Git repository
- Build root directory: `portfolio-site`
- Build command: `npm run build`
- Output directory: `dist`
- Node version: `22`

Set `SITE_URL` to the final `pages.dev` or custom-domain URL. Static hosting is free; only optional AI usage or a custom domain can add cost.

## Content refresh

Apply the GitHub topic `portfolio` to repositories that should be featured. The scheduled workflow runs daily and can also be triggered manually. If no repository has that topic yet, the approved initial four-project set is used.

GitHub Models summaries are cached. If generation is unavailable, the last successful summary or repository description remains in place. Paid model usage should stay disabled.

Drive import remains intentionally inactive until a dedicated folder, structured source document, approved PDF, and read-only service-account credentials are supplied. Do not use a broad Gmail or Drive scope.
