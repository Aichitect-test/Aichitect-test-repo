const express = require('express');
const repo = require('./repository');
const app = express();
app.use(express.json());
app.use(express.static('public'));
const ALLOWED_STATUSES = ['pending', 'in-progress', 'done'];
app.post('/tasks', async (req, res) => {
  if (req.headers.authorization !== process.env.TASK_TOKEN) return res.status(401).send('Unauthorized');
  const { title, deadline, status } = req.body;
  if (!title || !deadline || new Date(deadline) <= new Date() || !ALLOWED_STATUSES.includes(status)) {
    return res.status(400).send('Invalid input');
  }
  await repo.save({ title, deadline, status });
  res.status(201).send('Success');
});
repo.init().then(() => app.listen(process.env.PORT || 3010));
module.exports = app;