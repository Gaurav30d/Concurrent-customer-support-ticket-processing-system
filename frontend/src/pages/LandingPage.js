// Dynamic SaaS Landing Page
import { renderNavbar, attachNavbarEvents } from '../components/Navbar.js';
import { concurrencyTelemetry } from '../api/websocketClient.js';

let activeRoleTab = 'customer';
let unsubscribeTelemetry = null;

export function renderLandingPage() {
  const container = document.getElementById('app');
  if (!container) return;

  container.innerHTML = `
    ${renderNavbar()}

    <main>
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-pill">
            <span class="pulse-dot"></span>
            <span>Concurrent Support Orchestration Engine</span>
          </div>

          <h1 class="hero-title">
            Ultra-fast ticket resolution powered by <span class="text-gradient">concurrency & automation</span>
          </h1>

          <p class="hero-subtitle">
            ResolveIQ dynamically prioritizes, escalates, and orchestrates high-volume customer support tickets across multi-threaded background workers and intelligent agent workload balancing.
          </p>

          <div class="hero-cta-group">
            <a href="#/signup" class="btn btn-primary btn-lg">
              Start Free Today
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a href="#/login" class="btn btn-secondary btn-lg">Access Workspace</a>
          </div>

          <!-- Architecture Visualizer Preview -->
          <div class="arch-visualizer" id="architecture">
            <div class="arch-header">
              <div style="text-align:left;">
                <h4 style="margin-bottom:0.25rem;">Live Concurrency Engine</h4>
                <p style="font-size:0.85rem;color:var(--text-secondary);">Real-time metrics streamed via WebSocket STOMP</p>
              </div>
              <div class="live-indicator">
                <span class="pulse-dot"></span>
                <span>Active Telemetry</span>
              </div>
            </div>

            <div class="arch-pipeline">
              <div class="arch-node">
                <div class="arch-node-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                  <span>Priority Queue</span>
                </div>
                <div class="arch-node-value" id="landing-queue-size">0</div>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.35rem;">Comparable priority tasks</div>
              </div>

              <div class="arch-node">
                <div class="arch-node-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                  <span>Worker Threads</span>
                </div>
                <div class="arch-node-value" id="landing-active-workers">0</div>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.35rem;">Fixed thread pool workers</div>
              </div>

              <div class="arch-node">
                <div class="arch-node-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  <span>Processed</span>
                </div>
                <div class="arch-node-value" id="landing-processed">0</div>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.35rem;">NLP escalation & SLA mapped</div>
              </div>

              <div class="arch-node">
                <div class="arch-node-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  <span>Load Balancer</span>
                </div>
                <div class="arch-node-value" style="color:var(--accent-emerald);">OPTIMAL</div>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.35rem;">Auto-assigned least-busy agents</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="section" id="how-it-works">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">System Pipeline</span>
            <h2 class="section-title">How Tickets Flow Through The Engine</h2>
            <p class="section-desc">From initial customer ingestion to resolution and feedback loop, every transition is governed by concurrency guarantees.</p>
          </div>

          <div class="flow-grid">
            <div class="flow-step-card">
              <div class="step-number">01</div>
              <h4>Ingestion & Post-Commit Enqueue</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">
                Customers submit support requests. Spring's <code>TransactionSynchronizationManager</code> ensures tickets are enqueued into <code>TicketQueueManager</code> only after the DB transaction commits.
              </p>
            </div>

            <div class="flow-step-card">
              <div class="step-number">02</div>
              <h4>NLP Escalation & SLA Computing</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">
                Concurrent <code>TicketWorker</code> threads inspect incoming tickets for critical keywords ("down", "emergency", "urgent") and dynamically escalate to URGENT with a 2-hour SLA deadline.
              </p>
            </div>

            <div class="flow-step-card">
              <div class="step-number">03</div>
              <h4>Optimistic Auto-Assignment</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">
                A scheduled background engine evaluates agent workloads and matches unclaimed tickets to the least-busy agent using JPA optimistic locking version controls.
              </p>
            </div>

            <div class="flow-step-card">
              <div class="step-number">04</div>
              <h4>Resolution & Feedback Loop</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">
                Agents resolve issues triggering idempotent asynchronous notifications. Customers close tickets, submit star ratings (1-5), and provide feedback to drive agent performance analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Role-Based Experience Section -->
      <section class="section" id="roles">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Role-Based Workspaces</span>
            <h2 class="section-title">Tailored Portals for Every Stakeholder</h2>
            <p class="section-desc">Experience purpose-built interfaces with strict zero-trust authorization enforcement.</p>
          </div>

          <div class="role-tabs">
            <button class="role-tab-btn active" data-role="customer">Customer Experience</button>
            <button class="role-tab-btn" data-role="agent">Support Agent Portal</button>
            <button class="role-tab-btn" data-role="admin">Admin Mission Control</button>
          </div>

          <div id="role-card-display" class="role-card-content">
            <!-- Rendered dynamically -->
          </div>
        </div>
      </section>

      <!-- Core Features Grid -->
      <section class="section" id="features">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Enterprise Capabilities</span>
            <h2 class="section-title">Engineered for High Throughput</h2>
            <p class="section-desc">Backed by production-proven backend concurrency patterns and real REST endpoints.</p>
          </div>

          <div class="flow-grid">
            <div class="flow-step-card">
              <div style="color:var(--primary-400);margin-bottom:0.75rem;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h4>Optimistic Locking Defense</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">Prevents race conditions when multiple agents attempt to claim the same ticket at the exact same millisecond.</p>
            </div>

            <div class="flow-step-card">
              <div style="color:var(--accent-cyan);margin-bottom:0.75rem;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h4>Dynamic SLA Computation</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">Automatically calculates due dates anchored to ticket creation: 2h (Urgent), 8h (High), 24h (Medium), 72h (Low).</p>
            </div>

            <div class="flow-step-card">
              <div style="color:var(--accent-emerald);margin-bottom:0.75rem;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <h4>Real-Time Ticket Comments</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">Collaborative discussion threads on every ticket, allowing customers and assigned agents to communicate in context.</p>
            </div>

            <div class="flow-step-card">
              <div style="color:var(--accent-amber);margin-bottom:0.75rem;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <h4>Agent Rating Analytics</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">Customers rate resolved tickets from 1-5 stars. Agents view live rolling average metrics on their personal dashboard.</p>
            </div>

            <div class="flow-step-card">
              <div style="color:var(--accent-rose);margin-bottom:0.75rem;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              </div>
              <h4>Audit Trail Integrity</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">Immutable ticket history logs every status update, auto-escalation, assignment, and manual edit with precise timestamps.</p>
            </div>

            <div class="flow-step-card">
              <div style="color:var(--primary-300);margin-bottom:0.75rem;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
              </div>
              <h4>Resilient Multi-Thread Workers</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">Background workers gracefully handle unexpected exceptions without dying, ensuring continuous queue throughput.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Technology & Trust Section -->
      <section class="section" id="tech">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Technology Architecture</span>
            <h2 class="section-title">Built On Modern Enterprise Foundations</h2>
            <p class="section-desc">Full-stack harmony between modern reactive frontend and robust Java backend.</p>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:1.5rem;text-align:center;">
            <div class="card">
              <h3 style="color:var(--primary-400);margin-bottom:0.5rem;">Spring Boot 3</h3>
              <p style="font-size:0.875rem;">Robust REST APIs, JPA Hibernate ORM, and Spring Security with stateless JWT authorization.</p>
            </div>
            <div class="card">
              <h3 style="color:var(--accent-cyan);margin-bottom:0.5rem;">MySQL 8 + Optimistic Locks</h3>
              <p style="font-size:0.875rem;">ACID transactions with @Version column ensuring zero ticket assignment collisions.</p>
            </div>
            <div class="card">
              <h3 style="color:var(--accent-emerald);margin-bottom:0.5rem;">STOMP WebSocket</h3>
              <p style="font-size:0.875rem;">Live pub/sub broadcasting engine metrics directly to admin dashboards with zero lag.</p>
            </div>
            <div class="card">
              <h3 style="color:var(--accent-amber);margin-bottom:0.5rem;">Vite Vanilla Frontend</h3>
              <p style="font-size:0.875rem;">Blazing fast modular JavaScript SPA with responsive custom CSS design system.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="section" style="background:linear-gradient(180deg, transparent, rgba(99,102,241,0.06));text-align:center;padding:6rem 0;">
        <div class="container">
          <h2 style="font-size:2.5rem;margin-bottom:1rem;">Ready to experience high-concurrency support?</h2>
          <p style="font-size:1.15rem;color:var(--text-secondary);max-width:600px;margin:0 auto 2.5rem;">
            Sign up now to submit support requests, or sign in as an Agent or Administrator to manage operations.
          </p>
          <div style="display:flex;justify-content:center;gap:1rem;flex-wrap:wrap;">
            <a href="#/signup" class="btn btn-primary btn-lg">Create Free Account</a>
            <a href="#/login" class="btn btn-secondary btn-lg">Sign In To Workspace</a>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="landing-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="brand-logo" style="margin-bottom:1rem;">
              <div class="brand-mark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <span>Resolve<strong style="color:var(--primary-400);">IQ</strong></span>
            </div>
            <p style="font-size:0.9rem;max-width:320px;color:var(--text-muted);">
              Enterprise-grade concurrent customer support ticket processing system with real-time priority queues and automated workload balancing.
            </p>
          </div>

          <div>
            <h4 style="font-size:0.9rem;margin-bottom:1rem;text-transform:uppercase;color:var(--text-primary);">Navigation</h4>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:0.5rem;font-size:0.9rem;">
              <li><a href="#how-it-works" class="nav-link">How It Works</a></li>
              <li><a href="#roles" class="nav-link">Role Portals</a></li>
              <li><a href="#features" class="nav-link">Features</a></li>
              <li><a href="#tech" class="nav-link">Technology</a></li>
            </ul>
          </div>

          <div>
            <h4 style="font-size:0.9rem;margin-bottom:1rem;text-transform:uppercase;color:var(--text-primary);">Portals</h4>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:0.5rem;font-size:0.9rem;">
              <li><a href="#/login" class="nav-link">Customer Workspace</a></li>
              <li><a href="#/login" class="nav-link">Agent Workbench</a></li>
              <li><a href="#/login" class="nav-link">Admin Telemetry</a></li>
            </ul>
          </div>

          <div>
            <h4 style="font-size:0.9rem;margin-bottom:1rem;text-transform:uppercase;color:var(--text-primary);">System</h4>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:0.5rem;font-size:0.9rem;">
              <li><span style="color:var(--accent-emerald);font-weight:600;">● Engine Online</span></li>
              <li><span style="color:var(--text-muted);">Port 8080 Active</span></li>
              <li><span style="color:var(--text-muted);">WebSocket /ws Live</span></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} ResolveIQ. All rights reserved.</span>
          <span>High-Throughput Concurrent Support Platform</span>
        </div>
      </div>
    </footer>
  `;

  attachNavbarEvents();
  attachLandingPageEvents();
  renderRoleCard(activeRoleTab);

  // Subscribe to live telemetry
  if (unsubscribeTelemetry) unsubscribeTelemetry();
  unsubscribeTelemetry = concurrencyTelemetry.subscribe((stats) => {
    const qEl = document.getElementById('landing-queue-size');
    const wEl = document.getElementById('landing-active-workers');
    const pEl = document.getElementById('landing-processed');
    if (qEl) qEl.innerText = stats.queueSize ?? 0;
    if (wEl) wEl.innerText = stats.activeWorkers ?? 0;
    if (pEl) pEl.innerText = stats.processedTickets ?? 0;
  });
}

function attachLandingPageEvents() {
  const roleButtons = document.querySelectorAll('.role-tab-btn');
  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeRoleTab = btn.getAttribute('data-role');
      renderRoleCard(activeRoleTab);
    });
  });
}

function renderRoleCard(role) {
  const container = document.getElementById('role-card-display');
  if (!container) return;

  if (role === 'customer') {
    container.innerHTML = `
      <div>
        <span class="badge badge-role-CUSTOMER" style="margin-bottom:0.75rem;">Customer Portal</span>
        <h3 style="font-size:1.75rem;margin-bottom:0.75rem;">Create, track, and rate your support requests in real-time</h3>
        <p style="color:var(--text-secondary);font-size:1rem;line-height:1.6;">
          Customers have full transparency over their ticket lifecycle with instant auto-assignment and SLA countdowns.
        </p>

        <ul class="role-features-list">
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Instant ticket submission with priority and category selection</span>
          </li>
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Live SLA countdown and automated urgent keyword detection</span>
          </li>
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Interactive comments thread to communicate directly with support staff</span>
          </li>
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Star rating (1-5) and feedback submission once ticket is resolved</span>
          </li>
        </ul>

        <div style="margin-top:2rem;">
          <a href="#/signup" class="btn btn-primary">Create Customer Account</a>
        </div>
      </div>

      <div style="background:var(--bg-canvas);border:1px solid var(--border-medium);border-radius:var(--radius-lg);padding:1.5rem;">
        <div style="font-size:0.8rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:1rem;">Live Customer Preview</div>
        <div style="background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:1rem;margin-bottom:0.75rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
            <span style="font-weight:700;font-size:0.95rem;">API Gateway Timeout</span>
            <span class="badge badge-priority-URGENT">URGENT</span>
          </div>
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:0.75rem;">Production services timing out on checkout endpoint.</p>
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.75rem;color:var(--text-muted);">
            <span>Status: <strong style="color:var(--status-in-progress);">IN PROGRESS</strong></span>
            <span>SLA: 1h 45m left</span>
          </div>
        </div>
      </div>
    `;
  } else if (role === 'agent') {
    container.innerHTML = `
      <div>
        <span class="badge badge-role-AGENT" style="margin-bottom:0.75rem;">Support Agent Workbench</span>
        <h3 style="font-size:1.75rem;margin-bottom:0.75rem;">Claim tickets, transition statuses, and track your performance</h3>
        <p style="color:var(--text-secondary);font-size:1rem;line-height:1.6;">
          Agents can browse the global unclaimed queue or work their auto-assigned queue with race-condition prevention.
        </p>

        <ul class="role-features-list">
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>One-click ticket claiming with conflict-free optimistic locking</span>
          </li>
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Status workflow control (ASSIGNED &rarr; IN_PROGRESS &rarr; RESOLVED)</span>
          </li>
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Live rolling average rating score tracking agent satisfaction</span>
          </li>
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Full audit history inspection for complete context</span>
          </li>
        </ul>

        <div style="margin-top:2rem;">
          <a href="#/login" class="btn btn-primary">Agent Sign In</a>
        </div>
      </div>

      <div style="background:var(--bg-canvas);border:1px solid var(--border-medium);border-radius:var(--radius-lg);padding:1.5rem;">
        <div style="font-size:0.8rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:1rem;">Agent KPI Overview</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
          <div style="background:var(--bg-surface);padding:1rem;border-radius:var(--radius-md);border:1px solid var(--border-subtle);">
            <div style="font-size:0.75rem;color:var(--text-muted);">Average Rating</div>
            <div style="font-size:1.5rem;font-weight:800;color:var(--accent-amber);">★ 4.8 / 5.0</div>
          </div>
          <div style="background:var(--bg-surface);padding:1rem;border-radius:var(--radius-md);border:1px solid var(--border-subtle);">
            <div style="font-size:0.75rem;color:var(--text-muted);">Active Assigned</div>
            <div style="font-size:1.5rem;font-weight:800;color:var(--primary-400);">3 Tickets</div>
          </div>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div>
        <span class="badge badge-role-ADMIN" style="margin-bottom:0.75rem;">Admin Mission Control</span>
        <h3 style="font-size:1.75rem;margin-bottom:0.75rem;">Complete system oversight, live telemetry, and agent provisioning</h3>
        <p style="color:var(--text-secondary);font-size:1rem;line-height:1.6;">
          Administrators monitor real-time queue health, inspect background threads, and manage system users.
        </p>

        <ul class="role-features-list">
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Live concurrency telemetry stream monitoring worker pool and queues</span>
          </li>
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Provision new support agents instantly with secure password hashing</span>
          </li>
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Complete user directory browsing across all roles</span>
          </li>
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Audit bypass permission to inspect comments and history on any ticket</span>
          </li>
        </ul>

        <div style="margin-top:2rem;">
          <a href="#/login" class="btn btn-primary">Admin Login</a>
        </div>
      </div>

      <div style="background:var(--bg-canvas);border:1px solid var(--border-medium);border-radius:var(--radius-lg);padding:1.5rem;">
        <div style="font-size:0.8rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:1rem;">Telemetry Snapshot</div>
        <div style="background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:1rem;">
          <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;font-size:0.85rem;">
            <span>Worker Pool Status</span>
            <span style="color:var(--accent-emerald);font-weight:700;">HEALTHY (5/5)</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:0.85rem;">
            <span>Auto-Assignment Delay</span>
            <span style="font-weight:700;">10,000ms</span>
          </div>
        </div>
      </div>
    `;
  }
}
