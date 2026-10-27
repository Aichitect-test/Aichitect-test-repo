const express = require('express');
const repo = require('./repository');
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.post('/checkout', async (req, res) => {
  if (req.headers['authorization'] !== process.env.TASK_TOKEN) return res.status(401).send('Unauthorized');
  try { await repo.saveOrder(req.body.email); res.status(200).send('Success'); }
  catch (e) { res.status(400).send('Invalid request'); }
});
repo.init().then(() => app.listen(process.env.PORT || 3010));