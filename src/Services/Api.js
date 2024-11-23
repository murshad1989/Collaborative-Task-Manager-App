import axios from 'axios';

// Set the base URL for your backend API
const API_URL = 'http://localhost:5001/api';  // Adjust the URL as needed

// Create an axios instance to set common configurations (like authorization tokens)
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for adding token to requests if available
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Create an API service to interact with authentication endpoints
const authApi = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  login: async (userData) => {
    const response = await api.post('/auth/login', userData);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('user');
  },
};

// Create an API service to interact with task management endpoints
const taskApi = {
  getTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },
  updateTask: async (taskId, updatedData) => {
    const response = await api.put(`/tasks/${taskId}`, updatedData);
    return response.data;
  },
  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },
};

// Create an API service to interact with collaboration endpoints
const collaborationApi = {
  shareTask: async (taskId, userId) => {
    const response = await api.post('/collaboration/share', { taskId, userId });
    return response.data;
  },
  getSharedTasks: async (userId) => {
    const response = await api.get(`/collaboration/shared/${userId}`);
    return response.data;
  },
};

// Create an API service to interact with analytics endpoints
const analyticsApi = {
  getCompletedTasks: async (startDate, endDate) => {
    const response = await api.get('/analytics/completed', {
      params: { startDate, endDate },
    });
    return response.data;
  },
  getOverdueTasks: async () => {
    const response = await api.get('/analytics/overdue');
    return response.data;
  },
};

export {
  authApi,
  taskApi,
  collaborationApi,
  analyticsApi,
};
