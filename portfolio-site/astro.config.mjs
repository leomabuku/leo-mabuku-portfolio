import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'https://leo-mabuku.pages.dev',
  integrations: [sitemap()],
  server: { host: '0.0.0.0', allowedHosts: ['terminal.local'] },
  output: 'static'
});
