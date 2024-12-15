import React from "react";

const SharedTaskList = ({ tasks }) => {
  return (
    <div>
      <h2>Shared Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SharedTaskList;
