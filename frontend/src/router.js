// Client-Side Router with Role-Based Guards
import { authState } from './state/authState.js';
import { toast } from './state/toastState.js';
import { renderLandingPage } from './pages/LandingPage.js';
import { renderLoginPage } from './pages/LoginPage.js';
import { renderSignupPage } from './pages/SignupPage.js';
import { renderCustomerPage } from './pages/CustomerPage.js';
import { renderAgentPage } from './pages/AgentPage.js';
import { renderAdminPage } from './pages/AdminPage.js';

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  authState.subscribe(() => {
    // If user logs out while on a protected page, bounce to login
    if (!authState.isAuthenticated() && isProtectedPath(window.location.hash)) {
      window.location.hash = '#/login';
    }
  });

  // Initial routing
  handleRoute();
}

function isProtectedPath(hash) {
  const clean = hash.replace(/^#/, '').split('?')[0] || '/';
  return ['/customer', '/agent', '/admin'].some(p => clean.startsWith(p));
}

function handleRoute() {
  const hash = window.location.hash || '#/';
  const path = hash.replace(/^#/, '').split('?')[0] || '/';
  const isAuth = authState.isAuthenticated();
  const role = authState.getRole();

  // Scroll to top on navigation
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Public Guest Routes
  if (path === '/' || path === '') {
    renderLandingPage();
    return;
  }

  if (path === '/login') {
    if (isAuth) {
      redirectToRoleWorkspace(role);
      return;
    }
    renderLoginPage();
    return;
  }

  if (path === '/signup') {
    if (isAuth) {
      redirectToRoleWorkspace(role);
      return;
    }
    renderSignupPage();
    return;
  }

  // Protected Role Routes
  if (path === '/customer') {
    if (!isAuth) {
      toast.warning('Please sign in to access your customer workspace');
      window.location.hash = '#/login';
      return;
    }
    if (role !== 'CUSTOMER' && role !== 'ADMIN') {
      toast.error('Access Denied: Customer workspace is restricted to customer accounts');
      redirectToRoleWorkspace(role);
      return;
    }
    renderCustomerPage();
    return;
  }

  if (path === '/agent') {
    if (!isAuth) {
      toast.warning('Please sign in to access the agent workbench');
      window.location.hash = '#/login';
      return;
    }
    if (role !== 'AGENT') {
      toast.error('Access Denied: Support Agent workbench requires ROLE_AGENT permissions');
      redirectToRoleWorkspace(role);
      return;
    }
    renderAgentPage();
    return;
  }

  if (path === '/admin') {
    if (!isAuth) {
      toast.warning('Admin authentication required');
      window.location.hash = '#/login';
      return;
    }
    if (role !== 'ADMIN') {
      toast.error('Access Denied: Admin Mission Control requires ROLE_ADMIN permissions');
      redirectToRoleWorkspace(role);
      return;
    }
    renderAdminPage();
    return;
  }

  // Fallback 404
  renderNotFound(path);
}

function redirectToRoleWorkspace(role) {
  if (role === 'ADMIN') {
    window.location.hash = '#/admin';
  } else if (role === 'AGENT') {
    window.location.hash = '#/agent';
  } else {
    window.location.hash = '#/customer';
  }
}

function renderNotFound(path) {
  const container = document.getElementById('app');
  if (!container) return;

  container.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:2rem;">
      <div class="card" style="max-width:440px;padding:3rem;">
        <h1 style="font-size:3.5rem;color:var(--primary-400);margin-bottom:0.5rem;">404</h1>
        <h3 style="margin-bottom:0.75rem;">Page Not Found</h3>
        <p style="color:var(--text-secondary);font-size:0.95rem;margin-bottom:2rem;">
          The route <code>${escapeHtml(path)}</code> does not exist in ResolveIQ.
        </p>
        <a href="#/" class="btn btn-primary">Return to Homepage</a>
      </div>
    </div>
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}
