import axios from 'axios';

const API_URL = 'http://localhost:5001/api/analytics';  // Backend API URL

// Get tasks completed within a specific time range
const getCompletedTasks = async (startDate, endDate) => {
  const response = await axios.get(`${API_URL}/completed`, {
    params: { startDate, endDate }
  });
  return response.data;
};

// Get overdue tasks
const getOverdueTasks = async () => {
  const response = await axios.get(`${API_URL}/overdue`);
  return response.data;
};

export default {
  getCompletedTasks,
  getOverdueTasks
};
