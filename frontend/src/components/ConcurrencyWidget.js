// Real-Time Concurrency Telemetry Widget Component
import { concurrencyTelemetry } from '../api/websocketClient.js';

export function renderConcurrencyWidget(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
      <div style="display:flex;align-items:center;gap:0.6rem;">
        <span class="pulse-dot"></span>
        <span style="font-weight:700;font-size:0.95rem;letter-spacing:0.02em;">Worker Pool Concurrency Telemetry</span>
      </div>
      <span id="telemetry-status-badge" class="badge" style="background:rgba(16,185,129,0.15);color:var(--accent-emerald);">
        LIVE STREAM
      </span>
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-label">Priority Queue Size</span>
          <div class="metric-icon" style="background:rgba(99,102,241,0.15);color:var(--primary-400);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </div>
        </div>
        <div class="metric-value" id="stat-queue-size">0</div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.4rem;">Tickets awaiting worker dequeue</div>
      </div>

      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-label">Active Workers</span>
          <div class="metric-icon" style="background:rgba(6,182,212,0.15);color:var(--accent-cyan);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
        </div>
        <div class="metric-value" id="stat-active-workers">0</div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.4rem;">Threads actively computing SLA/Escalation</div>
      </div>

      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-label">Processed Tickets</span>
          <div class="metric-icon" style="background:rgba(16,185,129,0.15);color:var(--accent-emerald);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        </div>
        <div class="metric-value" id="stat-processed-tickets">0</div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.4rem;">Successfully escalated & SLA timed</div>
      </div>

      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-label">Failed Tasks</span>
          <div class="metric-icon" style="background:rgba(244,63,94,0.15);color:var(--accent-rose);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
        </div>
        <div class="metric-value" id="stat-failed-tickets">0</div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.4rem;">Non-blocking isolated task exceptions</div>
      </div>
    </div>
  `;

  // Subscribe to live telemetry stream
  const unsubscribe = concurrencyTelemetry.subscribe((stats) => {
    const queueEl = document.getElementById('stat-queue-size');
    const workersEl = document.getElementById('stat-active-workers');
    const processedEl = document.getElementById('stat-processed-tickets');
    const failedEl = document.getElementById('stat-failed-tickets');

    if (queueEl) queueEl.innerText = stats.queueSize ?? 0;
    if (workersEl) workersEl.innerText = stats.activeWorkers ?? 0;
    if (processedEl) processedEl.innerText = stats.processedTickets ?? 0;
    if (failedEl) failedEl.innerText = stats.failedTickets ?? 0;
  });

  return unsubscribe;
}
