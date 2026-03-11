import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { initTriAppConfig } from './services/tririgaService'
import { createAppModel } from './model/AppModel'
import { standardTririgaLogin, getAuthCheckerForCurrentApp } from '@tririga/tririga-react-components'

// Determine base path when deployed under TRIRIGA like /app/viewName/
const computeBasePath = () => {
  const segments = window.location.pathname.split('/').filter(Boolean)
  // Expect pattern: [ 'app', '<viewId>', ...]
  if (segments[0] === 'app' && segments[1]) {
    return `/app/${segments[1]}`
  }
  return '' // fallback for local dev (served at root)
}

const basename = computeBasePath()

async function bootstrap() {
  let shouldRenderApp = true;
  try {
    // Ensure app config is available
    await initTriAppConfig()
    
    // Auto-login logic
    const autoLogin = !import.meta.env.DEV || String(import.meta.env.VITE_AUTO_LOGIN ?? 'false') === 'true'
    if (autoLogin) {
      const currentUser = await standardTririgaLogin();
      if (!currentUser) {
        shouldRenderApp = false;
        return;
      }
      
      try {
        // Optional auth check
        const authChecker = await getAuthCheckerForCurrentApp()
        if (authChecker && !authChecker.hasPermission('read')) {
             alert("Unauthorized access");
             shouldRenderApp = false;
        }
      } catch (e) {
        console.warn('Auth check skipped or failed', e)
      }
    }

    if (shouldRenderApp) {
      // Initialize Model
      createAppModel((err: any) => console.error("Model Error:", err));
      
      const root = createRoot(document.getElementById('root')!)
      root.render(
        <StrictMode>
          <HashRouter>
            <App />
          </HashRouter>
        </StrictMode>,
      )
    }
  } catch (e) {
    console.error('Bootstrap failed', e)
    document.body.innerHTML = `<div style="padding: 20px; color: red;"><h3>Application Error</h3><p>Failed to initialize application configuration.</p></div>`;
  }
}

bootstrap()
