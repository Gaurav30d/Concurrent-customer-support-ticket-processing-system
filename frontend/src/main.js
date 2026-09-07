// Application Bootstrap Entrypoint
import { initRouter } from './router.js';
import { toast } from './state/toastState.js';

document.addEventListener('DOMContentLoaded', () => {
  toast.init();
  initRouter();
});
