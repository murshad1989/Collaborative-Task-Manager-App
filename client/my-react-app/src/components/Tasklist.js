import React from 'react';

function TaskList({ tasks }) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.status}</p>
          <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
