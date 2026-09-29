const express = require('express');
const { createRepository } = require('./repository');
const app = express();
const PORT = process.env.PORT || 3010;
app.use(express.json());
app.use(express.static('public'));
async function start() {
  const repo = await createRepository('./data/app.sqlite');
  app.post('/api/tasks', async (req, res) => {
    if (req.headers.authorization !== process.env.TASK_TOKEN) return res.status(401).send('Unauthorized');
    const { description, deadline, status } = req.body;
    if (!description || !deadline || !status) return res.status(400).send('Missing fields');
    await repo.add({ description, deadline, status });
    res.status(201).send('Success');
  });
  app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
}
start();