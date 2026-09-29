const express = require('express');
const repo = require('./repository');
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.post('/tasks/:id/comments', async (req, res) => {
  if (req.headers['authorization'] !== process.env.TASK_TOKEN) return res.status(401).send();
  const task = repo.getTask(req.params.id);
  if (!task || task[1] === 'closed') return res.status(403).send();
  await repo.addComment(req.params.id, req.body.text);
  res.status(201).send();
});
repo.init().then(() => app.listen(process.env.PORT || 3010));