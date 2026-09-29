const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

async function createRepository(dbPath) {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const SQL = await initSqlJs();
  let db;
  if (fs.existsSync(dbPath)) {
    db = new SQL.Database(fs.readFileSync(dbPath));
  } else {
    db = new SQL.Database();
    db.run('CREATE TABLE tasks (description TEXT, deadline TEXT, status TEXT)');
  }
  const save = () => fs.writeFileSync(dbPath, Buffer.from(db.export()));
  return {
    async add(task) {
      db.run('INSERT INTO tasks VALUES (?, ?, ?)', [task.description, task.deadline, task.status]);
      save();
    },
    async getAll() {
      const res = db.exec('SELECT * FROM tasks');
      if (res.length === 0) return [];
      return res[0].values.map(v => ({ description: v[0], deadline: v[1], status: v[2] }));
    }
  };
}
module.exports = { createRepository };