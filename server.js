const express = require('express');
const repo = require('./repository');
const validator = require('./validator');
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.post('/tasks', async (req, res) => {
  if (req.headers.authorization !== process.env.TASK_TOKEN) return res.status(401).send('Unauthorized');
  try {
    const task = validator.validate(req.body);
    await repo.save(task);
    res.status(201).send('Success');
  } catch (e) { res.status(400).send(e.message); }
});
app.listen(process.env.PORT || 3010);
module.exports = app;