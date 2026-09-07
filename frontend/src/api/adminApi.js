// Admin Mission Control API
import { api } from './apiClient.js';

export const adminApi = {
  getConcurrencyStatus: () => api.get('/admin/system/concurrency'),
  getAllUsers: () => api.get('/admin/users'),
  createAgent: (data) => api.post('/admin/agents', data)
};
