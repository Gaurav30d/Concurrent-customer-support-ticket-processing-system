// Status, Priority, Category, and Role Badge Renderers

export function renderStatusBadge(status) {
  if (!status) return '';
  const formatted = status.replace('_', ' ');
  return `
    <span class="badge badge-status-${status}">
      <span class="badge-dot"></span>
      ${formatted}
    </span>
  `;
}

export function renderPriorityBadge(priority) {
  if (!priority) return '';
  return `
    <span class="badge badge-priority-${priority}">
      ${priority}
    </span>
  `;
}

export function renderCategoryBadge(category) {
  if (!category) return '';
  return `
    <span class="badge badge-category">
      ${category.toLowerCase()}
    </span>
  `;
}

export function renderRoleBadge(role) {
  if (!role) return '';
  return `
    <span class="badge badge-role-${role}">
      ${role}
    </span>
  `;
}
