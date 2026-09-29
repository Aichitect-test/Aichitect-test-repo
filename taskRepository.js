const fs = require('fs');
const initSqlJs = require('sql.js');
let db;
async function init() {
  const SQL = await initSqlJs();
  const buf = fs.existsSync('data/app.sqlite') ? fs.readFileSync('data/app.sqlite') : null;
  db = buf ? new SQL.Database(buf) : new SQL.Database();
  db.run('CREATE TABLE IF NOT EXISTS tasks (title TEXT, deadline TEXT, status TEXT)');
}
function save(task) {
  db.run('INSERT INTO tasks VALUES (?, ?, ?)', [task.title, task.deadline, task.status]);
  fs.writeFileSync('data/app.sqlite', Buffer.from(db.export()));
}
module.exports = { init, save };