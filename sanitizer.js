module.exports = (err, req, res, next) => {
  const sanitized = { message: err.message, stack: err.stack };
  console.error('Sanitized Error:', sanitized);
  res.status(500).json({ error: 'Internal Server Error', details: sanitized });
};