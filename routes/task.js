const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middlewares/auth"); // Token authentication middleware
const router = express.Router();

// Create a new task
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, priority, status, dueDate } = req.body;
  try {
    const newTask = await Task.create({
      title,
      description,
      priority,
      status,
      dueDate,
      userId: req.user.id, // Using the user ID from the token
    });
    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all tasks for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a task
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, description, priority, status, dueDate } = req.body;
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task || task.userId !== req.user.id) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    const updatedTask = await task.update({ title, description, priority, status, dueDate });
    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task || task.userId !== req.user.id) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    await task.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
