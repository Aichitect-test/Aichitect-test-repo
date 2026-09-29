const express = require('express');
const repo = require('./taskRepository');
const service = require('./taskService');
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.post('/tasks', async (req, res) => {
  if (req.headers.authorization !== process.env.TASK_TOKEN) return res.status(401).send({error: 'Unauthorized'});
  try { await service.register(req.body); res.send({success: true}); }
  catch (e) { res.status(400).send({error: e.message}); }
});
repo.init().then(() => app.listen(process.env.PORT || 3010));