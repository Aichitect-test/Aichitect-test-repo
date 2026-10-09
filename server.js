const express = require('express');
const repo = require('./repository');
const guard = require('./guard');
const sanitizer = require('./sanitizer');
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.post('/refund-status', guard, async (req, res, next) => {
  try {
    if (!req.body.id) throw new Error('Invalid ID');
    await repo.save('pending');
    res.json({ success: true });
  } catch (e) { next(e); }
});
app.use(sanitizer);
repo.init().then(() => app.listen(process.env.PORT || 3010));