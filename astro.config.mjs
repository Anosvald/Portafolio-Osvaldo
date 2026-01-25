// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Eliminamos la línea de output: 'hybrid' porque ya no es necesaria en Astro 5
  vite: {
    plugins: [tailwindcss()]
  }
});