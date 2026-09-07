// Empty State Component Renderer

export function renderEmptyState({
  title = 'No records found',
  description = 'There are no items to display at this time.',
  actionText = null,
  actionId = null
}) {
  return `
    <div class="empty-state">
      <div class="empty-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h4 class="empty-title">${escapeHtml(title)}</h4>
      <p class="empty-desc">${escapeHtml(description)}</p>
      ${actionText && actionId ? `
        <button id="${actionId}" class="btn btn-primary btn-sm">
          ${escapeHtml(actionText)}
        </button>
      ` : ''}
    </div>
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}
