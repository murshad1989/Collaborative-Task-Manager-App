const pool = require("../config/db");


exports.getCompletedTasks = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const query = `
      SELECT id, title, status, completed_at 
      FROM tasks 
      WHERE status = 'completed' AND completed_at BETWEEN ? AND ?
    `;
    const [tasks] = await pool.query(query, [startDate, endDate]);

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    res.status(500).json({ error: "Failed to fetch completed tasks" });
  }
};


exports.getOverdueTasks = async (req, res) => {
  try {
    const query = `
      SELECT id, title, status, due_date 
      FROM tasks 
      WHERE status != 'completed' AND due_date < NOW()
    `;
    const [tasks] = await pool.query(query);

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching overdue tasks:", error);
    res.status(500).json({ error: "Failed to fetch overdue tasks" });
  }
};


exports.getTaskStatistics = async (req, res) => {
  try {
    const query = `
      SELECT 
        COUNT(*) AS total_tasks, 
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_tasks, 
        SUM(CASE WHEN status != 'completed' THEN 1 ELSE 0 END) AS pending_tasks 
      FROM tasks
    `;
    const [statistics] = await pool.query(query);

    res.json(statistics[0]);
  } catch (error) {
    console.error("Error fetching task statistics:", error);
    res.status(500).json({ error: "Failed to fetch task statistics" });
  }
};


exports.getUserPerformance = async (req, res) => {
  try {
    const query = `
      SELECT 
        user_id, 
        COUNT(*) AS total_tasks, 
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_tasks 
      FROM tasks 
      GROUP BY user_id
    `;
    const [performance] = await pool.query(query);

    res.json(performance);
  } catch (error) {
    console.error("Error fetching user performance:", error);
    res.status(500).json({ error: "Failed to fetch user performance" });
  }
};


exports.getTaskDetails = async (req, res) => {
  const { taskId } = req.params;

  try {
    const query = `
      SELECT * FROM tasks WHERE id = ?
    `;
    const [taskDetails] = await pool.query(query, [taskId]);

    res.json(taskDetails[0]);
  } catch (error) {
    console.error("Error fetching task details:", error);
    res.status(500).json({ error: "Failed to fetch task details" });
  }
};
