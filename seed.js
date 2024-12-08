const pool = require('./config/db');

// Sample data to insert
const tasks = [
  {
    title: 'Task 1',
    description: 'This is task 1 description',
    priority: 'High',
    status: 'Completed',
    due_date: '2024-12-15',
    completed_at: '2024-12-01',  // Add completed_at value
  },
  {
    title: 'Task 2',
    description: 'This is task 2 description',
    priority: 'Medium',
    status: 'Pending',
    due_date: '2024-12-20',
    completed_at: null,  // Add null for incomplete tasks
  },
  // Add more tasks if needed
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
        task.completed_at, // Insert completed_at value
      ]);
    }

    console.log('Sample data inserted successfully!');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
};

insertTasks();
