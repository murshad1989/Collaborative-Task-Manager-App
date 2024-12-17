import axios from 'axios';

const API_URL = 'http://localhost:3000/api/collaboration';

const shareTask = async (taskId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/share`, { taskId, userId });
    return response.data;
  } catch (error) {
    console.error('Error sharing task:', error);
    throw error;
  }
};


const getSharedTasks = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/shared/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching shared tasks:', error);
    throw error;
  }
};


const revokeSharedTask = async (taskId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/revoke`, { taskId, userId });
    return response.data;
  } catch (error) {
    console.error('Error revoking shared task:', error);
    throw error;
  }
};


const getCollaborationReport = async () => {
  try {
    const response = await axios.get(`${API_URL}/report`);
    return response.data;
  } catch (error) {
    console.error('Error fetching collaboration report:', error);
    throw error;
  }
};

export default {
  shareTask,
  getSharedTasks,
  revokeSharedTask,
  getCollaborationReport,
};
