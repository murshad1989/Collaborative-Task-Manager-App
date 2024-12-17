import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { taskApi } from '../Services/Api';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CompletedTaskChart = () => {
  const [completedTasks, setCompletedTasks] = useState([]);


  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await taskApi.getAll();
        const tasks = response.data.filter((task) => task.status === 'completed');
        setCompletedTasks(tasks);
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
      }
    };

    fetchCompletedTasks();
  }, []);


  const chartData = {
    labels: completedTasks.map((task) => task.name),
    datasets: [
      {
        label: 'Completed Tasks',
        data: completedTasks.map((task) => task.completedTime),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', padding: '20px' }}>
      <h2>Completed Tasks Overview</h2>
      <Line data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default CompletedTaskChart;
