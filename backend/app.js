// Create an Express API for task management with GET and POST endpoints

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory storage
let tasks = [];
let nextId = 1;

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// GET single task by id
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// POST new task
app.post('/tasks', (req, res) => {
  const { title, done } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const newTask = {
    id: nextId++,
    title,
    done: done || false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(PORT, () => {
  console.log(`Task Manager API running on http://localhost:${PORT}`);
});