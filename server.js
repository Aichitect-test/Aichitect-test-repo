const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const tasks = [];
const ALLOWED_STATUSES = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

app.post('/tasks', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || authHeader !== 'Bearer valid-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { title, deadline, status } = req.body;

  if (!title || !deadline || !status) {
    return res.status(400).json({ error: 'Missing required fields: title, deadline, status' });
  }

  if (!ALLOWED_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Allowed statuses are: ' + ALLOWED_STATUSES.join(', ') });
  }

  const deadlineDate = new Date(deadline);
  const now = new Date();
  if (isNaN(deadlineDate.getTime()) || deadlineDate <= now) {
    return res.status(400).json({ error: 'Deadline must be a valid future date' });
  }

  const startTime = Date.now();
  const newTask = {
    id: tasks.length + 1,
    title,
    deadline: deadlineDate.toISOString(),
    status,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);

  const duration = Date.now() - startTime;
  res.setHeader('X-Response-Time', `${duration}ms`);
  return res.status(201).json({
    success: true,
    message: 'Task registered successfully',
    task: newTask
  });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Task management service running on port ${PORT}`);
  });
}

module.exports = app;
