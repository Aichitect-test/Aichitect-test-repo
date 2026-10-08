const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');
let db;
async function init() {
  const SQL = await initSqlJs();
  const dir = './data';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  const dbPath = path.join(dir, 'app.sqlite');
  if (fs.existsSync(dbPath)) {
    db = new SQL.Database(fs.readFileSync(dbPath));
  } else {
    db = new SQL.Database();
    db.run('CREATE TABLE todoitems (id INTEGER PRIMARY KEY, comment TEXT, sender TEXT, timestamp TEXT)');
  }
  return db;
}
async function save(comment, sender) {
  if (!comment || !sender) throw new Error('Invalid input');
  db.run('INSERT INTO todoitems (comment, sender, timestamp) VALUES (?, ?, ?)', [comment, sender, new Date().toISOString()]);
  fs.writeFileSync('./data/app.sqlite', Buffer.from(db.export()));
}
module.exports = { init, save };