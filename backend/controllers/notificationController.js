const pool = require('../config/database');
const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Get all notifications for a user
const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const [notifications] = await pool.execute(`
            SELECT n.*, t.title as task_title 
            FROM notifications n
            JOIN tasks t ON n.task_id = t.id
            WHERE n.user_id = ?
            ORDER BY n.created_at DESC
            LIMIT 50
        `, [userId]);

        res.json({ notifications });
    } catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({ message: 'Error getting notifications' });
    }
};

// Mark notification as read
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Verify notification belongs to user
        const [notification] = await pool.execute(
            'SELECT * FROM notifications WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        if (notification.length === 0) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        await pool.execute(
            'UPDATE notifications SET is_read = true WHERE id = ?',
            [id]
        );

        res.json({ message: 'Notification marked as read' });
    } catch (error) {
        console.error('Mark notification error:', error);
        res.status(500).json({ message: 'Error marking notification as read' });
    }
};

// Mark all notifications as read
const markAllAsRead = async (req, res) => {
    try {
        const userId = req.user.id;

        await pool.execute(
            'UPDATE notifications SET is_read = true WHERE user_id = ?',
            [userId]
        );

        res.json({ message: 'All notifications marked as read' });
    } catch (error) {
        console.error('Mark all notifications error:', error);
        res.status(500).json({ message: 'Error marking all notifications as read' });
    }
};

// Delete a notification
const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Verify notification belongs to user
        const [notification] = await pool.execute(
            'SELECT * FROM notifications WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        if (notification.length === 0) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        await pool.execute(
            'DELETE FROM notifications WHERE id = ?',
            [id]
        );

        res.json({ message: 'Notification deleted' });
    } catch (error) {
        console.error('Delete notification error:', error);
        res.status(500).json({ message: 'Error deleting notification' });
    }
};

// Send email notification
const sendEmailNotification = async (userId, taskId, message) => {
    try {
        // Get user email
        const [users] = await pool.execute(
            'SELECT email FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            throw new Error('User not found');
        }

        // Get task details
        const [tasks] = await pool.execute(
            'SELECT title, due_date FROM tasks WHERE id = ?',
            [taskId]
        );

        if (tasks.length === 0) {
            throw new Error('Task not found');
        }

        const task = tasks[0];
        const userEmail = users[0].email;

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: 'Task Manager Notification',
            html: `
                <h2>Task Manager Notification</h2>
                <p>${message}</p>
                <h3>Task Details:</h3>
                <p><strong>Title:</strong> ${task.title}</p>
                <p><strong>Due Date:</strong> ${new Date(task.due_date).toLocaleString()}</p>
                <p>Please log in to the Task Manager to view more details.</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Send email notification error:', error);
    }
};

// Create a new notification with email
const createNotification = async (userId, taskId, message) => {
    try {
        // Create in-app notification
        await pool.execute(
            'INSERT INTO notifications (user_id, task_id, message) VALUES (?, ?, ?)',
            [userId, taskId, message]
        );

        // Send email notification
        await sendEmailNotification(userId, taskId, message);
    } catch (error) {
        console.error('Create notification error:', error);
    }
};

module.exports = {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    createNotification
};
