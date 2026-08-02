import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    tsconfigPaths(),
    react(),
    tailwindcss(),
  ],
  server: {
    port: 8080,
    host: true,
    proxy: {
      '/dashboard': {
        target: 'http://127.0.0.1:7000',
        rewrite: (path) => path.replace(/^\/dashboard/, ''),
        changeOrigin: true,
        ws: true,
      },
      '/api': {
        target: 'http://127.0.0.1:7000',
        changeOrigin: true,
        ws: true,
      },
      '/static': {
        target: 'http://127.0.0.1:7000',
        changeOrigin: true,
      },
      ...['/login', '/notes', '/calendar', '/cookbook', '/email', '/memory', '/gallery', '/tasks', '/library', '/backgrounds'].reduce((acc, path) => ({
        ...acc,
        [path]: {
          target: 'http://127.0.0.1:7000',
          changeOrigin: true,
        }
      }), {})
    }
  },
});



