// Customer & General Ticket API
import { api } from './apiClient.js';

export const ticketApi = {
  createTicket: (data) => api.post('/tickets', data),
  getMyTickets: () => api.get('/tickets/my'),
  getTicketById: (id) => api.get(`/tickets/${id}`),
  updateTicket: (id, data) => api.put(`/tickets/${id}`, data),
  closeTicket: (id) => api.put(`/tickets/${id}/close`),
  cancelTicket: (id) => api.put(`/tickets/${id}/cancel`),
  rateTicket: (id, data) => api.put(`/tickets/${id}/rate`, data)
};
