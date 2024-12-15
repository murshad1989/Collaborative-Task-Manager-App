const pool = require('../config/db');

// Get tasks completed within a specific time range
exports.getCompletedTasks = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    // Fixed SQL query and placeholders
    const query = `
      SELECT * FROM tasks
      WHERE status = 'completed' AND completed_at BETWEEN ? AND ?
    `;
    const [tasks] = await pool.query(query, [startDate, endDate]);

    res.json(tasks); // Return tasks as a response
  } catch (error) {
    console.error('Error fetching completed tasks:', error);
    res.status(500).json({ error: 'Failed to fetch completed tasks' });
  }
};

// Get overdue tasks
exports.getOverdueTasks = async (req, res) => {
  try {
    // SQL query to get overdue tasks
    const query = `
      SELECT * FROM tasks
      WHERE status != 'completed' AND due_date < NOW()
    `;
    const [tasks] = await pool.query(query);

    res.json(tasks); // Return overdue tasks
  } catch (error) {
    console.error('Error fetching overdue tasks:', error);
    res.status(500).json({ error: 'Failed to fetch overdue tasks' });
  }
};
