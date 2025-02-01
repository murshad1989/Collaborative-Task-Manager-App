const pool = require('../config/database');

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, priority, due_date } = req.body;
        const created_by = req.user.id;

        const [result] = await pool.execute(
            'INSERT INTO tasks (title, description, priority, due_date, created_by) VALUES (?, ?, ?, ?, ?)',
            [title, description, priority, due_date, created_by]
        );

        // If task needs to be assigned to other users
        if (req.body.assigned_users && Array.isArray(req.body.assigned_users)) {
            for (const userId of req.body.assigned_users) {
                await pool.execute(
                    'INSERT INTO task_assignments (task_id, user_id) VALUES (?, ?)',
                    [result.insertId, userId]
                );

                // Create notification for assigned user
                await pool.execute(
                    'INSERT INTO notifications (user_id, task_id, message) VALUES (?, ?, ?)',
                    [userId, result.insertId, `You have been assigned a new task: ${title}`]
                );
            }
        }

        const [task] = await pool.execute(
            'SELECT * FROM tasks WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json({
            message: 'Task created successfully',
            task: task[0]
        });
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({ message: 'Error creating task' });
    }
};

// Get all tasks for a user
const getTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const { status, priority, sort = 'due_date' } = req.query;

        let query = `
            SELECT DISTINCT t.*, 
                   GROUP_CONCAT(DISTINCT ta.user_id) as assigned_users
            FROM tasks t
            LEFT JOIN task_assignments ta ON t.id = ta.task_id
            WHERE t.created_by = ? OR ta.user_id = ?
        `;

        const queryParams = [userId, userId];

        if (status) {
            query += ' AND t.status = ?';
            queryParams.push(status);
        }

        if (priority) {
            query += ' AND t.priority = ?';
            queryParams.push(priority);
        }

        query += ' GROUP BY t.id';

        // Add sorting
        if (sort === 'priority') {
            query += ' ORDER BY FIELD(t.priority, "high", "medium", "low")';
        } else if (sort === 'due_date') {
            query += ' ORDER BY t.due_date';
        }

        const [tasks] = await pool.execute(query, queryParams);

        res.json({ tasks });
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({ message: 'Error getting tasks' });
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority, status, due_date, assigned_users } = req.body;
        const userId = req.user.id;

        // Check if user has permission to update task
        const [task] = await pool.execute(
            'SELECT * FROM tasks WHERE id = ? AND created_by = ?',
            [id, userId]
        );

        if (task.length === 0) {
            return res.status(403).json({ message: 'Not authorized to update this task' });
        }

        // Update task
        await pool.execute(
            `UPDATE tasks 
             SET title = ?, description = ?, priority = ?, status = ?, due_date = ?
             WHERE id = ?`,
            [title, description, priority, status, due_date, id]
        );

        // Update assignments if provided
        if (assigned_users && Array.isArray(assigned_users)) {
            // Remove existing assignments
            await pool.execute('DELETE FROM task_assignments WHERE task_id = ?', [id]);

            // Add new assignments
            for (const userId of assigned_users) {
                await pool.execute(
                    'INSERT INTO task_assignments (task_id, user_id) VALUES (?, ?)',
                    [id, userId]
                );

                // Create notification for newly assigned users
                await pool.execute(
                    'INSERT INTO notifications (user_id, task_id, message) VALUES (?, ?, ?)',
                    [userId, id, `You have been assigned to task: ${title}`]
                );
            }
        }

        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({ message: 'Error updating task' });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Check if user has permission to delete task
        const [task] = await pool.execute(
            'SELECT * FROM tasks WHERE id = ? AND created_by = ?',
            [id, userId]
        );

        if (task.length === 0) {
            return res.status(403).json({ message: 'Not authorized to delete this task' });
        }

        // Delete task (cascade will handle related records)
        await pool.execute('DELETE FROM tasks WHERE id = ?', [id]);

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({ message: 'Error deleting task' });
    }
};

// Get task analytics
const getTaskAnalytics = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get tasks by status
        const [statusStats] = await pool.execute(`
            SELECT status, COUNT(*) as count
            FROM tasks
            WHERE created_by = ? OR id IN (
                SELECT task_id FROM task_assignments WHERE user_id = ?
            )
            GROUP BY status
        `, [userId, userId]);

        // Get tasks by priority
        const [priorityStats] = await pool.execute(`
            SELECT priority, COUNT(*) as count
            FROM tasks
            WHERE created_by = ? OR id IN (
                SELECT task_id FROM task_assignments WHERE user_id = ?
            )
            GROUP BY priority
        `, [userId, userId]);

        // Get overdue tasks
        const [overdueTasks] = await pool.execute(`
            SELECT COUNT(*) as count
            FROM tasks
            WHERE (created_by = ? OR id IN (
                SELECT task_id FROM task_assignments WHERE user_id = ?
            ))
            AND due_date < NOW()
            AND status != 'completed'
        `, [userId, userId]);

        res.json({
            statusDistribution: statusStats,
            priorityDistribution: priorityStats,
            overdueTasksCount: overdueTasks[0].count
        });
    } catch (error) {
        console.error('Get analytics error:', error);
        res.status(500).json({ message: 'Error getting task analytics' });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getTaskAnalytics
};
