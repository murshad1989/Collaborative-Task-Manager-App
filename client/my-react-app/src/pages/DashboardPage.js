import React, { useEffect, useState } from 'react';
import { taskApi } from '../Services/Api';
import TaskList from '../components/Tasklist';
import OverDueTaskChart from '../components/OverDueTaskChart';
import CompletedTaskChart from '../components/CompletedTaskChart';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await taskApi.getAll();
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
      <h1>Welcome to Your Dashboard</h1>

      {/* Profile Section */}
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
        <h2>Profile</h2>
        <p>Manage your personal information and account settings here.</p>
        {/* Add your profile details or link to profile page here */}
      </div>

      {/* Task Management Section */}
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
        <h2>Your Tasks</h2>
        <TaskList tasks={tasks} />
      </div>

      {/* Overdue Task Chart */}
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
        <h2>Overdue Task Overview</h2>
        <OverDueTaskChart />
      </div>

      {/* Completed Task Chart */}
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
        <h2>Completed Task Overview</h2>
        <CompletedTaskChart />
      </div>
    </div>
  );
};

export default DashboardPage;
