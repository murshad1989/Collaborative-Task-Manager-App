const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");

router.get("/completed-tasks", analyticsController.getCompletedTasks);
router.get("/overdue-tasks", analyticsController.getOverdueTasks);
router.get("/task-statistics", analyticsController.getTaskStatistics);
router.get("/user-performance", analyticsController.getUserPerformance);
router.get("/task-details/:taskId", analyticsController.getTaskDetails);

module.exports = router;
