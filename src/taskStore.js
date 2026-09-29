class TaskStore {
  constructor() {
    this.tasks = [];
  }

  async save(task) {
    const record = { id: Date.now().toString(), ...task, createdAt: new Date().toISOString() };
    this.tasks.push(record);
    return record;
  }

  async clear() {
    this.tasks = [];
  }
}

module.exports = { TaskStore };