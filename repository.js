const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');
const DB_PATH = path.join(__dirname, 'data', 'app.sqlite');
let db;
async function init() {
  if (!fs.existsSync('data')) fs.mkdirSync('data');
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) db = new SQL.Database(fs.readFileSync(DB_PATH));
  else {
    db = new SQL.Database();
    db.run('CREATE TABLE tasks (title TEXT, deadline TEXT, status TEXT)');
  }
}
async function save(task) {
  db.run('INSERT INTO tasks VALUES (?, ?, ?)', [task.title, task.deadline, task.status]);
  fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
}
module.exports = { init, save };