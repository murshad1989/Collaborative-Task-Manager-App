import React from 'react';
import axios from 'axios';

const TaskCard = ({ task }) => {
  const handleShare = async () => {
    try {
      const token = localStorage.getItem('token');
      const sharedWithUserId = prompt('Enter user ID to share task:');
      await axios.post(
        'http://localhost:5000/api/tasks/share',
        { taskId: task.id, sharedWithUserId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Task shared successfully');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
      <button onClick={handleShare}>Share Task</button>
    </div>
  );
};

export default TaskCard;
