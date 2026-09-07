// Customer Workspace Page Component
import { renderNavbar, attachNavbarEvents } from '../components/Navbar.js';
import { ticketApi } from '../api/ticketApi.js';
import { renderStatusBadge, renderPriorityBadge, renderCategoryBadge } from '../components/Badges.js';
import { openTicketDrawer } from '../components/TicketDetailView.js';
import { openModal, closeModal } from '../components/Modal.js';
import { renderEmptyState } from '../components/EmptyState.js';
import { toast } from '../state/toastState.js';

let tickets = [];
let activeStatusFilter = 'ALL';
let activePriorityFilter = 'ALL';
let searchQuery = '';

export async function renderCustomerPage() {
  const container = document.getElementById('app');
  if (!container) return;

  container.innerHTML = `
    ${renderNavbar()}

    <main class="app-main">
      <div class="workspace-content">
        <!-- Page Header -->
        <div class="page-header">
          <div>
            <h1 class="page-title">Customer Support Workspace</h1>
            <p class="page-subtitle">Submit, track, and manage your technical and billing support requests</p>
          </div>
          <button id="btn-create-ticket" class="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Create New Ticket</span>
          </button>
        </div>

        <!-- Metrics Overview -->
        <div class="metrics-grid" id="customer-metrics-grid">
          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Total Tickets</span>
              <div class="metric-icon" style="background:rgba(99,102,241,0.15);color:var(--primary-400);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line></svg>
              </div>
            </div>
            <div class="metric-value" id="metric-total">0</div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Active / Open</span>
              <div class="metric-icon" style="background:rgba(56,189,248,0.15);color:var(--status-open);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
              </div>
            </div>
            <div class="metric-value" id="metric-active">0</div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Resolved</span>
              <div class="metric-icon" style="background:rgba(52,211,153,0.15);color:var(--status-resolved);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            </div>
            <div class="metric-value" id="metric-resolved">0</div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Closed & Rated</span>
              <div class="metric-icon" style="background:rgba(245,158,11,0.15);color:var(--accent-amber);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
            </div>
            <div class="metric-value" id="metric-closed">0</div>
          </div>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="filter-bar">
          <div class="filter-pills" id="status-filter-pills">
            <button class="filter-pill active" data-status="ALL">All</button>
            <button class="filter-pill" data-status="OPEN">Open</button>
            <button class="filter-pill" data-status="ASSIGNED">Assigned</button>
            <button class="filter-pill" data-status="IN_PROGRESS">In Progress</button>
            <button class="filter-pill" data-status="RESOLVED">Resolved</button>
            <button class="filter-pill" data-status="CLOSED">Closed</button>
            <button class="filter-pill" data-status="CANCELLED">Cancelled</button>
          </div>

          <div style="display:flex;align-items:center;gap:0.75rem;">
            <select id="priority-filter-select" class="form-select" style="width:auto;padding:0.45rem 0.85rem;font-size:0.85rem;">
              <option value="ALL">All Priorities</option>
              <option value="URGENT">Urgent</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>

            <input type="text" id="ticket-search-input" class="form-input" placeholder="Search tickets..." style="width:240px;padding:0.45rem 0.85rem;font-size:0.85rem;" />
          </div>
        </div>

        <!-- Tickets Container -->
        <div id="customer-tickets-container">
          <div class="skeleton skeleton-card"></div>
          <div class="skeleton skeleton-card"></div>
        </div>
      </div>
    </main>
  `;

  attachNavbarEvents();
  attachCustomerPageEvents();
  loadCustomerTickets();
}

async function loadCustomerTickets() {
  const container = document.getElementById('customer-tickets-container');
  if (!container) return;

  try {
    const data = await ticketApi.getMyTickets();
    tickets = Array.isArray(data) ? data : [];
    tickets.sort((a, b) => b.id - a.id);
    updateMetrics();
    renderFilteredTickets();
  } catch (err) {
    container.innerHTML = `
      <div class="card" style="padding:2rem;text-align:center;border-color:rgba(244,63,94,0.3);">
        <h4 style="color:var(--accent-rose);margin-bottom:0.5rem;">Failed to load tickets</h4>
        <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:1rem;">${escapeHtml(err.message)}</p>
        <button id="btn-retry-tickets" class="btn btn-secondary btn-sm">Retry</button>
      </div>
    `;
    const retryBtn = document.getElementById('btn-retry-tickets');
    if (retryBtn) retryBtn.addEventListener('click', loadCustomerTickets);
  }
}

function updateMetrics() {
  const totalEl = document.getElementById('metric-total');
  const activeEl = document.getElementById('metric-active');
  const resolvedEl = document.getElementById('metric-resolved');
  const closedEl = document.getElementById('metric-closed');

  if (!totalEl) return;

  totalEl.innerText = tickets.length;
  activeEl.innerText = tickets.filter(t => ['OPEN', 'ASSIGNED', 'IN_PROGRESS'].includes(t.status)).length;
  resolvedEl.innerText = tickets.filter(t => t.status === 'RESOLVED').length;
  closedEl.innerText = tickets.filter(t => t.status === 'CLOSED').length;
}

function renderFilteredTickets() {
  const container = document.getElementById('customer-tickets-container');
  if (!container) return;

  const filtered = tickets.filter(ticket => {
    if (activeStatusFilter !== 'ALL' && ticket.status !== activeStatusFilter) return false;
    if (activePriorityFilter !== 'ALL' && ticket.priority !== activePriorityFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (ticket.title || '').toLowerCase().includes(q);
      const matchDesc = (ticket.description || '').toLowerCase().includes(q);
      const matchId = ticket.id.toString().includes(q);
      if (!matchTitle && !matchDesc && !matchId) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = renderEmptyState({
      title: 'No tickets found',
      description: tickets.length === 0
        ? 'You have not submitted any support requests yet.'
        : 'No tickets match the selected filters.',
      actionText: tickets.length === 0 ? 'Create Your First Ticket' : null,
      actionId: 'empty-create-ticket-btn'
    });

    const emptyBtn = document.getElementById('empty-create-ticket-btn');
    if (emptyBtn) {
      emptyBtn.addEventListener('click', openCreateTicketModal);
    }
    return;
  }

  container.innerHTML = `
    <div class="tickets-grid">
      ${filtered.map(t => `
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
              ${t.dueBy ? `<span>SLA Due: <strong>${formatDate(t.dueBy)}</strong></span>` : ''}
              ${t.rating ? `<span style="color:var(--accent-amber);font-weight:700;">★ ${t.rating}/5</span>` : ''}
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:0.5rem;" onclick="event.stopPropagation();">
            ${t.status === 'OPEN' ? `
              <button class="btn btn-secondary btn-sm action-edit-btn" data-id="${t.id}" title="Edit Ticket">Edit</button>
              <button class="btn btn-danger btn-sm action-cancel-btn" data-id="${t.id}" title="Cancel Ticket">Cancel</button>
            ` : ''}

            ${t.status === 'RESOLVED' ? `
              <button class="btn btn-primary btn-sm action-close-btn" data-id="${t.id}">Close Ticket</button>
            ` : ''}

            ${t.status === 'CLOSED' && !t.rating ? `
              <button class="btn btn-secondary btn-sm action-rate-btn" data-id="${t.id}" style="color:var(--accent-amber);border-color:rgba(245,158,11,0.4);">
                ★ Rate
              </button>
            ` : ''}

            <button class="btn btn-secondary btn-sm action-view-btn" data-id="${t.id}">
              Details &rarr;
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Attach card & action listeners
  container.querySelectorAll('.ticket-item-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = Number(card.getAttribute('data-id'));
      const ticket = tickets.find(t => t.id === id);
      if (ticket) openTicketDrawer(ticket, loadCustomerTickets);
    });
  });

  container.querySelectorAll('.action-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = Number(btn.getAttribute('data-id'));
      const ticket = tickets.find(t => t.id === id);
      if (ticket) openTicketDrawer(ticket, loadCustomerTickets);
    });
  });

  container.querySelectorAll('.action-edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = Number(btn.getAttribute('data-id'));
      const ticket = tickets.find(t => t.id === id);
      if (ticket) openEditTicketModal(ticket);
    });
  });

  container.querySelectorAll('.action-cancel-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = Number(btn.getAttribute('data-id'));
      handleCancelTicket(id);
    });
  });

  container.querySelectorAll('.action-close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = Number(btn.getAttribute('data-id'));
      handleCloseTicket(id);
    });
  });

  container.querySelectorAll('.action-rate-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = Number(btn.getAttribute('data-id'));
      const ticket = tickets.find(t => t.id === id);
      if (ticket) openRateModal(ticket);
    });
  });
}

function attachCustomerPageEvents() {
  const createBtn = document.getElementById('btn-create-ticket');
  if (createBtn) createBtn.addEventListener('click', openCreateTicketModal);

  // Status Filter Pills
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeStatusFilter = pill.getAttribute('data-status');
      renderFilteredTickets();
    });
  });

  // Priority Filter
  const prioritySelect = document.getElementById('priority-filter-select');
  if (prioritySelect) {
    prioritySelect.addEventListener('change', (e) => {
      activePriorityFilter = e.target.value;
      renderFilteredTickets();
    });
  }

  // Search input
  const searchInput = document.getElementById('ticket-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderFilteredTickets();
    });
  }
}

function openCreateTicketModal() {
  const bodyHtml = `
    <form id="modal-create-ticket-form">
      <div class="form-group">
        <label class="form-label" for="create-title">Ticket Subject / Title</label>
        <input type="text" id="create-title" class="form-input" placeholder="e.g. Payment Gateway failing with 504 timeout" required />
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
        <div class="form-group">
          <label class="form-label" for="create-priority">Initial Priority</label>
          <select id="create-priority" class="form-select" required>
            <option value="LOW">Low (72h SLA)</option>
            <option value="MEDIUM" selected>Medium (24h SLA)</option>
            <option value="HIGH">High (8h SLA)</option>
            <option value="URGENT">Urgent (2h SLA)</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="create-category">Category</label>
          <select id="create-category" class="form-select" required>
            <option value="TECHNICAL" selected>Technical</option>
            <option value="PAYMENT">Payment</option>
            <option value="LOGIN">Login</option>
            <option value="ACCOUNT">Account</option>
            <option value="REFUND">Refund</option>
            <option value="ORDER">Order</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="create-desc">Description</label>
        <textarea id="create-desc" class="form-textarea" placeholder="Detailed description of the issue or request..." style="min-height:120px;" required></textarea>
        <span style="font-size:0.75rem;color:var(--text-muted);margin-top:0.25rem;">
          Tip: Words like "down", "urgent", or "emergency" are automatically detected by workers for priority escalation.
        </span>
      </div>
    </form>
  `;

  openModal({
    title: 'Create Support Ticket',
    bodyHtml,
    confirmText: 'Submit Ticket',
    confirmClass: 'btn-primary',
    onConfirm: async () => {
      const title = document.getElementById('create-title').value.trim();
      const priority = document.getElementById('create-priority').value;
      const category = document.getElementById('create-category').value;
      const description = document.getElementById('create-desc').value.trim();

      if (!title || !description) {
        toast.error('Title and description are required');
        return false;
      }

      try {
        await ticketApi.createTicket({ title, priority, category, description });
        toast.success('Ticket created & queued for worker processing!');
        loadCustomerTickets();
        return true;
      } catch (err) {
        toast.error(err.message || 'Failed to create ticket');
        return false;
      }
    }
  });
}

function openEditTicketModal(ticket) {
  const bodyHtml = `
    <form id="modal-edit-ticket-form">
      <div class="form-group">
        <label class="form-label" for="edit-title">Ticket Subject / Title</label>
        <input type="text" id="edit-title" class="form-input" value="${escapeHtml(ticket.title)}" required />
      </div>

      <div class="form-group">
        <label class="form-label" for="edit-desc">Description</label>
        <textarea id="edit-desc" class="form-textarea" style="min-height:120px;" required>${escapeHtml(ticket.description)}</textarea>
      </div>
    </form>
  `;

  openModal({
    title: `Edit Ticket #${ticket.id}`,
    bodyHtml,
    confirmText: 'Save Changes',
    confirmClass: 'btn-primary',
    onConfirm: async () => {
      const title = document.getElementById('edit-title').value.trim();
      const description = document.getElementById('edit-desc').value.trim();

      if (!title || !description) {
        toast.error('Title and description are required');
        return false;
      }

      try {
        await ticketApi.updateTicket(ticket.id, { title, description });
        toast.success('Ticket updated');
        loadCustomerTickets();
        return true;
      } catch (err) {
        toast.error(err.message || 'Failed to update ticket');
        return false;
      }
    }
  });
}

function handleCancelTicket(ticketId) {
  openModal({
    title: 'Cancel Support Ticket',
    bodyHtml: `<p>Are you sure you want to cancel Ticket #${ticketId}? This transition cannot be undone.</p>`,
    confirmText: 'Yes, Cancel Ticket',
    confirmClass: 'btn-danger',
    onConfirm: async () => {
      try {
        await ticketApi.cancelTicket(ticketId);
        toast.success(`Ticket #${ticketId} cancelled`);
        loadCustomerTickets();
        return true;
      } catch (err) {
        toast.error(err.message || 'Could not cancel ticket');
        return false;
      }
    }
  });
}

function handleCloseTicket(ticketId) {
  openModal({
    title: 'Close Resolved Ticket',
    bodyHtml: `<p>Mark Ticket #${ticketId} as CLOSED? Once closed, you will be able to rate the support agent's performance.</p>`,
    confirmText: 'Close Ticket',
    confirmClass: 'btn-primary',
    onConfirm: async () => {
      try {
        await ticketApi.closeTicket(ticketId);
        toast.success(`Ticket #${ticketId} closed!`);
        loadCustomerTickets();
        return true;
      } catch (err) {
        toast.error(err.message || 'Could not close ticket');
        return false;
      }
    }
  });
}

function openRateModal(ticket) {
  const bodyHtml = `
    <form id="modal-rate-form">
      <p style="margin-bottom:1rem;color:var(--text-secondary);font-size:0.9rem;">
        How satisfied were you with the resolution of Ticket #${ticket.id}?
      </p>

      <div class="form-group">
        <label class="form-label" for="rate-score">Star Rating (1 - 5)</label>
        <select id="rate-score" class="form-select" required>
          <option value="5" selected>★★★★★ - 5 (Excellent)</option>
          <option value="4">★★★★☆ - 4 (Good)</option>
          <option value="3">★★★☆☆ - 3 (Average)</option>
          <option value="2">★★☆☆☆ - 2 (Poor)</option>
          <option value="1">★☆☆☆☆ - 1 (Unacceptable)</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label" for="rate-feedback">Optional Feedback / Comments</label>
        <textarea id="rate-feedback" class="form-textarea" placeholder="Share your experience with the support agent..."></textarea>
      </div>
    </form>
  `;

  openModal({
    title: `Rate Service on Ticket #${ticket.id}`,
    bodyHtml,
    confirmText: 'Submit Rating',
    confirmClass: 'btn-primary',
    onConfirm: async () => {
      const rating = Number(document.getElementById('rate-score').value);
      const feedback = document.getElementById('rate-feedback').value.trim();

      try {
        await ticketApi.rateTicket(ticket.id, { rating, feedback: feedback || null });
        toast.success('Thank you! Your feedback has been recorded.');
        loadCustomerTickets();
        return true;
      } catch (err) {
        toast.error(err.message || 'Could not submit rating');
        return false;
      }
    }
  });
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
