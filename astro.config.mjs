import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

const PORT = process.env.PORT || 3180;

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: 'static',
  adapter: cloudflare(),
  server: {
    port: parseInt(PORT),
    host: true
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  site: 'https://pollytalkie.com',
  build: {
    assets: '_astro'
  }
});
