import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://lmxti.github.io',
  base: '/',
  integrations: [tailwind(), react()]
});