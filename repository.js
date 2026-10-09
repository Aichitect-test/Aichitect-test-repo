const fs = require('fs');
const initSqlJs = require('sql.js');
let db;
async function init() {
  if (!fs.existsSync('data')) fs.mkdirSync('data');
  const SQL = await initSqlJs();
  db = new SQL.Database();
  db.run('CREATE TABLE refunds (id INTEGER PRIMARY KEY, status TEXT)');
}
async function save(status) {
  db.run('INSERT INTO refunds (status) VALUES (?)', [status]);
  fs.writeFileSync('data/app.sqlite', Buffer.from(db.export()));
}
module.exports = { init, save };