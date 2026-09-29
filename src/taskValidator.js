const ALLOWED_STATUSES = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

function validateTask(payload, currentDate = new Date()) {
  if (!payload || typeof payload !== 'object') {
    return { valid: false, error: 'Invalid payload' };
  }
  const { title, deadline, status } = payload;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return { valid: false, error: 'Title is required and must be a string' };
  }
  if (!deadline || typeof deadline !== 'string') {
    return { valid: false, error: 'Deadline is required and must be a string date' };
  }
  const parsedDeadline = new Date(deadline);
  if (isNaN(parsedDeadline.getTime())) {
    return { valid: false, error: 'Deadline must be a valid date' };
  }
  const todayMidnight = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const deadlineMidnight = new Date(parsedDeadline.getFullYear(), parsedDeadline.getMonth(), parsedDeadline.getDate());
  if (deadlineMidnight <= todayMidnight) {
    return { valid: false, error: 'Deadline must be a future date' };
  }
  if (!status || !ALLOWED_STATUSES.includes(status)) {
    return { valid: false, error: 'Status must be one of: ' + ALLOWED_STATUSES.join(', ') };
  }
  return { valid: true };
}

module.exports = { validateTask };