import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tasks';

const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

const updateTask = async (taskId, updatedData) => {
  const response = await axios.put(`${API_URL}/${taskId}`, updatedData);
  return response.data;
};

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
