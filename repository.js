const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');
const DB_PATH = path.join(__dirname, 'data', 'app.sqlite');
let db;
async function init() {
  if (!fs.existsSync(path.dirname(DB_PATH))) fs.mkdirSync(path.dirname(DB_PATH));
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) db = new SQL.Database(fs.readFileSync(DB_PATH));
  else { db = new SQL.Database(); db.run('CREATE TABLE calculations (id INTEGER PRIMARY KEY, expression TEXT, result REAL)'); }
}
async function save(expression, result) {
  db.run('INSERT INTO calculations (expression, result) VALUES (?, ?)', [expression, result]);
  fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
}
module.exports = { init, save };