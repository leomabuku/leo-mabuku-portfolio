import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'https://leomabuku.me',
  integrations: [sitemap()],
  vite: { optimizeDeps: { include: ['axe-core'] } },
  server: { host: '0.0.0.0', allowedHosts: ['terminal.local', '.e2b.app', '.vercel.app'] },
  output: 'static'
});
