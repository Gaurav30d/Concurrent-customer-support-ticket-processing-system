// Comments API
import { api } from './apiClient.js';

export const commentApi = {
  getComments: (ticketId) => api.get(`/tickets/${ticketId}/comments`),
  addComment: (ticketId, message) => api.post(`/tickets/${ticketId}/comments`, { message })
};
