const fs = require('fs');
const initSqlJs = require('sql.js');
const path = require('path');
const dbPath = path.join('data', 'app.sqlite');
let db;
async function init() {
  if (!fs.existsSync('data')) fs.mkdirSync('data');
  const SQL = await initSqlJs();
  if (fs.existsSync(dbPath)) db = new SQL.Database(fs.readFileSync(dbPath));
  else {
    db = new SQL.Database();
    db.run('CREATE TABLE tasks (id INTEGER PRIMARY KEY, status TEXT, owner TEXT)');
    db.run('CREATE TABLE comments (id INTEGER PRIMARY KEY, task_id INTEGER, text TEXT, timestamp TEXT)');
  }
}
async function save() { fs.writeFileSync(dbPath, Buffer.from(db.export())); }
module.exports = {
  init, getTask: (id) => db.exec('SELECT * FROM tasks WHERE id = ?', [id])[0]?.values[0],
  addComment: async (taskId, text) => {
    db.run('INSERT INTO comments (task_id, text, timestamp) VALUES (?, ?, ?)', [taskId, text, new Date().toISOString()]);
    await save();
  }
};