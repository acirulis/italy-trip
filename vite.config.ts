import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    // Served from https://<user>.github.io/<repo>/ on GitHub Pages, so assets
    // must be emitted with that prefix. Override with VITE_BASE_PATH (e.g. '/'
    // for a custom domain or a user/organisation page).
    base: process.env.VITE_BASE_PATH ?? '/italy-trip/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // Set DISABLE_HMR=true to turn off HMR and file watching.
      // Useful when an automated editor rewrites files in place: it prevents
      // reload flickering and saves CPU. Leave the behaviour as-is.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
