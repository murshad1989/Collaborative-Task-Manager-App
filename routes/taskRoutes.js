const express = require('express');
const Task = require('../models/Task'); // فرض کریں کہ آپ نے Task ماڈل بنایا ہے

const router = express.Router();

// Create a new task
router.post('/create', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ title, description });
        await newTask.save();
        res.status(201).send('Task created successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update a task
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, { title, description }, { new: true });
        res.status(200).send('Task updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a task
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).send('Task deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;

