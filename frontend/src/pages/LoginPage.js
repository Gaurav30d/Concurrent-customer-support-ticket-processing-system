// Login Page Component
import { renderNavbar, attachNavbarEvents } from '../components/Navbar.js';
import { authApi } from '../api/authApi.js';
import { authState } from '../state/authState.js';
import { toast } from '../state/toastState.js';

export function renderLoginPage() {
  const container = document.getElementById('app');
  if (!container) return;

  container.innerHTML = `
    ${renderNavbar()}

    <div style="flex-grow:1;display:flex;align-items:center;justify-content:center;padding:3rem 1.5rem;">
      <div class="card" style="width:100%;max-width:440px;padding:2.5rem;box-shadow:var(--shadow-xl);">
        <div style="text-align:center;margin-bottom:2rem;">
          <div class="brand-mark" style="margin:0 auto 1rem;width:44px;height:44px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          </div>
          <h2 style="font-size:1.65rem;margin-bottom:0.35rem;">Welcome back</h2>
          <p style="font-size:0.9rem;color:var(--text-secondary);">Sign in to access your role-specific dashboard</p>
        </div>

        <form id="login-form">
          <div class="form-group">
            <label class="form-label" for="login-email">Email Address</label>
            <input type="email" id="login-email" class="form-input" placeholder="name@company.com" required autocomplete="email" />
          </div>

          <div class="form-group">
            <label class="form-label" for="login-password">
              <span>Password</span>
            </label>
            <input type="password" id="login-password" class="form-input" placeholder="••••••••" required autocomplete="current-password" />
          </div>

          <div id="login-error-container" style="display:none;margin-bottom:1rem;" class="form-error"></div>

          <button type="submit" id="login-submit-btn" class="btn btn-primary w-full" style="padding:0.8rem;margin-top:0.5rem;">
            Sign In
          </button>
        </form>

        <!-- Quick Demo Profiles for instant testing -->
        <div style="margin-top:1.75rem;padding-top:1.25rem;border-top:1px solid var(--border-subtle);text-align:center;">
          <div style="font-size:0.75rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:0.75rem;">
            Quick Demo Profiles
          </div>
          <div style="display:flex;gap:0.5rem;justify-content:center;">
            <button type="button" class="btn btn-secondary btn-sm demo-fill-btn" data-email="race-customer@test.com" data-pass="password123">
              Customer
            </button>
            <button type="button" class="btn btn-secondary btn-sm demo-fill-btn" data-email="race-agent-1@test.com" data-pass="password123">
              Agent
            </button>
          </div>
        </div>

        <div style="margin-top:1.5rem;text-align:center;font-size:0.875rem;color:var(--text-secondary);">
          Don't have an account? <a href="#/signup" style="font-weight:600;">Sign up</a>
        </div>
      </div>
    </div>
  `;

  attachNavbarEvents();
  attachLoginPageEvents();
}

function attachLoginPageEvents() {
  const form = document.getElementById('login-form');
  const errorContainer = document.getElementById('login-error-container');
  const submitBtn = document.getElementById('login-submit-btn');

  // Demo profile quick fill
  document.querySelectorAll('.demo-fill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('login-email').value = btn.getAttribute('data-email');
      document.getElementById('login-password').value = btn.getAttribute('data-pass');
      if (errorContainer) errorContainer.style.display = 'none';
    });
  });

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;

      if (!email || !password) return;

      submitBtn.disabled = true;
      submitBtn.innerText = 'Authenticating...';
      if (errorContainer) errorContainer.style.display = 'none';

      try {
        const response = await authApi.login({ email, password });
        // response: { token, email, role }
        authState.login(response.token, response.email, response.role);
        toast.success(`Welcome back, ${response.email}`);

        // Role-based redirection
        if (response.role === 'ADMIN') {
          window.location.hash = '#/admin';
        } else if (response.role === 'AGENT') {
          window.location.hash = '#/agent';
        } else {
          window.location.hash = '#/customer';
        }
      } catch (err) {
        if (errorContainer) {
          errorContainer.innerText = err.message || 'Invalid email or password';
          errorContainer.style.display = 'block';
        }
        toast.error(err.message || 'Login failed');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Sign In';
      }
    });
  }
}
