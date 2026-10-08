const express = require('express');
const repo = require('./repository');
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.post('/comment', async (req, res) => {
  if (req.headers['authorization'] !== process.env.TASK_TOKEN) return res.status(401).send('Unauthorized');
  try {
    await repo.save(req.body.comment, req.body.sender);
    res.status(200).send('Success');
  } catch (e) { res.status(400).send(e.message); }
});
repo.init().then(() => app.listen(process.env.PORT || 3010));
module.exports = app;