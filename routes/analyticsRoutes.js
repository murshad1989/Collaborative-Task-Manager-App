const express = require('express');
const router = express.Router();
const { getCompletedTasks, getOverdueTasks } = require('../controllers/analyticsController');

// Route for fetching completed tasks within a time range
router.get('/completed', getCompletedTasks);

// Route for fetching overdue tasks
router.get('/overdue', getOverdueTasks);

module.exports = router;
