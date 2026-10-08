const express = require('express');
const fs = require('fs');
const path = require('path');
const repo = require('./repository');
const app = express();
app.use(express.json());
app.use(express.static('public'));
const PORT = process.env.PORT || 3010;
app.post('/api/billing', async (req, res) => {
  if (req.headers['authorization'] !== process.env.TASK_TOKEN) return res.status(403).send('Forbidden');
  const { paramName, value } = req.body;
  if (typeof value !== 'number') return res.status(400).send('Invalid input');
  await repo.save(paramName, value);
  res.status(200).send({ success: true });
});
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));