const pool = require('./config/db');

const tasks = [
  {
    title: 'Task 1',
    description: 'This is task 1. in this task you are prove that you are not a rebot. click on tge link and subscribe channel',
    priority: 'High',
    status: 'Completed',
    due_date: '2025-02-1',
    completed_at: '2024-12-10',
  },
  {
    title: 'Task 2',
    description: 'This is task 2. Go to channel and tap the bell icon',
    priority: 'Medium',
    status: 'Pending',
    due_date: '2024-12-20',
    completed_at: null,
  },

];

const insertTasks = async () => {
  try {
    const query = `
      INSERT INTO tasks (title, description, priority, status, due_date, completed_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    for (const task of tasks) {
      await pool.query(query, [
        task.title,
        task.description,
        task.priority,
        task.status,
        task.due_date,
        task.completed_at,
      ]);
    }

    console.log('Sample data inserted successfully!');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
};

insertTasks();
