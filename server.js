const express = require('express');
const repo = require('./repository');
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.post('/calculate', async (req, res) => {
  if (req.headers['authorization'] !== process.env.TASK_TOKEN) return res.status(401).send('Unauthorized');
  const { expression } = req.body;
  try {
    const result = eval(expression);
    if (isNaN(result)) throw new Error('Invalid');
    await repo.save(expression, result);
    res.json({ result });
  } catch (e) { res.status(400).json({ error: 'Invalid expression' }); }
});
repo.init().then(() => app.listen(process.env.PORT || 3010));
module.exports = app;