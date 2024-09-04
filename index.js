// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS if needed

let tasks = [];
console.log('app running')
// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json({ data: tasks });

});

app.get('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find(t => t.id === taskId);
  
  if (task) {
    res.json({ data: task });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// POST a new task
app.post('/api/tasks', (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length + 1; // Simple ID assignment logic
  tasks.push(newTask);
  res.status(201).json({ data: newTask });
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  tasks = tasks.filter(task => task.id !== taskId);
  res.status(204).end();
});

// PUT update a task
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const updatedTask = req.body;
  tasks = tasks.map(task => (task.id === taskId ? updatedTask : task));
  res.json({ data: tasks });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
