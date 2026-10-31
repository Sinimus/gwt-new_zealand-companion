/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'GWT New Zealand Companion',
        short_name: 'GWT:NZ',
        description:
          'Unofficial companion for Great Western Trail: New Zealand: setup for 1 to 4 players and solo, rules with rulebook pages, table helpers and the scoring pad.',
        theme_color: '#d97706',
        background_color: '#fdf6e3',
        display: 'standalone',
        lang: 'en',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
    }),
  ],
  test: {
    // e2e/ holds the Playwright browser test, which runs against the built image
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
