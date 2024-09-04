// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS if needed

let tasks = [
  { id: 1, type:'task', attributes:{description: 'Task 1', dueDate: '2024-09-01T00:00:00.000Z', completed: false }},
  { id: 2, type:'task', attributes:{description: 'Task 2', dueDate: '2024-09-10T00:00:00.000Z', completed: true} }
];
console.log('app running')
// GET all tasks
app.get('/api/tasks', (req, res) => {
console.log('coming to get request');
  res.json({ data: tasks });

});

// POST a new task
app.post('/api/tasks', (req, res) => {
    console.log("coming for post?")
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
  res.json({ data: updatedTask });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
