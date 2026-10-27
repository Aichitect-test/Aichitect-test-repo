const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');
const DB_PATH = path.join(__dirname, 'data', 'app.sqlite');
let db;
async function init() {
  if (!fs.existsSync(path.dirname(DB_PATH))) fs.mkdirSync(path.dirname(DB_PATH));
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) db = new SQL.Database(fs.readFileSync(DB_PATH));
  else { db = new SQL.Database(); db.run('CREATE TABLE orders (id INTEGER PRIMARY KEY, email TEXT)'); }
}
async function saveOrder(email) {
  if (!email || !email.includes('@')) throw new Error('Invalid email');
  db.run('INSERT INTO orders (email) VALUES (?)', [email]);
  fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
}
module.exports = { init, saveOrder };