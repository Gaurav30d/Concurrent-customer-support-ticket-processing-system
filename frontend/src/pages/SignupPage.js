// Customer Signup Page Component
import { renderNavbar, attachNavbarEvents } from '../components/Navbar.js';
import { authApi } from '../api/authApi.js';
import { authState } from '../state/authState.js';
import { toast } from '../state/toastState.js';

export function renderSignupPage() {
  const container = document.getElementById('app');
  if (!container) return;

  container.innerHTML = `
    ${renderNavbar()}

    <div style="flex-grow:1;display:flex;align-items:center;justify-content:center;padding:3rem 1.5rem;">
      <div class="card" style="width:100%;max-width:460px;padding:2.5rem;box-shadow:var(--shadow-xl);">
        <div style="text-align:center;margin-bottom:2rem;">
          <div class="brand-mark" style="margin:0 auto 1rem;width:44px;height:44px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          </div>
          <h2 style="font-size:1.65rem;margin-bottom:0.35rem;">Create an account</h2>
          <p style="font-size:0.9rem;color:var(--text-secondary);">Join ResolveIQ to submit and track support tickets</p>
        </div>

        <form id="signup-form">
          <div class="form-group">
            <label class="form-label" for="signup-name">Full Name</label>
            <input type="text" id="signup-name" class="form-input" placeholder="Alex Morgan" required autocomplete="name" />
          </div>

          <div class="form-group">
            <label class="form-label" for="signup-email">Email Address</label>
            <input type="email" id="signup-email" class="form-input" placeholder="alex@example.com" required autocomplete="email" />
          </div>

          <div class="form-group">
            <label class="form-label" for="signup-password">
              <span>Password</span>
              <span style="font-weight:400;font-size:0.75rem;color:var(--text-muted);">Min. 6 characters</span>
            </label>
            <input type="password" id="signup-password" class="form-input" placeholder="••••••••" required minlength="6" autocomplete="new-password" />
          </div>

          <div id="signup-error-container" style="display:none;margin-bottom:1rem;" class="form-error"></div>

          <button type="submit" id="signup-submit-btn" class="btn btn-primary w-full" style="padding:0.8rem;margin-top:0.5rem;">
            Create Account
          </button>
        </form>

        <div style="margin-top:1.5rem;text-align:center;font-size:0.875rem;color:var(--text-secondary);">
          Already have an account? <a href="#/login" style="font-weight:600;">Sign in</a>
        </div>
      </div>
    </div>
  `;

  attachNavbarEvents();
  attachSignupPageEvents();
}

function attachSignupPageEvents() {
  const form = document.getElementById('signup-form');
  const errorContainer = document.getElementById('signup-error-container');
  const submitBtn = document.getElementById('signup-submit-btn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;

      if (!name || !email || !password) return;

      if (password.length < 6) {
        if (errorContainer) {
          errorContainer.innerText = 'Password must be at least 6 characters long';
          errorContainer.style.display = 'block';
        }
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerText = 'Creating Account...';
      if (errorContainer) errorContainer.style.display = 'none';

      try {
        await authApi.register({ name, email, password });
        toast.success('Account created successfully! Logging you in...');

        // Auto-login newly registered customer
        const loginResponse = await authApi.login({ email, password });
        authState.login(loginResponse.token, loginResponse.email, loginResponse.role);
        window.location.hash = '#/customer';
      } catch (err) {
        if (errorContainer) {
          errorContainer.innerText = err.message || 'Registration failed';
          errorContainer.style.display = 'block';
        }
        toast.error(err.message || 'Registration failed');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Create Account';
      }
    });
  }
}
