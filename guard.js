module.exports = (req, res, next) => {
  const group = req.headers['x-user-group'];
  if (group !== 'customer') {
    return res.status(403).json({ error: 'Forbidden: Customer access only' });
  }
  next();
};