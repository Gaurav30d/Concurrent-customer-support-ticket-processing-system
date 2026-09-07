// Admin Mission Control Page Component
import { renderNavbar, attachNavbarEvents } from '../components/Navbar.js';
import { adminApi } from '../api/adminApi.js';
import { renderConcurrencyWidget } from '../components/ConcurrencyWidget.js';
import { renderRoleBadge } from '../components/Badges.js';
import { openModal, closeModal } from '../components/Modal.js';
import { renderEmptyState } from '../components/EmptyState.js';
import { toast } from '../state/toastState.js';

let users = [];
let activeRoleFilter = 'ALL';
let searchQuery = '';
let unsubscribeTelemetry = null;

export async function renderAdminPage() {
  const container = document.getElementById('app');
  if (!container) return;

  container.innerHTML = `
    ${renderNavbar()}

    <main class="app-main">
      <div class="workspace-content">
        <!-- Page Header -->
        <div class="page-header">
          <div>
            <h1 class="page-title">Admin Mission Control</h1>
            <p class="page-subtitle">Real-time worker concurrency telemetry, agent provisioning, and user access oversight</p>
          </div>
          <button id="btn-provision-agent" class="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
            <span>Provision Support Agent</span>
          </button>
        </div>

        <!-- Live Concurrency Telemetry Widget -->
        <div id="admin-telemetry-container" style="margin-bottom:2.5rem;"></div>

        <!-- User Management Header & Filters -->
        <div class="page-header" style="margin-bottom:1rem;">
          <div>
            <h3 style="font-size:1.35rem;">System User Directory</h3>
            <p style="font-size:0.875rem;color:var(--text-secondary);">Browse all provisioned customers, agents, and administrators</p>
          </div>

          <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
            <div class="filter-pills" id="admin-role-filter-pills">
              <button class="filter-pill active" data-role="ALL">All Users</button>
              <button class="filter-pill" data-role="CUSTOMER">Customers</button>
              <button class="filter-pill" data-role="AGENT">Agents</button>
              <button class="filter-pill" data-role="ADMIN">Admins</button>
            </div>

            <input type="text" id="admin-user-search" class="form-input" placeholder="Search by name or email..." style="width:240px;padding:0.45rem 0.85rem;font-size:0.85rem;" />
          </div>
        </div>

        <!-- Users Table -->
        <div class="table-wrapper" id="admin-users-table-container">
          <div class="skeleton skeleton-card"></div>
        </div>
      </div>
    </main>
  `;

  attachNavbarEvents();
  attachAdminPageEvents();

  // Render live telemetry
  if (unsubscribeTelemetry) unsubscribeTelemetry();
  unsubscribeTelemetry = renderConcurrencyWidget('admin-telemetry-container');

  // Load user directory
  loadAdminUsers();
}

async function loadAdminUsers() {
  const tableContainer = document.getElementById('admin-users-table-container');
  if (!tableContainer) return;

  try {
    users = await adminApi.getAllUsers();
    renderFilteredUsers();
  } catch (err) {
    tableContainer.innerHTML = `
      <div style="padding:2rem;text-align:center;">
        <h4 style="color:var(--accent-rose);margin-bottom:0.5rem;">Failed to load user directory</h4>
        <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:1rem;">${escapeHtml(err.message)}</p>
        <button id="btn-retry-users" class="btn btn-secondary btn-sm">Retry</button>
      </div>
    `;
    const retryBtn = document.getElementById('btn-retry-users');
    if (retryBtn) retryBtn.addEventListener('click', loadAdminUsers);
  }
}

function renderFilteredUsers() {
  const tableContainer = document.getElementById('admin-users-table-container');
  if (!tableContainer) return;

  const filtered = users.filter(user => {
    if (activeRoleFilter !== 'ALL' && user.role !== activeRoleFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = (user.username || '').toLowerCase().includes(q);
      const matchEmail = (user.email || '').toLowerCase().includes(q);
      const matchId = user.id.toString().includes(q);
      if (!matchName && !matchEmail && !matchId) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    tableContainer.innerHTML = renderEmptyState({
      title: 'No users found',
      description: 'No accounts match the selected role or search query.'
    });
    return;
  }

  tableContainer.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>User ID</th>
          <th>Name / Username</th>
          <th>Email Address</th>
          <th>Assigned Role</th>
          <th style="text-align:right;">Status</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map(u => `
          <tr>
            <td style="font-family:var(--font-mono);font-weight:700;color:var(--text-muted);">#${u.id}</td>
            <td style="font-weight:600;color:var(--text-primary);">${escapeHtml(u.username || '—')}</td>
            <td>${escapeHtml(u.email)}</td>
            <td>${renderRoleBadge(u.role)}</td>
            <td style="text-align:right;">
              <span class="badge" style="background:rgba(16,185,129,0.12);color:var(--accent-emerald);">Active</span>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function attachAdminPageEvents() {
  const provisionBtn = document.getElementById('btn-provision-agent');
  if (provisionBtn) {
    provisionBtn.addEventListener('click', openProvisionAgentModal);
  }

  // Role filter pills
  const pills = document.querySelectorAll('#admin-role-filter-pills .filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeRoleFilter = pill.getAttribute('data-role');
      renderFilteredUsers();
    });
  });

  // Search input
  const searchInput = document.getElementById('admin-user-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderFilteredUsers();
    });
  }
}

function openProvisionAgentModal() {
  const bodyHtml = `
    <form id="modal-provision-agent-form">
      <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:1.25rem;">
        Provisioning an agent grants access to the Support Agent Workbench, ticket claiming, and status workflow transitions.
      </p>

      <div class="form-group">
        <label class="form-label" for="agent-name">Agent Full Name</label>
        <input type="text" id="agent-name" class="form-input" placeholder="Sam Vance" required />
      </div>

      <div class="form-group">
        <label class="form-label" for="agent-email">Agent Email Address</label>
        <input type="email" id="agent-email" class="form-input" placeholder="sam.vance@company.com" required />
      </div>

      <div class="form-group">
        <label class="form-label" for="agent-password">Initial Password</label>
        <input type="password" id="agent-password" class="form-input" placeholder="••••••••" required minlength="6" />
        <span style="font-size:0.75rem;color:var(--text-muted);margin-top:0.25rem;">Min. 6 characters. Passwords are securely hashed with BCrypt.</span>
      </div>
    </form>
  `;

  openModal({
    title: 'Provision New Support Agent',
    bodyHtml,
    confirmText: 'Provision Agent',
    confirmClass: 'btn-primary',
    onConfirm: async () => {
      const name = document.getElementById('agent-name').value.trim();
      const email = document.getElementById('agent-email').value.trim();
      const password = document.getElementById('agent-password').value;

      if (!name || !email || !password) {
        toast.error('All fields are required');
        return false;
      }
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
      }

      try {
        await adminApi.createAgent({ name, email, password });
        toast.success(`Agent ${name} provisioned successfully!`);
        loadAdminUsers();
        return true;
      } catch (err) {
        toast.error(err.message || 'Failed to provision agent');
        return false;
      }
    }
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}
