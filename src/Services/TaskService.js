import axios from 'axios';

const API_URL = 'http://localhost:5001/api/tasks';  // Backend API URL

// Get all tasks
const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new task
const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

// Update task
const updateTask = async (taskId, updatedData) => {
  const response = await axios.put(`${API_URL}/${taskId}`, updatedData);
  return response.data;
};

// Delete task
const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_URL}/${taskId}`);
  return response.data;
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
