// Real-time Concurrency Telemetry Client (WebSocket + Robust Polling Fallback)
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { adminApi } from './adminApi.js';
import { authState } from '../state/authState.js';

class ConcurrencyTelemetryClient {
  constructor() {
    this.stompClient = null;
    this.subscribers = [];
    this.pollingInterval = null;
    this.latestStats = {
      queueSize: 0,
      activeWorkers: 0,
      processedTickets: 0,
      failedTickets: 0
    };
    this.isConnected = false;
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    callback(this.latestStats, this.isConnected);

    if (this.subscribers.length === 1) {
      this.start();
    }

    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
      if (this.subscribers.length === 0) {
        this.stop();
      }
    };
  }

  broadcast(stats) {
    this.latestStats = { ...this.latestStats, ...stats };
    this.subscribers.forEach(cb => cb(this.latestStats, this.isConnected));
  }

  start() {
    // Attempt WebSocket connection
    const wsUrl = import.meta.env.VITE_WS_URL || '/ws';
    try {
      this.stompClient = new Client({
        webSocketFactory: () => new SockJS(wsUrl),
        reconnectDelay: 5000,
        debug: () => {}, // silence debug logs
        onConnect: () => {
          this.isConnected = true;
          this.stompClient.subscribe('/topic/concurrency-stats', (message) => {
            try {
              const data = JSON.parse(message.body);
              this.broadcast(data);
            } catch (e) {
              console.error('Failed to parse concurrency stats message', e);
            }
          });
        },
        onDisconnect: () => {
          this.isConnected = false;
        },
        onStompError: () => {
          this.isConnected = false;
        }
      });

      this.stompClient.activate();
    } catch (err) {
      console.warn('WebSocket init fallback to polling', err);
      this.isConnected = false;
    }

    // Always keep active polling running for admin role or as backup
    this.poll();
    this.pollingInterval = setInterval(() => this.poll(), 2500);
  }

  async poll() {
    if (authState.getRole() !== 'ADMIN') return;
    try {
      const stats = await adminApi.getConcurrencyStatus();
      if (stats) {
        this.broadcast(stats);
      }
    } catch {
      // Ignore polling errors when unauthenticated or during route changes
    }
  }

  stop() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
    if (this.stompClient) {
      try {
        this.stompClient.deactivate();
      } catch {}
      this.stompClient = null;
    }
    this.isConnected = false;
  }
}

export const concurrencyTelemetry = new ConcurrencyTelemetryClient();
