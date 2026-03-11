node index.js test-app// Custom type for import.meta.env to satisfy TS if not fully typed
/// <reference types="vite/client" />

import { setTriAppConfig, getTriAppConfig, TriAppConfig } from '@tririga/tririga-react-components';

export async function initTriAppConfig(): Promise<TriAppConfig> {
  // In Vite, use import.meta.env.* for dev; in production, create config from current environment
  if (import.meta.env.DEV) {
    const config: TriAppConfig = {
      instanceId: import.meta.env.VITE_INSTANCE_ID || '-1',
      tririgaUrl: import.meta.env.VITE_TRIRIGA_URL || 'http://localhost:8001',
      contextPath: import.meta.env.VITE_CONTEXT_PATH || '/dev',
      modelAndView: import.meta.env.VITE_MODEL_AND_VIEW || 'unknown',
      appPath: import.meta.env.VITE_BASE_PATH,
      appExposedName: import.meta.env.VITE_EXPOSED_NAME,
      sso: String(import.meta.env.VITE_SSO).toLowerCase() === 'true',
    };
    setTriAppConfig(config);
    return getTriAppConfig();
  }
  
  // Production: create config based on current location
  // Extract the app path from current URL
  const segments = window.location.pathname.split('/').filter(Boolean);
  let appPath = '/';
  if (segments[0] === 'app' && segments[1]) {
    appPath = `/app/${segments[1]}/`;
  }
  
  const config: TriAppConfig = {
    instanceId: "-1",
    tririgaUrl: window.location.origin,
    contextPath: "/app",
    modelAndView: "modelAndView", //update to match your TRIRIGA application
    appPath: appPath,
    appExposedName: "appExposedName", //update to match your TRIRIGA application
    sso: false
  };
  
  setTriAppConfig(config);
  return getTriAppConfig();
}
