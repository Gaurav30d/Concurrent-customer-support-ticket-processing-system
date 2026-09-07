// Audit History API
import { api } from './apiClient.js';

export const historyApi = {
  getHistory: (ticketId) => api.get(`/tickets/${ticketId}/history`)
};
