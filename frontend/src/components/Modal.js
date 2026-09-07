// Accessible Reusable Modal Component

let currentOnConfirm = null;

export function openModal({
  title = 'Confirmation',
  bodyHtml = '',
  confirmText = 'Confirm',
  confirmClass = 'btn-primary',
  cancelText = 'Cancel',
  onConfirm = null
}) {
  const container = document.getElementById('modal-container');
  if (!container) return;

  currentOnConfirm = onConfirm;

  container.innerHTML = `
    <div class="modal-backdrop" id="active-modal-backdrop">
      <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-header">
          <h3 id="modal-title">${escapeHtml(title)}</h3>
          <button class="modal-close" id="modal-close-btn" aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          ${bodyHtml}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="modal-cancel-btn">${escapeHtml(cancelText)}</button>
          <button type="button" class="btn ${confirmClass}" id="modal-confirm-btn">${escapeHtml(confirmText)}</button>
        </div>
      </div>
    </div>
  `;

  const backdrop = document.getElementById('active-modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const cancelBtn = document.getElementById('modal-cancel-btn');
  const confirmBtn = document.getElementById('modal-confirm-btn');

  const handleClose = () => closeModal();

  closeBtn.addEventListener('click', handleClose);
  cancelBtn.addEventListener('click', handleClose);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) handleClose();
  });

  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      handleClose();
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);

  confirmBtn.addEventListener('click', async () => {
    if (typeof currentOnConfirm === 'function') {
      confirmBtn.disabled = true;
      confirmBtn.innerHTML = `Processing...`;
      try {
        const shouldClose = await currentOnConfirm();
        if (shouldClose !== false) {
          closeModal();
        }
      } catch (err) {
        console.error('Modal confirm error:', err);
      } finally {
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = escapeHtml(confirmText);
      }
    } else {
      closeModal();
    }
  });
}

export function closeModal() {
  const container = document.getElementById('modal-container');
  if (container) {
    container.innerHTML = '';
  }
  currentOnConfirm = null;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}
