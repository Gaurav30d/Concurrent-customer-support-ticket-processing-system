// Ticket Detail Drawer Component (Metadata, Actions, Comments & Audit History)
import { renderStatusBadge, renderPriorityBadge, renderCategoryBadge } from './Badges.js';
import { commentApi } from '../api/commentApi.js';
import { historyApi } from '../api/historyApi.js';
import { authState } from '../state/authState.js';
import { toast } from '../state/toastState.js';

let activeTicket = null;
let activeTab = 'comments'; // 'comments' | 'history'
let onTicketUpdatedCallback = null;

export async function openTicketDrawer(ticket, onTicketUpdated = null) {
  activeTicket = ticket;
  onTicketUpdatedCallback = onTicketUpdated;
  activeTab = 'comments';

  const container = document.getElementById('modal-container');
  if (!container) return;

  container.innerHTML = `
    <div class="drawer-backdrop" id="ticket-drawer-backdrop">
      <div class="drawer-panel" id="ticket-drawer-panel">
        <div class="drawer-header">
          <div style="display:flex;flex-direction:column;gap:0.35rem;overflow:hidden;">
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <span class="ticket-id">#${ticket.id}</span>
              ${renderStatusBadge(ticket.status)}
              ${renderPriorityBadge(ticket.priority)}
              ${renderCategoryBadge(ticket.category)}
            </div>
            <h3 style="font-size:1.25rem;font-weight:700;word-break:break-word;">${escapeHtml(ticket.title)}</h3>
          </div>
          <button class="modal-close" id="drawer-close-btn" aria-label="Close drawer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="drawer-body">
          <!-- Metadata overview -->
          <div style="background:var(--bg-surface-elevated);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:1.25rem;">
            <div class="drawer-section-title">Description</div>
            <p style="color:var(--text-primary);white-space:pre-wrap;font-size:0.95rem;line-height:1.6;margin-bottom:1.25rem;">
              ${escapeHtml(ticket.description)}
            </p>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:1rem;font-size:0.825rem;color:var(--text-muted);border-top:1px solid var(--border-subtle);padding-top:1rem;">
              <div>
                <span style="display:block;color:var(--text-secondary);font-weight:600;">Created</span>
                <span>${formatDate(ticket.createdAt)}</span>
              </div>
              <div>
                <span style="display:block;color:var(--text-secondary);font-weight:600;">SLA Deadline</span>
                <span style="color:${ticket.dueBy ? 'var(--accent-amber)' : 'var(--text-muted)'};font-weight:600;">
                  ${ticket.dueBy ? formatDate(ticket.dueBy) : 'Pending assignment'}
                </span>
              </div>
              <div>
                <span style="display:block;color:var(--text-secondary);font-weight:600;">Assigned Agent</span>
                <span>${ticket.assignedAgentId ? `#${ticket.assignedAgentId}` : 'Unassigned'}</span>
              </div>
              ${ticket.rating ? `
                <div>
                  <span style="display:block;color:var(--text-secondary);font-weight:600;">Customer Rating</span>
                  <span style="color:var(--accent-amber);font-weight:700;">★ ${ticket.rating}/5</span>
                </div>
              ` : ''}
            </div>
            ${ticket.feedback ? `
              <div style="margin-top:0.75rem;padding:0.75rem;background:rgba(245,158,11,0.08);border-radius:var(--radius-sm);font-size:0.85rem;color:var(--text-secondary);">
                <strong style="color:var(--accent-amber);">Customer Feedback:</strong> "${escapeHtml(ticket.feedback)}"
              </div>
            ` : ''}
          </div>

          <!-- Tabs: Comments & Audit History -->
          <div>
            <div style="display:flex;gap:1rem;border-bottom:1px solid var(--border-subtle);margin-bottom:1.25rem;">
              <button class="nav-link ${activeTab === 'comments' ? 'active' : ''}" id="tab-btn-comments" style="padding-bottom:0.6rem;background:none;border:none;cursor:pointer;font-weight:700;border-bottom:2px solid ${activeTab === 'comments' ? 'var(--primary-500)' : 'transparent'};color:${activeTab === 'comments' ? 'var(--text-primary)' : 'var(--text-muted)'};">
                Discussion & Comments
              </button>
              <button class="nav-link ${activeTab === 'history' ? 'active' : ''}" id="tab-btn-history" style="padding-bottom:0.6rem;background:none;border:none;cursor:pointer;font-weight:700;border-bottom:2px solid ${activeTab === 'history' ? 'var(--primary-500)' : 'transparent'};color:${activeTab === 'history' ? 'var(--text-primary)' : 'var(--text-muted)'};">
                Audit Timeline
              </button>
            </div>

            <div id="drawer-tab-content">
              <div class="skeleton skeleton-card"></div>
            </div>
          </div>
        </div>

        <div class="drawer-footer" id="drawer-actions-footer">
          <!-- Dynamic Action Buttons will render here -->
        </div>
      </div>
    </div>
  `;

  // Attach backdrop & close listeners
  const backdrop = document.getElementById('ticket-drawer-backdrop');
  const closeBtn = document.getElementById('drawer-close-btn');

  const handleClose = () => closeTicketDrawer();
  closeBtn.addEventListener('click', handleClose);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) handleClose();
  });

  // Tab listeners
  document.getElementById('tab-btn-comments').addEventListener('click', () => {
    activeTab = 'comments';
    renderDrawerTabs();
  });
  document.getElementById('tab-btn-history').addEventListener('click', () => {
    activeTab = 'history';
    renderDrawerTabs();
  });

  renderDrawerTabs();
}

export function closeTicketDrawer() {
  const container = document.getElementById('modal-container');
  if (container) {
    container.innerHTML = '';
  }
  activeTicket = null;
}

async function renderDrawerTabs() {
  const tabContent = document.getElementById('drawer-tab-content');
  const commentsBtn = document.getElementById('tab-btn-comments');
  const historyBtn = document.getElementById('tab-btn-history');

  if (!tabContent || !activeTicket) return;

  if (activeTab === 'comments') {
    commentsBtn.style.borderBottomColor = 'var(--primary-500)';
    commentsBtn.style.color = 'var(--text-primary)';
    historyBtn.style.borderBottomColor = 'transparent';
    historyBtn.style.color = 'var(--text-muted)';

    tabContent.innerHTML = `<div class="skeleton skeleton-card"></div>`;

    try {
      const comments = await commentApi.getComments(activeTicket.id);
      renderCommentsSection(tabContent, comments);
    } catch (err) {
      tabContent.innerHTML = `<div class="form-error">Failed to load comments: ${escapeHtml(err.message)}</div>`;
    }
  } else {
    historyBtn.style.borderBottomColor = 'var(--primary-500)';
    historyBtn.style.color = 'var(--text-primary)';
    commentsBtn.style.borderBottomColor = 'transparent';
    commentsBtn.style.color = 'var(--text-muted)';

    tabContent.innerHTML = `<div class="skeleton skeleton-card"></div>`;

    try {
      const history = await historyApi.getHistory(activeTicket.id);
      renderHistorySection(tabContent, history);
    } catch (err) {
      tabContent.innerHTML = `<div class="form-error">Failed to load audit history: ${escapeHtml(err.message)}</div>`;
    }
  }
}

function renderCommentsSection(container, comments) {
  let commentsHtml = `
    <div class="comments-container">
      ${comments.length === 0 ? `
        <div style="text-align:center;padding:1.5rem;color:var(--text-muted);font-size:0.875rem;">
          No comments yet. Start the conversation below.
        </div>
      ` : comments.map(c => `
        <div class="comment-bubble">
          <div class="comment-header">
            <span style="font-weight:700;color:var(--text-primary);">User #${c.userId}</span>
            <span style="color:var(--text-muted);font-size:0.75rem;">${formatDate(c.createdAt)}</span>
          </div>
          <div class="comment-message">${escapeHtml(c.message)}</div>
        </div>
      `).join('')}

      <form id="drawer-add-comment-form" style="margin-top:1rem;display:flex;flex-direction:column;gap:0.5rem;">
        <textarea id="comment-input" class="form-textarea" placeholder="Write an internal note or reply to customer..." style="min-height:80px;" required></textarea>
        <div style="display:flex;justify-content:flex-end;">
          <button type="submit" class="btn btn-primary btn-sm" id="submit-comment-btn">Post Comment</button>
        </div>
      </form>
    </div>
  `;

  container.innerHTML = commentsHtml;

  const form = document.getElementById('drawer-add-comment-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = document.getElementById('comment-input');
      const submitBtn = document.getElementById('submit-comment-btn');
      const message = input.value.trim();
      if (!message) return;

      submitBtn.disabled = true;
      submitBtn.innerText = 'Posting...';

      try {
        await commentApi.addComment(activeTicket.id, message);
        toast.success('Comment added');
        const updatedComments = await commentApi.getComments(activeTicket.id);
        renderCommentsSection(container, updatedComments);
      } catch (err) {
        toast.error(err.message);
        submitBtn.disabled = false;
        submitBtn.innerText = 'Post Comment';
      }
    });
  }
}

function renderHistorySection(container, history) {
  if (!history || history.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:1.5rem;color:var(--text-muted);font-size:0.875rem;">
        No audit entries recorded yet.
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="timeline-container">
      ${history.map(h => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-title">${escapeHtml(formatAction(h.action))}</div>
          <div style="font-size:0.825rem;color:var(--text-secondary);">
            ${h.oldStatus && h.newStatus ? `Status: <span style="font-family:var(--font-mono);">${h.oldStatus} &rarr; ${h.newStatus}</span>` : ''}
            ${h.oldPriority && h.newPriority ? `Priority: <span style="font-family:var(--font-mono);">${h.oldPriority} &rarr; ${h.newPriority}</span>` : ''}
          </div>
          <div class="timeline-time">${formatDate(h.timestamp)} • Actor ID: ${h.changedBy}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function formatAction(action) {
  if (!action) return 'Update Recorded';
  return action.replace(/_/g, ' ');
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return d.toLocaleString(undefined, {
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
