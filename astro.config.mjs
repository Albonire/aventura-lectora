import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// static output: the whole site is prebuilt html, js only where there is interaction
export default defineConfig({
  output: 'static',
  devToolbar: {
    enabled: false,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
