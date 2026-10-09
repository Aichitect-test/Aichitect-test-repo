const express = require('express');
const { init, getDb } = require('./database');
const { authenticate } = require('./auth');
const app = express();
app.use(express.static('public'));
app.get('/api/refunds', authenticate, (req, res) => {
  const userId = req.query.userId;
  const stmt = getDb().prepare('SELECT * FROM refunds WHERE userId = ?');
  const results = [];
  while (stmt.step()) results.push(stmt.getAsObject());
  res.json(results);
});
init().then(() => app.listen(process.env.PORT || 3010));
module.exports = app;