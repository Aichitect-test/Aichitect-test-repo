const ALLOWED_STATUSES = ['TODO', 'IN_PROGRESS', 'DONE'];

export class TaskService {
  constructor(db, auth) {
    this.db = db;
    this.auth = auth;
  }

  async registerTask(userToken, payload) {
    if (!this.auth.isAuthenticated(userToken)) {
      throw { status: 401, message: 'Unauthorized' };
    }

    const { title, deadline, status } = payload;
    if (!title || !deadline || new Date(deadline) <= new Date()) {
      throw { status: 400, message: 'Invalid title or past deadline' };
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      throw { status: 400, message: 'Invalid status' };
    }

    const task = { title, deadline, status, createdAt: new Date() };
    await this.db.save('tasks', task);
    return task;
  }
}