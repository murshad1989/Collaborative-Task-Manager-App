import axios from 'axios';

const API_URL = 'http://localhost:5001/api/collaboration';  // Backend API URL

// Share a task with another user
const shareTask = async (taskId, userId) => {
  const response = await axios.post(`${API_URL}/share`, { taskId, userId });
  return response.data;
};

// Get all shared tasks for a user
const getSharedTasks = async (userId) => {
  const response = await axios.get(`${API_URL}/shared/${userId}`);
  return response.data;
};

export default {
  shareTask,
  getSharedTasks
};
