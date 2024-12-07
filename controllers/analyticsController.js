const pool = require('../config/db');

// Get tasks completed within a specific time range
exports.getCompletedTasks = async (req, res) => {
  const { startDate, endDate } = req.query; // Query parameters from the request

  try {
    const query = `
      SELECT * FROM tasks
      WHERE status = 'completed' AND completed_at BETWEEN ? AND ?
    `;
    const [tasks] = await pool.query(query, [startDate, endDate]);

    res.json(tasks); // Sending the data back to the frontend
  } catch (error) {
    console.error('Error fetching completed tasks:', error);
    res.status(500).json({ error: 'Failed to fetch completed tasks' });
  }
};

// Get overdue tasks
exports.getOverdueTasks = async (req, res) => {
  try {
    const query = `
      SELECT * FROM tasks
      WHERE status != 'completed' AND due_date < NOW()
    `;
    const [tasks] = await pool.query(query);

    res.json(tasks); // Sending the data back to the frontend
  } catch (error) {
    console.error('Error fetching overdue tasks:', error);
    res.status(500).json({ error: 'Failed to fetch overdue tasks' });
  }
};
