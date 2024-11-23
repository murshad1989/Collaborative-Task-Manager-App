import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';

function HomePage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default HomePage;
