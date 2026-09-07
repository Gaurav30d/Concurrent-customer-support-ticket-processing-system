// Support Agent Workbench Page Component
import { renderNavbar, attachNavbarEvents } from '../components/Navbar.js';
import { agentApi } from '../api/agentApi.js';
import { renderStatusBadge, renderPriorityBadge, renderCategoryBadge } from '../components/Badges.js';
import { openTicketDrawer } from '../components/TicketDetailView.js';
import { renderEmptyState } from '../components/EmptyState.js';
import { toast } from '../state/toastState.js';

let activeAgentTab = 'assigned'; // 'assigned' | 'available'
let assignedTickets = [];
let availableTickets = [];
let averageRating = null;

export async function renderAgentPage() {
  const container = document.getElementById('app');
  if (!container) return;

  container.innerHTML = `
    ${renderNavbar()}

    <main class="app-main">
      <div class="workspace-content">
        <!-- Page Header -->
        <div class="page-header">
          <div>
            <h1 class="page-title">Support Agent Workbench</h1>
            <p class="page-subtitle">Process incoming tickets, progress resolution workflows, and track customer satisfaction</p>
          </div>
          <button id="btn-refresh-agent-queue" class="btn btn-secondary btn-sm">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
            <span>Refresh Queue</span>
          </button>
        </div>

        <!-- Agent KPI Banner -->
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Average Satisfaction</span>
              <div class="metric-icon" style="background:rgba(245,158,11,0.15);color:var(--accent-amber);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
            </div>
            <div class="metric-value" id="kpi-rating" style="color:var(--accent-amber);">—</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.4rem;">Based on customer closed ratings</div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">My Assigned Queue</span>
              <div class="metric-icon" style="background:rgba(99,102,241,0.15);color:var(--primary-400);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              </div>
            </div>
            <div class="metric-value" id="kpi-assigned-count">0</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.4rem;">Active tickets assigned to you</div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Global Unclaimed</span>
              <div class="metric-icon" style="background:rgba(6,182,212,0.15);color:var(--accent-cyan);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
            </div>
            <div class="metric-value" id="kpi-unclaimed-count">0</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.4rem;">Available for claiming</div>
          </div>
        </div>

        <!-- Workbench Tabs -->
        <div style="display:flex;align-items:center;gap:1rem;border-bottom:1px solid var(--border-subtle);margin-bottom:1.5rem;">
          <button class="nav-link ${activeAgentTab === 'assigned' ? 'active' : ''}" id="agent-tab-assigned" style="padding-bottom:0.75rem;background:none;border:none;cursor:pointer;font-weight:700;border-bottom:2px solid ${activeAgentTab === 'assigned' ? 'var(--primary-500)' : 'transparent'};color:${activeAgentTab === 'assigned' ? 'var(--text-primary)' : 'var(--text-muted)'};">
            My Assigned Tickets (<span id="tab-count-assigned">0</span>)
          </button>
          <button class="nav-link ${activeAgentTab === 'available' ? 'active' : ''}" id="agent-tab-available" style="padding-bottom:0.75rem;background:none;border:none;cursor:pointer;font-weight:700;border-bottom:2px solid ${activeAgentTab === 'available' ? 'var(--primary-500)' : 'transparent'};color:${activeAgentTab === 'available' ? 'var(--text-primary)' : 'var(--text-muted)'};">
            Available Unclaimed Queue (<span id="tab-count-available">0</span>)
          </button>
        </div>

        <!-- Workbench Content Container -->
        <div id="agent-content-container">
          <div class="skeleton skeleton-card"></div>
          <div class="skeleton skeleton-card"></div>
        </div>
      </div>
    </main>
  `;

  attachNavbarEvents();
  attachAgentPageEvents();
  loadAgentData();
}

async function loadAgentData() {
  const container = document.getElementById('agent-content-container');
  if (!container) return;

  try {
    const [assigned, available, rating] = await Promise.all([
      agentApi.getMyAssignedTickets(),
      agentApi.getAvailableTickets(),
      agentApi.getAverageRating()
    ]);

    assignedTickets = assigned || [];
    assignedTickets.sort((a, b) => b.id - a.id);
    availableTickets = available || [];
    availableTickets.sort((a, b) => b.id - a.id);
    averageRating = rating;

    updateKPIs();
    renderAgentContent();
  } catch (err) {
    container.innerHTML = `
      <div class="card" style="padding:2rem;text-align:center;border-color:rgba(244,63,94,0.3);">
        <h4 style="color:var(--accent-rose);margin-bottom:0.5rem;">Failed to load agent queue</h4>
        <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:1rem;">${escapeHtml(err.message)}</p>
        <button id="btn-retry-agent" class="btn btn-secondary btn-sm">Retry</button>
      </div>
    `;
    const retryBtn = document.getElementById('btn-retry-agent');
    if (retryBtn) retryBtn.addEventListener('click', loadAgentData);
  }
}

function updateKPIs() {
  const ratingEl = document.getElementById('kpi-rating');
  const assignedEl = document.getElementById('kpi-assigned-count');
  const unclaimedEl = document.getElementById('kpi-unclaimed-count');
  const tabAssignedEl = document.getElementById('tab-count-assigned');
  const tabAvailableEl = document.getElementById('tab-count-available');

  if (ratingEl) {
    const num = Number(averageRating);
    ratingEl.innerText = (!isNaN(num) && averageRating !== null && averageRating !== '')
      ? `★ ${num.toFixed(1)} / 5.0`
      : 'No ratings yet';
  }
  if (assignedEl) assignedEl.innerText = assignedTickets.length;
  if (unclaimedEl) unclaimedEl.innerText = availableTickets.length;
  if (tabAssignedEl) tabAssignedEl.innerText = assignedTickets.length;
  if (tabAvailableEl) tabAvailableEl.innerText = availableTickets.length;
}

function renderAgentContent() {
  const container = document.getElementById('agent-content-container');
  if (!container) return;

  if (activeAgentTab === 'assigned') {
    renderAssignedView(container);
  } else {
    renderAvailableView(container);
  }
}

function renderAssignedView(container) {
  if (assignedTickets.length === 0) {
    container.innerHTML = renderEmptyState({
      title: 'No tickets assigned to you',
      description: 'You currently have no active assigned tickets. Check the unclaimed queue to pick up new work!',
      actionText: 'Browse Unclaimed Queue',
      actionId: 'btn-switch-to-available'
    });
    const switchBtn = document.getElementById('btn-switch-to-available');
    if (switchBtn) {
      switchBtn.addEventListener('click', () => {
        activeAgentTab = 'available';
        updateTabStyles();
        renderAgentContent();
      });
    }
    return;
  }

  container.innerHTML = `
    <div class="tickets-grid">
      ${assignedTickets.map(t => `
        <div class="ticket-item-card" data-id="${t.id}">
          <div class="ticket-info-main">
            <div class="ticket-header-row">
              <span class="ticket-id">#${t.id}</span>
              ${renderStatusBadge(t.status)}
              ${renderPriorityBadge(t.priority)}
              ${renderCategoryBadge(t.category)}
            </div>
            <div class="ticket-title">${escapeHtml(t.title)}</div>
            <div class="ticket-meta-row">
              <span>Customer ID: #${t.customerId}</span>
              <span>Created ${formatDate(t.createdAt)}</span>
              ${t.dueBy ? `<span>SLA Due: <strong>${formatDate(t.dueBy)}</strong></span>` : ''}
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:0.5rem;" onclick="event.stopPropagation();">
            ${t.status === 'ASSIGNED' ? `
              <button class="btn btn-primary btn-sm btn-status-progress" data-id="${t.id}" data-status="IN_PROGRESS">
                Start Working &rarr;
              </button>
            ` : ''}

            ${t.status === 'IN_PROGRESS' ? `
              <button class="btn btn-primary btn-sm btn-status-resolve" data-id="${t.id}" data-status="RESOLVED" style="background:var(--accent-emerald);">
                ✓ Mark Resolved
              </button>
            ` : ''}

            <button class="btn btn-secondary btn-sm btn-view-drawer" data-id="${t.id}">
              Details & Comments &rarr;
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  attachAssignedViewListeners(container);
}

function renderAvailableView(container) {
  if (availableTickets.length === 0) {
    container.innerHTML = renderEmptyState({
      title: 'Queue is clean!',
      description: 'There are no unclaimed tickets waiting in the queue. Outstanding work is fully allocated.'
    });
    return;
  }

  container.innerHTML = `
    <div class="tickets-grid">
      ${availableTickets.map(t => `
        <div class="ticket-item-card" data-id="${t.id}">
          <div class="ticket-info-main">
            <div class="ticket-header-row">
              <span class="ticket-id">#${t.id}</span>
              ${renderStatusBadge(t.status)}
              ${renderPriorityBadge(t.priority)}
              ${renderCategoryBadge(t.category)}
            </div>
            <div class="ticket-title">${escapeHtml(t.title)}</div>
            <div class="ticket-meta-row">
              <span>Created ${formatDate(t.createdAt)}</span>
              ${t.dueBy ? `<span>SLA Deadline: <strong>${formatDate(t.dueBy)}</strong></span>` : ''}
              <span style="color:var(--accent-emerald);font-weight:600;">● Unassigned</span>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:0.5rem;" onclick="event.stopPropagation();">
            <button class="btn btn-primary btn-sm btn-claim-ticket" data-id="${t.id}">
              ⚡ Claim Ticket
            </button>
            <button class="btn btn-secondary btn-sm btn-view-drawer" data-id="${t.id}">
              Inspect &rarr;
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  attachAvailableViewListeners(container);
}

function attachAssignedViewListeners(container) {
  container.querySelectorAll('.ticket-item-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = Number(card.getAttribute('data-id'));
      const ticket = assignedTickets.find(t => t.id === id);
      if (ticket) openTicketDrawer(ticket, loadAgentData);
    });
  });

  container.querySelectorAll('.btn-view-drawer').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = Number(btn.getAttribute('data-id'));
      const ticket = assignedTickets.find(t => t.id === id);
      if (ticket) openTicketDrawer(ticket, loadAgentData);
    });
  });

  container.querySelectorAll('.btn-status-progress, .btn-status-resolve').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = Number(btn.getAttribute('data-id'));
      const status = btn.getAttribute('data-status');

      btn.disabled = true;
      btn.innerText = 'Updating...';

      try {
        await agentApi.updateStatus(id, status);
        toast.success(`Ticket #${id} transitioned to ${status}`);
        loadAgentData();
      } catch (err) {
        toast.error(err.message || 'Status transition failed');
        btn.disabled = false;
        btn.innerText = 'Retry';
      }
    });
  });
}

function attachAvailableViewListeners(container) {
  container.querySelectorAll('.ticket-item-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = Number(card.getAttribute('data-id'));
      const ticket = availableTickets.find(t => t.id === id);
      if (ticket) openTicketDrawer(ticket, loadAgentData);
    });
  });

  container.querySelectorAll('.btn-view-drawer').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = Number(btn.getAttribute('data-id'));
      const ticket = availableTickets.find(t => t.id === id);
      if (ticket) openTicketDrawer(ticket, loadAgentData);
    });
  });

  container.querySelectorAll('.btn-claim-ticket').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = Number(btn.getAttribute('data-id'));

      btn.disabled = true;
      btn.innerText = 'Claiming...';

      try {
        await agentApi.claimTicket(id);
        toast.success(`Successfully claimed Ticket #${id}!`);
        loadAgentData();
      } catch (err) {
        // Optimistic locking conflict / already assigned handling
        toast.error(err.message || 'Conflict: another agent just claimed this ticket.');
        loadAgentData();
      }
    });
  });
}

function attachAgentPageEvents() {
  const refreshBtn = document.getElementById('btn-refresh-agent-queue');
  if (refreshBtn) refreshBtn.addEventListener('click', loadAgentData);

  const assignedTabBtn = document.getElementById('agent-tab-assigned');
  const availableTabBtn = document.getElementById('agent-tab-available');

  if (assignedTabBtn) {
    assignedTabBtn.addEventListener('click', () => {
      activeAgentTab = 'assigned';
      updateTabStyles();
      renderAgentContent();
    });
  }

  if (availableTabBtn) {
    availableTabBtn.addEventListener('click', () => {
      activeAgentTab = 'available';
      updateTabStyles();
      renderAgentContent();
    });
  }
}

function updateTabStyles() {
  const assignedTabBtn = document.getElementById('agent-tab-assigned');
  const availableTabBtn = document.getElementById('agent-tab-available');

  if (activeAgentTab === 'assigned') {
    if (assignedTabBtn) {
      assignedTabBtn.style.borderBottomColor = 'var(--primary-500)';
      assignedTabBtn.style.color = 'var(--text-primary)';
    }
    if (availableTabBtn) {
      availableTabBtn.style.borderBottomColor = 'transparent';
      availableTabBtn.style.color = 'var(--text-muted)';
    }
  } else {
    if (availableTabBtn) {
      availableTabBtn.style.borderBottomColor = 'var(--primary-500)';
      availableTabBtn.style.color = 'var(--text-primary)';
    }
    if (assignedTabBtn) {
      assignedTabBtn.style.borderBottomColor = 'transparent';
      assignedTabBtn.style.color = 'var(--text-muted)';
    }
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateStr;
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}
