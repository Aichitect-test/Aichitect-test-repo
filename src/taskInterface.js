function createTaskHandler(taskStore, validator = require('./taskValidator').validateTask) {
  return async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader.trim() === '') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const validation = validator(req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const startTime = Date.now();
    try {
      const savedTask = await taskStore.save(req.body);
      const duration = Date.now() - startTime;
      if (duration > 200) {
        // Logging or handling slow response if needed, but still return success
      }
      return res.status(201).json(savedTask);
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}

module.exports = { createTaskHandler };