import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'GWT:NZ Companion',
        short_name: 'GWT:NZ',
        theme_color: '#f59e0b',
        icons: [],
      },
    }),
  ],
});
