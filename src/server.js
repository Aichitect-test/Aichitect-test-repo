const express = require('express');
const { TaskStore } = require('./taskStore');
const { createTaskHandler } = require('./taskInterface');

function createApp() {
  const app = express();
  app.use(express.json());
  const store = new TaskStore();
  app.post('/tasks', createTaskHandler(store));
  return app;
}

if (require.main === module) {
  const app = createApp();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = { createApp };