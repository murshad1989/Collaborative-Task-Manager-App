import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const authApi = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  logout: () => {
    localStorage.removeItem('user');
  },
  forgotPassword: (data) => API.post('/auth/forgot-password', data),
  resetPassword: (data, token) => API.post(`/auth/reset-password/${token}`, data),
};

const taskApi = {
  getAll: () => API.get('/tasks'),
  create: (data) => API.post('/tasks', data),
  update: (id, data) => API.put(`/tasks/${id}`, data),
  delete: (id) => API.delete(`/tasks/${id}`),
  share: (id, data) => API.post(`/tasks/${id}/share`, data),
  getOverdueTasks: () => API.get('/analytics/overdue'),
};

const analyticsApi = {
  getCompletedTasks: () => API.get('/analytics/completed'),
  getOverdueTasks: () => API.get('/analytics/overdue'),
};

export { authApi, taskApi, analyticsApi };
