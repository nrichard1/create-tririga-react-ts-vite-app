// AuthService.ts
import { getTriAppConfig, standardTririgaLogin, TriLoginApi } from '@tririga/tririga-react-components';

export class AuthService {
  /**
   * Helper to construct a URL for manual login redirection if needed
   */
  static buildLoginUrl(): string {
    const cfg = getTriAppConfig();
    const base = `${cfg.tririgaUrl}${cfg.contextPath}`;
    const redirect = window.location.href;
    return `${base}/?initialUri=${encodeURIComponent(redirect)}`;
  }

  /**
   * Forces a login check. Use this if you suspect the session is dead.
   */
  static async login(): Promise<void> {
    const cfg = getTriAppConfig();
    try {
      // standardTririgaLogin handles the redirect logic internally
      const user = await standardTririgaLogin();
      if (!user) {
        // If it returns null/false, it means a redirect is likely happening
        return; 
      }
    } catch (e) {
      console.warn("Login helper failed, falling back to manual redirect", e);
    }
    // Fallback
    window.location.assign(this.buildLoginUrl());
  }

  /**
   * Logs the user out of TRIRIGA and reloads the page.
   */
  static async logout(): Promise<void> {
    const cfg = getTriAppConfig();
    try {
      // Try using the SDK's API first
      if (TriLoginApi && typeof TriLoginApi.logout === 'function') {
        await TriLoginApi.logout();
      } else {
        throw new Error('TriLoginApi.logout not available');
      }
    } catch (e) {
      // Fallback: Manual fetch to the logout endpoint
      try {
        await fetch(`${cfg.tririgaUrl}${cfg.contextPath}/logout`, {
          method: 'POST',
          credentials: 'include'
        });
      } catch (_) { /* ignore fetch errors */ }
    }
    // Reloading will trigger the bootstrap logic in main.tsx, which sends them to the login screen
    window.location.reload();
  }
}
