import path from 'path'
import { defineConfig, Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// TRIRIGA server to proxy API calls to during local development
const tririgaTarget = process.env.VITE_TRIRIGA_PROXY_TARGET || 'https://your-tririga-server.com';
const appBase = '/app/appName';

const tririgaProxyOptions = {
  target: tririgaTarget,
  changeOrigin: true,
  secure: false,
  cookieDomainRewrite: '',
  autoRewrite: true,
};

// Paths that need to be proxied to TRIRIGA
const tririgaProxyPaths = ['/p/', '/api/', '/getCompanyFile.jsp', '/html/en/default/', '/index.jsp'];
const tririgaProxyConfig: Record<string, any> = Object.fromEntries(
  tririgaProxyPaths.map((p) => [p, tririgaProxyOptions])
);

// Proxy /app/* to TRIRIGA EXCEPT our own app (e.g. /app/tririga-login used by the login iframe)
tririgaProxyConfig['/app/'] = {
  ...tririgaProxyOptions,
  bypass(req: { url?: string }) {
    if (req.url?.startsWith(appBase)) return req.url;
    return undefined;
  },
};

// After TRIRIGA login, it redirects back to /app/<name>/index.jsp — rewrite to serve index.html
function tririgaRewritePlugin(): Plugin {
  return {
    name: 'tririga-rewrite',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url?.startsWith(appBase) && req.url?.includes('index.jsp')) {
          req.url = req.url.replace(/index\.jsp[^#]*/, '');
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  // Base path must match the TRIRIGA view name /app/<appName>/
  base: '/app/appName/',
  plugins: [tririgaRewritePlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: tririgaProxyConfig,
  },
})
