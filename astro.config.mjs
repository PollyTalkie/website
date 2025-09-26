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
  output: 'hybrid',
  adapter: cloudflare(),
  server: {
    port: parseInt(PORT),
    host: true
  },
  vite: {
    server: {
      host: true,
      // Explicitly list all possible hosts that might be used in development
      allowedHosts: [
        'localhost',
        'pollytalkie.com',
        'www.pollytalkie.com',
        'api.pollytalkie.com',
        'app.pollytalkie.com',
        'pollytalkie.cn',
        'www.pollytalkie.cn',
        'api.pollytalkie.cn',
        'app.pollytalkie.cn',
      ],
      // Reset HMR to default to avoid potential conflicts
      hmr: true,
    },
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
