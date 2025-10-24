import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://bdenizkoca.studio',
  integrations: [
    mdx(), 
    sitemap(),
    AstroPWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Deniz Koca — Digital Workshop',
        short_name: 'Deniz Koca',
        description: 'Projects, notes, and narrative work of Deniz Koca. Minimalist Chaos, carefully crafted.',
        theme_color: '#608da8',
        background_color: '#F8F7F4',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/assets/images/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/assets/images/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/assets/images/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/assets/images/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  output: 'static'
});
