const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const pool = require('../config/db'); // اگر آپ DB کو کوئری کرنے کے لیے استعمال کرتے ہیں

const router = express.Router();

// Create a new task (Protected Route)
router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;

        // DB میں ٹاسک ڈالنے کی logic یہاں شامل کریں
        const [result] = await pool.query(
            "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)", 
            [title, description, userId]
        );

        if (result.affectedRows === 1) {
            res.status(201).json({ message: 'Task created successfully', task: { title, description, user_id: userId } });
        } else {
            throw new Error("Failed to create task.");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all tasks (Protected Route)
router.get('/', authMiddleware, async (req, res) => {
    try {
        // DB سے یوزر کی تمام ٹاسک فچ کریں
        const [tasks] = await pool.query("SELECT * FROM tasks WHERE user_id = ?", [req.user.id]);

        res.status(200).json({ tasks });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a task (Protected Route)
router.put('/update/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const userId = req.user.id;

        // DB میں ٹاسک اپڈیٹ کرنے کی logic
        const [result] = await pool.query(
            "UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?",
            [title, description, id, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found or you don't have permission to edit it." });
        }

        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a task (Protected Route)
router.delete('/delete/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // DB میں ٹاسک ڈیلیٹ کرنے کی logic
        const [result] = await pool.query(
            "DELETE FROM tasks WHERE id = ? AND user_id = ?",
            [id, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found or you don't have permission to delete it." });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
