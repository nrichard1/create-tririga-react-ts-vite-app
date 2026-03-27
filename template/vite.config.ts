import path from 'path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// TRIRIGA paths that need to be proxied during local development
const tririgaTarget = process.env.VITE_TRIRIGA_PROXY_TARGET || 'https://your-tririga-server.com';
const tririgaProxyPaths = ['/p/', '/api/', '/getCompanyFile.jsp', '/html/en/default/'];
const tririgaProxyConfig = Object.fromEntries(
  tririgaProxyPaths.map((p) => [
    p,
    { target: tririgaTarget, changeOrigin: true, secure: false },
  ])
);

// https://vite.dev/config/
export default defineConfig({
  // Base path must match the TRIRIGA view name /app/<appName>/
  base: '/app/appName/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: tririgaProxyConfig,
  },
})
