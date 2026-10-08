const fs = require('fs');
const initSqlJs = require('sql.js');
const path = require('path');
const DB_PATH = 'data/app.sqlite';
async function getDb() {
  if (!fs.existsSync('data')) fs.mkdirSync('data');
  const SQL = await initSqlJs();
  let db;
  if (fs.existsSync(DB_PATH)) db = new SQL.Database(fs.readFileSync(DB_PATH));
  else { db = new SQL.Database(); db.run('CREATE TABLE tasks (name TEXT, value REAL)'); }
  return db;
}
module.exports = {
  save: async (name, value) => {
    const db = await getDb();
    db.run('INSERT INTO tasks VALUES (?, ?)', [name, value]);
    fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
  }
};