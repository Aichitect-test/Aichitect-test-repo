module.exports = {
  validate: (data) => {
    const { title, deadline, status } = data;
    if (!title || typeof title !== 'string') throw new Error('Invalid title');
    const d = new Date(deadline);
    if (isNaN(d.getTime()) || d <= new Date()) throw new Error('Invalid future deadline');
    if (!['pending', 'in-progress', 'completed'].includes(status)) throw new Error('Invalid status');
    return { title, deadline: d.toISOString(), status };
  }
};