import React, { useState } from "react";

const TaskForm = ({ onSubmit, initialTask = {} }) => {
  const [title, setTitle] = useState(initialTask.title || "");
  const [description, setDescription] = useState(initialTask.description || "");
  const [priority, setPriority] = useState(initialTask.priority || "Low");
  const [dueDate, setDueDate] = useState(initialTask.dueDate || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, priority, dueDate });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialTask.id ? "Edit Task" : "Create Task"}</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Priority:</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;
