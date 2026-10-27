const express = require('express');
const repo = require('./repository');
const checkout = require('./checkout');
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.post('/checkout', async (req, res) => {
  if (req.headers['authorization'] !== process.env.TASK_TOKEN) return res.status(401).send();
  try { const result = await checkout.processOrder(await repo.init(), req.body); res.json(result); }
  catch (e) { res.status(400).json({ error: 'Processing failed' }); }
});
app.listen(process.env.PORT || 3010);