const repo = require('./taskRepository');
function validate(task) {
  if (!['Pending', 'InProgress'].includes(task.status)) throw new Error('Invalid status');
  if (new Date(task.deadline) <= new Date()) throw new Error('Deadline must be future');
}
async function register(task) {
  validate(task);
  repo.save(task);
}
module.exports = { register };