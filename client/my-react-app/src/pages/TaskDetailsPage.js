import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: '',
    description: '',
    dueTime: '',
    completedTime: '',
    sharedWith: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchTask = async () => {
      if (taskId) {
        try {
          const response = await axios.get(`http://localhost:3000/tasks/${taskId}`);
          setTask(response.data);
        } catch (err) {
          setError('Error fetching task details');
        }
      }
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      if (taskId) {

        const response = await axios.put(`http://localhost:3000/tasks/${taskId}`, task);
        setMessage(response.data.message || 'Task updated successfully.');
      } else {

        const response = await axios.post('http://localhost:3000/tasks', task);
        setMessage(response.data.message || 'Task created successfully.');
        navigate('/tasks');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    }
  };

  const handleDelete = async () => {
    setError('');
    setMessage('');

    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      setMessage('Task deleted successfully.');
      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task.');
    }
  };

  const handleShare = async () => {
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`http://localhost:3000/tasks/${taskId}/share`, {
        sharedWith: task.sharedWith,
      });
      setMessage(response.data.message || 'Task shared successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to share task.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>{taskId ? 'Edit Task' : 'Create Task'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Title:</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Description:</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        />

        <label style={styles.label}>Due Time:</label>
        <input
          type="datetime-local"
          name="dueTime"
          value={task.dueTime}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Completed Time (if applicable):</label>
        <input
          type="datetime-local"
          name="completedTime"
          value={task.completedTime}
          onChange={handleChange}
          style={styles.input}
        />

        <label style={styles.label}>Share With (Email):</label>
        <input
          type="email"
          name="sharedWith"
          value={task.sharedWith}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          {taskId ? 'Update Task' : 'Create Task'}
        </button>
      </form>

      {taskId && (
        <>
          <button onClick={handleDelete} style={styles.deleteButton}>
            Delete Task
          </button>
          <button onClick={handleShare} style={styles.shareButton}>
            Share Task
          </button>
        </>
      )}

      {/* Success and error messages */}
      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    height: '100px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '10px',
    backgroundColor: '#FF0000',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginTop: '10px',
    cursor: 'pointer',
  },
  shareButton: {
    padding: '10px',
    backgroundColor: '#28A745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginTop: '10px',
    cursor: 'pointer',
  },
  success: {
    color: 'green',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default TaskDetailsPage;
