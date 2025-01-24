import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token'); // JWT token from local storage
      const response = await axios.get('http://localhost:3000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.data) {
        setTasks(response.data.data);
      } else {
        console.error('Unexpected response:', response.data);
        alert('Failed to fetch tasks.');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error.response?.data?.message || error.message);
      alert('Error fetching tasks. Please try again.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Your Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
