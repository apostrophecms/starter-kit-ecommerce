import { defineConfig } from '@apostrophecms/vite/vite';

export default defineConfig({
  server: {
    watch: {
      // So that Tailwind CSS changes in the nunjucks templates do not trigger Vite
      // page reloads. This is done by `nodemon` and apos "refresh on restart"
      // because we need a process restart.
      ignored: [
        '**/modules/views/**/*.html',
        '**/views/**/*.html'
      ]
    }
  }
});
