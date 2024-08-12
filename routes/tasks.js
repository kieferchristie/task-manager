const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
const Joi = require('joi');
const auth = require('../middleware/auth');

// Validation schema
const taskSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(5).max(255).required(),
  userId: Joi.string().hex().length(24).required()
});

// Create a new task
router.post('/', auth, async (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, description, userId } = req.body;

  try {
    const newTask = new Task({ title, description, userId });
    await newTask.save();
    res.status(201).send(newTask);
  } catch (err) {
    console.error('Error creating task:', err.message);
    res.status(500).send('Server error');
  }
});

// Get all tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Error getting tasks:', err.message);
    res.status(500).send('Server error');
  }
});

// Get a specific task
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.json(task);
  } catch (err) {
    console.error('Error getting task:', err.message);
    res.status(500).send('Server error');
  }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.json(task);
  } catch (err) {
    console.error('Error updating task:', err.message);
    res.status(500).send('Server error');
  }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.send('Task deleted successfully');
  } catch (err) {
    console.error('Error deleting task:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
