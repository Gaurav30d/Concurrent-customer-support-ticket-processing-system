// Agent Workflow API
import { api } from './apiClient.js';

export const agentApi = {
  getAvailableTickets: () => api.get('/agent/tickets'),
  getMyAssignedTickets: () => api.get('/agent/tickets/assigned'),
  claimTicket: (id) => api.put(`/agent/tickets/${id}/claim`),
  updateStatus: (id, status) => api.put(`/agent/tickets/${id}/status`, { status }),
  getAverageRating: () => api.get('/agent/rating')
};
