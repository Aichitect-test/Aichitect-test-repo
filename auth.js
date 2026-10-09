function authenticate(req, res, next) {
  const token = req.headers['authorization'];
  if (token !== process.env.TASK_TOKEN) return res.status(401).json({ error: 'Unauthorized' });
  next();
}
module.exports = { authenticate };