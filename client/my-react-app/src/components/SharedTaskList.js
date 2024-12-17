import React, { useEffect, useState } from "react";
import collaborationService from "../Services/CollaborationService";

const SharedTaskList = ({ userId }) => {
  const [sharedTasks, setSharedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSharedTasks = async () => {
      try {
        setLoading(true);
        const tasks = await collaborationService.getSharedTasks(userId);
        setSharedTasks(tasks);
        setLoading(false);
      } catch (err) {
        setError("Failed to load shared tasks.");
        setLoading(false);
      }
    };

    if (userId) {
      fetchSharedTasks();
    }
  }, [userId]);

  if (loading) return <p>Loading shared tasks...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Shared Tasks</h2>
      {sharedTasks.length === 0 ? (
        <p style={styles.noTasks}>No tasks shared with you.</p>
      ) : (
        <ul style={styles.taskList}>
          {sharedTasks.map((task) => (
            <li key={task.id} style={styles.taskItem}>
              <div>
                <h3 style={styles.taskTitle}>{task.title}</h3>
                <p style={styles.taskDescription}>{task.description}</p>
              </div>
              <p style={styles.taskMeta}>
                <strong>Deadline:</strong> {task.deadline}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f4f4f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    maxWidth: "800px",
  },
  title: {
    fontSize: "1.8em",
    color: "#2c3e50",
    marginBottom: "10px",
  },
  taskList: {
    listStyleType: "none",
    padding: "0",
  },
  taskItem: {
    padding: "15px",
    marginBottom: "10px",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    margin: "0",
    fontSize: "1.2em",
    color: "#2980b9",
  },
  taskDescription: {
    margin: "5px 0",
    fontSize: "0.9em",
    color: "#7f8c8d",
  },
  taskMeta: {
    fontSize: "0.85em",
    color: "#34495e",
  },
  noTasks: {
    fontSize: "1em",
    color: "#95a5a6",
  },
  error: {
    color: "red",
    fontSize: "1em",
    textAlign: "center",
  },
};

export default SharedTaskList;
