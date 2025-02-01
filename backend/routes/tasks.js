const express = require('express');
const router = express.Router();
const { 
    createTask, 
    getTasks, 
    updateTask, 
    deleteTask,
    getTaskAnalytics 
} = require('../controllers/taskController');
const authenticateToken = require('../middlewares/auth');

// All routes are protected
router.use(authenticateToken);

// Task CRUD operations
router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

// Analytics
router.get('/analytics', getTaskAnalytics);

module.exports = router;
