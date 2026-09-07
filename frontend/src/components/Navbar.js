// Dynamic App Navbar Component
import { authState } from '../state/authState.js';
import { renderRoleBadge } from './Badges.js';

export function renderNavbar() {
  const isAuth = authState.isAuthenticated();
  const role = authState.getRole();
  const email = authState.getEmail();

  let roleDashboardUrl = '#/';
  if (role === 'ADMIN') roleDashboardUrl = '#/admin';
  else if (role === 'AGENT') roleDashboardUrl = '#/agent';
  else if (role === 'CUSTOMER') roleDashboardUrl = '#/customer';

  return `
    <header class="landing-navbar">
      <div class="container landing-nav-inner">
        <a href="${isAuth ? roleDashboardUrl : '#/'}" class="brand-logo">
          <div class="brand-mark">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <span>Resolve<strong style="color:var(--primary-400);">IQ</strong></span>
          ${isAuth && role ? renderRoleBadge(role) : ''}
        </a>

        <nav class="nav-links">
          ${!isAuth ? `
            <a href="#how-it-works" class="nav-link">How It Works</a>
            <a href="#roles" class="nav-link">Role Experience</a>
            <a href="#architecture" class="nav-link">Architecture</a>
            <a href="#tech" class="nav-link">Technology</a>
          ` : `
            <a href="${roleDashboardUrl}" class="nav-link">Workspace</a>
            ${role === 'ADMIN' ? `<a href="#/admin" class="nav-link">Engine Telemetry</a>` : ''}
          `}
        </nav>

        <div class="flex items-center gap-3">
          ${!isAuth ? `
            <a href="#/login" class="btn btn-secondary btn-sm">Sign In</a>
            <a href="#/signup" class="btn btn-primary btn-sm">Get Started</a>
          ` : `
            <div class="user-profile-summary" style="margin-right:0.5rem;">
              <div class="user-avatar">${email ? email[0].toUpperCase() : 'U'}</div>
              <div class="user-info-text">
                <span class="user-email-text">${escapeHtml(email)}</span>
              </div>
            </div>
            <button id="nav-logout-btn" class="btn btn-secondary btn-sm" title="Sign Out">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Logout</span>
            </button>
          `}
        </div>
      </div>
    </header>
  `;
}

export function attachNavbarEvents() {
  const logoutBtn = document.getElementById('nav-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      authState.logout();
      window.location.hash = '#/login';
    });
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}
